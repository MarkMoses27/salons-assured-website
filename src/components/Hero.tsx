"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[780px] overflow-hidden bg-[#071b33] lg:min-h-screen">
      {/* FULL-BLEED HERO IMAGE */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 0,
                scale: 1.05,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: premiumEase,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-slide-1.png"
          alt="Professional African beauty business team working inside a premium salon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-[#071b33]/35" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,51,0.97)_0%,rgba(7,27,51,0.88)_34%,rgba(7,27,51,0.46)_63%,rgba(7,27,51,0.12)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,51,0.18)_0%,transparent_45%,rgba(7,27,51,0.50)_100%)]" />

      {/* HERO CONTENT */}
      <div className="relative mx-auto flex min-h-[780px] max-w-[1400px] items-center px-5 pb-16 pt-[135px] sm:px-8 lg:min-h-screen lg:px-10 lg:pb-20 lg:pt-[145px]">
        <div className="max-w-[760px]">
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
              delay: 0.12,
              ease: premiumEase,
            }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#d9a3af]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e6b7c2]">
              Beauty Business Consultancy
            </p>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 38,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.95,
              delay: 0.18,
              ease: premiumEase,
            }}
            className="mt-7 max-w-[740px] font-serif text-[52px] font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-[66px] md:text-[76px] lg:text-[84px] xl:text-[92px]"
          >
            Building stronger beauty businesses.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.32,
              ease: premiumEase,
            }}
            className="mt-7 max-w-[590px] text-[16px] leading-8 text-white/72 sm:text-[18px] sm:leading-9"
          >
            We support salons, spas and barbershops with the people,
            systems and strategy required for sustainable growth.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.44,
              ease: premiumEase,
            }}
            className="mt-9"
          >
            <Link
              href="/contact"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-8 text-[13px] font-extrabold text-[#071b33] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Book a Consultation

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}