import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Target,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Salons Assured Kenya Ltd | Beauty Business Consulting",
  description:
    "Learn about Salons Assured Kenya Ltd, a professional beauty business consulting firm supporting salons, spas, barbershops, nail studios, investors and beauty professionals with recruitment, training, systems and growth support.",
};

const stats = [
  {
    value: "4.9",
    label: "Google Rating",
  },
  {
    value: "74+",
    label: "Google Reviews",
  },
  {
    value: "6",
    label: "Core Service Pillars",
  },
  {
    value: "100%",
    label: "Beauty Industry Focused",
  },
];

const focusAreas = [
  {
    title: "Recruitment & Staffing",
    description:
      "We support beauty businesses with structured hiring, sourcing, screening and placement guidance for salon, spa, barbershop and beauty industry roles.",
    icon: UsersRound,
  },
  {
    title: "Training & Staff Development",
    description:
      "We help teams improve customer care, sales confidence, service delivery, professionalism, discipline and daily performance.",
    icon: GraduationCap,
  },
  {
    title: "Business Systems & Documentation",
    description:
      "We create practical operating tools such as SOPs, checklists, staff documents, scorecards, reporting systems and management templates.",
    icon: ClipboardCheck,
  },
  {
    title: "Consulting & Growth Support",
    description:
      "We guide owners, managers and investors with business audits, operational improvement, accountability structures and growth direction.",
    icon: BriefcaseBusiness,
  },
];

const audiences = [
  "Salon Owners",
  "Spa Owners",
  "Barbershop Owners",
  "Nail Studio Owners",
  "Beauty Investors",
  "Beauty Professionals",
  "Managers & Supervisors",
  "Growing Beauty Brands",
];

const values = [
  {
    title: "Structure",
    description:
      "We believe a serious beauty business should not depend on guesswork. Clear systems, defined responsibilities, documented procedures and measurable standards help owners manage with confidence.",
  },
  {
    title: "Professionalism",
    description:
      "We promote professional conduct in staffing, communication, service delivery, grooming standards, client handling and the overall presentation of the beauty business.",
  },
  {
    title: "Accountability",
    description:
      "We help businesses set expectations for staff, managers and operations so that performance can be tracked, reviewed and improved consistently.",
  },
  {
    title: "Client Experience",
    description:
      "We believe growth comes from excellent client experience. We support businesses in improving service flow, follow-up, complaint handling, retention and brand trust.",
  },
  {
    title: "Growth Mindset",
    description:
      "We focus on practical improvements that help beauty businesses attract clients, improve sales, strengthen teams and become scalable over time.",
  },
  {
    title: "Premium Standards",
    description:
      "We encourage beauty businesses to think beyond basic operations and build brands that feel trustworthy, organised, elegant and ready for higher-value clients.",
  },
];

