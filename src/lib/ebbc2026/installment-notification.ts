import nodemailer from "nodemailer";

import { supabaseAdmin } from "@/lib/supabase/admin";

type InstallmentNotificationInput = {
  orderId: string;
  orderNumber: string;
  transactionReference: string;
  installmentAmountKes: number;
  totalPaidKes: number;
  balanceKes: number;
  totalAmountKes: number;
  verifiedAt: string;
  verifiedBy?: string | null;
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
    process.env[
      variableName
    ]?.trim();

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

  const smtpPort =
    Number(
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
    !Number.isInteger(
      smtpPort,
    ) ||
    smtpPort <= 0
  ) {
    throw new Error(
      "SMTP_PORT is invalid.",
    );
  }

  return nodemailer.createTransport(
    {
      host: smtpHost,
      port: smtpPort,
      secure:
        smtpPort === 465,
      requireTLS:
        smtpPort === 587,

      auth: {
        user: smtpUser,
        pass: smtpPass,
      },

      tls: {
        minVersion:
          "TLSv1.2",
      },
    },
  );
}

function escapeHtml(
  value:
    | string
    | number
    | null
    | undefined,
) {
  return String(
    value ?? "",
  )
    .replaceAll(
      "&",
      "&amp;",
    )
    .replaceAll(
      "<",
      "&lt;",
    )
    .replaceAll(
      ">",
      "&gt;",
    )
    .replaceAll(
      '"',
      "&quot;",
    )
    .replaceAll(
      "'",
      "&#039;",
    );
}

function formatMoney(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-KE",
    {
      minimumFractionDigits:
        0,
      maximumFractionDigits:
        2,
    },
  ).format(amount);
}

function formatEventDate(
  value: string | null,
) {
  if (
    value ===
    "2026-11-17"
  ) {
    return "17 November 2026";
  }

  if (
    value ===
    "2026-11-18"
  ) {
    return "18 November 2026";
  }

  return "Event day unavailable";
}

