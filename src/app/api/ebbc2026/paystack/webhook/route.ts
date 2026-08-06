
import {
  createHmac,
  timingSafeEqual,
} from "crypto";
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaystackCustomer = {
  email?: string | null;
  phone?: string | null;
};

type PaystackAuthorization = {
  channel?: string | null;
  card_type?: string | null;
  bank?: string | null;
  last4?: string | null;
  brand?: string | null;
};

type PaystackWebhookData = {
  id?: number | string;
  domain?: string;
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  paid_at?: string | null;
  created_at?: string | null;
  channel?: string | null;
  gateway_response?: string | null;
  metadata?: unknown;
  customer?: PaystackCustomer | null;
  authorization?: PaystackAuthorization | null;
};

type PaystackWebhookEvent = {
  event?: string;
  data?: PaystackWebhookData;
};

function verifyPaystackSignature(
  rawBody: string,
  receivedSignature: string,
  secretKey: string,
) {
  const expectedSignature = createHmac(
    "sha512",
    secretKey,
  )
    .update(rawBody)
    .digest("hex");

  const expectedBuffer = Buffer.from(
    expectedSignature,
    "utf8",
  );

  const receivedBuffer = Buffer.from(
    receivedSignature,
    "utf8",
  );

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  );
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
  });
}

