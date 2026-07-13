"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  ClipboardCheck,
  Compass,
  FileSearch2,
  Globe2,
  Landmark,
  LineChart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  UsersRound,
  WalletCards,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

const investorProfiles = [
  {
    number: "01",
    icon: Compass,
    title: "First-Time Beauty Investors",
    text: "For investors entering the beauty industry who need guidance on concept development, location, budget, staffing and operations.",
  },
  {
    number: "02",
    icon: LineChart,
    title: "Existing Owners Expanding",
    text: "For salon, spa, barbershop and beauty business owners planning another branch, a larger location or a stronger operating model.",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Diaspora Investors",
    text: "For investors abroad who need trusted local coordination, structured reporting and reliable implementation support.",
  },
  {
    number: "04",
    icon: Building2,
    title: "Property Developers",
    text: "For commercial property owners creating beauty hubs, wellness spaces or tenant-ready salon and spa facilities.",
  },
  {
    number: "05",
    icon: Landmark,
    title: "Corporate Investors",
    text: "For organisations exploring scalable beauty, grooming, wellness, workforce or beauty retail opportunities.",
  },
];

const supportAreas = [
  {
    number: "01",
    icon: FileSearch2,
    title: "Feasibility and Market Assessment",
    text: "We assess the proposed concept, market demand, surrounding competition, client profile and commercial suitability before major investment begins.",
    points: [
      "Business concept review",
      "Market and competitor analysis",
      "Target client definition",
      "Service demand assessment",
    ],
  },
  {
    number: "02",
    icon: MapPin,
    title: "Location and Space Evaluation",
    text: "We evaluate visibility, accessibility, customer flow, surrounding businesses, space capacity and operational suitability.",
    points: [
      "Location suitability",
      "Space workflow planning",
      "Service station planning",
      "Client journey assessment",
    ],
  },
  {
    number: "03",
    icon: WalletCards,
    title: "Investment and Business Planning",
    text: "We organise setup priorities, projected costs, revenue streams, service structure and operational assumptions into a practical roadmap.",
    points: [
      "Startup budget structure",
      "Revenue stream planning",
      "Operational cost planning",
      "Business plan development",
    ],
  },
  {
    number: "04",
    icon: Store,
    title: "Setup, Equipment and Suppliers",
    text: "We support equipment selection, product planning, supplier coordination, workstation design and launch-readiness decisions.",
    points: [
      "Equipment recommendations",
      "Supplier coordination",
      "Product planning",
      "Setup checklist",
    ],
  },
  {
    number: "05",
    icon: UsersRound,
    title: "Recruitment and Team Preparation",
    text: "We define required positions, recruit suitable professionals and prepare the team for service, sales, client care and accountability.",
    points: [
      "Staff structure planning",
      "Professional recruitment",
      "Job descriptions",
      "Staff training",
    ],
  },
  {
    number: "06",
    icon: ClipboardCheck,
    title: "Systems, Launch and Growth",
    text: "We establish procedures, management tools, service standards and operational controls needed to launch professionally and grow sustainably.",
    points: [
      "Policies and procedures",
      "Opening and closing systems",
      "Manager reporting tools",
      "Launch support",
    ],
  },
];

const investmentStages = [
  {
    number: "01",
    title: "Investor Discovery",
    text: "We understand your investment goals, preferred concept, location, budget range and expected level of involvement.",
  },
  {
    number: "02",
    title: "Feasibility Review",
    text: "We assess the opportunity, market, proposed location, concept, risks and practical commercial potential.",
  },
  {
    number: "03",
    title: "Concept and Business Planning",
    text: "We develop the service model, staffing structure, setup priorities, budget and implementation roadmap.",
  },
  {
    number: "04",
    title: "Setup and Recruitment",
    text: "We coordinate equipment, suppliers, operational documentation, recruitment and team preparation.",
  },
  {
    number: "05",
    title: "Launch and Performance Support",
    text: "We support opening, service standards, management reporting, operational control and early-stage growth.",
  },
];

