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
  BookOpen,
  CalendarDays,
  Clock3,
  MessageCircleMore,
  Sparkles,
  UsersRound,
} from "lucide-react";

export type HomeInsight = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;

  coverImage?: {
    url?: string;
    alt?: string;
  };

  categories?: Array<{
    title?: string;
  }>;
};

type InsightsEventsClientProps = {
  insights: HomeInsight[];
};

const eventFormats = [
  "Masterclasses",
  "Owner Roundtables",
  "Live Business Audits",
];

const insightTopics = [
  "Leadership",
  "Recruitment",
  "Business Systems",
  "Customer Experience",
  "Growth",
];

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

function formatDate(dateValue: string) {
  try {
    return new Intl.DateTimeFormat(
      "en-KE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ).format(new Date(dateValue));
  } catch {
    return "";
  }
}

function getCategory(
  insight: HomeInsight,
) {
  return (
    insight.categories?.[0]?.title ||
    "Business Insight"
  );
}

function InsightImage({
  insight,
  priority = false,
}: {
  insight: HomeInsight;
  priority?: boolean;
}) {
  if (!insight.coverImage?.url) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#071b33]">
        <div className="text-center">
          <BookOpen
            className="mx-auto h-10 w-10 text-[#d9a3af]"
            strokeWidth={1.5}
          />

          <p className="mt-4 text-[8px] font-extrabold uppercase tracking-[0.25em] text-white/45">
            SAK Journal
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={insight.coverImage.url}
      alt={
        insight.coverImage.alt ||
        insight.title
      }
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 55vw"
      className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.035]"
    />
  );
}

