import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { error } = await supabaseAdmin
      .from("ebbc_orders")
      .select("id")
      .limit(1);

    if (error) {
      console.error(
        "EBBC2026 database connection error:",
        error,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The EBBC2026 database connection failed.",
          error: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "EBBC2026 database connected successfully.",
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 health-check error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "An unexpected database connection error occurred.",
      },
      {
        status: 500,
      },
    );
  }
}