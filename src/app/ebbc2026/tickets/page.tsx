"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Ticket,
} from "lucide-react";
import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { EBBC2026 } from "@/lib/ebbc2026/config";

const categories =
  EBBC2026.participantCategories;

export default function EBBC2026TicketsPage() {
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    fullName: "",
    phone: "",
    email: "",
    country: "Kenya",
    organisation: "",
    referralCode: "",
  });

  const total = useMemo(
    () => quantity * EBBC2026.ticket.priceKes,
    [quantity],
  );

  const formattedTotal =
    new Intl.NumberFormat("en-KE").format(total);

  const updateField = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, 10),
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1),
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const message = [
      "Hello Salons Assured Kenya.",
      "",
      "I would like to register for EBBC2026.",
      "",
      `Name: ${formData.fullName}`,
      `Category: ${formData.category}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Country: ${formData.country}`,
      `Organisation: ${
        formData.organisation || "Not provided"
      }`,
      `Tickets: ${quantity}`,
      `Total: KES ${formattedTotal}`,
      `Referral Code: ${
        formData.referralCode || "None"
      }`,
    ].join("\n");

    const whatsappUrl =
      `${EBBC2026.contacts.whatsappUrl}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F5F5] pb-24 pt-32 text-[#0D1D34]">
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href={EBBC2026.routes.home}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to EBBC2026
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="max-w-3xl">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#CC8591]">
                  EBBC2026 Registration
                </p>

                <h1 className="mt-5 [font-family:var(--font-display)] text-[50px] font-semibold leading-[0.94] tracking-[-0.05em] sm:text-[68px]">
                  Secure Your Full Convention Pass
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#0D1D34]/60">
                  Complete your details below to
                  begin your EBBC2026 registration
                  for 17–18 November 2026.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_25px_70px_rgba(13,29,52,0.08)] sm:p-9"
              >
                <div className="flex items-center gap-3 border-b border-[#0D1D34]/8 pb-6">
                  <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
                    <Ticket className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold">
                      Participant Details
                    </h2>

                    <p className="mt-1 text-xs text-[#0D1D34]/45">
                      Fields marked with * are
                      required.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-[11px] font-extrabold">
                      Participant Category *
                    </span>

                    <select
                      required
                      value={formData.category}
                      onChange={(event) =>
                        updateField(
                          "category",
                          event.target.value,
                        )
                      }
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    >
                      <option value="">
                        Select your category
                      </option>

                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Full Name *
                    </span>

                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(event) =>
                        updateField(
                          "fullName",
                          event.target.value,
                        )
                      }
                      placeholder="Enter full name"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Phone Number *
                    </span>

                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. 0712 345 678"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Email Address *
                    </span>

                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value,
                        )
                      }
                      placeholder="name@example.com"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Country *
                    </span>

                    <input
                      required
                      type="text"
                      value={formData.country}
                      onChange={(event) =>
                        updateField(
                          "country",
                          event.target.value,
                        )
                      }
                      placeholder="Country"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Company, Salon or Organisation
                    </span>

                    <input
                      type="text"
                      value={formData.organisation}
                      onChange={(event) =>
                        updateField(
                          "organisation",
                          event.target.value,
                        )
                      }
                      placeholder="Optional"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>

                  <label>
                    <span className="text-[11px] font-extrabold">
                      Referral Code
                    </span>

                    <input
                      type="text"
                      value={formData.referralCode}
                      onChange={(event) =>
                        updateField(
                          "referralCode",
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="Optional"
                      className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm uppercase outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                    />
                  </label>
                </div>

                <div className="mt-8 rounded-[20px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0D1D34]/45">
                        Number of tickets
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        Maximum 10 per registration
                      </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-full border border-[#0D1D34]/10 bg-white p-1.5">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                        aria-label="Decrease ticket quantity"
                        className="grid h-9 w-9 place-items-center rounded-full text-[#0D1D34] transition hover:bg-[#CC8591] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0D1D34]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-7 text-center text-lg font-black">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={quantity === 10}
                        aria-label="Increase ticket quantity"
                        className="grid h-9 w-9 place-items-center rounded-full text-[#0D1D34] transition hover:bg-[#CC8591] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0D1D34]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
                >
                  Continue Registration on WhatsApp

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-[#0D1D34]/45">
                  Secure online M-Pesa and card
                  payment will be activated on this
                  page during the payment integration
                  phase.
                </p>
              </form>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[28px] bg-[#0D1D34] text-white shadow-[0_30px_90px_rgba(13,29,52,0.22)]">
                <div className="border-b border-white/10 p-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                    Order Summary
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    EBBC2026 Full Convention Pass
                  </h2>

                  <div className="mt-5 flex items-center gap-3 text-xs text-white/60">
                    <CalendarDays className="h-4 w-4 text-[#CC8591]" />

                    {EBBC2026.dates.display}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-bold text-white/60">
                        KES 4,500 × {quantity}
                      </p>

                      <p className="mt-1 text-sm font-extrabold">
                        Convention Pass
                      </p>
                    </div>

                    <p className="text-lg font-extrabold">
                      KES {formattedTotal}
                    </p>
                  </div>

                  <div className="flex items-end justify-between py-6">
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                        Total
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Kenyan Shillings
                      </p>
                    </div>

                    <p className="text-3xl font-black text-[#CC8591]">
                      KES {formattedTotal}
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-6">
                    {EBBC2026.ticket.includes.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#CC8591]">
                            <Check className="h-3 w-3" />
                          </span>

                          <span className="text-[12px] leading-5 text-white/65">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-[#0D1D34]/8 bg-white p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-xs font-extrabold">
                      Secure Registration
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#0D1D34]/50">
                      Your registration details are
                      used only for EBBC2026 ticketing
                      and event communication.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-[12px] bg-[#FAFAFA] px-3 py-3 text-[10px] font-bold">
                    <Smartphone className="h-4 w-4 text-[#CC8591]" />

                    M-Pesa
                  </div>

                  <div className="flex items-center gap-2 rounded-[12px] bg-[#FAFAFA] px-3 py-3 text-[10px] font-bold">
                    <CreditCard className="h-4 w-4 text-[#CC8591]" />

                    Card
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}