function formatVerifiedTime(
  value: string,
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return date.toLocaleString(
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
}

export async function sendEbbc2026InstallmentPaymentNotification(
  input: InstallmentNotificationInput,
) {
  const {
    orderId,
    orderNumber,
    transactionReference,
    installmentAmountKes,
    totalPaidKes,
    balanceKes,
    totalAmountKes,
    verifiedAt,
    verifiedBy,
  } = input;

  const {
    data: orderRow,
    error: orderError,
  } =
    await supabaseAdmin
      .from(
        "ebbc_orders",
      )
      .select(
        "buyer_full_name, buyer_email, buyer_phone, organisation, ticket_quantity",
      )
      .eq(
        "id",
        orderId,
      )
      .maybeSingle();

  if (
    orderError ||
    !orderRow
  ) {
    throw new Error(
      `Could not retrieve EBBC2026 order for installment notification: ${
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
  } =
    await supabaseAdmin
      .from(
        "ebbc_tickets",
      )
      .select(
        "ticket_number, attendee_full_name, attendee_email, event_date, ticket_status",
      )
      .eq(
        "order_id",
        orderId,
      )
      .order(
        "created_at",
        {
          ascending:
            true,
        },
      );

  if (ticketError) {
    throw new Error(
      `Could not retrieve EBBC2026 tickets for installment notification: ${ticketError.message}`,
    );
  }

  const tickets =
    (
      ticketRows || []
    ) as TicketRecord[];

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

  const fullyPaid =
    balanceKes <= 0;

  const paymentStatus =
    fullyPaid
      ? "FULLY PAID"
      : "PARTIAL PAYMENT";

  const qrStatus =
    fullyPaid
      ? "ACTIVE"
      : "LOCKED — balance outstanding";

  const verifiedTime =
    formatVerifiedTime(
      verifiedAt,
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
                `Ticket Status: ${ticket.ticket_status.toUpperCase()}`,
              ].join(
                "\n",
              ),
          )
          .join(
            "\n\n",
          )
      : "No ticket records were returned.";

  const text = [
    `EBBC2026 EQUITY INSTALLMENT — ${paymentStatus}`,
    "",
    `Order Number: ${orderNumber}`,
    `Customer: ${order.buyer_full_name}`,
    `Customer Email: ${order.buyer_email}`,
    `Customer Phone: ${order.buyer_phone}`,
    `Organisation: ${
      order.organisation ||
      "Not provided"
    }`,
    `Ticket Quantity: ${order.ticket_quantity}`,
    "",
    "PAYMENT DETAILS",
    `Payment Method: Equity Paybill`,
    `Paybill: 247247`,
    `Account: 100831`,
    `M-PESA Reference: ${transactionReference}`,
    `Installment Received: KES ${formatMoney(
      installmentAmountKes,
    )}`,
    `Total Order Amount: KES ${formatMoney(
      totalAmountKes,
    )}`,
    `Total Paid: KES ${formatMoney(
      totalPaidKes,
    )}`,
    `Remaining Balance: KES ${formatMoney(
      Math.max(
        balanceKes,
        0,
      ),
    )}`,
    `Payment Status: ${paymentStatus}`,
    `QR Status: ${qrStatus}`,
    `Verified At: ${verifiedTime}`,
    `Verified By: ${
      verifiedBy ||
      "EBBC2026 administrator"
    }`,
    "",
    "TICKETS",
    ticketText,
    "",
    fullyPaid
      ? "The registration is now fully paid. The ticket QR can be activated and the customer ticket email issued."
      : "The registration remains partially paid. The QR must remain locked until the remaining balance reaches KES 0.",
  ].join(
    "\n",
  );

  const ticketRowsHtml =
    tickets.length > 0
      ? tickets
          .map(
            (
              ticket,
              index,
            ) => `
              <tr>
                <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                  ${index + 1}
                </td>
                <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(
                    ticket.ticket_number,
                  )}
                </td>
                <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(
                    ticket.attendee_full_name,
                  )}
                </td>
                <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(
                    formatEventDate(
                      ticket.event_date,
                    ),
                  )}
                </td>
                <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
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
              colspan="5"
              style="padding:14px;"
            >
              No ticket records were returned.
            </td>
          </tr>
        `;

  const html = `
    <!doctype html>
    <html>
      <body
        style="
          margin:0;
          padding:0;
          background:#f5f5f7;
          font-family:Arial,Helvetica,sans-serif;
          color:#172033;
        "
      >
        <div
          style="
            max-width:760px;
            margin:0 auto;
            padding:32px 16px;
          "
        >
          <div
            style="
              background:#ffffff;
              border-radius:16px;
              overflow:hidden;
              border:1px solid #e5e7eb;
            "
          >
            <div
              style="
                background:#17233f;
                color:#ffffff;
                padding:28px;
              "
            >
              <div
                style="
                  font-size:13px;
                  text-transform:uppercase;
                  letter-spacing:1.4px;
                  opacity:.85;
                "
              >
                Elevate Beauty Business Convention 2026
              </div>

              <h1
                style="
                  margin:8px 0 0;
                  font-size:26px;
                  line-height:1.25;
                "
              >
                Equity Installment ${escapeHtml(
                  paymentStatus,
                )}
              </h1>

              <div
                style="
                  margin-top:8px;
                  font-size:15px;
                  opacity:.9;
                "
              >
                Order ${escapeHtml(
                  orderNumber,
                )}
              </div>
            </div>

            <div
              style="
                padding:28px;
              "
            >
              <h2
                style="
                  margin:0 0 16px;
                  font-size:18px;
                "
              >
                Customer
              </h2>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  margin-bottom:28px;
                "
              >
                <tr>
                  <td style="padding:7px 0;font-weight:700;width:180px;">
                    Name
                  </td>
                  <td style="padding:7px 0;">
                    ${escapeHtml(
                      order.buyer_full_name,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:7px 0;font-weight:700;">
                    Email
                  </td>
                  <td style="padding:7px 0;">
                    ${escapeHtml(
                      order.buyer_email,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:7px 0;font-weight:700;">
                    Phone
                  </td>
                  <td style="padding:7px 0;">
                    ${escapeHtml(
                      order.buyer_phone,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:7px 0;font-weight:700;">
                    Organisation
                  </td>
                  <td style="padding:7px 0;">
                    ${escapeHtml(
                      order.organisation ||
                        "Not provided",
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:7px 0;font-weight:700;">
                    Tickets
                  </td>
                  <td style="padding:7px 0;">
                    ${escapeHtml(
                      order.ticket_quantity,
                    )}
                  </td>
                </tr>
              </table>

              <h2
                style="
                  margin:0 0 16px;
                  font-size:18px;
                "
              >
                Payment
              </h2>

              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  margin-bottom:28px;
                  background:#fafafa;
                  border:1px solid #e5e7eb;
                  border-radius:12px;
                "
              >
                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Method
                  </td>
                  <td style="padding:12px;">
                    Equity Paybill 247247 / Account 100831
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    M-PESA Reference
                  </td>
                  <td style="padding:12px;">
                    ${escapeHtml(
                      transactionReference,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    This Installment
                  </td>
                  <td style="padding:12px;">
                    <strong>
                      KES ${escapeHtml(
                        formatMoney(
                          installmentAmountKes,
                        ),
                      )}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Order Total
                  </td>
                  <td style="padding:12px;">
                    KES ${escapeHtml(
                      formatMoney(
                        totalAmountKes,
                      ),
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Total Paid
                  </td>
                  <td style="padding:12px;">
                    <strong>
                      KES ${escapeHtml(
                        formatMoney(
                          totalPaidKes,
                        ),
                      )}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Remaining Balance
                  </td>
                  <td style="padding:12px;">
                    <strong>
                      KES ${escapeHtml(
                        formatMoney(
                          Math.max(
                            balanceKes,
                            0,
                          ),
                        ),
                      )}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Payment Status
                  </td>
                  <td style="padding:12px;">
                    ${escapeHtml(
                      paymentStatus,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    QR Status
                  </td>
                  <td style="padding:12px;">
                    ${escapeHtml(
                      qrStatus,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Verified
                  </td>
                  <td style="padding:12px;">
                    ${escapeHtml(
                      verifiedTime,
                    )}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px;font-weight:700;">
                    Verified By
                  </td>
                  <td style="padding:12px;">
                    ${escapeHtml(
                      verifiedBy ||
                        "EBBC2026 administrator",
                    )}
                  </td>
                </tr>
              </table>

              <h2
                style="
                  margin:0 0 16px;
                  font-size:18px;
                "
              >
                Ticket Registration
              </h2>

              <div
                style="
                  overflow-x:auto;
                "
              >
                <table
                  style="
                    width:100%;
                    border-collapse:collapse;
                    border:1px solid #e5e7eb;
                  "
                >
                  <thead>
                    <tr
                      style="
                        background:#f3f4f6;
                        text-align:left;
                      "
                    >
                      <th style="padding:12px;">#</th>
                      <th style="padding:12px;">Ticket</th>
                      <th style="padding:12px;">Attendee</th>
                      <th style="padding:12px;">Event Day</th>
                      <th style="padding:12px;">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    ${ticketRowsHtml}
                  </tbody>
                </table>
              </div>

              <div
                style="
                  margin-top:24px;
                  padding:16px;
                  border-radius:10px;
                  background:${
                    fullyPaid
                      ? "#ecfdf3"
                      : "#fff7ed"
                  };
                "
              >
                ${
                  fullyPaid
                    ? `
                      <strong>
                        Registration fully paid.
                      </strong>
                      The QR ticket can now be activated and the customer ticket email issued.
                    `
                    : `
                      <strong>
                        Balance outstanding.
                      </strong>
                      The QR must remain locked until the remaining balance reaches KES 0.
                    `
                }
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter =
    createTransporter();

  const subject =
    fullyPaid
      ? `EBBC2026 FULLY PAID — ${orderNumber} — KES ${formatMoney(
          totalPaidKes,
        )}`
      : `EBBC2026 EQUITY INSTALLMENT — ${orderNumber} — Balance KES ${formatMoney(
          balanceKes,
        )}`;

  const info =
    await transporter.sendMail(
      {
        from: emailFrom,
        to: notificationEmail,
        subject,
        text,
        html,
      },
    );

  console.log(
    "EBBC2026 Equity installment notification sent:",
    {
      orderNumber,
      recipient:
        notificationEmail,
      installmentAmountKes,
      totalPaidKes,
      balanceKes,
      messageId:
        info.messageId,
    },
  );

  return {
    sent: true,
    recipient:
      notificationEmail,
    fullyPaid,
    installmentAmountKes,
    totalPaidKes,
    balanceKes:
      Math.max(
        balanceKes,
        0,
      ),
    messageId:
      info.messageId,
  };
}