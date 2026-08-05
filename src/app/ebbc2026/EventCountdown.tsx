"use client";

import { useEffect, useState } from "react";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const eventStartTime = new Date(
  "2026-11-17T08:00:00+03:00",
).getTime();

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

export default function EventCountdown() {
  const [countdown, setCountdown] =
    useState<CountdownValue>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown());
    };

    updateCountdown();

    const timer = window.setInterval(
      updateCountdown,
      1000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const items = [
    {
      label: "Days",
      value: countdown.days,
    },
    {
      label: "Hours",
      value: countdown.hours,
    },
    {
      label: "Minutes",
      value: countdown.minutes,
    },
    {
      label: "Seconds",
      value: countdown.seconds,
    },
  ];

  return (
    <div className="mt-6 rounded-[22px] border border-white/20 bg-[#0D1D34]/80 p-3 shadow-[0_18px_50px_rgba(13,29,52,0.35)] backdrop-blur-md sm:p-4">
      <p className="mb-3 text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#F0A5B1]">
        Convention begins in
      </p>

      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[14px] border border-white/15 bg-white/10 px-2 py-3 text-center"
          >
            <p className="text-xl font-black leading-none text-white sm:text-2xl">
              {String(item.value).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[7px] font-extrabold uppercase tracking-[0.12em] text-white/65">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}