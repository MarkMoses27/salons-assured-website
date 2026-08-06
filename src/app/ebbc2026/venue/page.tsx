import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Bus,
  CalendarDays,
  Car,
  Clock3,
  Info,
  Map,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { EBBC2026 } from "@/lib/ebbc2026/config";

export const metadata: Metadata = {
  title: "EBBC2026 Venue | CITAM Valley Road, Nairobi",

  description:
    "Find venue information for Elevate Beauty Business Convention 2026 at CITAM Valley Road, Nairobi, on 17–18 November 2026.",

  alternates: {
    canonical: "/ebbc2026/venue",
  },

  openGraph: {
    title: "EBBC2026 Venue | CITAM Valley Road",

    description:
      "Venue details for Elevate Beauty Business Convention 2026 in Nairobi.",

    url: "https://www.salonsassured.com/ebbc2026/venue",

    type: "website",
  },
};

const venueInformation = [
  {
    icon: CalendarDays,
    label: "Convention Dates",
    value: "17–18 November 2026",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "CITAM Valley Road",
  },
  {
    icon: Building2,
    label: "City",
    value: "Nairobi, Kenya",
  },
  {
    icon: Clock3,
    label: "Arrival Information",
    value: "Final arrival times will be shared with registered participants.",
  },
];

const travelOptions = [
  {
    icon: Car,
    title: "Private Transport",
    text: "Registered participants will receive final arrival, access and parking guidance before the convention.",
  },
  {
    icon: Bus,
    title: "Public Transport",
    text: "Participants using public transport should plan their journey to the Valley Road area in Nairobi.",
  },
  {
    icon: Navigation,
    title: "Ride-Hailing Services",
    text: "Use CITAM Valley Road as the destination when using a taxi or ride-hailing service.",
  },
];

const venueFaqs = [
  {
    question: "Is parking available at the venue?",
    answer:
      "Final parking and vehicle access arrangements will be communicated to registered participants before the convention.",
  },
  {
    question: "What time should participants arrive?",
    answer:
      "The official programme and recommended arrival time will be shared with registered participants before 17 November 2026.",
  },
  {
    question: "Will accessibility support be available?",
    answer:
      "Participants requiring specific accessibility assistance should contact the EBBC2026 team before the convention so appropriate guidance can be provided.",
  },
  {
    question: "Will meals or refreshments be provided?",
    answer:
      "Final information about meals and refreshments will be communicated to registered participants.",
  },
];