export default function InsightsEventsClient({
  insights,
}: InsightsEventsClientProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const leadInsight =
    insights[0] || null;

  const secondaryInsights =
    insights.slice(1, 3);

  return (
    <section
      id="insights-events"
      className="relative isolate overflow-hidden bg-[#d9a3af] py-20 text-[#071b33] sm:py-24 lg:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 -top-80 h-[680px] w-[680px] rounded-full border border-[#071b33]/10" />

        <div className="absolute -left-24 -top-28 h-[310px] w-[310px] rounded-full border border-white/20" />

        <div className="absolute -bottom-72 -right-64 h-[620px] w-[620px] rounded-full border border-[#071b33]/10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(255,255,255,0.2),transparent_29%)]" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        {/* HEADER */}
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
              <span className="h-px w-10 bg-[#071b33]" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#071b33]/65">
                Insights & Events
              </p>
            </div>

            <h2 className="mt-7 max-w-[950px] [font-family:var(--font-display)] text-[46px] font-semibold leading-[0.93] tracking-[-0.052em] sm:text-[60px] lg:text-[76px]">
              Read the thinking.
              <span className="ml-3 font-medium italic text-white">
                Join the conversation.
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
            className="border-l border-[#071b33]/15 pl-6 lg:pb-2"
          >
            <p className="text-[14px] leading-8 text-[#071b33]/62">
              Practical intelligence for
              beauty business leaders,
              published through our journal
              and explored through live
              learning experiences.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Sparkles
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#071b33]/48">
                Learn · Discuss · Implement
              </span>
            </div>
          </motion.div>
        </div>

        {/* JOURNAL AND EVENTS LAYOUT */}
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
            amount: 0.12,
          }}
          transition={{
            duration: 0.9,
            ease: premiumEase,
          }}
          className="mt-12 grid overflow-hidden shadow-[0_35px_110px_rgba(7,27,51,0.2)] lg:mt-16 lg:grid-cols-[1.2fr_0.8fr]"
        >
          {/* JOURNAL SIDE */}
          <div className="bg-[#f8f5f2]">
            <div className="flex flex-col gap-5 border-b border-[#071b33]/10 px-6 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-9 lg:px-11">
              <div>
                <div className="flex items-center gap-3">
                  <BookOpen
                    className="h-4 w-4 text-[#b87586]"
                    strokeWidth={1.8}
                  />

                  <p className="text-[8px] font-extrabold uppercase tracking-[0.29em] text-[#b87586]">
                    Latest from the journal
                  </p>
                </div>

                <h3 className="mt-4 [font-family:var(--font-display)] text-[35px] font-semibold leading-none tracking-[-0.04em] sm:text-[43px]">
                  Ideas for better business decisions.
                </h3>
              </div>

              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 self-start text-[9px] font-extrabold uppercase tracking-[0.18em] sm:self-auto"
              >
                View all insights

                <ArrowUpRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>

            {leadInsight ? (
              <>
                {/* LEAD INSIGHT */}
                <Link
                  href={`/blog/${leadInsight.slug}`}
                  className="group grid border-b border-[#071b33]/10 lg:grid-cols-[0.92fr_1.08fr]"
                >
                  <div className="relative min-h-[330px] overflow-hidden bg-[#071b33] sm:min-h-[410px] lg:min-h-[460px]">
                    <InsightImage
                      insight={leadInsight}
                      priority={false}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/75 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 flex items-center gap-3 p-6 text-white sm:p-8">
                      <span className="h-2 w-2 rounded-full bg-[#d9a3af]" />

                      <span className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-white/70">
                        Latest perspective
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[8px] font-extrabold uppercase tracking-[0.2em]">
                        <span className="text-[#b87586]">
                          {getCategory(
                            leadInsight,
                          )}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#071b33]/25" />

                        <span className="text-[#071b33]/38">
                          {formatDate(
                            leadInsight.publishedAt,
                          )}
                        </span>
                      </div>

                      <h4 className="mt-6 [font-family:var(--font-display)] text-[36px] font-semibold leading-[0.97] tracking-[-0.043em] transition-colors duration-300 group-hover:text-[#b87586] sm:text-[45px]">
                        {leadInsight.title}
                      </h4>

                      <p className="mt-6 text-[13px] leading-7 text-[#071b33]/56">
                        {leadInsight.excerpt}
                      </p>
                    </div>

                    <span className="mt-9 inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]">
                      Read the article

                      <ArrowRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>

                {/* SECONDARY INSIGHTS */}
                {secondaryInsights.length > 0 && (
                  <div className="grid md:grid-cols-2">
                    {secondaryInsights.map(
                      (
                        insight,
                        index,
                      ) => (
                        <motion.div
                          key={insight._id}
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
                            amount: 0.55,
                          }}
                          transition={{
                            duration: 0.6,
                            delay:
                              index * 0.08,
                            ease: premiumEase,
                          }}
                          className={
                            index === 0
                              ? "border-b border-[#071b33]/10 md:border-b-0 md:border-r"
                              : ""
                          }
                        >
                          <Link
                            href={`/blog/${insight.slug}`}
                            className="group flex h-full min-h-[265px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-white sm:p-8"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                                  {getCategory(
                                    insight,
                                  )}
                                </p>

                                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#071b33]/30">
                                  0{index + 2}
                                </span>
                              </div>

                              <h4 className="mt-6 [font-family:var(--font-display)] text-[29px] font-semibold leading-[1] tracking-[-0.036em] transition-colors duration-300 group-hover:text-[#b87586]">
                                {insight.title}
                              </h4>

                              <p className="mt-5 line-clamp-3 text-[12px] leading-6 text-[#071b33]/52">
                                {insight.excerpt}
                              </p>
                            </div>

                            <div className="mt-7 flex items-center justify-between border-t border-[#071b33]/10 pt-5">
                              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#071b33]/35">
                                {formatDate(
                                  insight.publishedAt,
                                )}
                              </span>

                              <ArrowUpRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:rotate-45" />
                            </div>
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </div>
                )}
              </>
            ) : (
              /* EMPTY JOURNAL STATE */
              <div className="flex min-h-[570px] flex-col justify-between p-8 sm:p-11">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af]">
                    <BookOpen
                      className="h-5 w-5"
                      strokeWidth={1.7}
                    />
                  </div>

                  <h4 className="mt-9 max-w-[650px] [font-family:var(--font-display)] text-[40px] font-semibold leading-[0.96] tracking-[-0.043em] sm:text-[52px]">
                    The Salons Assured
                    beauty business journal.
                  </h4>

                  <p className="mt-6 max-w-[620px] text-[14px] leading-8 text-[#071b33]/55">
                    Practical perspectives on
                    leadership, recruitment,
                    systems, service,
                    management and sustainable
                    beauty business growth.
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="group mt-10 inline-flex h-[52px] self-start items-center gap-4 rounded-full bg-[#071b33] px-6 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white"
                >
                  Explore the journal

                  <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {/* EVENTS SIDE */}
          <Link
            href="/events"
            className="group relative flex min-h-[720px] flex-col overflow-hidden bg-[#071b33] text-white lg:min-h-full"
          >
            <div className="absolute inset-x-0 top-0 h-[46%] overflow-hidden">
              <Image
                src="/hero-slide-2.png"
                alt="Salons Assured beauty business event and professional learning experience"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-[#071b33]/15 to-transparent" />
            </div>

            <div className="pointer-events-none absolute -bottom-56 -right-52 h-[480px] w-[480px] rounded-full border border-white/[0.06]" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-[270px] w-[270px] rounded-full border border-[#d9a3af]/12" />

            <div className="relative z-10 flex h-full flex-1 flex-col justify-between px-7 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9 lg:px-10">
              <div className="flex items-start justify-between gap-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#071b33]/35 px-4 py-3 backdrop-blur-md">
                  <CalendarDays
                    className="h-4 w-4 text-[#d9a3af]"
                    strokeWidth={1.8}
                  />

                  <span className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-white/65">
                    Live experiences
                  </span>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#071b33]/30 text-[#d9a3af] backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-[#d9a3af] group-hover:bg-[#d9a3af] group-hover:text-[#071b33]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-[330px] sm:mt-[390px] lg:mt-[360px]">
                <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#d9a3af]">
                  Next Salons Assured Experience
                </p>

                <h3 className="mt-6 [font-family:var(--font-display)] text-[45px] font-semibold leading-[0.9] tracking-[-0.052em] sm:text-[57px]">
                  The Beauty Business
                  <span className="block font-medium italic text-[#d9a3af]">
                    Growth Room.
                  </span>
                </h3>

                <p className="mt-6 max-w-[500px] text-[13px] leading-7 text-white/48">
                  Practical conversations,
                  masterclasses and industry
                  experiences built around the
                  real challenges facing beauty
                  businesses.
                </p>

                <div className="mt-8 border-y border-white/[0.13]">
                  {eventFormats.map(
                    (format, index) => (
                      <div
                        key={format}
                        className="flex items-center gap-4 border-b border-white/[0.1] py-4 last:border-b-0"
                      >
                        <span className="[font-family:var(--font-display)] text-[15px] font-semibold italic text-[#d9a3af]">
                          0{index + 1}
                        </span>

                        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/52">
                          {format}
                        </span>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Clock3
                      className="h-4 w-4 text-[#d9a3af]"
                      strokeWidth={1.8}
                    />

                    <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                      Programme published on
                      the Events page
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.18em]">
                    Explore events

                    <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* TOPIC STRIP */}
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
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: premiumEase,
          }}
          className="grid border-b border-[#071b33]/15 lg:grid-cols-[240px_1fr]"
        >
          <div className="flex items-center gap-4 bg-[#071b33] px-6 py-7 text-white sm:px-9">
            <MessageCircleMore
              className="h-5 w-5 shrink-0 text-[#d9a3af]"
              strokeWidth={1.7}
            />

            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#d9a3af]">
                What we explore
              </p>

              <p className="mt-1 [font-family:var(--font-display)] text-[20px] font-semibold">
                Business conversations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-[#071b33]/15 sm:grid-cols-5 lg:border-l lg:border-t-0">
            {insightTopics.map(
              (topic, index) => (
                <div
                  key={topic}
                  className={[
                    "flex min-h-[88px] items-center justify-center px-4 py-6 text-center",
                    "border-[#071b33]/15 transition-colors duration-300 hover:bg-white/20",
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
                  <span className="text-[9px] font-extrabold uppercase leading-5 tracking-[0.15em] text-[#071b33]/58">
                    {topic}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* CLOSING LINKS */}
        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <UsersRound
              className="h-5 w-5 text-[#071b33]/55"
              strokeWidth={1.7}
            />

            <p className="[font-family:var(--font-display)] text-[22px] font-medium italic text-[#071b33]/65 sm:text-[26px]">
              Knowledge becomes more valuable
              when it changes what the
              business does next.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex h-[50px] items-center gap-3 rounded-full border border-[#071b33]/20 px-6 text-[9px] font-extrabold uppercase tracking-[0.17em] transition-colors hover:bg-[#071b33] hover:text-white"
            >
              Journal

              <BookOpen className="h-4 w-4" />
            </Link>

            <Link
              href="/events"
              className="inline-flex h-[50px] items-center gap-3 rounded-full bg-[#071b33] px-6 text-[9px] font-extrabold uppercase tracking-[0.17em] text-white"
            >
              Events

              <CalendarDays className="h-4 w-4 text-[#d9a3af]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}