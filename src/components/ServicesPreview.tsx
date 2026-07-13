"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  GraduationCap,
  Megaphone,
  Store,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type Service = {
  number: string;
  title: string;
  shortDescription: string;
  href: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    number: "01",
    title: "Recruitment & Staffing",
    shortDescription:
      "Find, assess and place reliable beauty professionals who fit your standards, culture and business goals.",
    href: "/recruitment",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Training & Development",
    shortDescription:
      "Build stronger teams through practical training in service, professionalism, sales and customer care.",
    href: "/services#training-development",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Business Systems",
    shortDescription:
      "Create the procedures, documents and accountability structures required for consistent operations.",
    href: "/services#business-systems",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Business Setup & Launch",
    shortDescription:
      "Move from concept to opening with guidance on planning, equipment, staffing, suppliers and launch readiness.",
    href: "/services#business-setup",
    icon: Store,
  },
  {
    number: "05",
    title: "Digital Growth",
    shortDescription:
      "Improve visibility, customer acquisition and online convenience through focused digital support.",
    href: "/services#digital-growth",
    icon: Megaphone,
  },
  {
    number: "06",
    title: "Management Consultancy",
    shortDescription:
      "Strengthen leadership, productivity, profitability and long-term growth through ongoing advisory support.",
    href: "/services#management-consultancy",
    icon: TrendingUp,
  },
];

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

function ServiceArrow({
  light = false,
}: {
  light?: boolean;
}) {
  return (
    <span
      className={[
        "flex h-11 w-11 shrink-0 items-center justify-center",
        "rounded-full border transition-all duration-500",
        "group-hover:rotate-45",
        light
          ? "border-white/20 text-white group-hover:border-[#d9a3af] group-hover:bg-[#d9a3af] group-hover:text-[#071b33]"
          : "border-[#071b33]/15 text-[#071b33] group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white",
      ].join(" ")}
    >
      <ArrowUpRight
        className="h-4 w-4"
        strokeWidth={1.9}
      />
    </span>
  );
}

