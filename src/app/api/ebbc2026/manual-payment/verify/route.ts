import { NextResponse } from "next/server";

import { sendEbbc2026TicketEmailsForOrder } from "@/lib/ebbc2026/email";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerifyManualPaymentBody = {
  orderNumber?: string;
  mpesaCode?: string;
  amountKes?: number;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(
    body,
    {
      status,
    },
  );
}

function cleanText(
  value: unknown,
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value.trim();
}

function getBearerToken(
  request: Request,
) {
  const authorization =
    request.headers.get(
      "authorization",
    );

  if (!authorization) {
    return null;
  }

  const [scheme, token] =
    authorization.split(" ");

  if (
    scheme?.toLowerCase() !==
      "bearer" ||
    !token?.trim()
  ) {
    return null;
  }

  return token.trim();
}

function normaliseMpesaCode(
  value: unknown,
) {
  return cleanText(
    value,
  )
    .replace(/\s+/g, "")
    .toUpperCase();
}

function isValidMpesaCode(
  code: string,
) {
  return /^[A-Z0-9]{10,12}$/.test(
    code,
  );
}

async function sendTicketEmailsSafely(
  orderId: string,
  orderNumber: string,
) {
  try {
    const result =
      await sendEbbc2026TicketEmailsForOrder(
        orderId,
      );

    console.log(
      "EBBC2026 manual-payment ticket email delivery:",
      {
        orderNumber,
        totalTickets:
          result.totalTickets,
        sent: result.sent,
        skipped: result.skipped,
        failed: result.failed,
      },
    );

    return result;
  } catch (error) {
    console.error(
      `EBBC2026 ticket email delivery failed for manual order ${orderNumber}:`,
      error,
    );

    return null;
  }
}

