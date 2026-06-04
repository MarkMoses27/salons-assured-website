"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Slide = {
  eyebrow: string;
  titleBlush: string;
  titleNavy: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryText: string;
  primaryHref: string;
  primaryIcon: LucideIcon;
  secondaryText: string;
  secondaryHref: string;
  secondaryIcon: LucideIcon;
};

const slides: Slide[] = [
  {
    eyebrow: "Beauty Business Growth Partner",
    titleBlush: "Build a structured",
    titleNavy: "beauty business",
    description:
      "We help salons, spas, barbershops and beauty brands grow through recruitment, training, business systems and consulting support.",
    image: "/hero-slide-1.png",
    imageAlt:
      "Beauty business consultants reviewing salon operations in a premium salon",
    primaryText: "Book Strategy Call",
    primaryHref: "/contact",
    primaryIcon: CalendarCheck,
    secondaryText: "Explore Services",
    secondaryHref: "/services",
    secondaryIcon: Sparkles,
  },
  {
    eyebrow: "Salon Staffing & Recruitment",
    titleBlush: "The right people",
    titleNavy: "for your team",
    description:
      "Get support with sourcing, screening, shortlisting and placement guidance for salon, spa, barbershop and beauty industry roles.",
    image: "/hero-slide-2.png",
    imageAlt:
      "Professional beauty recruitment consultation inside a modern salon",
    primaryText: "Request Vetted Staff",
    primaryHref: "/recruitment",
    primaryIcon: UsersRound,
    secondaryText: "Send Staffing Brief",
    secondaryHref: "/contact",
    secondaryIcon: FileText,
  },
  {
    eyebrow: "Training, Systems & Growth",
    titleBlush: "Stronger teams",
    titleNavy: "better systems",
    description:
      "We support business owners, managers and teams with training, SOPs, documentation, accountability and growth systems.",
    image: "/hero-slide-3.png",
    imageAlt:
      "Beauty business training and growth planning session in a salon",
    primaryText: "Build Business Systems",
    primaryHref: "/services#business-systems",
    primaryIcon: ClipboardCheck,
    secondaryText: "View Training Support",
    secondaryHref: "/services#training-development",
    secondaryIcon: ArrowRight,
  },
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

const textParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: premiumEase,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
    transition: {
      duration: 0.35,
      ease: premiumEase,
    },
  },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const PrimaryIcon = slide.primaryIcon;
  const SecondaryIcon = slide.secondaryIcon;

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-112px)] overflow-hidden bg-[#f9f6f7]">
      {/* Premium animated background shapes */}
      <motion.div
        className="absolute left-[-18%] top-[-30%] h-[640px] w-[640px] rounded-full bg-white"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 18, 0],
                scale: [1, 1.03, 1],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-18%] top-[-10%] h-[760px] w-[760px] rounded-full bg-white/80"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -22, 0],
                x: [0, -14, 0],
                scale: [1, 1.025, 1],
              }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-26%] left-[18%] h-[420px] w-[920px] -rotate-6 rounded-[100%] bg-white/75"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 20, 0],
                rotate: [-6, -4, -6],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SAK blush accents */}
      <motion.div
        className="pointer-events-none absolute bottom-[16%] left-[4%] hidden h-32 w-32 rounded-full border border-[#d9a3af]/20 bg-[repeating-linear-gradient(135deg,rgba(184,117,134,0.38)_0px,rgba(184,117,134,0.38)_2px,transparent_2px,transparent_9px)] opacity-55 md:block"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 8, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute right-[7%] top-[24%] hidden h-24 w-24 rounded-full border border-[#d9a3af]/20 bg-[repeating-linear-gradient(135deg,rgba(184,117,134,0.38)_0px,rgba(184,117,134,0.38)_2px,transparent_2px,transparent_9px)] opacity-55 lg:block"
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, -8, 0],
                y: [0, 12, 0],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-14 px-5 py-14 sm:px-6 md:gap-16 lg:grid-cols-[0.44fr_0.56fr] lg:gap-24 lg:py-20 xl:gap-28">
        {/* Left text */}
        <div className="relative z-20 max-w-[590px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              variants={textParent}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.p
                variants={textItem}
                className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-[#071b33]/70"
              >
                {slide.eyebrow}
              </motion.p>

              <h1 className="mt-5 font-serif text-[46px] font-black leading-[0.98] tracking-[-0.055em] sm:text-[58px] md:text-[64px] lg:text-[72px] xl:text-[82px]">
                <motion.span
                  variants={textItem}
                  className="block text-[#b87586]"
                >
                  {slide.titleBlush}
                </motion.span>

                <motion.span
                  variants={textItem}
                  className="block text-[#071b33]"
                >
                  {slide.titleNavy}
                </motion.span>
              </h1>

              <motion.p
                variants={textItem}
                className="mt-6 max-w-[530px] text-[15px] leading-8 text-slate-700 sm:text-[16px] md:text-[17px]"
              >
                {slide.description}
              </motion.p>

              <motion.div
                variants={textItem}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -4,
                          scale: 1.015,
                        }
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={slide.primaryHref}
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#071b33] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(7,27,51,0.2)] transition duration-300 hover:bg-[#0d2748]"
                  >
                    <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(217,163,175,0.22),transparent)] transition duration-700 group-hover:translate-x-[120%]" />

                    <PrimaryIcon
                      className="relative h-5 w-5 text-[#d9a3af]"
                      strokeWidth={1.9}
                    />

                    <span className="relative">{slide.primaryText}</span>

                    <ArrowRight
                      className="relative h-4 w-4 transition group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -4,
                          scale: 1.015,
                        }
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={slide.secondaryHref}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#d9a3af] bg-white px-7 py-4 text-sm font-extrabold text-[#071b33] shadow-sm transition duration-300 hover:bg-[#fbf4f6]"
                  >
                    <SecondaryIcon
                      className="h-5 w-5 text-[#b87586]"
                      strokeWidth={1.9}
                    />

                    {slide.secondaryText}
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={textItem}
                className="mt-10 flex items-center gap-3"
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-10 bg-[#b87586]"
                        : "w-3 bg-[#071b33]/20 hover:bg-[#b87586]/70"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right image */}
        <div className="relative z-10 min-h-[460px] sm:min-h-[580px] lg:min-h-[760px] xl:min-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              className="absolute inset-0"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      x: 70,
                      scale: 0.965,
                      filter: "blur(14px)",
                    }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: -34,
                      scale: 0.985,
                      filter: "blur(10px)",
                    }
              }
              transition={{ duration: 0.95, ease: premiumEase }}
            >
              <motion.div
                className="absolute right-[-12%] top-1/2 h-[96%] w-[112%] -translate-y-1/2 overflow-hidden bg-white shadow-[0_42px_110px_rgba(7,27,51,0.16)]"
                initial={{
                  borderRadius: "46% 54% 42% 58% / 48% 40% 60% 52%",
                }}
                animate={
                  shouldReduceMotion
                    ? {
                        borderRadius: "46% 54% 42% 58% / 48% 40% 60% 52%",
                      }
                    : {
                        borderRadius: [
                          "46% 54% 42% 58% / 48% 40% 60% 52%",
                          "50% 50% 46% 54% / 44% 48% 52% 56%",
                          "46% 54% 42% 58% / 48% 40% 60% 52%",
                        ],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                  priority
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(7,27,51,0.05))]" />
              </motion.div>

              <motion.div
                className="absolute bottom-[8%] left-[9%] h-24 w-24 rounded-full bg-[#21345d] shadow-[0_24px_50px_rgba(7,27,51,0.26)] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute bottom-[2%] left-[22%] h-20 w-20 rounded-full bg-[#001f4f] shadow-[0_24px_50px_rgba(7,27,51,0.26)] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 12, 0],
                        scale: [1, 1.06, 1],
                      }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute right-[5%] top-[24%] h-10 w-10 rounded-full bg-[#d9a3af]/90 blur-[1px] sm:h-12 sm:w-12"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.14, 1],
                        opacity: [0.75, 1, 0.75],
                      }
                }
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-0 z-20 flex gap-3 lg:bottom-10">
            <motion.button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      x: -2,
                    }
              }
              whileTap={{ scale: 0.94 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b87586] text-white shadow-[0_14px_32px_rgba(184,117,134,0.25)] transition hover:bg-[#a76476]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
            </motion.button>

            <motion.button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      x: 2,
                    }
              }
              whileTap={{ scale: 0.94 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071b33] text-white shadow-[0_14px_32px_rgba(7,27,51,0.25)] transition hover:bg-[#0d2748]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}