"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
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
  WalletCards,
} from "lucide-react";

import { useRef, useState, type FormEvent } from "react";

import {
  EBBC2026,
  getEBBCTicketPriceKes,
  getEBBCOrderPricing,
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
  { value: "both", shortLabel: "Both days", label: "17 & 18 November 2026" },
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

// Keep one form entry per person; the existing API receives one ticket per day.
function expandAttendees(attendees: AttendeeDetails[]) {
  return attendees.flatMap((attendee) =>
    attendee.eventDate === "both"
      ? ["2026-11-17", "2026-11-18"].map((eventDate) => ({
          ...attendee,
          eventDate,
        }))
      : [{ ...attendee }],
  );
}

function getAttendeePriceKes(attendee: AttendeeDetails) {
  return getEBBCOrderPricing(expandAttendees([attendee])).totalAmountKes;
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
  if (value === "both") return "Both days · 17 & 18 November 2026";
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
  const [otherBuyer, setBuyer] = useState<BuyerDetails>({
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

  const [step, setStep] = useState(1);
  const [differentBuyer, setDifferentBuyer] = useState(false);
  const submitLock = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const firstAttendee = attendees[0];
  const buyer: BuyerDetails = differentBuyer
    ? otherBuyer
    : {
        fullName: firstAttendee.fullName,
        email: firstAttendee.email,
        phone: firstAttendee.phone,
        country: firstAttendee.country,
        organisation: firstAttendee.organisation,
        referralCode: otherBuyer.referralCode,
      };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isStartingPayment, setIsStartingPayment] = useState(false);

  const [formError, setFormError] = useState("");

  const [paymentError, setPaymentError] = useState("");

  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(null);

  const quantity = attendees.length;

  const dayTickets = expandAttendees(attendees);
  const dayTicketCount = dayTickets.length;
  const { totalAmountKes: totalAmount } = getEBBCOrderPricing(dayTickets);

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
    if (dayTicketCount >= 10) {
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

  function contactError(
    person: { fullName: string; email: string; phone: string; country: string },
    label: string,
  ) {
    if (person.fullName.trim().length < 2)
      return `Enter the full name for ${label}.`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email.trim()))
      return `Enter a valid email for ${label}.`;
    if (!/^\+?[0-9]{9,15}$/.test(person.phone.replace(/[\s\-()]/g, "")))
      return `Enter a valid phone number for ${label}.`;
    if (!person.country.trim()) return `Enter the country for ${label}.`;
    return "";
  }

  function validateTickets() {
    if (dayTicketCount > 10)
      return "This booking exceeds 10 day tickets. Reduce the number of attendees or make a separate booking for the remaining attendees.";
    for (let index = 0; index < attendees.length; index++) {
      if (!attendees[index].eventDate)
        return `Choose dates for Attendee ${index + 1}.`;
      if (!attendees[index].category)
        return `Choose a category for Attendee ${index + 1}.`;
    }
    return "";
  }

  function validateForm() {
    const ticketError = validateTickets();
    if (ticketError) return ticketError;
    for (let index = 0; index < attendees.length; index++) {
      const error = contactError(attendees[index], `Attendee ${index + 1}`);
      if (error) return error;
    }
    return contactError(buyer, "the booking contact");
  }

  function moveToStep(next: number) {
    setStep(next);
    setFormError("");
    requestAnimationFrame(() => {
      stepHeading.current?.focus({ preventScroll: true });
      document
        .getElementById(FORM_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function continueRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 3) {
      void handleSubmit(event);
      return;
    }
    const error = step === 1 ? validateTickets() : validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    moveToStep(step + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitLock.current) return;
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

    submitLock.current = true;
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

          attendees: dayTickets.map((attendee) => ({
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
          responseData.message ||
            "The registration order could not be created.",
        );
      }

      const order = normaliseCreatedOrder(
        responseData,
        dayTicketCount,
        totalAmount,
      );

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
      submitLock.current = false;
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
    setStep(1);
    setDifferentBuyer(false);
    submitLock.current = false;

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
                          <h2 className="text-base font-black">Pay in Full</h2>

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
                    <p className="text-sm font-extrabold">Full payment</p>

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
                    <p className="text-sm font-extrabold">Installment option</p>

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
                      that ticket. If you chose both days, we reserve a ticket
                      for each date automatically.
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

  const stepLabels = ["Choose attendance", "Your details", "Review & pay"];
  const allTicketsChosen = attendees.every(
    (attendee) => attendee.eventDate && attendee.category,
  );
  const buttonLabel =
    step === 1
      ? "Next: your details"
      : step === 2
        ? "Next: review booking"
        : "Continue to Payment";

  function contactFields(
    person: AttendeeDetails | BuyerDetails,
    update: (
      field: "fullName" | "email" | "phone" | "country" | "organisation",
      value: string,
    ) => void,
    prefix: string,
  ) {
    return (
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {(
          [
            ["fullName", "Full name", "text", "Enter full name", "name"],
            ["email", "Email address", "email", "name@example.com", "email"],
            ["phone", "Phone number", "tel", "e.g. 0712 345 678", "tel"],
            ["country", "Country", "text", "Country", "country-name"],
            [
              "organisation",
              "Company or salon (optional)",
              "text",
              "Optional",
              "organization",
            ],
          ] as const
        ).map(([field, label, type, placeholder, autocomplete]) => (
          <label className="block" key={field} htmlFor={`${prefix}-${field}`}>
            <span className="text-sm font-semibold text-[#0D1D34]">
              {label}
              {field !== "organisation" ? " *" : ""}
            </span>
            <input
              id={`${prefix}-${field}`}
              type={type}
              autoComplete={`section-${prefix} ${autocomplete}`}
              required={field !== "organisation"}
              value={person[field]}
              onChange={(event) => update(field, event.target.value)}
              placeholder={placeholder}
              className={FIELD_CLASS}
            />
          </label>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F3F2] pb-32 text-[#0D1D34]">
      <header className="bg-[#0D1D34] px-5 pb-12 pt-28 text-white sm:pt-32">
        <div className="mx-auto max-w-[980px]">
          <Link
            href={EBBC2026.routes.home}
            className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Elevate
          </Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#CC8591]">
            Elevate Beauty Business Convention 2026
          </p>
          <h1 className="mt-3 [font-family:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Your seat at Elevate.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/75">
            17–18 November · CITAM Valley Road, Nairobi
          </p>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Choose one day or both days. Enter each attendee’s details just
            once.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-[980px] px-5 pt-7">
        <nav aria-label="Registration progress">
          <ol className="grid grid-cols-3 gap-2 sm:gap-4">
            {stepLabels.map((label, index) => (
              <li
                key={label}
                aria-current={step === index + 1 ? "step" : undefined}
                className={`border-t-2 py-3 ${step >= index + 1 ? "border-[#CC8591] text-[#0D1D34]" : "border-[#0D1D34]/15 text-[#0D1D34]/55"}`}
              >
                <span className="text-xs">Step {index + 1}</span>
                <p className="mt-1 text-sm font-bold">{label}</p>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
          <form
            id={FORM_ID}
            onSubmit={continueRegistration}
            noValidate
            className="scroll-mt-24 rounded-3xl border border-[#0D1D34]/10 bg-white p-5 shadow-sm sm:p-8"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest text-[#0D1D34]/60"
              aria-live="polite"
            >
              Step {step} of 3
            </p>
            <h2
              ref={stepHeading}
              tabIndex={-1}
              className="mt-2 text-2xl font-bold tracking-tight outline-none"
            >
              {stepLabels[step - 1]}
            </h2>
            {formError ? (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {formError}
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <p className="mt-3 text-sm leading-6 text-[#0D1D34]/70">
                  Choose dates and a category for each attendee. Prices update
                  automatically.
                </p>
                <div className="mt-6 flex items-center justify-between border-y border-[#0D1D34]/10 py-4">
                  <span className="text-sm font-semibold">
                    Number of attendees
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label="Decrease attendee quantity"
                      disabled={quantity === 1}
                      onClick={decreaseQuantity}
                      className="grid h-11 w-11 place-items-center rounded-full border disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span aria-live="polite" className="text-lg font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase attendee quantity"
                      disabled={dayTicketCount >= 10}
                      onClick={increaseQuantity}
                      className="grid h-11 w-11 place-items-center rounded-full border disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {attendees.map((attendee, index) => (
                  <fieldset
                    key={index}
                    className="mt-6 rounded-2xl border border-[#0D1D34]/10 p-4 sm:p-5"
                  >
                    <legend className="px-2 text-sm font-bold">
                      Attendee {index + 1}
                    </legend>
                    <p
                      id={`day-label-${index}`}
                      className="text-sm font-semibold"
                    >
                      Choose attendance dates *
                    </p>
                    <div
                      role="group"
                      aria-labelledby={`day-label-${index}`}
                      className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3"
                    >
                      {EVENT_DAYS.map((day) => (
                        <button
                          type="button"
                          key={day.value}
                          aria-pressed={attendee.eventDate === day.value}
                          onClick={() =>
                            updateAttendee(index, "eventDate", day.value)
                          }
                          className={`min-h-20 rounded-xl border-2 px-3 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC8591] ${attendee.eventDate === day.value ? "border-[#CC8591] bg-[#CC8591]/10" : "border-[#0D1D34]/10 hover:border-[#CC8591]/60"}`}
                        >
                          <span className="block text-sm font-bold">
                            {day.shortLabel}
                          </span>
                          <span className="mt-1 block text-xs">
                            {day.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    <label className="mt-5 block" htmlFor={`category-${index}`}>
                      <span className="text-sm font-semibold">
                        Participant category *
                      </span>
                      <select
                        id={`category-${index}`}
                        value={attendee.category}
                        onChange={(event) =>
                          updateAttendee(index, "category", event.target.value)
                        }
                        required
                        className={FIELD_CLASS}
                      >
                        <option value="">Select category</option>
                        {participantCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="mt-3 text-sm font-bold" aria-live="polite">
                      {attendee.eventDate && attendee.category
                        ? `Attendance price: KES ${formatMoney(getAttendeePriceKes(attendee))}`
                        : "Choose dates and a category to see your price."}
                    </p>
                  </fieldset>
                ))}
                <p className="mt-5 text-xs leading-6 text-[#0D1D34]/70">
                  {EBBC2026.ticket.pricingSummary}
                </p>
                {dayTicketCount < 10 ? (
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="mt-4 min-h-11 text-sm font-bold underline underline-offset-4"
                  >
                    Add another attendee
                  </button>
                ) : (
                  <p className="mt-4 text-sm">
                    Maximum 10 day tickets per booking.
                  </p>
                )}
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <p className="mt-3 text-sm leading-6 text-[#0D1D34]/70">
                  {quantity === 1
                    ? "Enter your details once. Your email will receive the ticket and payment updates."
                    : "The first attendee is the booking contact unless someone else is paying."}
                </p>
                {attendees.map((attendee, index) => (
                  <fieldset
                    key={index}
                    className="mt-6 border-t border-[#0D1D34]/10 pt-5"
                  >
                    <legend className="pr-3 text-base font-bold">
                      {quantity === 1
                        ? "Your details"
                        : `Attendee ${index + 1}`}
                    </legend>
                    <p className="mt-2 text-xs text-[#0D1D34]/70">
                      {formatTicketDate(attendee.eventDate)} ·{" "}
                      {attendee.category}
                    </p>
                    {index > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAttendees((current) =>
                            current.map((item, i) =>
                              i === index
                                ? {
                                    ...current[0],
                                    eventDate: item.eventDate,
                                    category: item.category,
                                  }
                                : item,
                            ),
                          )
                        }
                        className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4"
                      >
                        Use first attendee’s details
                      </button>
                    ) : null}
                    {contactFields(
                      attendee,
                      (field, value) => updateAttendee(index, field, value),
                      `attendee${index}`,
                    )}
                  </fieldset>
                ))}
                <label className="mt-7 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-[#F6F3F2] p-4 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={differentBuyer}
                    onChange={(event) =>
                      setDifferentBuyer(event.target.checked)
                    }
                    className="h-5 w-5 accent-[#0D1D34]"
                  />{" "}
                  Someone else is paying
                </label>
                {differentBuyer ? (
                  <fieldset className="mt-6">
                    <legend className="font-bold">Booking contact</legend>
                    <p className="mt-2 text-sm text-[#0D1D34]/70">
                      This person will receive payment updates and manage the
                      booking.
                    </p>
                    {contactFields(otherBuyer, updateBuyer, "contact")}
                  </fieldset>
                ) : null}
                <label htmlFor="referral-code" className="mt-6 block">
                  <span className="text-sm font-semibold">
                    Referral code (optional)
                  </span>
                  <input
                    id="referral-code"
                    value={otherBuyer.referralCode}
                    onChange={(event) =>
                      updateBuyer("referralCode", event.target.value)
                    }
                    className={FIELD_CLASS}
                    placeholder="Enter code"
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <p className="mt-3 text-sm leading-6 text-[#0D1D34]/70">
                  Check your details before continuing to payment.
                </p>
                <ul className="mt-6 divide-y divide-[#0D1D34]/10">
                  {attendees.map((attendee, index) => (
                    <li key={index} className="py-5 first:pt-0">
                      <div className="flex justify-between gap-3">
                        <p className="font-bold">{attendee.fullName}</p>
                        <p className="shrink-0 text-sm font-bold">
                          KES {formatMoney(getAttendeePriceKes(attendee))}
                        </p>
                      </div>
                      <p className="mt-2 text-sm">
                        {formatTicketDate(attendee.eventDate)} ·{" "}
                        {attendee.category}
                      </p>
                      <p className="mt-1 break-all text-sm text-[#0D1D34]/70">
                        {attendee.email}
                      </p>
                      <p className="mt-1 text-sm text-[#0D1D34]/70">
                        {attendee.phone} · {attendee.country}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 rounded-xl bg-[#F6F3F2] p-4 text-sm">
                  <p className="font-bold">Booking contact</p>
                  <p className="mt-2">{buyer.fullName}</p>
                  <p className="mt-1 break-all">{buyer.email}</p>
                  <p className="mt-1">{buyer.phone}</p>
                  {buyer.referralCode ? (
                    <p className="mt-2">Referral code: {buyer.referralCode}</p>
                  ) : null}
                </div>
                <p className="mt-5 text-sm leading-6 text-[#0D1D34]/70">
                  Continue to create your booking, then choose Paystack for full
                  payment or Equity Paybill for installments. Your QR ticket
                  activates after full payment.
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex items-center gap-3 border-t border-[#0D1D34]/10 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => moveToStep(step - 1)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0D1D34]/20 px-5 text-sm font-bold disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0D1D34] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#9C5362] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC8591] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving
                    registration
                  </>
                ) : (
                  <>
                    {buttonLabel}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
          <aside
            className="hidden rounded-3xl bg-[#0D1D34] p-6 text-white lg:sticky lg:top-28 lg:block"
            aria-label="Booking summary"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              Your booking
            </p>
            <p className="mt-3 text-xl font-semibold">
              {quantity} attendee{quantity > 1 ? "s" : ""}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Choose one day or both days for each attendee. Both-day bookings
              include a ticket for each date.
            </p>
            <div
              className="mt-6 border-t border-white/20 pt-5"
              aria-live="polite"
            >
              <p className="text-sm">
                {allTicketsChosen
                  ? "Order total"
                  : "Choose dates and categories for your total"}
              </p>
              <p className="mt-2 text-3xl font-bold">
                {allTicketsChosen ? `KES ${formatMoney(totalAmount)}` : "—"}
              </p>
            </div>
            <p className="mt-5 text-xs leading-6 text-white/75">
              Full payment or installments. QR tickets activate after full
              payment.
            </p>
          </aside>
        </div>
      </div>
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0D1D34]/10 bg-white px-5 py-4 lg:hidden"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-[980px] items-center justify-between gap-3">
          <span className="text-sm">
            {quantity} attendee{quantity > 1 ? "s" : ""}
          </span>
          <strong>
            {allTicketsChosen
              ? `KES ${formatMoney(totalAmount)}`
              : "Select dates and categories"}
          </strong>
        </div>
      </div>
    </main>
  );
}