const riskAreas = [
  {
    number: "01",
    title: "Poor location selection",
    text: "A premium interior cannot compensate for weak visibility, poor accessibility or limited market demand.",
  },
  {
    number: "02",
    title: "Uncontrolled setup costs",
    text: "Overspending on appearance before establishing priorities can weaken working capital and delay profitability.",
  },
  {
    number: "03",
    title: "Incorrect staffing structure",
    text: "Too many staff, unsuitable skills or unclear responsibilities can create unnecessary operating pressure.",
  },
  {
    number: "04",
    title: "Cash and stock leakage",
    text: "Weak controls, missing records and unclear approvals can reduce profitability even when sales appear strong.",
  },
  {
    number: "05",
    title: "Opening without systems",
    text: "Businesses that launch without procedures often experience inconsistent service, confusion and poor accountability.",
  },
  {
    number: "06",
    title: "Weak performance visibility",
    text: "Investors need accurate information on sales, costs, clients, staff productivity, stock and operational performance.",
  },
];

const investmentOpportunities = [
  "Hair salons and specialist studios",
  "Spas and wellness businesses",
  "Barbershops and grooming brands",
  "Nail, lash and beauty studios",
  "Beauty retail and product businesses",
  "Training and workforce businesses",
  "Multi-branch beauty concepts",
  "Beauty hubs and shared spaces",
];

const reportingFeatures = [
  "Clear management responsibilities",
  "Sales and service performance reporting",
  "Stock and product control routines",
  "Cash handling and approval procedures",
  "Staff attendance and productivity tracking",
  "Structured investor updates",
];

const marqueeItems = [
  "Feasibility",
  "Market Research",
  "Location",
  "Business Planning",
  "Setup",
  "Recruitment",
  "Systems",
  "Launch",
  "Growth",
];

