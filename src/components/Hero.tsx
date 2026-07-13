"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const headlineParent = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.14,
    },
  },
};

const firstHeadlineLine = {
  hidden: {
    y: "115%",
    opacity: 0,
  },

  visible: {
    y: "0%",
    opacity: 1,

    transition: {
      duration: 0.95,
      ease: premiumEase,
    },
  },
};

export default function Hero() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 105],
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.055],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 42],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.82],
    [1, 0.2],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[820px] overflow-hidden bg-[#071b33] text-white lg:min-h-screen"
    >
      {/* FULL-BLEED IMAGE */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
        }}
        className="absolute inset-0"
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                  scale: 1.08,
                  filter: "blur(8px)",
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.45,
            ease: premiumEase,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-slide-1.webp"
            alt="African beauty business professionals working inside a premium salon"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] brightness-[1.08] contrast-[1.06] saturate-[1.03]"
          />
        </motion.div>
      </motion.div>

      {/* BASE IMAGE OVERLAY */}
      <div className="absolute inset-0 bg-[#071b33]/12" />

      {/* MOBILE OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,51,0.98)_0%,rgba(7,27,51,0.93)_47%,rgba(7,27,51,0.42)_74%,rgba(7,27,51,0.68)_100%)] lg:hidden" />

      {/* DESKTOP EDITORIAL PANEL */}
      <motion.div
        initial={
          shouldReduceMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
                x: "-8%",
              }
        }
        animate={{
          opacity: 1,
          x: "0%",
        }}
        transition={{
          duration: 1.05,
          ease: premiumEase,
        }}
        className="absolute inset-y-0 left-0 hidden w-[65%] bg-[#071b33] [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)] lg:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(217,163,175,0.14),transparent_34%)]" />

        <div className="absolute inset-0 opacity-[0.035]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:76px_76px]" />
        </div>
      </motion.div>

      {/* IMAGE BLEND */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,transparent_44%,rgba(7,27,51,0.20)_62%,rgba(7,27,51,0.03)_100%)] lg:block" />

      {/* DIAGONAL DIVIDER */}
      <motion.div
        initial={{
          scaleY: 0,
          opacity: 0,
        }}
        animate={{
          scaleY: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.1,
          delay: 0.55,
          ease: premiumEase,
        }}
        className="absolute left-[58.8%] top-[-10%] hidden h-[120%] w-px origin-top -rotate-[7deg] bg-[linear-gradient(180deg,transparent_0%,rgba(217,163,175,0.72)_28%,rgba(217,163,175,0.72)_72%,transparent_100%)] lg:block"
      />

      {/* MAIN CONTENT */}
      <div className="relative mx-auto flex min-h-[820px] w-full max-w-[1440px] items-start px-5 pb-[350px] pt-[150px] sm:px-8 sm:pb-[390px] sm:pt-[165px] lg:min-h-screen lg:items-center lg:px-10 lg:pb-20 lg:pt-[110px] xl:px-14">
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="relative z-20 w-full max-w-[760px]"
        >
          {/* EYEBROW */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
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
            <motion.span
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.18,
                ease: premiumEase,
              }}
              className="h-px w-10 origin-left bg-[#d9a3af]"
            />

            <p className="text-[9px] font-bold uppercase tracking-[0.31em] text-[#e7b7c2] sm:text-[10px]">
              Beauty Business Growth Partner
            </p>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            variants={headlineParent}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily:
                "var(--font-display), Georgia, serif",
            }}
            className="mt-8 font-semibold leading-[0.9] tracking-[-0.057em]"
          >
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={firstHeadlineLine}
                className="block text-[49px] text-white sm:text-[63px] md:text-[72px] lg:whitespace-nowrap lg:text-[70px] xl:text-[79px]"
              >
                Behind every great salon
              </motion.span>
            </span>

            <motion.span
              initial={{
                opacity: 0,
                y: 34,
                filter: "blur(7px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.95,
                delay: 0.48,
                ease: premiumEase,
              }}
              className="mt-1 block text-[49px] font-medium italic text-[#e4afbc] sm:text-[63px] md:text-[72px] lg:whitespace-nowrap lg:text-[70px] xl:text-[79px]"
            >
              is a better business.
            </motion.span>
          </motion.h1>

          {/* DESCRIPTION */}
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
              delay: 0.68,
              ease: premiumEase,
            }}
            className="mt-8 max-w-[575px] text-[15px] leading-8 text-white/68 sm:text-[17px] sm:leading-9"
          >
            We strengthen the people,
            systems and strategy behind
            salons, spas and barbershops
            so they can grow with structure,
            consistency and confidence.
          </motion.p>

          {/* SINGLE HERO CTA */}
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
              delay: 0.8,
              ease: premiumEase,
            }}
            className="mt-9"
          >
            <Link
              href="/services"
              className="group inline-flex h-[54px] items-center gap-5 rounded-full border border-white/20 bg-white/[0.07] pl-7 pr-2 text-[12px] font-bold text-white backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
            >
              Explore How We Help

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9a3af] text-[#071b33] transition-all duration-500 group-hover:translate-x-0.5 group-hover:bg-[#071b33] group-hover:text-white">
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2}
                />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE IMAGE TRANSITION */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[38%] h-44 bg-gradient-to-b from-[#071b33] to-transparent lg:hidden" />

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.9,
          ease: premiumEase,
        }}
        className="absolute bottom-7 left-5 right-5 h-px origin-left bg-white/20 sm:left-8 sm:right-8 lg:hidden"
      />
    </section>
  );
}