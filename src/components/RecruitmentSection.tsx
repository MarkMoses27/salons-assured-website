"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  ScanSearch,
  Sparkles,
  UserCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type RecruitmentStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const recruitmentSteps: RecruitmentStep[] = [
  {
    number: "01",
    title: "Define",
    description:
      "We clarify the role, required skills, experience, standards and working environment.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Source",
    description:
      "We identify suitable professionals through our network and relevant talent channels.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Screen",
    description:
      "Candidates are assessed for experience, professionalism, reliability and suitability.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Connect",
    description:
      "We present the strongest matches and support the final selection and placement process.",
    icon: BadgeCheck,
  },
];

const employerBenefits = [
  "Submit a clear staffing requirement",
  "Access sourced and screened candidates",
  "Reduce time spent reviewing unsuitable applications",
];

const professionalBenefits = [
  "Discover relevant beauty-industry opportunities",
  "Present your skills to suitable employers",
  "Join the Salons Assured talent network",
];

const talentAreas = [
  "Salon Managers",
  "Hair Stylists",
  "Nail Technicians",
  "Barbers",
  "Beauty Therapists",
  "Receptionists",
];

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

export default function RecruitmentSection() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="recruitment"
      className="relative isolate overflow-hidden bg-[#f7f2f3] py-20 text-[#071b33] sm:py-24 lg:py-28"
    >
      {/* BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-56 -top-72 h-[600px] w-[600px] rounded-full border border-[#b87586]/10" />

        <div className="absolute -left-24 -top-36 h-[320px] w-[320px] rounded-full border border-[#b87586]/10" />

        <div className="absolute -bottom-72 -right-60 h-[620px] w-[620px] rounded-full border border-[#071b33]/[0.05]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(217,163,175,0.22),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADER */}
        <div className="grid gap-9 lg:grid-cols-[1fr_350px] lg:items-end lg:gap-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
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
              ease: premiumEase,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#b87586]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#b87586]">
                Beauty Talent Placement
              </p>
            </div>

            <h2 className="mt-7 max-w-[950px] [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[60px] lg:text-[76px]">
              The right person changes
              <span className="ml-3 font-medium italic text-[#b87586]">
                the whole business.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
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
              delay: 0.08,
              ease: premiumEase,
            }}
            className="border-l border-[#071b33]/12 pl-6 lg:pb-2"
          >
            <p className="text-[14px] leading-8 text-[#071b33]/60">
              We connect beauty businesses
              with professionals whose
              skills, standards and working
              style align with the role.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <BadgeCheck
                className="h-4 w-4 text-[#b87586]"
                strokeWidth={1.8}
              />

              <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#071b33]/45">
                Fit before placement
              </span>
            </div>
          </motion.div>
        </div>

        {/* TALENT MATCHING CONSOLE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 36,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            ease: premiumEase,
          }}
          className="relative mt-12 overflow-hidden rounded-[32px] bg-[#071b33] text-white shadow-[0_32px_100px_rgba(7,27,51,0.2)] lg:mt-16"
        >
          {/* CONSOLE BACKGROUND */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-48 -top-48 h-[480px] w-[480px] rounded-full border border-white/[0.06]" />

            <div className="absolute -right-20 -top-20 h-[270px] w-[270px] rounded-full border border-[#d9a3af]/12" />

            <div className="absolute -bottom-52 -left-48 h-[440px] w-[440px] rounded-full border border-white/[0.045]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(184,117,134,0.17),transparent_34%)]" />
          </div>

          {/* CONSOLE TOP BAR */}
          <div className="relative z-10 flex flex-col gap-5 border-b border-white/[0.13] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-11">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[#d9a3af]">
                <UsersRound
                  className="h-4 w-4"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.29em] text-[#d9a3af]">
                  Salons Assured Talent Desk
                </p>

                <p className="mt-1 text-[10px] text-white/[0.38]">
                  From employer need to
                  suitable professional
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9a3af] opacity-40" />
                )}

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d9a3af]" />
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-white/[0.38]">
                Placement process
              </span>
            </div>
          </div>

          {/* DESKTOP RECRUITMENT RUNWAY */}
          <div className="relative z-10 hidden px-10 pb-12 pt-11 lg:block lg:px-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  className="h-4 w-4 text-[#d9a3af]"
                  strokeWidth={1.8}
                />

                <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-white/40">
                  Staffing need
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-white/40">
                  Suitable match
                </span>

                <BadgeCheck
                  className="h-4 w-4 text-[#d9a3af]"
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <div className="relative mt-10">
              {/* STATIC RUNWAY */}
              <div className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-white/[0.16]" />

              {/* ANIMATED RUNWAY */}
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.7,
                }}
                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : 1.6,
                  delay: 0.25,
                  ease: premiumEase,
                }}
                className="absolute left-[12.5%] right-[12.5%] top-6 h-[2px] origin-left bg-[#d9a3af]"
              />

              {/* TRAVELLING MATCH INDICATOR */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{
                    left: "12.5%",
                    opacity: 0,
                  }}
                  whileInView={{
                    left: "87.5%",
                    opacity: [
                      0,
                      1,
                      1,
                      0,
                    ],
                  }}
                  viewport={{
                    once: true,
                    amount: 0.8,
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.4,
                    ease: premiumEase,
                  }}
                  className="absolute top-[17px] z-20 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#071b33] bg-[#d9a3af] shadow-[0_0_0_6px_rgba(217,163,175,0.16)]"
                />
              )}

              {/* PROCESS STEPS */}
              <div className="relative grid grid-cols-4 gap-6">
                {recruitmentSteps.map(
                  (step, index) => {
                    const Icon =
                      step.icon;

                    return (
                      <motion.div
                        key={step.number}
                        initial={{
                          opacity: 0,
                          y: 22,
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
                          duration: 0.6,
                          delay:
                            0.25 +
                            index * 0.1,
                          ease: premiumEase,
                        }}
                        className="group text-center"
                      >
                        <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-[5px] border-[#071b33] bg-[#d9a3af] text-[#071b33] shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-110">
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.8}
                          />
                        </div>

                        <p className="mt-6 [font-family:var(--font-display)] text-[15px] font-semibold italic text-[#d9a3af]">
                          {step.number}
                        </p>

                        <h3 className="mt-2 [font-family:var(--font-display)] text-[29px] font-semibold leading-none tracking-[-0.038em] text-white">
                          {step.title}
                        </h3>

                        <p className="mx-auto mt-4 max-w-[235px] text-[11px] leading-6 text-white/[0.46]">
                          {step.description}
                        </p>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* MOBILE RECRUITMENT RUNWAY */}
          <div className="relative z-10 px-6 py-9 lg:hidden">
            <div className="absolute bottom-10 left-[50px] top-12 w-px bg-white/[0.14]" />

            <motion.div
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 1.3,
                ease: premiumEase,
              }}
              className="absolute bottom-10 left-[50px] top-12 w-[2px] origin-top bg-[#d9a3af]"
            />

            <div className="space-y-7">
              {recruitmentSteps.map(
                (step, index) => {
                  const Icon =
                    step.icon;

                  return (
                    <motion.div
                      key={step.number}
                      initial={{
                        opacity: 0,
                        x: -18,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.6,
                      }}
                      transition={{
                        duration: 0.55,
                        delay:
                          index * 0.08,
                        ease: premiumEase,
                      }}
                      className="relative grid grid-cols-[54px_1fr] gap-5"
                    >
                      <span className="relative z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-[#071b33] bg-[#d9a3af] text-[#071b33]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.8}
                        />
                      </span>

                      <div className="border-b border-white/[0.12] pb-7">
                        <p className="[font-family:var(--font-display)] text-[14px] font-semibold italic text-[#d9a3af]">
                          {step.number}
                        </p>

                        <h3 className="mt-2 [font-family:var(--font-display)] text-[29px] font-semibold leading-none tracking-[-0.038em]">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-[12px] leading-6 text-white/[0.46]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>

          {/* EMPLOYER AND PROFESSIONAL PATHWAYS */}
          <div className="relative z-10 grid border-t border-white/[0.13] lg:grid-cols-2">
            {/* EMPLOYERS */}
            <Link
              href="/recruitment"
              className="group relative min-h-[330px] overflow-hidden bg-white p-7 text-[#071b33] sm:p-9 lg:border-r lg:border-[#071b33]/10 lg:p-10"
            >
              <div className="absolute -right-28 -top-28 h-[300px] w-[300px] rounded-full border border-[#071b33]/[0.06] transition-transform duration-[1000ms] group-hover:scale-110" />

              <div className="absolute -right-8 -top-8 h-[150px] w-[150px] rounded-full border border-[#b87586]/10 transition-transform duration-[1000ms] group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#b87586]">
                    For employers
                  </p>

                  <h3 className="mt-5 max-w-[520px] [font-family:var(--font-display)] text-[39px] font-semibold leading-[0.94] tracking-[-0.045em] sm:text-[47px]">
                    Find the team your
                    business needs next.
                  </h3>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#071b33]/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="relative z-10 mt-7 space-y-3">
                {employerBenefits.map(
                  (benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#b87586]/40 text-[#b87586]">
                        <Check
                          className="h-3 w-3"
                          strokeWidth={2}
                        />
                      </span>

                      <p className="text-[12px] leading-6 text-[#071b33]/55">
                        {benefit}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <span className="relative z-10 mt-7 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]">
                Submit a staffing need

                <ArrowRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            {/* BEAUTY PROFESSIONALS */}
            <Link
              href="/job-seekers"
              className="group relative min-h-[330px] overflow-hidden bg-[#d9a3af] p-7 text-[#071b33] sm:p-9 lg:p-10"
            >
              <div className="absolute -bottom-32 -left-28 h-[320px] w-[320px] rounded-full border border-[#071b33]/10 transition-transform duration-[1000ms] group-hover:scale-110" />

              <div className="absolute -bottom-10 -left-8 h-[170px] w-[170px] rounded-full border border-white/25 transition-transform duration-[1000ms] group-hover:scale-110" />

              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#071b33]/55">
                    For beauty professionals
                  </p>

                  <h3 className="mt-5 max-w-[520px] [font-family:var(--font-display)] text-[39px] font-semibold leading-[0.94] tracking-[-0.045em] sm:text-[47px]">
                    Find the opportunity that
                    moves you forward.
                  </h3>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#071b33]/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#071b33] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="relative z-10 mt-7 space-y-3">
                {professionalBenefits.map(
                  (benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#071b33]/25">
                        <Check
                          className="h-3 w-3"
                          strokeWidth={2}
                        />
                      </span>

                      <p className="text-[12px] leading-6 text-[#071b33]/65">
                        {benefit}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <span className="relative z-10 mt-7 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]">
                Explore opportunities

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* TALENT AREAS */}
          <div className="relative z-10 grid border-t border-white/[0.13] lg:grid-cols-[250px_1fr]">
            <div className="flex items-center gap-4 bg-[#0c2440] px-6 py-6 sm:px-9">
              <Sparkles
                className="h-4 w-4 shrink-0 text-[#d9a3af]"
                strokeWidth={1.7}
              />

              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
                  Talent network
                </p>

                <p className="mt-1 [font-family:var(--font-display)] text-[21px] font-semibold">
                  Roles we support
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-white/[0.1] sm:grid-cols-3 lg:grid-cols-6 lg:border-l lg:border-t-0">
              {talentAreas.map(
                (area, index) => (
                  <div
                    key={area}
                    className={[
                      "flex min-h-[84px] items-center justify-center",
                      "border-white/[0.1] px-3 py-5 text-center",
                      "transition-colors duration-300 hover:bg-white/[0.055]",
                      index % 2 === 0
                        ? "border-r"
                        : "",
                      index < 4
                        ? "border-b sm:border-b-0"
                        : "",
                      "sm:border-r",
                      "sm:last:border-r-0",
                    ].join(" ")}
                  >
                    <span className="text-[9px] font-bold uppercase leading-5 tracking-[0.14em] text-white/[0.45]">
                      {area}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* TRUST STATEMENT */}
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
          className="mt-9 flex flex-col gap-6 border-t border-[#071b33]/12 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex max-w-[780px] items-start gap-4">
            <BadgeCheck
              className="mt-1 h-5 w-5 shrink-0 text-[#b87586]"
              strokeWidth={1.8}
            />

            <p className="[font-family:var(--font-display)] text-[23px] font-medium italic leading-[1.2] tracking-[-0.025em] text-[#071b33]/65 sm:text-[28px]">
              We focus on fit,
              professionalism and long-term
              value—not simply filling
              vacancies.
            </p>
          </div>

          <Link
            href="/recruitment"
            className="group inline-flex h-[52px] shrink-0 items-center gap-4 self-start rounded-full border border-[#071b33]/15 px-6 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33] transition-all duration-300 hover:border-[#071b33] hover:bg-[#071b33] hover:text-white sm:self-auto"
          >
            Recruitment services

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}