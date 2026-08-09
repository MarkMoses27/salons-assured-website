"use client";

import Image from "next/image";

import type {
  ComponentType,
  FormEvent,
  ReactNode,
} from "react";

import {
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Search,
  ShieldCheck,
  UserCheck,
  UsersRound,
} from "lucide-react";

type IconComponent =
  ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

type RecruitmentRequest =
  | "Request Staff"
  | "Apply for Jobs";

type ProcessStep = {
  number: string;
  title: string;
  text: string;
  icon: IconComponent;
};

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const employerPoints = [
  "Role definition and staffing guidance",
  "Candidate sourcing and initial screening",
  "Structured shortlisting and interview support",
  "Placement and onboarding guidance",
];

const professionalPoints = [
  "Submit your professional profile and experience",
  "Access opportunities within beauty businesses",
  "Be considered for roles matching your skills",
  "Receive guidance throughout the recruitment process",
];

const processSteps: ProcessStep[] = [
  {
    number:
      "01",

    title:
      "Request or Apply",

    text:
      "Employers submit their staffing requirements while beauty professionals submit their employment profiles.",

    icon:
      ClipboardCheck,
  },
  {
    number:
      "02",

    title:
      "Review and Screening",

    text:
      "We review the role, business environment, candidate experience, expectations and suitability.",

    icon:
      Search,
  },
  {
    number:
      "03",

    title:
      "Shortlisting",

    text:
      "Candidates who closely match the role requirements are organised into a focused shortlist.",

    icon:
      UsersRound,
  },
  {
    number:
      "04",

    title:
      "Interview Support",

    text:
      "We coordinate or support interviews so employers and candidates can assess professional fit.",

    icon:
      UserCheck,
  },
  {
    number:
      "05",

    title:
      "Selection and Placement",

    text:
      "The employer makes the final hiring decision and the selected professional prepares to join the business.",

    icon:
      Handshake,
  },
  {
    number:
      "06",

    title:
      "Onboarding Follow-Up",

    text:
      "Where applicable, we support communication, onboarding clarity and early placement follow-up.",

    icon:
      BadgeCheck,
  },
];

const roles = [
  "Salon Manager",
  "Hair Stylist",
  "Natural Hair Specialist",
  "Nail Technician",
  "Barber",
  "Spa Therapist",
  "Beauty Therapist",
  "Massage Therapist",
  "Receptionist",
  "Customer Care Officer",
  "Housekeeping Staff",
  "Makeup Artist",
  "Social Media Manager",
  "Salon Administrator",
  "Operations Supervisor",
];

const employerStandards = [
  {
    title:
      "Clear role definition",

    text:
      "We help employers clarify the position, responsibilities, experience level and working expectations.",

    icon:
      FileCheck2,
  },
  {
    title:
      "Better candidate fit",

    text:
      "Screening focuses on skills, experience, professionalism, expectations and suitability for the business.",

    icon:
      UserCheck,
  },
  {
    title:
      "Structured hiring",

    text:
      "A clear process reduces rushed recruitment decisions and improves communication between all parties.",

    icon:
      ShieldCheck,
  },
];

const professionalStandards = [
  {
    title:
      "Present yourself professionally",

    text:
      "Keep your CV, portfolio, certificates, references and work photographs organised and current.",
  },
  {
    title:
      "Be honest about your experience",

    text:
      "Clear information about your skills, strengths and development needs supports better placement decisions.",
  },
  {
    title:
      "Understand the opportunity",

    text:
      "Review the position, location, working schedule, responsibilities and expectations before accepting an interview.",
  },
];

