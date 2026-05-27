import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Megaphone,
  Rocket,
  Scissors,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beauty Business Services | Recruitment, Training & Consulting",
  description:
    "Explore Salons Assured Kenya Ltd services including salon recruitment, spa staffing, barbershop recruitment, staff training, business systems, documentation, setup support, digital growth and beauty business consulting.",
};

const servicePillars = [
  {
    number: "01",
    title: "Recruitment & Staffing",
    subtitle: "Find reliable beauty industry professionals.",
    description:
      "We help salons, spas, barbershops, nail studios and beauty businesses connect with qualified professionals through structured sourcing, screening, shortlisting and placement support.",
    icon: UsersRound,
    items: [
      "Salon, spa and barbershop staffing",
      "Candidate sourcing and screening",
      "Shortlisting and interview coordination",
      "Placement follow-up and hiring support",
    ],
  },
  {
    number: "02",
    title: "Training & Staff Development",
    subtitle: "Improve skill, service and team performance.",
    description:
      "We support beauty businesses with practical training that improves professionalism, customer care, service delivery, sales confidence, client retention and staff accountability.",
    icon: GraduationCap,
    items: [
      "Customer care and service standards",
      "Sales, upselling and client retention training",
      "Manager and supervisor training",
      "Team discipline and performance improvement",
    ],
  },
  {
    number: "03",
    title: "Business Systems & Documentation",
    subtitle: "Build structure into daily operations.",
    description:
      "We help beauty businesses operate with clear systems, documents, checklists, SOPs and management tools so daily operations become more organised, measurable and professional.",
    icon: ClipboardCheck,
    items: [
      "SOPs and operating manuals",
      "Staff contracts and HR forms",
      "Cleaning, attendance and admin checklists",
      "Performance scorecards and reporting tools",
    ],
  },
  {
    number: "04",
    title: "Beauty Business Setup & Launch Support",
    subtitle: "Start stronger with the right structure.",
    description:
      "We guide new salon, spa, barbershop and beauty business owners with planning, positioning, setup structure, staffing, service menu organisation and launch readiness.",
    icon: Rocket,
    items: [
      "Business setup guidance",
      "Service menu and pricing structure",
      "Staffing and operations planning",
      "Launch preparation and client experience planning",
    ],
  },
  {
    number: "05",
    title: "Digital Growth & Visibility",
    subtitle: "Make the business easier to find and trust.",
    description:
      "We support beauty businesses with digital visibility, online presence, content direction and growth strategies that help attract clients, build trust and improve brand positioning.",
    icon: Megaphone,
    items: [
      "Google Business Profile guidance",
      "Social media content direction",
      "Website and online visibility support",
      "Review, reputation and client follow-up strategy",
    ],
  },
  {
    number: "06",
    title: "Management Consultancy & Business Growth",
    subtitle: "Support for owners, managers and investors.",
    description:
      "We help beauty business owners, managers and investors identify operational gaps, improve service quality, build accountability and create stronger business growth systems.",
    icon: BarChart3,
    items: [
      "Business audit and improvement planning",
      "Manager systems and accountability structure",
      "Sales, targets and performance tracking",
      "Growth strategy and operational guidance",
    ],
  },
];

const audiences = [
  "Salons",
  "Spas",
  "Barbershops",
  "Nail Studios",
  "Beauty Professionals",
  "Beauty Investors",
];

const process = [
  {
    title: "Understand",
    text: "We listen to your business needs, current gaps, team challenges and growth goals.",
  },
  {
    title: "Plan",
    text: "We recommend the right solution, structure or support based on your business stage.",
  },
  {
    title: "Implement",
    text: "We help put the right people, systems, documents, training or growth actions in place.",
  },
  {
    title: "Support",
    text: "We follow up with guidance that helps your business stay structured and consistent.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071b33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(184,117,134,0.32),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(217,163,175,0.15),transparent_30%)]" />
        <div className="absolute right-[-12%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#b87586]/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:py-28">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Beauty Business Solutions
            </p>

            <h1 className="mt-6 max-w-5xl font-serif text-[48px] font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-[66px] lg:text-[82px]">
              Professional Solutions for{" "}
              <span className="bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text italic text-transparent">
                Salons, Spas & Barbershops
              </span>
            </h1>
          </div>

          <div className="lg:pb-3">
            <p className="text-[16px] leading-8 text-white/75 sm:text-[18px]">
              Salons Assured helps beauty businesses grow through recruitment,
              training, business systems, documentation, launch support, digital
              visibility and management consulting.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/recruitment"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d9a3af]/60 bg-white/5 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >
                Request Staff
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Audience */}
      <section className="relative overflow-hidden py-18 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.08),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(244,223,229,0.58),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 border-y border-[#ead5db] py-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Who We Serve
              </p>

              <h2 className="mt-5 font-serif text-[38px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[52px]">
                Built for serious beauty businesses.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-[16px] leading-8 text-slate-700">
                Whether you are hiring, training your team, launching a beauty
                business, improving operations or growing your visibility, our
                services are designed for the practical needs of the beauty
                industry.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {audiences.map((audience) => (
                  <span
                    key={audience}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ead5db] bg-white px-4 py-2 text-sm font-bold text-[#071b33] shadow-sm"
                  >
                    <Scissors className="h-4 w-4 text-[#b87586]" />
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Service Pillars
              </p>

              <h2 className="mt-5 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[56px]">
                Six focused ways we support growth.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-700">
                Instead of overwhelming your business with scattered advice, we
                organise our support into clear service pillars.
              </p>
            </div>

            <div className="divide-y divide-[#ead5db] border-y border-[#ead5db]">
              {servicePillars.map((service) => {
                const Icon = service.icon;

                return (
                  <section
                    key={service.number}
                    className="grid gap-8 py-10 md:grid-cols-[120px_1fr]"
                  >
                    <div>
                      <span className="font-serif text-[42px] font-black leading-none text-[#d9a3af]">
                        {service.number}
                      </span>

                      <div className="mt-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                    </div>

                    <div>
                      <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                        {service.subtitle}
                      </p>

                      <h3 className="mt-3 font-serif text-[34px] font-black leading-tight tracking-[-0.04em] text-[#071b33] sm:text-[42px]">
                        {service.title}
                      </h3>

                      <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-700">
                        {service.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {service.items.map((item) => (
                          <p
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-slate-700"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b87586]" />
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Our Approach
              </p>

              <h2 className="mt-5 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[52px]">
                Clear support from planning to execution.
              </h2>
            </div>

            <div className="divide-y divide-[#ead5db] border-y border-[#ead5db]">
              {process.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-5 py-7 md:grid-cols-[90px_1fr]"
                >
                  <span className="font-serif text-[34px] font-black text-[#d9a3af]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-serif text-[28px] font-black tracking-[-0.03em] text-[#071b33]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - one only */}
      <section className="relative overflow-hidden bg-[#071b33] py-18 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(184,117,134,0.28),transparent_28%),radial-gradient(circle_at_92%_80%,rgba(217,163,175,0.16),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
                Let’s Build Better Beauty Businesses
              </p>

              <h2 className="mt-4 max-w-4xl font-serif text-[36px] font-black leading-tight tracking-[-0.04em] text-white sm:text-[50px]">
                Need recruitment, systems, training or business growth support?
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-8 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
            >
              Talk to Salons Assured
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}