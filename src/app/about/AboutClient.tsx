"use client";

import Image from "next/image";
import Link from "next/link";

import type {
  ComponentType,
  ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Target,
  UsersRound,
} from "lucide-react";

type IconComponent =
  ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

type ServicePillar = {
  number: string;
  title: string;
  description: string;
  icon: IconComponent;
};

type DirectionItem = {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: IconComponent;
};

type WorkArea = {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: IconComponent;
};

type Audience = {
  number: string;
  title: string;
  description: string;
  href: string;
  action: string;
  icon: IconComponent;
};

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const overviewItems = [
  {
    value: "1",
    label:
      "Specialist Industry",
    detail:
      "Beauty, wellness and professional grooming",
  },
  {
    value: "6",
    label:
      "Connected Pillars",
    detail:
      "From recruitment and systems to setup and growth",
  },
  {
    value: "3",
    label:
      "Growth Pathways",
    detail:
      "Owners, investors and beauty professionals",
  },
  {
    value:
      "360°",
    label:
      "Business View",
    detail:
      "People, operations, clients and performance",
  },
];

const servicePillars: ServicePillar[] = [
  {
    number: "01",
    title:
      "Recruitment & Staffing",
    description:
      "Defining roles, sourcing professionals, screening candidates, supporting interviews and strengthening placement decisions.",
    icon:
      UsersRound,
  },
  {
    number: "02",
    title:
      "Training & Development",
    description:
      "Building capability in customer care, professionalism, sales, service delivery, leadership and workplace standards.",
    icon:
      GraduationCap,
  },
  {
    number: "03",
    title:
      "Business Systems",
    description:
      "Creating SOPs, HR documents, reporting tools, checklists, controls, scorecards and accountability structures.",
    icon:
      ClipboardCheck,
  },
  {
    number: "04",
    title:
      "Business Setup & Launch",
    description:
      "Supporting planning, staffing structures, equipment decisions, suppliers, operational readiness and launch execution.",
    icon:
      Target,
  },
  {
    number: "05",
    title:
      "Digital Growth",
    description:
      "Strengthening online visibility, content direction, customer acquisition, brand presentation and digital convenience.",
    icon:
      BriefcaseBusiness,
  },
  {
    number: "06",
    title:
      "Management Consulting",
    description:
      "Improving leadership, productivity, service standards, financial visibility, client experience and sustainable growth.",
    icon:
      BadgeCheck,
  },
];

const directionItems: DirectionItem[] = [
  {
    number: "01",
    label:
      "Our Mission",
    title:
      "To strengthen the business behind every beauty service.",
    description:
      "We help beauty businesses improve their people, operations, systems, client experience and management decisions through practical industry-specific support.",
    icon:
      Target,
  },
  {
    number: "02",
    label:
      "Our Vision",
    title:
      "A more structured, trusted and investable beauty industry.",
    description:
      "We envision beauty businesses across Kenya and Africa operating with professional standards, accountable teams and scalable commercial models.",
    icon:
      BriefcaseBusiness,
  },
  {
    number: "03",
    label:
      "Our Promise",
    title:
      "Advice that moves beyond discussion into implementation.",
    description:
      "Our recommendations are translated into priorities, documents, responsibilities, training actions and practical management routines.",
    icon:
      BadgeCheck,
  },
];

const processSteps = [
  {
    number: "01",
    title:
      "Listen",
    description:
      "We understand the business, the people involved and the challenge from the client’s perspective.",
  },
  {
    number: "02",
    title:
      "Diagnose",
    description:
      "We separate visible symptoms from the deeper staffing, systems, management or service issue.",
  },
  {
    number: "03",
    title:
      "Design",
    description:
      "We develop a practical response shaped around the business stage, resources and priorities.",
  },
  {
    number: "04",
    title:
      "Implement",
    description:
      "We support execution through recruitment, documentation, training, onboarding and management action.",
  },
  {
    number: "05",
    title:
      "Strengthen",
    description:
      "We review progress, improve accountability and establish stronger long-term routines.",
  },
];

