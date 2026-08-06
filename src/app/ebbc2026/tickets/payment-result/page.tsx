import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Ticket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "EBBC2026 Payment Result",
  description:
    "View the result of your Elevate Beauty Business Convention 2026 ticket payment.",

  robots: {
    index: false,
    follow: false,
  },
};

type PaymentResultStatus =
  | "success"
  | "pending"
  | "failed";

type PaymentResultPageProps = {
  searchParams: Promise<{
    status?: string;
    order?: string;
    message?: string;
  }>;
};

function normaliseStatus(
  value?: string,
): PaymentResultStatus {
  if (value === "success") {
    return "success";
  }

  if (value === "pending") {
    return "pending";
  }

  return "failed";
}

export default async function PaymentResultPage({
  searchParams,
}: PaymentResultPageProps) {
  const params = await searchParams;

  const status = normaliseStatus(
    params.status?.toLowerCase(),
  );

  const orderNumber =
    params.order?.trim() ||
    "Not available";

  const callbackMessage =
    params.message?.trim() || "";

  const isSuccess = status === "success";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  return (
    <main className="min-h-screen bg-[#F7F5F5] px-5 pb-24 pt-36 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[900px]">
        <Link
          href="/ebbc2026"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to EBBC2026
        </Link>

        <div className="mt-9 overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_30px_90px_rgba(13,29,52,0.1)]">
          <div
            className={`px-6 py-12 text-center text-white sm:px-12 ${
              isSuccess
                ? "bg-[#0D1D34]"
                : isPending
                  ? "bg-[#8B6C35]"
                  : "bg-[#751F2B]"
            }`}
          >
            <div
              className={`mx-auto grid h-20 w-20 place-items-center rounded-full shadow-xl ${
                isSuccess
                  ? "bg-[#CC8591]"
                  : isPending
                    ? "bg-[#E4B96C]"
                    : "bg-[#E17C8C]"
              }`}
            >
              {isSuccess && (
                <CheckCircle2 className="h-10 w-10" />
              )}

              {isPending && (
                <Clock3 className="h-10 w-10" />
              )}

              {isFailed && (
                <AlertCircle className="h-10 w-10" />
              )}
            </div>

            <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/60">
              EBBC2026 Payment
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
              {isSuccess &&
                "Payment Confirmed"}

              {isPending &&
                "Payment Is Processing"}

              {isFailed &&
                "Payment Was Not Completed"}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[13px] leading-7 text-white/65">
              {isSuccess &&
                "Paystack has verified your payment and your EBBC2026 ticket has been activated."}

              {isPending &&
                "Your payment has not been fully confirmed. Please allow a few moments for processing."}

              {isFailed &&
                "The payment could not be verified. No active ticket has been issued for this attempt."}
            </p>

            {callbackMessage && (
              <p className="mx-auto mt-4 max-w-xl text-[11px] leading-6 text-white/45">
                {callbackMessage}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                  <ReceiptText className="h-5 w-5" />
                </div>

                <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Order Number
                </p>

                <p className="mt-2 break-all text-sm font-black">
                  {orderNumber}
                </p>
              </div>

              <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Convention Dates
                </p>

                <p className="mt-2 text-sm font-black">
                  17–18 November 2026
                </p>
              </div>

              <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#CC8591]/15 text-[#CC8591]">
                  <MapPin className="h-5 w-5" />
                </div>

                <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Venue
                </p>

                <p className="mt-2 text-sm font-black">
                  CITAM Valley Road
                </p>
              </div>
            </div>

            {isSuccess && (
              <div className="mt-8 rounded-[22px] border border-green-200 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-green-600 text-white">
                    <Ticket className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold text-green-950">
                      Your ticket is active
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-green-900/70">
                      Your payment and registration
                      have been securely recorded.
                      Keep your order number for
                      assistance and ticket delivery.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isPending && (
              <div className="mt-8 rounded-[22px] border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-start gap-4">
                  <Clock3 className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />

                  <div>
                    <h2 className="text-base font-extrabold text-amber-950">
                      Do not create another order yet
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-amber-900/70">
                      Some mobile-money payments may
                      take additional time to confirm.
                      Keep your order number and wait
                      before attempting another
                      payment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isFailed && (
              <div className="mt-8 rounded-[22px] border border-red-200 bg-red-50 p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

                  <div>
                    <h2 className="text-base font-extrabold text-red-950">
                      Your ticket remains inactive
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-red-900/70">
                      The payment was not successfully
                      verified. Return to registration
                      and try again using M-Pesa or a
                      supported card.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-[18px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

              <div>
                <p className="text-xs font-extrabold">
                  Keep your order number
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#0D1D34]/50">
                  The EBBC2026 support team may ask
                  for this number when assisting with
                  payment or ticket-delivery issues.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {!isSuccess && (
                <Link
                  href="/ebbc2026/tickets"
                  className="group inline-flex h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
                >
                  Return to Registration

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {isSuccess && (
                <Link
                  href="/ebbc2026"
                  className="group inline-flex h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
                >
                  Return to EBBC2026

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              <Link
                href="/ebbc2026/contact"
                className="inline-flex h-[52px] flex-1 items-center justify-center rounded-full border border-[#0D1D34]/15 bg-white px-7 text-sm font-extrabold transition hover:bg-[#0D1D34] hover:text-white"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}