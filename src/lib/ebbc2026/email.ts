import nodemailer from "nodemailer";
import QRCode from "qrcode";

import { supabaseAdmin } from "@/lib/supabase/admin";

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
  ticket_status: string;
  access_token: string;
  issued_at: string | null;
};

type DeliveryRecord = {
  id: string;
  delivery_status: string;
};

export type TicketEmailDeliveryResult = {
  orderId: string;
  totalTickets: number;
  sent: number;
  skipped: number;
  failed: number;
};

function getRequiredEnvironmentVariable(
  variableName: string,
) {
  const value =
    process.env[variableName]?.trim();

  if (!value) {
    throw new Error(
      `${variableName} is missing.`,
    );
  }

  return value;
}

function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.salonsassured.com"
  ).replace(/\/$/, "");
}

function escapeHtml(
  value: string | null | undefined,
) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createTransporter() {
  const smtpHost =
    getRequiredEnvironmentVariable(
      "SMTP_HOST",
    );

  const smtpPort = Number(
    getRequiredEnvironmentVariable(
      "SMTP_PORT",
    ),
  );

  const smtpUser =
    getRequiredEnvironmentVariable(
      "SMTP_USER",
    );

  const smtpPass =
    getRequiredEnvironmentVariable(
      "SMTP_PASS",
    );

  if (
    !Number.isInteger(smtpPort) ||
    smtpPort <= 0
  ) {
    throw new Error(
      "SMTP_PORT is invalid.",
    );
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort === 587,

    auth: {
      user: smtpUser,
      pass: smtpPass,
    },

    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

function createPlainTextEmail(
  ticket: TicketRecord,
  secureTicketUrl: string,
) {
  return [
    `Hello ${ticket.attendee_full_name},`,
    "",
    "Your payment for the Elevate Beauty Business Convention 2026 has been confirmed.",
    "",
    `Ticket number: ${ticket.ticket_number}`,
    "Convention dates: 17–18 November 2026",
    "Venue: CITAM Valley Road, Nairobi",
    "",
    "Open your secure ticket using the link below:",
    secureTicketUrl,
    "",
    "Present the QR code on your secure ticket during entry verification.",
    "",
    "Keep this ticket link private because it uniquely identifies your registration.",
    "",
    "Elevate Beauty Business Convention 2026",
    "Organised by Salons Assured Kenya Ltd",
  ].join("\n");
}

function createHtmlEmail(
  ticket: TicketRecord,
  secureTicketUrl: string,
) {
  const attendeeName = escapeHtml(
    ticket.attendee_full_name,
  );

  const ticketNumber = escapeHtml(
    ticket.ticket_number,
  );

  const participantCategory =
    escapeHtml(
      ticket.participant_category ||
        "Attendee",
    );

  const organisation = escapeHtml(
    ticket.organisation ||
      "Not provided",
  );

  const safeTicketUrl = escapeHtml(
    secureTicketUrl,
  );

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Your EBBC2026 Ticket</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f7f5f5;
          font-family:Arial,Helvetica,sans-serif;
          color:#0d1d34;
        "
      >
        <div
          style="
            width:100%;
            background:#f7f5f5;
            padding:32px 14px;
          "
        >
          <div
            style="
              width:100%;
              max-width:640px;
              margin:0 auto;
              overflow:hidden;
              border-radius:28px;
              background:#ffffff;
              box-shadow:0 20px 60px rgba(13,29,52,0.12);
            "
          >
            <div
              style="
                padding:42px 34px;
                background:#0d1d34;
                color:#ffffff;
                text-align:center;
              "
            >
              <p
                style="
                  margin:0;
                  color:#cc8591;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                Official EBBC2026 Ticket
              </p>

              <h1
                style="
                  margin:16px 0 0;
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:38px;
                  line-height:1.12;
                  font-weight:600;
                "
              >
                Elevate Beauty Business Convention
              </h1>

              <p
                style="
                  margin:18px 0 0;
                  color:rgba(255,255,255,0.68);
                  font-size:14px;
                  line-height:1.7;
                "
              >
                Your payment has been confirmed and
                your secure ticket is now active.
              </p>
            </div>

            <div
              style="
                padding:36px 32px;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:16px;
                  line-height:1.7;
                "
              >
                Hello
                <strong>${attendeeName}</strong>,
              </p>

              <p
                style="
                  margin:14px 0 0;
                  color:#445064;
                  font-size:14px;
                  line-height:1.8;
                "
              >
                Thank you for registering for the
                second edition of the Elevate Beauty
                Business Convention. Your official
                ticket details are below.
              </p>

              <div
                style="
                  margin-top:28px;
                  overflow:hidden;
                  border:1px solid rgba(13,29,52,0.10);
                  border-radius:20px;
                "
              >
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    width:100%;
                    border-collapse:collapse;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:17px 20px;
                        background:#fafafa;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#718096;
                        font-size:11px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Ticket Number
                    </td>

                    <td
                      align="right"
                      style="
                        padding:17px 20px;
                        background:#fafafa;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#0d1d34;
                        font-size:14px;
                        font-weight:800;
                      "
                    >
                      ${ticketNumber}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#718096;
                        font-size:11px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Dates
                    </td>

                    <td
                      align="right"
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#0d1d34;
                        font-size:14px;
                        font-weight:800;
                      "
                    >
                      17–18 November 2026
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#718096;
                        font-size:11px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Venue
                    </td>

                    <td
                      align="right"
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#0d1d34;
                        font-size:14px;
                        font-weight:800;
                      "
                    >
                      CITAM Valley Road, Nairobi
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#718096;
                        font-size:11px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Category
                    </td>

                    <td
                      align="right"
                      style="
                        padding:17px 20px;
                        border-bottom:1px solid rgba(13,29,52,0.08);
                        color:#0d1d34;
                        font-size:14px;
                        font-weight:800;
                      "
                    >
                      ${participantCategory}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:17px 20px;
                        color:#718096;
                        font-size:11px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Organisation
                    </td>

                    <td
                      align="right"
                      style="
                        padding:17px 20px;
                        color:#0d1d34;
                        font-size:14px;
                        font-weight:800;
                      "
                    >
                      ${organisation}
                    </td>
                  </tr>
                </table>
              </div>

              <div
                style="
                  margin-top:30px;
                  text-align:center;
                "
              >
                <img
                  src="cid:ebbc2026-ticket-qr"
                  width="230"
                  height="230"
                  alt="EBBC2026 ticket QR code"
                  style="
                    display:block;
                    width:230px;
                    max-width:100%;
                    height:auto;
                    margin:0 auto;
                    border:1px solid rgba(13,29,52,0.10);
                    border-radius:20px;
                  "
                />

                <p
                  style="
                    margin:14px 0 0;
                    color:#0d1d34;
                    font-size:13px;
                    font-weight:800;
                  "
                >
                  Present this QR code for entry
                  verification
                </p>
              </div>

              <div
                style="
                  margin-top:28px;
                  text-align:center;
                "
              >
                <a
                  href="${safeTicketUrl}"
                  style="
                    display:inline-block;
                    padding:16px 26px;
                    border-radius:999px;
                    background:#cc8591;
                    color:#ffffff;
                    font-size:14px;
                    font-weight:800;
                    text-decoration:none;
                  "
                >
                  Open Secure Ticket
                </a>
              </div>

              <div
                style="
                  margin-top:28px;
                  padding:18px;
                  border-radius:16px;
                  background:#f7f5f5;
                  color:#657086;
                  font-size:12px;
                  line-height:1.7;
                  text-align:center;
                "
              >
                Keep this email and ticket link private.
                The QR code uniquely identifies your
                registration.
              </div>
            </div>

            <div
              style="
                padding:24px 30px;
                background:#0d1d34;
                color:rgba(255,255,255,0.62);
                text-align:center;
                font-size:11px;
                line-height:1.7;
              "
            >
              Elevate Beauty Business Convention 2026
              <br />
              Organised by Salons Assured Kenya Ltd
              <br />
              elevate@salonsassured.com
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function createDeliveryRecord(
  ticket: TicketRecord,
) {
  const {
    data: existingDelivery,
    error: existingDeliveryError,
  } = await supabaseAdmin
    .from("ebbc_ticket_deliveries")
    .select(
      "id, delivery_status",
    )
    .eq("ticket_id", ticket.id)
    .eq("channel", "email")
    .eq("message_type", "ticket")
    .maybeSingle();

  if (existingDeliveryError) {
    throw new Error(
      `Could not check ticket delivery: ${existingDeliveryError.message}`,
    );
  }

  if (existingDelivery) {
    const delivery =
      existingDelivery as DeliveryRecord;

    if (
      delivery.delivery_status ===
        "sent" ||
      delivery.delivery_status ===
        "delivered" ||
      delivery.delivery_status ===
        "queued"
    ) {
      return {
        deliveryId: delivery.id,
        shouldSend: false,
      };
    }

    const {
      error: retryUpdateError,
    } = await supabaseAdmin
      .from("ebbc_ticket_deliveries")
      .update({
        recipient:
          ticket.attendee_email,
        provider: "smtp",
        delivery_status: "queued",
        failure_reason: null,
        provider_response: {},
        sent_at: null,
        delivered_at: null,
      })
      .eq("id", delivery.id);

    if (retryUpdateError) {
      throw new Error(
        `Could not queue ticket email retry: ${retryUpdateError.message}`,
      );
    }

    return {
      deliveryId: delivery.id,
      shouldSend: true,
    };
  }

  const {
    data: newDelivery,
    error: insertError,
  } = await supabaseAdmin
    .from("ebbc_ticket_deliveries")
    .insert({
      ticket_id: ticket.id,
      channel: "email",
      message_type: "ticket",
      recipient:
        ticket.attendee_email,
      provider: "smtp",
      delivery_status: "queued",
      provider_response: {},
    })
    .select("id")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      return {
        deliveryId: null,
        shouldSend: false,
      };
    }

    throw new Error(
      `Could not create ticket delivery record: ${insertError.message}`,
    );
  }

  return {
    deliveryId: String(
      newDelivery.id,
    ),
    shouldSend: true,
  };
}

async function markDeliveryFailed(
  deliveryId: string,
  error: unknown,
) {
  const failureReason =
    error instanceof Error
      ? error.message
      : "Unknown email delivery error.";

  await supabaseAdmin
    .from("ebbc_ticket_deliveries")
    .update({
      delivery_status: "failed",
      failure_reason:
        failureReason.slice(0, 1000),
      provider_response: {
        error: failureReason,
      },
    })
    .eq("id", deliveryId);
}

export async function sendEbbc2026TicketEmailsForOrder(
  orderId: string,
): Promise<TicketEmailDeliveryResult> {
  const cleanOrderId = orderId.trim();

  if (!cleanOrderId) {
    throw new Error(
      "The order ID is required.",
    );
  }

  const {
    data: ticketRows,
    error: ticketLookupError,
  } = await supabaseAdmin
    .from("ebbc_tickets")
    .select(
      "id, order_id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, organisation, country, ticket_status, access_token, issued_at",
    )
    .eq("order_id", cleanOrderId)
    .eq("ticket_status", "active")
    .order("created_at", {
      ascending: true,
    });

  if (ticketLookupError) {
    throw new Error(
      `Could not retrieve active tickets: ${ticketLookupError.message}`,
    );
  }

  const tickets =
    (ticketRows || []) as TicketRecord[];

  const result: TicketEmailDeliveryResult = {
    orderId: cleanOrderId,
    totalTickets: tickets.length,
    sent: 0,
    skipped: 0,
    failed: 0,
  };

  if (tickets.length === 0) {
    return result;
  }

  const transporter =
    createTransporter();

  const smtpUser =
    getRequiredEnvironmentVariable(
      "SMTP_USER",
    );

  const emailFrom =
    process.env.EMAIL_FROM?.trim() ||
    `Elevate Beauty Business Convention <${smtpUser}>`;

  const appUrl = getAppUrl();

  for (const ticket of tickets) {
    let deliveryId: string | null =
      null;

    try {
      const email =
        ticket.attendee_email
          ?.trim()
          .toLowerCase();

      if (!email) {
        throw new Error(
          `Ticket ${ticket.ticket_number} has no attendee email address.`,
        );
      }

      if (!ticket.access_token) {
        throw new Error(
          `Ticket ${ticket.ticket_number} has no secure access token.`,
        );
      }

      const delivery =
        await createDeliveryRecord(
          ticket,
        );

      deliveryId =
        delivery.deliveryId;

      if (!delivery.shouldSend) {
        result.skipped += 1;
        continue;
      }

      if (!deliveryId) {
        result.skipped += 1;
        continue;
      }

      const secureTicketUrl =
        `${appUrl}/ebbc2026/ticket/${ticket.access_token}`;

      const qrCodeBuffer =
        await QRCode.toBuffer(
          secureTicketUrl,
          {
            type: "png",
            errorCorrectionLevel: "H",
            margin: 2,
            width: 700,

            color: {
              dark: "#0D1D34",
              light: "#FFFFFF",
            },
          },
        );

      const message =
        await transporter.sendMail({
          from: emailFrom,
          to: email,
          replyTo: smtpUser,

          subject:
            `Your EBBC2026 Ticket — ${ticket.ticket_number}`,

          text: createPlainTextEmail(
            ticket,
            secureTicketUrl,
          ),

          html: createHtmlEmail(
            ticket,
            secureTicketUrl,
          ),

          attachments: [
            {
              filename:
                `${ticket.ticket_number}.png`,
              content: qrCodeBuffer,
              contentType: "image/png",
              cid: "ebbc2026-ticket-qr",
            },
          ],
        });

      const sentAt =
        new Date().toISOString();

      const {
        error: deliveryUpdateError,
      } = await supabaseAdmin
        .from(
          "ebbc_ticket_deliveries",
        )
        .update({
          provider_message_id:
            message.messageId || null,

          delivery_status: "sent",

          failure_reason: null,

          provider_response: {
            accepted:
              message.accepted || [],
            rejected:
              message.rejected || [],
            pending:
              message.pending || [],
            response:
              message.response || null,
            envelope:
              message.envelope || null,
          },

          sent_at: sentAt,
        })
        .eq("id", deliveryId);

      if (deliveryUpdateError) {
        console.error(
          "Ticket email was sent but the delivery record could not be updated:",
          deliveryUpdateError,
        );
      }

      result.sent += 1;
    } catch (error) {
      console.error(
        `EBBC2026 ticket email failed for ${ticket.ticket_number}:`,
        error,
      );

      if (deliveryId) {
        await markDeliveryFailed(
          deliveryId,
          error,
        );
      }

      result.failed += 1;
    }
  }

  transporter.close();

  return result;
}