export default function EBBC2026VenuePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24 pt-32 text-[#0D1D34]">
      {/* INTRODUCTION */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href={EBBC2026.routes.home}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0D1D34]/55 transition hover:text-[#CC8591]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to EBBC2026
          </Link>

          <div className="mt-9 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
                EBBC2026 Venue
              </p>

              <h1 className="mt-5 [font-family:var(--font-display)] text-[52px] font-semibold leading-[0.94] tracking-[-0.05em] sm:text-[72px]">
                Meet Us at CITAM Valley Road
              </h1>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-[15px] leading-8 text-[#0D1D34]/60">
                Elevate Beauty Business Convention 2026 will take
                place at CITAM Valley Road in Nairobi on 17–18
                November 2026.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={EBBC2026.routes.tickets}
                  className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
                >
                  Secure Your Seat

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href={EBBC2026.routes.contact}
                  className="inline-flex h-13 items-center justify-center rounded-full border border-[#0D1D34]/15 bg-white px-7 text-sm font-extrabold transition hover:bg-[#0D1D34] hover:text-white"
                >
                  Ask About the Venue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE CARD */}
      <section className="px-5 pt-14 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[30px] bg-[#0D1D34] p-6 text-white shadow-[0_30px_90px_rgba(13,29,52,0.2)] sm:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(204,133,145,0.55),transparent_36%),radial-gradient(circle_at_5%_100%,rgba(204,133,145,0.16),transparent_40%)]" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[46px] border-white/[0.035]" />

            <div className="relative flex min-h-[448px] flex-col justify-between">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="inline-flex rounded-full bg-[#CC8591] px-4 py-2 text-[8px] font-extrabold uppercase tracking-[0.2em]">
                    Official Venue
                  </span>

                  <h2 className="mt-6 max-w-xl [font-family:var(--font-display)] text-[48px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[64px]">
                    CITAM Valley Road
                  </h2>

                  <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white/60">
                    <MapPin className="h-4 w-4 text-[#CC8591]" />

                    Nairobi, Kenya
                  </p>
                </div>

                <div className="hidden h-16 w-16 place-items-center rounded-[20px] border border-white/10 bg-white/[0.06] text-[#CC8591] sm:grid">
                  <Building2 className="h-7 w-7" />
                </div>
              </div>

              <div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-xs font-extrabold">
                        Verified map link coming soon
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-white/50">
                        The official Google Maps link and final
                        arrival instructions will be added after
                        confirmation by the EBBC2026 team.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[17px] border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/40">
                      Dates
                    </p>

                    <p className="mt-2 text-sm font-extrabold">
                      17–18 Nov 2026
                    </p>
                  </div>

                  <div className="rounded-[17px] border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/40">
                      City
                    </p>

                    <p className="mt-2 text-sm font-extrabold">
                      Nairobi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-[#0D1D34]/8 bg-white shadow-[0_22px_70px_rgba(13,29,52,0.08)]">
            <div className="absolute inset-0 opacity-[0.035]">
              <div className="absolute left-[15%] top-0 h-full w-px bg-[#0D1D34]" />
              <div className="absolute left-[35%] top-0 h-full w-px bg-[#0D1D34]" />
              <div className="absolute left-[55%] top-0 h-full w-px bg-[#0D1D34]" />
              <div className="absolute left-[75%] top-0 h-full w-px bg-[#0D1D34]" />

              <div className="absolute left-0 top-[18%] h-px w-full bg-[#0D1D34]" />
              <div className="absolute left-0 top-[38%] h-px w-full bg-[#0D1D34]" />
              <div className="absolute left-0 top-[58%] h-px w-full bg-[#0D1D34]" />
              <div className="absolute left-0 top-[78%] h-px w-full bg-[#0D1D34]" />
            </div>

            <div className="relative flex min-h-[520px] flex-col items-center justify-center px-7 text-center">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-[#CC8591]/20 blur-2xl" />

                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#0D1D34] text-[#CC8591] shadow-xl">
                  <MapPin className="h-9 w-9" />
                </div>
              </div>

              <p className="mt-8 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#CC8591]">
                Venue Location
              </p>

              <h2 className="mt-3 [font-family:var(--font-display)] text-[38px] font-semibold leading-[0.95] sm:text-[46px]">
                CITAM Valley Road
              </h2>

              <p className="mt-4 max-w-sm text-[13px] leading-7 text-[#0D1D34]/50">
                Nairobi, Kenya. The official interactive map will
                be activated after the exact venue link is
                confirmed.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#0D1D34]/10 bg-[#FAFAFA] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0D1D34]/50">
                <Map className="h-4 w-4 text-[#CC8591]" />

                Map Link Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              Venue Information
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[62px]">
              Plan Your EBBC2026 Visit
            </h2>

            <p className="mt-6 text-[14px] leading-7 text-[#0D1D34]/55">
              Registered participants will receive the final
              programme, arrival instructions and venue guidance
              before the convention.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {venueInformation.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-[22px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_16px_50px_rgba(13,29,52,0.05)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#CC8591]/15 text-[#CC8591]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#0D1D34]/40">
                    {item.label}
                  </p>

                  <p className="mt-3 text-sm font-extrabold leading-6">
                    {item.value}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAVEL */}
      <section className="bg-[#0D1D34] px-5 py-24 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
                Getting to the venue
              </p>

              <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[62px]">
                Prepare Your Journey to EBBC2026
              </h2>

              <p className="mt-6 text-[14px] leading-7 text-white/50">
                Plan to arrive early and allow enough time for
                Nairobi traffic, registration and entry checks.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {travelOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <article
                    key={option.title}
                    className="rounded-[23px] border border-white/10 bg-white/[0.055] p-6"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#CC8591] text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold">
                      {option.title}
                    </h3>

                    <p className="mt-4 text-[12px] leading-6 text-white/48">
                      {option.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              Venue Questions
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[62px]">
              Before You Travel
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {venueFaqs.map((faq) => (
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

      {/* SUPPORT CTA */}
      <section className="px-5 sm:px-8">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[30px] bg-[#CC8591] px-6 py-14 text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(13,29,52,0.32),transparent_38%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6" />

                <p className="text-[9px] font-extrabold uppercase tracking-[0.23em] text-white/70">
                  Participant Support
                </p>
              </div>

              <h2 className="mt-5 [font-family:var(--font-display)] text-[42px] font-semibold leading-[0.95] sm:text-[54px]">
                Need Help Planning Your Visit?
              </h2>

              <p className="mt-4 max-w-2xl text-[13px] leading-7 text-white/75">
                Contact the EBBC2026 team for venue, accessibility
                or group-registration assistance.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${EBBC2026.contacts.primaryPhone}`}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-[#0D1D34] transition hover:bg-[#0D1D34] hover:text-white"
              >
                <Phone className="h-4 w-4" />

                Call the Team
              </a>

              <Link
                href={EBBC2026.routes.contact}
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-[#0D1D34]"
              >
                Contact Page

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}