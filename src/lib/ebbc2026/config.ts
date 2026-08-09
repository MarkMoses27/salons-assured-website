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
    name: "EBBC2026 Full Convention Pass",
    priceKes: 4500,
    currency: "KES",
    displayPrice: "KES 4,500",

    includes: [
      "Access for both convention days",
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

export type EBBCParticipantCategory =
  (typeof EBBC2026.participantCategories)[number];