"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Radio,
  Ticket,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const storageKey =
  "sak-ebbc2026-banner-dismissed";

const eventStartTime = new Date(
  "2026-11-17T08:00:00+03:00",
).getTime();

const eventEndTime = new Date(
  "2026-11-18T20:00:00+03:00",
).getTime();

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventStatus =
  | "upcoming"
  | "live"
  | "ended";

function calculateCountdown(): CountdownValue {
  const difference = Math.max(
    eventStartTime - Date.now(),
    0,
  );

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24),
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24,
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60,
    ),

    seconds: Math.floor(
      (difference / 1000) % 60,
    ),
  };
}

function getEventStatus(): EventStatus {
  const currentTime = Date.now();

  if (currentTime < eventStartTime) {
    return "upcoming";
  }

  if (currentTime <= eventEndTime) {
    return "live";
  }

  return "ended";
}

export default function EBBCFloatingBanner() {
  const pathname = usePathname();

  const [isVisible, setIsVisible] =
    useState(false);

  const [countdown, setCountdown] =
    useState<CountdownValue | null>(null);

  const [eventStatus, setEventStatus] =
    useState<EventStatus>("upcoming");

  useEffect(() => {
    const dismissed =
      sessionStorage.getItem(storageKey);

    setIsVisible(dismissed !== "true");

    const updateEvent = () => {
      const currentStatus = getEventStatus();

      setEventStatus(currentStatus);

      if (currentStatus === "upcoming") {
        setCountdown(calculateCountdown());
      } else {
        setCountdown(null);
      }
    };

    updateEvent();

    const timer = window.setInterval(
      updateEvent,
      1000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const closeBanner = () => {
    sessionStorage.setItem(
      storageKey,
      "true",
    );

    setIsVisible(false);
  };

  if (
    pathname.startsWith("/ebbc2026") ||
    !isVisible
  ) {
    return null;
  }

  const countdownItems = [
    {
      label: "Days",
      value: countdown?.days,
    },
    {
      label: "Hours",
      value: countdown?.hours,
    },
    {
      label: "Mins",
      value: countdown?.minutes,
    },
    {
      label: "Secs",
      value: countdown?.seconds,
    },
  ];

  const buttonText =
    eventStatus === "upcoming"
      ? "Secure Your Seat"
      : eventStatus === "live"
        ? "View Event Details"
        : "View Event Highlights";

  const buttonHref =
    eventStatus === "upcoming"
      ? "/ebbc2026/tickets"
      : "/ebbc2026";

  return (
    <aside className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[340px] sm:px-0 sm:pb-0">
      <div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-[#0D1D34] text-white shadow-[0_24px_70px_rgba(13,29,52,0.4)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(204,133,145,0.55),transparent_40%)]" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-[#CC8591]" />

        <button
          type="button"
          onClick={closeBanner}
          aria-label="Close EBBC2026 announcement"
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-[#0D1D34]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-4 pr-12 sm:p-5 sm:pr-12">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#CC8591] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.18em] text-white">
              Second Edition
            </span>

            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/50">
              Nairobi
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#CC8591]">
                Elevate Beauty Business Convention
              </p>

              <h2 className="mt-1 [font-family:var(--font-display)] text-[38px] font-bold leading-[0.9] tracking-[-0.05em]">
                EBBC
                <span className="italic text-[#CC8591]">
                  2026
                </span>
              </h2>
            </div>

            <div className="rounded-[13px] border border-white/10 bg-white/[0.07] px-3 py-2 text-right">
              <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/40">
                Full Pass
              </p>

              <p className="mt-1 whitespace-nowrap text-[13px] font-extrabold text-[#CC8591]">
                KES 4,500
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-[11px] border border-white/10 bg-white/[0.05] px-2.5 py-2 text-[9px] font-bold text-white/70">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#CC8591]" />

              <span>17–18 Nov 2026</span>
            </div>

            <div className="flex items-center gap-2 rounded-[11px] border border-white/10 bg-white/[0.05] px-2.5 py-2 text-[9px] font-bold text-white/70">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#CC8591]" />

              <span>CITAM Valley Road</span>
            </div>
          </div>

          {eventStatus === "upcoming" && (
            <div
              className="mt-4"
              aria-live="polite"
            >
              <p className="mb-2 text-[7px] font-extrabold uppercase tracking-[0.18em] text-white/35">
                Convention begins in
              </p>

              <div className="grid grid-cols-4 gap-1.5">
                {countdownItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[11px] border border-white/10 bg-white/[0.07] px-1 py-2 text-center"
                  >
                    <p className="text-sm font-extrabold leading-none text-white">
                      {item.value === undefined
                        ? "--"
                        : String(
                            item.value,
                          ).padStart(2, "0")}
                    </p>

                    <p className="mt-1 text-[6px] font-bold uppercase tracking-[0.1em] text-white/35">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {eventStatus === "live" && (
            <div
              className="mt-4 flex items-center gap-3 rounded-[13px] border border-[#CC8591]/40 bg-[#CC8591]/10 px-4 py-3"
              aria-live="polite"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CC8591] opacity-70" />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#CC8591]" />
              </span>

              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                  Live Now
                </p>

                <p className="mt-1 text-xs font-extrabold text-white">
                  EBBC2026 is currently live
                </p>
              </div>

              <Radio className="ml-auto h-4 w-4 text-[#CC8591]" />
            </div>
          )}

          {eventStatus === "ended" && (
            <div
              className="mt-4 rounded-[13px] border border-white/10 bg-white/[0.07] px-4 py-3"
              aria-live="polite"
            >
              <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#CC8591]">
                Convention concluded
              </p>

              <p className="mt-1 text-xs font-extrabold text-white">
                EBBC2026 has ended
              </p>

              <p className="mt-1 text-[9px] leading-4 text-white/45">
                Thank you to everyone who attended
                and supported the convention.
              </p>
            </div>
          )}

          <Link
            href={buttonHref}
            className="group mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#CC8591] px-5 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0D1D34]"
          >
            {eventStatus === "upcoming" && (
              <Ticket className="h-4 w-4" />
            )}

            {eventStatus === "live" && (
              <Radio className="h-4 w-4" />
            )}

            {buttonText}

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </aside>
  );
}