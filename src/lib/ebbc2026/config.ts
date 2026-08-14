export const EBBC2026 = {
  name: "Elevate Beauty Business Convention 2026",
  shortName: "EBBC2026",
  organiser: "Salons Assured Kenya Ltd",
  edition: "Second Edition",

  dates: {
    start: "2026-11-17",
    end: "2026-11-18",
    display: "17-18 November 2026",
  },

  venue: {
    name: "CITAM Valley Road",
    city: "Nairobi",
    country: "Kenya",
    display: "CITAM Valley Road, Nairobi",
    googleMapsUrl: "",
  },

  ticket: {
    name: "EBBC2026 Day Ticket",

    /*
     * Normal ticket price.
     * Kept as priceKes for backwards compatibility
     * with any existing EBBC2026 components.
     */
    priceKes: 4500,
    standardPriceKes: 4500,
    currency: "KES",
    displayPrice: "KES 4,500",

    earlyBird: {
      priceKes: 4000,
      displayPrice: "KES 4,000",

      /*
       * 31 August 2026 at 11:59:59 PM
       * East Africa Time (UTC+3).
       */
      endsAt: "2026-08-31T20:59:59.999Z",

      deadlineDisplay: "31 August 2026",
    },

    includes: [
      "Access to one selected convention day",
      "Keynotes and panel discussions",
      "Exhibition and supplier access",
      "Networking sessions",
      "Digital programme",
      "QR-code ticket",
      "Participation certificate",
    ],
  },

  contacts: {
    primaryPhone: "0715500268",
    secondaryPhone: "0706551028",
    whatsappUrl: "https://wa.me/254715500268",
    email: "salonsassuredkenya@gmail.com",
  },

  routes: {
    home: "/ebbc2026",
    tickets: "/ebbc2026/tickets",
    venue: "/ebbc2026/venue",
    contact: "/ebbc2026/contact",
    paymentSuccess: "/ebbc2026/payment-success",
  },

  participantCategories: [
    "Salon or Spa Owner",
    "Stylist",
    "Barber",
    "Braider",
    "Nail Technician",
    "Therapist",
    "Manager",
    "Beauty Student",
    "Supplier or Brand",
    "Investor",
    "Other",
  ],

  status: {
    paymentsEnabled: false,
    professionalEmailActive: false,
    venueMapConfirmed: false,
    referralCommissionConfirmed: false,
  },
} as const;

export function isEBBCEarlyBirdActive(
  now: Date = new Date(),
) {
  const deadline = Date.parse(
    EBBC2026.ticket.earlyBird.endsAt,
  );

  return now.getTime() <= deadline;
}

export function getEBBCTicketPriceKes(
  now: Date = new Date(),
) {
  if (isEBBCEarlyBirdActive(now)) {
    return EBBC2026.ticket.earlyBird.priceKes;
  }

  return EBBC2026.ticket.standardPriceKes;
}

export function getEBBCTicketDisplayPrice(
  now: Date = new Date(),
) {
  if (isEBBCEarlyBirdActive(now)) {
    return EBBC2026.ticket.earlyBird.displayPrice;
  }

  return EBBC2026.ticket.displayPrice;
}

export type EBBCParticipantCategory =
  (typeof EBBC2026.participantCategories)[number];