export default function ServicesPreview() {
  const shouldReduceMotion =
    useReducedMotion();

  const recruitment =
    services[0];

  const training =
    services[1];

  const systems =
    services[2];

  const setup =
    services[3];

  const digital =
    services[4];

  const consultancy =
    services[5];

  const RecruitmentIcon =
    recruitment.icon;

  const TrainingIcon =
    training.icon;

  const SystemsIcon =
    systems.icon;

  const SetupIcon =
    setup.icon;

  const DigitalIcon =
    digital.icon;

  const ConsultancyIcon =
    consultancy.icon;

  return (
    <section
      id="services-preview"
      className="relative isolate overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-32"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-72 -top-72 h-[680px] w-[680px] rounded-full border border-white/[0.05]" />

        <div className="absolute -right-40 -top-40 h-[410px] w-[410px] rounded-full border border-[#d9a3af]/10" />

        <div className="absolute -bottom-80 -left-72 h-[700px] w-[700px] rounded-full border border-white/[0.04]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(184,117,134,0.18),transparent_32%)]" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="grid gap-9 border-b border-white/[0.14] pb-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-end lg:gap-16 lg:pb-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d9a3af]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#d9a3af]">
                Our Services
              </p>
            </div>

            <p className="mt-7 max-w-[330px] text-[13px] leading-7 text-white/[0.52]">
              Connected support for the
              people, systems and decisions
              behind successful beauty
              businesses.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: premiumEase,
            }}
          >
            <h2 className="max-w-[940px] [font-family:var(--font-display)] text-[45px] font-semibold leading-[0.94] tracking-[-0.052em] sm:text-[59px] lg:text-[74px]">
              Everything your business needs
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                behind the chair.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* BENTO SERVICES GRID */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 lg:mt-14 lg:gap-5">
          {/* FEATURED RECRUITMENT CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              ease: premiumEase,
            }}
            className="md:col-span-7 md:row-span-2"
          >
            <Link
              href={recruitment.href}
              className="group relative block min-h-[500px] overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#102943] sm:min-h-[590px] lg:min-h-[650px]"
            >
              <Image
                src="/salon-team-success.webp"
                alt="A professional salon and beauty business team supported by Salons Assured Kenya"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-[#071b33]/25 to-[#071b33]/5" />

              <div className="absolute inset-0 bg-gradient-to-r from-[#071b33]/55 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/20 bg-[#071b33]/35 px-4 py-2.5 backdrop-blur-md sm:left-8 sm:top-8">
                <span className="[font-family:var(--font-display)] text-[15px] font-semibold italic text-[#d9a3af]">
                  {recruitment.number}
                </span>

                <span className="h-3 w-px bg-white/20" />

                <span className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-white">
                  Featured Service
                </span>
              </div>

              <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
                <ServiceArrow light />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9 lg:p-11">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-[#d9a3af] backdrop-blur-md">
                  <RecruitmentIcon
                    className="h-5 w-5"
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="mt-6 max-w-[620px] [font-family:var(--font-display)] text-[43px] font-semibold leading-[0.92] tracking-[-0.048em] text-white sm:text-[54px] lg:text-[64px]">
                  {recruitment.title}
                </h3>

                <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-white/[0.68] sm:text-[15px] sm:leading-8">
                  {
                    recruitment.shortDescription
                  }
                </p>

                <span className="mt-7 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#d9a3af]">
                  Explore recruitment

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* TRAINING CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.07,
              ease: premiumEase,
            }}
            className="md:col-span-5"
          >
            <Link
              href={training.href}
              className="group relative block min-h-[285px] overflow-hidden rounded-[28px] bg-[#f7f2f3] p-7 text-[#071b33] sm:p-8"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#071b33]/8 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <p className="[font-family:var(--font-display)] text-[16px] font-semibold italic text-[#b87586]">
                    {training.number}
                  </p>

                  <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af]">
                    <TrainingIcon
                      className="h-5 w-5"
                      strokeWidth={1.65}
                    />
                  </div>
                </div>

                <ServiceArrow />
              </div>

              <h3 className="relative z-10 mt-9 max-w-[430px] [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.96] tracking-[-0.042em] sm:text-[40px]">
                {training.title}
              </h3>

              <p className="relative z-10 mt-5 max-w-[440px] text-[13px] leading-7 text-[#071b33]/58">
                {
                  training.shortDescription
                }
              </p>
            </Link>
          </motion.div>

          {/* BUSINESS SYSTEMS CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.13,
              ease: premiumEase,
            }}
            className="md:col-span-5"
          >
            <Link
              href={systems.href}
              className="group relative block min-h-[345px] overflow-hidden rounded-[28px] border border-white/[0.13] bg-[#102943] p-7 sm:p-8"
            >
              <div className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full border border-[#d9a3af]/10 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <p className="[font-family:var(--font-display)] text-[16px] font-semibold italic text-[#d9a3af]">
                    {systems.number}
                  </p>

                  <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[#d9a3af]">
                    <SystemsIcon
                      className="h-5 w-5"
                      strokeWidth={1.65}
                    />
                  </div>
                </div>

                <ServiceArrow light />
              </div>

              <h3 className="relative z-10 mt-9 max-w-[430px] [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.96] tracking-[-0.042em] text-white sm:text-[40px]">
                {systems.title}
              </h3>

              <p className="relative z-10 mt-5 max-w-[440px] text-[13px] leading-7 text-white/[0.54]">
                {
                  systems.shortDescription
                }
              </p>
            </Link>
          </motion.div>

          {/* BUSINESS SETUP */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: premiumEase,
            }}
            className="md:col-span-4"
          >
            <Link
              href={setup.href}
              className="group relative block min-h-[360px] overflow-hidden rounded-[28px] bg-[#d9a3af] p-7 text-[#071b33] sm:p-8"
            >
              <div className="absolute -bottom-24 -right-20 h-60 w-60 rounded-full border border-[#071b33]/10 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071b33] text-white">
                  <SetupIcon
                    className="h-5 w-5"
                    strokeWidth={1.65}
                  />
                </div>

                <ServiceArrow />
              </div>

              <p className="relative z-10 mt-12 [font-family:var(--font-display)] text-[17px] font-semibold italic text-[#071b33]/55">
                {setup.number}
              </p>

              <h3 className="relative z-10 mt-4 [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.95] tracking-[-0.042em] sm:text-[40px]">
                {setup.title}
              </h3>

              <p className="relative z-10 mt-5 text-[13px] leading-7 text-[#071b33]/60">
                {setup.shortDescription}
              </p>
            </Link>
          </motion.div>

          {/* DIGITAL GROWTH */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.14,
              ease: premiumEase,
            }}
            className="md:col-span-4"
          >
            <Link
              href={digital.href}
              className="group relative block min-h-[360px] overflow-hidden rounded-[28px] border border-white/[0.13] bg-white/[0.045] p-7 backdrop-blur-sm sm:p-8"
            >
              <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(145deg,transparent_55%,rgba(217,163,175,0.09))]" />

              <div className="relative z-10 flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[#d9a3af]">
                  <DigitalIcon
                    className="h-5 w-5"
                    strokeWidth={1.65}
                  />
                </div>

                <ServiceArrow light />
              </div>

              <p className="relative z-10 mt-12 [font-family:var(--font-display)] text-[17px] font-semibold italic text-[#d9a3af]">
                {digital.number}
              </p>

              <h3 className="relative z-10 mt-4 [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.95] tracking-[-0.042em] text-white sm:text-[40px]">
                {digital.title}
              </h3>

              <p className="relative z-10 mt-5 text-[13px] leading-7 text-white/[0.54]">
                {digital.shortDescription}
              </p>
            </Link>
          </motion.div>

          {/* CONSULTANCY */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: premiumEase,
            }}
            className="md:col-span-4"
          >
            <Link
              href={consultancy.href}
              className="group relative block min-h-[360px] overflow-hidden rounded-[28px] bg-[#f7f2f3] p-7 text-[#071b33] sm:p-8"
            >
              <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full border border-[#b87586]/12 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b87586] text-white">
                  <ConsultancyIcon
                    className="h-5 w-5"
                    strokeWidth={1.65}
                  />
                </div>

                <ServiceArrow />
              </div>

              <p className="relative z-10 mt-12 [font-family:var(--font-display)] text-[17px] font-semibold italic text-[#b87586]">
                {consultancy.number}
              </p>

              <h3 className="relative z-10 mt-4 [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.95] tracking-[-0.042em] sm:text-[40px]">
                {consultancy.title}
              </h3>

              <p className="relative z-10 mt-5 text-[13px] leading-7 text-[#071b33]/58">
                {
                  consultancy.shortDescription
                }
              </p>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.75,
            ease: premiumEase,
          }}
          className="mt-14 flex flex-col gap-7 border-t border-white/[0.13] pt-9 sm:flex-row sm:items-center sm:justify-between lg:mt-20"
        >
          <p className="max-w-[670px] [font-family:var(--font-display)] text-[26px] font-medium italic leading-[1.15] tracking-[-0.025em] text-white/[0.68] sm:text-[31px]">
            Your business may need one
            service today and a complete
            growth system tomorrow.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="group inline-flex h-[52px] items-center gap-4 rounded-full border border-white/20 px-6 text-[10px] font-extrabold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#071b33]"
            >
              View all services

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex h-[52px] items-center gap-4 rounded-full bg-[#d9a3af] px-6 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#071b33] transition-all duration-300 hover:bg-white"
            >
              Book consultation

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}