export async function POST(request: Request) {
  const paystackSecretKey =
    process.env.PAYSTACK_SECRET_KEY;

  if (!paystackSecretKey) {
    console.error(
      "PAYSTACK_SECRET_KEY is missing.",
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The Paystack webhook is not configured.",
      },
      500,
    );
  }

  const receivedSignature =
    request.headers.get(
      "x-paystack-signature",
    );

  if (!receivedSignature) {
    return jsonResponse(
      {
        ok: false,
        message:
          "The Paystack signature is missing.",
      },
      401,
    );
  }

  let rawBody = "";

  try {
    rawBody = await request.text();
  } catch (error) {
    console.error(
      "Could not read Paystack webhook body:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The webhook body could not be read.",
      },
      400,
    );
  }

  const signatureIsValid =
    verifyPaystackSignature(
      rawBody,
      receivedSignature,
      paystackSecretKey,
    );

  if (!signatureIsValid) {
    console.error(
      "Invalid Paystack webhook signature.",
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The Paystack signature is invalid.",
      },
      401,
    );
  }

  let webhookEvent: PaystackWebhookEvent;

  try {
    webhookEvent =
      JSON.parse(
        rawBody,
      ) as PaystackWebhookEvent;
  } catch (error) {
    console.error(
      "Invalid Paystack webhook JSON:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The webhook payload is invalid.",
      },
      400,
    );
  }

  if (
    webhookEvent.event !==
    "charge.success"
  ) {
    return jsonResponse({
      ok: true,
      message:
        "The Paystack event was acknowledged and ignored.",
      event:
        webhookEvent.event || "unknown",
    });
  }

  const transaction =
    webhookEvent.data;

  if (!transaction) {
    return jsonResponse(
      {
        ok: false,
        message:
          "The successful charge event has no transaction data.",
      },
      400,
    );
  }

  const reference = String(
    transaction.reference || "",
  ).trim();

  if (!reference) {
    return jsonResponse(
      {
        ok: false,
        message:
          "The transaction reference is missing.",
      },
      400,
    );
  }

  const transactionStatus = String(
    transaction.status || "",
  ).toLowerCase();

  if (
    transactionStatus !== "success"
  ) {
    return jsonResponse({
      ok: true,
      message:
        "The charge event was acknowledged but was not successful.",
      reference,
    });
  }

  try {
    const {
      data: payment,
      error: paymentLookupError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .select(
        "id, order_id, provider, transaction_reference, provider_transaction_id, amount_kes, currency, payment_status, customer_email",
      )
      .eq(
        "transaction_reference",
        reference,
      )
      .maybeSingle();

    if (paymentLookupError) {
      console.error(
        "Webhook payment lookup error:",
        paymentLookupError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The payment record could not be retrieved.",
        },
        500,
      );
    }

    /*
     * Return 200 for an unknown valid Paystack
     * transaction so Paystack does not keep
     * retrying an event that does not belong
     * to an EBBC2026 order.
     */
    if (!payment) {
      console.warn(
        "No EBBC2026 payment matched Paystack reference:",
        reference,
      );

      return jsonResponse({
        ok: true,
        message:
          "The Paystack event was acknowledged, but no EBBC2026 payment matched it.",
        reference,
      });
    }

    if (
      String(payment.provider).toLowerCase() !==
      "paystack"
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "The payment provider did not match Paystack.",
        },
        409,
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
      .eq(
        "id",
        payment.order_id,
      )
      .maybeSingle();

    if (
      orderLookupError ||
      !order
    ) {
      console.error(
        "Webhook order lookup error:",
        orderLookupError,
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

    const expectedAmountKes = Number(
      order.total_amount_kes,
    );

    const storedPaymentAmountKes = Number(
      payment.amount_kes,
    );

    const expectedAmountSubunit =
      expectedAmountKes * 100;

    const receivedAmountSubunit = Number(
      transaction.amount,
    );

    const expectedCurrency = String(
      order.currency || "KES",
    ).toUpperCase();

    const receivedCurrency = String(
      transaction.currency || "",
    ).toUpperCase();

    if (
      !Number.isInteger(
        expectedAmountKes,
      ) ||
      expectedAmountKes <= 0
    ) {
      console.error(
        "Invalid EBBC2026 order amount:",
        order.total_amount_kes,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The registration order amount is invalid.",
        },
        500,
      );
    }

    if (
      storedPaymentAmountKes !==
      expectedAmountKes
    ) {
      console.error(
        "Stored payment amount mismatch:",
        {
          reference,
          storedPaymentAmountKes,
          expectedAmountKes,
        },
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The stored payment amount did not match the order.",
        },
        409,
      );
    }

    if (
      receivedAmountSubunit !==
      expectedAmountSubunit
    ) {
      console.error(
        "Paystack webhook amount mismatch:",
        {
          reference,
          receivedAmountSubunit,
          expectedAmountSubunit,
        },
      );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The Paystack webhook amount did not match the registration order.",

          provider_response:
            webhookEvent,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return jsonResponse(
        {
          ok: false,
          message:
            "The Paystack payment amount was incorrect.",
        },
        409,
      );
    }

    if (
      receivedCurrency !==
      expectedCurrency
    ) {
      console.error(
        "Paystack webhook currency mismatch:",
        {
          reference,
          receivedCurrency,
          expectedCurrency,
        },
      );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The Paystack webhook currency did not match the registration order.",

          provider_response:
            webhookEvent,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return jsonResponse(
        {
          ok: false,
          message:
            "The Paystack payment currency was incorrect.",
        },
        409,
      );
    }

    const paystackEmail = String(
      transaction.customer?.email || "",
    )
      .trim()
      .toLowerCase();

    const orderEmail = String(
      order.buyer_email || "",
    )
      .trim()
      .toLowerCase();

    if (
      paystackEmail &&
      orderEmail &&
      paystackEmail !== orderEmail
    ) {
      console.error(
        "Paystack webhook customer mismatch:",
        {
          reference,
          paystackEmail,
          orderEmail,
        },
      );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status: "failed",

          failure_reason:
            "The Paystack webhook customer email did not match the registration.",

          provider_response:
            webhookEvent,

          verified_at:
            new Date().toISOString(),
        })
        .eq("id", payment.id);

      return jsonResponse(
        {
          ok: false,
          message:
            "The Paystack customer did not match the registration.",
        },
        409,
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

    const providerTransactionId =
      transaction.id === undefined ||
      transaction.id === null
        ? null
        : String(transaction.id);

    const {
      error: paymentUpdateError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .update({
        provider_transaction_id:
          providerTransactionId,

        payment_method:
          paymentMethod,

        payment_status:
          "successful",

        provider_response:
          webhookEvent,

        failure_reason: null,

        paid_at: paidAt,

        verified_at:
          currentTime,
      })
      .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error(
        "Webhook payment update error:",
        paymentUpdateError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The successful payment could not be recorded.",
        },
        500,
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
        "Webhook order update error:",
        orderUpdateError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The paid order could not be updated.",
        },
        500,
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
        "Webhook ticket activation error:",
        ticketUpdateError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The tickets could not be activated.",
        },
        500,
      );
    }

    return jsonResponse({
      ok: true,
      message:
        "The Paystack payment was confirmed and the EBBC2026 tickets were activated.",
      reference,
      orderNumber:
        order.order_number,
    });
  } catch (error) {
    console.error(
      "Unexpected Paystack webhook error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "An unexpected webhook error occurred.",
      },
      500,
    );
  }
}