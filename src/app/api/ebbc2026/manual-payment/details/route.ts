import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaymentState =
  | "paid"
  | "partial"
  | "unpaid";

type OrderRecord = {
  id: string;
  order_number: string;
  buyer_full_name: string;
  buyer_email: string;
  buyer_phone: string;
  country: string | null;
  organisation: string | null;
  ticket_quantity: number;
  total_amount_kes:
    | number
    | string
    | null;
  currency: string | null;
  order_status: string | null;
  payment_status: string | null;
  created_at: string | null;
  paid_at: string | null;
};

type TicketRecord = {
  id: string;
  order_id: string;
  ticket_number: string;
  attendee_full_name: string;
  attendee_email: string;
  attendee_phone: string | null;
  participant_category:
    | string
    | null;
  organisation: string | null;
  country: string | null;
  event_date: string | null;
  ticket_status: string | null;
  issued_at: string | null;
  created_at: string | null;
};

type PaymentRecord = {
  id: string;
  order_id: string;
  provider: string | null;
  transaction_reference:
    | string
    | null;
  provider_transaction_id:
    | string
    | null;
  payment_method: string | null;
  amount_kes:
    | number
    | string
    | null;
  currency: string | null;
  payment_status: string | null;
  paid_at: string | null;
  verified_at: string | null;
  created_at: string | null;
};

type CheckInRecord = {
  id: string;
  ticket_id: string | null;
  scan_result: string | null;
  gate_name: string | null;
  event_date: string | null;
  scanned_at: string | null;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(
    body,
    {
      status,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
      },
    },
  );
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

function cleanText(
  value: unknown,
) {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value.trim();
}

function moneyNumber(
  value: unknown,
) {
  const amount =
    Number(value);

  if (
    !Number.isFinite(
      amount,
    )
  ) {
    return 0;
  }

  return amount;
}

function getPaymentState(
  totalAmountKes: number,
  totalPaidKes: number,
): PaymentState {
  if (
    totalAmountKes > 0 &&
    totalPaidKes >=
      totalAmountKes
  ) {
    return "paid";
  }

  if (totalPaidKes > 0) {
    return "partial";
  }

  return "unpaid";
}

function getQrStatus(
  ticketStatus:
    | string
    | null,
) {
  const status =
    cleanText(
      ticketStatus,
    ).toLowerCase();

  if (
    status === "active"
  ) {
    return "active";
  }

  if (
    status ===
      "cancelled" ||
    status ===
      "blocked"
  ) {
    return status;
  }

  return "locked";
}

function formatPaymentMethod(
  payment:
    PaymentRecord,
) {
  const provider =
    cleanText(
      payment.provider,
    ).toLowerCase();

  const method =
    cleanText(
      payment.payment_method,
    ).toLowerCase();

  if (
    provider ===
      "equity_paybill" ||
    method ===
      "mpesa_paybill"
  ) {
    return "Equity Paybill";
  }

  if (
    method ===
      "mobile_money" ||
    method ===
      "mobile money"
  ) {
    return "M-PESA";
  }

  if (
    method === "card"
  ) {
    return "Card";
  }

  if (
    method === "bank" ||
    method ===
      "bank_transfer"
  ) {
    return "Bank";
  }

  if (
    provider === "paystack"
  ) {
    return "Paystack";
  }

  if (method) {
    return method
      .replaceAll(
        "_",
        " ",
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase(),
      );
  }

  if (provider) {
    return provider
      .replaceAll(
        "_",
        " ",
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase(),
      );
  }

  return "Unknown";
}

