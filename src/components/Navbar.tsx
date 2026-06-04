"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    label: "Recruitment & Staffing",
    description: "Salon, spa and barbershop staffing support.",
    href: "/services#recruitment-staffing",
  },
  {
    label: "Training & Staff Development",
    description: "Improve skills, service delivery and team performance.",
    href: "/services#training-development",
  },
  {
    label: "Business Systems & Documentation",
    description: "SOPs, HR documents, checklists and operating tools.",
    href: "/services#business-systems",
  },
  {
    label: "Business Setup & Launch Support",
    description: "Structure and launch your beauty business professionally.",
    href: "/services#business-setup",
  },
  {
    label: "Digital Growth & Visibility",
    description: "Google Business, social media and online visibility support.",
    href: "/services#digital-growth",
  },
  {
    label: "Management Consultancy",
    description: "Business audits, performance tracking and growth support.",
    href: "/services#management-consultancy",
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

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHome = pathname === "/";
  const transparentHome = isHome && !hasScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]);
  };

  const isServicesActive = pathname.startsWith("/services");

  const isResourcesActive = resourceLinks.some((item) =>
    pathname.startsWith(item.href)
  );

  const navLinkClass = (active: boolean) =>
    `relative py-7 text-[14px] font-semibold transition-colors duration-300 after:absolute after:bottom-5 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
      active
        ? "text-[#071b33] after:w-full"
        : "text-[#334155] after:w-0 hover:text-[#071b33] hover:after:w-full"
    }`;

  return (
    <header
      className={`z-50 w-full transition-all duration-500 ${
        isHome ? "fixed left-0 top-0" : "sticky top-0"
      } ${
        transparentHome
          ? "border-transparent bg-transparent shadow-none"
          : "border-b border-[#ead5db] bg-white/95 shadow-[0_14px_42px_rgba(7,27,51,0.08)] backdrop-blur-xl"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 lg:px-6 ${
          transparentHome ? "h-[104px]" : "h-[86px]"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Salons Assured Kenya Ltd Home"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`relative shrink-0 overflow-visible transition-all duration-500 ${
              transparentHome ? "h-[78px] w-[78px]" : "h-[68px] w-[68px]"
            }`}
          >
            <Image
              src="/salons-assured.png"
              alt="Salons Assured Kenya Ltd"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <p
              className={`font-bold tracking-tight text-[#071b33] transition-all duration-500 ${
                transparentHome ? "text-[18px]" : "text-[17px]"
              }`}
            >
              Salons Assured
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.34em] text-[#b87586]">
              Kenya Ltd
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={navLinkClass(isActive("/"))}>
            Home
          </Link>

          <Link href="/about" className={navLinkClass(isActive("/about"))}>
            About
          </Link>

          {/* Services dropdown */}
          <div className="group relative">
            <Link
              href="/services"
              className={`relative flex items-center gap-1.5 py-7 text-[14px] font-semibold transition-colors duration-300 after:absolute after:bottom-5 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
                isServicesActive
                  ? "text-[#071b33] after:w-full"
                  : "text-[#334155] after:w-0 hover:text-[#071b33] group-hover:after:w-full"
              }`}
            >
              Services
              <ChevronDownIcon active={isServicesActive} />
            </Link>

            <div className="invisible absolute left-1/2 top-full w-[720px] -translate-x-1/2 translate-y-4 rounded-2xl border border-[#ead5db] bg-white p-4 opacity-0 shadow-[0_28px_70px_rgba(7,27,51,0.16)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-2">
                {servicesLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl p-4 transition duration-300 hover:bg-[#fbf4f6]"
                  >
                    <p className="text-[14px] font-extrabold text-[#071b33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-slate-600">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/recruitment"
            className={navLinkClass(isActive("/recruitment"))}
          >
            Recruitment
          </Link>

          {/* Resources dropdown */}
          <div className="group relative">
            <Link
              href="/blog"
              className={`relative flex items-center gap-1.5 py-7 text-[14px] font-semibold transition-colors duration-300 after:absolute after:bottom-5 after:left-0 after:h-[2px] after:bg-[#b87586] after:transition-all after:duration-300 ${
                isResourcesActive
                  ? "text-[#071b33] after:w-full"
                  : "text-[#334155] after:w-0 hover:text-[#071b33] group-hover:after:w-full"
              }`}
            >
              Resources
              <ChevronDownIcon active={isResourcesActive} />
            </Link>

            <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-4 rounded-2xl border border-[#ead5db] bg-white p-4 opacity-0 shadow-[0_28px_70px_rgba(7,27,51,0.16)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid gap-2">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl p-4 transition duration-300 hover:bg-[#fbf4f6]"
                  >
                    <p className="text-[14px] font-extrabold text-[#071b33]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-slate-600">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className={navLinkClass(isActive("/contact"))}>
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/job-seekers"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#d7a0ad] bg-white/70 px-5 text-[14px] font-extrabold text-[#071b33] transition duration-300 hover:border-[#b87586] hover:bg-[#fbf4f6]"
          >
            Apply for Jobs
          </Link>

          <Link
            href="/recruitment"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#071b33] px-5 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(7,27,51,0.18)] transition duration-300 hover:bg-[#0d2748]"
          >
            Request Staff
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#ead5db] bg-white/80 text-[#071b33] shadow-sm lg:hidden"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#ead5db] bg-white transition-all duration-500 lg:hidden ${
          isOpen ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-5">
          <div className="grid gap-2">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3 text-[15px] font-bold transition ${
                  isActive(link.href)
                    ? "bg-[#fbf4f6] text-[#b87586]"
                    : "text-[#071b33] hover:bg-[#fbf4f6]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 border-t border-[#ead5db] pt-5">
            <a
              href="tel:+254715500268"
              className="rounded-xl bg-[#fbf4f6] px-4 py-3 text-sm font-bold text-[#071b33]"
            >
              Call/WhatsApp: 0715500268 / 0706551028
            </a>

            <a
              href="mailto:info@salonsassured.co.ke"
              className="rounded-xl bg-[#fbf4f6] px-4 py-3 text-sm font-bold text-[#071b33]"
            >
              info@salonsassured.co.ke
            </a>

            <Link
              href="/job-seekers"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-md border border-[#d7a0ad] px-5 py-4 text-sm font-extrabold text-[#071b33]"
            >
              Apply for Jobs
            </Link>

            <Link
              href="/recruitment"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-[#071b33] px-5 py-4 text-sm font-extrabold text-white"
            >
              Request Staff
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}