const fadeUp = {
  initial: {
    opacity: 0,
    y: 35,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.28em] ${
        light ? "text-[#e6b7c2]" : "text-[#b87586]"
      }`}
    >
      <span
        className={`h-px w-10 ${
          light ? "bg-[#e6b7c2]" : "bg-[#b87586]"
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
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function InvestorsClient() {
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 130],
  );

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 55],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, 0.35],
  );

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[790px] overflow-hidden bg-[#071b33] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(217,163,175,0.23),transparent_31%),radial-gradient(circle_at_88%_8%,rgba(255,255,255,0.09),transparent_24%),radial-gradient(circle_at_74%_86%,rgba(184,117,134,0.16),transparent_34%)]" />

        <div className="absolute -left-28 bottom-0 h-[420px] w-[420px] rounded-full border border-white/10" />

        <div className="absolute -right-44 top-12 h-[560px] w-[560px] rounded-full bg-[#d9a3af]/10 blur-[100px]" />

        <div className="relative mx-auto grid min-h-[790px] max-w-[1320px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <motion.div
            style={{
              y: heroTextY,
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
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex items-center gap-2 border-b border-[#e6b7c2]/70 pb-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e6b7c2]"
            >
              <Sparkles className="h-4 w-4" />
              Beauty Industry Investment Support
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-[790px] font-serif text-[50px] font-black leading-[0.91] tracking-[-0.065em] text-white sm:text-[76px] lg:text-[94px]"
            >
              Invest in beauty with clarity and structure.
            </motion.h1>

            <motion.p
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
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-2xl text-[16px] leading-8 text-white/72 sm:text-[18px]"
            >
              Salons Assured supports local, diaspora and
              international investors planning salons, spas,
              barbershops, nail studios and beauty brands—from
              feasibility and planning to setup, staffing, launch
              and growth.
            </motion.p>

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
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-8 text-sm font-extrabold text-[#071b33] shadow-[0_20px_60px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Discuss Your Investment

                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="#investment-process"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-8 text-sm font-extrabold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-white/10"
              >
                Explore the Process

                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.45,
              }}
              className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-6 text-[10px] font-extrabold uppercase tracking-[0.19em] text-white/48"
            >
              <span>Market</span>
              <span className="h-1 w-1 rounded-full bg-[#d9a3af]" />
              <span>Location</span>
              <span className="h-1 w-1 rounded-full bg-[#d9a3af]" />
              <span>People</span>
              <span className="h-1 w-1 rounded-full bg-[#d9a3af]" />
              <span>Systems</span>
              <span className="h-1 w-1 rounded-full bg-[#d9a3af]" />
              <span>Growth</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              y: heroImageY,
            }}
            className="relative"
          >
            <div className="relative min-h-[560px] overflow-hidden rounded-[2.6rem] border border-white/15 bg-white/[0.05] shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:min-h-[620px]">
              <Image
                src="/hero-slide-1.png"
                alt="Professional beauty business investment and salon operations"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-[#071b33]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#e6b7c2]">
                  Investor Perspective
                </p>

                <h2 className="mt-4 max-w-xl font-serif text-[34px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-[44px]">
                  A beautiful space attracts attention. A strong
                  structure protects the investment.
                </h2>
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.65,
              }}
              className="absolute -bottom-8 -left-5 hidden min-w-[270px] rounded-[1.7rem] border border-[#ead5db] bg-white p-5 text-[#071b33] shadow-[0_25px_75px_rgba(7,27,51,0.2)] sm:block"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586]">
                  <BarChart3 className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#b87586]">
                    Built for
                  </p>

                  <p className="mt-1 text-sm font-black">
                    Sustainable Performance
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MOVING CAPABILITY STRIP */}
      <section className="overflow-hidden border-b border-[#ead5db] bg-[#fbf4f6] py-5">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
        >
          {[...marqueeItems, ...marqueeItems].map(
            (item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center"
              >
                <span className="px-8 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#071b33]/65 sm:px-12">
                  {item}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#b87586]" />
              </div>
            ),
          )}
        </motion.div>
      </section>

      {/* INVESTMENT THESIS */}
      <section className="relative overflow-hidden bg-[#f7f4f0] py-24 sm:py-32">
        <div className="absolute right-0 top-0 h-[430px] w-[430px] rounded-full bg-[#d9a3af]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionLabel>The Investment Opportunity</SectionLabel>

              <h2 className="mt-7 max-w-3xl font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] text-[#071b33] sm:text-[68px]">
                Beauty is powered by repeat demand, trust and
                personal service.
              </h2>
            </Reveal>

            <Reveal
              delay={0.12}
              className="lg:pt-14"
            >
              <p className="max-w-2xl text-[18px] leading-9 text-slate-600">
                Strong beauty businesses combine recurring
                services, skilled professionals, loyal clients and
                multiple revenue opportunities. But the strength of
                the investment depends on how well the concept,
                location, team, systems and numbers work together.
              </p>

              <div className="mt-10 grid gap-x-8 gap-y-5 border-t border-[#d8d0c9] pt-8 sm:grid-cols-2">
                {investmentOpportunities.map(
                  (opportunity, index) => (
                    <motion.div
                      key={opportunity}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                      }}
                      className="flex items-start gap-4 border-b border-[#d8d0c9] pb-5"
                    >
                      <span className="pt-0.5 font-serif text-[18px] font-black text-[#b87586]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-[14px] font-extrabold leading-6 text-[#071b33]">
                        {opportunity}
                      </p>
                    </motion.div>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO WE SUPPORT */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal className="grid gap-8 border-b border-[#ead5db] pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel>Who We Support</SectionLabel>

              <h2 className="mt-7 max-w-4xl font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] text-[#071b33] sm:text-[68px]">
                Different investors. One structured pathway.
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-slate-600 lg:justify-self-end">
              The support model is shaped around your goals,
              resources, location, preferred business model and
              expected level of involvement.
            </p>
          </Reveal>

          <div className="divide-y divide-[#ead5db]">
            {investorProfiles.map((profile, index) => {
              const Icon = profile.icon;

              return (
                <motion.article
                  key={profile.number}
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
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid gap-6 py-9 transition duration-300 hover:bg-[#fbf4f6]/55 sm:grid-cols-[85px_70px_0.82fr_1.18fr] sm:items-center sm:px-5"
                >
                  <span className="font-serif text-[36px] font-black tracking-[-0.05em] text-[#d9a3af]">
                    {profile.number}
                  </span>

                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead5db] text-[#b87586] transition duration-300 group-hover:border-[#071b33] group-hover:bg-[#071b33] group-hover:text-[#d9a3af]">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="font-serif text-[28px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[34px]">
                    {profile.title}
                  </h3>

                  <p className="max-w-xl text-[14px] leading-7 text-slate-600">
                    {profile.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORT AREAS */}
      <section className="relative overflow-hidden bg-[#071b33] py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(217,163,175,0.17),transparent_31%),radial-gradient(circle_at_86%_85%,rgba(255,255,255,0.07),transparent_28%)]" />

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel light>Investment Support</SectionLabel>

              <h2 className="mt-7 max-w-4xl font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-[68px]">
                From an idea to a business ready to operate.
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-white/64 lg:justify-self-end">
              We combine strategic thinking with practical beauty
              business experience so that decisions made before
              launch support performance after launch.
            </p>
          </Reveal>

          <div className="divide-y divide-white/15">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.number}
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
                    duration: 0.7,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid gap-8 py-12 lg:grid-cols-[90px_0.9fr_1.1fr] lg:gap-12"
                >
                  <div>
                    <span className="text-[10px] font-extrabold tracking-[0.22em] text-[#e6b7c2]">
                      {area.number}
                    </span>

                    <span className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[#e6b7c2] transition duration-300 group-hover:border-[#d9a3af] group-hover:bg-[#d9a3af] group-hover:text-[#071b33]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="max-w-xl font-serif text-[33px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-[42px]">
                      {area.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/62">
                      {area.text}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:pt-2">
                    {area.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 border-b border-white/15 pb-4 text-[12px] font-bold leading-5 text-white/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e6b7c2]" />

                        {point}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INVESTMENT PROCESS */}
      <section
        id="investment-process"
        className="relative bg-[#f7f4f0] py-24 sm:py-32"
      >
        <div className="mx-auto grid max-w-[1320px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <Reveal>
              <SectionLabel>Investment Process</SectionLabel>

              <h2 className="mt-7 max-w-xl font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] text-[#071b33] sm:text-[66px]">
                Clear decisions at every stage.
              </h2>

              <p className="mt-7 max-w-lg text-[16px] leading-8 text-slate-600">
                The process is structured to reduce guesswork,
                reveal risks early and translate the investment idea
                into practical actions.
              </p>

              <Link
                href="/contact"
                className="group mt-9 inline-flex items-center gap-3 border-b-2 border-[#b87586] pb-2 text-sm font-extrabold text-[#071b33] transition hover:text-[#b87586]"
              >
                Start an Investor Conversation

                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>

          <div className="border-t border-[#d8d0c9]">
            {investmentStages.map((stage, index) => (
              <motion.article
                key={stage.number}
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid gap-5 border-b border-[#d8d0c9] py-9 sm:grid-cols-[92px_0.75fr_1.25fr] sm:items-start"
              >
                <span className="font-serif text-[44px] font-black tracking-[-0.06em] text-[#d9a3af] transition duration-300 group-hover:text-[#b87586]">
                  {stage.number}
                </span>

                <h3 className="font-serif text-[28px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[34px]">
                  {stage.title}
                </h3>

                <p className="max-w-xl text-[14px] leading-7 text-slate-600">
                  {stage.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* RISK SECTION */}
      <section className="relative overflow-hidden bg-[#111b29] py-24 text-white sm:py-32">
        <div className="absolute -right-44 top-0 h-[500px] w-[500px] rounded-full bg-[#b87586]/12 blur-[120px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <Reveal className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <SectionLabel light>Protect the Investment</SectionLabel>

              <h2 className="mt-7 max-w-4xl font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] sm:text-[68px]">
                The expensive mistakes often happen before opening.
              </h2>
            </div>

            <p className="max-w-xl text-[16px] leading-8 text-white/62 lg:justify-self-end">
              Investment support should not only create an
              attractive business. It should also identify decisions
              that can weaken cash flow, accountability and
              long-term performance.
            </p>
          </Reveal>

          <div className="grid border-b border-white/15 lg:grid-cols-2">
            {riskAreas.map((risk, index) => (
              <motion.article
                key={risk.number}
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
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                className={`group grid gap-5 border-t border-white/15 py-9 lg:grid-cols-[70px_1fr] lg:px-8 ${
                  index % 2 === 0
                    ? "lg:border-r lg:border-white/15 lg:pl-0"
                    : "lg:pr-0"
                }`}
              >
                <span className="font-serif text-[31px] font-black tracking-[-0.05em] text-[#e6b7c2]">
                  {risk.number}
                </span>

                <div>
                  <h3 className="font-serif text-[27px] font-black leading-tight tracking-[-0.04em] text-white sm:text-[31px]">
                    {risk.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-[13px] leading-7 text-white/57">
                    {risk.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* DIASPORA OVERSIGHT */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#d9a3af]/13 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="relative min-h-[530px] overflow-hidden rounded-[2.5rem] shadow-[0_35px_100px_rgba(7,27,51,0.14)] sm:min-h-[650px]">
              <Image
                src="/why-choose-us.png"
                alt="Beauty business operational oversight and reporting"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/85 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#e6b7c2]">
                  Operational Visibility
                </p>

                <p className="mt-3 max-w-lg font-serif text-[31px] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[40px]">
                  Better oversight for investors who cannot be
                  present every day.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionLabel>Diaspora and Remote Investors</SectionLabel>

            <h2 className="mt-7 font-serif text-[45px] font-black leading-[0.96] tracking-[-0.06em] text-[#071b33] sm:text-[64px]">
              Visibility should not depend on being physically
              present.
            </h2>

            <p className="mt-7 text-[16px] leading-8 text-slate-600">
              For diaspora, international and less hands-on
              investors, we help establish responsibilities,
              reporting structures, operational controls and
              performance routines that create a clearer view of the
              business.
            </p>

            <div className="mt-9 border-t border-[#ead5db]">
              {reportingFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="flex items-center gap-4 border-b border-[#ead5db] py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586]">
                    <Check className="h-4 w-4" />
                  </span>

                  <p className="text-[13px] font-extrabold leading-6 text-[#071b33]">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#071b33] py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(217,163,175,0.22),transparent_32%),radial-gradient(circle_at_88%_78%,rgba(255,255,255,0.08),transparent_30%)]" />

        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1,
          }}
          className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8"
        >
          <motion.span
            initial={{
              scale: 0.75,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#e6b7c2]"
          >
            <Target className="h-6 w-6" />
          </motion.span>

          <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e6b7c2]">
            Start With the Right Questions
          </p>

          <h2 className="mt-5 font-serif text-[48px] font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-[74px]">
            Planning to invest in a salon, spa, barbershop or beauty
            brand?
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-8 text-white/63">
            Speak with Salons Assured before major decisions are
            made. We will help you understand the opportunity, the
            practical requirements and the clearest pathway forward.
          </p>

          <Link
            href="/contact"
            className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-9 text-sm font-extrabold text-[#071b33] shadow-[0_20px_60px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Discuss Your Investment

            <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <p className="mx-auto mt-7 max-w-xl text-[10px] leading-5 text-white/37">
            Salons Assured provides beauty business planning, setup
            and operational support. We do not provide regulated
            financial or securities advice.
          </p>
        </motion.div>
      </section>
    </main>
  );
}