export async function GET(
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
      await supabaseAdmin.auth
        .getUser(
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
        "EBBC2026 details admin lookup error:",
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
        true ||
      staff.role !== "admin"
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Only an EBBC2026 administrator can access registration details.",
        },
        403,
      );
    }

    /*
     * ------------------------------------------
     * 2. Validate requested order
     * ------------------------------------------
     */

    const url =
      new URL(
        request.url,
      );

    const orderId =
      cleanText(
        url.searchParams.get(
          "orderId",
        ),
      ).slice(
        0,
        100,
      );

    if (!orderId) {
      return jsonResponse(
        {
          ok: false,
          message:
            "An EBBC2026 order is required.",
        },
        400,
      );
    }

    /*
     * ------------------------------------------
     * 3. Load order
     * ------------------------------------------
     */

    const {
      data: orderData,
      error: orderError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .select(
          "id, order_number, buyer_full_name, buyer_email, buyer_phone, country, organisation, ticket_quantity, total_amount_kes, currency, order_status, payment_status, created_at, paid_at",
        )
        .eq(
          "id",
          orderId,
        )
        .maybeSingle();

    if (orderError) {
      console.error(
        "EBBC2026 details order error:",
        orderError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The registration order could not be loaded.",
        },
        500,
      );
    }

    if (!orderData) {
      return jsonResponse(
        {
          ok: false,
          message:
            "The registration order was not found.",
        },
        404,
      );
    }

    const order =
      orderData as
        OrderRecord;

    /*
     * ------------------------------------------
     * 4. Load tickets and successful payments
     * ------------------------------------------
     */

    const [
      ticketsResult,
      paymentsResult,
    ] =
      await Promise.all([
        supabaseAdmin
          .from(
            "ebbc_tickets",
          )
          .select(
            "id, order_id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, organisation, country, event_date, ticket_status, issued_at, created_at",
          )
          .eq(
            "order_id",
            order.id,
          )
          .order(
            "created_at",
            {
              ascending:
                true,
            },
          ),

        supabaseAdmin
          .from(
            "ebbc_payments",
          )
          .select(
            "id, order_id, provider, transaction_reference, provider_transaction_id, payment_method, amount_kes, currency, payment_status, paid_at, verified_at, created_at",
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
          ),
      ]);

    if (
      ticketsResult.error
    ) {
      console.error(
        "EBBC2026 details tickets error:",
        ticketsResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The registration tickets could not be loaded.",
        },
        500,
      );
    }

    if (
      paymentsResult.error
    ) {
      console.error(
        "EBBC2026 details payments error:",
        paymentsResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The payment history could not be loaded.",
        },
        500,
      );
    }

    const tickets =
      (
        ticketsResult.data ||
        []
      ) as TicketRecord[];

    const payments =
      (
        paymentsResult.data ||
        []
      ) as PaymentRecord[];

    /*
     * ------------------------------------------
     * 5. Load complete check-in history
     * ------------------------------------------
     */

    const ticketIds =
      tickets.map(
        (ticket) =>
          ticket.id,
      );

    let checkIns:
      CheckInRecord[] = [];

    if (
      ticketIds.length > 0
    ) {
      const {
        data:
          checkInData,
        error:
          checkInError,
      } =
        await supabaseAdmin
          .from(
            "ebbc_checkins",
          )
          .select(
            "id, ticket_id, scan_result, gate_name, event_date, scanned_at",
          )
          .in(
            "ticket_id",
            ticketIds,
          )
          .order(
            "scanned_at",
            {
              ascending:
                false,
            },
          );

      if (checkInError) {
        console.error(
          "EBBC2026 details check-ins error:",
          checkInError,
        );

        return jsonResponse(
          {
            ok: false,
            message:
              "The check-in history could not be loaded.",
          },
          500,
        );
      }

      checkIns =
        (
          checkInData ||
          []
        ) as CheckInRecord[];
    }

    /*
     * ------------------------------------------
     * 6. Calculate financial summary
     * ------------------------------------------
     */

    const totalAmountKes =
      Math.max(
        moneyNumber(
          order.total_amount_kes,
        ),
        0,
      );

    const totalPaidKes =
      payments.reduce(
        (
          total,
          payment,
        ) =>
          total +
          Math.max(
            moneyNumber(
              payment.amount_kes,
            ),
            0,
          ),
        0,
      );

    const balanceKes =
      Math.max(
        totalAmountKes -
          totalPaidKes,
        0,
      );

    const paymentState =
      getPaymentState(
        totalAmountKes,
        totalPaidKes,
      );

    /*
     * ------------------------------------------
     * 7. Shape payment history
     * ------------------------------------------
     */

    const paymentHistory =
      payments.map(
        (payment) => ({
          id:
            payment.id,

          provider:
            payment.provider,

          paymentMethod:
            formatPaymentMethod(
              payment,
            ),

          transactionReference:
            payment.transaction_reference,

          providerTransactionId:
            payment.provider_transaction_id,

          amountKes:
            moneyNumber(
              payment.amount_kes,
            ),

          currency:
            payment.currency ||
            order.currency ||
            "KES",

          paymentStatus:
            payment.payment_status,

          paidAt:
            payment.paid_at,

          verifiedAt:
            payment.verified_at,

          createdAt:
            payment.created_at,
        }),
      );

    /*
     * ------------------------------------------
     * 8. Shape ticket + check-in history
     * ------------------------------------------
     */

    const ticketDetails =
      tickets.map(
        (ticket) => {
          const ticketCheckIns =
            checkIns
              .filter(
                (checkIn) =>
                  checkIn.ticket_id ===
                  ticket.id,
              )
              .map(
                (checkIn) => ({
                  id:
                    checkIn.id,

                  scanResult:
                    checkIn.scan_result,

                  gateName:
                    checkIn.gate_name,

                  eventDate:
                    checkIn.event_date,

                  scannedAt:
                    checkIn.scanned_at,
                }),
              );

          return {
            id:
              ticket.id,

            ticketNumber:
              ticket.ticket_number,

            attendeeFullName:
              ticket.attendee_full_name,

            attendeeEmail:
              ticket.attendee_email,

            attendeePhone:
              ticket.attendee_phone,

            participantCategory:
              ticket.participant_category,

            organisation:
              ticket.organisation,

            country:
              ticket.country,

            eventDate:
              ticket.event_date,

            ticketStatus:
              ticket.ticket_status,

            qrStatus:
              getQrStatus(
                ticket.ticket_status,
              ),

            issuedAt:
              ticket.issued_at,

            createdAt:
              ticket.created_at,

            checkInCount:
              ticketCheckIns.length,

            checkIns:
              ticketCheckIns,
          };
        },
      );

    /*
     * ------------------------------------------
     * 9. Return secure details
     * ------------------------------------------
     */

    return jsonResponse({
      ok: true,

      generatedAt:
        new Date().toISOString(),

      staff: {
        displayName:
          staff.display_name ||
          user.email ||
          "EBBC2026 Admin",

        role:
          staff.role,
      },

      order: {
        id:
          order.id,

        orderNumber:
          order.order_number,

        buyerFullName:
          order.buyer_full_name,

        buyerEmail:
          order.buyer_email,

        buyerPhone:
          order.buyer_phone,

        buyerCountry:
          order.country,

        buyerOrganisation:
          order.organisation,

        ticketQuantity:
          Number(
            order.ticket_quantity ||
              0,
          ),

        totalAmountKes,

        totalPaidKes,

        balanceKes,

        paymentState,

        currency:
          order.currency ||
          "KES",

        orderStatus:
          order.order_status,

        storedPaymentStatus:
          order.payment_status,

        createdAt:
          order.created_at,

        paidAt:
          order.paid_at,
      },

      payments:
        paymentHistory,

      tickets:
        ticketDetails,
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 registration details error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,

        message:
          "The registration details could not be loaded.",
      },
      500,
    );
  }
}