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
  FileCheck2,
  Layers3,
  LineChart,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Advantage = {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const advantages: Advantage[] = [
  {
    number: "01",
    label: "Specialist perspective",
    title: "We understand the beauty business from the inside.",
    description:
      "Our work is designed around the realities of salons, spas, barbershops, nail studios and beauty ventures—not copied from unrelated industries.",
    icon: Sparkles,
  },
  {
    number: "02",
    label: "Diagnosis before solutions",
    title: "We clarify the real problem before recommending action.",
    description:
      "A staffing issue may also involve management, systems, culture or service standards. We examine the connected causes instead of treating only the visible symptom.",
    icon: SearchCheck,
  },
  {
    number: "03",
    label: "Practical implementation",
    title: "Our work is designed to be used, not filed away.",
    description:
      "Recommendations are translated into operating documents, checklists, responsibilities, training priorities and clear management actions.",
    icon: FileCheck2,
  },
  {
    number: "04",
    label: "Connected business growth",
    title: "We connect people, systems and strategy.",
    description:
      "The objective is not one isolated improvement. It is a stronger business where the team, client experience, operations and growth direction work together.",
    icon: Layers3,
  },
];

const businessAreas = [
  {
    label: "People",
    position:
      "left-1/2 top-0 -translate-x-1/2",
  },
  {
    label: "Systems",
    position:
      "right-0 top-1/2 -translate-y-1/2",
  },
  {
    label: "Growth",
    position:
      "bottom-0 left-1/2 -translate-x-1/2",
  },
  {
    label: "Client Experience",
    position:
      "left-0 top-1/2 -translate-y-1/2",
  },
];

const outcomes = [
  "Clearer priorities",
  "Stronger operating standards",
  "Better management visibility",
  "Practical next steps",
];

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

export default function WhyChooseUs() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      id="why-salons-assured"
      className="relative isolate overflow-hidden bg-white py-20 text-[#071b33] sm:py-24 lg:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-72 h-[620px] w-[620px] rounded-full border border-[#071b33]/[0.045]" />

        <div className="absolute -right-16 -top-28 h-[310px] w-[310px] rounded-full border border-[#b87586]/10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_92%_12%,rgba(217,163,175,0.16),transparent_29%)]" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADER */}
        <div className="grid gap-10 lg:grid-cols-[1fr_370px] lg:items-end lg:gap-20">
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
                Why Salons Assured
              </p>
            </div>

            <h2 className="mt-7 max-w-[950px] [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[60px] lg:text-[76px]">
              Because the problem is rarely
              <span className="ml-3 font-medium italic text-[#b87586]">
                just one thing.
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
              A business challenge can move
              across people, systems,
              management, service and
              growth. We work across those
              connections to create a more
              complete response.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <BadgeCheck
                className="h-4 w-4 text-[#b87586]"
                strokeWidth={1.8}
              />

              <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#071b33]/42">
                One connected business view
              </span>
            </div>
          </motion.div>
        </div>

        {/* CONNECTED BUSINESS MODEL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 34,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.9,
            ease: premiumEase,
          }}
          className="mt-12 overflow-hidden border-y border-[#071b33]/12 lg:mt-16 lg:grid lg:grid-cols-[0.88fr_1.12fr]"
        >
          {/* LEFT: OPERATING LENS */}
          <div className="relative min-h-[610px] overflow-hidden bg-[#071b33] p-7 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-48 -top-48 h-[440px] w-[440px] rounded-full border border-white/[0.05]" />

              <div className="absolute -bottom-48 -right-44 h-[430px] w-[430px] rounded-full border border-[#d9a3af]/10" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(184,117,134,0.2),transparent_34%)]" />
            </div>

            <div className="relative z-10">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#d9a3af]">
                The SAK operating lens
              </p>

              <h3 className="mt-5 max-w-[520px] [font-family:var(--font-display)] text-[37px] font-semibold leading-[0.96] tracking-[-0.043em] sm:text-[46px]">
                We look at the business as
                one connected system.
              </h3>

              <p className="mt-5 max-w-[520px] text-[13px] leading-7 text-white/48">
                Improving one area without
                considering the others can
                create another problem. Our
                approach connects the parts
                that shape daily performance.
              </p>
            </div>

            {/* ORBIT MODEL */}
            <div className="relative z-10 mx-auto mt-12 aspect-square w-full max-w-[390px] sm:mt-14">
              {/* CROSS CONNECTIONS */}
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
                      : 1.1,
                  delay: 0.2,
                  ease: premiumEase,
                }}
                className="absolute left-[10%] right-[10%] top-1/2 h-px origin-center bg-white/[0.12]"
              />

              <motion.div
                initial={{
                  scaleY: 0,
                }}
                whileInView={{
                  scaleY: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1.1,
                  delay: 0.2,
                  ease: premiumEase,
                }}
                className="absolute bottom-[10%] left-1/2 top-[10%] w-px origin-center bg-white/[0.12]"
              />

              {/* OUTER RING */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.82,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 1,
                  ease: premiumEase,
                }}
                className="absolute inset-[8%] rounded-full border border-[#d9a3af]/30"
              />

              {/* MIDDLE RING */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.78,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.12,
                  ease: premiumEase,
                }}
                className="absolute inset-[22%] rounded-full border border-white/[0.12]"
              />

              {/* INNER RING */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.72,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.22,
                  ease: premiumEase,
                }}
                className="absolute inset-[34%] rounded-full border border-[#d9a3af]/30 bg-white/[0.025]"
              />

              {/* CENTRE */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.7,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.35,
                  ease: premiumEase,
                }}
                className="absolute left-1/2 top-1/2 z-20 flex h-[108px] w-[108px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#d9a3af] text-center text-[#071b33] shadow-[0_20px_55px_rgba(0,0,0,0.3)] sm:h-[124px] sm:w-[124px]"
              >
                <span className="[font-family:var(--font-display)] text-[30px] font-bold leading-none sm:text-[35px]">
                  SAK
                </span>

                <span className="mt-2 max-w-[80px] text-[7px] font-extrabold uppercase leading-3 tracking-[0.18em]">
                  Connected business view
                </span>
              </motion.div>

              {/* BUSINESS AREA LABELS */}
              {businessAreas.map(
                (area, index) => (
                  <motion.div
                    key={area.label}
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.7,
                    }}
                    transition={{
                      duration: 0.55,
                      delay:
                        0.42 +
                        index * 0.08,
                      ease: premiumEase,
                    }}
                    className={`absolute z-30 ${area.position}`}
                  >
                    <span className="flex min-h-[42px] min-w-[90px] items-center justify-center rounded-full border border-white/[0.15] bg-[#0c2440] px-4 py-2 text-center text-[8px] font-extrabold uppercase leading-4 tracking-[0.16em] text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:min-w-[108px]">
                      {area.label}
                    </span>
                  </motion.div>
                ),
              )}

              {/* MOVING ORBIT POINT */}
              {!shouldReduceMotion && (
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[8%] z-10 rounded-full"
                >
                  <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#d9a3af] shadow-[0_0_0_6px_rgba(217,163,175,0.12)]" />
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT: ADVANTAGES */}
          <div className="bg-[#f8f5f3]">
            <div className="border-b border-[#071b33]/10 px-6 py-7 sm:px-9 lg:px-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.29em] text-[#b87586]">
                    Our difference
                  </p>

                  <h3 className="mt-4 [font-family:var(--font-display)] text-[34px] font-semibold leading-none tracking-[-0.04em] sm:text-[42px]">
                    How we approach the work.
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#071b33]/35">
                  <LineChart
                    className="h-4 w-4 text-[#b87586]"
                    strokeWidth={1.8}
                  />

                  Strategy into action
                </div>
              </div>
            </div>

            <div>
              {advantages.map(
                (advantage, index) => {
                  const Icon =
                    advantage.icon;

                  return (
                    <motion.article
                      key={advantage.number}
                      initial={{
                        opacity: 0,
                        x: 24,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.45,
                      }}
                      transition={{
                        duration: 0.65,
                        delay:
                          index * 0.07,
                        ease: premiumEase,
                      }}
                      className="group relative grid gap-5 border-b border-[#071b33]/10 px-6 py-8 transition-colors duration-500 last:border-b-0 hover:bg-white sm:grid-cols-[64px_1fr_48px] sm:gap-7 sm:px-9 lg:px-11"
                    >
                      <div>
                        <span className="[font-family:var(--font-display)] text-[28px] font-medium italic leading-none text-[#b87586]/45 transition-colors duration-500 group-hover:text-[#b87586]">
                          {advantage.number}
                        </span>
                      </div>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                          {advantage.label}
                        </p>

                        <h4 className="mt-3 max-w-[620px] [font-family:var(--font-display)] text-[27px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[31px]">
                          {advantage.title}
                        </h4>

                        <p className="mt-4 max-w-[650px] text-[12px] leading-6 text-[#071b33]/54 sm:text-[13px] sm:leading-7">
                          {advantage.description}
                        </p>
                      </div>

                      <div className="absolute right-6 top-8 sm:static">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition-all duration-500 group-hover:border-[#071b33] group-hover:bg-[#071b33] group-hover:text-white">
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.7}
                          />
                        </span>
                      </div>

                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b87586] transition-all duration-700 group-hover:w-full" />
                    </motion.article>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>

        {/* BUSINESS OUTCOMES */}
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.75,
            ease: premiumEase,
          }}
          className="grid border-b border-[#071b33]/12 lg:grid-cols-[245px_1fr]"
        >
          <div className="flex items-center gap-4 bg-[#eee5e8] px-6 py-7 sm:px-9">
            <BadgeCheck
              className="h-5 w-5 shrink-0 text-[#b87586]"
              strokeWidth={1.8}
            />

            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                What this creates
              </p>

              <p className="mt-1 [font-family:var(--font-display)] text-[21px] font-semibold">
                Practical business clarity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-[#071b33]/10 sm:grid-cols-4 lg:border-l lg:border-t-0">
            {outcomes.map(
              (outcome, index) => (
                <div
                  key={outcome}
                  className={[
                    "flex min-h-[94px] items-center justify-center px-4 py-6 text-center",
                    "border-[#071b33]/10",
                    index % 2 === 0
                      ? "border-r"
                      : "",
                    index < 2
                      ? "border-b sm:border-b-0"
                      : "",
                    "sm:border-r",
                    "sm:last:border-r-0",
                  ].join(" ")}
                >
                  <span className="text-[9px] font-extrabold uppercase leading-5 tracking-[0.15em] text-[#071b33]/48">
                    {outcome}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
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
            duration: 0.8,
            ease: premiumEase,
          }}
          className="relative mt-12 overflow-hidden bg-[#d9a3af] px-7 py-10 text-[#071b33] sm:px-10 sm:py-12 lg:mt-16 lg:px-14"
        >
          <div className="pointer-events-none absolute -right-36 -top-36 h-[360px] w-[360px] rounded-full border border-[#071b33]/10" />

          <div className="pointer-events-none absolute -right-10 -top-10 h-[170px] w-[170px] rounded-full border border-white/25" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.29em] text-[#071b33]/50">
                Start with clarity
              </p>

              <h3 className="mt-5 max-w-[850px] [font-family:var(--font-display)] text-[40px] font-semibold leading-[0.94] tracking-[-0.046em] sm:text-[52px] lg:text-[60px]">
                A stronger business begins
                with understanding what needs
                to change.
              </h3>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-[54px] items-center justify-center gap-4 self-start rounded-full bg-[#071b33] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-1 lg:self-auto"
            >
              Book a consultation

              <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <Link
            href="/about"
            className="relative z-10 mt-8 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/65 transition-colors hover:text-[#071b33]"
          >
            Learn more about Salons Assured

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}