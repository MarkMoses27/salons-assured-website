import nodemailer from "nodemailer";

import { supabaseAdmin } from "@/lib/supabase/admin";

type PaymentNotificationInput = {
  orderId: string;
  orderNumber: string;
  reference: string;
  amountKes: number;
  currency: string;
  paymentMethod?: string | null;
  providerTransactionId?: string | null;
  paidAt?: string | null;
};

type OrderRecord = {
  buyer_full_name: string;
  buyer_email: string;
  buyer_phone: string;
  organisation: string | null;
  ticket_quantity: number;
};

type TicketRecord = {
  ticket_number: string;
  attendee_full_name: string;
  attendee_email: string;
  event_date: string | null;
  ticket_status: string;
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

function escapeHtml(
  value:
    | string
    | number
    | null
    | undefined,
) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-KE",
  ).format(amount);
}

function formatEventDate(
  value: string | null,
) {
  if (value === "2026-11-17") {
    return "17 November 2026";
  }

  if (value === "2026-11-18") {
    return "18 November 2026";
  }

  return "Event day unavailable";
}

function formatPaymentMethod(
  value?: string | null,
) {
  const cleanValue =
    String(value || "")
      .trim()
      .toLowerCase();

  if (
    cleanValue === "mobile_money" ||
    cleanValue === "mobile money"
  ) {
    return "M-PESA / Mobile Money";
  }

  if (cleanValue === "card") {
    return "Card";
  }

  if (cleanValue === "bank") {
    return "Bank";
  }

  if (!cleanValue) {
    return "Paystack";
  }

  return cleanValue
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export async function sendEbbc2026PaymentNotification(
  input: PaymentNotificationInput,
) {
  const {
    orderId,
    orderNumber,
    reference,
    amountKes,
    currency,
    paymentMethod,
    providerTransactionId,
    paidAt,
  } = input;

  const {
    data: orderRow,
    error: orderError,
  } = await supabaseAdmin
    .from("ebbc_orders")
    .select(
      "buyer_full_name, buyer_email, buyer_phone, organisation, ticket_quantity",
    )
    .eq("id", orderId)
    .maybeSingle();

  if (
    orderError ||
    !orderRow
  ) {
    throw new Error(
      `Could not retrieve EBBC2026 order for notification: ${
        orderError?.message ||
        "Order not found."
      }`,
    );
  }

  const order =
    orderRow as OrderRecord;

  const {
    data: ticketRows,
    error: ticketError,
  } = await supabaseAdmin
    .from("ebbc_tickets")
    .select(
      "ticket_number, attendee_full_name, attendee_email, event_date, ticket_status",
    )
    .eq("order_id", orderId)
    .order("created_at", {
      ascending: true,
    });

  if (ticketError) {
    throw new Error(
      `Could not retrieve EBBC2026 tickets for notification: ${ticketError.message}`,
    );
  }

  const tickets =
    (ticketRows || []) as TicketRecord[];

  const smtpUser =
    getRequiredEnvironmentVariable(
      "SMTP_USER",
    );

  const notificationEmail =
    process.env
      .EBBC2026_NOTIFICATION_EMAIL
      ?.trim() ||
    "elevate@salonsassured.com";

  const emailFrom =
    process.env.EMAIL_FROM?.trim() ||
    `Elevate Beauty Business Convention <${smtpUser}>`;

  const paymentMethodLabel =
    formatPaymentMethod(
      paymentMethod,
    );

  const paidTime =
    paidAt
      ? new Date(
          paidAt,
        ).toLocaleString(
          "en-KE",
          {
            timeZone:
              "Africa/Nairobi",
            dateStyle:
              "medium",
            timeStyle:
              "short",
          },
        )
      : new Date().toLocaleString(
          "en-KE",
          {
            timeZone:
              "Africa/Nairobi",
            dateStyle:
              "medium",
            timeStyle:
              "short",
          },
        );

  const ticketText =
    tickets.length > 0
      ? tickets
          .map(
            (
              ticket,
              index,
            ) =>
              [
                `Ticket ${index + 1}`,
                `Ticket Number: ${ticket.ticket_number}`,
                `Attendee: ${ticket.attendee_full_name}`,
                `Email: ${ticket.attendee_email}`,
                `Event Day: ${formatEventDate(
                  ticket.event_date,
                )}`,
                `Status: ${ticket.ticket_status.toUpperCase()}`,
              ].join("\n"),
          )
          .join("\n\n")
      : "No ticket records were returned.";

  const text = [
    "EBBC2026 PAYMENT CONFIRMED",
    "",
    `Order Number: ${orderNumber}`,
    `Customer: ${order.buyer_full_name}`,
    `Customer Email: ${order.buyer_email}`,
    `Customer Phone: ${order.buyer_phone}`,
    `Organisation: ${
      order.organisation ||
      "Not provided"
    }`,
    "",
    `Amount Paid: ${currency} ${formatMoney(
      amountKes,
    )}`,
    "Payment Status: PAID",
    `Payment Method: ${paymentMethodLabel}`,
    `Paystack Reference: ${reference}`,
    `Paystack Transaction ID: ${
      providerTransactionId ||
      "Not provided"
    }`,
    `Paid At: ${paidTime}`,
    "",
    `Tickets: ${order.ticket_quantity}`,
    "QR Status: ACTIVE",
    "",
    ticketText,
    "",
    "The customer ticket email and QR have been processed.",
    "",
    "Elevate Beauty Business Convention 2026",
    "Salons Assured Kenya Ltd",
  ].join("\n");

  const ticketRowsHtml =
    tickets.length > 0
      ? tickets
          .map(
            (ticket) => `
              <tr>
                <td
                  style="
                    padding:14px 16px;
                    border-bottom:1px solid #e8e8e8;
                    font-size:13px;
                  "
                >
                  <strong>
                    ${escapeHtml(
                      ticket.ticket_number,
                    )}
                  </strong>
                </td>

                <td
                  style="
                    padding:14px 16px;
                    border-bottom:1px solid #e8e8e8;
                    font-size:13px;
                  "
                >
                  ${escapeHtml(
                    ticket.attendee_full_name,
                  )}
                </td>

                <td
                  style="
                    padding:14px 16px;
                    border-bottom:1px solid #e8e8e8;
                    font-size:13px;
                  "
                >
                  ${escapeHtml(
                    formatEventDate(
                      ticket.event_date,
                    ),
                  )}
                </td>

                <td
                  style="
                    padding:14px 16px;
                    border-bottom:1px solid #e8e8e8;
                    font-size:12px;
                    font-weight:700;
                    color:#16803a;
                  "
                >
                  ${escapeHtml(
                    ticket.ticket_status.toUpperCase(),
                  )}
                </td>
              </tr>
            `,
          )
          .join("")
      : `
          <tr>
            <td
              colspan="4"
              style="
                padding:18px;
                text-align:center;
                color:#718096;
              "
            >
              No ticket records returned.
            </td>
          </tr>
        `;

  const html = `
    <!doctype html>

    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <title>
          EBBC2026 Payment Confirmed
        </title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f6f3f2;
          font-family:Arial,Helvetica,sans-serif;
          color:#0d1d34;
        "
      >
        <div
          style="
            padding:30px 14px;
          "
        >
          <div
            style="
              max-width:700px;
              margin:0 auto;
              overflow:hidden;
              border-radius:24px;
              background:#ffffff;
              box-shadow:0 20px 60px rgba(13,29,52,0.10);
            "
          >
            <div
              style="
                padding:34px;
                background:#0d1d34;
                color:#ffffff;
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
                Elevate Operations Notification
              </p>

              <h1
                style="
                  margin:12px 0 0;
                  font-size:30px;
                  line-height:1.2;
                "
              >
                Payment Confirmed
              </h1>

              <p
                style="
                  margin:12px 0 0;
                  color:rgba(255,255,255,0.68);
                  font-size:14px;
                "
              >
                ${escapeHtml(
                  orderNumber,
                )}
              </p>
            </div>

            <div
              style="
                padding:30px;
              "
            >
              <div
                style="
                  padding:20px;
                  border-radius:18px;
                  background:#f9f7f7;
                "
              >
                <p
                  style="
                    margin:0;
                    font-size:11px;
                    font-weight:800;
                    color:#718096;
                    text-transform:uppercase;
                    letter-spacing:1px;
                  "
                >
                  Amount received
                </p>

                <p
                  style="
                    margin:8px 0 0;
                    color:#16803a;
                    font-size:30px;
                    font-weight:900;
                  "
                >
                  ${escapeHtml(
                    currency,
                  )}
                  ${escapeHtml(
                    formatMoney(
                      amountKes,
                    ),
                  )}
                </p>

                <p
                  style="
                    margin:8px 0 0;
                    font-size:13px;
                    color:#526071;
                  "
                >
                  PAID &middot;
                  ${escapeHtml(
                    paymentMethodLabel,
                  )}
                  &middot;
                  QR ACTIVE
                </p>
              </div>

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:24px;
                  border-collapse:collapse;
                "
              >
                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Customer
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:13px;
                      font-weight:800;
                    "
                  >
                    ${escapeHtml(
                      order.buyer_full_name,
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Email
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:13px;
                    "
                  >
                    ${escapeHtml(
                      order.buyer_email,
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Phone
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:13px;
                    "
                  >
                    ${escapeHtml(
                      order.buyer_phone,
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Order
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:13px;
                      font-weight:800;
                    "
                  >
                    ${escapeHtml(
                      orderNumber,
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Paystack reference
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:12px;
                    "
                  >
                    ${escapeHtml(
                      reference,
                    )}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:10px 0;
                      color:#718096;
                      font-size:12px;
                    "
                  >
                    Paid at
                  </td>

                  <td
                    align="right"
                    style="
                      padding:10px 0;
                      font-size:13px;
                    "
                  >
                    ${escapeHtml(
                      paidTime,
                    )}
                  </td>
                </tr>
              </table>

              <h2
                style="
                  margin:30px 0 12px;
                  font-size:16px;
                "
              >
                Ticket details
              </h2>

              <div
                style="
                  overflow:hidden;
                  border:1px solid #e8e8e8;
                  border-radius:16px;
                "
              >
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    border-collapse:collapse;
                  "
                >
                  <thead>
                    <tr
                      style="
                        background:#f7f5f5;
                      "
                    >
                      <th
                        align="left"
                        style="
                          padding:12px 16px;
                          font-size:10px;
                          text-transform:uppercase;
                        "
                      >
                        Ticket
                      </th>

                      <th
                        align="left"
                        style="
                          padding:12px 16px;
                          font-size:10px;
                          text-transform:uppercase;
                        "
                      >
                        Attendee
                      </th>

                      <th
                        align="left"
                        style="
                          padding:12px 16px;
                          font-size:10px;
                          text-transform:uppercase;
                        "
                      >
                        Day
                      </th>

                      <th
                        align="left"
                        style="
                          padding:12px 16px;
                          font-size:10px;
                          text-transform:uppercase;
                        "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    ${ticketRowsHtml}
                  </tbody>
                </table>
              </div>

              <p
                style="
                  margin:24px 0 0;
                  padding:18px;
                  border-radius:16px;
                  background:#fff7f8;
                  color:#526071;
                  font-size:12px;
                  line-height:1.7;
                "
              >
                The customer's ticket email has been processed.
                Their QR code is active for the selected event day.
              </p>
            </div>

            <div
              style="
                padding:20px 28px;
                background:#0d1d34;
                color:rgba(255,255,255,0.60);
                text-align:center;
                font-size:11px;
              "
            >
              Elevate Beauty Business Convention 2026
              <br />
              Salons Assured Kenya Ltd
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter =
    createTransporter();

  try {
    const message =
      await transporter.sendMail({
        from: emailFrom,

        to: notificationEmail,

        replyTo: smtpUser,

        subject:
          `EBBC2026 Payment Confirmed — ${orderNumber} — ${currency} ${formatMoney(
            amountKes,
          )}`,

        text,

        html,
      });

    return {
      sent: true,
      recipient:
        notificationEmail,
      messageId:
        message.messageId || null,
    };
  } finally {
    transporter.close();
  }
}