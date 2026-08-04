"use client";

import { useEffect, useState } from "react";

const eventDate = new Date(
  "2026-11-17T08:00:00+03:00",
).getTime();

export default function EventCountdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = Math.max(
        eventDate - Date.now(),
        0,
      );

      setTime({
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
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <div className="mt-8 grid grid-cols-4 gap-2 rounded-[22px] border border-white/10 bg-white/[0.07] p-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-[16px] bg-white/[0.07] px-2 py-4 text-center"
        >
          <p className="text-xl font-black">
            {String(value).padStart(2, "0")}
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-white/45">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}