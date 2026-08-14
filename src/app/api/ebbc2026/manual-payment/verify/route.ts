import { NextResponse } from "next/server";

import { sendEbbc2026TicketEmailsForOrder } from "@/lib/ebbc2026/email";
import { sendEbbc2026InstallmentPaymentNotification } from "@/lib/ebbc2026/installment-notification";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerifyManualPaymentBody = {
  orderNumber?: string;
  mpesaCode?: string;
  amountKes?: number;
};

type SuccessfulPayment = {
  id: string;
  amount_kes: number | string | null;
  paid_at?: string | null;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
  });
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
  return cleanText(value)
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

function formatMoney(
  amount: number,
) {
  return amount.toLocaleString(
    "en-KE",
  );
}

function sumPayments(
  payments:
    SuccessfulPayment[],
) {
  return payments.reduce(
    (
      total,
      payment,
    ) => {
      const amount =
        Number(
          payment.amount_kes,
        );

      if (
        !Number.isFinite(
          amount,
        ) ||
        amount <= 0
      ) {
        return total;
      }

      return total + amount;
    },
    0,
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
        sent:
          result.sent,
        skipped:
          result.skipped,
        failed:
          result.failed,
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

async function sendInstallmentNotificationSafely({
  orderId,
  orderNumber,
  transactionReference,
  installmentAmountKes,
  totalPaidKes,
  balanceKes,
  totalAmountKes,
  verifiedAt,
  verifiedBy,
}: {
  orderId: string;
  orderNumber: string;
  transactionReference: string;
  installmentAmountKes: number;
  totalPaidKes: number;
  balanceKes: number;
  totalAmountKes: number;
  verifiedAt: string;
  verifiedBy?: string | null;
}) {
  try {
    const result =
      await sendEbbc2026InstallmentPaymentNotification(
        {
          orderId,
          orderNumber,
          transactionReference,
          installmentAmountKes,
          totalPaidKes,
          balanceKes,
          totalAmountKes,
          verifiedAt,
          verifiedBy,
        },
      );

    console.log(
      "EBBC2026 Equity installment notification result:",
      {
        orderNumber,
        recipient:
          result.recipient,
        installmentAmountKes,
        totalPaidKes,
        balanceKes,
      },
    );

    return result;
  } catch (error) {
    console.error(
      `EBBC2026 Equity installment notification failed for ${orderNumber}:`,
      error,
    );

    /*
     * A staff notification failure must not
     * invalidate a legitimate verified payment.
     */
    return null;
  }
}

async function activateOrderAndTickets({
  orderId,
  orderNumber,
  paymentId,
  verifiedAt,
}: {
  orderId: string;
  orderNumber: string;
  paymentId: string;
  verifiedAt: string;
}) {
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
        orderId,
      );

  if (orderUpdateError) {
    console.error(
      "EBBC2026 manual payment order activation error:",
      orderUpdateError,
    );

    return {
      ok: false as const,
      message:
        "The payment was recorded, but the registration order could not be activated.",
    };
  }

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
        orderId,
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

    return {
      ok: false as const,
      message:
        "The payment is complete, but the QR ticket could not be activated automatically.",
    };
  }

  const emailResult =
    await sendTicketEmailsSafely(
      orderId,
      orderNumber,
    );

  return {
    ok: true as const,
    emailResult,
  };
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
     * ------------------------------------------
     * 1. Authenticate administrator
     * ------------------------------------------
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

    if (staffError) {
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
      staff.is_active !==
        true
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
      staff.role !==
      "admin"
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
     * ------------------------------------------
     * 2. Validate request
     * ------------------------------------------
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
     * ------------------------------------------
     * 3. Get order
     * ------------------------------------------
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

    if (orderError) {
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

    const totalAmountKes =
      Number(
        order.total_amount_kes,
      );

    if (
      !Number.isFinite(
        totalAmountKes,
      ) ||
      totalAmountKes <= 0
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
      [
        "cancelled",
        "blocked",
        "refunded",
      ].includes(
        String(
          order.order_status ||
            "",
        ).toLowerCase(),
      )
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Payments cannot be added to this registration.",
        },
        409,
      );
    }

    /*
     * ------------------------------------------
     * 4. Check transaction code
     * ------------------------------------------
     */

    const {
      data:
        existingPayment,
      error:
        existingPaymentError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_payments",
        )
        .select(
          "id, order_id, transaction_reference, payment_status, amount_kes",
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
            "The M-Pesa transaction code could not be checked against existing payments.",
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
     * ------------------------------------------
     * 5. Calculate payments already received
     * ------------------------------------------
     */

    const {
      data:
        successfulPayments,
      error:
        successfulPaymentsError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_payments",
        )
        .select(
          "id, amount_kes, paid_at",
        )
        .eq(
          "order_id",
          order.id,
        )
        .eq(
          "payment_status",
          "successful",
        )
        .order(
          "paid_at",
          {
            ascending:
              true,
          },
        );

    if (
      successfulPaymentsError
    ) {
      console.error(
        "EBBC2026 installment payment lookup error:",
        successfulPaymentsError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Previous payments for this registration could not be retrieved.",
        },
        500,
      );
    }

    const payments =
      (
        successfulPayments ||
        []
      ) as SuccessfulPayment[];

    const alreadyPaidKes =
      sumPayments(
        payments,
      );

    const currentBalanceKes =
      Math.max(
        totalAmountKes -
          alreadyPaidKes,
        0,
      );

    /*
     * ------------------------------------------
     * 6. Handle duplicate M-Pesa code safely
     * ------------------------------------------
     */

    if (
      existingPayment
    ) {
      if (
        existingPayment.payment_status !==
        "successful"
      ) {
        return jsonResponse(
          {
            ok: false,
            message:
              "This M-Pesa transaction code is already recorded but is not marked successful. Do not enter it again.",
          },
          409,
        );
      }

      const fullyPaid =
        alreadyPaidKes >=
        totalAmountKes;

      if (fullyPaid) {
        const verifiedAt =
          new Date().toISOString();

        const paymentId =
          payments[
            payments.length -
              1
          ]?.id ||
          existingPayment.id;

        const activation =
          await activateOrderAndTickets(
            {
              orderId:
                order.id,
              orderNumber:
                order.order_number,
              paymentId,
              verifiedAt,
            },
          );

        if (!activation.ok) {
          return jsonResponse(
            {
              ok: false,
              message:
                activation.message,
            },
            500,
          );
        }

        return jsonResponse({
          ok: true,
          alreadyVerified:
            true,
          fullyPaid:
            true,
          ticketActivated:
            true,
          message:
            "This payment had already been verified. The registration is fully paid and the QR ticket is active.",
          orderNumber:
            order.order_number,
          buyerName:
            order.buyer_full_name,
          paymentAmountKes:
            Number(
              existingPayment.amount_kes,
            ),
          totalAmountKes,
          totalPaidKes:
            alreadyPaidKes,
          balanceKes: 0,
          mpesaCode,
          ticketQuantity:
            order.ticket_quantity,
          emailResult:
            activation.emailResult,
        });
      }

      return jsonResponse({
        ok: true,
        alreadyVerified:
          true,
        fullyPaid:
          false,
        ticketActivated:
          false,
        message:
          `This installment had already been verified. Total paid is KES ${formatMoney(
            alreadyPaidKes,
          )}. Balance remaining is KES ${formatMoney(
            currentBalanceKes,
          )}. The QR ticket remains inactive until full payment.`,
        orderNumber:
          order.order_number,
        buyerName:
          order.buyer_full_name,
        paymentAmountKes:
          Number(
            existingPayment.amount_kes,
          ),
        totalAmountKes,
        totalPaidKes:
          alreadyPaidKes,
        balanceKes:
          currentBalanceKes,
        mpesaCode,
        ticketQuantity:
          order.ticket_quantity,
      });
    }

    /*
     * ------------------------------------------
     * 7. Do not accept money after full payment
     * ------------------------------------------
     */

    if (
      alreadyPaidKes >=
        totalAmountKes ||
      order.payment_status ===
        "paid" ||
      order.order_status ===
        "paid" ||
      order.order_status ===
        "completed"
    ) {
      const verifiedAt =
        new Date().toISOString();

      const paymentId =
        payments[
          payments.length - 1
        ]?.id;

      if (paymentId) {
        const activation =
          await activateOrderAndTickets(
            {
              orderId:
                order.id,
              orderNumber:
                order.order_number,
              paymentId,
              verifiedAt,
            },
          );

        if (!activation.ok) {
          return jsonResponse(
            {
              ok: false,
              message:
                activation.message,
            },
            500,
          );
        }
      }

      return jsonResponse(
        {
          ok: false,
          fullyPaid: true,
          ticketActivated:
            true,
          message:
            "This registration is already fully paid. No additional payment was accepted.",
          orderNumber:
            order.order_number,
          totalAmountKes,
          totalPaidKes:
            alreadyPaidKes,
          balanceKes: 0,
        },
        409,
      );
    }

    /*
     * ------------------------------------------
     * 8. Reject accidental overpayment
     * ------------------------------------------
     */

    if (
      submittedAmount >
      currentBalanceKes
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            `This payment is higher than the outstanding balance. Balance remaining is KES ${formatMoney(
              currentBalanceKes,
            )}.`,
          orderNumber:
            order.order_number,
          totalAmountKes,
          totalPaidKes:
            alreadyPaidKes,
          balanceKes:
            currentBalanceKes,
        },
        400,
      );
    }

    /*
     * ------------------------------------------
     * 9. Record this installment
     * ------------------------------------------
     */

    const verifiedAt =
      new Date().toISOString();

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
            submittedAmount,

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
              "manual_equity_paybill_installment",

            paybill_number:
              "247247",

            account_number:
              "100831",

            order_number:
              order.order_number,

            installment_amount_kes:
              submittedAmount,

            previous_paid_kes:
              alreadyPaidKes,

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
        "EBBC2026 installment payment record creation error:",
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

    /*
     * ------------------------------------------
     * 10. Recalculate total paid
     * ------------------------------------------
     */

    const totalPaidKes =
      alreadyPaidKes +
      submittedAmount;

    const balanceKes =
      Math.max(
        totalAmountKes -
          totalPaidKes,
        0,
      );

    const fullyPaid =
      balanceKes === 0;

    /*
     * ------------------------------------------
     * 11. Partial payment: keep QR locked
     * ------------------------------------------
     */

    if (!fullyPaid) {
      const notificationResult =
        await sendInstallmentNotificationSafely(
          {
            orderId:
              order.id,

            orderNumber:
              order.order_number,

            transactionReference:
              mpesaCode,

            installmentAmountKes:
              submittedAmount,

            totalPaidKes,

            balanceKes,

            totalAmountKes,

            verifiedAt,

            verifiedBy:
              staff.display_name,
          },
        );

      return jsonResponse({
        ok: true,

        alreadyVerified:
          false,

        fullyPaid:
          false,

        ticketActivated:
          false,

        message:
          `Installment verified successfully. KES ${formatMoney(
            submittedAmount,
          )} received. Total paid is KES ${formatMoney(
            totalPaidKes,
          )}. Balance remaining is KES ${formatMoney(
            balanceKes,
          )}. The QR ticket remains inactive until full payment.`,

        orderNumber:
          order.order_number,

        buyerName:
          order.buyer_full_name,

        paymentAmountKes:
          submittedAmount,

        totalAmountKes,

        totalPaidKes,

        balanceKes,

        mpesaCode,

        ticketQuantity:
          order.ticket_quantity,

        verifiedBy:
          staff.display_name,

        verifiedAt,

        notificationResult,
      });
    }

    /*
     * ------------------------------------------
     * 12. Full payment reached: activate QR
     * ------------------------------------------
     */

    const activation =
      await activateOrderAndTickets(
        {
          orderId:
            order.id,

          orderNumber:
            order.order_number,

          paymentId:
            createdPayment.id,

          verifiedAt,
        },
      );

    if (!activation.ok) {
      return jsonResponse(
        {
          ok: false,
          message:
            activation.message,
        },
        500,
      );
    }

    /*
     * ------------------------------------------
     * 13. Notify Elevate after activation
     * ------------------------------------------
     */

    const notificationResult =
      await sendInstallmentNotificationSafely(
        {
          orderId:
            order.id,

          orderNumber:
            order.order_number,

          transactionReference:
            mpesaCode,

          installmentAmountKes:
            submittedAmount,

          totalPaidKes,

          balanceKes: 0,

          totalAmountKes,

          verifiedAt,

          verifiedBy:
            staff.display_name,
        },
      );

    return jsonResponse({
      ok: true,

      alreadyVerified:
        false,

      fullyPaid:
        true,

      ticketActivated:
        true,

      message:
        "Final payment verified successfully. The registration is fully paid, the EBBC2026 QR ticket is active, and the ticket email has been processed.",

      orderNumber:
        order.order_number,

      buyerName:
        order.buyer_full_name,

      paymentAmountKes:
        submittedAmount,

      totalAmountKes,

      totalPaidKes,

      balanceKes: 0,

      mpesaCode,

      ticketQuantity:
        order.ticket_quantity,

      verifiedBy:
        staff.display_name,

      verifiedAt,

      emailResult:
        activation.emailResult,

      notificationResult,
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
          "The payment could not be verified. No second attempt should be made until the first result is checked.",
      },
      500,
    );
  }
}