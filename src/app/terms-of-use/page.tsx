import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Terms of Use | Salons Assured Kenya Limited",

  description:
    "Read the terms governing the use of the Salons Assured Kenya Limited website, services, content, enquiries and communications.",

  alternates: {
    canonical:
      "/terms-of-use",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Terms of Use | Salons Assured Kenya Limited",

    description:
      "Terms governing the use of the Salons Assured Kenya website and services.",

    url:
      "https://www.salonsassured.com/terms-of-use",

    siteName:
      "Salons Assured Kenya Limited",

    type:
      "website",
  },
};

const contents = [
  {
    number: "01",
    label:
      "Acceptance of these terms",
    href:
      "#acceptance",
  },
  {
    number: "02",
    label:
      "About our services",
    href:
      "#services",
  },
  {
    number: "03",
    label:
      "Enquiries and consultations",
    href:
      "#enquiries",
  },
  {
    number: "04",
    label:
      "Recruitment services",
    href:
      "#recruitment",
  },
  {
    number: "05",
    label:
      "Training and consulting",
    href:
      "#consulting",
  },
  {
    number: "06",
    label:
      "Fees and payments",
    href:
      "#payments",
  },
  {
    number: "07",
    label:
      "Your responsibilities",
    href:
      "#responsibilities",
  },
  {
    number: "08",
    label:
      "Intellectual property",
    href:
      "#intellectual-property",
  },
  {
    number: "09",
    label:
      "Privacy and confidentiality",
    href:
      "#privacy",
  },
  {
    number: "10",
    label:
      "Third-party services",
    href:
      "#third-party-services",
  },
  {
    number: "11",
    label:
      "Disclaimers",
    href:
      "#disclaimers",
  },
  {
    number: "12",
    label:
      "Limitation of liability",
    href:
      "#liability",
  },
  {
    number: "13",
    label:
      "Suspension and termination",
    href:
      "#termination",
  },
  {
    number: "14",
    label:
      "Changes to these terms",
    href:
      "#changes",
  },
  {
    number: "15",
    label:
      "Governing law",
    href:
      "#governing-law",
  },
  {
    number: "16",
    label:
      "Contact information",
    href:
      "#contact",
  },
];

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children:
    React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-[#071b33]/10 py-10 last:border-b-0 sm:py-12"
    >
      <div className="grid gap-5 md:grid-cols-[74px_1fr]">
        <p className="[font-family:var(--font-display)] text-[25px] font-semibold italic text-[#b87586]">
          {number}
        </p>

        <div>
          <h2 className="[font-family:var(--font-display)] text-[34px] font-semibold leading-[0.98] tracking-[-0.04em] text-[#071b33] sm:text-[42px]">
            {title}
          </h2>

          <div className="mt-6 space-y-5 text-[14px] leading-8 text-[#071b33]/68 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TermsOfUsePage() {
  return (
    <main
      id="top"
      className="overflow-hidden bg-white text-[#071b33]"
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071b33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-64 -top-72 h-[650px] w-[650px] rounded-full border border-white/[0.06]" />

          <div className="absolute -bottom-72 -right-60 h-[650px] w-[650px] rounded-full border border-[#d9a3af]/10" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,163,175,0.22),transparent_31%),radial-gradient(circle_at_88%_80%,rgba(184,117,134,0.13),transparent_30%)]" />
        </div>

        <div className="relative mx-auto max-w-[1380px] px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28 lg:pt-40">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d9a3af]" />

            <p className="text-[9px] font-extrabold uppercase tracking-[0.31em] text-[#d9a3af]">
              Legal Information
            </p>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <h1 className="max-w-[900px] [font-family:var(--font-display)] text-[60px] font-semibold leading-[0.87] tracking-[-0.067em] sm:text-[84px] lg:text-[104px]">
                Terms
                <span className="ml-3 font-medium italic text-[#d9a3af]">
                  of Use.
                </span>
              </h1>

              <p className="mt-8 max-w-[720px] text-[16px] leading-8 text-white/68 sm:text-[18px]">
                These terms explain the conditions governing your
                access to the Salons Assured Kenya Limited website,
                content, enquiry channels and professional services.
              </p>
            </div>

            <div className="border-l border-white/20 pl-6">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af]">
                Effective date
              </p>

              <p className="mt-3 [font-family:var(--font-display)] text-[29px] font-semibold">
                15 July 2026
              </p>

              <p className="mt-5 text-[12px] leading-6 text-white/52">
                By continuing to use this website, you acknowledge
                that you have read and accepted these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-b border-[#071b33]/10 bg-[#d9a3af]">
        <div className="mx-auto grid max-w-[1380px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:px-10">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#071b33]/58">
            Important notice
          </p>

          <p className="[font-family:var(--font-display)] text-[27px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#071b33] sm:text-[34px]">
            These website terms apply generally. Individual
            quotations, proposals, contracts and service agreements
            may contain additional terms specific to a particular
            assignment.
          </p>
        </div>
      </section>

      {/* TERMS */}
      <section className="relative bg-[#f8f5f3] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.34fr_0.66fr] lg:px-10">
          {/* TABLE OF CONTENTS */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
              On this page
            </p>

            <div className="mt-6 border-y border-[#071b33]/10 bg-white">
              {contents.map(
                (item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group grid grid-cols-[38px_1fr_20px] items-center gap-3 border-b border-[#071b33]/10 px-5 py-4 last:border-b-0 transition-colors duration-300 hover:bg-[#fbf4f6]"
                  >
                    <span className="[font-family:var(--font-display)] text-[15px] font-semibold italic text-[#b87586]/65">
                      {item.number}
                    </span>

                    <span className="text-[11px] font-semibold leading-5 text-[#071b33]/68 transition-colors group-hover:text-[#071b33]">
                      {item.label}
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ),
              )}
            </div>
          </aside>

          {/* LEGAL CONTENT */}
          <article className="border-y border-[#071b33]/10 bg-white px-6 sm:px-9 lg:px-12">
            <LegalSection
              id="acceptance"
              number="01"
              title="Acceptance of these terms"
            >
              <p>
                These Terms of Use form an agreement between you and
                Salons Assured Kenya Limited. They apply whenever you
                access, browse or use this website, submit an enquiry
                or interact with our online services.
              </p>

              <p>
                You should stop using the website where you do not
                agree with these terms. Where you use the website on
                behalf of a business or organisation, you confirm
                that you have authority to act for that entity.
              </p>
            </LegalSection>

            <LegalSection
              id="services"
              number="02"
              title="About our services"
            >
              <p>
                Salons Assured Kenya Limited provides specialist
                support to beauty businesses, investors, managers
                and professionals. Our services may include
                recruitment, staffing support, training, business
                systems, operational assessments, business setup,
                digital growth and management consulting.
              </p>

              <p>
                Information published on this website describes our
                general service areas. It does not automatically
                create a client-consultant, employment, agency or
                contractual relationship.
              </p>

              <p>
                The scope, timing, deliverables, responsibilities and
                price of a specific assignment will be determined by
                a separate quotation, proposal, engagement letter or
                written agreement.
              </p>
            </LegalSection>

            <LegalSection
              id="enquiries"
              number="03"
              title="Enquiries and consultations"
            >
              <p>
                Submitting a website form, email, telephone enquiry
                or WhatsApp message does not guarantee acceptance of
                an assignment, availability of a consultant,
                placement of a candidate or delivery of any
                particular service.
              </p>

              <p>
                We may request additional information before
                recommending a service or preparing a quotation. You
                are responsible for ensuring that the information
                supplied is complete, accurate and lawful.
              </p>

              <p>
                A consultation may be subject to advance booking,
                availability, consultation fees or other conditions
                communicated before confirmation.
              </p>
            </LegalSection>

            <LegalSection
              id="recruitment"
              number="04"
              title="Recruitment and staffing services"
            >
              <p>
                Salons Assured may support candidate sourcing,
                screening, interviews, referrals, placement
                coordination and onboarding. The final hiring
                decision remains the responsibility of the employer.
              </p>

              <p>
                Employers remain responsible for conducting any
                additional verification, reference checks, legal
                checks, skill assessments and suitability reviews
                required for their organisation.
              </p>

              <p>
                Candidates remain responsible for providing truthful
                and current information about their identity,
                experience, qualifications, references,
                availability and work authorisation.
              </p>

              <p>
                We do not guarantee that a candidate will be hired,
                remain employed for a particular period or achieve a
                particular performance level. We also do not
                guarantee that a job seeker will receive an
                interview, placement or employment offer.
              </p>
            </LegalSection>

            <LegalSection
              id="consulting"
              number="05"
              title="Training and consulting services"
            >
              <p>
                Our recommendations are based on the information
                provided, observations made, available records and
                the circumstances existing at the time of an
                engagement.
              </p>

              <p>
                Business outcomes depend on factors including
                implementation, leadership, staffing, market
                conditions, finances, customer behaviour and
                decisions made by the client. We therefore do not
                guarantee a particular level of profit, revenue,
                client growth or business performance.
              </p>

              <p>
                Unless expressly agreed in writing, our services do
                not constitute legal, tax, accounting, medical or
                regulated financial advice. Clients should obtain
                specialist advice where such matters arise.
              </p>
            </LegalSection>

            <LegalSection
              id="payments"
              number="06"
              title="Fees, quotations and payments"
            >
              <p>
                Prices shown on the website, social media or
                promotional material may be indicative and may
                change depending on scope, location, urgency,
                complexity and required resources.
              </p>

              <p>
                Confirmed charges, deposits, payment schedules,
                taxes, reimbursable expenses and cancellation terms
                will be communicated in the relevant quotation,
                invoice or written service agreement.
              </p>

              <p>
                Work may begin only after the required deposit,
                approval or documentation has been received. Salons
                Assured may pause or withhold services where an
                invoice is overdue or agreed client obligations have
                not been fulfilled.
              </p>
            </LegalSection>

            <LegalSection
              id="responsibilities"
              number="07"
              title="Your responsibilities"
            >
              <p>
                When using this website or our services, you agree
                that you will:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  provide truthful, current and accurate information;
                </li>

                <li className="list-disc">
                  obtain permission before sharing another person’s
                  personal or confidential information;
                </li>

                <li className="list-disc">
                  use our website, materials and communication
                  channels lawfully and respectfully;
                </li>

                <li className="list-disc">
                  avoid introducing malware, harmful code or
                  unauthorised automated activity;
                </li>

                <li className="list-disc">
                  avoid impersonating another person or falsely
                  representing a business, qualification or
                  relationship; and
                </li>

                <li className="list-disc">
                  comply with any additional terms contained in a
                  quotation, contract or service agreement.
                </li>
              </ul>
            </LegalSection>

            <LegalSection
              id="intellectual-property"
              number="08"
              title="Intellectual property"
            >
              <p>
                Unless otherwise stated, the website design, text,
                graphics, branding, logos, service descriptions,
                templates, training materials, documents and other
                content made available by Salons Assured are owned by
                or licensed to Salons Assured Kenya Limited.
              </p>

              <p>
                You may view and use publicly available website
                content for personal or internal business
                information. You may not reproduce, sell,
                republish, modify, distribute or commercially
                exploit our content without prior written
                permission.
              </p>

              <p>
                Ownership and permitted use of custom documents,
                systems, reports, training materials and other
                assignment deliverables will be governed by the
                applicable written client agreement.
              </p>
            </LegalSection>

            <LegalSection
              id="privacy"
              number="09"
              title="Privacy and confidentiality"
            >
              <p>
                Personal information submitted through our website,
                email, telephone or messaging channels will be
                handled in accordance with our Privacy Policy and
                applicable requirements.
              </p>

              <p>
                You should avoid sending highly sensitive,
                unnecessary or confidential material through public
                communication channels unless we specifically
                request it and provide an appropriate method of
                transmission.
              </p>

              <p>
                Where you provide information about employees,
                candidates, clients or another person, you confirm
                that you are authorised to provide that information
                for the intended purpose.
              </p>

              <Link
                href="/privacy-policy"
                className="group inline-flex items-center gap-3 font-bold text-[#b87586] transition-colors hover:text-[#071b33]"
              >
                Read our Privacy Policy

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </LegalSection>

            <LegalSection
              id="third-party-services"
              number="10"
              title="Third-party websites and services"
            >
              <p>
                This website may contain links to third-party
                platforms including WhatsApp, Google Maps,
                Instagram, Facebook, TikTok, payment providers or
                other external services.
              </p>

              <p>
                Third-party services operate under their own terms,
                policies and security practices. Salons Assured is
                not responsible for the availability, content,
                conduct or data practices of those external
                platforms.
              </p>
            </LegalSection>

            <LegalSection
              id="disclaimers"
              number="11"
              title="Website availability and disclaimers"
            >
              <p>
                We aim to keep website information clear, useful and
                current, but we do not guarantee that every page
                will always be complete, accurate, available,
                uninterrupted or free from technical errors.
              </p>

              <p>
                Website content is provided for general information
                and should not be treated as a substitute for a
                detailed assessment of your particular business,
                employment or investment circumstances.
              </p>

              <p>
                We may update, remove, suspend or change website
                content and functionality without prior notice.
              </p>
            </LegalSection>

            <LegalSection
              id="liability"
              number="12"
              title="Limitation of liability"
            >
              <p>
                To the maximum extent permitted by applicable law,
                Salons Assured Kenya Limited will not be responsible
                for indirect, incidental, special or consequential
                loss arising solely from reliance on general website
                content or from the unavailability of the website.
              </p>

              <p>
                Nothing in these terms excludes any liability or
                legal right that cannot lawfully be excluded or
                limited.
              </p>

              <p>
                Liability connected with a paid assignment will also
                be governed by the quotation, proposal, engagement
                letter or contract applicable to that assignment.
              </p>
            </LegalSection>

            <LegalSection
              id="termination"
              number="13"
              title="Suspension and termination"
            >
              <p>
                We may restrict or terminate access to the website,
                communication channels or services where there is
                suspected fraud, abuse, unlawful conduct, harassment,
                non-payment, misuse of our materials or breach of
                these terms.
              </p>

              <p>
                Ending access to the website does not remove rights,
                payment obligations, confidentiality duties or other
                responsibilities that arose before termination.
              </p>
            </LegalSection>

            <LegalSection
              id="changes"
              number="14"
              title="Changes to these terms"
            >
              <p>
                We may revise these Terms of Use to reflect changes
                in our website, services, business practices or
                applicable requirements.
              </p>

              <p>
                The revised version will be published on this page
                with an updated effective date. Continued use of the
                website after publication means that the revised
                terms will apply from their effective date.
              </p>
            </LegalSection>

            <LegalSection
              id="governing-law"
              number="15"
              title="Governing law and disputes"
            >
              <p>
                These Terms of Use are governed by the laws of Kenya.
                Any dispute relating to these terms or use of the
                website should first be raised directly with Salons
                Assured so that the parties can attempt to resolve it
                in good faith.
              </p>

              <p>
                Where a dispute cannot be resolved directly, it may
                be submitted to the courts or another competent
                dispute-resolution forum in Kenya, subject to any
                different process agreed in a specific service
                contract.
              </p>
            </LegalSection>

            <LegalSection
              id="contact"
              number="16"
              title="Contact information"
            >
              <p>
                Questions about these Terms of Use may be directed to
                Salons Assured Kenya Limited using the details below.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <a
                  href="tel:+254715500268"
                  className="group border border-[#071b33]/10 bg-[#f8f5f3] p-5 transition-colors hover:bg-[#fbf4f6]"
                >
                  <Phone className="h-5 w-5 text-[#b87586]" />

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                    Telephone
                  </p>

                  <p className="mt-2 text-[12px] font-semibold text-[#071b33]">
                    0715 500 268
                  </p>
                </a>

                <a
                  href="mailto:info@salonsassured.com"
                  className="group border border-[#071b33]/10 bg-[#f8f5f3] p-5 transition-colors hover:bg-[#fbf4f6]"
                >
                  <Mail className="h-5 w-5 text-[#b87586]" />

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                    Email
                  </p>

                  <p className="mt-2 break-all text-[12px] font-semibold text-[#071b33]">
                    info@salonsassured.com
                  </p>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kwaheri%20Road%2C%20Runda%2C%20Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-[#071b33]/10 bg-[#f8f5f3] p-5 transition-colors hover:bg-[#fbf4f6]"
                >
                  <MapPin className="h-5 w-5 text-[#b87586]" />

                  <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                    Location
                  </p>

                  <p className="mt-2 text-[12px] font-semibold leading-5 text-[#071b33]">
                    Kwaheri Road
                    <br />
                    Runda, Nairobi
                  </p>
                </a>
              </div>
            </LegalSection>
          </article>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative overflow-hidden bg-[#d9a3af] py-16 text-[#071b33] sm:py-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full border border-[#071b33]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_280px] lg:items-end lg:px-10">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.29em] text-[#071b33]/58">
              Need clarification?
            </p>

            <h2 className="mt-5 max-w-[850px] [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.91] tracking-[-0.052em] sm:text-[62px]">
              Speak with our
              <span className="ml-3 font-medium italic text-white">
                team.
              </span>
            </h2>
          </div>

          <Link
            href="/contact"
            className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#071b33] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-1"
          >
            Contact us

            <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}