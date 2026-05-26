"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type DropdownItem = {
  label: string;
  description: string;
  href: string;
};

const servicesLinks: DropdownItem[] = [
  {
    label: "For Business Owners",
    description: "Support for salons, spas, barbershops and beauty businesses.",
    href: "/business-owners",
  },
  {
    label: "For Investors",
    description: "Guidance for setting up and growing beauty businesses.",
    href: "/investors",
  },
  {
    label: "Training & Consulting",
    description: "Professional training, advisory and operational support.",
    href: "/training",
  },
  {
    label: "Business Systems",
    description: "Structured systems for stronger beauty business operations.",
    href: "/business-systems",
  },
];

const resourceLinks: DropdownItem[] = [
  {
    label: "Job Seekers",
    description: "Apply for beauty industry opportunities through Salons Assured.",
    href: "/job-seekers",
  },
  {
    label: "Industry Tips",
    description: "Insights, guidance and updates for the beauty industry.",
    href: "/blog",
  },
  {
    label: "Events",
    description: "Live trainings, audits, webinars and industry sessions.",
    href: "/events",
  },
];

const mobileLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Resources", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function ChevronDownIcon({ active }: { active?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ${
        active ? "text-[#b87586]" : "text-[#64748b] group-hover:text-[#b87586]"
      }`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 7.75L10 12.25L14.5 7.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive =
    pathname.startsWith("/services") ||
    servicesLinks.some((item) => pathname.startsWith(item.href));

  const isResourcesActive = resourceLinks.some((item) =>
    pathname.startsWith(item.href)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ead5db] bg-white/95 shadow-[0_8px_30px_rgba(7,27,51,0.05)] backdrop-blur-xl">
      {/* Top bar */}
      <div className="hidden border-b border-white/10 bg-[#071b33] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[13px]">
          <p className="font-medium tracking-wide text-white/80">
            Beauty Industry Recruitment • Training • Consulting
          </p>

          <div className="flex items-center gap-5 text-white/75">
            <a
              href="tel:+254715500268"
              className="transition-colors duration-300 hover:text-white"
            >
              Call/WhatsApp: 0715500268 / 0706551028
            </a>

            <span className="h-3 w-px bg-white/25" />

            <a
              href="mailto:info@salonsassured.co.ke"
              className="transition-colors duration-300 hover:text-white"
            >
              info@salonsassured.co.ke
            </a>

            <span className="h-3 w-px bg-white/25" />

            <Link
              href="/contact"
              className="font-semibold text-[#d79aaa] transition-colors duration-300 hover:text-white"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Salons Assured Kenya Ltd Home"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-[#ead5db] bg-white shadow-sm">
            <Image
              src="/salons-assured-logo.png"
              alt="Salons Assured Kenya Ltd"
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="leading-tight">
            <p className="text-[16px] font-bold tracking-tight text-[#071b33]">
              Salons Assured
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b87586]">
              Kenya Ltd
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className={`relative py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
              isActive("/")
                ? "text-[#071b33] after:w-full"
                : "text-[#334155] after:w-0 hover:text-[#071b33] hover:after:w-full"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`relative py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
              isActive("/about")
                ? "text-[#071b33] after:w-full"
                : "text-[#334155] after:w-0 hover:text-[#071b33] hover:after:w-full"
            }`}
          >
            About
          </Link>

          {/* Services dropdown */}
          <div className="group relative">
            <Link
              href="/services"
              className={`relative flex items-center gap-1.5 py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
                isServicesActive
                  ? "text-[#071b33] after:w-full"
                  : "text-[#334155] after:w-0 hover:text-[#071b33] group-hover:after:w-full"
              }`}
            >
              Services
              <ChevronDownIcon active={isServicesActive} />
            </Link>

            <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 translate-y-3 rounded-2xl border border-[#ead5db] bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(7,27,51,0.14)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-2">
                {servicesLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl p-4 transition-colors duration-300 hover:bg-[#fbf4f6]"
                  >
                    <p className="text-sm font-bold text-[#071b33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/recruitment"
            className={`relative py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
              isActive("/recruitment")
                ? "text-[#071b33] after:w-full"
                : "text-[#334155] after:w-0 hover:text-[#071b33] hover:after:w-full"
            }`}
          >
            Recruitment
          </Link>

          {/* Resources dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={`relative flex items-center gap-1.5 py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
                isResourcesActive
                  ? "text-[#071b33] after:w-full"
                  : "text-[#334155] after:w-0 hover:text-[#071b33] group-hover:after:w-full"
              }`}
            >
              Resources
              <ChevronDownIcon active={isResourcesActive} />
            </button>

            <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-3 rounded-2xl border border-[#ead5db] bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(7,27,51,0.14)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid gap-2">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl p-4 transition-colors duration-300 hover:bg-[#fbf4f6]"
                  >
                    <p className="text-sm font-bold text-[#071b33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`relative py-6 text-[14px] font-medium transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
              isActive("/contact")
                ? "text-[#071b33] after:w-full"
                : "text-[#334155] after:w-0 hover:text-[#071b33] hover:after:w-full"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/job-seekers"
            className="rounded-md border border-[#d7a0ad] px-5 py-2.5 text-[14px] font-semibold text-[#071b33] transition-colors duration-300 hover:border-[#b87586] hover:bg-[#fbf4f6]"
          >
            Apply for Jobs
          </Link>

          <Link
            href="/recruitment"
            className="rounded-md bg-[#071b33] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#0d2748]"
          >
            Request Staff
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#ead5db] text-[#071b33] transition-colors duration-300 hover:bg-[#fbf4f6] lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open menu</span>

          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#ead5db] bg-white transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5">
          <div className="grid gap-1">
            {mobileLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`border-b border-[#f2e1e6] px-1 py-3 text-sm font-medium transition-colors duration-300 ${
                    active
                      ? "text-[#071b33]"
                      : "text-[#334155] hover:text-[#071b33]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 rounded-xl bg-[#fbf4f6] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b87586]">
                Services
              </p>

              <div className="mt-3 grid gap-2">
                {servicesLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-[#071b33]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-[#fbf4f6] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b87586]">
                Resources
              </p>

              <div className="mt-3 grid gap-2">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-[#071b33]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#ead5db] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b87586]">
                Contact
              </p>

              <div className="mt-3 grid gap-2 text-sm text-[#071b33]">
                <a href="tel:+254715500268">0715500268 / 0706551028</a>
                <a href="mailto:info@salonsassured.co.ke">
                  info@salonsassured.co.ke
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/job-seekers"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-[#d7a0ad] px-5 py-3 text-center text-sm font-semibold text-[#071b33] transition hover:bg-[#fbf4f6]"
            >
              Apply for Jobs
            </Link>

            <Link
              href="/recruitment"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-[#071b33] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d2748]"
            >
              Request Staff
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}