const faqs = [
  {
    question:
      "How do I request staff for my salon, spa or barbershop?",

    answer:
      "Choose Request Staff in the recruitment form. Provide the role, business location, number of staff required, preferred experience and the date the person is needed. The Salons Assured team will review your request and follow up.",
  },
  {
    question:
      "Can beauty professionals apply through this page?",

    answer:
      "Yes. Select Apply for Jobs and submit your professional details, preferred position, experience, availability and a link to your CV or portfolio where available.",
  },
  {
    question:
      "Does submitting an application guarantee employment?",

    answer:
      "No. Applications are reviewed against available opportunities and employer requirements. Final employment decisions are made by the hiring business.",
  },
  {
    question:
      "What businesses do you recruit for?",

    answer:
      "We support salons, spas, barbershops, nail studios, wellness businesses, grooming businesses, beauty schools and related beauty brands.",
  },
  {
    question:
      "Who makes the final hiring decision?",

    answer:
      "The employer makes the final decision after reviewing shortlisted candidates and completing the relevant interview or practical assessment.",
  },
  {
    question:
      "What types of professionals can apply?",

    answer:
      "Managers, stylists, natural-hair specialists, nail technicians, barbers, therapists, receptionists, administrators, housekeepers, makeup artists and other beauty-industry professionals may apply.",
  },
];

const fieldClass =
  "h-14 w-full rounded-xl border border-[#e6d6da] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]";

