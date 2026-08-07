import { NextResponse } from "next/server";

import { sendEbbc2026TicketEmailsForOrder } from "@/lib/ebbc2026/email";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    id: number | string;
    domain?: string;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at?: string | null;
    created_at?: string | null;
    channel?: string | null;
    gateway_response?: string | null;
    metadata?: unknown;

    authorization?: {
      channel?: string | null;
      card_type?: string | null;
      bank?: string | null;
      last4?: string | null;
      brand?: string | null;
    } | null;

    customer?: {
      email?: string | null;
      phone?: string | null;
    } | null;
  };
};

function createResultUrl(
  request: Request,
  status: "success" | "pending" | "failed",
  orderNumber?: string,
  message?: string,
) {
  const requestOrigin =
    new URL(request.url).origin;

  const configuredAppUrl =
    process.env.NEXT_PUBLIC_APP_URL;

  const appUrl =
    configuredAppUrl &&
    configuredAppUrl.trim()
      ? configuredAppUrl
      : requestOrigin;

  const resultUrl = new URL(
    "/ebbc2026/tickets/payment-result",
    appUrl,
  );

  resultUrl.searchParams.set(
    "status",
    status,
  );

  if (orderNumber) {
    resultUrl.searchParams.set(
      "order",
      orderNumber,
    );
  }

  if (message) {
    resultUrl.searchParams.set(
      "message",
      message,
    );
  }

  return resultUrl;
}

function redirectToResult(
  request: Request,
  status: "success" | "pending" | "failed",
  orderNumber?: string,
  message?: string,
) {
  return NextResponse.redirect(
    createResultUrl(
      request,
      status,
      orderNumber,
      message,
    ),
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
      "EBBC2026 ticket email delivery completed:",
      {
        orderNumber,
        totalTickets:
          result.totalTickets,
        sent: result.sent,
        skipped: result.skipped,
        failed: result.failed,
      },
    );

    if (result.failed > 0) {
      console.error(
        "One or more EBBC2026 ticket emails failed:",
        {
          orderNumber,
          failed: result.failed,
        },
      );
    }

    return result;
  } catch (error) {
    console.error(
      `EBBC2026 automatic ticket email delivery failed for order ${orderNumber}:`,
      error,
    );

    return null;
  }
}

