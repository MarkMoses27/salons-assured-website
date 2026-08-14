import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function GET() {
  try {
    const {
      error,
    } =
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .select("id")
        .limit(1);

    if (error) {
      /*
       * Keep the detailed database error
       * server-side only. Do not expose
       * Supabase/schema information publicly.
       */
      console.error(
        "EBBC2026 database connection error:",
        error,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The EBBC2026 service is temporarily unavailable.",
        },
        500,
      );
    }

    return jsonResponse({
      ok: true,
      message:
        "EBBC2026 service is operational.",
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 health-check error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The EBBC2026 service is temporarily unavailable.",
      },
      500,
    );
  }
}