const workAreas: WorkArea[] = [
  {
    number: "01",
    label:
      "Operations",
    title:
      "Operational onboarding and management support",
    description:
      "Working with owners, managers and teams to clarify roles, observe workflow, identify gaps and improve daily operating discipline.",
    icon:
      BriefcaseBusiness,
  },
  {
    number: "02",
    label:
      "Assessment",
    title:
      "Business and team assessments",
    description:
      "Reviewing staff structure, service delivery, customer handling, management, productivity and opportunities for improvement.",
    icon:
      ClipboardCheck,
  },
  {
    number: "03",
    label:
      "People",
    title:
      "Recruitment, interviews and onboarding",
    description:
      "Supporting role definition, candidate sourcing, interview processes, staff placement and preparation for the working environment.",
    icon:
      UsersRound,
  },
  {
    number: "04",
    label:
      "Performance",
    title:
      "Training and professional development",
    description:
      "Helping teams improve etiquette, customer experience, communication, sales confidence, professionalism and service standards.",
    icon:
      GraduationCap,
  },
  {
    number: "05",
    label:
      "Launch",
    title:
      "Setup and launch-readiness support",
    description:
      "Preparing staffing, equipment, products, workflows, reception standards, team alignment and operational priorities before opening.",
    icon:
      Target,
  },
  {
    number: "06",
    label:
      "Growth",
    title:
      "Management and visibility support",
    description:
      "Strengthening business presentation, leadership, accountability, client acquisition and long-term growth direction.",
    icon:
      BadgeCheck,
  },
];

const audiences: Audience[] = [
  {
    number: "01",
    title:
      "Beauty Business Owners",
    description:
      "For owners strengthening an existing salon, spa, barbershop, studio or growing beauty brand.",
    href:
      "/business-owners",
    action:
      "Explore owner support",
    icon:
      BriefcaseBusiness,
  },
  {
    number: "02",
    title:
      "Beauty Industry Investors",
    description:
      "For local, diaspora and international investors planning, launching or expanding a beauty venture.",
    href:
      "/investors",
    action:
      "Explore investor support",
    icon:
      Target,
  },
  {
    number: "03",
    title:
      "Beauty Professionals",
    description:
      "For skilled professionals seeking career opportunities, stronger industry connections and long-term progression.",
    href:
      "/job-seekers",
    action:
      "Explore opportunities",
    icon:
      UsersRound,
  },
];

const values = [
  {
    number: "01",
    title:
      "Structure",
    description:
      "Clear roles, procedures and management routines create confidence, stability and consistency.",
  },
  {
    number: "02",
    title:
      "Professionalism",
    description:
      "The way a business communicates, serves, manages and presents itself matters.",
  },
  {
    number: "03",
    title:
      "Accountability",
    description:
      "Expectations should be clear, performance visible and agreed actions followed through.",
  },
  {
    number: "04",
    title:
      "Client Experience",
    description:
      "Strong businesses are built around service quality, trust, retention and responsible client care.",
  },
  {
    number: "05",
    title:
      "Practicality",
    description:
      "Recommendations must be realistic, usable and appropriate for the business involved.",
  },
  {
    number: "06",
    title:
      "Sustainable Growth",
    description:
      "Growth should be supported by capable people, reliable systems and informed decisions.",
  },
];

