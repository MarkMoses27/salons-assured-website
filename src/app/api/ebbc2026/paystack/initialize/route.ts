import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InitializePaymentBody = {
  orderNumber?: string;
};

type PaystackInitializeResponse = {
  status: boolean;
  message: string;

  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getAppUrl(request: Request) {
  const configuredAppUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredAppUrl) {
    return configuredAppUrl.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  const paystackSecretKey =
    process.env.PAYSTACK_SECRET_KEY;

  if (!paystackSecretKey) {
    console.error(
      "PAYSTACK_SECRET_KEY is missing from the environment.",
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "The Paystack payment service is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  let paymentRecordId: string | null = null;

  try {
    const body =
      (await request.json()) as InitializePaymentBody;

    const orderNumber = cleanText(
      body.orderNumber,
    ).toUpperCase();

    if (!orderNumber) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The EBBC2026 order number is required.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      data: order,
      error: orderError,
    } = await supabaseAdmin
      .from("ebbc_orders")
      .select(
        "id, order_number, buyer_full_name, buyer_email, buyer_phone, ticket_quantity, total_amount_kes, currency, order_status, payment_status",
      )
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (orderError) {
      console.error(
        "EBBC2026 order lookup error:",
        orderError,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The registration order could not be retrieved.",
        },
        {
          status: 500,
        },
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The EBBC2026 registration order was not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (
      order.payment_status === "paid" ||
      order.order_status === "paid" ||
      order.order_status === "completed"
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "This registration order has already been paid.",
        },
        {
          status: 409,
        },
      );
    }

    const blockedOrderStatuses = [
      "cancelled",
      "refunded",
      "expired",
    ];

    if (
      blockedOrderStatuses.includes(
        String(order.order_status),
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "This registration order can no longer be paid.",
        },
        {
          status: 409,
        },
      );
    }

    const amountKes = Number(
      order.total_amount_kes,
    );

    if (
      !Number.isInteger(amountKes) ||
      amountKes <= 0
    ) {
      console.error(
        "Invalid EBBC2026 order amount:",
        order.total_amount_kes,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The registration order has an invalid payment amount.",
        },
        {
          status: 500,
        },
      );
    }

    const currency = String(
      order.currency || "KES",
    ).toUpperCase();

    if (currency !== "KES") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "This registration order has an unsupported currency.",
        },
        {
          status: 400,
        },
      );
    }

    const referenceSuffix = randomUUID()
      .replaceAll("-", "")
      .slice(0, 12)
      .toUpperCase();

    const transactionReference =
      `${order.order_number}-${referenceSuffix}`;

    const {
      data: paymentRecord,
      error: paymentInsertError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .insert({
        order_id: order.id,

        provider: "paystack",

        transaction_reference:
          transactionReference,

        provider_transaction_id: null,

        payment_method: null,

        amount_kes: amountKes,

        currency,

        payment_status: "initiated",

        customer_email:
          order.buyer_email,

        customer_phone:
          order.buyer_phone,

        provider_response: {},

        failure_reason: null,
      })
      .select("id")
      .single();

    if (
      paymentInsertError ||
      !paymentRecord
    ) {
      console.error(
        "EBBC2026 payment record creation error:",
        paymentInsertError,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The payment record could not be prepared.",
        },
        {
          status: 500,
        },
      );
    }

    paymentRecordId =
      paymentRecord.id;

    const appUrl =
      getAppUrl(request);

    const callbackUrl =
      `${appUrl}/api/ebbc2026/paystack/callback`;

    const metadata = JSON.stringify({
      order_id:
        order.id,

      order_number:
        order.order_number,

      buyer_name:
        order.buyer_full_name,

      buyer_phone:
        order.buyer_phone,

      ticket_quantity:
        order.ticket_quantity,

      event_code:
        "EBBC2026",

      event_name:
        "Elevate Beauty Business Convention 2026",
    });

    const paystackResponse =
      await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${paystackSecretKey}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify({
            email:
              order.buyer_email,

            amount:
              String(amountKes * 100),

            currency,

            reference:
              transactionReference,

            callback_url:
              callbackUrl,

            channels: [
              "mobile_money",
              "card",
            ],

            metadata,
          }),

          cache: "no-store",
        },
      );

    const paystackData =
      (await paystackResponse.json()) as
        PaystackInitializeResponse;

    if (
      !paystackResponse.ok ||
      !paystackData.status ||
      !paystackData.data
    ) {
      console.error(
        "Paystack initialization error:",
        paystackData,
      );

      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status:
            "failed",

          failure_reason:
            paystackData.message ||
            "Paystack initialization failed.",

          provider_response:
            paystackData,
        })
        .eq(
          "id",
          paymentRecord.id,
        );

      return NextResponse.json(
        {
          ok: false,
          message:
            paystackData.message ||
            "Paystack checkout could not be started.",
        },
        {
          status: 502,
        },
      );
    }

    const {
      error: paymentUpdateError,
    } = await supabaseAdmin
      .from("ebbc_payments")
      .update({
        payment_status:
          "pending",

        provider_response:
          paystackData,

        failure_reason:
          null,
      })
      .eq(
        "id",
        paymentRecord.id,
      );

    if (paymentUpdateError) {
      console.error(
        "Payment update error after Paystack initialization:",
        paymentUpdateError,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "Paystack checkout was created, but the payment record could not be updated.",
        },
        {
          status: 500,
        },
      );
    }

    const {
      error: orderUpdateError,
    } = await supabaseAdmin
      .from("ebbc_orders")
      .update({
        order_status:
          "payment_pending",

        payment_status:
          "pending",
      })
      .eq(
        "id",
        order.id,
      );

    if (orderUpdateError) {
      console.error(
        "Order update error after Paystack initialization:",
        orderUpdateError,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "Paystack checkout was created, but the registration order could not be updated.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      ok: true,

      message:
        "Paystack checkout created successfully.",

      authorizationUrl:
        paystackData.data.authorization_url,

      authorization_url:
        paystackData.data.authorization_url,

      accessCode:
        paystackData.data.access_code,

      reference:
        paystackData.data.reference,

      orderNumber:
        order.order_number,

      amountKes,

      currency,

      paymentMethod:
        "paystack",
    });
  } catch (error) {
    console.error(
      "Unexpected Paystack initialization error:",
      error,
    );

    if (paymentRecordId) {
      await supabaseAdmin
        .from("ebbc_payments")
        .update({
          payment_status:
            "failed",

          failure_reason:
            error instanceof Error
              ? error.message
              : "Unexpected Paystack initialization error.",
        })
        .eq(
          "id",
          paymentRecordId,
        );
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          "An unexpected payment initialization error occurred.",
      },
      {
        status: 500,
      },
    );
  }
}