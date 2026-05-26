import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  FileText,
  GraduationCap,
  Megaphone,
  Store,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Recruitment & Staffing",
    description:
      "We source, screen, and connect salons, spas, barbershops, and beauty businesses with reliable managers, stylists, nail technicians, barbers, therapists, and support staff.",
    href: "/recruitment",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Training & Staff Development",
    description:
      "Practical training for owners, managers, and teams to improve customer care, service delivery, sales, productivity, professionalism, and client retention.",
    href: "/training",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Business Systems & Documentation",
    description:
      "We create salon SOPs, contracts, HR documents, staff templates, reporting tools, price guides, and operating systems for smoother daily management.",
    href: "/business-systems",
    icon: FileText,
  },
  {
    number: "04",
    title: "Beauty Business Setup & Launch",
    description:
      "From business assessment and owner coaching to purchase planning, supplier guidance, launch readiness, and opening support, we help beauty businesses start properly.",
    href: "/services",
    icon: Store,
  },
  {
    number: "05",
    title: "Digital Growth & Visibility",
    description:
      "We support beauty businesses with Google Business visibility, social media growth, booking systems, website support, graphic design, and digital presence.",
    href: "/services",
    icon: Megaphone,
  },
  {
    number: "06",
    title: "Management Consultancy & Business Growth",
    description:
      "Ongoing consulting support for sales tracking, staff productivity, client retention, market activation, owner accountability, and sustainable business growth.",
    href: "/services",
    icon: TrendingUp,
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,117,134,0.24),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(217,163,175,0.18),transparent_30%)]" />
      <div className="absolute left-[-12%] top-[-18%] h-[380px] w-[380px] rounded-full bg-[#b87586]/10 blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-[#d9a3af]" />
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Our Services
            </p>
            <span className="h-px w-16 bg-[#d9a3af]" />
          </div>

          <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[64px]">
            Professional Solutions for the{" "}
            <span className="block bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text text-transparent">
              Beauty Industry
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-white/75 sm:text-[17px]">
            From salon staffing, spa staffing, and barbershop recruitment to
            training, consulting, business systems, digital visibility, and
            investor support, Salons Assured helps beauty businesses operate
            better and grow stronger.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.number}
                href={service.href}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#d9a3af]/25 bg-white/[0.035] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af]/55 hover:bg-white/[0.06] sm:p-7"
              >
                <div className="absolute right-[-90px] top-[-90px] h-48 w-48 rounded-full border border-[#d9a3af]/20 transition duration-300 group-hover:scale-110" />
                <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[4rem] bg-[#d9a3af]/8" />

                <div className="relative z-10 flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ef8fb0] to-[#b87586] text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(184,117,134,0.28)]">
                    {service.number}
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9a3af]/25 bg-[#06162b] text-[#ef8fb0] transition duration-300 group-hover:border-[#ef8fb0]/60">
                    <Icon className="h-8 w-8" strokeWidth={1.55} />
                  </div>
                </div>

                <h3 className="relative z-10 mt-8 font-serif text-[27px] font-black leading-tight tracking-[-0.03em] text-white">
                  {service.title}
                </h3>

                <p className="relative z-10 mt-5 text-[14px] leading-7 text-white/72 sm:text-[15px]">
                  {service.description}
                </p>

                <div className="relative z-10 mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#ef8fb0]">
                  Learn More
                  <ArrowRight
                    className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-[1.5rem] border border-[#d9a3af]/25 bg-white/[0.055] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-5">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#d9a3af]/15 text-[#ef8fb0] ring-1 ring-[#d9a3af]/20 sm:flex">
                <CalendarCheck className="h-8 w-8" strokeWidth={1.65} />
              </div>

              <div>
                <h3 className="font-serif text-[28px] font-black tracking-[-0.03em] text-white">
                  Ready to grow your beauty business professionally?
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-7 text-white/70">
                  Let’s discuss the right support for your salon, spa,
                  barbershop, beauty brand, team, or investment.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.26)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}