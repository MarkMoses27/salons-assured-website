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
  total_amount_kes: number | string | null;
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
  participant_category: string | null;
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
  transaction_reference: string | null;
  provider_transaction_id: string | null;
  payment_method: string | null;
  amount_kes: number | string | null;
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

  if (method === "card") {
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
    provider ===
    "paystack"
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

function getQrStatus(
  ticketStatus: string | null,
) {
  const status =
    cleanText(
      ticketStatus,
    ).toLowerCase();

  if (status === "active") {
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
     * 1. Authenticate EBBC2026 administrator
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
        "EBBC2026 dashboard admin lookup error:",
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
            "Only an EBBC2026 administrator can access payment and registration records.",
        },
        403,
      );
    }

    /*
     * ------------------------------------------
     * 2. Read optional filters
     * ------------------------------------------
     */

    const url =
      new URL(
        request.url,
      );

    const search =
      cleanText(
        url.searchParams.get(
          "q",
        ),
      )
        .toLowerCase()
        .slice(
          0,
          120,
        );

    const requestedStatus =
      cleanText(
        url.searchParams.get(
          "status",
        ),
      ).toLowerCase();

    const statusFilter:
      | PaymentState
      | "all" =
      requestedStatus ===
        "paid" ||
      requestedStatus ===
        "partial" ||
      requestedStatus ===
        "unpaid"
        ? requestedStatus
        : "all";

    /*
     * ------------------------------------------
     * 3. Load EBBC2026 registration data
     * ------------------------------------------
     */

    const [
      ordersResult,
      ticketsResult,
      paymentsResult,
      checkInsResult,
    ] =
      await Promise.all([
        supabaseAdmin
          .from(
            "ebbc_orders",
          )
          .select(
            "id, order_number, buyer_full_name, buyer_email, buyer_phone, country, organisation, ticket_quantity, total_amount_kes, currency, order_status, payment_status, created_at, paid_at",
          )
          .order(
            "created_at",
            {
              ascending:
                false,
            },
          )
          .limit(2000),

        supabaseAdmin
          .from(
            "ebbc_tickets",
          )
          .select(
            "id, order_id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, organisation, country, event_date, ticket_status, issued_at, created_at",
          )
          .order(
            "created_at",
            {
              ascending:
                false,
            },
          )
          .limit(5000),

        supabaseAdmin
          .from(
            "ebbc_payments",
          )
          .select(
            "id, order_id, provider, transaction_reference, provider_transaction_id, payment_method, amount_kes, currency, payment_status, paid_at, verified_at, created_at",
          )
          .eq(
            "payment_status",
            "successful",
          )
          .order(
            "paid_at",
            {
              ascending:
                false,
            },
          )
          .limit(5000),

        supabaseAdmin
          .from(
            "ebbc_checkins",
          )
          .select(
            "id, ticket_id, scan_result, gate_name, event_date, scanned_at",
          )
          .in(
            "scan_result",
            [
              "accepted",
              "already_used",
            ],
          )
          .order(
            "scanned_at",
            {
              ascending:
                false,
            },
          )
          .limit(10000),
      ]);

    if (ordersResult.error) {
      console.error(
        "EBBC2026 dashboard orders error:",
        ordersResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Registration orders could not be loaded.",
        },
        500,
      );
    }

    if (ticketsResult.error) {
      console.error(
        "EBBC2026 dashboard tickets error:",
        ticketsResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Ticket registrations could not be loaded.",
        },
        500,
      );
    }

    if (paymentsResult.error) {
      console.error(
        "EBBC2026 dashboard payments error:",
        paymentsResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Payment records could not be loaded.",
        },
        500,
      );
    }

    if (checkInsResult.error) {
      console.error(
        "EBBC2026 dashboard check-in error:",
        checkInsResult.error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Check-in records could not be loaded.",
        },
        500,
      );
    }

    const orders =
      (
        ordersResult.data ||
        []
      ) as OrderRecord[];

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

    const checkIns =
      (
        checkInsResult.data ||
        []
      ) as CheckInRecord[];

    /*
     * ------------------------------------------
     * 4. Group payments and check-ins
     * ------------------------------------------
     */

    const paymentsByOrder =
      new Map<
        string,
        PaymentRecord[]
      >();

    for (
      const payment
      of payments
    ) {
      const existing =
        paymentsByOrder.get(
          payment.order_id,
        ) || [];

      existing.push(
        payment,
      );

      paymentsByOrder.set(
        payment.order_id,
        existing,
      );
    }

    const latestCheckInByTicket =
      new Map<
        string,
        CheckInRecord
      >();

    for (
      const checkIn
      of checkIns
    ) {
      if (
        !checkIn.ticket_id
      ) {
        continue;
      }

      if (
        !latestCheckInByTicket.has(
          checkIn.ticket_id,
        )
      ) {
        latestCheckInByTicket.set(
          checkIn.ticket_id,
          checkIn,
        );
      }
    }

    const orderById =
      new Map(
        orders.map(
          (order) => [
            order.id,
            order,
          ],
        ),
      );

    /*
     * ------------------------------------------
     * 5. Calculate order-level payment state
     * ------------------------------------------
     */

    const orderPaymentSummary =
      new Map<
        string,
        {
          paymentState:
            PaymentState;
          totalAmountKes:
            number;
          totalPaidKes:
            number;
          balanceKes:
            number;
          paymentMethod:
            string;
          paymentCount:
            number;
          lastPaymentReference:
            string | null;
          lastPaymentAt:
            string | null;
        }
      >();

    for (
      const order
      of orders
    ) {
      const orderPayments =
        paymentsByOrder.get(
          order.id,
        ) || [];

      const totalAmountKes =
        moneyNumber(
          order.total_amount_kes,
        );

      const totalPaidKes =
        orderPayments.reduce(
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

      const paymentState =
        getPaymentState(
          totalAmountKes,
          totalPaidKes,
        );

      const balanceKes =
        Math.max(
          totalAmountKes -
            totalPaidKes,
          0,
        );

      const methods =
        Array.from(
          new Set(
            orderPayments.map(
              (
                payment,
              ) =>
                formatPaymentMethod(
                  payment,
                ),
            ),
          ),
        );

      const paymentMethod =
        methods.length === 0
          ? "—"
          : methods.length ===
              1
            ? methods[0]
            : "Mixed";

      const lastPayment =
        orderPayments[0] ||
        null;

      orderPaymentSummary.set(
        order.id,
        {
          paymentState,
          totalAmountKes,
          totalPaidKes,
          balanceKes,
          paymentMethod,
          paymentCount:
            orderPayments.length,
          lastPaymentReference:
            lastPayment
              ?.transaction_reference ||
            null,
          lastPaymentAt:
            lastPayment
              ?.paid_at ||
            lastPayment
              ?.verified_at ||
            lastPayment
              ?.created_at ||
            null,
        },
      );
    }

    /*
     * ------------------------------------------
     * 6. Build one dashboard row per ticket
     * ------------------------------------------
     */

    const rows =
      tickets
        .map(
          (ticket) => {
            const order =
              orderById.get(
                ticket.order_id,
              );

            if (!order) {
              return null;
            }

            const payment =
              orderPaymentSummary.get(
                order.id,
              );

            if (!payment) {
              return null;
            }

            const checkIn =
              latestCheckInByTicket.get(
                ticket.id,
              );

            const qrStatus =
              getQrStatus(
                ticket.ticket_status,
              );

            const checkInStatus =
              checkIn
                ? "checked_in"
                : "not_checked_in";

            return {
              orderId:
                order.id,

              orderNumber:
                order.order_number,

              orderCreatedAt:
                order.created_at,

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

              orderStatus:
                order.order_status,

              storedPaymentStatus:
                order.payment_status,

              currency:
                order.currency ||
                "KES",

              ticketId:
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

              attendeeOrganisation:
                ticket.organisation,

              attendeeCountry:
                ticket.country,

              eventDate:
                ticket.event_date,

              ticketStatus:
                ticket.ticket_status,

              qrStatus,

              issuedAt:
                ticket.issued_at,

              totalAmountKes:
                payment.totalAmountKes,

              amountPaidKes:
                payment.totalPaidKes,

              balanceKes:
                payment.balanceKes,

              paymentState:
                payment.paymentState,

              paymentMethod:
                payment.paymentMethod,

              paymentCount:
                payment.paymentCount,

              lastPaymentReference:
                payment.lastPaymentReference,

              lastPaymentAt:
                payment.lastPaymentAt,

              checkInStatus,

              lastCheckInAt:
                checkIn
                  ?.scanned_at ||
                null,

              lastCheckInGate:
                checkIn
                  ?.gate_name ||
                null,

              lastScanResult:
                checkIn
                  ?.scan_result ||
                null,
            };
          },
        )
        .filter(
          (
            row,
          ): row is NonNullable<
            typeof row
          > => row !== null,
        );

    /*
     * ------------------------------------------
     * 7. Search and status filtering
     * ------------------------------------------
     */

    const filteredRows =
      rows.filter(
        (row) => {
          if (
            statusFilter !==
              "all" &&
            row.paymentState !==
              statusFilter
          ) {
            return false;
          }

          if (!search) {
            return true;
          }

          const haystack =
            [
              row.orderNumber,
              row.buyerFullName,
              row.buyerEmail,
              row.buyerPhone,
              row.buyerOrganisation,
              row.ticketNumber,
              row.attendeeFullName,
              row.attendeeEmail,
              row.attendeePhone,
              row.participantCategory,
              row.attendeeOrganisation,
              row.attendeeCountry,
              row.eventDate,
              row.paymentState,
              row.paymentMethod,
              row.lastPaymentReference,
              row.qrStatus,
              row.checkInStatus,
            ]
              .filter(
                Boolean,
              )
              .join(" ")
              .toLowerCase();

          return haystack.includes(
            search,
          );
        },
      );

    /*
     * ------------------------------------------
     * 8. Dashboard summary
     * ------------------------------------------
     */

    let paidOrders = 0;
    let partialOrders = 0;
    let unpaidOrders = 0;

    let grossRegisteredKes =
      0;
    let receivedKes = 0;
    let outstandingKes = 0;

    for (
      const order
      of orders
    ) {
      const summary =
        orderPaymentSummary.get(
          order.id,
        );

      if (!summary) {
        continue;
      }

      grossRegisteredKes +=
        summary.totalAmountKes;

      receivedKes +=
        summary.totalPaidKes;

      outstandingKes +=
        summary.balanceKes;

      if (
        summary.paymentState ===
        "paid"
      ) {
        paidOrders += 1;
      } else if (
        summary.paymentState ===
        "partial"
      ) {
        partialOrders += 1;
      } else {
        unpaidOrders += 1;
      }
    }

    const activeTickets =
      tickets.filter(
        (ticket) =>
          cleanText(
            ticket.ticket_status,
          ).toLowerCase() ===
          "active",
      ).length;

    const checkedInTickets =
      tickets.filter(
        (ticket) =>
          latestCheckInByTicket.has(
            ticket.id,
          ),
      ).length;

    return jsonResponse({
      ok: true,

      generatedAt:
        new Date().toISOString(),

      staff: {
        displayName:
          staff.display_name,
        role:
          staff.role,
      },

      filters: {
        q: search,
        status:
          statusFilter,
      },

      summary: {
        totalOrders:
          orders.length,

        paidOrders,

        partialOrders,

        unpaidOrders,

        totalTickets:
          tickets.length,

        activeTickets,

        checkedInTickets,

        grossRegisteredKes,

        receivedKes,

        outstandingKes,
      },

      registrations:
        filteredRows,

      totalResults:
        filteredRows.length,
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 dashboard error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The EBBC2026 dashboard could not be loaded.",
      },
      500,
    );
  }
}