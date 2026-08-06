import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(
  process.env.SMTP_PORT || "587",
);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom =
  process.env.EMAIL_FROM ||
  `Elevate Beauty Business Convention <${smtpUser}>`;

if (
  !smtpHost ||
  !smtpUser ||
  !smtpPass
) {
  console.error(
    "SMTP_HOST, SMTP_USER or SMTP_PASS is missing from .env.local.",
  );

  process.exit(1);
}

const transporter =
  nodemailer.createTransport({
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

try {
  console.log(
    "Checking SMTP connection...",
  );

  await transporter.verify();

  console.log(
    "SMTP connection successful.",
  );

  const result =
    await transporter.sendMail({
      from: emailFrom,
      to: smtpUser,

      subject:
        "EBBC2026 Email System Test",

      text: [
        "EBBC2026 email delivery is working.",
        "",
        "This test message was sent from the Salons Assured website SMTP configuration.",
      ].join("\n"),

      html: `
        <div
          style="
            background:#f7f5f5;
            padding:40px 20px;
            font-family:Arial,sans-serif;
            color:#0d1d34;
          "
        >
          <div
            style="
              max-width:600px;
              margin:0 auto;
              background:#ffffff;
              border-radius:24px;
              overflow:hidden;
              box-shadow:0 20px 60px rgba(13,29,52,0.12);
            "
          >
            <div
              style="
                background:#0d1d34;
                color:#ffffff;
                padding:36px;
                text-align:center;
              "
            >
              <p
                style="
                  margin:0;
                  color:#cc8591;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                "
              >
                EBBC2026
              </p>

              <h1
                style="
                  margin:14px 0 0;
                  font-size:32px;
                  line-height:1.15;
                "
              >
                Email System Test
              </h1>
            </div>

            <div
              style="
                padding:36px;
                text-align:center;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:16px;
                  line-height:1.7;
                "
              >
                The Elevate Beauty Business Convention
                email delivery system is working
                correctly.
              </p>

              <div
                style="
                  margin-top:28px;
                  padding:18px;
                  border-radius:16px;
                  background:#f7f5f5;
                  color:#0d1d34;
                  font-size:13px;
                "
              >
                Sent securely from
                elevate@salonsassured.com
              </div>
            </div>
          </div>
        </div>
      `,
    });

  console.log(
    "Test email sent successfully.",
  );

  console.log(
    `Message ID: ${result.messageId}`,
  );

  await transporter.close();
} catch (error) {
  console.error(
    "SMTP test failed:",
    error instanceof Error
      ? error.message
      : error,
  );

  process.exit(1);
}