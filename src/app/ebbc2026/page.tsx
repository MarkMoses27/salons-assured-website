import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

import EventCountdown from "./EventCountdown";import { EBBC2026 } from "@/lib/ebbc2026/config";

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
      "Two days of learning, networking and business growth for Kenya’s beauty and grooming industry.",

    url: "https://www.salonsassured.com/ebbc2026",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Elevate Beauty Business Convention 2026",
      },
    ],
  },
};

const audienceGroups = [
  {
    title: "Salon or Spa Owner",
    text: "Build stronger teams, systems, customer experiences and profitable operations.",
  },
  {
    title: "Stylist",
    text: "Improve your professional skills, visibility and career opportunities.",
  },
  {
    title: "Barber",
    text: "Connect with industry leaders and grow your grooming career or business.",
  },
  {
    title: "Braider",
    text: "Strengthen your craft, personal brand and professional network.",
  },
  {
    title: "Nail Technician",
    text: "Discover new skills, products, trends and business opportunities.",
  },
  {
    title: "Therapist",
    text: "Improve service standards, client care and professional growth.",
  },
  {
    title: "Manager",
    text: "Learn leadership, team management and performance systems.",
  },
  {
    title: "Beauty Student",
    text: "Meet professionals and prepare for a successful beauty career.",
  },
  {
    title: "Supplier or Brand",
    text: "Connect with salon owners, buyers and beauty professionals.",
  },
  {
    title: "Investor",
    text: "Explore beauty-industry partnerships and growth opportunities.",
  },
];

export default function EBBC2026Page() {
  return (
    <main className="overflow-hidden bg-white text-[#0D1D34]">
      <section className="relative bg-[#FAFAFA] px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#CC8591]">
              {EBBC2026.edition} · Nairobi ·{" "}
              {EBBC2026.dates.display}
            </p>

            <h1 className="mt-7 max-w-[720px] [font-family:var(--font-display)] text-[54px] font-semibold leading-[0.91] tracking-[-0.055em] sm:text-[76px] lg:text-[88px]">
              Where Kenya&apos;s{" "}
              <span className="block italic text-[#CC8591]">
                Beauty Industry
              </span>
              Meets to Learn, Connect and Grow
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-8 text-[#0D1D34]/65 sm:text-[17px]">
              Two powerful days bringing beauty
              professionals, business owners,
              suppliers, investors and industry
              leaders together to build a stronger
              and more professional beauty economy.
            </p>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-[#CC8591]/45 bg-white">
              <div className="grid sm:grid-cols-3">
                <div className="border-b border-[#CC8591]/20 p-5 sm:border-b-0 sm:border-r">
                  <CalendarDays className="h-5 w-5 text-[#CC8591]" />

                  <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0D1D34]/45">
                    Event dates
                  </p>

                  <p className="mt-2 text-sm font-extrabold">
                    {EBBC2026.dates.display}
                  </p>
                </div>

                <div className="border-b border-[#CC8591]/20 p-5 sm:border-b-0 sm:border-r">
                  <MapPin className="h-5 w-5 text-[#CC8591]" />

                  <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0D1D34]/45">
                    Venue
                  </p>

                  <p className="mt-2 text-sm font-extrabold">
                    {EBBC2026.venue.display}
                  </p>
                </div>

                <div className="p-5">
                  <Ticket className="h-5 w-5 text-[#CC8591]" />

                  <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0D1D34]/45">
                    Full convention pass
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#CC8591]">
                    {EBBC2026.ticket.displayPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={EBBC2026.routes.tickets}
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-8 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-[#0D1D34]"
              >
                Get Your Ticket —{" "}
                {EBBC2026.ticket.displayPrice}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={EBBC2026.routes.contact}
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#0D1D34]/20 px-8 text-sm font-extrabold transition hover:border-[#0D1D34] hover:bg-[#0D1D34] hover:text-white"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[30px] bg-[#0D1D34] p-7 text-white shadow-[0_30px_90px_rgba(13,29,52,0.18)] sm:min-h-[620px] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(204,133,145,0.45),transparent_32%),radial-gradient(circle_at_20%_85%,rgba(255,255,255,0.10),transparent_34%)]" />

            <div className="relative flex h-full min-h-[460px] flex-col justify-end sm:min-h-[540px]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
                Beauty is business. Business is community.
              </p>

              <h2 className="mt-5 text-[46px] font-black tracking-[-0.05em] sm:text-[64px]">
                EBBC2026
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-white/60">
                Kenya&apos;s annual gathering for
                beauty professionals, business
                owners, investors, suppliers and
                industry partners.
              </p>

              <EventCountdown />
            </div>
          </div>
        </div>
      </section>

      <section
        id="who-should-attend"
        className="px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#CC8591]">
              Who should attend
            </p>

            <h2 className="mt-6 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[64px]">
              Where Do You Fit in the Beauty
              Industry?
            </h2>

            <p className="mt-6 text-[15px] leading-8 text-[#0D1D34]/60">
              EBBC2026 brings together every part
              of the beauty and grooming ecosystem
              for two days of learning, networking
              and business growth.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audienceGroups.map(
              (group, index) => (
                <article
                  key={group.title}
                  className="group min-h-[220px] rounded-[26px] border border-[#CC8591]/35 bg-[#FAFAFA] p-7 transition duration-300 hover:-translate-y-2 hover:bg-[#0D1D34] hover:text-white hover:shadow-[0_24px_70px_rgba(13,29,52,0.14)]"
                >
                  <p className="text-[10px] font-extrabold tracking-[0.22em] text-[#CC8591]">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </p>

                  <h3 className="mt-8 text-xl font-extrabold">
                    {group.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-[#0D1D34]/58 transition group-hover:text-white/65">
                    {group.text}
                  </p>
                </article>
              ),
            )}
          </div>

          <p className="mt-10 text-center text-sm font-bold text-[#0D1D34]/55">
            Choose your category during
            registration.
          </p>
        </div>
      </section>
    </main>
  );
}