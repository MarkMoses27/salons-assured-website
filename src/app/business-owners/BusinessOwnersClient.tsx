"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
  type ComponentType,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

type IconComponent = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type HeroSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
  objectPosition: string;
};

type BusinessJourney = {
  number: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  objectPosition: string;
  icon: IconComponent;
};

type ServiceLine = {
  number: string;
  title: string;
  description: string;
  includes: string;
  icon: IconComponent;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ClientEngagement = {
  number: string;
  businessType: string;
  title: string;
  challenge: string;
  response: string;
  deliverable: string;
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

/*
  REQUIRED IMAGES INSIDE THE PUBLIC FOLDER

  public/owner-hero.webp
  public/sak-owner-training.webp
  public/sak-client-partnership-team.webp
  public/sak-setup-readiness.webp
  public/sak-team-briefing.webp
  public/sak-growth-team.webp
  public/sak-business-systems-training.webp
*/

const heroSlides: HeroSlide[] = [
  {
    src: "/owner-hero.webp",
    alt:
      "Beauty business owner and salon professionals inside a modern salon",
    eyebrow: "Owner leadership",
    caption:
      "Build a business that can perform beyond the owner.",
    objectPosition: "center center",
  },
  {
    src: "/sak-owner-training.webp",
    alt:
      "Salons Assured Kenya conducting business training for salon owners and professionals",
    eyebrow: "Business development",
    caption:
      "Practical training that turns business challenges into clear actions.",
    objectPosition: "center center",
  },
  {
    src: "/sak-client-partnership-team.webp",
    alt:
      "Salons Assured Kenya working with a salon owner and professional beauty team",
    eyebrow: "Client partnership",
    caption:
      "Work with owners and teams to strengthen the whole business.",
    objectPosition: "center center",
  },
];

const businessJourneys: BusinessJourney[] = [
  {
    number: "01",
    label: "Starting",
    title:
      "Build the operating model before opening the doors.",
    description:
      "For founders and investors preparing to launch a salon, spa, barbershop, nail studio or beauty venture with a clear commercial and operational foundation.",
    points: [
      "Business concept and service direction",
      "Staffing and management structure",
      "Equipment, systems and launch readiness",
    ],
    image: "/sak-setup-readiness.webp",
    imageAlt:
      "Beauty professional preparing a treatment room for business operations",
    objectPosition: "center center",
    icon: Building2,
  },
  {
    number: "02",
    label: "Fixing",
    title:
      "Diagnose the real issue behind the visible pressure.",
    description:
      "For businesses facing inconsistent service, staff instability, weak controls, low sales, poor client retention or too much dependence on the owner.",
    points: [
      "Business and team assessment",
      "Service and accountability reset",
      "Prioritised corrective actions",
    ],
    image: "/sak-team-briefing.webp",
    imageAlt:
      "Salons Assured team member briefing salon professionals during business training",
    objectPosition: "center center",
    icon: ShieldCheck,
  },
  {
    number: "03",
    label: "Growing",
    title:
      "Professionalise the business before growth adds pressure.",
    description:
      "For established beauty businesses strengthening management, developing stronger teams, improving visibility or preparing for expansion.",
    points: [
      "Management and performance systems",
      "Client experience and visibility",
      "Scalable routines and leadership support",
    ],
    image: "/sak-growth-team.webp",
    imageAlt:
      "Large professional salon and spa team prepared for business growth",
    objectPosition: "center center",
    icon: TrendingUp,
  },
];

const serviceLines: ServiceLine[] = [
  {
    number: "01",
    title: "Recruitment & Staffing",
    description:
      "Structured recruitment support for technical, front-desk, support and management roles within beauty businesses.",
    includes:
      "Role definition, sourcing, screening, shortlisting, interview support and onboarding guidance.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Training & Team Development",
    description:
      "Practical development for staff, supervisors and managers responsible for service quality and client experience.",
    includes:
      "Customer care, professionalism, consultation, sales, retention, teamwork and leadership.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Business Systems & Documentation",
    description:
      "Written operating structures that reduce confusion, improve consistency and make accountability visible.",
    includes:
      "SOPs, HR documents, checklists, reports, stock controls, staff forms and performance tools.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Setup & Launch Support",
    description:
      "Operational planning and implementation support for new salons, spas, barbershops and beauty ventures.",
    includes:
      "Service planning, staffing, equipment guidance, workflows, induction and launch readiness.",
    icon: Building2,
  },
  {
    number: "05",
    title: "Digital Growth & Visibility",
    description:
      "Practical support to improve how the business is discovered, understood and trusted online.",
    includes:
      "Website direction, Google presence, content planning, brand presentation and customer acquisition.",
    icon: Megaphone,
  },
  {
    number: "06",
    title: "Management Consultancy",
    description:
      "Focused support for owners who need stronger leadership, performance visibility and operating discipline.",
    includes:
      "Business assessments, manager support, performance reviews, improvement plans and expansion readiness.",
    icon: BarChart3,
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Listen",
    description:
      "We understand the business stage, team, pressure points, owner priorities and desired outcome.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "We separate visible symptoms from deeper issues in people, systems, service, visibility or management.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We shape a practical response around the business reality, resources, urgency and intended result.",
  },
  {
    number: "04",
    title: "Implement",
    description:
      "We support execution through recruitment, documents, training, onboarding and management action.",
  },
  {
    number: "05",
    title: "Strengthen",
    description:
      "We review progress, improve accountability and establish stronger routines for the next stage.",
  },
];

const clientEngagements: ClientEngagement[] = [
  {
    number: "01",
    businessType: "Established Salon",
    title: "Staff and operations assessment",
    challenge:
      "The owner needed clearer visibility into staff concerns, service consistency, management gaps and immediate business priorities.",
    response:
      "SAK conducted a structured assessment, reviewed team feedback and examined the operational issues affecting daily performance.",
    deliverable:
      "Documented findings, prioritised recommendations and clearer direction for corrective management action.",
  },
  {
    number: "02",
    businessType: "Growing Beauty Business",
    title: "Team standards and management support",
    challenge:
      "The business needed clearer expectations around professionalism, service quality, client handling and staff accountability.",
    response:
      "SAK supported team alignment, clarified service expectations and provided practical management direction.",
    deliverable:
      "Clearer team expectations and practical actions for management follow-up and service improvement.",
  },
];

const ownerDeliverables = [
  "Business assessment findings",
  "Prioritised action plan",
  "Staffing and role recommendations",
  "Documents, SOPs and management tools",
  "Training or implementation support",
  "Follow-up and next-stage recommendations",
];

const sakAdvantages = [
  "Beauty-industry specialisation",
  "Connected support across people, systems and growth",
  "Practical implementation, not advice alone",
  "Understanding of the Kenyan beauty-business market",
];

const transformationWords = [
  "CLEARER ROLES",
  "STRONGER TEAMS",
  "BETTER SERVICE",
  "VISIBLE CONTROL",
  "OWNER CONFIDENCE",
  "SUSTAINABLE GROWTH",
];

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={[
          "h-px w-10",
          light ? "bg-[#d9a3af]" : "bg-[#b87586]",
        ].join(" ")}
      />

      <p
        className={[
          "text-[9px] font-extrabold uppercase tracking-[0.31em]",
          light ? "text-[#d9a3af]" : "text-[#b87586]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
              filter: "blur(4px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -7% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SafeImage({
  src,
  alt,
  sizes,
  priority = false,
  objectPosition = "center center",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#071b33]">
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          sizes={sizes}
          onError={() => setFailed(true)}
          className={["object-cover", className].join(" ")}
          style={{
            objectPosition,
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#071b33] px-8 text-center">
          <div className="max-w-sm">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Image not found
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Confirm that this image is directly inside the public folder.
            </p>

            <p className="mt-3 break-all text-[10px] text-white/35">
              {src}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function AutoPlayHero() {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      paused ||
      heroSlides.length < 2
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) % heroSlides.length,
      );
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused, shouldReduceMotion]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#06172c]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={slide.src}
            aria-hidden={!isActive}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.025 : 1.08,
            }}
            transition={{
              opacity: {
                duration: shouldReduceMotion ? 0 : 1.15,
                ease: premiumEase,
              },
              scale: {
                duration: shouldReduceMotion ? 0 : 6.5,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >
            <SafeImage
              src={slide.src}
              alt={slide.alt}
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 58vw"
              objectPosition={slide.objectPosition}
            />
          </motion.div>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/[0.15] bg-[#071b33]/[0.78] p-6 backdrop-blur-md sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <motion.p
              key={`${activeSlide.src}-eyebrow`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]"
            >
              {activeSlide.eyebrow}
            </motion.p>

            <motion.p
              key={`${activeSlide.src}-caption`}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
              className="mt-3 max-w-[540px] [font-family:var(--font-display)] text-[29px] font-semibold leading-[0.98] tracking-[-0.042em] text-white sm:text-[39px]"
            >
              {activeSlide.caption}
            </motion.p>
          </div>

          <div
            className="flex items-center gap-2"
            aria-hidden="true"
          >
            {heroSlides.map((slide, index) => (
              <span
                key={`${slide.src}-progress`}
                className={[
                  "h-[3px] rounded-full transition-all duration-700",
                  index === activeIndex
                    ? "w-12 bg-[#d9a3af]"
                    : "w-5 bg-white/30",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessOwnersClient() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const pageProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 130,
      damping: 30,
      mass: 0.25,
    },
  );

  function handleBusinessInquiry(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const value = (field: string) =>
      String(data.get(field) ?? "").trim();

    const message = [
      "Hello Salons Assured Kenya,",
      "",
      "BUSINESS OWNER CONSULTATION REQUEST",
      "",
      `Contact Person: ${value("contactName")}`,
      `Business Name: ${value("businessName")}`,
      `Phone Number: ${value("phone")}`,
      `Business Location: ${value("location")}`,
      `Business Stage: ${value("businessStage")}`,
      `Support Required: ${value("supportRequired")}`,
      `Preferred Engagement: ${value("engagementType")}`,
      "",
      "Main Business Challenge:",
      value("challenge"),
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/254715500268?text=${encodeURIComponent(
        message,
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const fieldClass =
    "h-14 w-full border border-white/[0.15] bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d9a3af] focus:bg-white/[0.09]";

  const selectClass =
    "h-14 w-full border border-white/[0.15] bg-[#0b2442] px-4 text-sm text-white outline-none transition focus:border-[#d9a3af]";

  return (
    <main
      id="top"
      className="overflow-hidden bg-white text-[#071b33]"
    >
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-[#d9a3af]"
        style={{
          scaleX: pageProgress,
        }}
      />

      {/* HERO */}

      <section className="relative isolate min-h-[900px] overflow-hidden bg-[#071b33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_16%,rgba(217,163,175,0.20),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.07),transparent_24%)]" />

          <div className="absolute -left-64 top-10 h-[620px] w-[620px] rounded-full border border-white/[0.05]" />
        </div>

        <div className="relative mx-auto grid min-h-[900px] max-w-[1500px] lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 34,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.95,
              ease: premiumEase,
            }}
            className="relative z-20 flex items-center px-5 pb-20 pt-36 sm:px-8 lg:px-12 lg:py-32 xl:px-16"
          >
            <div className="max-w-[760px]">
              <SectionLabel light>
                For Beauty Business Owners
              </SectionLabel>

              <h1 className="mt-8 [font-family:var(--font-display)] text-[58px] font-semibold leading-[0.84] tracking-[-0.072em] sm:text-[82px] lg:text-[88px] xl:text-[104px]">
                Run the business

                <span className="block font-medium italic text-[#d9a3af]">
                  behind the beauty.
                </span>
              </h1>

              <p className="mt-8 max-w-[650px] text-[16px] leading-8 text-white/70 sm:text-[18px]">
                Salons Assured Kenya helps owners strengthen
                the people, systems, service standards and
                management decisions behind salons, spas,
                barbershops and beauty ventures.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#business-inquiry"
                  className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-7 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#071b33] transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Book a business consultation

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#owner-support"
                  className="group inline-flex items-center justify-center gap-3 px-2 py-3 text-[10px] font-extrabold uppercase tracking-[0.17em] text-white/72 transition hover:text-white"
                >
                  Explore owner support

                  <ArrowDown className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-y-1" />
                </Link>
              </div>

              <div className="mt-11 grid grid-cols-2 gap-x-7 gap-y-5 border-t border-white/[0.15] pt-7 sm:grid-cols-4">
                {[
                  ["01", "People"],
                  ["02", "Systems"],
                  ["03", "Service"],
                  ["04", "Growth"],
                ].map(([number, label]) => (
                  <div key={number}>
                    <p className="[font-family:var(--font-display)] text-[24px] font-semibold italic text-[#d9a3af]">
                      {number}
                    </p>

                    <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.2em] text-white/48">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 46,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.05,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: premiumEase,
            }}
            className="relative min-h-[620px] border-t border-white/[0.10] lg:min-h-[900px] lg:border-l lg:border-t-0"
          >
            <AutoPlayHero />
          </motion.div>
        </div>
      </section>

      {/* OWNER REALITY */}

      <section className="relative overflow-hidden bg-[#f8f5f3] py-20 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute -right-64 -top-64 h-[620px] w-[620px] rounded-full border border-[#b87586]/10" />

        <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/[0.12] pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionLabel>
                The owner reality
              </SectionLabel>

              <h2 className="mt-8 max-w-[920px] [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[72px] lg:text-[88px]">
                A beautiful business can still be

                <span className="ml-3 font-medium italic text-[#b87586]">
                  difficult to run.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-[#071b33]/62 lg:justify-self-end">
              When systems are weak, the owner becomes the
              receptionist, supervisor, problem-solver,
              marketer and quality controller at the same
              time. We help create a business that carries
              its own weight.
            </p>
          </Reveal>

          <div className="grid border-b border-[#071b33]/[0.12] md:grid-cols-3">
            {[
              {
                value: "People",
                text:
                  "The team understands what good performance looks like.",
              },
              {
                value: "Control",
                text:
                  "The owner can see what is working and what is leaking.",
              },
              {
                value: "Growth",
                text:
                  "Expansion is supported by routines, not hope.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.value}
                delay={index * 0.06}
                className="border-[#071b33]/[0.12] px-0 py-10 md:border-r md:px-8 md:last:border-r-0 lg:py-14"
              >
                <p className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                  Outcome{" "}
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-5 [font-family:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.045em]">
                  {item.value}
                </p>

                <p className="mt-5 max-w-sm text-[13px] leading-7 text-[#071b33]/60">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER JOURNEYS */}

      <section
        id="owner-support"
        className="bg-[#071b33] text-white"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
            <Reveal className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <SectionLabel light>
                  Choose your business moment
                </SectionLabel>

                <h2 className="mt-8 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[72px] lg:text-[88px]">
                  Starting, fixing and growing require
                  different decisions.
                </h2>
              </div>

              <p className="max-w-2xl text-[16px] leading-8 text-white/62 lg:justify-self-end">
                The support begins with the stage of the
                business and the operating problem that
                needs attention—not a standard package
                forced onto every owner.
              </p>
            </Reveal>
          </div>

          {businessJourneys.map(
            (journey, index) => {
              const Icon = journey.icon;
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={journey.number}
                  className="grid min-h-[740px] border-t border-white/[0.12] lg:grid-cols-2"
                >
                  <Reveal
                    className={[
                      "relative min-h-[500px] overflow-hidden lg:min-h-[740px]",
                      imageFirst
                        ? "lg:order-1"
                        : "lg:order-2",
                    ].join(" ")}
                  >
                    <SafeImage
                      src={journey.image}
                      alt={journey.imageAlt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      objectPosition={journey.objectPosition}
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-7 p-7 sm:p-10">
                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                          Business moment {journey.number}
                        </p>

                        <p className="mt-3 [font-family:var(--font-display)] text-[54px] font-semibold leading-none tracking-[-0.055em] text-white sm:text-[70px]">
                          {journey.label}
                        </p>
                      </div>

                      <Icon
                        className="h-7 w-7 shrink-0 text-[#d9a3af]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    className={[
                      "flex items-center px-5 py-16 sm:px-10 lg:min-h-[740px] lg:px-14 xl:px-20",
                      imageFirst
                        ? "lg:order-2"
                        : "lg:order-1",
                    ].join(" ")}
                  >
                    <div className="max-w-[660px]">
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-extrabold tracking-[0.22em] text-[#d9a3af]">
                          {journey.number}
                        </span>

                        <span className="h-px w-10 bg-white/[0.18]" />

                        <span className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-white/45">
                          {journey.label} stage
                        </span>
                      </div>

                      <h3 className="mt-8 [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[60px] lg:text-[68px]">
                        {journey.title}
                      </h3>

                      <p className="mt-7 text-[15px] leading-8 text-white/62">
                        {journey.description}
                      </p>

                      <div className="mt-10 border-t border-white/[0.12]">
                        {journey.points.map((point) => (
                          <p
                            key={point}
                            className="flex items-center gap-4 border-b border-white/[0.12] py-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/72"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d9a3af]" />

                            {point}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </article>
              );
            },
          )}
        </div>
      </section>

      {/* SERVICES */}

      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/[0.12] pb-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <SectionLabel>
                Engage Salons Assured
              </SectionLabel>

              <h2 className="mt-8 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[70px] lg:text-[82px]">
                Practical support for the work your
                business needs now.
              </h2>
            </div>

            <p className="max-w-2xl text-[16px] leading-8 text-[#071b33]/62 lg:justify-self-end">
              Owners can engage SAK for one focused
              assignment or for connected support across
              several areas of the business.
            </p>
          </Reveal>

          <div>
            {serviceLines.map(
              (service, index) => {
                const Icon = service.icon;

                return (
                  <Reveal
                    key={service.number}
                    delay={Math.min(index * 0.04, 0.16)}
                  >
                    <div className="group grid gap-6 border-b border-[#071b33]/[0.12] py-9 sm:grid-cols-[55px_230px_1fr_1fr_55px] sm:items-start lg:py-11">
                      <span className="text-[9px] font-extrabold tracking-[0.22em] text-[#b87586]">
                        {service.number}
                      </span>

                      <h3 className="[font-family:var(--font-display)] text-[29px] font-semibold leading-[1.02] tracking-[-0.038em] sm:text-[34px]">
                        {service.title}
                      </h3>

                      <p className="text-[14px] leading-7 text-[#071b33]/68">
                        {service.description}
                      </p>

                      <p className="text-[12px] leading-7 text-[#071b33]/48">
                        {service.includes}
                      </p>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071b33]/[0.12] text-[#b87586] transition duration-300 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white">
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}

      <section className="bg-[#f8f5f3] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10">
          <Reveal className="relative min-h-[620px] overflow-hidden bg-[#071b33] sm:min-h-[720px]">
            <SafeImage
              src="/sak-business-systems-training.webp"
              alt="Salons Assured Kenya consultant developing a business training plan"
              sizes="(max-width: 1024px) 100vw, 52vw"
              objectPosition="center center"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
                Beyond advice
              </p>

              <p className="mt-4 max-w-[650px] [font-family:var(--font-display)] text-[35px] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-[48px]">
                Recommendations are translated into tools,
                responsibilities and practical next actions.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <SectionLabel>
              What the owner receives
            </SectionLabel>

            <h2 className="mt-8 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[66px] lg:text-[76px]">
              Clearer direction and usable business tools.
            </h2>

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                  Typical deliverables
                </p>

                <div className="mt-5 border-t border-[#071b33]/[0.14]">
                  {ownerDeliverables.map((item, index) => (
                    <div
                      key={item}
                      className="grid grid-cols-[35px_1fr] gap-3 border-b border-[#071b33]/[0.14] py-4"
                    >
                      <span className="text-[8px] font-extrabold tracking-[0.18em] text-[#b87586]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-[13px] font-semibold leading-6 text-[#071b33]/72">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
                  Why Salons Assured
                </p>

                <div className="mt-5 border-t border-[#071b33]/[0.14]">
                  {sakAdvantages.map((item, index) => (
                    <div
                      key={item}
                      className="grid grid-cols-[35px_1fr] gap-3 border-b border-[#071b33]/[0.14] py-4"
                    >
                      <span className="text-[8px] font-extrabold tracking-[0.18em] text-[#b87586]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-[13px] font-semibold leading-6 text-[#071b33]/72">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SELECTED ENGAGEMENTS */}

      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-10 border-b border-[#071b33]/[0.12] pb-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <SectionLabel>
                Selected owner engagements
              </SectionLabel>

              <h2 className="mt-8 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[68px] lg:text-[80px]">
                Turning business pressure into a clearer
                action direction.
              </h2>
            </div>

            <p className="max-w-2xl text-[16px] leading-8 text-[#071b33]/62 lg:justify-self-end">
              Our work is structured around the client’s
              real business challenge rather than a generic
              consultancy template.
            </p>
          </Reveal>

          <div>
            {clientEngagements.map(
              (engagement, index) => (
                <Reveal
                  key={engagement.number}
                  delay={index * 0.08}
                >
                  <article className="grid gap-8 border-b border-[#071b33]/[0.12] py-12 lg:grid-cols-[110px_0.7fr_1.3fr] lg:py-16">
                    <div>
                      <p className="[font-family:var(--font-display)] text-[52px] font-semibold italic leading-none text-[#b87586]">
                        {engagement.number}
                      </p>

                      <p className="mt-4 text-[8px] font-extrabold uppercase leading-5 tracking-[0.22em] text-[#071b33]/45">
                        {engagement.businessType}
                      </p>
                    </div>

                    <h3 className="[font-family:var(--font-display)] text-[36px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[46px]">
                      {engagement.title}
                    </h3>

                    <div className="grid gap-7 sm:grid-cols-3">
                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                          The challenge
                        </p>

                        <p className="mt-4 text-[13px] leading-7 text-[#071b33]/62">
                          {engagement.challenge}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                          SAK response
                        </p>

                        <p className="mt-4 text-[13px] leading-7 text-[#071b33]/62">
                          {engagement.response}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#b87586]">
                          Owner received
                        </p>

                        <p className="mt-4 text-[13px] leading-7 text-[#071b33]/62">
                          {engagement.deliverable}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="relative overflow-hidden bg-[#f8f5f3] py-20 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute -bottom-80 -left-64 h-[700px] w-[700px] rounded-full border border-[#b87586]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>
              How SAK works
            </SectionLabel>

            <h2 className="mt-8 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.92] tracking-[-0.061em] sm:text-[68px] lg:text-[78px]">
              Advice must become a working routine.
            </h2>

            <p className="mt-7 max-w-xl text-[15px] leading-8 text-[#071b33]/62">
              We move from understanding the pressure to
              creating practical actions, documents,
              training and management habits that can
              continue after the engagement.
            </p>
          </Reveal>

          <div className="border-t border-[#071b33]/[0.14]">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={Math.min(index * 0.05, 0.18)}
              >
                <div className="grid gap-6 border-b border-[#071b33]/[0.14] py-9 sm:grid-cols-[70px_210px_1fr] sm:items-start lg:py-12">
                  <span className="[font-family:var(--font-display)] text-[34px] font-semibold italic text-[#b87586]">
                    {step.number}
                  </span>

                  <h3 className="[font-family:var(--font-display)] text-[38px] font-semibold leading-none tracking-[-0.045em] sm:text-[46px]">
                    {step.title}
                  </h3>

                  <p className="max-w-xl text-[14px] leading-8 text-[#071b33]/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOVING OUTCOMES */}

      <section className="overflow-hidden bg-[#d9a3af] py-8 text-[#071b33] sm:py-10">
        <motion.div
          aria-hidden="true"
          className="flex w-max items-center"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[
            ...transformationWords,
            ...transformationWords,
          ].map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="flex items-center"
            >
              <span className="whitespace-nowrap px-7 [font-family:var(--font-display)] text-[38px] font-semibold tracking-[-0.045em] sm:px-10 sm:text-[58px] lg:text-[72px]">
                {word}
              </span>

              <span className="h-3 w-3 rounded-full bg-[#071b33]" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* BUSINESS INQUIRY */}

      <section
        id="business-inquiry"
        className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(217,163,175,0.20),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(184,117,134,0.12),transparent_30%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-10">
          <Reveal className="lg:sticky lg:top-28">
            <SectionLabel light>
              Business consultation
            </SectionLabel>

            <h2 className="mt-8 [font-family:var(--font-display)] text-[50px] font-semibold leading-[0.91] tracking-[-0.064em] sm:text-[72px] lg:text-[84px]">
              Tell us what is happening

              <span className="ml-3 font-medium italic text-[#d9a3af]">
                behind your brand.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-8 text-white/65">
              Share the current business stage, the main
              challenge and the support you believe is
              needed. The information will open directly
              in WhatsApp for the SAK team.
            </p>

            <div className="mt-10 grid gap-5 border-t border-white/[0.15] pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af]">
                  Call
                </p>

                <p className="mt-2 text-[13px] font-semibold text-white/75">
                  0715 500 268 / 0706 551 028
                </p>
              </div>

              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af]">
                  Visit
                </p>

                <p className="mt-2 text-[13px] font-semibold text-white/75">
                  Kwaheri Road, Runda, Nairobi
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={handleBusinessInquiry}
              className="border border-white/[0.14] bg-white/[0.055] p-5 backdrop-blur-md sm:p-8 lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Contact person
                  </span>

                  <input
                    name="contactName"
                    type="text"
                    required
                    placeholder="Your full name"
                    className={fieldClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Business name
                  </span>

                  <input
                    name="businessName"
                    type="text"
                    required
                    placeholder="Salon, spa or business name"
                    className={fieldClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Phone number
                  </span>

                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder="07..."
                    className={fieldClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Business location
                  </span>

                  <input
                    name="location"
                    type="text"
                    required
                    placeholder="Town or area"
                    className={fieldClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Business stage
                  </span>

                  <select
                    name="businessStage"
                    required
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select business stage
                    </option>

                    <option value="Planning to start">
                      Planning to start
                    </option>

                    <option value="Preparing to open">
                      Preparing to open
                    </option>

                    <option value="Recently opened">
                      Recently opened
                    </option>

                    <option value="Operating but struggling">
                      Operating but struggling
                    </option>

                    <option value="Stable and improving">
                      Stable and improving
                    </option>

                    <option value="Planning to expand">
                      Planning to expand
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Support required
                  </span>

                  <select
                    name="supportRequired"
                    required
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select support
                    </option>

                    <option value="Recruitment and staffing">
                      Recruitment and staffing
                    </option>

                    <option value="Training and team development">
                      Training and team development
                    </option>

                    <option value="Business systems and documentation">
                      Business systems and documentation
                    </option>

                    <option value="Setup and launch support">
                      Setup and launch support
                    </option>

                    <option value="Digital growth and visibility">
                      Digital growth and visibility
                    </option>

                    <option value="Management consultancy">
                      Management consultancy
                    </option>

                    <option value="Not sure - advise me">
                      Not sure — advise me
                    </option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Preferred engagement
                  </span>

                  <select
                    name="engagementType"
                    required
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select engagement type
                    </option>

                    <option value="Business assessment">
                      Business assessment
                    </option>

                    <option value="One-off project">
                      One-off project
                    </option>

                    <option value="Implementation support">
                      Implementation support
                    </option>

                    <option value="Ongoing advisory">
                      Ongoing advisory
                    </option>

                    <option value="Complete business setup">
                      Complete business setup
                    </option>

                    <option value="Not sure - advise me">
                      Not sure — advise me
                    </option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/50">
                    Main business challenge
                  </span>

                  <textarea
                    name="challenge"
                    required
                    rows={6}
                    placeholder="Briefly explain what is happening and what you need help with."
                    className="w-full resize-none border border-white/[0.15] bg-white/[0.06] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#d9a3af] focus:bg-white/[0.09]"
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-col gap-5 border-t border-white/[0.15] pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-[11px] leading-6 text-white/42">
                  Submitting this form opens WhatsApp with
                  the consultation details already
                  prepared.
                </p>

                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-7 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#071b33] transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Discuss my business with SAK

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}