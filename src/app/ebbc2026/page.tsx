import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  GraduationCap,
  Handshake,
  MapPin,
  Network,
  Sparkles,
  Store,
  Ticket,
  Users,
} from "lucide-react";

import EventCountdown from "./EventCountdown";
import { EBBC2026 } from "@/lib/ebbc2026/config";

export const metadata: Metadata = {
  title:
    "EBBC2026 | Elevate Beauty Business Convention 2026",

  description:
    "Join Kenya’s beauty and grooming industry at EBBC2026 on 17–18 November 2026 at CITAM Valley Road, Nairobi.",

  alternates: {
    canonical: "/ebbc2026",
  },

  openGraph: {
    title:
      "Elevate Beauty Business Convention 2026",

    description:
      "Two powerful days of learning, networking and business growth for Kenya’s beauty and grooming industry.",

    url: "https://www.salonsassured.com/ebbc2026",

    type: "website",

    images: [
      {
        url: "/ebbc2026/01-ebbc2026-hero-speaker.webp",
        width: 1800,
        height: 1200,
        alt: "Elevate Beauty Business Convention 2026",
      },
    ],
  },
};

const audienceGroups = [
  {
    icon: BriefcaseBusiness,
    title: "Salon and Spa Owners",
    text: "Build stronger teams, systems, customer experiences and more profitable beauty businesses.",
  },
  {
    icon: Sparkles,
    title: "Beauty Professionals",
    text: "For stylists, barbers, braiders, nail technicians and therapists ready to grow professionally.",
  },
  {
    icon: Users,
    title: "Managers and Team Leaders",
    text: "Strengthen leadership, staff performance, workplace culture and daily business operations.",
  },
  {
    icon: GraduationCap,
    title: "Beauty Students",
    text: "Meet established professionals, learn from the industry and prepare for a successful career.",
  },
  {
    icon: Store,
    title: "Suppliers and Brands",
    text: "Connect directly with salon owners, buyers, professionals and beauty-industry partners.",
  },
  {
    icon: Handshake,
    title: "Investors and Partners",
    text: "Explore business partnerships, industry opportunities and the future of Kenya’s beauty economy.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Learn From the Industry",
    text: "Gain practical insights from professionals, business owners and leaders who understand the realities of Kenya’s beauty sector.",
  },
  {
    number: "02",
    title: "Build Valuable Connections",
    text: "Meet beauty professionals, salon owners, suppliers, brands, investors and potential business partners.",
  },
  {
    number: "03",
    title: "Strengthen Your Business",
    text: "Explore better systems, stronger leadership, improved customer experience and sustainable business growth.",
  },
  {
    number: "04",
    title: "Discover New Opportunities",
    text: "Find new products, partnerships, professional opportunities and ideas that can move your career or business forward.",
  },
];

const programmeDays = [
  {
    day: "Day One",
    date: "17 November 2026",
    title:
      "Skills, Careers, Professionalism and Industry Development",
    description:
      "A professional development day focused on strengthening skills, careers, service standards and the future of beauty-industry professionals.",
    topics: [
      "Professional skills and career development",
      "Service standards and customer experience",
      "Workplace culture and professionalism",
      "Industry opportunities and emerging trends",
    ],
  },
  {
    day: "Day Two",
    date: "18 November 2026",
    title:
      "Business Growth, Leadership, Systems and Partnerships",
    description:
      "A business-focused day designed for owners, managers, suppliers, investors and partners working to build stronger beauty businesses.",
    topics: [
      "Business growth and profitability",
      "Leadership and team performance",
      "Systems, structure and accountability",
      "Investment, partnerships and industry collaboration",
    ],
  },
];

const faqs = [
  {
    question: "Who can attend EBBC2026?",
    answer:
      "EBBC2026 is open to salon and spa owners, stylists, barbers, braiders, nail technicians, therapists, managers, beauty students, suppliers, brands, investors and other beauty-industry stakeholders.",
  },
  {
    question:
      "What does the KES 4,500 ticket include?",
    answer:
      "The Full Convention Pass includes access to both convention days, keynotes and panel discussions, exhibition and supplier access, networking sessions, a digital programme, a QR-code ticket and a participation certificate.",
  },
  {
    question:
      "Where will EBBC2026 take place?",
    answer:
      "The convention will take place at CITAM Valley Road in Nairobi on 17–18 November 2026.",
  },
  {
    question:
      "Can a company register several people?",
    answer:
      "Yes. Businesses, salons, spas, schools, brands and other organisations may register multiple participants. Group registration support will be available through the EBBC2026 contact page.",
  },
  {
    question:
      "Are speaker and exhibitor opportunities available?",
    answer:
      "Speaker, exhibitor and sponsorship opportunities will be announced officially. Interested organisations and professionals can submit an enquiry through the contact page.",
  },
];

