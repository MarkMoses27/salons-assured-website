"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  QrCode,
  ShieldCheck,
  Smartphone,
  Ticket,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

import { useMemo, useState, type FormEvent } from "react";

import {
  EBBC2026,
  getEBBCTicketPriceKes,
  isEBBCEarlyBirdActive,
} from "@/lib/ebbc2026/config";

const participantCategories = EBBC2026.participantCategories;

const EVENT_DAYS = [
  {
    value: "2026-11-17",
    shortLabel: "Day 1",
    label: "17 November 2026",
  },
  {
    value: "2026-11-18",
    shortLabel: "Day 2",
    label: "18 November 2026",
  },
] as const;

type EventDate = (typeof EVENT_DAYS)[number]["value"];

type BuyerDetails = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  organisation: string;
  referralCode: string;
};

type AttendeeDetails = {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  organisation: string;
  country: string;
  eventDate: EventDate | "";
};

type CreatedTicket = {
  ticketNumber: string;
  attendeeName: string;
  eventDate: string;
  status: string;
};

type CreatedOrder = {
  orderNumber: string;
  quantity: number;
  unitPriceKes: number;
  totalAmountKes: number;
  currency: string;
  orderStatus: string;
  paymentStatus: string;
  tickets: CreatedTicket[];
};

type CreateOrderResponse = {
  ok?: boolean;
  message?: string;

  order?: {
    orderNumber?: string;
    order_number?: string;

    quantity?: number;
    ticketQuantity?: number;
    ticket_quantity?: number;

    unitPriceKes?: number;
    unit_price_kes?: number;

    totalAmountKes?: number;
    total_amount_kes?: number;

    currency?: string;

    orderStatus?: string;
    order_status?: string;

    paymentStatus?: string;
    payment_status?: string;
  };

  orderNumber?: string;
  quantity?: number;
  ticketQuantity?: number;
  unitPriceKes?: number;
  totalAmountKes?: number;
  currency?: string;
  orderStatus?: string;
  paymentStatus?: string;

  tickets?: Array<{
    ticketNumber?: string;
    ticket_number?: string;

    attendeeName?: string;
    attendee_name?: string;

    eventDate?: string;
    event_date?: string;

    status?: string;
    ticketStatus?: string;
    ticket_status?: string;
  }>;
};

type InitializePaymentResponse = {
  ok?: boolean;
  message?: string;
  authorizationUrl?: string;
  authorization_url?: string;
};

function createBlankAttendee(): AttendeeDetails {
  return {
    fullName: "",
    email: "",
    phone: "",
    category: "",
    organisation: "",
    country: "Kenya",
    eventDate: "",
  };
}

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

function formatTicketDate(value: string) {
  if (value === "2026-11-17") {
    return "17 November 2026";
  }

  if (value === "2026-11-18") {
    return "18 November 2026";
  }

  return value;
}

function normaliseCreatedOrder(
  response: CreateOrderResponse,
  fallbackQuantity: number,
  fallbackTotal: number,
): CreatedOrder | null {
  const order = response.order;

  const orderNumber = cleanText(
    order?.orderNumber || order?.order_number || response.orderNumber,
  );

  if (!orderNumber) {
    return null;
  }

  const quantity = Number(
    order?.quantity ??
      order?.ticketQuantity ??
      order?.ticket_quantity ??
      response.quantity ??
      response.ticketQuantity ??
      fallbackQuantity,
  );

  const unitPriceKes = Number(
    order?.unitPriceKes ??
      order?.unit_price_kes ??
      response.unitPriceKes ??
      getEBBCTicketPriceKes(),
  );

  const totalAmountKes = Number(
    order?.totalAmountKes ??
      order?.total_amount_kes ??
      response.totalAmountKes ??
      fallbackTotal,
  );

  const tickets: CreatedTicket[] = (response.tickets || []).map((ticket) => ({
    ticketNumber: cleanText(ticket.ticketNumber || ticket.ticket_number),

    attendeeName: cleanText(ticket.attendeeName || ticket.attendee_name),

    eventDate: cleanText(ticket.eventDate || ticket.event_date),

    status: cleanText(
      ticket.status || ticket.ticketStatus || ticket.ticket_status || "pending",
    ),
  }));

  return {
    orderNumber,

    quantity:
      Number.isFinite(quantity) && quantity > 0 ? quantity : fallbackQuantity,

    unitPriceKes:
      Number.isFinite(unitPriceKes) && unitPriceKes > 0
        ? unitPriceKes
        : getEBBCTicketPriceKes(),

    totalAmountKes:
      Number.isFinite(totalAmountKes) && totalAmountKes > 0
        ? totalAmountKes
        : fallbackTotal,

    currency: cleanText(
      order?.currency || response.currency || "KES",
    ).toUpperCase(),

    orderStatus: cleanText(
      order?.orderStatus ||
        order?.order_status ||
        response.orderStatus ||
        "pending",
    ),

    paymentStatus: cleanText(
      order?.paymentStatus ||
        order?.payment_status ||
        response.paymentStatus ||
        "pending",
    ),

    tickets,
  };
}

