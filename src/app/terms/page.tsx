import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Salons Assured Kenya Ltd website, services, recruitment enquiries, training, consulting, business systems and digital growth support.",
};

const termsSections = [
  {
    title: "1. Acceptance of These Terms",
    content: [
      "By accessing or using the Salons Assured Kenya Ltd website, you agree to these Terms of Use. If you do not agree with these terms, please do not use the website.",
      "These Terms apply to website visitors, business owners, investors, job seekers, beauty professionals, clients, and any person who submits an enquiry through our website or communication channels.",
    ],
  },
  {
    title: "2. About Our Services",
    content: [
      "Salons Assured Kenya Ltd provides beauty industry recruitment, salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, documentation, digital visibility, and business growth support.",
      "Information on this website is provided for general business, recruitment, and service guidance. Specific services, pricing, timelines, deliverables, and terms may be agreed separately through written communication, proposal, invoice, contract, or service agreement.",
    ],
  },
  {
    title: "3. Website Use",
    content: [
      "You agree to use this website lawfully, respectfully, and only for legitimate enquiries, information, recruitment, consultation, or service-related purposes.",
      "You must not misuse the website, attempt to gain unauthorised access, interfere with website security, submit false information, copy content unlawfully, or use the website in a way that may damage Salons Assured Kenya Ltd or other users.",
    ],
  },
  {
    title: "4. Recruitment and Job Applications",
    content: [
      "Job seekers may submit information for possible beauty industry opportunities. Submission of information does not guarantee employment, interviews, placement, or selection.",
      "Recruitment outcomes may depend on client requirements, experience, skill level, location, availability, professionalism, references, and other relevant selection factors.",
      "Employers and beauty businesses requesting staff are responsible for making final hiring decisions unless otherwise agreed in writing.",
    ],
  },
  {
    title: "5. Business Enquiries and Consultations",
    content: [
      "Business owners, investors, salons, spas, barbershops, nail studios, and beauty businesses may submit enquiries for recruitment, training, systems, documentation, setup support, digital visibility, or consulting.",
      "Advice, recommendations, documents, training, and support provided by Salons Assured Kenya Ltd are intended to help improve business operations but do not guarantee specific financial results, revenue growth, staff performance, or business outcomes.",
    ],
  },
  {
    title: "6. Accuracy of Information",
    content: [
      "You agree to provide accurate, current, and complete information when submitting forms, enquiries, applications, or business details.",
      "Salons Assured Kenya Ltd may not be responsible for delays, missed opportunities, or incorrect processing caused by inaccurate, incomplete, or outdated information provided by users.",
    ],
  },
  {
    title: "7. Payments and Service Agreements",
    content: [
      "Where a paid service is agreed, payment terms, deliverables, scope of work, timelines, and any applicable conditions will be communicated separately.",
      "Unless otherwise agreed in writing, services may begin after confirmation of scope, payment terms, and required information from the client.",
    ],
  },
  {
    title: "8. Intellectual Property",
    content: [
      "All website content, branding, text, design, layout, graphics, documents, service descriptions, and related materials are owned by or licensed to Salons Assured Kenya Ltd unless otherwise stated.",
      "You may not copy, reproduce, distribute, modify, sell, or use our website content, documents, systems, or branding for commercial purposes without written permission.",
    ],
  },
  {
    title: "9. Third-Party Links and Platforms",
    content: [
      "The website may include links to third-party websites, social media platforms, WhatsApp, forms, payment platforms, or external tools.",
      "Salons Assured Kenya Ltd is not responsible for the content, security, privacy practices, availability, or accuracy of third-party websites or platforms.",
    ],
  },
  {
    title: "10. No Guarantee of Results",
    content: [
      "While we aim to provide professional support, Salons Assured Kenya Ltd does not guarantee specific outcomes such as job placement, employee retention, business growth, increased sales, improved ranking, client acquisition, or operational results.",
      "Results may vary depending on business effort, market conditions, staff behaviour, client implementation, location, pricing, competition, service quality, and other factors beyond our control.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, Salons Assured Kenya Ltd shall not be liable for indirect, incidental, special, or consequential losses arising from website use, service enquiries, recruitment decisions, business decisions, third-party actions, or reliance on general website information.",
      "Nothing in these Terms excludes liability where such exclusion is not permitted by applicable law.",
    ],
  },
  {
    title: "12. Privacy",
    content: [
      "Use of personal information submitted through this website is also governed by our Privacy Policy.",
      "By submitting information through the website or communication channels, you acknowledge that your information may be processed according to the Privacy Policy.",
    ],
  },
  {
    title: "13. Changes to Website and Terms",
    content: [
      "Salons Assured Kenya Ltd may update the website, services, content, links, pricing information, or these Terms of Use from time to time.",
      "The latest version of the Terms will be published on this page. Continued use of the website means you accept the updated Terms.",
    ],
  },
  {
    title: "14. Governing Law",
    content: [
      "These Terms are governed by the laws of Kenya, unless otherwise required by applicable law or agreed in writing.",
      "Any disputes should first be addressed through good-faith communication with Salons Assured Kenya Ltd before escalation through the appropriate legal channels.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#071b33] px-5 py-20 text-white sm:px-6 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(184,117,134,0.28),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(217,163,175,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d9a3af]/30 bg-white/5 px-4 py-2 text-sm font-bold text-[#d9a3af]">
            <FileCheck2 className="h-4 w-4" />
            Website Terms
          </div>

          <h1 className="mt-7 font-serif text-[46px] font-black leading-tight tracking-[-0.045em] sm:text-[64px]">
            Terms of Use
          </h1>

          <p className="mt-5 max-w-3xl text-[16px] leading-8 text-white/75 sm:text-[18px]">
            These terms explain how visitors, clients, business owners, job
            seekers, and beauty professionals may use the Salons Assured Kenya
            Ltd website and related online enquiry channels.
          </p>

          <p className="mt-6 text-sm font-semibold text-[#d9a3af]">
            Last updated: May 2026
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border-l-2 border-[#b87586] pl-6">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                Salons Assured Kenya Ltd
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                For questions about these Terms of Use, contact us using the
                details below.
              </p>

              <div className="mt-6 grid gap-4 text-sm text-slate-700">
                <a
                  href="tel:+254715500268"
                  className="flex gap-3 transition hover:text-[#b87586]"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-[#b87586]" />
                  0715500268 / 0706551028
                </a>

                <a
                  href="mailto:info@salonsassured.co.ke"
                  className="flex gap-3 transition hover:text-[#b87586]"
                >
                  <Mail className="mt-0.5 h-5 w-5 text-[#b87586]" />
                  info@salonsassured.co.ke
                </a>

                <p className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#b87586]" />
                  Kwaheri Road, Runda, Kenya
                </p>
              </div>
            </div>
          </aside>

          <div className="border-y border-[#ead5db]">
            {termsSections.map((section) => (
              <section
                key={section.title}
                className="border-b border-[#ead5db] py-8 last:border-b-0"
              >
                <h2 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33] sm:text-[38px]">
                  {section.title}
                </h2>

                <div className="mt-5 grid gap-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-8 text-slate-700 sm:text-[16px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="py-8">
              <h2 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33] sm:text-[38px]">
                15. Contact Us
              </h2>

              <p className="mt-5 text-[15px] leading-8 text-slate-700 sm:text-[16px]">
                For questions about these Terms, contact Salons Assured Kenya
                Ltd through{" "}
                <a
                  href="mailto:info@salonsassured.co.ke"
                  className="font-bold text-[#b87586]"
                >
                  info@salonsassured.co.ke
                </a>{" "}
                or call/WhatsApp{" "}
                <a href="tel:+254715500268" className="font-bold text-[#b87586]">
                  0715500268
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/privacy-policy"
                  className="inline-flex rounded-md border border-[#d7a0ad] bg-white px-6 py-3 text-sm font-extrabold text-[#071b33] transition hover:bg-[#fbf4f6]"
                >
                  Read Privacy Policy
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex rounded-md bg-[#071b33] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#0d2748]"
                >
                  Contact Salons Assured
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}