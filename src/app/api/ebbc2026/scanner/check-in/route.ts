import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_DATES = [
  "2026-11-17",
  "2026-11-18",
] as const;

type EventDate =
  (typeof EVENT_DATES)[number];

type ScanResult =
  | "accepted"
  | "rejected"
  | "already_used"
  | "cancelled"
  | "invalid";

type CheckInRequestBody = {
  scannedValue?: string;
  gateName?: string;
  testEventDate?: string;
};

type TicketRecord = {
  id: string;
  order_id: string;
  ticket_number: string;
  attendee_full_name: string;
  attendee_email: string;
  attendee_phone: string | null;
  participant_category: string | null;
  organisation: string | null;
  country: string | null;
  ticket_status: string;
  access_token: string;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
  });
}

function getBearerToken(
  request: Request,
) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const [scheme, token] =
    authorization.split(" ");

  if (
    scheme?.toLowerCase() !== "bearer" ||
    !token?.trim()
  ) {
    return null;
  }

  return token.trim();
}

function isUuid(
  value: string,
) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function extractTicketToken(
  scannedValue: string,
) {
  const cleanValue =
    scannedValue.trim();

  if (isUuid(cleanValue)) {
    return cleanValue;
  }

  try {
    const url =
      new URL(cleanValue);

    const match =
      url.pathname.match(
        /^\/ebbc2026\/ticket\/([0-9a-f-]+)\/?$/i,
      );

    if (
      !match?.[1] ||
      !isUuid(match[1])
    ) {
      return null;
    }

    return match[1];
  } catch {
    return null;
  }
}

function getNairobiDate() {
  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          "Africa/Nairobi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    ).formatToParts(new Date());

  const year =
    parts.find(
      (part) =>
        part.type === "year",
    )?.value;

  const month =
    parts.find(
      (part) =>
        part.type === "month",
    )?.value;

  const day =
    parts.find(
      (part) =>
        part.type === "day",
    )?.value;

  if (
    !year ||
    !month ||
    !day
  ) {
    throw new Error(
      "Could not determine the Nairobi event date.",
    );
  }

  return `${year}-${month}-${day}`;
}

function isEventDate(
  value: string,
): value is EventDate {
  return EVENT_DATES.includes(
    value as EventDate,
  );
}

