import type { Metadata } from "next";

import BusinessOwnersClient from "./BusinessOwnersClient";

export const metadata: Metadata = {
  title:
    "Beauty Business Owner Support | Salons Assured Kenya",

  description:
    "Professional support for salon, spa, barbershop, nail studio and beauty business owners through recruitment, training, systems, setup, digital growth and management consulting.",

  alternates: {
    canonical: "/business-owners",
  },

  openGraph: {
    title:
      "Run the Business Behind the Beauty | Salons Assured Kenya",

    description:
      "Strengthen the people, systems, service standards and management decisions behind your beauty business.",

    url:
      "https://www.salonsassured.com/business-owners",

    siteName:
      "Salons Assured Kenya Limited",

    type: "website",

    images: [
      {
        url:
          "/who-business-owners.webp",

        alt:
          "Beauty business owners supported by Salons Assured Kenya",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Beauty Business Owner Support | Salons Assured Kenya",

    description:
      "Practical recruitment, systems, training and management support for beauty business owners.",

    images: [
      "/who-business-owners.webp",
    ],
  },
};

const businessOwnerServiceJsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "Service",

  name:
    "Beauty Business Owner Support",

  serviceType:
    "Beauty Business Consulting, Recruitment, Training and Operational Support",

  description:
    "Professional support for salon, spa, barbershop, nail studio and beauty business owners through recruitment, staff development, business systems, setup support, digital growth and management consulting.",

  provider: {
    "@type":
      "ProfessionalService",

    name:
      "Salons Assured Kenya Limited",

    url:
      "https://www.salonsassured.com",

    telephone:
      "+254715500268",

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
  },

  areaServed: {
    "@type":
      "Country",

    name:
      "Kenya",
  },

  audience: {
    "@type":
      "BusinessAudience",

    name:
      "Salon, spa, barbershop, nail studio and beauty business owners",
  },

  url:
    "https://www.salonsassured.com/business-owners",
};

export default function BusinessOwnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              businessOwnerServiceJsonLd,
            ),
        }}
      />

      <BusinessOwnersClient />
    </>
  );
}