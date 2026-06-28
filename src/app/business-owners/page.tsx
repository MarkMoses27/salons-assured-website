import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  FileText,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Salon & Beauty Business Owners | Salons Assured Kenya Ltd",
  description:
    "Salons Assured Kenya supports salon, spa, barbershop, nail studio and beauty business owners with staffing, training, systems, setup, digital growth and management consulting.",
};

const challenges = [
  "Unreliable staff and poor attendance",
  "Low sales despite good location",
  "Weak client retention and poor follow-up",
  "No clear staff systems or accountability",
  "Stock wastage, cash leakage and poor control",
  "Weak online visibility and inconsistent marketing",
];

const supportAreas = [
  {
    title: "Staffing & Recruitment",
    subtitle: "Find better people",
    icon: UsersRound,
    image: "/hero-slide-2.png",
    href: "/request-staff",
    description:
      "We help salon, spa, barbershop and beauty business owners request suitable staff for technical, front desk, sales, support and management roles.",
    points: [
      "Hair stylists, braiders, nail techs and barbers",
      "Spa therapists, lash techs and beauticians",
      "Receptionists, managers and beauty sales support",
    ],
  },
  {
    title: "Training & Staff Development",
    subtitle: "Build better teams",
    icon: GraduationCap,
    image: "/hero-slide-3.png",
    href: "/services#training-development",
    description:
      "We support beauty teams with practical training that improves service delivery, client handling, professionalism, sales and daily performance.",
    points: [
      "Customer care and service standards",
      "Upselling and client retention",
      "Team discipline and workplace culture",
    ],
  },
  {
    title: "Business Systems & Documentation",
    subtitle: "Create structure",
    icon: FileText,
    image: "/why-choose-us.png",
    href: "/services#business-systems",
    description:
      "We help beauty businesses operate with written systems, policies, forms, SOPs and daily procedures that reduce confusion and improve accountability.",
    points: [
      "HR and admin documents",
      "Manager and staff systems",
      "Cash, stock, client and service procedures",
    ],
  },
  {
    title: "Management Consultancy & Growth",
    subtitle: "Improve performance",
    icon: ChartNoAxesCombined,
    image: "/hero-slide-1.png",
    href: "/services#management-consultancy",
    description:
      "We help owners identify business gaps, improve operations and create clear action plans for growth, performance and profitability.",
    points: [
      "Salon assessment and action plan",
      "Owner and manager support",
      "Profit, service and team performance review",
    ],
  },
];

const stages = [
  {
    title: "Starting a Beauty Business",
    icon: Building2,
    text: "For owners and investors planning to open a salon, spa, barbershop, nail studio or beauty brand.",
  },
  {
    title: "Fixing a Struggling Business",
    icon: ShieldCheck,
    text: "For businesses facing staff issues, poor systems, low sales, weak service or management gaps.",
  },
  {
    title: "Growing an Existing Brand",
    icon: TrendingUp,
    text: "For businesses ready to expand, improve visibility, strengthen teams and operate professionally.",
  },
];

const process = [
  {
    step: "01",
    title: "Business Diagnosis",
    text: "We understand your business type, location, staff structure, services, challenges and goals.",
  },
  {
    step: "02",
    title: "Gap Identification",
    text: "We review staffing, systems, management, customer experience, visibility, stock and daily operations.",
  },
  {
    step: "03",
    title: "Support Recommendation",
    text: "We recommend the right solution: staffing, training, systems, setup, digital growth or consulting.",
  },
  {
    step: "04",
    title: "Implementation Support",
    text: "We help turn the plan into practical actions that owners, managers and teams can follow.",
  },
];

