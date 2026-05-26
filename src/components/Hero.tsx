import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Network,
  Star,
  Trophy,
  UsersRound,
} from "lucide-react";

type FeatureItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

const trustItems: FeatureItem[] = [
  {
    title: "Global Reach",
    text: "Serving beauty businesses locally and internationally.",
    icon: Network,
  },
  {
    title: "Industry Experts",
    text: "Recruitment, training & consulting specialists you can trust.",
    icon: UsersRound,
  },
  {
    title: "Business Growth",
    text: "Proven strategies for sustainable business success.",
    icon: Trophy,
  },
  {
    title: "Quality Talent",
    text: "Skilled, vetted and ready-to-perform professionals.",
    icon: Star,
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Desktop / laptop background image */}
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[68%] lg:block xl:w-[70%] 2xl:w-[72%]">
        <Image
          src="/hero-beauty-team.png"
          alt="Beauty industry recruitment, training and consulting for salons, spas and barbershops"
          fill
          sizes="(min-width: 1536px) 72vw, (min-width: 1280px) 70vw, 68vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Desktop white fade */}
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_34%,rgba(255,255,255,0.95)_46%,rgba(255,255,255,0.62)_60%,rgba(255,255,255,0.12)_78%,rgba(255,255,255,0)_100%)] lg:block" />

      {/* General soft background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_22%,rgba(184,117,134,0.12),transparent_28%),radial-gradient(circle_at_82%_88%,rgba(184,117,134,0.10),transparent_32%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:gap-12 lg:min-h-[calc(100vh-112px)] lg:grid-cols-[0.5fr_0.5fr] lg:py-20">
        {/* Left content */}
        <div className="relative z-20 max-w-[690px]">
          <p
            className="hero-fade-up text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586] sm:text-[11px] md:text-[12px] lg:text-[13px]"
            style={{ animationDelay: "0.05s" }}
          >
            Beauty Industry Recruitment • Salon Staffing • Training & Consulting
          </p>

          <h1
            className="hero-fade-up mt-5 max-w-[760px] font-serif text-[42px] font-black leading-[1.03] tracking-[-0.045em] text-[#071b33] sm:text-[54px] md:text-[64px] lg:text-[60px] xl:text-[68px]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="block">Empowering</span>
            <span className="block">Beauty</span>
            <span className="block">Businesses,</span>
            <span className="block">Professionals</span>
            <span className="block">
              & Investors{" "}
              <span className="bg-gradient-to-r from-[#b87586] via-[#c98695] to-[#dfb3bd] bg-clip-text text-transparent">
                Worldwide
              </span>
            </span>
          </h1>

          <p
            className="hero-fade-up mt-5 max-w-[610px] text-[15px] leading-8 text-slate-700 sm:text-[16px] md:text-[17px]"
            style={{ animationDelay: "0.25s" }}
          >
            Salons Assured provides beauty industry recruitment, salon staffing,
            spa staffing, barbershop staffing, training, consulting, business
            systems, and growth support for salons, spas, barbershops,
            investors, and beauty professionals locally and internationally.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-fade-up mt-8 grid gap-3 sm:flex sm:flex-wrap"
            style={{ animationDelay: "0.35s" }}
          >
            <Link
              href="/recruitment"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#071b33] px-6 py-4 text-[14px] font-extrabold text-white shadow-[0_18px_40px_rgba(7,27,51,0.22)] transition duration-300 hover:bg-[#0d2748] sm:w-auto"
            >
              <UsersRound className="h-5 w-5" strokeWidth={1.9} />
              Request Staff
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d7a0ad] bg-white/90 px-6 py-4 text-[14px] font-extrabold text-[#b87586] shadow-sm transition duration-300 hover:border-[#b87586] hover:bg-[#fbf4f6] sm:w-auto"
            >
              <CalendarCheck className="h-5 w-5" strokeWidth={1.9} />
              Book Consultation
            </Link>
          </div>

          {/* Trust items */}
          <div
            className="hero-fade-up mt-10 grid max-w-[760px] grid-cols-2 gap-x-5 gap-y-7 border-t border-[#ead5db] pt-7 sm:gap-x-6 md:grid-cols-4 lg:mt-12"
            style={{ animationDelay: "0.45s" }}
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`pr-3 ${
                    index !== trustItems.length - 1
                      ? "md:border-r md:border-[#ead5db]"
                      : ""
                  } ${index !== 0 ? "md:pl-4" : ""}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbf4f6] text-[#c67283] ring-1 ring-[#ead5db] md:h-12 md:w-12">
                    <Icon
                      className="h-5 w-5 md:h-6 md:w-6"
                      strokeWidth={1.65}
                    />
                  </div>

                  <h3 className="mt-3 text-[12px] font-extrabold text-[#071b33] md:text-[13px]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[10.5px] leading-5 text-slate-700 md:text-[11px]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet image card */}
        <div className="relative z-10 min-h-[360px] overflow-hidden rounded-[2rem] bg-[#071b33] shadow-[0_24px_70px_rgba(7,27,51,0.18)] sm:min-h-[460px] md:min-h-[540px] lg:hidden">
          <Image
            src="/hero-beauty-team.png"
            alt="Beauty industry recruitment, training and consulting for salons, spas and barbershops"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,51,0)_0%,rgba(7,27,51,0.18)_100%)]" />

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_18px_50px_rgba(7,27,51,0.16)] backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-[280px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b87586]">
              Beauty Industry Growth Partner
            </p>
            <h3 className="mt-2 text-base font-extrabold text-[#071b33]">
              Recruitment • Staffing • Training • Consulting
            </h3>
          </div>
        </div>

        {/* Empty right column on desktop because image is background */}
        <div className="hidden lg:block" />
      </div>

      {/* Desktop bottom curved accent only */}
      <div className="pointer-events-none absolute bottom-[-100px] left-[-6%] z-10 hidden h-[220px] w-[115%] rotate-[-4deg] rounded-[100%] bg-white lg:block" />

      <div className="pointer-events-none absolute bottom-[34px] left-[-2%] z-20 hidden h-[24px] w-[92%] rotate-[-5deg] rounded-full bg-[#d9a3af]/55 lg:block" />

      <div className="pointer-events-none absolute bottom-[-96px] left-[-10%] z-0 hidden h-[120px] w-[72%] rotate-[4deg] rounded-full bg-[#071b33] lg:block" />

      <div className="pointer-events-none absolute bottom-[18px] left-[-4%] z-10 hidden h-[42px] w-[70%] rotate-[3deg] rounded-full bg-[#f4dfe5]/70 lg:block" />
    </section>
  );
}