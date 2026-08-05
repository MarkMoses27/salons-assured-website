import type {
  Metadata,
  Viewport,
} from "next";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EBBCFloatingBanner from "../components/EBBCFloatingBanner";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl =
  "https://www.salonsassured.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Salons Assured Kenya Ltd | Beauty Industry Recruitment & Business Support",
    template:
      "%s | Salons Assured Kenya Ltd",
  },

  description:
    "Salons Assured Kenya Ltd provides beauty industry recruitment, salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, and growth support for beauty businesses, investors, and professionals.",

  keywords: [
    "Salons Assured Kenya Ltd",
    "beauty industry recruitment",
    "salon staffing",
    "spa staffing",
    "barbershop recruitment",
    "beauty business consulting",
    "salon training",
    "spa training",
    "barbershop staffing",
    "beauty business systems",
    "salon business support",
    "beauty jobs Kenya",
    "salon jobs Kenya",
    "nail technician jobs",
    "hair stylist jobs",
    "spa therapist jobs",
  ],

  authors: [
    {
      name: "Salons Assured Kenya Ltd",
    },
  ],

  creator: "Salons Assured Kenya Ltd",
  publisher:
    "Salons Assured Kenya Ltd",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName:
      "Salons Assured Kenya Ltd",
    title:
      "Salons Assured Kenya Ltd | Beauty Industry Recruitment & Business Support",
    description:
      "Beauty industry recruitment, salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, and growth support.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Salons Assured Kenya Ltd beauty industry recruitment and business support",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Salons Assured Kenya Ltd | Beauty Industry Recruitment & Business Support",
    description:
      "Beauty industry recruitment, salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, and growth support.",
    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  category:
    "Beauty Business Consulting",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071b33",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body className={manrope.className}>
        <Navbar />

        {children}

        <EBBCFloatingBanner />

        <Footer />
      </body>
    </html>
  );
}