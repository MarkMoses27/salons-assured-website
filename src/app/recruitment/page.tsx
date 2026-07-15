import type { Metadata } from "next";

import RecruitmentClient from "./RecruitmentClient";

export const metadata: Metadata = {
  title:
    "Beauty Industry Recruitment & Staffing | Salons Assured Kenya",

  description:
    "Professional recruitment and staffing support for salons, spas, barbershops and beauty businesses. Request qualified staff or apply for beauty industry opportunities through Salons Assured Kenya.",

  alternates: {
    canonical: "/recruitment",
  },

  openGraph: {
    title:
      "Beauty Industry Recruitment & Staffing | Salons Assured Kenya",

    description:
      "Structured sourcing, screening, shortlisting, interview support and placement for beauty businesses and professionals.",

    url:
      "https://www.salonsassured.com/recruitment",

    siteName:
      "Salons Assured Kenya Limited",

    type:
      "website",

    images: [
      {
        url:
          "/sak-recruitment-hero.webp",

        width:
          1500,

        height:
          1000,

        alt:
          "Professional salon team supported through beauty industry recruitment",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Beauty Recruitment and Staffing | Salons Assured Kenya",

    description:
      "Request qualified salon, spa and barbershop staff or apply for beauty industry opportunities.",

    images: [
      "/sak-recruitment-hero.webp",
    ],
  },
};

const recruitmentJsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "Service",

  name:
    "Beauty Industry Recruitment and Staffing",

  description:
    "Recruitment, screening, shortlisting, interview coordination and placement support for salons, spas, barbershops, beauty businesses and beauty professionals.",

  serviceType:
    "Beauty Industry Recruitment and Staffing",

  provider: {
    "@type":
      "ProfessionalService",

    name:
      "Salons Assured Kenya Limited",

    url:
      "https://www.salonsassured.com",

    telephone:
      "+254715500268",

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
  },

  areaServed: {
    "@type":
      "Country",

    name:
      "Kenya",
  },

  audience: [
    {
      "@type":
        "BusinessAudience",

      name:
        "Salon, spa, barbershop and beauty business employers",
    },
    {
      "@type":
        "Audience",

      name:
        "Beauty professionals and job seekers",
    },
  ],

  url:
    "https://www.salonsassured.com/recruitment",
};

export default function RecruitmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              recruitmentJsonLd,
            ),
        }}
      />

      <RecruitmentClient />
    </>
  );
}