export async function GET(request: Request) {
  const paystackSecretKey =
    process.env.PAYSTACK_SECRET_KEY;

  const requestUrl = new URL(request.url);

  const reference =
    requestUrl.searchParams.get(
      "reference",
    ) ||
    requestUrl.searchParams.get(
      "trxref",
    ) ||
    "";

  if (!reference) {
    return redirectToResult(
      request,
      "failed",
      undefined,
      "The payment reference is missing.",
    );
  }

  if (!paystackSecretKey) {
    console.error(
      "PAYSTACK_SECRET_KEY is missing.",
    );

    return redirectToResult(
      request,
      "failed",
      undefined,
      "The payment service is not configured.",
    );
  }

  try {
    const {
      data: payment,
      error: paymentLookupError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .select(
        "id, order_id, transaction_reference, provider_transaction_id, amount_kes, currency, payment_status",
      )
      .eq(
        "transaction_reference",
        reference,
      )
      .maybeSingle();

    if (paymentLookupError) {
      console.error(
        "Payment lookup error:",
        paymentLookupError,
      );

      return redirectToResult(
        request,
        "failed",
        undefined,
        "The payment record could not be retrieved.",
      );
    }

    if (!payment) {
      return redirectToResult(
        request,
        "failed",
        undefined,
        "No registration payment matches this reference.",
      );
    }

    const {
      data: order,
      error: orderLookupError,
    } = await supabaseAdmin
      .from("ebbc_orders")
      .select(
        "id, order_number, buyer_email, total_amount_kes, currency, order_status, payment_status",
      )
      .eq("id", payment.order_id)
      .maybeSingle();

    if (
      orderLookupError ||
      !order
    ) {
      console.error(
        "Order lookup error:",
        orderLookupError,
      );

      return redirectToResult(
        request,
        "failed",
        undefined,
        "The registration order could not be retrieved.",
      );
    }

    const verificationResponse =
      await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(
          reference,
        )}`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${paystackSecretKey}`,
            Accept: "application/json",
          },

          cache: "no-store",
        },
      );

    const verification =
      (await verificationResponse.json()) as PaystackVerifyResponse;

    if (
      !verificationResponse.ok ||
      !verification.status ||
      !verification.data
    ) {
      console.error(
        "Paystack verification error:",
        verification,
      );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          failure_reason:
            verification.message ||
            "Paystack verification failed.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        verification.message ||
          "The payment could not be verified.",
      );
    }

    const transaction =
      verification.data;

    const expectedAmountKes =
      Number(order.total_amount_kes);

    const expectedAmountSubunit =
      expectedAmountKes * 100;

    const verifiedAmountSubunit =
      Number(transaction.amount);

    const expectedCurrency =
      String(
        order.currency || "KES",
      ).toUpperCase();

    const verifiedCurrency =
      String(
        transaction.currency || "",
      ).toUpperCase();

    const transactionStatus =
      String(
        transaction.status || "",
      ).toLowerCase();

    const transactionReference =
      String(
        transaction.reference || "",
      );

    if (
      transactionReference !==
      reference
    ) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The verified transaction reference did not match.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The payment reference did not match the registration.",
      );
    }

    if (
      Number(payment.amount_kes) !==
      expectedAmountKes
    ) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The stored payment amount did not match the order total.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The payment amount did not match the order.",
      );
    }

    if (
      verifiedAmountSubunit !==
      expectedAmountSubunit
    ) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The amount returned by Paystack did not match the order total.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The verified payment amount was incorrect.",
      );
    }

    if (
      verifiedCurrency !==
      expectedCurrency
    ) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The payment currency did not match the order currency.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The verified payment currency was incorrect.",
      );
    }

    if (
      transaction.customer?.email &&
      transaction.customer.email
        .toLowerCase() !==
        String(
          order.buyer_email,
        ).toLowerCase()
    ) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The Paystack customer email did not match the order email.",

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The payment customer did not match the registration.",
      );
    }

    if (
      transactionStatus !== "success"
    ) {
      const pendingStatuses = [
        "pending",
        "ongoing",
        "processing",
        "queued",
      ];

      const isPending =
        pendingStatuses.includes(
          transactionStatus,
        );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: isPending
            ? "pending"
            : "failed",

          failure_reason: isPending
            ? null
            : transaction.gateway_response ||
              `Paystack returned ${transactionStatus}.`,

          provider_response:
            verification,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      await supabaseAdmin
        .from("ebbc_orders")
        .update({
          payment_status: isPending
            ? "pending"
            : "failed",

          order_status: isPending
            ? "payment_pending"
            : "failed",
        })
        .eq("id", order.id);

      return redirectToResult(
        request,
        isPending
          ? "pending"
          : "failed",
        order.order_number,
        isPending
          ? "Your payment is still being processed."
          : "The payment was not successful.",
      );
    }

    if (
      payment.payment_status ===
        "successful" &&
      order.payment_status === "paid"
    ) {
      const retryTime =
        new Date().toISOString();

      const {
        error:
          pendingTicketActivationError,
      } = await supabaseAdmin
        .from("ebbc_tickets")
        .update({
          payment_id: payment.id,
          ticket_status: "active",
          issued_at: retryTime,
        })
        .eq("order_id", order.id)
        .eq(
          "ticket_status",
          "pending",
        );

      if (
        pendingTicketActivationError
      ) {
        console.error(
          "Existing payment ticket activation retry error:",
          pendingTicketActivationError,
        );
      }

      await sendTicketEmailsSafely(
        order.id,
        order.order_number,
      );

      return redirectToResult(
        request,
        "success",
        order.order_number,
        "Your payment was already verified and your tickets are active.",
      );
    }

    const currentTime =
      new Date().toISOString();

    const paidAt =
      transaction.paid_at ||
      currentTime;

    const paymentMethod =
      transaction.channel ||
      transaction.authorization
        ?.channel ||
      null;

    const {
      error: paymentUpdateError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .update({
        provider_transaction_id:
          String(transaction.id),

        payment_method:
          paymentMethod,

        payment_status:
          "successful",

        provider_response:
          verification,

        failure_reason: null,

        paid_at: paidAt,

        verified_at:
          currentTime,
      })
      .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error(
        "Payment update error:",
        paymentUpdateError,
      );

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The payment was verified but could not be recorded.",
      );
    }

    const {
      error: orderUpdateError,
    } = await supabaseAdmin
      .from("ebbc_orders")
      .update({
        payment_status: "paid",
        order_status: "paid",
        paid_at: paidAt,
      })
      .eq("id", order.id);

    if (orderUpdateError) {
      console.error(
        "Order update error:",
        orderUpdateError,
      );

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "The payment was verified but the order could not be activated.",
      );
    }

    const {
      error: ticketUpdateError,
    } = await supabaseAdmin
      .from("ebbc_tickets")
      .update({
        payment_id: payment.id,
        ticket_status: "active",
        issued_at: currentTime,
      })
      .eq("order_id", order.id)
      .in("ticket_status", [
        "pending",
        "active",
      ]);

    if (ticketUpdateError) {
      console.error(
        "Ticket activation error:",
        ticketUpdateError,
      );

      return redirectToResult(
        request,
        "failed",
        order.order_number,
        "Payment succeeded, but the tickets could not be activated automatically.",
      );
    }

    await sendTicketEmailsSafely(
      order.id,
      order.order_number,
    );

    return redirectToResult(
      request,
      "success",
      order.order_number,
      "Your payment was verified and your tickets are active.",
    );
  } catch (error) {
    console.error(
      "Unexpected Paystack callback error:",
      error,
    );

    return redirectToResult(
      request,
      "failed",
      undefined,
      "An unexpected payment verification error occurred.",
    );
  }
}