async function recordCheckIn({
  ticketId,
  attemptedTicketNumber,
  scanResult,
  gateName,
  scannedBy,
  eventDate,
  notes,
}: {
  ticketId: string | null;
  attemptedTicketNumber:
    | string
    | null;
  scanResult: ScanResult;
  gateName: string;
  scannedBy: string;
  eventDate:
    | EventDate
    | null;
  notes?: string | null;
}) {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("ebbc_checkins")
    .insert({
      ticket_id: ticketId,

      attempted_ticket_number:
        attemptedTicketNumber,

      scan_result: scanResult,

      gate_name: gateName,

      scanned_by: scannedBy,

      event_date: eventDate,

      notes:
        notes || null,
    })
    .select(
      "id, scan_result, scanned_at, event_date",
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function getAuthorizedStaff(
  accessToken: string,
) {
  const {
    data: userData,
    error: userError,
  } =
    await supabaseAdmin.auth.getUser(
      accessToken,
    );

  if (
    userError ||
    !userData.user
  ) {
    return {
      ok: false as const,
      status: 401,
      message:
        "The scanner session is invalid or expired.",
    };
  }

  const user =
    userData.user;

  const {
    data: staff,
    error: staffError,
  } = await supabaseAdmin
    .from(
      "ebbc_scanner_staff",
    )
    .select(
      "user_id, display_name, role, is_active",
    )
    .eq(
      "user_id",
      user.id,
    )
    .maybeSingle();

  if (staffError) {
    console.error(
      "EBBC2026 check-in staff lookup error:",
      staffError,
    );

    return {
      ok: false as const,
      status: 500,
      message:
        "Scanner authorization could not be verified.",
    };
  }

  if (
    !staff ||
    staff.is_active !== true ||
    (
      staff.role !== "scanner" &&
      staff.role !== "admin"
    )
  ) {
    return {
      ok: false as const,
      status: 403,
      message:
        "This account is not authorized for EBBC2026 scanning.",
    };
  }

  return {
    ok: true as const,

    user: {
      id: user.id,
      email:
        user.email || null,

      displayName:
        staff.display_name,

      role:
        staff.role,
    },
  };
}

export async function POST(
  request: Request,
) {
  const accessToken =
    getBearerToken(request);

  if (!accessToken) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Scanner authentication is required.",
      },
      401,
    );
  }

  const staff =
    await getAuthorizedStaff(
      accessToken,
    );

  if (!staff.ok) {
    return jsonResponse(
      {
        ok: false,
        message:
          staff.message,
      },
      staff.status,
    );
  }

  let body:
    CheckInRequestBody;

  try {
    body =
      (await request.json()) as
        CheckInRequestBody;
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          "The scanner request is invalid.",
      },
      400,
    );
  }

  const scannedValue =
    String(
      body.scannedValue || "",
    ).trim();

  const gateName =
    String(
      body.gateName ||
        "Main Entrance",
    )
      .trim()
      .slice(0, 100);

  if (!scannedValue) {
    return jsonResponse(
      {
        ok: false,
        message:
          "No QR code was provided.",
      },
      400,
    );
  }

  if (
    scannedValue.length >
    2048
  ) {
    return jsonResponse(
      {
        ok: false,
        message:
          "The scanned QR code is invalid.",
      },
      400,
    );
  }

  let currentEventDate =
    getNairobiDate();

  /*
   * Local development only:
   * allows us to test Day 1 and Day 2
   * before November without weakening
   * production security.
   */
  if (
    process.env.NODE_ENV !==
      "production" &&
    body.testEventDate &&
    isEventDate(
      body.testEventDate,
    )
  ) {
    currentEventDate =
      body.testEventDate;
  }

  if (
    !isEventDate(
      currentEventDate,
    )
  ) {
    return jsonResponse(
      {
        ok: false,
        eventOpen: false,
        message:
          "EBBC2026 ticket check-in is only available on 17 and 18 November 2026.",
      },
      409,
    );
  }

  const ticketToken =
    extractTicketToken(
      scannedValue,
    );

  if (!ticketToken) {
    try {
      await recordCheckIn({
        ticketId: null,

        attemptedTicketNumber:
          null,

        scanResult:
          "invalid",

        gateName,

        scannedBy:
          staff.user.id,

        eventDate:
          currentEventDate,

        notes:
          "Unrecognized QR payload.",
      });
    } catch (error) {
      console.error(
        "Could not record invalid EBBC2026 scan:",
        error,
      );
    }

    return jsonResponse(
      {
        ok: true,
        scanResult:
          "invalid",
        eventDate:
          currentEventDate,
        message:
          "Invalid EBBC2026 ticket.",
      },
      200,
    );
  }

  try {
    const {
      data: ticketRow,
      error:
        ticketLookupError,
    } = await supabaseAdmin
      .from("ebbc_tickets")
      .select(
        "id, order_id, ticket_number, attendee_full_name, attendee_email, attendee_phone, participant_category, organisation, country, ticket_status, access_token",
      )
      .eq(
        "access_token",
        ticketToken,
      )
      .maybeSingle();

    if (ticketLookupError) {
      console.error(
        "EBBC2026 ticket lookup error:",
        ticketLookupError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The ticket could not be verified.",
        },
        500,
      );
    }

    if (!ticketRow) {
      await recordCheckIn({
        ticketId: null,

        attemptedTicketNumber:
          null,

        scanResult:
          "invalid",

        gateName,

        scannedBy:
          staff.user.id,

        eventDate:
          currentEventDate,

        notes:
          "No EBBC2026 ticket matched the QR token.",
      });

      return jsonResponse({
        ok: true,

        scanResult:
          "invalid",

        eventDate:
          currentEventDate,

        message:
          "Invalid EBBC2026 ticket.",
      });
    }

    const ticket =
      ticketRow as TicketRecord;

    const {
      data: order,
      error:
        orderLookupError,
    } = await supabaseAdmin
      .from("ebbc_orders")
      .select(
        "id, order_number, payment_status, order_status",
      )
      .eq(
        "id",
        ticket.order_id,
      )
      .maybeSingle();

    if (
      orderLookupError ||
      !order
    ) {
      console.error(
        "EBBC2026 scanner order lookup error:",
        orderLookupError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "The registration order could not be verified.",
        },
        500,
      );
    }

    const ticketStatus =
      String(
        ticket.ticket_status ||
          "",
      ).toLowerCase();

    if (
      ticketStatus ===
      "cancelled"
    ) {
      const checkIn =
        await recordCheckIn({
          ticketId:
            ticket.id,

          attemptedTicketNumber:
            ticket.ticket_number,

          scanResult:
            "cancelled",

          gateName,

          scannedBy:
            staff.user.id,

          eventDate:
            currentEventDate,

          notes:
            "Ticket status is cancelled.",
        });

      return jsonResponse({
        ok: true,

        scanResult:
          "cancelled",

        eventDate:
          currentEventDate,

        message:
          "This ticket has been cancelled.",

        checkIn,

        ticket: {
          ticketNumber:
            ticket.ticket_number,

          attendeeName:
            ticket.attendee_full_name,

          participantCategory:
            ticket.participant_category,

          organisation:
            ticket.organisation,
        },
      });
    }

    const paymentIsValid =
      order.payment_status ===
        "paid";

    const ticketIsActive =
      ticketStatus ===
        "active";

    if (
      !paymentIsValid ||
      !ticketIsActive
    ) {
      const checkIn =
        await recordCheckIn({
          ticketId:
            ticket.id,

          attemptedTicketNumber:
            ticket.ticket_number,

          scanResult:
            "rejected",

          gateName,

          scannedBy:
            staff.user.id,

          eventDate:
            currentEventDate,

          notes:
            "Ticket is not active or the order is not paid.",
        });

      return jsonResponse({
        ok: true,

        scanResult:
          "rejected",

        eventDate:
          currentEventDate,

        message:
          "Entry rejected. This ticket is not active.",

        checkIn,

        ticket: {
          ticketNumber:
            ticket.ticket_number,

          attendeeName:
            ticket.attendee_full_name,

          participantCategory:
            ticket.participant_category,

          organisation:
            ticket.organisation,
        },
      });
    }

    const {
      data:
        existingAcceptedScan,
      error:
        existingScanError,
    } = await supabaseAdmin
      .from("ebbc_checkins")
      .select(
        "id, scanned_at, gate_name",
      )
      .eq(
        "ticket_id",
        ticket.id,
      )
      .eq(
        "event_date",
        currentEventDate,
      )
      .eq(
        "scan_result",
        "accepted",
      )
      .maybeSingle();

    if (existingScanError) {
      console.error(
        "EBBC2026 previous scan lookup error:",
        existingScanError,
      );

      return jsonResponse(
        {
          ok: false,
          message:
            "Previous ticket usage could not be verified.",
        },
        500,
      );
    }

    if (
      existingAcceptedScan
    ) {
      const checkIn =
        await recordCheckIn({
          ticketId:
            ticket.id,

          attemptedTicketNumber:
            ticket.ticket_number,

          scanResult:
            "already_used",

          gateName,

          scannedBy:
            staff.user.id,

          eventDate:
            currentEventDate,

          notes:
            "Ticket was already accepted on this event day.",
        });

      return jsonResponse({
        ok: true,

        scanResult:
          "already_used",

        eventDate:
          currentEventDate,

        message:
          "This ticket has already been used today.",

        previousEntry: {
          scannedAt:
            existingAcceptedScan.scanned_at,

          gateName:
            existingAcceptedScan.gate_name,
        },

        checkIn,

        ticket: {
          ticketNumber:
            ticket.ticket_number,

          attendeeName:
            ticket.attendee_full_name,

          participantCategory:
            ticket.participant_category,

          organisation:
            ticket.organisation,

          country:
            ticket.country,
        },
      });
    }

    try {
      const checkIn =
        await recordCheckIn({
          ticketId:
            ticket.id,

          attemptedTicketNumber:
            ticket.ticket_number,

          scanResult:
            "accepted",

          gateName,

          scannedBy:
            staff.user.id,

          eventDate:
            currentEventDate,

          notes:
            `Valid EBBC2026 entry for ${currentEventDate}.`,
        });

      return jsonResponse({
        ok: true,

        scanResult:
          "accepted",

        eventDate:
          currentEventDate,

        message:
          "Entry approved.",

        checkIn,

        ticket: {
          ticketNumber:
            ticket.ticket_number,

          attendeeName:
            ticket.attendee_full_name,

          attendeeEmail:
            ticket.attendee_email,

          participantCategory:
            ticket.participant_category,

          organisation:
            ticket.organisation,

          country:
            ticket.country,
        },

        order: {
          orderNumber:
            order.order_number,
        },
      });
    } catch (error) {
      const databaseError =
        error as {
          code?: string;
        };

      /*
       * Protects against two scanners
       * accepting the same ticket at
       * almost exactly the same time.
       */
      if (
        databaseError?.code ===
        "23505"
      ) {
        const checkIn =
          await recordCheckIn({
            ticketId:
              ticket.id,

            attemptedTicketNumber:
              ticket.ticket_number,

            scanResult:
              "already_used",

            gateName,

            scannedBy:
              staff.user.id,

            eventDate:
              currentEventDate,

            notes:
              "Concurrent duplicate entry attempt.",
          });

        return jsonResponse({
          ok: true,

          scanResult:
            "already_used",

          eventDate:
            currentEventDate,

          message:
            "This ticket has already been used today.",

          checkIn,

          ticket: {
            ticketNumber:
              ticket.ticket_number,

            attendeeName:
              ticket.attendee_full_name,

            participantCategory:
              ticket.participant_category,

            organisation:
              ticket.organisation,
          },
        });
      }

      throw error;
    }
  } catch (error) {
    console.error(
      "Unexpected EBBC2026 scanner check-in error:",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "An unexpected ticket verification error occurred.",
      },
      500,
    );
  }
}