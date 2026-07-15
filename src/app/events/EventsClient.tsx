"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Handshake,
  MapPin,
  MessageCircleMore,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const eventFormats = [
  {
    number: "01",
    label: "Business Learning",
    title: "Beauty Business Masterclasses",
    text: "Focused sessions on leadership, management, customer experience, staffing, profitability, marketing and structured beauty business growth.",
    icon: GraduationCap,
  },
  {
    number: "02",
    label: "Team Performance",
    title: "Private Staff Training",
    text: "Practical training for salon, spa and barbershop teams covering service standards, professionalism, sales, communication and client retention.",
    icon: UsersRound,
  },
  {
    number: "03",
    label: "Real Business Conversations",
    title: "Live Audits and Owner Roundtables",
    text: "Honest conversations around real beauty business problems, operational weaknesses and practical actions for improvement.",
    icon: MessageCircleMore,
  },
  {
    number: "04",
    label: "Industry Connection",
    title: "Networking and Panel Sessions",
    text: "Professional gatherings connecting business owners, managers, trainers, investors, suppliers and skilled beauty professionals.",
    icon: Handshake,
  },
];

const takeaways = [
  {
    number: "01",
    title: "A clearer understanding of the real problem",
    text: "Participants learn how to separate visible symptoms from the deeper staffing, management, service or operational issue.",
  },
  {
    number: "02",
    title: "Practical frameworks",
    text: "Sessions include useful structures, questions and methods that can be applied within a real beauty business.",
  },
  {
    number: "03",
    title: "Better business decisions",
    text: "Owners and managers leave with more clarity on priorities, people, systems, service and business performance.",
  },
  {
    number: "04",
    title: "Industry connections",
    text: "Participants meet other professionals facing similar challenges and building businesses within the same industry.",
  },
  {
    number: "05",
    title: "Clear next actions",
    text: "Every experience is designed to move from discussion to specific actions that can be implemented after the event.",
  },
];

const audiences = [
  "Salon owners",
  "Spa owners",
  "Barbershop owners",
  "Beauty business managers",
  "Beauty professionals",
  "New investors",
  "Training institutions",
  "Industry suppliers",
];

const faqs = [
  {
    question: "Who are Salons Assured events designed for?",
    answer:
      "Different events may be designed for beauty business owners, managers, staff teams, professionals, investors, trainers, suppliers or mixed industry audiences.",
  },
  {
    question: "Will events be physical or online?",
    answer:
      "Events may be physical, virtual or hybrid. The format, location and participation details will be published with each event announcement.",
  },
  {
    question: "Can we book a private training session?",
    answer:
      "Yes. Businesses can request private staff training, management workshops, owner strategy sessions and live operational audits.",
  },
  {
    question: "How will upcoming events be announced?",
    answer:
      "Upcoming events will be announced on this page and through the official Salons Assured social media and communication channels.",
  },
];