const FORM_ID = "ebbc2026-registration-form";

const FIELD_CLASS =
  "mt-2 h-[54px] w-full rounded-2xl border border-[#0D1D34]/12 bg-white px-4 text-[15px] font-medium text-[#0D1D34] outline-none transition-colors placeholder:font-normal placeholder:text-[#0D1D34]/30 hover:border-[#0D1D34]/25 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/15";

const LABEL_CLASS =
  "text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0D1D34]/50";

export default function EBBC2026TicketsPage() {
  const [buyer, setBuyer] = useState<BuyerDetails>({
    fullName: "",
    email: "",
    phone: "",
    country: "Kenya",
    organisation: "",
    referralCode: "",
  });

  const [attendees, setAttendees] = useState<AttendeeDetails[]>([
    createBlankAttendee(),
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isStartingPayment, setIsStartingPayment] = useState(false);

  const [formError, setFormError] = useState("");

  const [paymentError, setPaymentError] = useState("");

  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(null);

  const quantity = attendees.length;

  const earlyBirdActive = isEBBCEarlyBirdActive();

  const totalAmount = useMemo(
    () => quantity * getEBBCTicketPriceKes(),
    [quantity],
  );

  const dayOneCount = attendees.filter(
    (attendee) => attendee.eventDate === "2026-11-17",
  ).length;

  const dayTwoCount = attendees.filter(
    (attendee) => attendee.eventDate === "2026-11-18",
  ).length;

  const unassignedCount = quantity - dayOneCount - dayTwoCount;

  function updateBuyer(field: keyof BuyerDetails, value: string) {
    setBuyer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateAttendee(
    index: number,
    field: keyof AttendeeDetails,
    value: string,
  ) {
    setAttendees((current) =>
      current.map((attendee, attendeeIndex) =>
        attendeeIndex === index
          ? {
              ...attendee,
              [field]: value,
            }
          : attendee,
      ),
    );
  }

  function increaseQuantity() {
    if (attendees.length >= 10) {
      return;
    }

    setAttendees((current) => [...current, createBlankAttendee()]);
  }

  function decreaseQuantity() {
    if (attendees.length <= 1) {
      return;
    }

    setAttendees((current) => current.slice(0, -1));
  }

  function copyBuyerToAttendee(index: number) {
    setAttendees((current) =>
      current.map((attendee, attendeeIndex) =>
        attendeeIndex === index
          ? {
              ...attendee,
              fullName: buyer.fullName,
              email: buyer.email,
              phone: buyer.phone,
              country: buyer.country || "Kenya",
              organisation: buyer.organisation,
            }
          : attendee,
      ),
    );
  }

  function validateForm() {
    if (
      !buyer.fullName.trim() ||
      !buyer.email.trim() ||
      !buyer.phone.trim() ||
      !buyer.country.trim()
    ) {
      return "Complete all required buyer details.";
    }

    for (let index = 0; index < attendees.length; index += 1) {
      const attendee = attendees[index];

      if (!attendee.eventDate) {
        return `Select an event day for Ticket ${index + 1}.`;
      }

      if (
        !attendee.fullName.trim() ||
        !attendee.email.trim() ||
        !attendee.phone.trim() ||
        !attendee.category.trim() ||
        !attendee.country.trim()
      ) {
        return `Complete all required details for Ticket ${index + 1}.`;
      }
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError("");
    setPaymentError("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setFormError(validationMessage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ebbc2026/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          buyerFullName: buyer.fullName.trim(),

          buyerEmail: buyer.email.trim().toLowerCase(),

          buyerPhone: buyer.phone.trim(),

          country: buyer.country.trim(),

          organisation: buyer.organisation.trim(),

          referralCode: buyer.referralCode.trim().toUpperCase(),

          attendees: attendees.map((attendee) => ({
            fullName: attendee.fullName.trim(),

            email: attendee.email.trim().toLowerCase(),

            phone: attendee.phone.trim(),

            category: attendee.category.trim(),

            organisation: attendee.organisation.trim(),

            country: attendee.country.trim(),

            eventDate: attendee.eventDate,
          })),
        }),
      });

      const responseData = (await response.json()) as CreateOrderResponse;

      if (!response.ok || responseData.ok === false) {
        throw new Error(
          responseData.message || "The registration order could not be created.",
        );
      }

      const order = normaliseCreatedOrder(responseData, quantity, totalAmount);

      if (!order) {
        throw new Error(
          "The registration was saved, but no order number was returned.",
        );
      }

      setCreatedOrder(order);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "An unexpected registration error occurred.",
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function startPaystackPayment() {
    if (!createdOrder) {
      return;
    }

    setPaymentError("");
    setIsStartingPayment(true);

    try {
      const response = await fetch("/api/ebbc2026/paystack/initialize", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderNumber: createdOrder.orderNumber,
        }),
      });

      const responseData = (await response.json()) as InitializePaymentResponse;

      if (!response.ok || responseData.ok === false) {
        throw new Error(
          responseData.message || "Paystack checkout could not be opened.",
        );
      }

      const authorizationUrl =
        responseData.authorizationUrl || responseData.authorization_url;

      if (!authorizationUrl) {
        throw new Error("Paystack checkout could not be opened.");
      }

      window.location.href = authorizationUrl;
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "An unexpected payment error occurred.",
      );

      setIsStartingPayment(false);
    }
  }

  function startInstallmentPayment() {
    if (!createdOrder) {
      return;
    }

    const params = new URLSearchParams({
      order: createdOrder.orderNumber,
      amount: String(createdOrder.totalAmountKes),
      currency: createdOrder.currency,
    });

    window.location.href = `/ebbc2026/paybill?${params.toString()}`;
  }

  function resetRegistration() {
    setBuyer({
      fullName: "",
      email: "",
      phone: "",
      country: "Kenya",
      organisation: "",
      referralCode: "",
    });

    setAttendees([createBlankAttendee()]);

    setCreatedOrder(null);
    setFormError("");
    setPaymentError("");
    setIsSubmitting(false);
    setIsStartingPayment(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (createdOrder) {
    return (
      <main className="min-h-screen bg-[#F6F3F2] pb-24 text-[#0D1D34]">
        <section className="relative overflow-hidden bg-[#0D1D34] px-5 pb-28 pt-32 text-white sm:px-8 sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#CC8591]/25 blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-[#CC8591]/12 blur-[100px]"
          />

          <div className="relative mx-auto max-w-[960px]">
            <Link
              href={EBBC2026.routes.home}
              className="inline-flex items-center gap-2 rounded-full text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-[#CC8591] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC8591] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1D34]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to EBBC2026
            </Link>

            <div className="mt-10 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#CC8591] text-white shadow-[0_18px_40px_rgba(204,133,145,0.35)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                  Step 2 of 3 &middot; Payment
                </p>

                <h1 className="mt-3 [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.94] tracking-[-0.045em] sm:text-[60px]">
                  Registration saved.
                  <br className="hidden sm:block" /> Choose how to pay.
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
              Pay the full order automatically through Paystack, or choose
              Equity Paybill if you want to pay in installments. Your QR codes
              activate when the full order balance has been cleared.
            </p>
          </div>
        </section>

        <section className="relative z-10 -mt-20 px-5 sm:px-8">
          <div className="mx-auto grid max-w-[960px] gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_28px_80px_rgba(13,29,52,0.10)] sm:p-9">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#0D1D34]/8 bg-[#FAF8F8] p-5">
                  <p className={LABEL_CLASS}>Order number</p>

                  <p className="mt-3 break-all text-sm font-black">
                    {createdOrder.orderNumber}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#0D1D34]/8 bg-[#FAF8F8] p-5">
                  <p className={LABEL_CLASS}>Tickets</p>

                  <p className="mt-2 text-3xl font-black leading-none">
                    {createdOrder.quantity}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#CC8591]/25 bg-[#CC8591]/8 p-5">
                  <p className={LABEL_CLASS}>Order total</p>

                  <p className="mt-2 text-xl font-black leading-none text-[#CC8591]">
                    {createdOrder.currency}{" "}
                    {formatMoney(createdOrder.totalAmountKes)}
                  </p>
                </div>
              </div>

              {createdOrder.tickets.length > 0 ? (
                <div className="mt-8">
                  <h2 className="flex items-center gap-3 text-sm font-extrabold">
                    <Ticket className="h-5 w-5 text-[#CC8591]" />
                    Tickets reserved
                  </h2>

                  <p className="mt-2.5 text-[13px] leading-6 text-[#0D1D34]/55">
                    Each ticket admits one attendee on the single event day
                    shown on it. QR codes remain inactive until the full order
                    balance is cleared.
                  </p>

                  <div className="mt-5 space-y-3">
                    {createdOrder.tickets.map((ticket, index) => (
                      <div
                        key={
                          ticket.ticketNumber ||
                          `${ticket.attendeeName}-${index}`
                        }
                        className="flex flex-col justify-between gap-3 rounded-2xl border border-[#0D1D34]/8 bg-[#FAF8F8] p-5 sm:flex-row sm:items-center"
                      >
                        <div>
                          <p className="text-sm font-extrabold">
                            {ticket.attendeeName || `Attendee ${index + 1}`}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {ticket.eventDate ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D1D34]/7 px-3 py-1 text-[10px] font-extrabold text-[#0D1D34]">
                                <CalendarDays className="h-3 w-3" />
                                {formatTicketDate(ticket.eventDate)}
                              </span>
                            ) : null}

                            {ticket.ticketNumber ? (
                              <span className="rounded-full bg-[#CC8591]/12 px-3 py-1 text-[10px] font-extrabold tracking-[0.04em] text-[#CC8591]">
                                {ticket.ticketNumber}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-800">
                          QR inactive &middot; balance due
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {paymentError ? (
                <div
                  role="alert"
                  className="mt-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em]">
                      Payment did not open
                    </p>

                    <p className="mt-1.5 text-[13px] leading-6">
                      {paymentError}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-8">
                <p className={LABEL_CLASS}>Choose payment option</p>

                <div className="mt-4 grid gap-4">
                  <div className="rounded-[24px] border-2 border-[#CC8591] bg-[#CC8591]/6 p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#CC8591] text-white">
                        <Smartphone className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-black">
                            Pay in Full
                          </h2>

                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                            Automatic
                          </span>
                        </div>

                        <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/60">
                          Pay the full {createdOrder.currency}{" "}
                          {formatMoney(createdOrder.totalAmountKes)} securely
                          through Paystack using M-PESA or card. Successful
                          payment is verified automatically and your tickets are
                          activated.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={startPaystackPayment}
                      disabled={isStartingPayment}
                      className="group mt-6 inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_18px_40px_rgba(204,133,145,0.30)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {isStartingPayment ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Opening Paystack
                        </>
                      ) : (
                        <>
                          Pay in Full with Paystack
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[11px] font-bold text-[#0D1D34]/45">
                      M-PESA or card &middot; automatic payment confirmation
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#0D1D34]/10 bg-[#FAF8F8] p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0D1D34] text-white">
                        <WalletCards className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-black">
                            Pay in Installments
                          </h2>

                          <span className="rounded-full bg-[#0D1D34]/8 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#0D1D34]/60">
                            Mdogo mdogo
                          </span>
                        </div>

                        <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/60">
                          Pay any amount toward this order using the Equity
                          Paybill. Each verified installment reduces your
                          balance. Your QR codes activate when the remaining
                          balance reaches KES 0.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={startInstallmentPayment}
                      disabled={isStartingPayment}
                      className="mt-6 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-[#0D1D34]/15 bg-white px-7 text-sm font-extrabold text-[#0D1D34] transition hover:border-[#0D1D34] hover:bg-[#0D1D34] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0D1D34]/15 disabled:opacity-50"
                    >
                      Pay in Installments
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="mt-3 text-center text-[11px] font-bold text-[#0D1D34]/45">
                      Equity Paybill &middot; partial payments accepted
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-[#0D1D34]/8 bg-[#FAF8F8] p-6">
                <h2 className="text-sm font-extrabold">
                  When do the tickets activate?
                </h2>

                <div className="mt-4 flex items-start gap-3">
                  <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <p className="text-[13px] leading-6 text-[#0D1D34]/65">
                    Whether you pay in full through Paystack or use
                    installments, the QR codes become active only when the
                    entire order balance has been cleared. The ticket email is
                    then sent to the registered attendee.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetRegistration}
                disabled={isStartingPayment}
                className="mt-6 inline-flex h-[54px] w-full items-center justify-center rounded-full border border-[#0D1D34]/15 bg-white px-7 text-sm font-extrabold transition-colors hover:border-[#0D1D34] hover:bg-[#0D1D34] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0D1D34]/15 disabled:opacity-50"
              >
                Start another registration
              </button>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[24px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_20px_60px_rgba(13,29,52,0.07)]">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-sm font-extrabold">
                      Full payment
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/55">
                      Paystack verifies successful full payments automatically.
                      Once confirmed, the order is marked paid and the ticket QR
                      codes activate.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#0D1D34]/8 pt-5 text-[11px] font-bold text-[#0D1D34]/45">
                  <span className="inline-flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#CC8591]" />
                    M-PESA
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#CC8591]" />
                    Paystack
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#0D1D34]/8 bg-white p-6">
                <div className="flex items-start gap-3">
                  <WalletCards className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-sm font-extrabold">
                      Installment option
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/55">
                      Customers who want to pay mdogo mdogo can use the Equity
                      Paybill option. Each payment is recorded against the same
                      order until the balance is cleared.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#0D1D34]/8 bg-white p-6">
                <div className="flex items-start gap-3">
                  <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-sm font-extrabold">
                      One QR, one selected day
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/55">
                      Each QR admits one attendee on the event day printed on
                      that ticket. Attending both convention days requires two
                      tickets.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F3F2] pb-40 text-[#0D1D34] lg:pb-24">
      <section className="relative overflow-hidden bg-[#0D1D34] px-5 pb-32 pt-32 text-white sm:px-8 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#CC8591]/25 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#CC8591]/10 blur-[110px]"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <Link
            href={EBBC2026.routes.home}
            className="inline-flex items-center gap-2 rounded-full text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-[#CC8591] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC8591] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1D34]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to EBBC2026
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
                EBBC2026 &middot; Beauty and business convention
              </p>

              <h1 className="mt-5 max-w-3xl [font-family:var(--font-display)] text-[50px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[72px]">
                Book a seat
                <br />
                for one convention day.
              </h1>

              <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/65">
                The convention runs on 17 and 18 November 2026, and every ticket
                covers one attendee on one of those days. Anyone attending both
                days needs two tickets, one for each day.
              </p>

              {earlyBirdActive ? (
                <div className="mt-7 flex w-fit flex-wrap items-center gap-3 rounded-2xl border border-[#CC8591]/40 bg-[#CC8591]/12 px-5 py-4">
                  <BadgeCheck className="h-5 w-5 text-[#CC8591]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#CC8591]">
                    Early Bird
                  </span>
                  <span className="text-xl font-black text-white">
                    {EBBC2026.ticket.earlyBird.displayPrice}
                  </span>
                  <span className="text-[12px] font-bold text-white/55">
                    until {EBBC2026.ticket.earlyBird.deadlineDisplay}
                  </span>
                </div>
              ) : null}

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-bold text-white/75">
                  <CalendarDays className="h-4 w-4 text-[#CC8591]" />
                  1 ticket = 1 attendee = 1 day
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-bold text-white/75">
                  <CreditCard className="h-4 w-4 text-[#CC8591]" />
                  Full payment or installments
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-bold text-white/75">
                  <QrCode className="h-4 w-4 text-[#CC8591]" />
                  QR entry on your chosen day
                </span>
              </div>
            </div>

            <ol className="flex gap-3 lg:flex-col lg:gap-4">
              <li className="flex-1 rounded-2xl border border-[#CC8591]/40 bg-[#CC8591]/12 p-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#CC8591]">
                  Step 1
                </p>

                <p className="mt-1.5 text-[13px] font-extrabold">
                  Attendee details
                </p>
              </li>

              <li className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/40">
                  Step 2
                </p>

                <p className="mt-1.5 text-[13px] font-extrabold text-white/60">
                  Choose payment method
                </p>
              </li>

              <li className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/40">
                  Step 3
                </p>

                <p className="mt-1.5 text-[13px] font-extrabold text-white/60">
                  Receive active QR ticket
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1180px]">
          {formError ? (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-[0_16px_40px_rgba(13,29,52,0.08)]"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em]">
                  Check your details
                </p>

                <p className="mt-1.5 text-[13px] leading-6">{formError}</p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
            <form
              id={FORM_ID}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_28px_80px_rgba(13,29,52,0.10)] sm:p-9">
                <div className="flex items-start gap-4 border-b border-[#0D1D34]/8 pb-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#CC8591]/12 text-[#CC8591]">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="[font-family:var(--font-display)] text-[26px] font-semibold leading-none tracking-[-0.03em]">
                      Buyer details
                    </h2>

                    <p className="mt-2 text-[13px] text-[#0D1D34]/50">
                      The person paying for and managing this registration.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={LABEL_CLASS}>Full name *</span>

                    <input
                      required
                      type="text"
                      value={buyer.fullName}
                      onChange={(event) =>
                        updateBuyer("fullName", event.target.value)
                      }
                      placeholder="Enter full name"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className={LABEL_CLASS}>Phone number *</span>

                    <input
                      required
                      type="tel"
                      value={buyer.phone}
                      onChange={(event) =>
                        updateBuyer("phone", event.target.value)
                      }
                      placeholder="e.g. 0712 345 678"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className={LABEL_CLASS}>Email address *</span>

                    <input
                      required
                      type="email"
                      value={buyer.email}
                      onChange={(event) =>
                        updateBuyer("email", event.target.value)
                      }
                      placeholder="name@example.com"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className={LABEL_CLASS}>Country *</span>

                    <input
                      required
                      type="text"
                      value={buyer.country}
                      onChange={(event) =>
                        updateBuyer("country", event.target.value)
                      }
                      placeholder="Country"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className={LABEL_CLASS}>
                      Company, salon or organisation
                    </span>

                    <input
                      type="text"
                      value={buyer.organisation}
                      onChange={(event) =>
                        updateBuyer("organisation", event.target.value)
                      }
                      placeholder="Optional"
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="block">
                    <span className={LABEL_CLASS}>Referral code</span>

                    <input
                      type="text"
                      value={buyer.referralCode}
                      onChange={(event) =>
                        updateBuyer(
                          "referralCode",
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="Optional"
                      className={`${FIELD_CLASS} uppercase tracking-[0.08em]`}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_28px_80px_rgba(13,29,52,0.10)] sm:p-9">
                <div className="flex flex-col gap-5 border-b border-[#0D1D34]/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#CC8591]/12 text-[#CC8591]">
                      <Users className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="[font-family:var(--font-display)] text-[26px] font-semibold leading-none tracking-[-0.03em]">
                        Your tickets
                      </h2>

                      <p className="mt-2 text-[13px] text-[#0D1D34]/50">
                        Each ticket needs one attendee and one event day.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-fit items-center gap-3 rounded-full border border-[#0D1D34]/10 bg-[#FAF8F8] p-1.5">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                      className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[#0D1D34] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/25 disabled:pointer-events-none disabled:opacity-25"
                      aria-label="Decrease ticket quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span
                      aria-live="polite"
                      className="min-w-9 text-center text-xl font-black tabular-nums"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity === 10}
                      className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[#CC8591] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/25 disabled:pointer-events-none disabled:opacity-25"
                      aria-label="Increase ticket quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#CC8591]/25 bg-[#CC8591]/8 p-5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-[13px] font-extrabold text-[#0D1D34]">
                      One ticket = one attendee = one selected event day
                    </p>

                    <p className="mt-1.5 text-[13px] leading-6 text-[#0D1D34]/70">
                      A ticket never covers both dates. For an attendee who wants
                      17 and 18 November, add two tickets and select a different
                      day on each one.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-7">
                  {attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-[24px] border border-[#0D1D34]/10 bg-[#FAF8F8]"
                    >
                      <div className="flex flex-col gap-3 border-b border-dashed border-[#0D1D34]/15 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0D1D34] text-sm font-black text-white">
                            {index + 1}
                          </span>

                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#CC8591]">
                              Ticket {index + 1} of {quantity}
                            </p>

                            <h3 className="mt-1 text-base font-extrabold">
                              {attendee.fullName.trim() ||
                                `Attendee ${index + 1}`}
                            </h3>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyBuyerToAttendee(index)}
                          className="inline-flex h-10 w-fit items-center justify-center rounded-full border border-[#0D1D34]/12 bg-white px-4 text-[11px] font-extrabold transition-colors hover:border-[#CC8591] hover:text-[#CC8591] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/20"
                        >
                          Use buyer details
                        </button>
                      </div>

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[-9px] top-[68px] h-[18px] w-[18px] rounded-full bg-white sm:top-[78px]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[-9px] top-[68px] h-[18px] w-[18px] rounded-full bg-white sm:top-[78px]"
                      />

                      <div className="p-5 sm:p-6">
                        <fieldset>
                          <legend className={LABEL_CLASS}>
                            Choose the one event day for this ticket *
                          </legend>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {EVENT_DAYS.map((day) => {
                              const selected = attendee.eventDate === day.value;

                              return (
                                <button
                                  key={day.value}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() =>
                                    updateAttendee(index, "eventDate", day.value)
                                  }
                                  className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/25 ${
                                    selected
                                      ? "border-[#CC8591] bg-white shadow-[0_10px_28px_rgba(204,133,145,0.20)]"
                                      : "border-[#0D1D34]/10 bg-white hover:border-[#CC8591]/60"
                                  }`}
                                >
                                  <div>
                                    <p
                                      className={`text-[9px] font-extrabold uppercase tracking-[0.18em] ${
                                        selected
                                          ? "text-[#CC8591]"
                                          : "text-[#0D1D34]/40"
                                      }`}
                                    >
                                      {day.shortLabel}
                                    </p>

                                    <p className="mt-1.5 text-sm font-extrabold">
                                      {day.label}
                                    </p>
                                  </div>

                                  <span
                                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                                      selected
                                        ? "border-[#CC8591] bg-[#CC8591] text-white"
                                        : "border-[#0D1D34]/18"
                                    }`}
                                  >
                                    {selected ? (
                                      <CheckCircle2 className="h-4 w-4" />
                                    ) : null}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                          <label className="block">
                            <span className={LABEL_CLASS}>Full name *</span>

                            <input
                              required
                              type="text"
                              value={attendee.fullName}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "fullName",
                                  event.target.value,
                                )
                              }
                              placeholder="Attendee full name"
                              className={FIELD_CLASS}
                            />
                          </label>

                          <label className="block">
                            <span className={LABEL_CLASS}>
                              Participant category *
                            </span>

                            <select
                              required
                              value={attendee.category}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "category",
                                  event.target.value,
                                )
                              }
                              className={`${FIELD_CLASS} appearance-none pr-10`}
                            >
                              <option value="">Select category</option>

                              {participantCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="block">
                            <span className={LABEL_CLASS}>Email address *</span>

                            <input
                              required
                              type="email"
                              value={attendee.email}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "email",
                                  event.target.value,
                                )
                              }
                              placeholder="name@example.com"
                              className={FIELD_CLASS}
                            />
                          </label>

                          <label className="block">
                            <span className={LABEL_CLASS}>Phone number *</span>

                            <input
                              required
                              type="tel"
                              value={attendee.phone}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "phone",
                                  event.target.value,
                                )
                              }
                              placeholder="e.g. 0712 345 678"
                              className={FIELD_CLASS}
                            />
                          </label>

                          <label className="block">
                            <span className={LABEL_CLASS}>Country *</span>

                            <input
                              required
                              type="text"
                              value={attendee.country}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "country",
                                  event.target.value,
                                )
                              }
                              placeholder="Country"
                              className={FIELD_CLASS}
                            />
                          </label>

                          <label className="block">
                            <span className={LABEL_CLASS}>
                              Company, salon or organisation
                            </span>

                            <input
                              type="text"
                              value={attendee.organisation}
                              onChange={(event) =>
                                updateAttendee(
                                  index,
                                  "organisation",
                                  event.target.value,
                                )
                              }
                              placeholder="Optional"
                              className={FIELD_CLASS}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] leading-6 text-[#0D1D34]/45">
                    {quantity === 10
                      ? "Maximum of 10 tickets per registration."
                      : "Another attendee, or a second day for the same attendee? Add a ticket."}
                  </p>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity === 10}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#0D1D34]/20 bg-white px-6 text-[12px] font-extrabold transition-colors hover:border-[#CC8591] hover:text-[#CC8591] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/20 disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add another ticket
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_18px_40px_rgba(204,133,145,0.30)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving registration
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-4 hidden text-center text-[12px] leading-6 text-[#0D1D34]/45 lg:block">
                  Your order will be created first. You will then choose either
                  full payment through Paystack or installment payment through
                  Equity Paybill.
                </p>
              </div>
            </form>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[28px] bg-[#0D1D34] text-white shadow-[0_30px_90px_rgba(13,29,52,0.22)]">
                <div className="border-b border-white/10 px-7 py-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                    Order summary
                  </p>

                  <h2 className="mt-3 [font-family:var(--font-display)] text-[30px] font-semibold leading-none tracking-[-0.03em]">
                    EBBC2026 day ticket
                  </h2>

                  <p className="mt-4 text-[13px] leading-6 text-white/55">
                    KES {formatMoney(getEBBCTicketPriceKes())} for one attendee
                    on one selected day.
                  </p>

                  {earlyBirdActive ? (
                    <div className="mt-4 rounded-2xl border border-[#CC8591]/30 bg-[#CC8591]/10 p-4">
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#CC8591]">
                        Early Bird Offer
                      </p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-2xl font-black text-white">
                          KES {formatMoney(EBBC2026.ticket.earlyBird.priceKes)}
                        </span>
                        <span className="pb-0.5 text-sm font-bold text-white/35 line-through">
                          KES {formatMoney(EBBC2026.ticket.standardPriceKes)}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] font-bold text-white/50">
                        Valid through 31 August 2026, 11:59 PM EAT.
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="px-7 py-6">
                  <div className="space-y-3 border-b border-white/10 pb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-white/55">
                        17 November
                      </span>

                      <span className="text-[13px] font-extrabold tabular-nums">
                        {dayOneCount} ticket{dayOneCount === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-white/55">
                        18 November
                      </span>

                      <span className="text-[13px] font-extrabold tabular-nums">
                        {dayTwoCount} ticket{dayTwoCount === 1 ? "" : "s"}
                      </span>
                    </div>

                    {unassignedCount > 0 ? (
                      <div className="flex items-center justify-between rounded-xl bg-[#CC8591]/12 px-3 py-2">
                        <span className="text-[12px] font-bold text-[#CC8591]">
                          Day not chosen yet
                        </span>

                        <span className="text-[12px] font-extrabold tabular-nums text-[#CC8591]">
                          {unassignedCount}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 py-5">
                    <div>
                      <p className="text-[12px] font-bold text-white/55 tabular-nums">
                        KES {formatMoney(getEBBCTicketPriceKes())} &times;{" "}
                        {quantity}
                      </p>

                      <p className="mt-1 text-sm font-extrabold">
                        Day ticket
                      </p>
                    </div>

                    <p className="text-base font-extrabold tabular-nums">
                      KES {formatMoney(totalAmount)}
                    </p>
                  </div>

                  <div className="flex items-end justify-between py-6">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                        Order total
                      </p>

                      <p className="mt-1 text-[13px] text-white/50">
                        Full payment or installments
                      </p>
                    </div>

                    <p className="[font-family:var(--font-display)] text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#CC8591] tabular-nums">
                      KES {formatMoney(totalAmount)}
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-6">
                    <div className="flex items-start gap-3 text-[12px] leading-6 text-white/60">
                      <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                      <span>
                        One ticket = one attendee = one selected event day.
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-[12px] leading-6 text-white/60">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                      <span>
                        Attending both 17 and 18 November needs two tickets.
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-[12px] leading-6 text-white/60">
                      <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                      <span>
                        Pay in full automatically with Paystack, or choose
                        Equity Paybill for installments.
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-[12px] leading-6 text-white/60">
                      <QrCode className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                      <span>
                        QR codes activate when the complete order balance has
                        been cleared.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#0D1D34]/8 bg-white p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-sm font-extrabold">
                      Payment happens after this step
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-[#0D1D34]/55">
                      Saving your details creates the registration order. On the
                      next screen you choose Paystack for full payment or Equity
                      Paybill if you want to pay in installments.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-5 border-t border-[#0D1D34]/8 pt-5 text-[11px] font-bold text-[#0D1D34]/45">
                  <span className="inline-flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#CC8591]" />
                    Paystack
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <WalletCards className="h-4 w-4 text-[#CC8591]" />
                    Installments
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0D1D34]/8 bg-white/95 px-5 py-4 shadow-[0_-12px_40px_rgba(13,29,52,0.10)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[560px] items-center gap-4">
          <div className="shrink-0">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0D1D34]/40">
              {quantity} ticket{quantity === 1 ? "" : "s"} &middot; order total
            </p>

            <p className="mt-1 text-lg font-black leading-none tabular-nums">
              KES {formatMoney(totalAmount)}
            </p>
          </div>

          <button
            type="submit"
            form={FORM_ID}
            disabled={isSubmitting}
            className="inline-flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-[#CC8591] px-5 text-[13px] font-extrabold text-white shadow-[0_14px_30px_rgba(204,133,145,0.30)] transition-colors hover:bg-[#0D1D34] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CC8591]/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving
              </>
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}