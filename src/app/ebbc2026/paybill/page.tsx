import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { EBBC2026 } from "@/lib/ebbc2026/config";

type PageProps = {
  searchParams: Promise<{
    order?: string;
    amount?: string;
    currency?: string;
  }>;
};

function cleanText(
  value: string | undefined,
) {
  return String(value || "").trim();
}

function formatMoney(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-KE",
  ).format(amount);
}

export default async function EBBC2026PaybillPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const orderNumber =
    cleanText(
      params.order,
    ).toUpperCase();

  const amountKes =
    Number(
      params.amount,
    );

  const validAmount =
    Number.isFinite(
      amountKes,
    ) &&
    amountKes > 0
      ? Math.round(
          amountKes,
        )
      : 0;

  const currency =
    cleanText(
      params.currency,
    ).toUpperCase() ||
    "KES";

  const whatsappMessage =
    [
      "Hello Salons Assured Kenya.",
      "",
      "I have paid for my EBBC2026 registration via Equity Paybill.",
      "",
      `Order number: ${
        orderNumber ||
        "PLEASE ADD ORDER NUMBER"
      }`,
      `Amount: ${currency} ${
        validAmount
          ? formatMoney(
              validAmount,
            )
          : "PLEASE ADD AMOUNT"
      }`,
      "",
      "M-Pesa transaction code: PLEASE PASTE CODE HERE",
      "",
      "Please verify my payment and activate my EBBC2026 ticket.",
    ].join("\n");

  const whatsappUrl =
    `https://wa.me/254715500268?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

  return (
    <main className="min-h-screen bg-[#F7F5F5] px-5 pb-24 pt-32 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[960px]">
        <Link
          href={
            EBBC2026.routes
              .tickets
          }
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Registration
        </Link>

        <div className="mt-8 overflow-hidden rounded-[34px] border border-[#0D1D34]/8 bg-white shadow-[0_30px_90px_rgba(13,29,52,0.10)]">
          <div className="bg-[#0D1D34] px-6 py-11 text-center text-white sm:px-12">
            <div className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full bg-[#CC8591]">
              <Smartphone className="h-8 w-8" />
            </div>

            <p className="mt-6 text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#CC8591]">
              EBBC2026 Payment
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.96] tracking-[-0.04em] sm:text-[60px]">
              Pay via Equity Paybill
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[13px] leading-7 text-white/65">
              Complete your M-Pesa
              payment using the
              official EBBC2026
              Paybill details below.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Order Number
                </p>

                <p className="mt-3 break-all text-base font-black">
                  {orderNumber ||
                    "Not available"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Amount Due
                </p>

                <p className="mt-3 text-xl font-black text-[#CC8591]">
                  {currency}{" "}
                  {validAmount
                    ? formatMoney(
                        validAmount,
                      )
                    : "—"}
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-[28px] border-2 border-[#CC8591]/35 bg-[#CC8591]/8 p-6 sm:p-8">
              <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#0D1D34]/45">
                Official Payment Details
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[22px] bg-[#0D1D34] p-6 text-center text-white">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/55">
                    Paybill Number
                  </p>

                  <p className="mt-3 text-[42px] font-black tracking-[-0.03em]">
                    247247
                  </p>
                </div>

                <div className="rounded-[22px] bg-white p-6 text-center shadow-sm">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0D1D34]/45">
                    Account Number
                  </p>

                  <p className="mt-3 text-[42px] font-black tracking-[-0.03em] text-[#0D1D34]">
                    100831
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-[24px] border border-[#0D1D34]/8 bg-white p-6">
              <h2 className="text-base font-extrabold">
                How to Pay
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  "Open M-Pesa and choose Lipa na M-Pesa.",
                  "Choose Pay Bill.",
                  "Enter Business Number 247247.",
                  "Enter Account Number 100831.",
                  validAmount
                    ? `Enter the exact amount: KES ${formatMoney(
                        validAmount,
                      )}.`
                    : "Enter the exact amount shown on your registration.",
                  "Enter your M-Pesa PIN and complete payment.",
                  "Keep the M-Pesa transaction code.",
                ].map(
                  (
                    instruction,
                    index,
                  ) => (
                    <div
                      key={
                        instruction
                      }
                      className="flex items-start gap-4"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#CC8591] text-xs font-black text-white">
                        {index + 1}
                      </div>

                      <p className="pt-1 text-sm leading-6 text-[#0D1D34]/70">
                        {
                          instruction
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="mt-7 flex items-start gap-4 rounded-[22px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="text-sm font-extrabold">
                  Payment verification required
                </p>

                <p className="mt-2 text-xs leading-6">
                  Your QR ticket is
                  not activated
                  immediately after a
                  Paybill payment.
                  Send the M-Pesa
                  transaction code and
                  your order number to
                  Salons Assured Kenya.
                  The ticket will be
                  activated and emailed
                  after the payment is
                  verified.
                </p>
              </div>
            </div>

            <a
              href={
                whatsappUrl
              }
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#1FAF5A] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(31,175,90,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
            >
              <MessageCircle className="h-5 w-5" />
              Send M-Pesa Confirmation
              on WhatsApp
            </a>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-[#0D1D34]/45">
              <ShieldCheck className="h-4 w-4 text-[#CC8591]" />
              Only verified payments
              activate EBBC2026 QR
              tickets.
            </div>

            <div className="mt-8 border-t border-[#0D1D34]/8 pt-7 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-[#CC8591]" />

              <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#0D1D34]/55">
                One ticket is valid
                for one attendee on
                the selected event
                day. Keep your
                payment confirmation
                until your ticket has
                been received.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}