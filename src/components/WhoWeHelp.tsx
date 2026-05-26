import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Store,
  UsersRound,
} from "lucide-react";

const pathways = [
  {
    number: "01",
    title: "Business Owners",
    description:
      "Get support with salon staffing, spa staffing, barbershop recruitment, business systems, staff training, operations, and beauty business growth.",
    href: "/business-owners",
    cta: "Explore Business Support",
    icon: Store,
  },
  {
    number: "02",
    title: "Investors",
    description:
      "Enter the beauty industry with proper structure, market insight, staffing guidance, business setup support, and professional consulting.",
    href: "/investors",
    cta: "Investor Support",
    icon: ChartNoAxesCombined,
  },
  {
    number: "03",
    title: "Beauty Professionals",
    description:
      "Access salon jobs, spa jobs, barbershop opportunities, nail technician roles, hair stylist openings, therapy roles, and beauty industry placements.",
    href: "/job-seekers",
    cta: "Apply for Opportunities",
    icon: BriefcaseBusiness,
  },
  {
    number: "04",
    title: "Industry Community",
    description:
      "Discover beauty business insights, salon management tips, training events, recruitment guidance, industry updates, and growth resources.",
    href: "/blog",
    cta: "View Resources",
    icon: UsersRound,
  },
];

export default function WhoWeHelp() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_88%,rgba(184,117,134,0.16),transparent_30%),radial-gradient(circle_at_96%_12%,rgba(244,223,229,0.7),transparent_26%)]" />
      <div className="absolute bottom-[-120px] left-[-10%] h-[260px] w-[70%] rounded-[100%] bg-[#f4dfe5]/70" />
      <div className="absolute bottom-[-90px] left-[-8%] h-[160px] w-[55%] rotate-[6deg] rounded-[100%] bg-[#b87586]/25" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
            Beauty Industry Support Platform
          </p>

          <div className="mt-6 h-[2px] w-16 bg-[#b87586]" />

          <h2 className="mt-8 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[56px] lg:text-[62px]">
            How Salons Assured Helps Beauty Businesses, Investors{" "}
            <span className="block bg-gradient-to-r from-[#b87586] via-[#c98695] to-[#dfb3bd] bg-clip-text italic text-transparent">
              & Professionals Grow
            </span>
          </h2>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#ead5db]" />
            <span className="text-[#b87586]">✦</span>
            <div className="h-px flex-1 bg-[#ead5db]" />
          </div>

          <p className="mt-8 max-w-[520px] text-[16px] leading-8 text-slate-700">
            Salons Assured connects salon owners, spa owners, barbershop owners,
            investors, beauty professionals, and the wider beauty industry
            community to recruitment support, salon staffing, spa staffing,
            barbershop staffing, training, consulting, business systems, and
            growth resources.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {pathways.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.number}
                href={item.href}
                className="group relative min-h-[310px] overflow-hidden rounded-[1.7rem] border border-[#ead5db] bg-white p-7 shadow-[0_22px_70px_rgba(7,27,51,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(7,27,51,0.13)]"
              >
                {/* Card decorative shape */}
                <div className="absolute inset-y-0 right-[-34%] w-[58%] rounded-l-[100%] bg-[linear-gradient(160deg,rgba(244,223,229,0.35),rgba(184,117,134,0.12))] transition duration-300 group-hover:right-[-30%]" />
                <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[4rem] bg-[#f4dfe5]/40" />

                {/* Number */}
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#c67283] text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(184,117,134,0.25)]">
                  {item.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#fbf4f6] text-[#071b33] ring-1 ring-[#ead5db]">
                  <Icon className="h-8 w-8" strokeWidth={1.45} />
                </div>

                <h3 className="relative z-10 mt-6 font-serif text-[30px] font-black leading-tight tracking-[-0.03em] text-[#071b33]">
                  {item.title}
                </h3>

                <div className="relative z-10 mt-4 h-[2px] w-10 bg-[#b87586]" />

                <p className="relative z-10 mt-5 max-w-[340px] text-[15px] leading-7 text-slate-700">
                  {item.description}
                </p>

                <div className="relative z-10 mt-7 flex items-center justify-between gap-4">
                  <span className="text-sm font-extrabold text-[#b87586] opacity-0 transition duration-300 group-hover:opacity-100">
                    {item.cta}
                  </span>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d7a0ad] text-[#b87586] transition duration-300 group-hover:bg-[#b87586] group-hover:text-white">
                    <ArrowRight className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}