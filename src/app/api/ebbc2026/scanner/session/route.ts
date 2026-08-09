import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
  });
}

function getBearerToken(
  request: Request,
) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const [scheme, token] =
    authorization.split(" ");

  if (
    scheme?.toLowerCase() !== "bearer" ||
    !token?.trim()
  ) {
    return null;
  }

  return token.trim();
}

export async function GET(
  request: Request,
) {
  const accessToken =
    getBearerToken(request);

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        authenticated: false,
        authorized: false,
        message:
          "Scanner authentication is required.",
      },
      401,
    );
  }

  try {
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
          authenticated: false,
          authorized: false,
          message:
            "The scanner session is invalid or expired.",
        },
        401,
      );
    }

    const user = userData.user;

    const {
      data: staff,
      error: staffError,
    } = await supabaseAdmin
      .from("ebbc_scanner_staff")
      .select(
        "user_id, display_name, role, is_active",
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (staffError) {
      console.error(
        "EBBC2026 scanner authorization lookup error:",
        staffError,
      );

      return jsonResponse(
        {
          ok: false,
          authenticated: true,
          authorized: false,
          message:
            "Scanner access could not be verified.",
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
          authenticated: true,
          authorized: false,
          message:
            "This account is not authorized for EBBC2026 scanning.",
        },
        403,
      );
    }

    if (
      staff.role !== "scanner" &&
      staff.role !== "admin"
    ) {
      return jsonResponse(
        {
          ok: false,
          authenticated: true,
          authorized: false,
          message:
            "This account does not have a valid scanner role.",
        },
        403,
      );
    }

    return jsonResponse({
      ok: true,
      authenticated: true,
      authorized: true,

      staff: {
        id: user.id,
        email: user.email || null,
        displayName:
          staff.display_name,
        role: staff.role,
      },
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 scanner session error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        authenticated: false,
        authorized: false,
        message:
          "An unexpected scanner authentication error occurred.",
      },
      500,
    );
  }
}