"use client";

import Image from "next/image";
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
} from "lucide-react";

type Pathway = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

const pathways: Pathway[] = [
  {
    number: "01",
    eyebrow: "Build & Operate",
    title: "Business Owners",
    description:
      "Strengthen your team, operations, customer experience and profitability with practical beauty-business support.",
    href: "/business-owners",
    linkLabel: "Explore owner support",
    image: "/who-business-owners.webp",
    imageAlt:
      "Salons Assured supporting a beauty business owner during an industry event",
    imagePosition: "center center",
  },
  {
    number: "02",
    eyebrow: "Launch & Invest",
    title: "Investors",
    description:
      "Enter or expand within the beauty industry with clearer planning, proper systems and informed implementation support.",
    href: "/investors",
    linkLabel: "Explore investor support",
    image: "/who-investors.webp",
    imageAlt:
      "Beauty business investors and owners formalising the launch of a salon",
    imagePosition: "center center",
  },
  {
    number: "03",
    eyebrow: "Work & Progress",
    title: "Beauty Professionals",
    description:
      "Access career opportunities, professional guidance and industry connections that support long-term growth.",
    href: "/job-seekers",
    linkLabel: "Explore career opportunities",
    image: "/who-beauty-professionals.webp",
    imageAlt:
      "Beauty professionals celebrating the completion of professional training",
    imagePosition: "center center",
  },
];

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

