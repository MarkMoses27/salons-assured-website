import type { Metadata } from "next";

import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title:
    "About Salons Assured Kenya | Beauty Business Growth Partner",

  description:
    "Learn about Salons Assured Kenya Limited, a specialist beauty-business growth partner supporting salons, spas, barbershops, investors and professionals through recruitment, training, systems, setup and management consulting.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title:
      "About Salons Assured Kenya | Building the Business Behind Beauty",

    description:
      "We strengthen the people, systems, service standards and strategy behind successful beauty businesses.",

    url:
      "https://www.salonsassured.com/about",

    siteName:
      "Salons Assured Kenya Limited",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt:
          "Salons Assured Kenya beauty business consulting",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Salons Assured Kenya",

    description:
      "Building stronger beauty businesses through people, systems, service and strategy.",

    images: [
      "/twitter-image.png",
    ],
  },
};

const organisationJsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "ProfessionalService",

  name:
    "Salons Assured Kenya Limited",

  alternateName:
    "Salons Assured Kenya",

  url:
    "https://www.salonsassured.com",

  logo:
    "https://www.salonsassured.com/salons-assured.png",

  image:
    "https://www.salonsassured.com/opengraph-image.png",

  description:
    "Specialist beauty-business consulting, recruitment, training, systems, business setup and growth support for salons, spas, barbershops, investors and beauty professionals.",

  telephone: [
    "+254715500268",
    "+254706551028",
  ],

  email:
    "salonsassuredkenya@gmail.com",

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

  areaServed: [
    {
      "@type":
        "Country",

      name:
        "Kenya",
    },
    {
      "@type":
        "Place",

      name:
        "Africa",
    },
  ],

  sameAs: [
    "https://www.facebook.com/salonsassuredkenya/",
    "https://www.instagram.com/salonsassured/",
    "https://www.tiktok.com/@salonsassuredkenya",
  ],

  knowsAbout: [
    "Beauty business consulting",
    "Salon recruitment",
    "Spa staffing",
    "Barbershop recruitment",
    "Beauty business systems",
    "Salon staff training",
    "Beauty business setup",
    "Management consulting",
    "Customer experience",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              organisationJsonLd,
            ),
        }}
      />

      <AboutClient />
    </>
  );
}