export default function BusinessOwnersPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071b33] px-5 py-24 text-white sm:px-6 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(217,163,175,0.22),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.10),transparent_24%),radial-gradient(circle_at_74%_88%,rgba(184,117,134,0.16),transparent_32%)]" />
        <div className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-20 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              For Salon & Beauty Business Owners
            </div>

            <h1 className="mt-7 max-w-4xl font-serif text-[48px] font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-[72px] lg:text-[92px]">
              Build a beauty business people admire.
            </h1>

            <p className="mt-7 max-w-2xl text-[16px] leading-8 text-white/78 sm:text-[18px]">
              Salons Assured Kenya helps salon, spa, barbershop, nail studio and
              beauty business owners strengthen staffing, systems, service
              standards, operations, visibility and growth.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/request-staff"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-7 text-sm font-extrabold text-[#071b33] shadow-[0_18px_50px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Request Staff
                <BriefcaseBusiness className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 px-7 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-white/10"
              >
                Book Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/62">
              <span>Staffing</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3af]" />
              <span>Systems</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3af]" />
              <span>Training</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3af]" />
              <span>Growth</span>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/12 bg-white/[0.08] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.20)] backdrop-blur-xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af]">
              Owner Support
            </p>

            <h2 className="mt-4 font-serif text-[36px] font-black leading-tight tracking-[-0.04em]">
              We help you run the business, not just open the doors.
            </h2>

            <div className="mt-7 grid gap-4">
              {[
                "Recruit better staff",
                "Improve team performance",
                "Create business systems",
                "Grow visibility and sales",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-white/76"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#d9a3af]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="relative overflow-hidden bg-[#fbf4f6] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(184,117,134,0.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(7,27,51,0.07),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
              Common Owner Challenges
            </p>

            <h2 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.05em] text-[#071b33] sm:text-[62px]">
              Beautiful spaces still fail without structure.
            </h2>

            <p className="mt-6 max-w-xl text-[16px] leading-8 text-slate-600">
              A beauty business can look premium but still lose clients, money
              and staff when daily structure is weak. We help owners fix the
              real gaps behind the scenes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {challenges.map((challenge) => (
              <div
                key={challenge}
                className="group rounded-[1.7rem] border border-[#ead5db] bg-white p-5 shadow-[0_18px_55px_rgba(7,27,51,0.05)] transition duration-500 hover:-translate-y-1 hover:border-[#d9a3af] hover:shadow-[0_28px_80px_rgba(7,27,51,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071b33] text-[#d9a3af] transition duration-500 group-hover:rotate-6 group-hover:bg-[#b87586] group-hover:text-white">
                  <BadgeCheck className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-bold leading-7 text-[#071b33]">
                  {challenge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE-LED SUPPORT AREAS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
              Owner Support Pillars
            </p>

            <h2 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.05em] text-[#071b33] sm:text-[62px]">
              Not just advice. Practical support with people, systems and growth.
            </h2>
          </div>

          <div className="mt-14 grid gap-10">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;
              const isReversed = index % 2 === 1;

              return (
                <article
                  key={area.title}
                  className="group overflow-hidden rounded-[2.4rem] border border-[#ead5db] bg-[#fbf4f6] shadow-[0_24px_80px_rgba(7,27,51,0.07)] transition duration-500 hover:-translate-y-1 hover:border-[#d9a3af] hover:shadow-[0_34px_100px_rgba(7,27,51,0.12)]"
                >
                  <div
                    className={`grid gap-0 lg:grid-cols-2 ${
                      isReversed ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative min-h-[380px] overflow-hidden bg-[#071b33] sm:min-h-[460px]">
                      <Image
                        src={area.image}
                        alt={`${area.title} support for beauty business owners`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/78 via-[#071b33]/20 to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6 rounded-[1.4rem] border border-white/12 bg-[#071b33]/78 p-5 text-white backdrop-blur">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#d9a3af]">
                            <Icon className="h-5 w-5" />
                          </span>

                          <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
                              {area.subtitle}
                            </p>
                            <p className="font-serif text-[26px] font-black leading-tight tracking-[-0.04em]">
                              {area.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-h-[420px] items-center bg-white p-7 sm:p-10 lg:p-12">
                      <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                          {String(index + 1).padStart(2, "0")} / Beauty
                          Business Support
                        </p>

                        <h3 className="mt-4 max-w-xl font-serif text-[40px] font-black leading-tight tracking-[-0.05em] text-[#071b33] sm:text-[54px]">
                          {area.title}
                        </h3>

                        <p className="mt-5 max-w-xl text-[16px] leading-8 text-slate-600">
                          {area.description}
                        </p>

                        <div className="mt-7 grid gap-3">
                          {area.points.map((point) => (
                            <p
                              key={point}
                              className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700"
                            >
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                                <CheckCircle2 className="h-4 w-4" />
                              </span>
                              {point}
                            </p>
                          ))}
                        </div>

                        <Link
                          href={area.href}
                          className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#071b33] px-6 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#b87586]"
                        >
                          Learn More
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section className="bg-[#071b33] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
                Business Stages
              </p>

              <h2 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.05em] sm:text-[60px]">
                We support owners at every serious stage.
              </h2>

              <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/70">
                Whether you are opening, fixing or growing a beauty business,
                the support should match the stage and the real problem.
              </p>
            </div>

            <div className="grid gap-5">
              {stages.map((stage) => {
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.title}
                    className="group rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white/[0.09]"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d9a3af] transition group-hover:bg-[#d9a3af] group-hover:text-[#071b33]">
                        <Icon className="h-6 w-6" />
                      </div>

                      <div>
                        <h3 className="font-serif text-[32px] font-black leading-tight tracking-[-0.04em]">
                          {stage.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-white/70">
                          {stage.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                How It Works
              </p>

              <h2 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.05em] text-[#071b33] sm:text-[58px]">
                We diagnose first, then recommend the right support.
              </h2>

              <p className="mt-6 max-w-xl text-[16px] leading-8 text-slate-600">
                This prevents owners from wasting time or money on the wrong
                solution. The goal is to understand the real business need
                before taking action.
              </p>
            </div>

            <div className="grid gap-4">
              {process.map((item) => (
                <div
                  key={item.step}
                  className="grid gap-5 rounded-[1.8rem] border border-[#ead5db] bg-white p-6 shadow-[0_18px_55px_rgba(7,27,51,0.05)] transition duration-500 hover:-translate-y-1 hover:border-[#d9a3af] sm:grid-cols-[auto_1fr]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071b33] text-sm font-black text-[#d9a3af]">
                    {item.step}
                  </span>

                  <div>
                    <h3 className="font-serif text-[28px] font-black tracking-[-0.035em] text-[#071b33]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}