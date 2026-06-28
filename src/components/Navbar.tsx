"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

const serviceLinks = [
  {
    label: "Recruitment & Staffing",
    href: "/recruitment",
    description: "Salon, spa, barbershop and beauty staff sourcing support.",
  },
  {
    label: "Training & Staff Development",
    href: "/services#training-development",
    description: "Improve skills, service delivery and team performance.",
  },
  {
    label: "Business Systems & Documentation",
    href: "/services#business-systems",
    description: "Policies, forms, SOPs and daily operating systems.",
  },
  {
    label: "Beauty Business Setup & Launch",
    href: "/services#business-setup",
    description: "Support for launching salons, spas and beauty brands.",
  },
  {
    label: "Digital Growth & Visibility",
    href: "/services#digital-growth",
    description: "Google Business, social media and online visibility support.",
  },
  {
    label: "Management Consultancy & Growth",
    href: "/services#management-consultancy",
    description: "Improve operations, leadership, performance and growth.",
  },
];

const resourceLinks = [
  { label: "For Investors", href: "/investors" },
  { label: "For Job Seekers", href: "/job-seekers" },
  { label: "Industry Tips", href: "/blog" },
  { label: "Events", href: "/events" },
];

const mobileMainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Business Owners", href: "/business-owners" },
  { label: "Contact", href: "/contact" },
];

type DropdownName = "services" | "resources" | null;

