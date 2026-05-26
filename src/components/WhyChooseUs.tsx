import {
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  Gem,
  Handshake,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    title: "Industry-Focused Expertise",
    description:
      "Salons Assured is built specifically for salons, spas, barbershops, beauty businesses, investors, and beauty professionals.",
    icon: Gem,
  },
  {
    title: "Structured Recruitment Process",
    description:
      "We support beauty businesses with sourcing, screening, shortlisting, and professional placement guidance.",
    icon: ShieldCheck,
  },
  {
    title: "Practical Business Systems",
    description:
      "We help businesses operate better through SOPs, HR documents, staff templates, reporting tools, and daily operating structures.",
    icon: ClipboardCheck,
  },
  {
    title: "Training That Improves Performance",
    description:
      "We support owners, managers, and staff with training focused on customer care, productivity, sales, professionalism, and client retention.",
    icon: BadgeCheck,
  },
  {
    title: "Growth & Accountability Support",
    description:
      "We help beauty businesses improve sales tracking, staff productivity, client experience, digital visibility, and management discipline.",
    icon: BarChart3,
  },
  {
    title: "Premium Beauty Business Mindset",
    description:
      "We help businesses build a cleaner, stronger, more professional experience for serious clients and high-end beauty brands.",
    icon: Handshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.12),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(244,223,229,0.75),transparent_28%)]" />
      <div className="absolute right-[-12%] top-[-18%] h-[360px] w-[360px] rounded-full bg-[#f4dfe5]/70 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[-10%] h-[320px] w-[320px] rounded-full bg-[#b87586]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
              Why Choose Us
            </p>

            <div className="mt-6 h-[2px] w-16 bg-[#b87586]" />

            <h2 className="mt-8 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[56px] lg:text-[64px]">
              Why Beauty Businesses{" "}
              <span className="block bg-gradient-to-r from-[#b87586] via-[#c98695] to-[#dfb3bd] bg-clip-text italic text-transparent">
                Choose Salons Assured
              </span>
            </h2>
          </div>

          <div className="max-w-2xl lg:ml-auto">
            <p className="text-[16px] leading-8 text-slate-700 sm:text-[17px]">
              We combine beauty industry recruitment, salon staffing, spa
              staffing, barbershop recruitment, training, consulting, business
              systems, and growth support to help businesses operate with
              structure, confidence, and professionalism.
            </p>
          </div>
        </div>

        {/* Trust cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="group relative overflow-hidden rounded-[1.7rem] border border-[#ead5db] bg-white p-7 shadow-[0_22px_70px_rgba(7,27,51,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(7,27,51,0.13)]"
              >
                <div className="absolute right-[-80px] top-[-80px] h-44 w-44 rounded-full bg-[#f4dfe5]/60 transition duration-300 group-hover:scale-110" />
                <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[4rem] bg-[#fbf4f6]" />

                <div className="relative z-10 flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071b33] text-[#d9a3af] shadow-[0_18px_40px_rgba(7,27,51,0.16)]">
                    <Icon className="h-7 w-7" strokeWidth={1.65} />
                  </div>

                  <span className="font-serif text-[38px] font-black leading-none text-[#f4dfe5]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative z-10 mt-7 font-serif text-[28px] font-black leading-tight tracking-[-0.03em] text-[#071b33]">
                  {reason.title}
                </h3>

                <div className="relative z-10 mt-4 h-[2px] w-10 bg-[#b87586]" />

                <p className="relative z-10 mt-5 text-[15px] leading-7 text-slate-700">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}