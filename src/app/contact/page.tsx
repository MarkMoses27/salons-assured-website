import type { Metadata } from "next";

import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title:
    "Contact Salons Assured Kenya | Beauty Business Support",

  description:
    "Contact Salons Assured Kenya for recruitment, training, salon business systems, beauty business setup, management consulting and growth support.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title:
      "Contact Salons Assured Kenya",

    description:
      "Talk to Salons Assured about recruitment, training, systems, setup, operations and beauty-business growth.",

    url:
      "https://www.salonsassured.com/contact",

    siteName:
      "Salons Assured Kenya Limited",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "Contact Salons Assured Kenya Limited",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Contact Salons Assured Kenya",

    description:
      "Speak with our team about your beauty business, staffing, training, systems or growth challenge.",

    images: [
      "/twitter-image.png",
    ],
  },
};

const contactPageJsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "ContactPage",

  name:
    "Contact Salons Assured Kenya Limited",

  url:
    "https://www.salonsassured.com/contact",

  description:
    "Contact Salons Assured Kenya for beauty-business consulting, recruitment, training, systems, setup and growth support.",

  mainEntity: {
    "@type":
      "ProfessionalService",

    name:
      "Salons Assured Kenya Limited",

    url:
      "https://www.salonsassured.com",

    telephone: [
      "+254715500268",
      "+254706551028",
    ],

    email:
      "info@salonsassured.com",

    address: {
      "@type":
        "PostalAddress",

      streetAddress:
        "Kwaheri Road",

      addressLocality:
        "Runda",

      addressRegion:
        "Nairobi",

      addressCountry:
        "KE",
    },

    sameAs: [
      "https://www.facebook.com/salonsassuredkenya/",
      "https://www.instagram.com/salonsassured/",
      "https://www.tiktok.com/@salonsassuredkenya",
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              contactPageJsonLd,
            ),
        }}
      />

      <ContactClient />
    </>
  );
}