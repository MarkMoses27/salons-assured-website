"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileStack,
  MapPin,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { CaseStudy } from "@/types/caseStudy";

type CaseStudiesClientProps = {
  studies: CaseStudy[];
};

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

function resolveIcon(
  engagement: string,
): LucideIcon {
  const normalized =
    engagement.toLowerCase();

  if (
    normalized.includes("staff") ||
    normalized.includes("recruit")
  ) {
    return UsersRound;
  }

  if (
    normalized.includes("leadership") ||
    normalized.includes("governance")
  ) {
    return BriefcaseBusiness;
  }

  if (
    normalized.includes("assessment") ||
    normalized.includes("training")
  ) {
    return ClipboardCheck;
  }

  return FileStack;
}

export default function CaseStudiesClient({
  studies,
}: CaseStudiesClientProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  if (studies.length === 0) {
    return null;
  }

  const safeActiveIndex = Math.min(
    activeIndex,
    studies.length - 1,
  );

  const activeCase =
    studies[safeActiveIndex];

  const ActiveIcon = resolveIcon(
    activeCase.engagement,
  );

  return (
    <section
      id="case-studies"
      className="relative isolate overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 -top-80 h-[700px] w-[700px] rounded-full border border-white/[0.045]" />

        <div className="absolute -left-28 -top-36 h-[360px] w-[360px] rounded-full border border-[#d9a3af]/10" />

        <div className="absolute -bottom-80 -right-72 h-[680px] w-[680px] rounded-full border border-white/[0.04]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(184,117,134,0.18),transparent_30%)]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9a3af]/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-20">
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
              amount: 0.45,
            }}
            transition={{
              duration: 0.85,
              ease: premiumEase,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d9a3af]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#d9a3af]">
                Selected Engagements
              </p>
            </div>

            <h2 className="mt-7 max-w-[900px] [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[60px] lg:text-[76px]">
              Proof should sit beside
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                the promise.
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
            className="border-l border-white/[0.14] pl-6 lg:pb-2"
          >
            <p className="text-[14px] leading-8 text-white/55">
              Selected examples of how
              Salons Assured approaches
              people, systems and
              business-growth challenges
              within the beauty industry.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <BadgeCheck
                className="h-4 w-4 text-[#d9a3af]"
                strokeWidth={1.8}
              />

              <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/35">
                Real work. Practical value.
              </span>
            </div>
          </motion.div>
        </div>

        {/* CASE STUDY TABS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: premiumEase,
          }}
          className="mt-12 overflow-x-auto border-y border-white/[0.13] lg:mt-16"
        >
          <div
            role="tablist"
            aria-label="Selected Salons Assured engagements"
            className="flex min-w-max lg:grid lg:min-w-0 lg:grid-cols-3"
          >
            {studies.map(
              (study, index) => {
                const Icon = resolveIcon(
                  study.engagement,
                );

                const isActive =
                  safeActiveIndex === index;

                return (
                  <button
                    key={study._id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="case-study-panel"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className={[
                      "group relative min-w-[245px] border-r border-white/[0.13]",
                      "px-5 py-6 text-left transition-colors duration-500",
                      "last:border-r-0 sm:min-w-[285px] sm:px-7",
                      "lg:min-w-0 lg:px-8 lg:py-7",
                      isActive
                        ? "bg-white/[0.08]"
                        : "bg-transparent hover:bg-white/[0.04]",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <span
                          className={[
                            "flex h-10 w-10 items-center justify-center rounded-full border",
                            "transition-all duration-500",
                            isActive
                              ? "border-[#d9a3af] bg-[#d9a3af] text-[#071b33]"
                              : "border-white/[0.16] text-[#d9a3af]",
                          ].join(" ")}
                        >
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={
                              1.7
                            }
                          />
                        </span>

                        <div>
                          <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#d9a3af]">
                            0{index + 1} ·{" "}
                            {
                              study.engagement
                            }
                          </p>

                          <p className="mt-2 [font-family:var(--font-display)] text-[22px] font-semibold leading-none text-white">
                            {
                              study.displayName
                            }
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={[
                          "h-4 w-4 shrink-0 transition-all duration-500",
                          isActive
                            ? "rotate-45 text-[#d9a3af]"
                            : "text-white/25 group-hover:text-[#d9a3af]",
                        ].join(" ")}
                      />
                    </div>

                    <motion.span
                      initial={false}
                      animate={{
                        scaleX: isActive
                          ? 1
                          : 0,
                      }}
                      transition={{
                        duration:
                          shouldReduceMotion
                            ? 0
                            : 0.45,

                        ease: premiumEase,
                      }}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#d9a3af]"
                    />
                  </button>
                );
              },
            )}
          </div>
        </motion.div>

        {/* ACTIVE CASE STUDY */}
        <div
          id="case-study-panel"
          role="tabpanel"
          className="relative overflow-hidden bg-[#f7f2f3] text-[#071b33] shadow-[0_35px_110px_rgba(0,0,0,0.28)]"
        >
          <div className="absolute inset-y-0 left-0 hidden w-[7px] bg-[#b87586] lg:block" />

          <AnimatePresence mode="wait">
            <motion.article
              key={activeCase._id}
              initial={{
                opacity: 0,
                y: shouldReduceMotion
                  ? 0
                  : 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion
                  ? 0
                  : -12,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.5,

                ease: premiumEase,
              }}
              className="grid lg:grid-cols-[300px_1fr]"
            >
              {/* CLIENT IDENTITY */}
              <aside className="relative border-b border-[#071b33]/10 bg-[#eee5e8] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <div className="flex items-start justify-between lg:block">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af]">
                    <ActiveIcon
                      className="h-5 w-5"
                      strokeWidth={1.7}
                    />
                  </div>

                  <p className="[font-family:var(--font-display)] text-[52px] font-medium italic leading-none text-[#b87586]/30 lg:mt-12 lg:text-[68px]">
                    0{safeActiveIndex + 1}
                  </p>
                </div>

                <p className="mt-8 text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#b87586] lg:mt-10">
                  Engagement Brief
                </p>

                <h3 className="mt-4 [font-family:var(--font-display)] text-[36px] font-semibold leading-[0.94] tracking-[-0.04em]">
                  {activeCase.displayName}
                </h3>

                <div className="mt-8 space-y-5 border-t border-[#071b33]/12 pt-7">
                  <div>
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#071b33]/35">
                      Engagement
                    </p>

                    <p className="mt-2 text-[12px] font-semibold">
                      {
                        activeCase.engagement
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#071b33]/35">
                      Focus
                    </p>

                    <p className="mt-2 text-[12px] font-semibold">
                      {activeCase.sector}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#071b33]/50">
                    <MapPin
                      className="h-3.5 w-3.5 text-[#b87586]"
                      strokeWidth={1.8}
                    />

                    {activeCase.location}
                  </div>
                </div>
              </aside>

              {/* CASE STUDY CONTENT */}
              <div className="p-7 sm:p-9 lg:p-12">
                <div className="border-b border-[#071b33]/10 pb-8">
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                    Executive Summary
                  </p>

                  <h3 className="mt-4 max-w-[760px] [font-family:var(--font-display)] text-[36px] font-semibold leading-[0.97] tracking-[-0.04em] sm:text-[44px]">
                    {activeCase.title}
                  </h3>

                  <p className="mt-5 max-w-[820px] text-[13px] leading-7 text-[#071b33]/58">
                    {activeCase.summary}
                  </p>
                </div>

                <div className="grid border-b border-[#071b33]/10 lg:grid-cols-3">
                  <div className="border-b border-[#071b33]/10 py-8 lg:border-b-0 lg:border-r lg:pr-8">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#071b33]/40">
                      01 · The Challenge
                    </p>

                    <p className="mt-5 text-[13px] leading-7 text-[#071b33]/62">
                      {activeCase.challenge}
                    </p>
                  </div>

                  <div className="border-b border-[#071b33]/10 py-8 lg:border-b-0 lg:border-r lg:px-8">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#071b33]/40">
                      02 · SAK Intervention
                    </p>

                    <p className="mt-5 text-[13px] leading-7 text-[#071b33]/62">
                      {
                        activeCase.intervention
                      }
                    </p>
                  </div>

                  <div className="py-8 lg:pl-8">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#071b33]/40">
                      03 · Business Value
                    </p>

                    <p className="mt-5 text-[13px] leading-7 text-[#071b33]/62">
                      {
                        activeCase.businessValue
                      }
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <div className="flex items-center gap-3">
                      <Target
                        className="h-4 w-4 text-[#b87586]"
                        strokeWidth={1.8}
                      />

                      <p className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#071b33]/40">
                        Engagement Outputs
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {activeCase.outputs.map(
                        (output) => (
                          <span
                            key={output}
                            className="rounded-full border border-[#071b33]/10 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#071b33]/55"
                          >
                            {output}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <Link
                    href="/case-studies"
                    className="group inline-flex h-[52px] items-center justify-center gap-4 rounded-full bg-[#071b33] px-6 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#b87586]"
                  >
                    View all case studies

                    <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}