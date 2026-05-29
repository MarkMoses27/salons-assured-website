import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Salons Assured Kenya Ltd. Learn how we collect, use, protect and manage personal information submitted through our website, enquiries, recruitment forms and communication channels.",
};

const privacySections = [
  {
    title: "1. Introduction",
    content: [
      "Salons Assured Kenya Ltd respects your privacy and is committed to protecting the personal information shared with us through our website, forms, email, phone, WhatsApp, social media, recruitment enquiries, business consultations, and related communication channels.",
      "This Privacy Policy explains what information we collect, how we use it, how we protect it, and the rights you may have regarding your personal data.",
    ],
  },
  {
    title: "2. Information We May Collect",
    content: [
      "We may collect personal information such as your name, phone number, email address, location, business name, job title, service interest, enquiry details, and communication history.",
      "For recruitment or job-related enquiries, we may collect information about your skills, experience, preferred role, availability, location, and any documents you choose to share, such as a CV or portfolio.",
      "For business owners, investors, salons, spas, barbershops, and beauty businesses, we may collect information about your business needs, staffing requirements, training needs, operational challenges, and service interests.",
    ],
  },
  {
    title: "3. How We Collect Information",
    content: [
      "We collect information when you fill in a website form, contact us by phone, email, WhatsApp, social media, or submit an enquiry for recruitment, training, consulting, business systems, digital visibility, or business support.",
      "We may also collect basic technical information such as browser type, device type, pages visited, and general website usage data where analytics or website performance tools are used.",
    ],
  },
  {
    title: "4. How We Use Your Information",
    content: [
      "We use your information to respond to enquiries, provide recruitment and staffing support, process job applications, support business consultations, deliver training information, prepare proposals, improve our services, and communicate with you about relevant services.",
      "We may also use information to manage records, improve client experience, protect our website, comply with legal obligations, and support internal business operations.",
    ],
  },
  {
    title: "5. Recruitment and Job Application Information",
    content: [
      "If you submit information for job opportunities, we may use your details to assess your suitability, contact you for clarification, match you with relevant opportunities, and share relevant application details with suitable beauty businesses where appropriate.",
      "Submitting your information does not guarantee employment, interview placement, or selection. Recruitment decisions may depend on client requirements, skill level, availability, location, experience, and other relevant factors.",
    ],
  },
  {
    title: "6. Sharing of Information",
    content: [
      "We do not sell personal information.",
      "We may share relevant information with trusted service providers, recruitment clients, salon/spa/barbershop businesses, consultants, technology providers, legal or regulatory authorities, or other parties where necessary to deliver requested services, comply with the law, protect rights, or support legitimate business operations.",
      "Where information is shared for recruitment or business support, we aim to share only what is relevant for the intended purpose.",
    ],
  },
  {
    title: "7. Data Protection and Security",
    content: [
      "We take reasonable administrative, technical, and organisational measures to protect personal information from unauthorised access, misuse, loss, alteration, or disclosure.",
      "However, no website, email, WhatsApp communication, or online transmission method can be guaranteed to be completely secure. Users are encouraged to avoid sending highly sensitive information unless necessary.",
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "We keep personal information only for as long as reasonably necessary for the purpose it was collected, including service delivery, recruitment follow-up, business records, legal compliance, dispute resolution, and legitimate business operations.",
      "Where information is no longer needed, we may delete, anonymise, or securely archive it.",
    ],
  },
  {
    title: "9. Your Rights",
    content: [
      "Subject to applicable law, you may request access to your personal information, correction of inaccurate information, deletion where appropriate, objection to certain processing, or information about how your data is being used.",
      "To make a privacy-related request, contact us using the contact details provided below.",
    ],
  },
  {
    title: "10. Cookies and Website Analytics",
    content: [
      "Our website may use cookies or similar technologies to improve website performance, remember preferences, understand visitor behaviour, and improve user experience.",
      "You can control cookies through your browser settings. Disabling cookies may affect some website functionality.",
    ],
  },
  {
    title: "11. Third-Party Links",
    content: [
      "Our website may contain links to third-party websites, social media platforms, forms, payment channels, or external resources.",
      "We are not responsible for the privacy practices, content, or security of third-party websites. Users should review third-party privacy policies before submitting information.",
    ],
  },
  {
    title: "12. Children’s Privacy",
    content: [
      "Our services are mainly intended for business owners, investors, beauty professionals, job seekers, and adults seeking professional beauty industry services.",
      "We do not knowingly collect personal information from children without appropriate consent where required.",
    ],
  },
  {
    title: "13. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, technology, or business operations.",
      "The latest version will be published on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#071b33] px-5 py-20 text-white sm:px-6 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(184,117,134,0.28),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(217,163,175,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d9a3af]/30 bg-white/5 px-4 py-2 text-sm font-bold text-[#d9a3af]">
            <ShieldCheck className="h-4 w-4" />
            Privacy & Data Protection
          </div>

          <h1 className="mt-7 font-serif text-[46px] font-black leading-tight tracking-[-0.045em] sm:text-[64px]">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-[16px] leading-8 text-white/75 sm:text-[18px]">
            This policy explains how Salons Assured Kenya Ltd collects, uses,
            protects, and manages personal information shared through our
            website, enquiries, recruitment forms, and communication channels.
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
                For privacy questions or data requests, contact us using the
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
            {privacySections.map((section) => (
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
                14. Contact Us
              </h2>

              <p className="mt-5 text-[15px] leading-8 text-slate-700 sm:text-[16px]">
                For questions about this Privacy Policy, contact Salons Assured
                Kenya Ltd through{" "}
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

              <div className="mt-8">
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