const tickerItems = [
  "Masterclasses",
  "Staff Training",
  "Owner Roundtables",
  "Live Business Audits",
  "Industry Panels",
  "Networking",
  "Leadership",
  "Beauty Business Growth",
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

type RevealDirection = "up" | "left" | "right" | "scale";

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.28em] ${
        light ? "text-[#f2c8d2]" : "text-[#b87586]"
      }`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: premiumEase,
        }}
        className={`h-px w-10 origin-left ${
          light ? "bg-[#f2c8d2]" : "bg-[#b87586]"
        }`}
      />

      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  amount = 0.12,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: RevealDirection;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const initialTransform =
    direction === "left"
      ? { x: -42, y: 0, scale: 1 }
      : direction === "right"
        ? { x: 42, y: 0, scale: 1 }
        : direction === "scale"
          ? { x: 0, y: 0, scale: 0.96 }
          : { x: 0, y: 34, scale: 1 };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 1,
              x: initialTransform.x,
              y: initialTransform.y,
              scale: initialTransform.scale,
              filter: "blur(5px)",
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.85,
        delay: shouldReduceMotion ? 0 : delay,
        ease: premiumEase,
      }}
      style={{
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function EventsClient() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: pageScrollProgress } = useScroll();

  const progressScaleX = useSpring(pageScrollProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.25,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 135],
  );

  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.075],
  );

  const heroContentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 65],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    [1, shouldReduceMotion ? 1 : 0.28],
  );

  return (
    <main className="overflow-hidden bg-[#f7f4f0]">
      {/* PAGE SCROLL PROGRESS */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-[#d9a3af]"
        style={{
          scaleX: progressScaleX,
        }}
      />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[850px] overflow-hidden bg-[#071b33] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,163,175,0.22),transparent_31%),radial-gradient(circle_at_86%_10%,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_72%_90%,rgba(184,117,134,0.16),transparent_34%)]" />

        <div className="absolute -left-48 bottom-[-170px] h-[600px] w-[600px] rounded-full border border-white/10" />

        <div className="absolute right-[8%] top-20 h-32 w-32 rounded-full bg-[#d9a3af]/15 blur-3xl" />

        <div className="relative mx-auto grid min-h-[850px] max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
          <motion.div
            style={{
              y: heroContentY,
              opacity: heroOpacity,
            }}
            className="relative z-10"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e6b7c2]"
            >
              <Sparkles className="h-4 w-4" />
              Salons Assured Live Experiences
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.95,
                delay: 0.08,
                ease: premiumEase,
              }}
              className="mt-9 font-serif text-[55px] font-black leading-[0.83] tracking-[-0.075em] sm:text-[85px] lg:text-[112px]"
            >
              Beauty
              <br />
              business
              <br />

              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke:
                    "1.5px rgba(230,183,194,0.72)",
                }}
              >
                happens live.
              </span>
            </motion.h1>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.24,
              }}
              className="mt-10 grid max-w-3xl gap-7 border-t border-white/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end"
            >
              <p className="max-w-xl text-[16px] leading-8 text-white/67 sm:text-[18px]">
                Powerful masterclasses, honest business
                conversations, professional training and industry
                experiences for the people building Africa&apos;s
                beauty businesses.
              </p>

              <Link
                href="#featured-event"
                className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-[#e6b7c2] transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
                aria-label="Explore featured event"
              >
                <ArrowDown className="h-5 w-5 transition group-hover:translate-y-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 55,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.16,
              ease: premiumEase,
            }}
            style={{
              y: heroImageY,
            }}
            className="relative lg:pl-4"
          >
            <div className="relative min-h-[570px] overflow-hidden rounded-t-[15rem] rounded-b-[2rem] border border-white/15 bg-white/[0.05] shadow-[0_45px_140px_rgba(0,0,0,0.42)] sm:min-h-[680px]">
              <motion.div
                className="absolute inset-0"
                style={{
                  scale: heroImageScale,
                }}
              >
                <Image
                  src="/sak-events-hero.webp"
                  alt="Salons Assured beauty business event with speaker and participants"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 43vw"
                  className="object-cover object-center"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-transparent to-[#071b33]/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#e6b7c2]">
                  Learn. Connect. Implement.
                </p>

                <p className="mt-4 max-w-md font-serif text-[31px] font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-[40px]">
                  Conversations that change how beauty businesses
                  operate.
                </p>
              </div>
            </div>

            <div className="absolute -left-8 top-[36%] hidden -rotate-90 items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.3em] text-white/45 xl:flex">
              Nairobi
              <span className="h-px w-16 bg-white/30" />
              Kenya
            </div>
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <section className="overflow-hidden border-b border-[#d8d0c9] bg-[#d9a3af] py-5">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
        >
          {[...tickerItems, ...tickerItems].map(
            (item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center"
              >
                <span className="px-9 font-serif text-[18px] font-black tracking-[-0.03em] text-[#071b33] sm:px-14 sm:text-[21px]">
                  {item}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#071b33]" />
              </div>
            ),
          )}
        </motion.div>
      </section>

      {/* FEATURED EVENT */}
      <section
        id="featured-event"
        className="relative bg-[#f7f4f0] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <Reveal
            direction="left"
            className="grid gap-8 border-b border-[#d8d0c9] pb-8 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <SectionLabel>
                Next Salons Assured Experience
              </SectionLabel>

              <h2 className="mt-7 max-w-5xl font-serif text-[48px] font-black leading-[0.91] tracking-[-0.065em] text-[#071b33] sm:text-[75px] lg:text-[94px]">
                The Beauty Business
                <br />
                Growth Room.
              </h2>
            </div>

            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
              Next date announcing soon
            </p>
          </Reveal>

          <div className="grid border-b border-[#d8d0c9] lg:grid-cols-[0.38fr_1.1fr_0.72fr]">
            {/* DATE */}
            <Reveal
              direction="left"
              className="border-b border-[#d8d0c9] py-10 lg:border-b-0 lg:border-r lg:pr-9"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                Next Edition
              </p>

              <p className="mt-7 font-serif text-[92px] font-black leading-[0.75] tracking-[-0.09em] text-[#071b33] sm:text-[125px]">
                00
              </p>

              <p className="mt-7 font-serif text-[30px] font-black tracking-[-0.04em] text-[#071b33]">
                Date to be announced
              </p>

              <div className="mt-9 space-y-4 border-t border-[#d8d0c9] pt-6 text-[12px] font-bold text-slate-600">
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-[#b87586]" />
                  Registration opening soon
                </p>

                <p className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-[#b87586]" />
                  Full programme to be announced
                </p>

                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#b87586]" />
                  Nairobi, Kenya
                </p>
              </div>
            </Reveal>

            {/* MAIN IMAGE */}
            <Reveal
              delay={0.1}
              className="border-b border-[#d8d0c9] py-10 lg:border-b-0 lg:border-r lg:px-10"
            >
              <div className="group relative min-h-[500px] overflow-hidden rounded-[1rem] sm:min-h-[630px]">
                <Image
                  src="/sak-featured-event.webp"
                  alt="Salons Assured facilitator leading a beauty business growth session"
                  fill
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/75 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white sm:p-9">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-[#f2c8d2]">
                    A Salons Assured Signature Experience
                  </p>

                  <p className="mt-4 max-w-lg font-serif text-[31px] font-black leading-[1.02] tracking-[-0.04em] sm:text-[40px]">
                    Strategy, people, systems and growth in one
                    powerful room.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* EVENT DETAILS */}
            <Reveal
              delay={0.18}
              direction="right"
              className="py-10 lg:pl-10"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                The Experience
              </p>

              <h3 className="mt-6 font-serif text-[35px] font-black leading-[1.02] tracking-[-0.045em] text-[#071b33]">
                Not another motivational talk.
              </h3>

              <p className="mt-6 text-[15px] leading-8 text-slate-600">
                A practical beauty business session where owners,
                managers and professionals discuss the real
                challenges affecting staff, service, clients,
                systems and profitability.
              </p>

              <div className="mt-8 border-t border-[#d8d0c9]">
                {[
                  "Focused business conversations",
                  "Real industry challenges",
                  "Practical frameworks",
                  "Professional connections",
                  "Clear next actions",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 border-b border-[#d8d0c9] py-4 text-[12px] font-extrabold text-[#071b33]"
                  >
                    <Check className="h-4 w-4 text-[#b87586]" />
                    {item}
                  </p>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-9 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#071b33] px-7 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b87586]"
              >
                Join the Priority List

                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EVENT FORMATS */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <Reveal
            direction="left"
            className="grid gap-10 border-b border-[#ead5db] pb-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"
          >
            <div>
              <SectionLabel>
                Our Event Experiences
              </SectionLabel>

              <h2 className="mt-7 max-w-5xl font-serif text-[47px] font-black leading-[0.94] tracking-[-0.06em] text-[#071b33] sm:text-[72px]">
                Different rooms for different conversations.
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-slate-600 lg:justify-self-end">
              Every format is designed around a specific business
              need, audience and practical outcome.
            </p>
          </Reveal>

          <div className="divide-y divide-[#ead5db]">
            {eventFormats.map((event, index) => {
              const Icon = event.icon;

              return (
                <motion.article
                  key={event.number}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 30,
                          filter: "blur(5px)",
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.7,
                    delay: shouldReduceMotion
                      ? 0
                      : index * 0.05,
                    ease: premiumEase,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 10,
                        }
                  }
                  className="group grid gap-7 py-11 transition-colors duration-300 hover:bg-[#fbf4f6]/55 sm:grid-cols-[75px_70px_0.9fr_1.1fr_45px] sm:items-center sm:px-5"
                >
                  <span className="font-serif text-[34px] font-black text-[#d9a3af]">
                    {event.number}
                  </span>

                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead5db] text-[#b87586] transition duration-300 group-hover:border-[#071b33] group-hover:bg-[#071b33] group-hover:text-[#d9a3af]">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                      {event.label}
                    </p>

                    <h3 className="mt-3 font-serif text-[29px] font-black leading-[1.03] tracking-[-0.04em] text-[#071b33] sm:text-[36px]">
                      {event.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-[14px] leading-7 text-slate-600">
                    {event.text}
                  </p>

                  <ArrowRight className="hidden h-5 w-5 text-[#b87586] transition duration-300 group-hover:translate-x-2 sm:block" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TAKEAWAYS */}
      <section className="relative overflow-hidden bg-[#d9a3af] py-24 sm:py-32">
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 360],
                }
          }
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-44 top-0 h-[520px] w-[520px] rounded-full border border-[#071b33]/10"
        />

        <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:px-10">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <Reveal>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af]">
                <Target className="h-6 w-6" />
              </div>

              <p className="mt-8 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#071b33]/65">
                What You Leave With
              </p>

              <h2 className="mt-6 font-serif text-[48px] font-black leading-[0.9] tracking-[-0.065em] text-[#071b33] sm:text-[72px]">
                The event ends.
                <br />
                The work begins.
              </h2>

              <p className="mt-7 max-w-lg text-[16px] leading-8 text-[#071b33]/65">
                The value of a business event is measured by what
                participants understand, change and implement
                afterwards.
              </p>
            </Reveal>
          </div>

          <div className="border-t border-[#071b33]/20">
            {takeaways.map((item, index) => (
              <motion.article
                key={item.number}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 1,
                        x: index % 2 === 0 ? 34 : -34,
                        filter: "blur(5px)",
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.65,
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                  ease: premiumEase,
                }}
                className="grid gap-5 border-b border-[#071b33]/20 py-9 sm:grid-cols-[85px_0.95fr_1.05fr]"
              >
                <span className="font-serif text-[41px] font-black tracking-[-0.06em] text-[#071b33]/35">
                  {item.number}
                </span>

                <h3 className="font-serif text-[28px] font-black leading-[1.04] tracking-[-0.04em] text-[#071b33] sm:text-[34px]">
                  {item.title}
                </h3>

                <p className="max-w-xl text-[14px] leading-7 text-[#071b33]/65">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STORY */}
      <section className="bg-[#071b33] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <Reveal
            direction="left"
            className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"
          >
            <div>
              <SectionLabel light>
                Inside the Experience
              </SectionLabel>

              <h2 className="mt-7 max-w-5xl font-serif text-[48px] font-black leading-[0.91] tracking-[-0.065em] sm:text-[76px]">
                Real rooms.
                <br />
                Real people.
                <br />
                Real business.
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-white/60 lg:justify-self-end">
              A closer look at Salons Assured learning experiences,
              facilitators and the professionals taking part in the
              conversation.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="group relative min-h-[650px] overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/sak-event-room.webp"
                  alt="Salons Assured beauty business learning session with facilitator and participants"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/75 via-transparent to-transparent" />

                <p className="absolute bottom-7 left-7 font-serif text-[31px] font-black tracking-[-0.04em] sm:bottom-9 sm:left-9">
                  Learning together.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <Reveal delay={0.08} direction="right">
                <div className="group relative min-h-[310px] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/sak-event-networking.webp"
                    alt="Salons Assured facilitator engaging participants during a professional event"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/70 via-transparent to-transparent" />

                  <p className="absolute bottom-6 left-6 font-serif text-[26px] font-black tracking-[-0.04em]">
                    Connecting the industry.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16} direction="right">
                <div className="group relative min-h-[320px] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/sak-event-action.webp"
                    alt="Salons Assured facilitator sharing practical beauty business insights"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/70 via-transparent to-transparent" />

                  <p className="absolute bottom-6 left-6 font-serif text-[26px] font-black tracking-[-0.04em]">
                    Turning ideas into action.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="bg-[#f7f4f0] py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <Reveal
            direction="left"
            className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div>
              <SectionLabel>
                Who Is in the Room?
              </SectionLabel>

              <h2 className="mt-7 font-serif text-[48px] font-black leading-[0.92] tracking-[-0.065em] text-[#071b33] sm:text-[72px]">
                The people shaping beauty business.
              </h2>
            </div>

            <div className="grid border-t border-[#d8d0c9] sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion
                      ? 0
                      : index * 0.04,
                    ease: premiumEase,
                  }}
                  className={`flex items-center gap-4 border-b border-[#d8d0c9] py-6 ${
                    index % 2 === 0
                      ? "sm:border-r sm:pr-6"
                      : "sm:pl-6"
                  }`}
                >
                  <span className="font-serif text-[20px] font-black text-[#b87586]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-[14px] font-extrabold text-[#071b33]">
                    {audience}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRIVATE EXPERIENCES */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
          <Reveal direction="left">
            <div className="group relative min-h-[560px] overflow-hidden rounded-[1.5rem] sm:min-h-[680px]">
              <Image
                src="/sak-private-training.webp"
                alt="Salons Assured facilitator leading a private beauty business training session"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/80 via-transparent to-transparent" />

              <p className="absolute bottom-8 left-8 max-w-xl font-serif text-[35px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-[45px]">
                Your team. Your challenges. Your private session.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} direction="right">
            <SectionLabel>
              Private Business Experiences
            </SectionLabel>

            <h2 className="mt-7 font-serif text-[48px] font-black leading-[0.92] tracking-[-0.065em] text-[#071b33] sm:text-[70px]">
              Bring the experience to your business.
            </h2>

            <p className="mt-7 max-w-xl text-[16px] leading-8 text-slate-600">
              Salons Assured can design a private experience for
              your salon, spa, barbershop, beauty school, product
              company, management team or industry organisation.
            </p>

            <div className="mt-9 border-t border-[#ead5db]">
              {[
                "Staff development training",
                "Manager workshops",
                "Owner strategy sessions",
                "Customer-service programmes",
                "Live business audits",
                "Custom industry panels",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center justify-between border-b border-[#ead5db] py-4 text-[13px] font-extrabold text-[#071b33]"
                >
                  {item}
                  <ArrowRight className="h-4 w-4 text-[#b87586]" />
                </p>
              ))}
            </div>

            <Link
              href="/contact"
              className="group mt-9 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#071b33] px-8 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#b87586]"
            >
              Request a Private Experience

              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f4f0] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <Reveal direction="left">
            <SectionLabel>
              Event Information
            </SectionLabel>

            <h2 className="mt-7 font-serif text-[48px] font-black leading-[0.92] tracking-[-0.065em] text-[#071b33] sm:text-[68px]">
              Before you join us.
            </h2>
          </Reveal>

          <div className="border-t border-[#d8d0c9]">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 20,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.05,
                  ease: premiumEase,
                }}
                className="group border-b border-[#d8d0c9]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7">
                  <div className="flex gap-5">
                    <span className="font-serif text-[18px] font-black text-[#b87586]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-serif text-[23px] font-black leading-tight tracking-[-0.035em] text-[#071b33] sm:text-[27px]">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8d0c9] text-[#b87586] transition duration-300 group-open:rotate-45 group-open:bg-[#071b33] group-open:text-white">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pb-8 pl-10 text-[14px] leading-7 text-slate-600 sm:pl-14">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#071b33] py-28 text-white sm:py-36">
        <motion.div
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.8, 1, 0.8],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(217,163,175,0.22),transparent_32%),radial-gradient(circle_at_88%_78%,rgba(255,255,255,0.08),transparent_30%)]"
        />

        <Reveal
          direction="scale"
          className="relative mx-auto max-w-[1150px] px-5 text-center sm:px-8"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e6b7c2]">
            Your Seat in the Room
          </p>

          <h2 className="mt-7 font-serif text-[53px] font-black leading-[0.88] tracking-[-0.075em] text-white sm:text-[83px] lg:text-[105px]">
            Be part of the next beauty business conversation.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-8 text-white/62">
            Join the priority list for upcoming masterclasses,
            owner conversations, team training and Salons Assured
            industry experiences.
          </p>

          <Link
            href="/contact"
            className="group mt-10 inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-10 py-4 text-sm font-extrabold text-[#071b33] shadow-[0_22px_70px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Join the Priority List

            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}