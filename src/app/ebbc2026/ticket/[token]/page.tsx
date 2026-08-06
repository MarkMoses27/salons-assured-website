import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import QRCode from "qrcode";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "EBBC2026 Secure Ticket",
  description:
    "Secure ticket for the Elevate Beauty Business Convention 2026.",

  robots: {
    index: false,
    follow: false,
  },
};

type SecureTicketPageProps = {
  params: Promise<{
    token: string;
  }>;
};

function isValidUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function formatIssuedDate(
  value: string | null,
) {
  if (!value) {
    return "Not yet issued";
  }

  return new Intl.DateTimeFormat(
    "en-KE",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Nairobi",
    },
  ).format(new Date(value));
}

export default async function SecureTicketPage({
  params,
}: SecureTicketPageProps) {
  const { token } = await params;

  const accessToken = token.trim();

  if (!isValidUuid(accessToken)) {
    notFound();
  }

  const {
    data: ticketRecord,
    error: ticketError,
  } = await supabaseAdmin
    .from("ebbc_tickets")
    .select(
      "id, order_id, payment_id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, organisation, country, ticket_status, issued_at, access_token",
    )
    .eq("access_token", accessToken)
    .maybeSingle();

  if (ticketError) {
    console.error(
      "EBBC2026 secure ticket lookup error:",
      ticketError,
    );

    throw new Error(
      "The EBBC2026 ticket could not be retrieved.",
    );
  }

  if (!ticketRecord) {
    notFound();
  }

  const {
    data: orderRecord,
    error: orderError,
  } = await supabaseAdmin
    .from("ebbc_orders")
    .select(
      "order_number, payment_status, order_status",
    )
    .eq("id", ticketRecord.order_id)
    .maybeSingle();

  if (orderError) {
    console.error(
      "EBBC2026 ticket order lookup error:",
      orderError,
    );
  }

  const ticketIsActive =
    ticketRecord.ticket_status ===
      "active" &&
    orderRecord?.payment_status ===
      "paid";

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.salonsassured.com"
  ).replace(/\/$/, "");

  const secureTicketUrl =
    `${appUrl}/ebbc2026/ticket/${accessToken}`;

  const qrCodeDataUrl = ticketIsActive
    ? await QRCode.toDataURL(
        secureTicketUrl,
        {
          errorCorrectionLevel: "H",
          margin: 2,
          width: 700,

          color: {
            dark: "#0D1D34",
            light: "#FFFFFF",
          },
        },
      )
    : null;

  return (
    <main className="min-h-screen bg-[#F7F5F5] px-5 pb-24 pt-36 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[980px]">
        <Link
          href="/ebbc2026"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to EBBC2026
        </Link>

        <div className="mt-8 overflow-hidden rounded-[34px] border border-[#0D1D34]/8 bg-white shadow-[0_30px_90px_rgba(13,29,52,0.12)]">
          <div className="bg-[#0D1D34] px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#CC8591]">
                  Official EBBC2026 Ticket
                </p>

                <h1 className="mt-4 [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[58px]">
                  Elevate Beauty Business Convention
                </h1>

                <p className="mt-5 max-w-xl text-[13px] leading-7 text-white/60">
                  This secure ticket belongs to the
                  named attendee and contains a unique
                  verification QR code.
                </p>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] ${
                  ticketIsActive
                    ? "bg-green-500/15 text-green-300"
                    : "bg-red-500/15 text-red-300"
                }`}
              >
                {ticketIsActive ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}

                {ticketIsActive
                  ? "Active Ticket"
                  : "Inactive Ticket"}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px]">
            <div className="p-6 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Attendee
                  </p>

                  <p className="mt-2 text-base font-black">
                    {
                      ticketRecord.attendee_full_name
                    }
                  </p>
                </div>

                <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                    <Ticket className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Ticket Number
                  </p>

                  <p className="mt-2 break-all text-base font-black">
                    {
                      ticketRecord.ticket_number
                    }
                  </p>
                </div>

                <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Convention Dates
                  </p>

                  <p className="mt-2 text-base font-black">
                    17–18 November 2026
                  </p>
                </div>

                <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Venue
                  </p>

                  <p className="mt-2 text-base font-black">
                    CITAM Valley Road
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-[#0D1D34]/8 bg-white">
                <div className="border-b border-[#0D1D34]/8 p-5">
                  <h2 className="text-sm font-extrabold">
                    Attendee Information
                  </h2>
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/40">
                        Email
                      </p>

                      <p className="mt-1 break-all text-xs font-bold">
                        {
                          ticketRecord.attendee_email
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/40">
                        Phone
                      </p>

                      <p className="mt-1 text-xs font-bold">
                        {
                          ticketRecord.attendee_phone
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/40">
                        Category
                      </p>

                      <p className="mt-1 text-xs font-bold">
                        {
                          ticketRecord.participant_category
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/40">
                        Organisation
                      </p>

                      <p className="mt-1 text-xs font-bold">
                        {ticketRecord.organisation ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-xs font-extrabold">
                      Secure ticket verification
                    </p>

                    <p className="mt-2 text-[11px] leading-5 text-[#0D1D34]/50">
                      Order:{" "}
                      {orderRecord?.order_number ||
                        "Not available"}
                      <br />
                      Issued:{" "}
                      {formatIssuedDate(
                        ticketRecord.issued_at,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="border-t border-[#0D1D34]/8 bg-[#FAFAFA] p-6 sm:p-8 lg:border-l lg:border-t-0">
              {ticketIsActive &&
              qrCodeDataUrl ? (
                <>
                  <div className="rounded-[26px] border border-[#0D1D34]/8 bg-white p-5 shadow-sm">
                    <Image
                      src={qrCodeDataUrl}
                      alt={`QR code for ticket ${ticketRecord.ticket_number}`}
                      width={700}
                      height={700}
                      unoptimized
                      className="h-auto w-full"
                      priority
                    />
                  </div>

                  <p className="mt-5 text-center text-[11px] font-extrabold leading-5">
                    Present this QR code for ticket
                    verification
                  </p>

                  <p className="mt-2 text-center text-[10px] leading-5 text-[#0D1D34]/45">
                    Keep this ticket private. Its QR
                    code uniquely identifies the
                    attendee’s registration.
                  </p>
                </>
              ) : (
                <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-center">
                  <AlertCircle className="mx-auto h-10 w-10 text-red-600" />

                  <h2 className="mt-4 text-sm font-extrabold text-red-950">
                    Ticket not active
                  </h2>

                  <p className="mt-2 text-[11px] leading-5 text-red-900/65">
                    This ticket cannot display a
                    verification QR code until its
                    payment is confirmed.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}