export async function POST(
  request: Request,
) {
  const accessToken =
    getBearerToken(
      request,
    );

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Administrator authentication is required.",
      },
      401,
    );
  }

  try {
    /*
     * ------------------------------------------------
     * 1. Authenticate the SAK administrator
     * ------------------------------------------------
     */

    const {
      data: userData,
      error: userError,
    } =
      await supabaseAdmin.auth.getUser(
        accessToken,
      );

    if (
      userError ||
      !userData.user
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "The administrator session is invalid or expired.",
        },
        401,
      );
    }

    const user =
      userData.user;

    const {
      data: staff,
      error: staffError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_scanner_staff",
        )
        .select(
          "user_id, display_name, role, is_active",
        )
        .eq(
          "user_id",
          user.id,
        )
        .maybeSingle();

    if (
      staffError
    ) {
      console.error(
        "EBBC2026 manual payment admin lookup error:",
        staffError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Administrator access could not be verified.",
        },
        500,
      );
    }

    if (
      !staff ||
      staff.is_active !== true
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "This account is not authorised to verify EBBC2026 payments.",
        },
        403,
      );
    }

    if (
      staff.role !== "admin"
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Only an EBBC2026 administrator can verify manual payments.",
        },
        403,
      );
    }

    /*
     * ------------------------------------------------
     * 2. Validate request
     * ------------------------------------------------
     */

    const body =
      (await request.json()) as
        VerifyManualPaymentBody;

    const orderNumber =
      cleanText(
        body.orderNumber,
      ).toUpperCase();

    const mpesaCode =
      normaliseMpesaCode(
        body.mpesaCode,
      );

    const submittedAmount =
      Number(
        body.amountKes,
      );

    if (!orderNumber) {
      return jsonResponse(
        {
          ok: false,
          message:
            "The EBBC2026 order number is required.",
        },
        400,
      );
    }

    if (
      !isValidMpesaCode(
        mpesaCode,
      )
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Enter a valid M-Pesa transaction code.",
        },
        400,
      );
    }

    if (
      !Number.isFinite(
        submittedAmount,
      ) ||
      submittedAmount <= 0
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Enter the verified payment amount.",
        },
        400,
      );
    }

    /*
     * ------------------------------------------------
     * 3. Get order
     * ------------------------------------------------
     */

    const {
      data: order,
      error: orderError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .select(
          "id, order_number, buyer_full_name, buyer_email, buyer_phone, ticket_quantity, total_amount_kes, currency, order_status, payment_status",
        )
        .eq(
          "order_number",
          orderNumber,
        )
        .maybeSingle();

    if (
      orderError
    ) {
      console.error(
        "EBBC2026 manual payment order lookup error:",
        orderError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The registration order could not be retrieved.",
        },
        500,
      );
    }

    if (!order) {
      return jsonResponse(
        {
          ok: false,
          message:
            "No EBBC2026 registration matches this order number.",
        },
        404,
      );
    }

    const expectedAmount =
      Number(
        order.total_amount_kes,
      );

    if (
      !Number.isFinite(
        expectedAmount,
      ) ||
      expectedAmount <= 0
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "This registration has an invalid order amount.",
        },
        500,
      );
    }

    if (
      submittedAmount !==
      expectedAmount
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            `Payment amount mismatch. This order requires KES ${expectedAmount.toLocaleString(
              "en-KE",
            )}.`,
        },
        400,
      );
    }

    /*
     * ------------------------------------------------
     * 4. Protect against reused M-Pesa codes
     * ------------------------------------------------
     */

    const {
      data: existingPayment,
      error:
        existingPaymentError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_payments",
        )
        .select(
          "id, order_id, transaction_reference, payment_status",
        )
        .eq(
          "transaction_reference",
          mpesaCode,
        )
        .maybeSingle();

    if (
      existingPaymentError
    ) {
      console.error(
        "EBBC2026 M-Pesa reference lookup error:",
        existingPaymentError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The M-Pesa transaction code could not be verified against existing payments.",
        },
        500,
      );
    }

    if (
      existingPayment &&
      existingPayment.order_id !==
        order.id
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "This M-Pesa transaction code has already been used for another EBBC2026 registration.",
        },
        409,
      );
    }

    /*
     * ------------------------------------------------
     * 5. Handle an already-paid order safely
     * ------------------------------------------------
     */

    if (
      order.payment_status ===
        "paid" ||
      order.order_status ===
        "paid" ||
      order.order_status ===
        "completed"
    ) {
      if (
        !existingPayment
      ) {
        return jsonResponse(
          {
            ok: false,
            message:
              "This registration is already marked as paid. No new payment code was accepted.",
          },
          409,
        );
      }

      const retryTime =
        new Date().toISOString();

      await supabaseAdmin
        .from(
          "ebbc_tickets",
        )
        .update({
          payment_id:
            existingPayment.id,
          ticket_status:
            "active",
          issued_at:
            retryTime,
        })
        .eq(
          "order_id",
          order.id,
        )
        .eq(
          "ticket_status",
          "pending",
        );

      const emailResult =
        await sendTicketEmailsSafely(
          order.id,
          order.order_number,
        );

      return jsonResponse({
        ok: true,

        alreadyVerified:
          true,

        message:
          "This payment had already been verified. The tickets are active.",

        orderNumber:
          order.order_number,

        mpesaCode,

        ticketQuantity:
          order.ticket_quantity,

        emailResult,
      });
    }

    /*
     * ------------------------------------------------
     * 6. Create the verified manual payment record
     * ------------------------------------------------
     */

    const verifiedAt =
      new Date().toISOString();

    let paymentId =
      existingPayment?.id ||
      null;

    if (
      !paymentId
    ) {
      const {
        data:
          createdPayment,
        error:
          paymentInsertError,
      } =
        await supabaseAdmin
          .from(
            "ebbc_payments",
          )
          .insert({
            order_id:
              order.id,

            provider:
              "equity_paybill",

            transaction_reference:
              mpesaCode,

            provider_transaction_id:
              mpesaCode,

            payment_method:
              "mpesa_paybill",

            amount_kes:
              expectedAmount,

            currency:
              String(
                order.currency ||
                  "KES",
              ).toUpperCase(),

            payment_status:
              "successful",

            customer_email:
              order.buyer_email,

            customer_phone:
              order.buyer_phone,

            provider_response: {
              payment_type:
                "manual_equity_paybill",
              paybill_number:
                "247247",
              account_number:
                "100831",
              verified_by_user_id:
                user.id,
              verified_by_email:
                user.email ||
                null,
              verified_by_name:
                staff.display_name,
              verified_at:
                verifiedAt,
            },

            failure_reason:
              null,

            paid_at:
              verifiedAt,

            verified_at:
              verifiedAt,
          })
          .select(
            "id",
          )
          .single();

      if (
        paymentInsertError ||
        !createdPayment
      ) {
        console.error(
          "EBBC2026 manual payment record creation error:",
          paymentInsertError,
        );

        return jsonResponse(
          {
            ok: false,
            message:
              "The M-Pesa payment could not be recorded. The ticket has NOT been activated.",
          },
          500,
        );
      }

      paymentId =
        createdPayment.id;
    }

    /*
     * ------------------------------------------------
     * 7. Mark order as paid
     * ------------------------------------------------
     */

    const {
      error:
        orderUpdateError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .update({
          payment_status:
            "paid",

          order_status:
            "paid",

          paid_at:
            verifiedAt,
        })
        .eq(
          "id",
          order.id,
        );

    if (
      orderUpdateError
    ) {
      console.error(
        "EBBC2026 manual payment order activation error:",
        orderUpdateError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The payment was recorded, but the registration order could not be activated.",
        },
        500,
      );
    }

    /*
     * ------------------------------------------------
     * 8. Activate all tickets for this order
     * ------------------------------------------------
     */

    const {
      error:
        ticketUpdateError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_tickets",
        )
        .update({
          payment_id:
            paymentId,

          ticket_status:
            "active",

          issued_at:
            verifiedAt,
        })
        .eq(
          "order_id",
          order.id,
        )
        .in(
          "ticket_status",
          [
            "pending",
            "active",
          ],
        );

    if (
      ticketUpdateError
    ) {
      console.error(
        "EBBC2026 manual payment ticket activation error:",
        ticketUpdateError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The payment was verified, but the QR ticket could not be activated automatically.",
        },
        500,
      );
    }

    /*
     * ------------------------------------------------
     * 9. Send QR ticket emails
     * ------------------------------------------------
     */

    const emailResult =
      await sendTicketEmailsSafely(
        order.id,
        order.order_number,
      );

    return jsonResponse({
      ok: true,

      message:
        "Payment verified successfully. The EBBC2026 ticket is active.",

      orderNumber:
        order.order_number,

      buyerName:
        order.buyer_full_name,

      amountKes:
        expectedAmount,

      mpesaCode,

      ticketQuantity:
        order.ticket_quantity,

      verifiedBy:
        staff.display_name,

      verifiedAt,

      emailResult,
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 manual payment verification error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "An unexpected payment verification error occurred.",
      },
      500,
    );
  }
}