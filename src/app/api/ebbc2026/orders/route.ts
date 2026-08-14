import { NextResponse } from "next/server";

import {
  getEBBCTicketPriceKes,
  isEBBCEarlyBirdActive,
} from "@/lib/ebbc2026/config";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maximumTickets = 10;

const EVENT_DATES = [
  "2026-11-17",
  "2026-11-18",
] as const;

type EventDate =
  (typeof EVENT_DATES)[number];

type AttendeeInput = {
  fullName?: string;
  email?: string;
  phone?: string;
  category?: string;
  organisation?: string;
  country?: string;
  eventDate?: string;
};

type CreateOrderBody = {
  buyerFullName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  country?: string;
  organisation?: string;
  referralCode?: string;
  attendees?: AttendeeInput[];
};

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normaliseEmail(value: unknown) {
  return cleanText(value).toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const cleanedPhone = phone.replace(
    /[\s\-()]/g,
    "",
  );

  return /^\+?[0-9]{9,15}$/.test(
    cleanedPhone,
  );
}

function isEventDate(
  value: string,
): value is EventDate {
  return EVENT_DATES.includes(
    value as EventDate,
  );
}

export async function POST(
  request: Request,
) {
  let createdOrderId:
    | string
    | null = null;

  try {
    const body =
      (await request.json()) as
        CreateOrderBody;

    const buyerFullName =
      cleanText(body.buyerFullName);

    const buyerEmail =
      normaliseEmail(body.buyerEmail);

    const buyerPhone =
      cleanText(body.buyerPhone);

    const country =
      cleanText(body.country) ||
      "Kenya";

    const organisation =
      cleanText(body.organisation);

    const referralCode =
      cleanText(
        body.referralCode,
      ).toUpperCase();

    const attendees =
      Array.isArray(
        body.attendees,
      )
        ? body.attendees
        : [];

    if (
      buyerFullName.length < 2
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please enter the buyer's full name.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !isValidEmail(buyerEmail)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !isValidPhone(buyerPhone)
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please enter a valid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      attendees.length < 1 ||
      attendees.length >
        maximumTickets
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Each order must contain between 1 and 10 attendees.",
        },
        {
          status: 400,
        },
      );
    }

    const normalisedAttendees =
      attendees.map(
        (
          attendee,
          index,
        ) => {
          const fullName =
            cleanText(
              attendee.fullName,
            );

          const email =
            normaliseEmail(
              attendee.email,
            ) || buyerEmail;

          const phone =
            cleanText(
              attendee.phone,
            ) || buyerPhone;

          const category =
            cleanText(
              attendee.category,
            );

          const attendeeOrganisation =
            cleanText(
              attendee.organisation,
            ) || organisation;

          const attendeeCountry =
            cleanText(
              attendee.country,
            ) || country;

          const eventDate =
            cleanText(
              attendee.eventDate,
            );

          if (
            fullName.length < 2
          ) {
            throw new Error(
              `Please enter the full name for attendee ${
                index + 1
              }.`,
            );
          }

          if (
            !isValidEmail(email)
          ) {
            throw new Error(
              `Please enter a valid email for attendee ${
                index + 1
              }.`,
            );
          }

          if (
            !isValidPhone(phone)
          ) {
            throw new Error(
              `Please enter a valid phone number for attendee ${
                index + 1
              }.`,
            );
          }

          if (!category) {
            throw new Error(
              `Please select a category for attendee ${
                index + 1
              }.`,
            );
          }

          if (
            !isEventDate(
              eventDate,
            )
          ) {
            throw new Error(
              `Please select either 17 November 2026 or 18 November 2026 for attendee ${
                index + 1
              }.`,
            );
          }

          return {
            fullName,
            email,
            phone,
            category,
            organisation:
              attendeeOrganisation,
            country:
              attendeeCountry,
            eventDate,
          };
        },
      );

    let referralCodeId:
      | string
      | null = null;

    if (referralCode) {
      const {
        data: referral,
        error: referralError,
      } =
        await supabaseAdmin
          .from(
            "ebbc_referral_codes",
          )
          .select(
            "id, is_active, expires_at, usage_limit, usage_count",
          )
          .eq(
            "code",
            referralCode,
          )
          .maybeSingle();

      if (referralError) {
        console.error(
          "Referral-code lookup error:",
          referralError,
        );

        return NextResponse.json(
          {
            ok: false,
            message:
              "The referral code could not be verified.",
          },
          {
            status: 500,
          },
        );
      }

      if (!referral) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The referral code entered is not valid.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        !referral.is_active
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The referral code is no longer active.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        referral.expires_at &&
        new Date(
          referral.expires_at,
        ) < new Date()
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The referral code has expired.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        referral.usage_limit !==
          null &&
        referral.usage_count >=
          referral.usage_limit
      ) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "The referral code has reached its usage limit.",
          },
          {
            status: 400,
          },
        );
      }

      referralCodeId =
        referral.id;
    }

    /*
     * Server-controlled EBBC2026 pricing.
     *
     * Until 31 Aug 2026 11:59:59 PM EAT:
     * KES 4,000 per ticket.
     *
     * From 1 Sep 2026:
     * KES 4,500 per ticket.
     */
    const pricingTime =
      new Date();

    const ticketPriceKes =
      getEBBCTicketPriceKes(
        pricingTime,
      );

    const earlyBirdActive =
      isEBBCEarlyBirdActive(
        pricingTime,
      );

    const ticketQuantity =
      normalisedAttendees.length;

    const {
      data: order,
      error: orderError,
    } =
      await supabaseAdmin
        .from("ebbc_orders")
        .insert({
          buyer_full_name:
            buyerFullName,

          buyer_email:
            buyerEmail,

          buyer_phone:
            buyerPhone,

          country,

          organisation:
            organisation ||
            null,

          ticket_quantity:
            ticketQuantity,

          unit_price_kes:
            ticketPriceKes,

          discount_amount_kes:
            0,

          currency:
            "KES",

          referral_code_id:
            referralCodeId,

          referral_code_entered:
            referralCode ||
            null,

          order_status:
            "payment_pending",

          payment_status:
            "unpaid",
        })
        .select(
          "id, order_number, ticket_quantity, unit_price_kes, subtotal_amount_kes, total_amount_kes, currency, order_status, payment_status",
        )
        .single();

    if (
      orderError ||
      !order
    ) {
      console.error(
        "EBBC2026 order creation error:",
        orderError,
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The registration order could not be created.",
        },
        {
          status: 500,
        },
      );
    }

    createdOrderId =
      order.id;

    const ticketRows =
      normalisedAttendees.map(
        (attendee) => ({
          order_id:
            order.id,

          attendee_full_name:
            attendee.fullName,

          attendee_email:
            attendee.email,

          attendee_phone:
            attendee.phone,

          participant_category:
            attendee.category,

          organisation:
            attendee.organisation ||
            null,

          country:
            attendee.country,

          event_date:
            attendee.eventDate,

          ticket_status:
            "pending",
        }),
      );

    const {
      data: tickets,
      error: ticketError,
    } =
      await supabaseAdmin
        .from(
          "ebbc_tickets",
        )
        .insert(ticketRows)
        .select(
          "id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, event_date, ticket_status",
        );

    if (
      ticketError ||
      !tickets ||
      tickets.length !==
        ticketQuantity
    ) {
      console.error(
        "EBBC2026 ticket creation error:",
        ticketError,
      );

      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .delete()
        .eq(
          "id",
          order.id,
        );

      return NextResponse.json(
        {
          ok: false,
          message:
            "The attendee tickets could not be prepared.",
        },
        {
          status: 500,
        },
      );
    }

    if (referralCodeId) {
      const {
        error:
          referralUpdateError,
      } =
        await supabaseAdmin.rpc(
          "increment_ebbc_referral_usage",
          {
            p_referral_code_id:
              referralCodeId,
          },
        );

      if (
        referralUpdateError
      ) {
        console.warn(
          "Referral usage was not updated:",
          referralUpdateError,
        );
      }
    }

    return NextResponse.json(
      {
        ok: true,

        message:
          "Your EBBC2026 registration order has been created.",

        pricing: {
          earlyBird:
            earlyBirdActive,

          unitPriceKes:
            order.unit_price_kes,
        },

        order: {
          orderNumber:
            order.order_number,

          quantity:
            order.ticket_quantity,

          unitPriceKes:
            order.unit_price_kes,

          totalAmountKes:
            order.total_amount_kes,

          currency:
            order.currency,

          orderStatus:
            order.order_status,

          paymentStatus:
            order.payment_status,
        },

        tickets:
          tickets.map(
            (ticket) => ({
              ticketNumber:
                ticket.ticket_number,

              attendeeName:
                ticket.attendee_full_name,

              eventDate:
                ticket.event_date,

              status:
                ticket.ticket_status,
            }),
          ),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 order error:",
      error,
    );

    if (createdOrderId) {
      await supabaseAdmin
        .from(
          "ebbc_orders",
        )
        .delete()
        .eq(
          "id",
          createdOrderId,
        );
    }

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected registration error occurred.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}