export default function WhoWeHelp() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  const activePathway =
    pathways[activeIndex];

  return (
    <section
      id="who-we-help"
      className="relative isolate overflow-hidden bg-[#f7f2f3] py-20 sm:py-24 lg:py-32"
    >
      {/* BACKGROUND DETAILS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-18rem] top-[-20rem] h-[38rem] w-[38rem] rounded-full border border-[#b87586]/10" />

        <div className="absolute right-[-10rem] top-[-12rem] h-[25rem] w-[25rem] rounded-full border border-[#b87586]/10" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-[#071b33]/8" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* SECTION INTRODUCTION */}
        <div className="grid gap-8 border-b border-[#071b33]/12 pb-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-end lg:gap-16 lg:pb-16">
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
              <span className="h-px w-10 bg-[#b87586]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#b87586]">
                Who We Work With
              </p>
            </div>
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
            <h2 className="max-w-[900px] [font-family:var(--font-display)] text-[45px] font-semibold leading-[0.94] tracking-[-0.052em] text-[#071b33] sm:text-[58px] lg:text-[72px]">
              One industry.
              <span className="ml-3 font-medium italic text-[#b87586]">
                Three paths forward.
              </span>
            </h2>

            <p className="mt-6 max-w-[690px] text-[15px] leading-8 text-[#071b33]/62 sm:text-[16px]">
              Whether you are building a
              business, investing in one or
              growing your career, Salons
              Assured provides a clearer and
              more structured way forward.
            </p>
          </motion.div>
        </div>

        {/* INTERACTIVE CONTENT */}
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[0.46fr_0.54fr] lg:items-start lg:gap-16 xl:gap-24">
          {/* ACTIVE IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease: premiumEase,
            }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative min-h-[470px] overflow-hidden bg-[#071b33] sm:min-h-[570px] lg:min-h-[650px] [clip-path:polygon(0_0,100%_0,100%_88%,86%_100%,0_100%)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePathway.image}
                  initial={
                    shouldReduceMotion
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                          scale: 1.07,
                          clipPath:
                            "inset(0 0 100% 0)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath:
                      "inset(0 0 0% 0)",
                  }}
                  exit={
                    shouldReduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          scale: 1.03,
                          clipPath:
                            "inset(100% 0 0 0)",
                        }
                  }
                  transition={{
                    duration: 0.65,
                    ease: premiumEase,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      activePathway.image
                    }
                    alt={
                      activePathway.imageAlt
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    style={{
                      objectPosition:
                        activePathway.imagePosition,
                    }}
                    className="object-cover transition-transform duration-[1200ms]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/90 via-[#071b33]/5 to-transparent" />

              <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#071b33]/30 to-transparent" />

              {/* IMAGE NUMBER */}
              <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#071b33]/25 backdrop-blur-md sm:left-8 sm:top-8">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={
                      activePathway.number
                    }
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="[font-family:var(--font-display)] text-[18px] font-semibold italic text-white"
                  >
                    {
                      activePathway.number
                    }
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* IMAGE CAPTION */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      activePathway.title
                    }
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: premiumEase,
                    }}
                  >
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#e5b3bf]">
                      {
                        activePathway.eyebrow
                      }
                    </p>

                    <p className="mt-3 [font-family:var(--font-display)] text-[35px] font-semibold leading-none tracking-[-0.045em] text-white sm:text-[43px]">
                      {
                        activePathway.title
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* IMAGE NAVIGATION */}
            <div className="mt-5 flex items-center justify-between gap-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.27em] text-[#071b33]/40">
                Salons Assured Kenya
              </p>

              <div className="flex items-center gap-3">
                {pathways.map(
                  (pathway, index) => (
                    <button
                      key={
                        pathway.number
                      }
                      type="button"
                      aria-label={`Show ${pathway.title}`}
                      onClick={() =>
                        setActiveIndex(
                          index,
                        )
                      }
                      className={[
                        "h-[3px] rounded-full",
                        "transition-all duration-500",
                        activeIndex ===
                        index
                          ? "w-9 bg-[#b87586]"
                          : "w-4 bg-[#071b33]/15 hover:bg-[#b87586]/60",
                      ].join(" ")}
                    />
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* PATHWAY ROWS */}
          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: premiumEase,
            }}
            className="border-t border-[#071b33]/14"
          >
            {pathways.map(
              (pathway, index) => {
                const active =
                  activeIndex === index;

                return (
                  <motion.div
                    key={pathway.number}
                    layout
                    className="relative border-b border-[#071b33]/14"
                  >
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          layoutId="active-pathway-line"
                          initial={{
                            scaleY: 0,
                          }}
                          animate={{
                            scaleY: 1,
                          }}
                          exit={{
                            scaleY: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: premiumEase,
                          }}
                          className="absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-[#b87586]"
                        />
                      )}
                    </AnimatePresence>

                    <Link
                      href={pathway.href}
                      onMouseEnter={() =>
                        setActiveIndex(
                          index,
                        )
                      }
                      onFocus={() =>
                        setActiveIndex(
                          index,
                        )
                      }
                      className={[
                        "group block py-8 pl-5 pr-1",
                        "transition-all duration-500",
                        "sm:py-10 sm:pl-8",
                        active
                          ? "bg-white/65"
                          : "hover:bg-white/40",
                      ].join(" ")}
                    >
                      <div className="grid grid-cols-[52px_1fr_auto] items-start gap-3 sm:grid-cols-[72px_1fr_auto] sm:gap-5">
                        <span
                          className={[
                            "[font-family:var(--font-display)]",
                            "pt-1 text-[17px] font-semibold italic",
                            "transition-colors duration-300",
                            active
                              ? "text-[#b87586]"
                              : "text-[#071b33]/34",
                          ].join(" ")}
                        >
                          {pathway.number}
                        </span>

                        <div>
                          <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                            {
                              pathway.eyebrow
                            }
                          </p>

                          <h3
                            className={[
                              "mt-3 [font-family:var(--font-display)]",
                              "text-[36px] font-semibold leading-[0.95]",
                              "tracking-[-0.045em] transition-all duration-500",
                              "sm:text-[46px] lg:text-[51px]",
                              active
                                ? "translate-x-2 text-[#071b33]"
                                : "text-[#071b33]/70 group-hover:translate-x-2 group-hover:text-[#071b33]",
                            ].join(" ")}
                          >
                            {
                              pathway.title
                            }
                          </h3>

                          <div
                            className={[
                              "overflow-hidden",
                              "transition-all duration-500",
                              active
                                ? "mt-5 max-h-40 opacity-100"
                                : "mt-4 max-h-40 opacity-100 lg:mt-0 lg:max-h-0 lg:opacity-0",
                            ].join(" ")}
                          >
                            <p className="max-w-[520px] text-[14px] leading-7 text-[#071b33]/58 sm:text-[15px] sm:leading-8">
                              {
                                pathway.description
                              }
                            </p>

                            <span className="mt-5 inline-flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]">
                              {
                                pathway.linkLabel
                              }

                              <ArrowRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>

                        <span
                          className={[
                            "mt-2 flex h-11 w-11 shrink-0",
                            "items-center justify-center rounded-full",
                            "border transition-all duration-500",
                            active
                              ? "rotate-45 border-[#b87586] bg-[#b87586] text-white"
                              : "border-[#071b33]/15 text-[#071b33] group-hover:rotate-45 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white",
                          ].join(" ")}
                        >
                          <ArrowUpRight
                            className="h-4 w-4"
                            strokeWidth={1.9}
                          />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              },
            )}

            {/* CLOSING STATEMENT */}
            <div className="flex items-start gap-5 pt-9 sm:pt-11">
              <span className="mt-2 h-px w-10 shrink-0 bg-[#b87586]" />

              <p className="max-w-[600px] [font-family:var(--font-display)] text-[24px] font-medium italic leading-[1.2] tracking-[-0.025em] text-[#071b33]/62 sm:text-[29px]">
                Better businesses create
                better opportunities for
                everyone in the industry.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}