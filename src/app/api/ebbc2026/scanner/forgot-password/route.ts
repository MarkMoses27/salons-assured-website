import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  email?: string;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
  });
}

function getTrustedAppUrl() {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL;

  if (!appUrl) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is missing.",
    );
  }

  const parsed =
    new URL(appUrl);

  if (
    parsed.protocol !== "http:" &&
    parsed.protocol !== "https:"
  ) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL is invalid.",
    );
  }

  return parsed
    .toString()
    .replace(/\/$/, "");
}

function getTransporter() {
  const host =
    process.env.SMTP_HOST;

  const port =
    Number(
      process.env.SMTP_PORT ||
        "587",
    );

  const user =
    process.env.SMTP_USER;

  const pass =
    process.env.SMTP_PASS;

  if (
    !host ||
    !user ||
    !pass ||
    !Number.isFinite(port)
  ) {
    throw new Error(
      "SMTP configuration is missing.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,

    secure:
      port === 465,

    requireTLS:
      port === 587,

    auth: {
      user,
      pass,
    },
  });
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function genericSuccess() {
  return jsonResponse({
    ok: true,
    message:
      "If this scanner account exists, a password reset email has been sent.",
  });
}

export async function POST(
  request: Request,
) {
  let body: RequestBody;

  try {
    body =
      (await request.json()) as
        RequestBody;
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          "Invalid request.",
      },
      400,
    );
  }

  const email =
    String(
      body.email || "",
    )
      .trim()
      .toLowerCase();

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email,
    )
  ) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Enter a valid email address.",
      },
      400,
    );
  }

  try {
    const appUrl =
      getTrustedAppUrl();

    const {
      data: linkData,
      error: linkError,
    } =
      await supabaseAdmin.auth.admin.generateLink(
        {
          type: "recovery",
          email,
        },
      );

    if (
      linkError ||
      !linkData?.user ||
      !linkData.properties
        ?.hashed_token
    ) {
      if (linkError) {
        console.error(
          "EBBC2026 recovery link generation error:",
          linkError,
        );
      }

      return genericSuccess();
    }

    const user =
      linkData.user;

    const {
      data: staff,
      error: staffError,
    } = await supabaseAdmin
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
        "EBBC2026 recovery staff lookup error:",
        staffError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Password recovery is temporarily unavailable.",
        },
        500,
      );
    }

    if (
      !staff ||
      staff.is_active !== true ||
      (
        staff.role !== "scanner" &&
        staff.role !== "admin"
      )
    ) {
      return genericSuccess();
    }

    const {
      data: claimed,
      error: claimError,
    } = await supabaseAdmin.rpc(
      "claim_ebbc_scanner_password_reset",
      {
        p_user_id:
          user.id,
      },
    );

    if (claimError) {
      console.error(
        "EBBC2026 password reset cooldown error:",
        claimError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Password recovery is temporarily unavailable.",
        },
        500,
      );
    }

    if (claimed !== true) {
      return genericSuccess();
    }

    const tokenHash =
      linkData.properties
        .hashed_token;

    /*
     * Important:
     * The email goes directly to OUR
     * reset-password page.
     *
     * The next page will verify this
     * token using Supabase verifyOtp().
     */
    const resetLink =
      `${appUrl}/ebbc2026/scanner/reset-password` +
      `?token_hash=${encodeURIComponent(tokenHash)}` +
      `&type=recovery`;

    const safeResetLink =
      escapeHtml(resetLink);

    const transporter =
      getTransporter();

    const from =
      process.env.EMAIL_FROM ||
      "Elevate Beauty Business Convention <elevate@salonsassured.com>";

    const mailResult =
      await transporter.sendMail({
        from,

        to: email,

        subject:
          "EBBC2026 Staff Password Reset",

        text: [
          "EBBC2026 Staff Access",
          "",
          "A password reset was requested for your EBBC2026 scanner account.",
          "",
          "Use the secure link below to create a new password:",
          "",
          resetLink,
          "",
          "If you did not request this password reset, ignore this email.",
          "",
          "Salons Assured Kenya Ltd",
        ].join("\n"),

        html: `
          <!doctype html>
          <html>
            <body
              style="
                margin:0;
                padding:0;
                background:#f6f4f4;
                font-family:Arial,Helvetica,sans-serif;
                color:#0d1d34;
              "
            >
              <div style="padding:32px 16px;">
                <div
                  style="
                    max-width:560px;
                    margin:0 auto;
                    background:#ffffff;
                    border:1px solid #e9e9e9;
                    border-radius:20px;
                    overflow:hidden;
                  "
                >
                  <div
                    style="
                      background:#0d1d34;
                      padding:30px;
                    "
                  >
                    <div
                      style="
                        color:#cc8591;
                        font-size:11px;
                        font-weight:700;
                        letter-spacing:2px;
                      "
                    >
                      EBBC2026
                    </div>

                    <h1
                      style="
                        margin:10px 0 0;
                        color:#ffffff;
                        font-size:26px;
                        line-height:1.25;
                      "
                    >
                      Staff Password Reset
                    </h1>
                  </div>

                  <div style="padding:30px;">
                    <p
                      style="
                        margin:0;
                        color:#4d5969;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      A password reset was requested
                      for your EBBC2026 scanner
                      account.
                    </p>

                    <div style="margin:28px 0;">
                      <a
                        href="${safeResetLink}"
                        style="
                          display:inline-block;
                          background:#0d1d34;
                          color:#ffffff;
                          text-decoration:none;
                          padding:15px 24px;
                          border-radius:12px;
                          font-size:14px;
                          font-weight:700;
                        "
                      >
                        Reset Password
                      </a>
                    </div>

                    <p
                      style="
                        margin:0;
                        color:#7d8793;
                        font-size:12px;
                        line-height:1.7;
                      "
                    >
                      If you did not request this
                      password reset, you can safely
                      ignore this email.
                    </p>
                  </div>

                  <div
                    style="
                      border-top:1px solid #eeeeee;
                      padding:20px 30px;
                      color:#9aa1aa;
                      font-size:11px;
                    "
                  >
                    Salons Assured Kenya Ltd
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

    console.log(
      "EBBC2026 scanner password reset email sent:",
      {
        userId:
          user.id,

        messageId:
          mailResult.messageId,
      },
    );

    return jsonResponse({
      ok: true,
      message:
        "Password reset email sent. Check your inbox.",
    });
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 custom password recovery error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "The password reset email could not be sent.",
      },
      500,
    );
  }
}