"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  Smartphone,
  Ticket,
} from "lucide-react";

import {
  EBBC2026,
  getEBBCTicketPriceKes,
  isEBBCEarlyBirdActive,
} from "@/lib/ebbc2026/config";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  eventDate: "2026-11-17" | "2026-11-18" | "";
  category: string;
};

type OrderResponse = {
  ok?: boolean;
  message?: string;
  order?: {
    orderNumber?: string;
    order_number?: string;
    totalAmountKes?: number;
    total_amount_kes?: number;
    currency?: string;
  };
  orderNumber?: string;
  totalAmountKes?: number;
  currency?: string;
};

type PaymentResponse = {
  ok?: boolean;
  message?: string;
  authorizationUrl?: string;
  authorization_url?: string;
};

const FIELD_CLASS =
  "mt-2 h-[54px] w-full rounded-2xl border border-[#0D1D34]/12 bg-white px-4 text-[15px] font-medium text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/15";

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

export default function FastEBBCRegistrationPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    category: "",
  });
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [submittedAlreadyPaid, setSubmittedAlreadyPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStartingPaystack, setIsStartingPaystack] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<{
    orderNumber: string;
    totalAmountKes: number;
    currency: string;
  } | null>(null);

  const ticketPrice = getEBBCTicketPriceKes();
  const earlyBird = isEBBCEarlyBirdActive();

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.eventDate ||
      !form.category
    ) {
      setError("Please complete all five fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ebbc2026/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerFullName: form.fullName.trim(),
          buyerEmail: form.email.trim().toLowerCase(),
          buyerPhone: form.phone.trim(),
          country: "Kenya",
          organisation: "",
          referralCode: "",
          attendees: [
            {
              fullName: form.fullName.trim(),
              email: form.email.trim().toLowerCase(),
              phone: form.phone.trim(),
              category: form.category,
              organisation: "",
              country: "Kenya",
              eventDate: form.eventDate,
            },
          ],
        }),
      });

      const data = (await response.json()) as OrderResponse;

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Registration could not be saved.");
      }

      const orderNumber =
        data.order?.orderNumber || data.order?.order_number || data.orderNumber || "";
      const totalAmountKes = Number(
        data.order?.totalAmountKes ??
          data.order?.total_amount_kes ??
          data.totalAmountKes ??
          ticketPrice,
      );
      const currency = (data.order?.currency || data.currency || "KES").toUpperCase();

      if (!orderNumber) {
        throw new Error("Registration was saved, but the order number was not returned.");
      }

      setSubmittedAlreadyPaid(alreadyPaid);
      setOrder({ orderNumber, totalAmountKes, currency });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function goToPaybill() {
    if (!order) return;

    const params = new URLSearchParams({
      order: order.orderNumber,
      amount: String(order.totalAmountKes),
      currency: order.currency,
    });

    window.location.href = `/ebbc2026/paybill?${params.toString()}`;
  }

  async function goToPaystack() {
    if (!order) return;

    setError("");
    setIsStartingPaystack(true);

    try {
      const response = await fetch("/api/ebbc2026/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: order.orderNumber }),
      });

      const data = (await response.json()) as PaymentResponse;

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Paystack checkout could not be opened.");
      }

      const authorizationUrl = data.authorizationUrl || data.authorization_url;

      if (!authorizationUrl) {
        throw new Error("Paystack checkout could not be opened.");
      }

      window.location.href = authorizationUrl;
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Payment checkout could not be opened.",
      );
      setIsStartingPaystack(false);
    }
  }

  if (order && submittedAlreadyPaid) {
    return (
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-28 text-[#0D1D34] sm:px-8">
        <section className="mx-auto max-w-[680px]">
          <div className="overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_28px_80px_rgba(13,29,52,0.10)]">
            <div className="bg-[#0D1D34] px-6 py-12 text-center text-white sm:px-10">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#CC8591]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                Registration complete
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                You do not need to pay again
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/65">
                Your EBBC 2026 registration has been saved. Salons Assured Kenya will match and verify the Paybill payment you already made.
              </p>
            </div>

            <div className="p-6 sm:p-9">
              <div className="rounded-[22px] bg-[#F7F5F5] p-5 text-center">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Registration reference
                </p>
                <p className="mt-2 text-base font-black">{order.orderNumber}</p>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-[22px] border border-[#CC8591]/25 bg-[#CC8591]/8 p-5 text-sm leading-6 text-[#0D1D34]/70">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />
                <p>
                  Keep your M-PESA confirmation message. Once your existing payment is verified, your EBBC ticket will be activated and sent to the email used during registration.
                </p>
              </div>

              <Link
                href="/ebbc2026"
                className="mt-6 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#0D1D34] px-7 text-sm font-extrabold text-white transition hover:bg-[#CC8591]"
              >
                Done
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (order) {
    return (
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-28 text-[#0D1D34] sm:px-8">
        <section className="mx-auto max-w-[720px]">
          <div className="overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_28px_80px_rgba(13,29,52,0.10)]">
            <div className="bg-[#0D1D34] px-6 py-10 text-center text-white sm:px-10">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#CC8591]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                Registration saved
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                Choose how you want to pay
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/65">
                Your EBBC2026 order is ready. Paybill is the recommended option for a direct M-PESA payment.
              </p>
            </div>

            <div className="p-6 sm:p-9">
              <div className="grid gap-3 rounded-[22px] bg-[#F7F5F5] p-5 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">Order</p>
                  <p className="mt-2 text-sm font-black">{order.orderNumber}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">Amount</p>
                  <p className="mt-2 text-xl font-black text-[#CC8591]">
                    {order.currency} {formatMoney(order.totalAmountKes)}
                  </p>
                </div>
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                onClick={goToPaybill}
                className="mt-6 flex w-full items-center justify-between rounded-[24px] bg-[#0D1D34] p-5 text-left text-white transition hover:-translate-y-0.5 hover:bg-[#162B47]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#CC8591]">
                    <Smartphone className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-[#CC8591]">Recommended</span>
                    <span className="mt-1 block text-base font-black">Pay via M-PESA Paybill</span>
                    <span className="mt-1 block text-xs font-medium text-white/55">Direct payment · avoid Paystack processing fees</span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={goToPaystack}
                disabled={isStartingPaystack}
                className="mt-3 flex w-full items-center justify-between rounded-[24px] border border-[#0D1D34]/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#CC8591]/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F2E4E7] text-[#0D1D34]">
                    {isStartingPaystack ? <Loader2 className="h-6 w-6 animate-spin" /> : <CreditCard className="h-6 w-6" />}
                  </span>
                  <span>
                    <span className="block text-base font-black">Pay Online with Paystack</span>
                    <span className="mt-1 block text-xs font-medium text-[#0D1D34]/50">M-PESA or card · automatic verification</span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </button>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F7F5F5] p-4 text-xs leading-5 text-[#0D1D34]/60">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />
                Both payment routes connect to the same EBBC2026 order and ticket system.
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F5] px-5 pb-20 pt-28 text-[#0D1D34] sm:px-8">
      <section className="mx-auto max-w-[760px]">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#0D1D34] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
            <Ticket className="h-4 w-4 text-[#CC8591]" />
            EBBC 2026
          </div>
          <h1 className="mx-auto mt-5 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl">
            Register in under a minute
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#0D1D34]/60">
            One short form. If you already paid by Paybill, simply tick the option below.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_28px_80px_rgba(13,29,52,0.10)]">
          <div className="grid gap-3 bg-[#0D1D34] px-6 py-5 text-white sm:grid-cols-3 sm:px-8">
            <div className="flex items-center gap-2 text-xs font-bold">
              <CalendarDays className="h-4 w-4 text-[#CC8591]" />
              17–18 Nov 2026
            </div>
            <div className="text-xs font-bold sm:text-center">CITAM Valley Road</div>
            <div className="text-xs font-black text-[#CC8591] sm:text-right">
              KES {formatMoney(ticketPrice)}
              {earlyBird ? " Early Bird" : ""}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-9">
            {error ? (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <div className="space-y-5">
              <label className="block">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50">Full name</span>
                <input
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className={FIELD_CLASS}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50">Phone number</span>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className={FIELD_CLASS}
                    placeholder="07XX XXX XXX"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50">Email</span>
                  <input
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={FIELD_CLASS}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50">Choose event day</span>
                  <select
                    value={form.eventDate}
                    onChange={(event) => updateField("eventDate", event.target.value as FormState["eventDate"])}
                    className={FIELD_CLASS}
                  >
                    <option value="">Select day</option>
                    <option value="2026-11-17">17 November 2026</option>
                    <option value="2026-11-18">18 November 2026</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50">Your category</span>
                  <select
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value)}
                    className={FIELD_CLASS}
                  >
                    <option value="">Select category</option>
                    {EBBC2026.participantCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label
                className={`flex cursor-pointer items-start gap-4 rounded-[22px] border p-5 transition ${
                  alreadyPaid
                    ? "border-[#CC8591]/55 bg-[#CC8591]/10"
                    : "border-[#0D1D34]/10 bg-[#F7F5F5] hover:border-[#CC8591]/35"
                }`}
              >
                <input
                  type="checkbox"
                  checked={alreadyPaid}
                  onChange={(event) => setAlreadyPaid(event.target.checked)}
                  className="mt-1 h-5 w-5 accent-[#CC8591]"
                />
                <span>
                  <span className="block text-sm font-black text-[#0D1D34]">
                    I already paid via M-PESA Paybill
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#0D1D34]/55">
                    Tick this if your EBBC 2026 payment was already sent. You will not be asked to pay again.
                  </span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving registration
                </>
              ) : (
                <>
                  {alreadyPaid ? "Complete Registration" : "Continue to Payment"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] font-bold text-[#0D1D34]/45">
              <ShieldCheck className="h-4 w-4 text-[#CC8591]" />
              {alreadyPaid
                ? "Existing Paybill payment will be verified against your registration"
                : "Secure registration · ticket issued after payment verification"}
            </div>

            <p className="mt-6 text-center text-xs text-[#0D1D34]/50">
              Buying for more than one attendee?{" "}
              <Link href="/ebbc2026/tickets" className="font-extrabold text-[#0D1D34] underline decoration-[#CC8591] underline-offset-4">
                Use group registration
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
