import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  Globe2,
  HeartHandshake,
  Layers3,
  MapPin,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Salons Assured Kenya Ltd",
  description:
    "Learn about Salons Assured Kenya Ltd, a beauty industry support company providing recruitment, staffing, training, business systems, documentation, consulting and growth support for salons, spas, barbershops, investors and beauty professionals.",
};

const focusAreas = [
  {
    title: "Recruitment & Staffing",
    text: "Connecting beauty businesses with suitable talent through structured sourcing, screening and placement support.",
    icon: UsersRound,
  },
  {
    title: "Training & Development",
    text: "Helping teams improve service standards, professionalism, sales confidence, customer care and performance.",
    icon: BadgeCheck,
  },
  {
    title: "Business Systems",
    text: "Supporting beauty businesses with SOPs, documentation, checklists, staff structures and daily operating tools.",
    icon: ClipboardCheck,
  },
  {
    title: "Consulting & Growth",
    text: "Guiding owners, managers and investors with operational improvement, accountability and business growth direction.",
    icon: BriefcaseBusiness,
  },
];

const values = [
  {
    title: "Professionalism",
    text: "We believe beauty businesses should operate with clear standards, respectful service and dependable systems.",
  },
  {
    title: "Structure",
    text: "Strong businesses are not built on talent alone. They need processes, documents, responsibilities and accountability.",
  },
  {
    title: "Growth",
    text: "Our support is designed to help beauty businesses become easier to manage, easier to trust and better positioned for growth.",
  },
  {
    title: "Industry Understanding",
    text: "We focus on the real needs of salons, spas, barbershops, nail studios, beauty professionals and beauty investors.",
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

const approach = [
  {
    label: "Understand",
    text: "We first understand the business stage, staff challenges, operational gaps and growth goals.",
  },
  {
    label: "Structure",
    text: "We organise the right solution, whether it is recruitment, training, systems, documentation or consulting.",
  },
  {
    label: "Support",
    text: "We help beauty businesses implement practical actions that improve professionalism and consistency.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071b33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,117,134,0.34),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(217,163,175,0.14),transparent_30%)]" />
        <div className="absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-28 h-[420px] w-[420px] rounded-full bg-[#b87586]/14 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:py-28">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#d9a3af]">
              About Salons Assured
            </p>

            <h1 className="mt-6 max-w-5xl font-serif text-[48px] font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-[66px] lg:text-[82px]">
              Building stronger beauty businesses through{" "}
              <span className="bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text italic text-transparent">
                people, systems and growth support.
              </span>
            </h1>
          </div>

          <div className="lg:pb-3">
            <p className="text-[16px] leading-8 text-white/75 sm:text-[18px]">
              Salons Assured Kenya Ltd supports salons, spas, barbershops, nail
              studios, beauty investors and beauty professionals with
              recruitment, training, business systems, documentation,
              consulting and growth support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d9a3af]/60 bg-white/5 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro story */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.08),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(244,223,229,0.62),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 border-y border-[#ead5db] py-14 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                Who We Are
              </p>

              <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[56px]">
                A specialist support partner for the beauty industry.
              </h2>
            </div>

            <div className="grid gap-6 text-[16px] leading-8 text-slate-700 sm:text-[17px]">
              <p>
                Salons Assured Kenya Ltd exists to help beauty businesses move
                from informal operations to structured, professional and
                growth-focused businesses.
              </p>

              <p>
                Many salons, spas, barbershops and beauty businesses struggle
                with staffing, staff discipline, service standards, daily
                operations, documentation, training and business visibility. Our
                role is to bring structure into these areas so owners and
                managers can operate with more clarity and confidence.
              </p>

              <p>
                We work with beauty business owners, investors, managers, job
                seekers and professionals who want better standards, stronger
                teams and a more organised way of running beauty businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#071b33] p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#d9a3af]/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#d9a3af] ring-1 ring-white/10">
                  <Target className="h-6 w-6" />
                </div>

                <p className="mt-8 text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                  Our Mission
                </p>

                <h2 className="mt-4 font-serif text-[34px] font-black leading-tight tracking-[-0.04em] sm:text-[44px]">
                  To strengthen beauty businesses through people, structure and
                  practical business support.
                </h2>

                <p className="mt-6 text-[15px] leading-8 text-white/72">
                  We help beauty businesses improve hiring, staff development,
                  operating systems, service delivery and business growth
                  direction.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white p-8 sm:p-10 lg:p-12">
              <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#d9a3af]/20 blur-3xl" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                  <Globe2 className="h-6 w-6" />
                </div>

                <p className="mt-8 text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                  Our Vision
                </p>

                <h2 className="mt-4 font-serif text-[34px] font-black leading-tight tracking-[-0.04em] text-[#071b33] sm:text-[44px]">
                  To raise the standard of beauty businesses locally and
                  internationally.
                </h2>

                <p className="mt-6 text-[15px] leading-8 text-slate-700">
                  We envision a beauty industry where businesses are better
                  structured, teams are more professional, and client experience
                  is consistently elevated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we focus on */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                What We Focus On
              </p>

              <h2 className="mt-5 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[56px]">
                Practical support for the areas that affect daily business
                performance.
              </h2>
            </div>

            <div className="border-y border-[#ead5db]">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div
                    key={area.title}
                    className="grid gap-6 border-b border-[#ead5db] py-8 last:border-b-0 md:grid-cols-[80px_1fr]"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-[30px] font-black leading-tight tracking-[-0.035em] text-[#071b33] sm:text-[38px]">
                        {area.title}
                      </h3>

                      <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-700 sm:text-[16px]">
                        {area.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Who we support */}
      <section className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(184,117,134,0.28),transparent_28%),radial-gradient(circle_at_90%_84%,rgba(217,163,175,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                Who We Support
              </p>

              <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[56px]">
                Built for the full beauty business ecosystem.
              </h2>
            </div>

            <div className="grid gap-0 border-y border-white/10 sm:grid-cols-2">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="border-b border-white/10 py-5 sm:border-r sm:px-6 sm:nth-[2n]:border-r-0"
                >
                  <p className="font-serif text-[28px] font-black tracking-[-0.035em] text-white">
                    {audience}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                Our Values
              </p>

              <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[54px]">
                The standards behind our work.
              </h2>
            </div>

            <div className="border-y border-[#ead5db]">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="grid gap-5 border-b border-[#ead5db] py-7 last:border-b-0 md:grid-cols-[0.32fr_0.68fr]"
                >
                  <h3 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33]">
                    {value.title}
                  </h3>

                  <p className="text-[15px] leading-8 text-slate-700 sm:text-[16px]">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                Our Approach
              </p>

              <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[56px]">
                We listen, structure and support implementation.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-700">
                Every business is different. Our approach is practical,
                structured and focused on helping beauty businesses improve the
                areas that matter most.
              </p>
            </div>

            <div className="grid gap-6">
              {approach.map((step) => (
                <div
                  key={step.label}
                  className="relative overflow-hidden rounded-[1.5rem] border border-[#ead5db] bg-white p-7 shadow-sm"
                >
                  <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-[#d9a3af]/20 blur-2xl" />

                  <div className="relative flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af]">
                      <Layers3 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33]">
                        {step.label}
                      </h3>

                      <p className="mt-3 text-[15px] leading-7 text-slate-700">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location / CTA */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#071b33] p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(184,117,134,0.28),transparent_28%),radial-gradient(circle_at_86%_86%,rgba(217,163,175,0.14),transparent_30%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                  Based in Runda, Supporting Growth Beyond Location
                </p>

                <h2 className="mt-5 font-serif text-[38px] font-black leading-tight tracking-[-0.04em] sm:text-[54px]">
                  Ready to build a more structured beauty business?
                </h2>

                <div className="mt-6 flex items-center gap-3 text-white/75">
                  <MapPin className="h-5 w-5 text-[#d9a3af]" />
                  <span>Kwaheri Road, Runda, Kenya</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white transition hover:from-[#a76476] hover:to-[#df789a]"
                >
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/recruitment"
                  className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d9a3af]/60 bg-white/5 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  Request Staff
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}