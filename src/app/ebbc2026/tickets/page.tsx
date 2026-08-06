"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Ticket,
  UserRound,
  Users,
} from "lucide-react";
import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { EBBC2026 } from "@/lib/ebbc2026/config";

const participantCategories =
  EBBC2026.participantCategories;

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
};

type CreatedTicket = {
  ticketNumber: string;
  attendeeName: string;
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
  reference?: string;
  orderNumber?: string;
  amountKes?: number;
  currency?: string;
};

const createBlankAttendee =
  (): AttendeeDetails => ({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    organisation: "",
    country: "Kenya",
  });

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-KE").format(
    amount,
  );
}

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normaliseCreatedOrder(
  response: CreateOrderResponse,
  fallbackQuantity: number,
  fallbackTotal: number,
): CreatedOrder | null {
  const order = response.order;

  const orderNumber = cleanText(
    order?.orderNumber ||
      order?.order_number ||
      response.orderNumber,
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
      EBBC2026.ticket.priceKes,
  );

  const totalAmountKes = Number(
    order?.totalAmountKes ??
      order?.total_amount_kes ??
      response.totalAmountKes ??
      fallbackTotal,
  );

  const tickets: CreatedTicket[] = (
    response.tickets || []
  ).map((ticket) => ({
    ticketNumber: cleanText(
      ticket.ticketNumber ||
        ticket.ticket_number,
    ),

    attendeeName: cleanText(
      ticket.attendeeName ||
        ticket.attendee_name,
    ),

    status: cleanText(
      ticket.status ||
        ticket.ticketStatus ||
        ticket.ticket_status ||
        "pending",
    ),
  }));

  return {
    orderNumber,
    quantity:
      Number.isFinite(quantity) && quantity > 0
        ? quantity
        : fallbackQuantity,

    unitPriceKes:
      Number.isFinite(unitPriceKes) &&
      unitPriceKes > 0
        ? unitPriceKes
        : EBBC2026.ticket.priceKes,

    totalAmountKes:
      Number.isFinite(totalAmountKes) &&
      totalAmountKes > 0
        ? totalAmountKes
        : fallbackTotal,

    currency:
      cleanText(
        order?.currency ||
          response.currency ||
          "KES",
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

export default function EBBC2026TicketsPage() {
  const [buyer, setBuyer] =
    useState<BuyerDetails>({
      fullName: "",
      email: "",
      phone: "",
      country: "Kenya",
      organisation: "",
      referralCode: "",
    });

  const [attendees, setAttendees] = useState<
    AttendeeDetails[]
  >([createBlankAttendee()]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isStartingPayment, setIsStartingPayment] =
    useState(false);

  const [formError, setFormError] = useState("");
  const [paymentError, setPaymentError] =
    useState("");

  const [createdOrder, setCreatedOrder] =
    useState<CreatedOrder | null>(null);

  const quantity = attendees.length;

  const totalAmount = useMemo(
    () =>
      quantity *
      EBBC2026.ticket.priceKes,
    [quantity],
  );

  const formattedTotal =
    formatMoney(totalAmount);

  const updateBuyer = (
    field: keyof BuyerDetails,
    value: string,
  ) => {
    setBuyer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateAttendee = (
    index: number,
    field: keyof AttendeeDetails,
    value: string,
  ) => {
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
  };

  const increaseQuantity = () => {
    if (attendees.length >= 10) {
      return;
    }

    setAttendees((current) => [
      ...current,
      createBlankAttendee(),
    ]);
  };

  const decreaseQuantity = () => {
    if (attendees.length <= 1) {
      return;
    }

    setAttendees((current) =>
      current.slice(0, -1),
    );
  };

  const copyBuyerToAttendee = (
    index: number,
  ) => {
    setAttendees((current) =>
      current.map((attendee, attendeeIndex) =>
        attendeeIndex === index
          ? {
              ...attendee,
              fullName: buyer.fullName,
              email: buyer.email,
              phone: buyer.phone,
              country:
                buyer.country || "Kenya",
              organisation:
                buyer.organisation,
            }
          : attendee,
      ),
    );
  };

  const validateForm = () => {
    if (
      !buyer.fullName.trim() ||
      !buyer.email.trim() ||
      !buyer.phone.trim() ||
      !buyer.country.trim()
    ) {
      return "Complete all required buyer details.";
    }

    const incompleteAttendee =
      attendees.find(
        (attendee) =>
          !attendee.fullName.trim() ||
          !attendee.email.trim() ||
          !attendee.phone.trim() ||
          !attendee.category.trim() ||
          !attendee.country.trim(),
      );

    if (incompleteAttendee) {
      return "Complete all required attendee details.";
    }

    return "";
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setFormError("");
    setPaymentError("");

    const validationMessage =
      validateForm();

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
      const response = await fetch(
        "/api/ebbc2026/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            buyerFullName:
              buyer.fullName.trim(),

            buyerEmail:
              buyer.email
                .trim()
                .toLowerCase(),

            buyerPhone:
              buyer.phone.trim(),

            country:
              buyer.country.trim(),

            organisation:
              buyer.organisation.trim(),

            referralCode:
              buyer.referralCode
                .trim()
                .toUpperCase(),

            attendees: attendees.map(
              (attendee) => ({
                fullName:
                  attendee.fullName.trim(),

                email:
                  attendee.email
                    .trim()
                    .toLowerCase(),

                phone:
                  attendee.phone.trim(),

                category:
                  attendee.category.trim(),

                organisation:
                  attendee.organisation.trim(),

                country:
                  attendee.country.trim(),
              }),
            ),
          }),
        },
      );

      const responseData =
        (await response.json()) as CreateOrderResponse;

      if (
        !response.ok ||
        responseData.ok === false
      ) {
        throw new Error(
          responseData.message ||
            "The registration order could not be created.",
        );
      }

      const order =
        normaliseCreatedOrder(
          responseData,
          quantity,
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
      setIsSubmitting(false);
    }
  };

  const startPaystackPayment = async () => {
    if (!createdOrder) {
      return;
    }

    setPaymentError("");
    setIsStartingPayment(true);

    try {
      const response = await fetch(
        "/api/ebbc2026/paystack/initialize",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            orderNumber:
              createdOrder.orderNumber,
          }),
        },
      );

      const responseData =
        (await response.json()) as InitializePaymentResponse;

      if (
        !response.ok ||
        responseData.ok === false
      ) {
        throw new Error(
          responseData.message ||
            "Paystack checkout could not be started.",
        );
      }

      const authorizationUrl =
        responseData.authorizationUrl ||
        responseData.authorization_url;

      if (!authorizationUrl) {
        throw new Error(
          "Paystack did not return a checkout link.",
        );
      }

      window.location.href =
        authorizationUrl;
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "An unexpected payment error occurred.",
      );

      setIsStartingPayment(false);
    }
  };

  const resetRegistration = () => {
    setBuyer({
      fullName: "",
      email: "",
      phone: "",
      country: "Kenya",
      organisation: "",
      referralCode: "",
    });

    setAttendees([
      createBlankAttendee(),
    ]);

    setCreatedOrder(null);
    setFormError("");
    setPaymentError("");
    setIsSubmitting(false);
    setIsStartingPayment(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (createdOrder) {
    return (
      <main className="min-h-screen bg-[#F7F5F5] px-5 pb-24 pt-36 text-[#0D1D34] sm:px-8">
        <section className="mx-auto max-w-[900px]">
          <Link
            href={EBBC2026.routes.home}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to EBBC2026
          </Link>

          <div className="mt-9 overflow-hidden rounded-[32px] border border-[#0D1D34]/8 bg-white shadow-[0_30px_90px_rgba(13,29,52,0.1)]">
            <div className="bg-[#0D1D34] px-6 py-12 text-center text-white sm:px-12">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#CC8591] shadow-xl">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/60">
                Registration Saved
              </p>

              <h1 className="mx-auto mt-4 max-w-2xl [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
                Complete Your Payment
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-[13px] leading-7 text-white/65">
                Your registration details have been
                securely recorded. Complete the
                Paystack payment to activate your
                EBBC2026 ticket.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Order Number
                  </p>

                  <p className="mt-3 break-all text-sm font-black">
                    {createdOrder.orderNumber}
                  </p>
                </div>

                <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Number of Tickets
                  </p>

                  <p className="mt-3 text-2xl font-black">
                    {createdOrder.quantity}
                  </p>
                </div>

                <div className="rounded-[19px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    Amount Due
                  </p>

                  <p className="mt-3 text-xl font-black text-[#CC8591]">
                    {createdOrder.currency}{" "}
                    {formatMoney(
                      createdOrder.totalAmountKes,
                    )}
                  </p>
                </div>
              </div>

              {createdOrder.tickets.length >
                0 && (
                <div className="mt-6 rounded-[22px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-6">
                  <h2 className="flex items-center gap-3 text-sm font-extrabold">
                    <Ticket className="h-5 w-5 text-[#CC8591]" />

                    Tickets Prepared
                  </h2>

                  <div className="mt-5 space-y-3">
                    {createdOrder.tickets.map(
                      (ticket, index) => (
                        <div
                          key={
                            ticket.ticketNumber ||
                            `${ticket.attendeeName}-${index}`
                          }
                          className="flex flex-col justify-between gap-2 rounded-[15px] border border-[#0D1D34]/8 bg-white p-4 sm:flex-row sm:items-center"
                        >
                          <div>
                            <p className="text-sm font-extrabold">
                              {ticket.attendeeName ||
                                `Attendee ${index + 1}`}
                            </p>

                            {ticket.ticketNumber && (
                              <p className="mt-1 text-[10px] text-[#0D1D34]/45">
                                {
                                  ticket.ticketNumber
                                }
                              </p>
                            )}
                          </div>

                          <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-800">
                            Awaiting Payment
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {paymentError && (
                <div className="mt-6 flex items-start gap-3 rounded-[18px] border border-red-200 bg-red-50 p-5 text-red-900">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                  <p className="text-xs leading-6">
                    {paymentError}
                  </p>
                </div>
              )}

              <div className="mt-7 rounded-[22px] border border-[#CC8591]/25 bg-[#CC8591]/8 p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] bg-[#CC8591] text-white">
                    <CreditCard className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold">
                      Secure Paystack Checkout
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-[#0D1D34]/60">
                      Continue to the secure payment
                      page and complete the test
                      transaction using M-Pesa or a
                      supported card.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={startPaystackPayment}
                disabled={isStartingPayment}
                className="group mt-7 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isStartingPayment ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />

                    Opening Secure Checkout
                  </>
                ) : (
                  <>
                    Pay{" "}
                    {createdOrder.currency}{" "}
                    {formatMoney(
                      createdOrder.totalAmountKes,
                    )}

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-5 text-[10px] font-bold text-[#0D1D34]/45">
                <span className="inline-flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#CC8591]" />

                  M-Pesa
                </span>

                <span className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#CC8591]" />

                  Card
                </span>

                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#CC8591]" />

                  Verified
                </span>
              </div>

              <button
                type="button"
                onClick={resetRegistration}
                disabled={isStartingPayment}
                className="mt-7 inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#0D1D34]/15 bg-white px-7 text-sm font-extrabold transition hover:bg-[#0D1D34] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start Another Registration
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

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

          {formError && (
            <div className="mt-7 flex items-start gap-3 rounded-[18px] border border-red-200 bg-red-50 p-5 text-red-900">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <p className="text-xs leading-6">
                {formError}
              </p>
            </div>
          )}

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
                  Complete the buyer and attendee
                  details below, then continue to the
                  secure Paystack checkout.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-7"
              >
                <div className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_25px_70px_rgba(13,29,52,0.08)] sm:p-9">
                  <div className="flex items-center gap-3 border-b border-[#0D1D34]/8 pb-6">
                    <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-extrabold">
                        Buyer Details
                      </h2>

                      <p className="mt-1 text-xs text-[#0D1D34]/45">
                        The person responsible for
                        this registration.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label>
                      <span className="text-[11px] font-extrabold">
                        Full Name *
                      </span>

                      <input
                        required
                        type="text"
                        value={buyer.fullName}
                        onChange={(event) =>
                          updateBuyer(
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
                        value={buyer.phone}
                        onChange={(event) =>
                          updateBuyer(
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
                        value={buyer.email}
                        onChange={(event) =>
                          updateBuyer(
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
                        value={buyer.country}
                        onChange={(event) =>
                          updateBuyer(
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
                        value={
                          buyer.organisation
                        }
                        onChange={(event) =>
                          updateBuyer(
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
                        value={
                          buyer.referralCode
                        }
                        onChange={(event) =>
                          updateBuyer(
                            "referralCode",
                            event.target.value.toUpperCase(),
                          )
                        }
                        placeholder="Optional"
                        className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm uppercase outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_25px_70px_rgba(13,29,52,0.08)] sm:p-9">
                  <div className="flex flex-col gap-5 border-b border-[#0D1D34]/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
                        <Users className="h-5 w-5" />
                      </div>

                      <div>
                        <h2 className="text-lg font-extrabold">
                          Attendee Details
                        </h2>

                        <p className="mt-1 text-xs text-[#0D1D34]/45">
                          Complete one form for every
                          ticket.
                        </p>
                      </div>
                    </div>

                    <div className="flex w-fit items-center gap-4 rounded-full border border-[#0D1D34]/10 bg-[#FAFAFA] p-1.5">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={
                          quantity === 1
                        }
                        aria-label="Decrease ticket quantity"
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#CC8591] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0D1D34]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-8 text-center text-lg font-black">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={
                          quantity === 10
                        }
                        aria-label="Increase ticket quantity"
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#CC8591] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0D1D34]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-7 space-y-6">
                    {attendees.map(
                      (attendee, index) => (
                        <div
                          key={index}
                          className="rounded-[22px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-5 sm:p-6"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#CC8591]">
                                Ticket {index + 1}
                              </p>

                              <h3 className="mt-1 text-base font-extrabold">
                                Attendee{" "}
                                {index + 1}
                              </h3>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                copyBuyerToAttendee(
                                  index,
                                )
                              }
                              className="inline-flex h-9 w-fit items-center justify-center rounded-full border border-[#0D1D34]/12 bg-white px-4 text-[10px] font-extrabold transition hover:border-[#CC8591] hover:text-[#CC8591]"
                            >
                              Copy Buyer Details
                            </button>
                          </div>

                          <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <label>
                              <span className="text-[11px] font-extrabold">
                                Full Name *
                              </span>

                              <input
                                required
                                type="text"
                                value={
                                  attendee.fullName
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "fullName",
                                    event.target.value,
                                  )
                                }
                                placeholder="Attendee full name"
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              />
                            </label>

                            <label>
                              <span className="text-[11px] font-extrabold">
                                Participant Category *
                              </span>

                              <select
                                required
                                value={
                                  attendee.category
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "category",
                                    event.target.value,
                                  )
                                }
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              >
                                <option value="">
                                  Select category
                                </option>

                                {participantCategories.map(
                                  (category) => (
                                    <option
                                      key={
                                        category
                                      }
                                      value={
                                        category
                                      }
                                    >
                                      {category}
                                    </option>
                                  ),
                                )}
                              </select>
                            </label>

                            <label>
                              <span className="text-[11px] font-extrabold">
                                Email Address *
                              </span>

                              <input
                                required
                                type="email"
                                value={
                                  attendee.email
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "email",
                                    event.target.value,
                                  )
                                }
                                placeholder="name@example.com"
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              />
                            </label>

                            <label>
                              <span className="text-[11px] font-extrabold">
                                Phone Number *
                              </span>

                              <input
                                required
                                type="tel"
                                value={
                                  attendee.phone
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "phone",
                                    event.target.value,
                                  )
                                }
                                placeholder="e.g. 0712 345 678"
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              />
                            </label>

                            <label>
                              <span className="text-[11px] font-extrabold">
                                Country *
                              </span>

                              <input
                                required
                                type="text"
                                value={
                                  attendee.country
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "country",
                                    event.target.value,
                                  )
                                }
                                placeholder="Country"
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              />
                            </label>

                            <label>
                              <span className="text-[11px] font-extrabold">
                                Company, Salon or Organisation
                              </span>

                              <input
                                type="text"
                                value={
                                  attendee.organisation
                                }
                                onChange={(event) =>
                                  updateAttendee(
                                    index,
                                    "organisation",
                                    event.target.value,
                                  )
                                }
                                placeholder="Optional"
                                className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
                              />
                            </label>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-7 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />

                        Saving Registration
                      </>
                    ) : (
                      <>
                        Continue to Payment

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
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
                        KES{" "}
                        {formatMoney(
                          EBBC2026.ticket
                            .priceKes,
                        )}{" "}
                        × {quantity}
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

              <div className="mt-5 rounded-[22px] border border-[#0D1D34]/8 bg-white p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                  <div>
                    <p className="text-xs font-extrabold">
                      Secure Registration
                    </p>

                    <p className="mt-2 text-[11px] leading-5 text-[#0D1D34]/50">
                      Registration details are stored
                      securely. Tickets only become
                      active after Paystack confirms
                      the payment.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-5 border-t border-[#0D1D34]/8 pt-5 text-[10px] font-bold text-[#0D1D34]/45">
                  <span className="inline-flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-[#CC8591]" />

                    M-Pesa
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[#CC8591]" />

                    Card
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}