import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title:
    "Beauty Business Events, Training & Masterclasses | Salons Assured Kenya",

  description:
    "Join Salons Assured Kenya beauty business masterclasses, management conversations, team training, live audits and professional industry events.",

  alternates: {
    canonical: "/events",
  },

  openGraph: {
    title:
      "Beauty Business Events & Training | Salons Assured Kenya",

    description:
      "Practical beauty business experiences for salon owners, managers, teams, professionals and investors.",

    url: "https://www.salonsassured.com/events",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Salons Assured Kenya beauty business events",
      },
    ],
  },
};

export default function EventsPage() {
  return <EventsClient />;
}