const socialLinks = [
  {
    number: "01",
    label:
      "Facebook",
    note:
      "Business updates, industry conversations and community activity",
    href:
      "https://www.facebook.com/salonsassuredkenya/",
  },
  {
    number: "02",
    label:
      "Instagram",
    note:
      "Beauty-business insights, events, training and behind-the-scenes work",
    href:
      "https://www.instagram.com/salonsassured/",
  },
  {
    number: "03",
    label:
      "TikTok",
    note:
      "Short-form industry guidance and practical business conversations",
    href:
      "https://www.tiktok.com/@salonsassuredkenya",
  },
  {
    number: "04",
    label:
      "Google Location",
    note:
      "Kwaheri Road, Runda, Nairobi",
    href:
      "https://www.google.com/maps/search/?api=1&query=Salons%20Assured%20Kenya%2C%20Kwaheri%20Road%2C%20Runda%2C%20Nairobi",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children:
    ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y:
          shouldReduceMotion
            ? 0
            : 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.8,
        delay:
          shouldReduceMotion
            ? 0
            : delay,
        ease:
          premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({
  children,
  light = false,
}: {
  children:
    ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={[
          "h-px w-10",
          light
            ? "bg-[#d9a3af]"
            : "bg-[#b87586]",
        ].join(" ")}
      />

      <p
        className={[
          "text-[9px] font-extrabold uppercase tracking-[0.31em]",
          light
            ? "text-[#d9a3af]"
            : "text-[#b87586]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

export default function AboutClient() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <main
      id="top"
      className="overflow-hidden bg-white text-[#071b33]"
    >
      {/* HERO */}
      <section className="relative isolate min-h-[860px] overflow-hidden bg-[#071b33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(217,163,175,0.23),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_75%_88%,rgba(184,117,134,0.16),transparent_34%)]" />

          <div className="absolute -left-52 -top-44 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />

          <div className="absolute -bottom-72 -right-60 h-[650px] w-[650px] rounded-full border border-[#d9a3af]/10" />
        </div>

        <div className="relative mx-auto grid min-h-[860px] max-w-[1380px] gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-32">
          <motion.div
            initial={{
              opacity: 0,
              y:
                shouldReduceMotion
                  ? 0
                  : 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.9,
              ease:
                premiumEase,
            }}
            className="relative z-10"
          >
            <SectionLabel light>
              About Salons Assured
            </SectionLabel>

            <h1 className="mt-8 max-w-[820px] [font-family:var(--font-display)] text-[56px] font-semibold leading-[0.87] tracking-[-0.067em] sm:text-[78px] lg:text-[99px]">
              We build the business
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                behind the beauty.
              </span>
            </h1>

            <p className="mt-8 max-w-[690px] text-[16px] leading-8 text-white/72 sm:text-[18px]">
              Salons Assured Kenya is a specialist beauty-business
              growth partner. We strengthen the people, systems,
              service standards and decisions behind salons, spas,
              barbershops, studios and beauty ventures.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-7 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#071b33] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Start a conversation

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#our-story"
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-white/20 px-7 text-[10px] font-extrabold uppercase tracking-[0.17em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-white/[0.07]"
              >
                Discover our approach

                <ArrowUpRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-7">
              {[
                "People",
                "Systems",
                "Service",
                "Growth",
              ].map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={item}
                    className="flex items-center gap-5"
                  >
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/55">
                      {item}
                    </span>

                    {index <
                      3 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3af]" />
                    )}
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x:
                shouldReduceMotion
                  ? 0
                  : 45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.12,
              ease:
                premiumEase,
            }}
            className="relative"
          >
            <div className="relative min-h-[560px] overflow-hidden rounded-t-[14rem] rounded-b-[2rem] border border-white/15 bg-white/[0.06] shadow-[0_45px_140px_rgba(0,0,0,0.42)] sm:min-h-[680px]">
              <Image
                src="/hero-slide-1.webp"
                alt="Beauty business professionals working inside a premium salon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-transparent to-[#071b33]/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
                  The SAK Difference
                </p>

                <p className="mt-4 max-w-lg [font-family:var(--font-display)] text-[32px] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-[42px]">
                  Beauty expertise supported by serious business
                  structure.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden max-w-[270px] border border-[#ead5db] bg-white p-6 text-[#071b33] shadow-[0_26px_80px_rgba(7,27,51,0.22)] sm:block">
              <BriefcaseBusiness className="h-5 w-5 text-[#b87586]" />

              <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                Connected Support
              </p>

              <p className="mt-3 [font-family:var(--font-display)] text-[26px] font-semibold leading-[1] tracking-[-0.035em]">
                One business. Every part working together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-b border-[#071b33]/10 bg-[#f8f5f3]">
        <div className="mx-auto grid max-w-[1380px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          {overviewItems.map(
            (
              item,
              index,
            ) => (
              <div
                key={item.label}
                className={[
                  "min-h-[170px] border-[#071b33]/10 px-4 py-8 sm:px-7",
                  index % 2 ===
                  0
                    ? "border-r"
                    : "",
                  index < 2
                    ? "border-b lg:border-b-0"
                    : "",
                  "lg:border-r lg:last:border-r-0",
                ].join(" ")}
              >
                <p className="[font-family:var(--font-display)] text-[48px] font-semibold leading-none tracking-[-0.055em] text-[#b87586]">
                  {item.value}
                </p>

                <p className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#071b33]">
                  {item.label}
                </p>

                <p className="mt-3 text-[11px] leading-5 text-[#071b33]/55">
                  {item.detail}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full border border-[#b87586]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <Reveal className="relative">
            <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_35px_100px_rgba(7,27,51,0.18)] sm:min-h-[680px]">
              <Image
                src="/why-choose-us.png"
                alt="Beauty business consultation and operational support"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/90 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                  Our Perspective
                </p>

                <p className="mt-5 max-w-[600px] [font-family:var(--font-display)] text-[32px] font-semibold italic leading-[1] tracking-[-0.04em] sm:text-[43px]">
                  Talent delivers the service. Structure builds the
                  business.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="lg:pl-8"
          >
            <SectionLabel>
              Our Story
            </SectionLabel>

            <h2 className="mt-7 max-w-[780px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.93] tracking-[-0.054em] sm:text-[64px] lg:text-[73px]">
              Beauty businesses deserve more than
              <span className="ml-3 font-medium italic text-[#b87586]">
                trial and error.
              </span>
            </h2>

            <div className="mt-8 max-w-[720px] space-y-6 text-[15px] leading-8 text-[#071b33]/65">
              <p>
                The beauty industry contains exceptional technical
                talent. However, talent alone does not define roles,
                manage performance, control stock, retain clients,
                build management discipline or create sustainable
                growth.
              </p>

              <p>
                Salons Assured exists to close that gap. We bring a
                structured business perspective to an industry that
                is often forced to grow through experience,
                pressure and costly mistakes.
              </p>

              <p>
                Our role is to help owners, investors, managers and
                professionals understand the whole business, make
                better decisions and put practical structures behind
                their ambitions.
              </p>
            </div>

            <div className="mt-9 border-y border-[#071b33]/10">
              {[
                "Industry-specific thinking",
                "Practical operating tools",
                "Implementation support",
                "Clearer business decisions",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-[#071b33]/10 py-4 last:border-b-0"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#b87586]/35 text-[#b87586]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                    </span>

                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#071b33]/68">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIX PILLARS */}
      <section className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(217,163,175,0.2),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(184,117,134,0.13),transparent_32%)]" />

        <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-9 border-b border-white/15 pb-11 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <SectionLabel light>
                The SAK Business Model
              </SectionLabel>

              <h2 className="mt-7 max-w-[850px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-[65px] lg:text-[76px]">
                Six connected pillars.
                <span className="ml-3 font-medium italic text-[#d9a3af]">
                  One stronger business.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-8 text-white/65">
              A business may begin with one immediate need, but
              stronger results come from understanding how its
              people, operations, service, visibility and
              leadership affect one another.
            </p>
          </Reveal>

          <div className="mt-2 grid md:grid-cols-2 xl:grid-cols-3">
            {servicePillars.map(
              (
                pillar,
                index,
              ) => {
                const Icon =
                  pillar.icon;

                return (
                  <Reveal
                    key={pillar.number}
                    delay={
                      index *
                      0.05
                    }
                    className={[
                      "group relative min-h-[330px] border-white/15 p-7 transition-colors duration-500 hover:bg-white/[0.045] sm:p-9",
                      index < 3
                        ? "border-b"
                        : "",
                      index % 2 ===
                      0
                        ? "md:border-r"
                        : "",
                      index % 3 !==
                      2
                        ? "xl:border-r"
                        : "xl:border-r-0",
                      index === 2
                        ? "md:border-r-0 xl:border-r"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="[font-family:var(--font-display)] text-[30px] font-semibold italic text-[#d9a3af]/60">
                        {pillar.number}
                      </span>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d9a3af] transition-all duration-500 group-hover:border-[#d9a3af] group-hover:bg-[#d9a3af] group-hover:text-[#071b33]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>

                    <h3 className="mt-12 [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.95] tracking-[-0.043em]">
                      {pillar.title}
                    </h3>

                    <p className="mt-5 max-w-[390px] text-[12px] leading-7 text-white/58">
                      {pillar.description}
                    </p>

                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d9a3af] transition-all duration-700 group-hover:w-full" />
                  </Reveal>
                );
              },
            )}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/services"
              className="group inline-flex h-[52px] items-center gap-4 rounded-full border border-white/20 px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
            >
              Explore all services

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECTION */}
      <section className="bg-[#f8f5f3] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>
                Direction
              </SectionLabel>

              <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[65px]">
                What we are
                <span className="ml-3 font-medium italic text-[#b87586]">
                  building toward.
                </span>
              </h2>
            </div>

            <p className="max-w-[670px] text-[15px] leading-8 text-[#071b33]/62 lg:justify-self-end">
              Our work is guided by a clear belief: a stronger
              beauty industry creates better businesses, more
              sustainable careers and more confident investment.
            </p>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-3">
            {directionItems.map(
              (
                item,
                index,
              ) => {
                const Icon =
                  item.icon;

                return (
                  <Reveal
                    key={item.number}
                    delay={
                      index *
                      0.07
                    }
                    className={[
                      "group relative min-h-[430px] border border-[#071b33]/10 bg-white p-7 sm:p-9",
                      index > 0
                        ? "lg:border-l-0"
                        : "",
                      index === 1
                        ? "bg-[#d9a3af]"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="[font-family:var(--font-display)] text-[25px] font-semibold italic text-[#b87586]">
                        {item.number}
                      </span>

                      <span
                        className={[
                          "flex h-11 w-11 items-center justify-center rounded-full border",
                          index === 1
                            ? "border-[#071b33]/20 text-[#071b33]"
                            : "border-[#071b33]/10 text-[#b87586]",
                        ].join(" ")}
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>

                    <p
                      className={[
                        "mt-14 text-[8px] font-extrabold uppercase tracking-[0.28em]",
                        index === 1
                          ? "text-[#071b33]/60"
                          : "text-[#b87586]",
                      ].join(" ")}
                    >
                      {item.label}
                    </p>

                    <h3 className="mt-5 [font-family:var(--font-display)] text-[36px] font-semibold leading-[0.96] tracking-[-0.043em]">
                      {item.title}
                    </h3>

                    <p
                      className={[
                        "mt-6 text-[13px] leading-7",
                        index === 1
                          ? "text-[#071b33]/68"
                          : "text-[#071b33]/58",
                      ].join(" ")}
                    >
                      {item.description}
                    </p>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/10 pb-12 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <SectionLabel>
                How We Work
              </SectionLabel>

              <h2 className="mt-7 max-w-[880px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[65px] lg:text-[74px]">
                From business challenge to
                <span className="ml-3 font-medium italic text-[#b87586]">
                  practical change.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-8 text-[#071b33]/62">
              We do not begin with a predetermined package. We
              begin by understanding the business and building the
              right pathway forward.
            </p>
          </Reveal>

          <div className="relative mt-12">
            <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-[#071b33]/12 lg:block" />

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
                amount: 0.6,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 1.4,
                delay: 0.15,
                ease:
                  premiumEase,
              }}
              className="absolute left-[10%] right-[10%] top-7 hidden h-[2px] origin-left bg-[#b87586] lg:block"
            />

            <div className="grid gap-6 lg:grid-cols-5">
              {processSteps.map(
                (
                  step,
                  index,
                ) => (
                  <Reveal
                    key={step.number}
                    delay={
                      index *
                      0.07
                    }
                    className="relative border border-[#071b33]/10 bg-[#f8f5f3] p-6 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-white bg-[#b87586] text-[12px] font-extrabold text-white shadow-[0_12px_35px_rgba(7,27,51,0.16)] lg:mx-auto">
                      {step.number}
                    </div>

                    <h3 className="mt-7 [font-family:var(--font-display)] text-[31px] font-semibold leading-none tracking-[-0.04em]">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-4 max-w-[235px] text-[11px] leading-6 text-[#071b33]/55">
                      {step.description}
                    </p>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WORK IN ACTION */}
      <section className="relative overflow-hidden bg-[#d9a3af] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full border border-[#071b33]/10" />

        <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-9 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <SectionLabel>
                Work in Action
              </SectionLabel>

              <h2 className="mt-7 max-w-[900px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px] lg:text-[76px]">
                Our work happens
                <span className="ml-3 font-medium italic text-white">
                  inside real businesses.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-8 text-[#071b33]/68">
              Our assignments involve operational onboarding,
              assessments, recruitment, launch readiness, team
              training, documentation and management support.
            </p>
          </Reveal>

          <div className="mt-14 overflow-hidden border-y border-[#071b33]/15 bg-white">
            {workAreas.map(
              (
                area,
                index,
              ) => {
                const Icon =
                  area.icon;

                return (
                  <Reveal
                    key={area.number}
                    delay={
                      index *
                      0.04
                    }
                  >
                    <article className="group relative grid gap-6 border-b border-[#071b33]/10 px-6 py-8 last:border-b-0 transition-colors duration-500 hover:bg-[#fbf4f6] sm:grid-cols-[58px_64px_0.85fr_1.15fr_42px] sm:items-center sm:px-9">
                      <span className="[font-family:var(--font-display)] text-[26px] font-semibold italic text-[#b87586]/65 transition-colors group-hover:text-[#b87586]">
                        {area.number}
                      </span>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition-all duration-500 group-hover:border-[#071b33] group-hover:bg-[#071b33] group-hover:text-white">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </span>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                          {area.label}
                        </p>

                        <h3 className="mt-3 [font-family:var(--font-display)] text-[29px] font-semibold leading-[0.98] tracking-[-0.038em]">
                          {area.title}
                        </h3>
                      </div>

                      <p className="max-w-[650px] text-[12px] leading-7 text-[#071b33]/60">
                        {area.description}
                      </p>

                      <ArrowRight className="hidden h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1.5 sm:block" />

                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b87586] transition-all duration-700 group-hover:w-full" />
                    </article>
                  </Reveal>
                );
              },
            )}
          </div>

          <p className="mt-7 max-w-[760px] text-[11px] leading-6 text-[#071b33]/62">
            Client names and detailed outcomes are published through
            approved case studies where permission for public use
            has been confirmed.
          </p>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="max-w-[930px]">
            <SectionLabel>
              The Beauty Ecosystem
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px] lg:text-[76px]">
              One industry.
              <span className="ml-3 font-medium italic text-[#b87586]">
                Three pathways forward.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-3">
            {audiences.map(
              (
                audience,
                index,
              ) => {
                const Icon =
                  audience.icon;

                return (
                  <Reveal
                    key={audience.number}
                    delay={
                      index *
                      0.07
                    }
                    className={[
                      "group relative min-h-[440px] overflow-hidden border border-[#071b33]/10 p-7 sm:p-9",
                      index > 0
                        ? "lg:border-l-0"
                        : "",
                      index === 1
                        ? "bg-[#071b33] text-white"
                        : "bg-[#f8f5f3]",
                    ].join(" ")}
                  >
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[300px] w-[300px] rounded-full border border-[#b87586]/15 transition-transform duration-[1000ms] group-hover:scale-110" />

                    <div className="relative z-10 flex items-start justify-between">
                      <span
                        className={[
                          "[font-family:var(--font-display)] text-[29px] font-semibold italic",
                          index === 1
                            ? "text-[#d9a3af]"
                            : "text-[#b87586]",
                        ].join(" ")}
                      >
                        {audience.number}
                      </span>

                      <span
                        className={[
                          "flex h-12 w-12 items-center justify-center rounded-full border",
                          index === 1
                            ? "border-white/15 text-[#d9a3af]"
                            : "border-[#071b33]/10 text-[#b87586]",
                        ].join(" ")}
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>

                    <h3 className="relative z-10 mt-20 [font-family:var(--font-display)] text-[41px] font-semibold leading-[0.93] tracking-[-0.047em]">
                      {audience.title}
                    </h3>

                    <p
                      className={[
                        "relative z-10 mt-6 text-[13px] leading-7",
                        index === 1
                          ? "text-white/62"
                          : "text-[#071b33]/60",
                      ].join(" ")}
                    >
                      {audience.description}
                    </p>

                    <Link
                      href={audience.href}
                      className={[
                        "group/link relative z-10 mt-10 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]",
                        index === 1
                          ? "text-white"
                          : "text-[#071b33]",
                      ].join(" ")}
                    >
                      {audience.action}

                      <ArrowUpRight
                        className={[
                          "h-4 w-4 transition-transform duration-300 group-hover/link:rotate-45",
                          index === 1
                            ? "text-[#d9a3af]"
                            : "text-[#b87586]",
                        ].join(" ")}
                      />
                    </Link>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#f8f5f3] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.38fr_0.62fr] lg:px-10">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>
              Our Values
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[62px]">
              Standards that shape
              <span className="ml-3 font-medium italic text-[#b87586]">
                how we work.
              </span>
            </h2>

            <p className="mt-7 max-w-[430px] text-[14px] leading-8 text-[#071b33]/62">
              The quality of our advice matters, but so does the
              way we communicate, implement and remain accountable
              to the client.
            </p>

            <BadgeCheck
              className="mt-9 h-9 w-9 text-[#b87586]"
              strokeWidth={1.5}
            />
          </Reveal>

          <div className="border-y border-[#071b33]/10 bg-white">
            {values.map(
              (
                value,
                index,
              ) => (
                <Reveal
                  key={value.number}
                  delay={
                    index *
                    0.04
                  }
                >
                  <article className="group grid gap-5 border-b border-[#071b33]/10 px-6 py-8 last:border-b-0 sm:grid-cols-[70px_0.42fr_0.58fr] sm:items-start sm:px-9">
                    <span className="[font-family:var(--font-display)] text-[26px] font-semibold italic text-[#b87586]/65 transition-colors group-hover:text-[#b87586]">
                      {value.number}
                    </span>

                    <h3 className="[font-family:var(--font-display)] text-[31px] font-semibold leading-none tracking-[-0.04em]">
                      {value.title}
                    </h3>

                    <p className="text-[13px] leading-7 text-[#071b33]/60">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* LOCATION AND SOCIAL */}
      <section className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(217,163,175,0.2),transparent_30%),radial-gradient(circle_at_88%_85%,rgba(184,117,134,0.13),transparent_32%)]" />

        <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="flex flex-col justify-between border border-white/15 bg-white/[0.04] p-7 sm:p-10">
              <div>
                <SectionLabel light>
                  Our Base
                </SectionLabel>

                <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.91] tracking-[-0.054em] sm:text-[64px]">
                  Rooted in Nairobi.
                  <span className="block font-medium italic text-[#d9a3af]">
                    Built for a wider industry.
                  </span>
                </h2>

                <p className="mt-7 max-w-[520px] text-[14px] leading-8 text-white/65">
                  From our base in Runda, we support beauty
                  businesses, investors and professionals through
                  on-site, virtual and project-based engagements.
                </p>
              </div>

              <div className="mt-14 border-t border-white/15 pt-7">
                <div className="flex items-start gap-4">
                  <MapPin
                    className="mt-1 h-5 w-5 shrink-0 text-[#d9a3af]"
                    strokeWidth={1.7}
                  />

                  <div>
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#d9a3af]">
                      Visit Salons Assured
                    </p>

                    <p className="mt-3 [font-family:var(--font-display)] text-[28px] font-semibold leading-[1.05]">
                      Kwaheri Road
                      <br />
                      Runda, Nairobi
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Salons%20Assured%20Kenya%2C%20Kwaheri%20Road%2C%20Runda%2C%20Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]"
                >
                  Open location

                  <ArrowUpRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:rotate-45" />
                </a>
              </div>
            </div>

            <div className="bg-white text-[#071b33]">
              <div className="border-b border-[#071b33]/10 px-7 py-7 sm:px-9">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                  Follow the Work
                </p>

                <h3 className="mt-4 [font-family:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.043em] sm:text-[46px]">
                  Join the SAK community online.
                </h3>
              </div>

              <div>
                {socialLinks.map(
                  (social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-5 border-b border-[#071b33]/10 px-7 py-7 last:border-b-0 transition-colors duration-500 hover:bg-[#fbf4f6] sm:grid-cols-[55px_0.42fr_0.58fr_42px] sm:items-center sm:px-9"
                    >
                      <span className="[font-family:var(--font-display)] text-[22px] font-semibold italic text-[#b87586]/65 transition-colors group-hover:text-[#b87586]">
                        {social.number}
                      </span>

                      <p className="[font-family:var(--font-display)] text-[29px] font-semibold leading-none tracking-[-0.036em]">
                        {social.label}
                      </p>

                      <p className="text-[11px] leading-6 text-[#071b33]/55">
                        {social.note}
                      </p>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071b33]/10 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#d9a3af] py-20 text-[#071b33] sm:py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[430px] w-[430px] rounded-full border border-[#071b33]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_330px] lg:items-end lg:px-10">
          <Reveal>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#071b33]/60">
              Build With Salons Assured
            </p>

            <h2 className="mt-6 max-w-[980px] [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.89] tracking-[-0.058em] sm:text-[70px] lg:text-[84px]">
              Bring us the challenge.
              <span className="ml-3 font-medium italic text-white">
                We will help you see the business clearly.
              </span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="border-l border-[#071b33]/20 pl-6"
          >
            <p className="text-[14px] leading-8 text-[#071b33]/68">
              Speak with our team about recruitment, training,
              systems, setup, operations or beauty-business growth.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#071b33] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-1"
            >
              Book a consultation

              <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}