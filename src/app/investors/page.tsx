import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
  title:
    "Beauty Business Investment Support | Salons Assured Kenya Ltd",

  description:
    "Salons Assured supports local, diaspora and international investors planning salons, spas, barbershops, nail studios and beauty brands through feasibility, setup, recruitment, systems, launch and growth support.",

  keywords: [
    "beauty business investment Kenya",
    "salon investment Kenya",
    "spa business setup",
    "barbershop investment",
    "salon business consultancy",
    "beauty business feasibility study",
    "salon setup Kenya",
    "diaspora investment Kenya",
    "beauty industry investors",
    "Salons Assured Kenya",
  ],

  alternates: {
    canonical: "/investors",
  },

  openGraph: {
    title:
      "Beauty Business Investment Support | Salons Assured Kenya",

    description:
      "Professional beauty business investment support covering feasibility, planning, location, setup, recruitment, systems, launch and operational growth.",

    url: "https://www.salonsassured.com/investors",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Salons Assured Kenya beauty business investment support",
      },
    ],
  },
};

export default function InvestorsPage() {
  return <InvestorsClient />;
}