export default function EBBC2026Page() {
  return (
    <main className="overflow-hidden bg-white text-[#0D1D34]">
      {/* HERO */}
      <section className="relative min-h-screen bg-[#FAFAFA] px-5 pb-20 pt-28 sm:px-8 lg:flex lg:items-center lg:pb-24 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[1380px] gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative z-10">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#CC8591]/30 bg-white px-4 py-2 shadow-sm">
              <span className="rounded-full bg-[#CC8591] px-3 py-1 text-[8px] font-extrabold uppercase tracking-[0.2em] text-white">
                Second Edition
              </span>

              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/55">
                Nairobi · 17–18 November 2026
              </span>
            </div>

            <h1 className="mt-7 max-w-[780px] [font-family:var(--font-display)] text-[52px] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-[70px] lg:text-[82px] xl:text-[92px]">
              Where Kenya&apos;s
              <span className="block italic text-[#CC8591]">
                Beauty Industry
              </span>
              Meets to Learn, Connect and Grow
            </h1>

            <p className="mt-7 max-w-2xl text-[15px] leading-8 text-[#0D1D34]/65 sm:text-[17px]">
              Two powerful days bringing beauty
              professionals, business owners,
              suppliers, investors and industry
              leaders together to build a stronger
              and more professional beauty economy.
            </p>

            <div className="mt-8 grid overflow-hidden rounded-[22px] border border-[#0D1D34]/10 bg-white shadow-[0_18px_55px_rgba(13,29,52,0.07)] sm:grid-cols-3">
              <div className="border-b border-[#0D1D34]/10 p-5 sm:border-b-0 sm:border-r">
                <CalendarDays className="h-5 w-5 text-[#CC8591]" />

                <p className="mt-3 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Event dates
                </p>

                <p className="mt-1.5 text-sm font-extrabold">
                  {EBBC2026.dates.display}
                </p>
              </div>

              <div className="border-b border-[#0D1D34]/10 p-5 sm:border-b-0 sm:border-r">
                <MapPin className="h-5 w-5 text-[#CC8591]" />

                <p className="mt-3 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Venue
                </p>

                <p className="mt-1.5 text-sm font-extrabold">
                  {EBBC2026.venue.display}
                </p>
              </div>

              <div className="p-5">
                <Ticket className="h-5 w-5 text-[#CC8591]" />

                <p className="mt-3 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                  Full convention pass
                </p>

                <p className="mt-1.5 text-sm font-extrabold text-[#CC8591]">
                  {EBBC2026.ticket.displayPrice}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={EBBC2026.routes.tickets}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-8 text-sm font-extrabold text-white shadow-[0_15px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-1 hover:bg-[#0D1D34]"
              >
                Secure Your Seat

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={EBBC2026.routes.contact}
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#0D1D34]/15 bg-white px-8 text-sm font-extrabold transition hover:border-[#0D1D34] hover:bg-[#0D1D34] hover:text-white"
              >
                Sponsor or Exhibit
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#CC8591]/15 blur-3xl" />

            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[#0D1D34]/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[30px] bg-[#0D1D34] shadow-[0_35px_100px_rgba(13,29,52,0.24)]">
              <div className="relative min-h-[560px] sm:min-h-[660px]">
                <Image
                  src="/ebbc2026/01-ebbc2026-hero-speaker.webp"
                  alt="Beauty-industry professional speaking at an event"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1D34] via-[#0D1D34]/20 to-transparent" />

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                  <span className="rounded-full border border-white/20 bg-[#0D1D34]/65 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    EBBC2026
                  </span>

                  <span className="rounded-full bg-[#CC8591] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white">
                    KES 4,500
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
                    Beauty is business. Business is
                    community.
                  </p>

                  <h2 className="mt-3 [font-family:var(--font-display)] text-[38px] font-semibold leading-[0.95] text-white sm:text-[50px]">
                    Elevating Kenya&apos;s beauty
                    industry together.
                  </h2>

                  <EventCountdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD ATTEND */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              Who should attend
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.96] tracking-[-0.045em] sm:text-[62px]">
              Every Part of the Beauty Industry
              Belongs Here
            </h2>

            <p className="mt-6 text-[15px] leading-8 text-[#0D1D34]/60">
              EBBC2026 connects professionals,
              businesses, suppliers and partners
              from across Kenya&apos;s beauty and
              grooming economy.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audienceGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="group rounded-[24px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-7 transition duration-300 hover:-translate-y-2 hover:bg-[#0D1D34] hover:text-white hover:shadow-[0_25px_70px_rgba(13,29,52,0.15)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#CC8591]/15 text-[#CC8591] transition group-hover:bg-[#CC8591] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-7 text-xl font-extrabold">
                    {group.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-[#0D1D34]/58 transition group-hover:text-white/60">
                    {group.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY ATTEND */}
      <section className="bg-[#0D1D34] px-5 py-24 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
                Why attend EBBC2026
              </p>

              <h2 className="mt-5 max-w-xl [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[64px]">
                Two Days That Can Change How You
                Work and Grow
              </h2>

              <p className="mt-6 max-w-lg text-[15px] leading-8 text-white/55">
                EBBC2026 is designed to give beauty
                professionals and businesses
                practical knowledge, meaningful
                connections and stronger
                opportunities.
              </p>

              <Link
                href={EBBC2026.routes.tickets}
                className="group mt-8 inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#0D1D34]"
              >
                Get Your Convention Pass

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article
                  key={benefit.number}
                  className="rounded-[24px] border border-white/10 bg-white/[0.055] p-7"
                >
                  <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#CC8591]">
                    {benefit.number}
                  </p>

                  <h3 className="mt-6 text-xl font-extrabold">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-white/50">
                    {benefit.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TWO-DAY EXPERIENCE */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              The two-day experience
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[64px]">
              Two Focused Days. One Stronger
              Industry.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {programmeDays.map(
              (programme, index) => (
                <article
                  key={programme.day}
                  className={`rounded-[28px] p-7 sm:p-9 ${
                    index === 0
                      ? "border border-[#CC8591]/30 bg-[#FAFAFA]"
                      : "bg-[#0D1D34] text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#CC8591] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white">
                      {programme.day}
                    </span>

                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-[0.16em] ${
                        index === 0
                          ? "text-[#0D1D34]/40"
                          : "text-white/40"
                      }`}
                    >
                      {programme.date}
                    </span>
                  </div>

                  <h3 className="mt-8 [font-family:var(--font-display)] text-[36px] font-semibold leading-[1] tracking-[-0.035em] sm:text-[44px]">
                    {programme.title}
                  </h3>

                  <p
                    className={`mt-5 text-[14px] leading-7 ${
                      index === 0
                        ? "text-[#0D1D34]/58"
                        : "text-white/52"
                    }`}
                  >
                    {programme.description}
                  </p>

                  <div className="mt-7 space-y-3">
                    {programme.topics.map(
                      (topic) => (
                        <div
                          key={topic}
                          className={`flex items-start gap-3 rounded-[14px] border px-4 py-3 ${
                            index === 0
                              ? "border-[#0D1D34]/8 bg-white"
                              : "border-white/10 bg-white/[0.05]"
                          }`}
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

                          <span className="text-[12px] font-bold leading-5">
                            {topic}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TICKET */}
      <section className="bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              One complete convention pass
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[48px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[66px]">
              Access Both Days for KES 4,500
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#0D1D34]/60">
              One pass gives you access to the full
              EBBC2026 learning, networking and
              industry experience.
            </p>
          </div>

          <div className="overflow-hidden rounded-[30px] bg-[#0D1D34] text-white shadow-[0_30px_90px_rgba(13,29,52,0.22)]">
            <div className="border-b border-white/10 p-7 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                    EBBC2026
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold">
                    Full Convention Pass
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                    Per person
                  </p>

                  <p className="mt-1 text-3xl font-black text-[#CC8591]">
                    KES 4,500
                  </p>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <div className="space-y-4">
                {EBBC2026.ticket.includes.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#CC8591]">
                        <Check className="h-3 w-3 text-white" />
                      </div>

                      <span className="text-[13px] font-semibold leading-6 text-white/70">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <Link
                href={EBBC2026.routes.tickets}
                className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#0D1D34]"
              >
                Register for EBBC2026

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKERS, EXHIBITORS AND PARTNERS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Users,
                label: "Speakers",
                title: "Industry Speakers",
                text: "The official EBBC2026 speaker line-up will be announced.",
              },
              {
                icon: Store,
                label: "Exhibitors",
                title: "Brands and Exhibitors",
                text: "Participating suppliers, brands and exhibitors will be announced.",
              },
              {
                icon: Network,
                label: "Partners",
                title: "Sponsors and Partners",
                text: "Official convention sponsors and industry partners will be announced.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-[26px] border border-[#0D1D34]/8 bg-[#FAFAFA] p-8 text-center"
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] bg-[#CC8591]/15 text-[#CC8591]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="mt-6 text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                    {item.label}
                  </p>

                  <h3 className="mt-3 text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-[#0D1D34]/55">
                    {item.text}
                  </p>

                  <span className="mt-6 inline-flex rounded-full border border-[#0D1D34]/10 bg-white px-4 py-2 text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#0D1D34]/45">
                    To Be Announced
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              Frequently asked questions
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[62px]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[18px] border border-[#0D1D34]/8 bg-white p-5 open:shadow-[0_18px_45px_rgba(13,29,52,0.07)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold">
                  {faq.question}

                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#CC8591]/12 text-[#CC8591] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 pr-10 text-[13px] leading-7 text-[#0D1D34]/58">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="relative mx-auto max-w-[1250px] overflow-hidden rounded-[30px] bg-[#0D1D34] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(204,133,145,0.55),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(204,133,145,0.18),transparent_40%)]" />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              17–18 November 2026 · Nairobi
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[48px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[68px]">
              Be Part of the Future of Kenya&apos;s
              Beauty Industry
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-[14px] leading-7 text-white/55">
              Join professionals, owners,
              suppliers, investors and industry
              leaders for two powerful days of
              learning, networking and business
              growth.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={EBBC2026.routes.tickets}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-8 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#0D1D34]"
              >
                Secure Your Seat — KES 4,500

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={EBBC2026.routes.contact}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-extrabold transition hover:bg-white hover:text-[#0D1D34]"
              >
                Contact the EBBC2026 Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}