const textareaClass =
  "w-full resize-none rounded-xl border border-[#e6d6da] bg-white px-4 py-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]";

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children:
    ReactNode;
  className?: string;
  delay?: number;
  direction?:
    | "up"
    | "left"
    | "right"
    | "scale";
}) {
  const shouldReduceMotion =
    useReducedMotion();

  const startingPosition =
    direction === "left"
      ? {
          x: -36,
          y: 0,
          scale: 1,
        }
      : direction === "right"
        ? {
            x: 36,
            y: 0,
            scale: 1,
          }
        : direction === "scale"
          ? {
              x: 0,
              y: 0,
              scale: 0.97,
            }
          : {
              x: 0,
              y: 30,
              scale: 1,
            };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 1,
              x:
                startingPosition.x,
              y:
                startingPosition.y,
              scale:
                startingPosition.scale,
              filter:
                "blur(4px)",
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter:
          "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.12,
        margin:
          "0px 0px -6% 0px",
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
      style={{
        willChange:
          "transform",
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
          "text-[9px] font-extrabold uppercase tracking-[0.3em]",
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

export default function RecruitmentClient() {
  const shouldReduceMotion =
    useReducedMotion();

  const [
    requestType,
    setRequestType,
  ] =
    useState<RecruitmentRequest>(
      "Request Staff",
    );

  const {
    scrollYProgress,
  } = useScroll();

  const pageProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 130,
        damping: 30,
        mass: 0.25,
      },
    );

  function scrollToSection(
    sectionId: string,
  ) {
    document
      .getElementById(
        sectionId,
      )
      ?.scrollIntoView({
        behavior:
          shouldReduceMotion
            ? "auto"
            : "smooth",

        block:
          "start",
      });
  }

  function openRecruitmentDesk(
    type: RecruitmentRequest,
  ) {
    setRequestType(
      type,
    );

    window.requestAnimationFrame(
      () => {
        scrollToSection(
          "recruitment-desk",
        );
      },
    );
  }

  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const data =
      new FormData(
        form,
      );

    const value = (
      field: string,
    ) =>
      String(
        data.get(
          field,
        ) ?? "",
      ).trim();

    const selectedType =
      value(
        "requestType",
      ) ||
      requestType;

    const message = [
      "Hello Salons Assured Kenya,",
      "",
      `Recruitment Request: ${selectedType}`,
      "",
      `Name / Contact Person: ${value("name")}`,
      `Business / Salon: ${value("businessName") || "Not provided"}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Location: ${value("location")}`,
      `Role / Position: ${value("role")}`,
      `Experience: ${value("experience") || "Not provided"}`,
      `Availability / Date Needed: ${value("availability") || "Not provided"}`,
      `CV / Portfolio Link: ${value("portfolio") || "Not provided"}`,
      "",
      "Additional Information:",
      value(
        "message",
      ) ||
        "Not provided",
    ].join(
      "\n",
    );

    const whatsappUrl =
      `https://wa.me/254715500268?text=${encodeURIComponent(
        message,
      )}`;

    const whatsappWindow =
      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

    if (!whatsappWindow) {
      window.location.href =
        whatsappUrl;
    }
  }

  return (
    <main className="overflow-hidden bg-white text-[#071b33]">
      {/* PAGE PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-[#d9a3af]"
        style={{
          scaleX:
            pageProgress,
        }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#071b33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(217,163,175,0.23),transparent_29%),radial-gradient(circle_at_90%_12%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_78%_90%,rgba(184,117,134,0.15),transparent_34%)]" />

          <div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />

          <div className="absolute -bottom-72 -right-52 h-[650px] w-[650px] rounded-full border border-[#d9a3af]/10" />
        </div>

        <div className="relative mx-auto grid min-h-[820px] max-w-[1380px] gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-32">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 1,
                    y: 34,
                    filter:
                      "blur(4px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
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
              Beauty Industry Recruitment
            </SectionLabel>

            <h1 className="mt-8 max-w-[790px] [font-family:var(--font-display)] text-[54px] font-semibold leading-[0.88] tracking-[-0.067em] sm:text-[76px] lg:text-[94px]">
              The right people
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                build stronger businesses.
              </span>
            </h1>

            <p className="mt-8 max-w-[670px] text-[16px] leading-8 text-white/70 sm:text-[18px]">
              Structured recruitment support for salons, spas,
              barbershops and beauty businesses looking for capable,
              reliable and professional talent.
            </p>

            <button
              type="button"
              onClick={() =>
                scrollToSection(
                  "recruitment-paths",
                )
              }
              className="group mt-9 inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-8 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#071b33] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Start Recruitment

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="mt-10 grid max-w-[690px] gap-4 border-t border-white/15 pt-7 sm:grid-cols-3">
              {[
                {
                  value:
                    "01",

                  label:
                    "Structured Screening",
                },
                {
                  value:
                    "02",

                  label:
                    "Focused Shortlisting",
                },
                {
                  value:
                    "03",

                  label:
                    "Placement Support",
                },
              ].map(
                (
                  item,
                ) => (
                  <div
                    key={
                      item.value
                    }
                    className="flex items-center gap-3"
                  >
                    <span className="[font-family:var(--font-display)] text-[24px] font-semibold italic text-[#d9a3af]">
                      {item.value}
                    </span>

                    <span className="text-[8px] font-extrabold uppercase leading-5 tracking-[0.17em] text-white/55">
                      {item.label}
                    </span>
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 1,
                    x: 45,
                    filter:
                      "blur(4px)",
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              filter:
                "blur(0px)",
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
            <div className="group relative min-h-[540px] overflow-hidden rounded-t-[13rem] rounded-b-[2rem] border border-white/15 bg-white/[0.05] shadow-[0_45px_140px_rgba(0,0,0,0.4)] sm:min-h-[680px]">
              <Image
                src="/sak-recruitment-hero.webp"
                alt="Professional salon team supported through beauty industry recruitment"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/90 via-transparent to-[#071b33]/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                  Strong Teams Start With Better Hiring
                </p>

                <p className="mt-4 max-w-[600px] [font-family:var(--font-display)] text-[31px] font-semibold leading-[0.98] tracking-[-0.043em] text-white sm:text-[42px]">
                  Connecting beauty businesses with people who can
                  serve, perform and grow.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden max-w-[265px] border border-[#ead5db] bg-white p-6 text-[#071b33] shadow-[0_25px_75px_rgba(7,27,51,0.22)] sm:block">
              <BadgeCheck className="h-5 w-5 text-[#b87586]" />

              <p className="mt-5 text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                Industry-Specific Recruitment
              </p>

              <p className="mt-3 [font-family:var(--font-display)] text-[25px] font-semibold leading-[1] tracking-[-0.034em]">
                Beauty roles require more than a generic hiring
                process.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RECRUITMENT PATHWAYS */}
      <section
        id="recruitment-paths"
        className="relative scroll-mt-24 overflow-hidden bg-[#f8f5f3] py-20 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-56 -top-56 h-[560px] w-[560px] rounded-full border border-[#b87586]/10" />

        <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/10 pb-12 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <SectionLabel>
                Recruitment Pathways
              </SectionLabel>

              <h2 className="mt-7 max-w-[900px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.056em] sm:text-[66px] lg:text-[76px]">
                One recruitment desk.
                <span className="ml-3 font-medium italic text-[#b87586]">
                  Two clear pathways.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-8 text-[#071b33]/62">
              Whether you are building a team or looking for your
              next opportunity, the process starts with clear
              information and professional communication.
            </p>
          </Reveal>

          {/* EMPLOYERS */}
          <div className="grid gap-12 border-b border-[#071b33]/10 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <Reveal
              direction="left"
              className="relative"
            >
              <div className="group relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_30px_90px_rgba(7,27,51,0.18)]">
                <Image
                  src="/sak-recruitment-employers.webp"
                  alt="Salon and barbershop team representing employer staffing needs"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/88 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                    For Employers
                  </p>

                  <p className="mt-4 max-w-[610px] [font-family:var(--font-display)] text-[31px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[41px]">
                    Build a team that supports the standard and
                    direction of your business.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              direction="right"
              className="lg:pl-7"
            >
              <p className="[font-family:var(--font-display)] text-[25px] font-semibold italic text-[#b87586]">
                01
              </p>

              <h3 className="mt-5 [font-family:var(--font-display)] text-[45px] font-semibold leading-[0.93] tracking-[-0.05em] sm:text-[59px]">
                I need qualified
                <span className="ml-3 font-medium italic text-[#b87586]">
                  staff.
                </span>
              </h3>

              <p className="mt-7 max-w-[660px] text-[15px] leading-8 text-[#071b33]/64">
                For salon, spa, barbershop and beauty-business
                owners who need structured sourcing, screening,
                shortlisting and interview support.
              </p>

              <div className="mt-8 border-y border-[#071b33]/10">
                {employerPoints.map(
                  (
                    item,
                  ) => (
                    <div
                      key={
                        item
                      }
                      className="flex items-center gap-4 border-b border-[#071b33]/10 py-4 last:border-b-0"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#b87586]" />

                      <p className="text-[12px] font-bold leading-6 text-[#071b33]/68">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  openRecruitmentDesk(
                    "Request Staff",
                  )
                }
                className="group mt-8 inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#071b33] px-8 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b87586]"
              >
                Request Staff

                <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </button>
            </Reveal>
          </div>

          {/* BEAUTY PROFESSIONALS */}
          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <Reveal
              direction="left"
              className="lg:pr-7"
            >
              <p className="[font-family:var(--font-display)] text-[25px] font-semibold italic text-[#b87586]">
                02
              </p>

              <h3 className="mt-5 [font-family:var(--font-display)] text-[45px] font-semibold leading-[0.93] tracking-[-0.05em] sm:text-[59px]">
                I am looking for
                <span className="ml-3 font-medium italic text-[#b87586]">
                  an opportunity.
                </span>
              </h3>

              <p className="mt-7 max-w-[660px] text-[15px] leading-8 text-[#071b33]/64">
                For skilled beauty professionals seeking suitable
                opportunities within salons, spas, barbershops and
                other beauty businesses.
              </p>

              <div className="mt-8 border-y border-[#071b33]/10">
                {professionalPoints.map(
                  (
                    item,
                  ) => (
                    <div
                      key={
                        item
                      }
                      className="flex items-center gap-4 border-b border-[#071b33]/10 py-4 last:border-b-0"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#b87586]" />

                      <p className="text-[12px] font-bold leading-6 text-[#071b33]/68">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  openRecruitmentDesk(
                    "Apply for Jobs",
                  )
                }
                className="group mt-8 inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#b87586] px-8 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#071b33]"
              >
                Apply for Opportunities

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Reveal>

            <Reveal
              delay={0.08}
              direction="right"
              className="relative"
            >
              <div className="group relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_30px_90px_rgba(7,27,51,0.18)]">
                <Image
                  src="/sak-recruitment-barber.webp"
                  alt="Professional barber providing a client service inside a barbershop"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/88 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                    For Beauty Professionals
                  </p>

                  <p className="mt-4 max-w-[600px] [font-family:var(--font-display)] text-[31px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[41px]">
                    Skills create the service. Professionalism
                    strengthens the career.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECRUITMENT FORM */}
      <section
        id="recruitment-desk"
        className="relative scroll-mt-24 overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(217,163,175,0.22),transparent_29%),radial-gradient(circle_at_90%_82%,rgba(184,117,134,0.14),transparent_32%)]" />

        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start lg:px-10">
          <Reveal
            direction="left"
            className="lg:sticky lg:top-32"
          >
            <SectionLabel light>
              Recruitment Desk
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px]">
              Start your
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                recruitment request.
              </span>
            </h2>

            <p className="mt-7 max-w-[500px] text-[15px] leading-8 text-white/65">
              Choose whether you are requesting staff or submitting
              a professional profile. Your completed details will
              open in WhatsApp for submission to the Salons Assured
              recruitment team.
            </p>

            <div className="mt-9 border-t border-white/15 pt-7">
              <p className="flex gap-4 text-[12px] leading-7 text-white/65">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#d9a3af]" />

                Information submitted through this form is intended
                for recruitment communication and assessment.
              </p>

              <a
                href="tel:+254715500268"
                className="mt-5 flex items-center gap-4 text-[12px] font-bold text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-[#d9a3af]" />

                0715500268 / 0706551028
              </a>

              <a
                href="mailto:salonsassuredkenya@gmail.com"
                className="mt-5 flex items-center gap-4 text-[12px] font-bold text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 text-[#d9a3af]" />

                salonsassuredkenya@gmail.com
              </a>

              <p className="mt-5 flex items-center gap-4 text-[12px] font-bold text-white/70">
                <MapPin className="h-5 w-5 text-[#d9a3af]" />

                Kwaheri Road, Runda
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            direction="right"
          >
            <form
              onSubmit={
                handleSubmit
              }
              className="rounded-[2rem] bg-white p-5 text-[#071b33] shadow-[0_30px_110px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10"
            >
              <div className="border-b border-[#ead5db] pb-7">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                  Recruitment Enquiry
                </p>

                <h3 className="mt-4 [font-family:var(--font-display)] text-[36px] font-semibold leading-none tracking-[-0.043em] sm:text-[46px]">
                  Tell us what you need.
                </h3>

                <p className="mt-4 max-w-2xl text-[13px] leading-7 text-[#071b33]/58">
                  Fields marked with an asterisk are required.
                </p>
              </div>

              <div className="mt-7 grid gap-5">
                <label className="grid gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                    Request Type *
                  </span>

                  <select
                    name="requestType"
                    required
                    value={
                      requestType
                    }
                    onChange={(
                      event,
                    ) =>
                      setRequestType(
                        event
                          .target
                          .value as RecruitmentRequest,
                      )
                    }
                    className={
                      fieldClass
                    }
                  >
                    <option value="Request Staff">
                      Request Staff
                    </option>

                    <option value="Apply for Jobs">
                      Apply for Jobs
                    </option>
                  </select>
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Full Name / Contact Person *
                    </span>

                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Enter full name"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Business / Salon Name
                    </span>

                    <input
                      name="businessName"
                      autoComplete="organization"
                      placeholder="Enter business name"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Phone Number *
                    </span>

                    <input
                      name="phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 0712 345 678"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Email Address *
                    </span>

                    <input
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Location *
                    </span>

                    <input
                      name="location"
                      required
                      autoComplete="address-level2"
                      placeholder="Town or area"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Role / Position *
                    </span>

                    <input
                      name="role"
                      required
                      placeholder="e.g. Nail Technician"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Experience
                    </span>

                    <input
                      name="experience"
                      placeholder="e.g. 3 years"
                      className={
                        fieldClass
                      }
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                      Availability / Date Needed
                    </span>

                    <input
                      name="availability"
                      placeholder="Enter availability"
                      className={
                        fieldClass
                      }
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                    CV, Portfolio or Professional Profile Link
                  </span>

                  <input
                    name="portfolio"
                    type="url"
                    placeholder="Paste a Google Drive, LinkedIn or portfolio link"
                    className={
                      fieldClass
                    }
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60">
                    Additional Information
                  </span>

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about the staffing requirement, your experience, skills or preferred opportunity..."
                    className={
                      textareaClass
                    }
                  />
                </label>

                <button
                  type="submit"
                  className="group mt-2 inline-flex min-h-[58px] items-center justify-center gap-4 rounded-full bg-[#071b33] px-8 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b87586]"
                >
                  Submit Through WhatsApp

                  <ArrowUpRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:rotate-45 group-hover:text-white" />
                </button>

                <p className="text-center text-[10px] leading-5 text-[#071b33]/48">
                  Submitting opens WhatsApp with your completed
                  recruitment information. Review the message before
                  sending.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* RECRUITMENT PROCESS */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/10 pb-12 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <SectionLabel>
                How Recruitment Works
              </SectionLabel>

              <h2 className="mt-7 max-w-[880px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px] lg:text-[74px]">
                A clear process from
                <span className="ml-3 font-medium italic text-[#b87586]">
                  request to placement.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-8 text-[#071b33]/62">
              Each stage is designed to improve communication,
              professional fit and the quality of the final hiring
              decision.
            </p>
          </Reveal>

          <div className="mt-4 divide-y divide-[#071b33]/10">
            {processSteps.map(
              (
                step,
                index,
              ) => {
                const Icon =
                  step.icon;

                return (
                  <Reveal
                    key={
                      step.number
                    }
                    delay={
                      index *
                      0.04
                    }
                  >
                    <article className="group grid gap-6 py-9 transition-colors duration-300 hover:bg-[#fbf4f6]/60 sm:grid-cols-[70px_70px_0.7fr_1.3fr_40px] sm:items-center sm:px-5">
                      <span className="[font-family:var(--font-display)] text-[32px] font-semibold italic text-[#d9a3af]">
                        {step.number}
                      </span>

                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition-all duration-300 group-hover:border-[#071b33] group-hover:bg-[#071b33] group-hover:text-[#d9a3af]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={
                            1.7
                          }
                        />
                      </span>

                      <h3 className="[font-family:var(--font-display)] text-[30px] font-semibold leading-none tracking-[-0.04em]">
                        {step.title}
                      </h3>

                      <p className="max-w-[680px] text-[13px] leading-7 text-[#071b33]/58">
                        {step.text}
                      </p>

                      <ArrowRight className="hidden h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1.5 sm:block" />
                    </article>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* EMPLOYER STANDARDS */}
      <section className="bg-[#f8f5f3] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <SectionLabel>
                Better Hiring Decisions
              </SectionLabel>

              <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px]">
                Recruitment should protect
                <span className="ml-3 font-medium italic text-[#b87586]">
                  the business and the candidate.
                </span>
              </h2>
            </div>

            <p className="max-w-[690px] text-[15px] leading-8 text-[#071b33]/62 lg:justify-self-end">
              Strong recruitment involves more than finding an
              available person. The role, expectations, environment
              and professional fit must all be considered.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {employerStandards.map(
              (
                standard,
                index,
              ) => {
                const Icon =
                  standard.icon;

                return (
                  <Reveal
                    key={
                      standard.title
                    }
                    delay={
                      index *
                      0.07
                    }
                    className="group min-h-[320px] border border-[#071b33]/10 bg-white p-7 transition-transform duration-300 hover:-translate-y-2 sm:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="[font-family:var(--font-display)] text-[28px] font-semibold italic text-[#b87586]">
                        0{index + 1}
                      </span>

                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition-colors duration-300 group-hover:bg-[#071b33] group-hover:text-[#d9a3af]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={
                            1.7
                          }
                        />
                      </span>
                    </div>

                    <h3 className="mt-14 [font-family:var(--font-display)] text-[34px] font-semibold leading-[0.96] tracking-[-0.043em]">
                      {standard.title}
                    </h3>

                    <p className="mt-5 text-[13px] leading-7 text-[#071b33]/58">
                      {standard.text}
                    </p>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="relative overflow-hidden bg-[#d9a3af] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-56 -top-56 h-[560px] w-[560px] rounded-full border border-[#071b33]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-10">
          <Reveal
            direction="left"
            className="relative"
          >
            <div className="group relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_30px_90px_rgba(7,27,51,0.2)]">
              <Image
                src="/sak-recruitment-therapist.webp"
                alt="Beauty therapist providing a professional service to a client"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/90 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#f2d6dd]">
                  Professional Talent
                </p>

                <p className="mt-4 max-w-[600px] [font-family:var(--font-display)] text-[31px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[41px]">
                  Different skills. One shared standard of
                  professionalism.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            direction="right"
            className="lg:pl-7"
          >
            <SectionLabel>
              Roles We Recruit For
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[64px]">
              Talent across the
              <span className="ml-3 font-medium italic text-white">
                beauty-business team.
              </span>
            </h2>

            <p className="mt-7 max-w-[680px] text-[14px] leading-8 text-[#071b33]/68">
              Recruitment needs vary by business model, service
              offering, location, client profile and growth stage.
            </p>

            <div className="mt-9 grid gap-x-7 gap-y-1 sm:grid-cols-2">
              {roles.map(
                (
                  role,
                ) => (
                  <div
                    key={
                      role
                    }
                    className="flex items-center gap-3 border-b border-[#071b33]/15 py-4"
                  >
                    <Scissors className="h-4 w-4 shrink-0 text-[#071b33]/55" />

                    <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#071b33]/78">
                      {role}
                    </p>
                  </div>
                ),
              )}
            </div>

            <p className="mt-7 text-[11px] leading-6 text-[#071b33]/58">
              Other beauty-industry positions may also be supported
              depending on the role and assignment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROFESSIONAL READINESS */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/10 pb-12 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <SectionLabel>
                Candidate Readiness
              </SectionLabel>

              <h2 className="mt-7 max-w-[900px] [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px] lg:text-[74px]">
                Prepare before the
                <span className="ml-3 font-medium italic text-[#b87586]">
                  opportunity arrives.
                </span>
              </h2>
            </div>

            <GraduationCap
              className="h-11 w-11 text-[#b87586] lg:justify-self-end"
              strokeWidth={
                1.4
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {professionalStandards.map(
              (
                item,
                index,
              ) => (
                <Reveal
                  key={
                    item.title
                  }
                  delay={
                    index *
                    0.07
                  }
                  className="border-t-2 border-[#b87586] bg-[#f8f5f3] p-7 sm:p-9"
                >
                  <p className="[font-family:var(--font-display)] text-[28px] font-semibold italic text-[#b87586]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-9 [font-family:var(--font-display)] text-[34px] font-semibold leading-[0.96] tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-[13px] leading-7 text-[#071b33]/58">
                    {item.text}
                  </p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f8f5f3] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.38fr_0.62fr] lg:px-10">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>
              Recruitment Questions
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[47px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[62px]">
              Before you
              <span className="ml-3 font-medium italic text-[#b87586]">
                submit.
              </span>
            </h2>

            <p className="mt-7 max-w-[430px] text-[14px] leading-8 text-[#071b33]/62">
              Review the most common questions about recruitment,
              applications and placement.
            </p>

            <FileCheck2
              className="mt-9 h-9 w-9 text-[#b87586]"
              strokeWidth={
                1.5
              }
            />
          </Reveal>

          <div className="border-t border-[#071b33]/10">
            {faqs.map(
              (
                faq,
                index,
              ) => (
                <Reveal
                  key={
                    faq.question
                  }
                  delay={
                    index *
                    0.04
                  }
                >
                  <details className="group border-b border-[#071b33]/10">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7">
                      <div className="flex gap-5">
                        <span className="[font-family:var(--font-display)] text-[19px] font-semibold italic text-[#b87586]">
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <h3 className="[font-family:var(--font-display)] text-[23px] font-semibold leading-tight tracking-[-0.034em] sm:text-[27px]">
                          {faq.question}
                        </h3>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition duration-300 group-open:rotate-45 group-open:bg-[#071b33] group-open:text-white">
                        +
                      </span>
                    </summary>

                    <p className="max-w-[780px] pb-8 pl-10 text-[13px] leading-7 text-[#071b33]/60 sm:pl-14">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}