export default function Navbar() {
  const pathname = usePathname();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownName>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openDropdown = (dropdown: DropdownName) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(dropdown);
  };

  const closeDropdownSlowly = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 260);
  };

  const isActive = (href: string) => {
    const cleanHref = href.split("#")[0];

    if (cleanHref === "/") return pathname === "/";
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  const isServicesActive =
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/recruitment";

  const navLinkClass = (href: string) =>
    `whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-extrabold transition duration-300 xl:px-4 xl:text-[14px] ${
      isActive(href)
        ? "bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]"
        : "text-[#071b33]/78 hover:bg-[#fbf4f6] hover:text-[#b87586]"
    }`;

  return (
    <header
      className={`sticky left-0 top-0 z-50 w-full border-b border-[#ead5db]/70 bg-white/95 text-[#071b33] backdrop-blur-xl transition-all duration-300 ${
        hasScrolled
          ? "shadow-[0_14px_45px_rgba(7,27,51,0.10)]"
          : "shadow-[0_8px_28px_rgba(7,27,51,0.06)]"
      }`}
    >
      {/* TOP CONTACT BAR */}
      <div className="hidden border-b border-[#ead5db]/70 bg-[#fbf4f6] lg:block">
        <div className="mx-auto flex h-9 w-full max-w-[1180px] items-center justify-between px-4 text-[12px] font-semibold text-slate-600 xl:max-w-[1240px]">
          <div className="flex items-center gap-5">
            <a
              href="tel:+254715500268"
              className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[#b87586]"
            >
              <Phone className="h-3.5 w-3.5 text-[#b87586]" />
              0715500268 / 0706551028
            </a>

            <a
              href="mailto:info@salonsassured.co.ke"
              className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[#b87586]"
            >
              <Mail className="h-3.5 w-3.5 text-[#b87586]" />
              info@salonsassured.co.ke
            </a>
          </div>

          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <MapPin className="h-3.5 w-3.5 text-[#b87586]" />
            Kwaheri Road, Runda, Nairobi
          </span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="mx-auto grid h-[78px] w-full max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-5 px-4 xl:max-w-[1240px] xl:gap-7">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Salons Assured Kenya Ltd Home"
          className="flex min-w-fit items-center gap-3"
        >
          <div className="relative h-[58px] w-[58px] shrink-0 xl:h-[62px] xl:w-[62px]">
            <Image
              src="/salons-assured.png"
              alt="Salons Assured Kenya Ltd"
              fill
              priority
              sizes="62px"
              className="object-contain"
            />
          </div>

          <div className="hidden min-w-fit sm:block">
            <p className="font-serif text-[22px] font-black leading-[0.9] tracking-[-0.045em] text-[#071b33] xl:text-[24px]">
              Salons Assured
            </p>
            <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#b87586] xl:text-[10px]">
              Kenya Ltd
            </p>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center justify-center gap-1 lg:flex xl:gap-1.5">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>

          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>

          {/* SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("services")}
            onMouseLeave={closeDropdownSlowly}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-extrabold transition duration-300 xl:px-4 xl:text-[14px] ${
                isServicesActive
                  ? "bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]"
                  : "text-[#071b33]/78 hover:bg-[#fbf4f6] hover:text-[#b87586]"
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition duration-300 ${
                  activeDropdown === "services" ? "rotate-180" : ""
                }`}
              />
            </Link>

            <div
              className={`absolute left-1/2 top-full z-50 w-[780px] -translate-x-1/2 pt-5 transition duration-200 ${
                activeDropdown === "services"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
              onMouseEnter={() => openDropdown("services")}
              onMouseLeave={closeDropdownSlowly}
            >
              <div className="overflow-hidden rounded-[1.7rem] border border-[#ead5db] bg-white shadow-[0_24px_80px_rgba(7,27,51,0.16)]">
                <div className="grid grid-cols-[0.86fr_1.14fr]">
                  <div className="bg-[#071b33] p-6 text-white">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#d9a3af]">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#d9a3af]">
                      Salons Assured Services
                    </p>

                    <h3 className="mt-3 font-serif text-[34px] font-black leading-tight tracking-[-0.04em]">
                      Beauty business support.
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/70">
                      Recruitment, training, systems, setup, digital visibility
                      and business growth support for salons, spas, barbershops
                      and beauty brands.
                    </p>

                    <Link
                      href="/services"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#d9a3af] hover:bg-white/10"
                    >
                      View All Services
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-4">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group rounded-[1.1rem] p-4 transition duration-300 hover:bg-[#fbf4f6]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-serif text-[21px] font-black leading-tight tracking-[-0.035em] text-[#071b33] transition group-hover:text-[#b87586]">
                              {link.label}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {link.description}
                            </p>
                          </div>

                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#b87586] opacity-0 transition group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/business-owners"
            className={navLinkClass("/business-owners")}
          >
            Business Owners
          </Link>

          {/* RESOURCES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("resources")}
            onMouseLeave={closeDropdownSlowly}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-extrabold text-[#071b33]/78 transition duration-300 hover:bg-[#fbf4f6] hover:text-[#b87586] xl:px-4 xl:text-[14px]"
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition duration-300 ${
                  activeDropdown === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute left-0 top-full z-50 w-[320px] pt-5 transition duration-200 ${
                activeDropdown === "resources"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
              onMouseEnter={() => openDropdown("resources")}
              onMouseLeave={closeDropdownSlowly}
            >
              <div className="rounded-[1.4rem] border border-[#ead5db] bg-white p-3 shadow-[0_24px_80px_rgba(7,27,51,0.16)]">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-extrabold text-[#071b33]/78 transition hover:bg-[#fbf4f6] hover:text-[#b87586]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden min-w-fit items-center justify-end gap-2.5 lg:flex xl:gap-3">
          <Link
            href="/job-seekers"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#ead5db] bg-white px-4 text-[13px] font-extrabold text-[#071b33] transition duration-300 hover:-translate-y-0.5 hover:border-[#d9a3af] hover:bg-[#fbf4f6] hover:text-[#b87586] xl:h-12 xl:px-5 xl:text-[14px]"
          >
            <UsersRound className="h-4 w-4" />
            Apply for Jobs
          </Link>

          <Link
            href="/request-staff"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#071b33] px-4 text-[13px] font-extrabold text-white shadow-[0_12px_28px_rgba(7,27,51,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#b87586] hover:shadow-[0_16px_36px_rgba(184,117,134,0.28)] xl:h-12 xl:px-5 xl:text-[14px]"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Request Staff
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead5db] bg-white text-[#071b33] shadow-sm transition hover:bg-[#fbf4f6] lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-[#ead5db] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(7,27,51,0.12)] lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {mobileMainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-base font-extrabold transition ${
                  isActive(link.href)
                    ? "bg-[#fbf4f6] text-[#b87586]"
                    : "text-[#071b33] hover:bg-[#fbf4f6] hover:text-[#b87586]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 rounded-[1.2rem] bg-[#fbf4f6] p-3">
              <p className="px-2 pb-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                Services
              </p>

              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-sm font-bold text-[#071b33]/78 transition hover:bg-white hover:text-[#b87586]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 rounded-[1.2rem] bg-[#fbf4f6] p-3">
              <p className="px-2 pb-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                Resources
              </p>

              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-sm font-bold text-[#071b33]/78 transition hover:bg-white hover:text-[#b87586]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 grid gap-3">
              <Link
                href="/job-seekers"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#ead5db] bg-white px-5 text-sm font-extrabold text-[#071b33] transition hover:bg-[#fbf4f6] hover:text-[#b87586]"
              >
                <UsersRound className="h-4 w-4" />
                Apply for Jobs
              </Link>

              <Link
                href="/request-staff"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#071b33] px-5 text-sm font-extrabold text-white transition hover:bg-[#b87586]"
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Request Staff
              </Link>
            </div>

            <div className="mt-6 grid gap-3 rounded-[1.2rem] bg-[#071b33] p-5 text-sm text-white/72">
              <a
                href="tel:+254715500268"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#d9a3af]" />
                0715500268 / 0706551028
              </a>

              <a
                href="mailto:info@salonsassured.co.ke"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#d9a3af]" />
                info@salonsassured.co.ke
              </a>

              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#d9a3af]" />
                Kwaheri Road, Runda, Nairobi
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}