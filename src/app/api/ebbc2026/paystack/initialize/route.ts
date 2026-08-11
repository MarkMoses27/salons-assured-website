import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InitializePaymentBody = {
  orderNumber?: string;
};

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

function getAppUrl(
  request: Request,
) {
  const configuredAppUrl =
    process.env
      .NEXT_PUBLIC_APP_URL
      ?.trim();

  if (
    configuredAppUrl
  ) {
    return configuredAppUrl.replace(
      /\/$/,
      "",
    );
  }

  return new URL(
    request.url,
  ).origin;
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as
        InitializePaymentBody;

    const orderNumber =
      cleanText(
        body.orderNumber,
      ).toUpperCase();

    if (
      !orderNumber
    ) {
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
    } =
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .select(
          "id, order_number, total_amount_kes, currency, order_status, payment_status",
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

    if (
      !order
    ) {
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
      order.payment_status ===
        "paid" ||
      order.order_status ===
        "paid" ||
      order.order_status ===
        "completed"
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

    const blockedStatuses = [
      "cancelled",
      "refunded",
      "expired",
    ];

    if (
      blockedStatuses.includes(
        String(
          order.order_status,
        ),
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

    const amountKes =
      Number(
        order.total_amount_kes,
      );

    if (
      !Number.isFinite(
        amountKes,
      ) ||
      amountKes <= 0
    ) {
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

    const currency =
      String(
        order.currency ||
          "KES",
      ).toUpperCase();

    const appUrl =
      getAppUrl(
        request,
      );

    const paymentUrl =
      new URL(
        "/ebbc2026/paybill",
        appUrl,
      );

    paymentUrl.searchParams.set(
      "order",
      order.order_number,
    );

    paymentUrl.searchParams.set(
      "amount",
      String(
        amountKes,
      ),
    );

    paymentUrl.searchParams.set(
      "currency",
      currency,
    );

    return NextResponse.json({
      ok: true,

      message:
        "Equity Paybill payment instructions are ready.",

      authorizationUrl:
        paymentUrl.toString(),

      authorization_url:
        paymentUrl.toString(),

      orderNumber:
        order.order_number,

      amountKes,

      currency,

      paymentMethod:
        "equity_paybill",

      paybillNumber:
        "247247",

      accountNumber:
        "100831",
    });
  } catch (
    error
  ) {
    console.error(
      "Unexpected EBBC2026 manual payment error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "The payment instructions could not be opened.",
      },
      {
        status: 500,
      },
    );
  }
}