const missionVisionGoal = [
  {
    title: "Mission",
    description:
      "To help beauty businesses improve recruitment, training, daily operations, business systems, client experience and growth direction through practical professional support.",
  },
  {
    title: "Vision",
    description:
      "To raise the standard of beauty businesses locally and internationally by helping owners build structured, professional and scalable brands.",
  },
  {
    title: "Goal",
    description:
      "To help business owners create cleaner operations, stronger teams, better client experiences, improved profitability and premium trusted beauty brands.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative isolate overflow-hidden bg-[#071b33] text-white">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/contact-hero.png"
            alt="Professional beauty business consultation environment"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[#071b33]/82" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,27,51,0.98),rgba(7,27,51,0.86),rgba(7,27,51,0.48))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_22%,rgba(184,117,134,0.38),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#d9a3af]">
              About Salons Assured Kenya Ltd
            </p>

            <h1 className="mt-6 font-serif text-[52px] font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-[72px] lg:text-[88px]">
              Professional beauty business consulting, recruitment and growth
              support.
            </h1>

            <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/78 sm:text-[19px]">
              We help salons, spas, barbershops, nail studios, beauty investors
              and beauty professionals build structured, profitable and scalable
              businesses through people, systems, training and practical
              management support.
            </p>

            <div className="mt-8 grid gap-3 text-sm font-semibold text-white/80 sm:grid-cols-3">
              <div className="border-l-2 border-[#d9a3af] pl-4">
                Recruitment & Staffing
              </div>
              <div className="border-l-2 border-[#d9a3af] pl-4">
                Training & Systems
              </div>
              <div className="border-l-2 border-[#d9a3af] pl-4">
                Consulting & Growth
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#d9a3af]">
              <MapPin className="h-5 w-5" />
              <span>Kwaheri Road, Runda, Kenya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company About */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.08),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(244,223,229,0.62),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
          <div className="relative">
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_30px_90px_rgba(7,27,51,0.16)] sm:h-[520px]">
              <Image
                src="/why-choose-us.png"
                alt="Beauty business consultation and staff support"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,51,0.05),rgba(7,27,51,0.45))]" />
            </div>

            <div className="absolute -right-4 bottom-8 max-w-[230px] rounded-2xl bg-[#071b33] p-6 text-white shadow-[0_24px_60px_rgba(7,27,51,0.24)] sm:-right-8">
              <p className="font-serif text-[48px] font-black leading-none text-[#d9a3af]">
                100%
              </p>
              <p className="mt-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/80">
                Beauty Industry Focus
              </p>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
              Company About
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[58px]">
              A professional support partner for beauty business success.
            </h2>

            <div className="mt-7 grid gap-5 text-[16px] leading-8 text-slate-700">
              <p>
                Salons Assured Kenya Ltd is a professional beauty business
                consulting firm supporting salons, barbershops, spas, nail
                studios and beauty brands to build structured, profitable and
                scalable businesses.
              </p>

              <p>
                We work with start-ups, struggling salons that need
                transformation and established brands ready to grow to the next
                level. Our work focuses on people, systems, standards,
                accountability and business growth.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div key={area.title} className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>

                    <div>
                      <h3 className="font-serif text-[22px] font-black tracking-[-0.03em] text-[#071b33]">
                        {area.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#071b33] text-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 sm:px-8">
              <p className="font-serif text-[52px] font-black leading-none text-[#d9a3af]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/72">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Goal */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
              Mission, Vision & Goal
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[58px]">
              Our main goal is to help beauty businesses become structured,
              profitable and scalable.
            </h2>

            <div className="mt-9 border-y border-[#ead5db]">
              {missionVisionGoal.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-b border-[#ead5db] py-7 last:border-b-0 md:grid-cols-[0.28fr_0.72fr]"
                >
                  <h3 className="font-serif text-[30px] font-black text-[#071b33]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-8 text-slate-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[430px] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_30px_90px_rgba(7,27,51,0.16)] sm:h-[520px]">
            <Image
              src="/contact-hero.png"
              alt="Salon business strategy and consulting support"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,51,0.02),rgba(7,27,51,0.42))]" />
          </div>
        </div>
      </section>

      {/* Values Detailed */}
      <section className="relative overflow-hidden bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                Our Values
              </p>

              <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[58px]">
                The standards that guide how we support beauty businesses.
              </h2>
            </div>

            <div className="border-y border-[#ead5db] bg-white">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="grid gap-5 border-b border-[#ead5db] px-6 py-7 last:border-b-0 md:grid-cols-[0.32fr_0.68fr]"
                >
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-[#b87586]" />
                    <h3 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33]">
                      {value.title}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-8 text-slate-700 sm:text-[16px]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Support */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
              Who We Support
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[56px]">
              Built for the full beauty business ecosystem.
            </h2>
          </div>

          <div className="grid border-y border-[#ead5db] sm:grid-cols-2">
            {audiences.map((audience, index) => (
              <div
                key={audience}
                className={`border-b border-[#ead5db] py-5 sm:px-6 ${
                  index % 2 === 0 ? "sm:border-r sm:border-[#ead5db]" : ""
                }`}
              >
                <p className="font-serif text-[28px] font-black tracking-[-0.035em] text-[#071b33]">
                  {audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Final CTA */}
      <section className="relative overflow-hidden bg-[#071b33] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(184,117,134,0.28),transparent_28%),radial-gradient(circle_at_92%_80%,rgba(217,163,175,0.14),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-center">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Work With Salons Assured
            </p>

            <h2 className="mt-5 font-serif text-[38px] font-black leading-tight tracking-[-0.04em] sm:text-[54px]">
              Ready to build a more structured beauty business?
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white transition hover:from-[#a76476] hover:to-[#df789a]"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}