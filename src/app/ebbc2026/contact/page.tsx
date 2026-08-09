import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ticket,
  Users,
} from "lucide-react";

import ContactForm from "./ContactForm";
import { EBBC2026 } from "@/lib/ebbc2026/config";

export const metadata: Metadata = {
  title:
    "Contact EBBC2026 | Elevate Beauty Business Convention",

  description:
    "Contact the EBBC2026 team for ticket assistance, group registration, sponsorship, exhibition and speaker enquiries.",

  alternates: {
    canonical: "/ebbc2026/contact",
  },

  openGraph: {
    title: "Contact the EBBC2026 Team",

    description:
      "Get assistance with EBBC2026 tickets, sponsorship, exhibitions, group registration and other convention enquiries.",

    url:
      "https://www.salonsassured.com/ebbc2026/contact",

    type: "website",
  },
};

const enquiryOptions = [
  {
    icon: Ticket,
    title: "Ticket Support",
    text:
      "Get assistance with registration, ticket details and convention access.",
  },
  {
    icon: Users,
    title: "Group Registration",
    text:
      "Register teams from salons, spas, businesses, schools or organisations.",
  },
  {
    icon: MessageCircle,
    title: "Speaker Applications",
    text:
      "Submit an enquiry about speaking or participating in the programme.",
  },
  {
    icon: Building2,
    title: "Exhibitors and Sponsors",
    text:
      "Ask about exhibition opportunities, partnerships and sponsorship packages.",
  },
];

export default function EBBC2026ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F5] pb-24 pt-32 text-[#0D1D34]">
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
                Contact EBBC2026
              </p>

              <h1 className="mt-5 [font-family:var(--font-display)] text-[52px] font-semibold leading-[0.94] tracking-[-0.05em] sm:text-[72px]">
                Speak With the Convention Team
              </h1>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-[15px] leading-8 text-[#0D1D34]/60">
                Get support with tickets, group
                registration, sponsorship,
                exhibition opportunities, speaker
                enquiries and general EBBC2026
                information.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="rounded-[28px] bg-[#0D1D34] p-7 text-white shadow-[0_28px_80px_rgba(13,29,52,0.2)] sm:p-9">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                  Direct Contact
                </p>

                <h2 className="mt-4 [font-family:var(--font-display)] text-[40px] font-semibold leading-[0.95]">
                  We Are Here to Assist
                </h2>

                <p className="mt-5 text-[13px] leading-7 text-white/55">
                  Contact the EBBC2026 team by
                  email, WhatsApp or phone for
                  assistance.
                </p>

                <div className="mt-8 space-y-3">
                  {/* EMAIL */}
                  <a
                    href="mailto:salonsassuredkenya@gmail.com"
                    className="group flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-4 transition hover:border-[#CC8591]/50 hover:bg-[#CC8591]/10"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[#CC8591]">
                        <Mail className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                          Email
                        </p>

                        <p className="mt-1 break-all text-sm font-extrabold">
                          salonsassuredkenya@gmail.com
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="ml-3 h-4 w-4 shrink-0 text-[#CC8591] transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* WHATSAPP */}
                  <a
                    href={EBBC2026.contacts.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-4 transition hover:border-[#CC8591]/50 hover:bg-[#CC8591]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-white/10 text-[#CC8591]">
                        <MessageCircle className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                          WhatsApp
                        </p>

                        <p className="mt-1 text-sm font-extrabold">
                          WhatsApp the Team
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-[#CC8591] transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* PRIMARY PHONE */}
                  <a
                    href={`tel:${EBBC2026.contacts.primaryPhone}`}
                    className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-4 transition hover:border-[#CC8591]/50 hover:bg-[#CC8591]/10"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-white/10 text-[#CC8591]">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                        Call
                      </p>

                      <p className="mt-1 text-sm font-extrabold">
                        0715 500 268
                      </p>
                    </div>
                  </a>

                  {/* SECONDARY PHONE */}
                  <a
                    href={`tel:${EBBC2026.contacts.secondaryPhone}`}
                    className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-4 transition hover:border-[#CC8591]/50 hover:bg-[#CC8591]/10"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-white/10 text-[#CC8591]">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/40">
                        Alternative Number
                      </p>

                      <p className="mt-1 text-sm font-extrabold">
                        0706 551 028
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-xs font-extrabold">
                        17–18 November 2026
                      </p>

                      <p className="mt-1 text-[11px] text-white/45">
                        Two convention days
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CC8591]" />

                    <div>
                      <p className="text-xs font-extrabold">
                        CITAM Valley Road
                      </p>

                      <p className="mt-1 text-[11px] text-white/45">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={EBBC2026.routes.tickets}
                className="group mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
              >
                Register for EBBC2026

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#CC8591]">
              How We Can Help
            </p>

            <h2 className="mt-5 [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[62px]">
              Choose the Support You Need
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryOptions.map((option) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="rounded-[23px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_18px_55px_rgba(13,29,52,0.05)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-[15px] bg-[#CC8591]/15 text-[#CC8591]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold">
                    {option.title}
                  </h3>

                  <p className="mt-4 text-[12px] leading-6 text-[#0D1D34]/50">
                    {option.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}