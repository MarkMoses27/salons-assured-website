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
    description:
      "Professional staffing support for salons, spas, barbershops and beauty brands.",
  },
  {
    label: "Training & Staff Development",
    href: "/services#training-development",
    description:
      "Improve technical skills, customer experience and staff performance.",
  },
  {
    label: "Business Systems & Documentation",
    href: "/services#business-systems",
    description:
      "Policies, procedures, forms and operating systems for beauty businesses.",
  },
  {
    label: "Beauty Business Setup & Launch",
    href: "/services#business-setup",
    description:
      "Practical support for launching salons, spas and beauty enterprises.",
  },
  {
    label: "Digital Growth & Visibility",
    href: "/services#digital-growth",
    description:
      "Strengthen your online presence, visibility and customer acquisition.",
  },
  {
    label: "Management Consultancy & Growth",
    href: "/services#management-consultancy",
    description:
      "Improve leadership, operations, profitability and sustainable growth.",
  },
];

const resourceLinks = [
  {
    label: "For Investors",
    href: "/investors",
    description: "Beauty-sector opportunities and business insights.",
  },
  {
    label: "For Job Seekers",
    href: "/job-seekers",
    description: "Explore beauty-industry career opportunities.",
  },
  {
    label: "Events",
    href: "/events",
    description: "Training sessions, networking and industry events.",
  },
];

const mobileMainLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Business Owners", href: "/business-owners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type DropdownName = "services" | "resources" | null;

export default function Navbar() {
  const pathname = usePathname();

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] =
    useState<DropdownName>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openDropdown = (
    dropdown: Exclude<DropdownName, null>,
  ) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setActiveDropdown(dropdown);
  };

  const toggleDropdown = (
    dropdown: Exclude<DropdownName, null>,
  ) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setActiveDropdown((current) =>
      current === dropdown ? null : dropdown,
    );
  };

  const closeDropdownSlowly = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const isActive = (href: string) => {
    const cleanHref = href.split("#")[0];

    if (cleanHref === "/") {
      return pathname === "/";
    }

    return (
      pathname === cleanHref ||
      pathname.startsWith(`${cleanHref}/`)
    );
  };

  const isServicesActive =
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/recruitment" ||
    pathname.startsWith("/recruitment/");

  const isResourcesActive = resourceLinks.some((link) =>
    isActive(link.href),
  );

  const navigationLinkClass = (href: string) => {
    const active = isActive(href);

    return [
      "group relative inline-flex h-full items-center px-2",
      "text-[13px] font-bold tracking-[-0.01em]",
      "transition-colors duration-300",
      active
        ? "text-[#b87586]"
        : "text-[#071b33]/75 hover:text-[#b87586]",
    ].join(" ");
  };

  const navigationUnderlineClass = (active: boolean) =>
    [
      "absolute bottom-[19px] left-2 right-2 h-[2px]",
      "origin-left rounded-full bg-[#b87586]",
      "transition-transform duration-300",
      active
        ? "scale-x-100"
        : "scale-x-0 group-hover:scale-x-100",
    ].join(" ");

  const dropdownButtonClass = (active: boolean) =>
    [
      "group relative inline-flex h-full items-center gap-1 px-2",
      "text-[13px] font-bold tracking-[-0.01em]",
      "transition-colors duration-300",
      active
        ? "text-[#b87586]"
        : "text-[#071b33]/75 hover:text-[#b87586]",
    ].join(" ");

  return (
    <header
      className={[
        "sticky left-0 top-0 z-50 w-full",
        "border-b border-[#ead5db]/75",
        "bg-white/95 text-[#071b33] backdrop-blur-xl",
        "transition-shadow duration-300",
        hasScrolled
          ? "shadow-[0_16px_45px_rgba(7,27,51,0.10)]"
          : "shadow-[0_5px_20px_rgba(7,27,51,0.045)]",
      ].join(" ")}
    >
      {/* CONTACT BAR */}
      <div className="hidden border-b border-[#ead5db]/65 bg-[#fbf4f6] md:block">
        <div className="mx-auto flex h-9 w-full max-w-[1320px] items-center justify-between px-5 text-[11px] font-semibold text-slate-600 lg:px-7">
          <div className="flex items-center gap-5">
            <a
              href="tel:+254715500268"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[#b87586]"
            >
              <Phone
                className="h-3.5 w-3.5 text-[#b87586]"
                strokeWidth={2}
              />

              <span>0715 500 268 / 0706 551 028</span>
            </a>

            <a
              href="mailto:info@salonsassured.co.ke"
              className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[#b87586]"
            >
              <Mail
                className="h-3.5 w-3.5 text-[#b87586]"
                strokeWidth={2}
              />

              <span>info@salonsassured.co.ke</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 whitespace-nowrap lg:inline-flex">
              Kenya&apos;s Beauty Business Growth Partner
            </span>

            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <MapPin
                className="h-3.5 w-3.5 text-[#b87586]"
                strokeWidth={2}
              />

              Kwaheri Road, Runda
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="mx-auto grid h-[82px] w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 lg:px-7">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Salons Assured Kenya Ltd home"
          className="group flex min-w-fit items-center gap-3"
        >
          <div className="relative h-[58px] w-[58px] shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src="/salons-assured.png"
              alt="Salons Assured Kenya Ltd"
              fill
              priority
              sizes="58px"
              className="object-contain"
            />
          </div>

          <div className="hidden min-w-fit sm:block">
            <p className="font-serif text-[21px] font-black leading-none tracking-[-0.045em] text-[#071b33] lg:text-[23px]">
              Salons Assured
            </p>

            <p className="mt-1.5 text-[8px] font-extrabold uppercase tracking-[0.31em] text-[#b87586] lg:text-[9px]">
              Kenya Limited
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden h-full items-center justify-center gap-2 xl:flex">
          <Link
            href="/"
            className={navigationLinkClass("/")}
          >
            Home
            <span
              className={navigationUnderlineClass(
                isActive("/"),
              )}
            />
          </Link>

          <Link
            href="/about"
            className={navigationLinkClass("/about")}
          >
            About
            <span
              className={navigationUnderlineClass(
                isActive("/about"),
              )}
            />
          </Link>

          {/* SERVICES DROPDOWN */}
          <div
            className="relative flex h-full items-center"
            onMouseEnter={() => openDropdown("services")}
            onMouseLeave={closeDropdownSlowly}
            onFocus={() => openDropdown("services")}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "services"}
              aria-haspopup="true"
              onClick={() => toggleDropdown("services")}
              className={dropdownButtonClass(
                isServicesActive,
              )}
            >
              Services

              <ChevronDown
                className={[
                  "h-3.5 w-3.5 transition-transform duration-300",
                  activeDropdown === "services"
                    ? "rotate-180"
                    : "",
                ].join(" ")}
                strokeWidth={2.3}
              />

              <span
                className={navigationUnderlineClass(
                  isServicesActive,
                )}
              />
            </button>

            <div
              className={[
                "absolute left-1/2 top-full z-50 w-[790px]",
                "-translate-x-1/2 pt-4",
                "transition-all duration-200",
                activeDropdown === "services"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0",
              ].join(" ")}
              onMouseEnter={() => openDropdown("services")}
              onMouseLeave={closeDropdownSlowly}
            >
              <div className="overflow-hidden rounded-[26px] border border-[#ead5db] bg-white shadow-[0_28px_90px_rgba(7,27,51,0.17)]">
                <div className="grid grid-cols-[0.78fr_1.22fr]">
                  <div className="relative overflow-hidden bg-[#071b33] p-7 text-white">
                    <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10" />
                    <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#b87586]/15 blur-2xl" />

                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#e3b4bf]">
                        <Sparkles
                          className="h-5 w-5"
                          strokeWidth={1.8}
                        />
                      </div>

                      <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#e3b4bf]">
                        Our Expertise
                      </p>

                      <h3 className="mt-3 max-w-[260px] font-serif text-[31px] font-black leading-[1.08] tracking-[-0.04em]">
                        Building stronger beauty businesses.
                      </h3>

                      <p className="mt-4 max-w-[275px] text-[13px] leading-6 text-white/70">
                        Strategic, operational and people-focused
                        support for salons, spas, barbershops and
                        beauty brands.
                      </p>

                      <Link
                        href="/services"
                        className="mt-6 inline-flex items-center gap-2 border-b border-[#e3b4bf] pb-1 text-[12px] font-extrabold text-white transition-colors hover:text-[#e3b4bf]"
                      >
                        Explore all services

                        <ArrowUpRight
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 p-4">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group rounded-[18px] p-4 transition-colors duration-300 hover:bg-[#fbf4f6]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-serif text-[18px] font-black leading-[1.2] tracking-[-0.025em] text-[#071b33] transition-colors group-hover:text-[#b87586]">
                              {link.label}
                            </p>

                            <p className="mt-2 text-[12px] leading-5 text-slate-600">
                              {link.description}
                            </p>
                          </div>

                          <ArrowUpRight
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#b87586] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                            strokeWidth={2}
                          />
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
            className={navigationLinkClass(
              "/business-owners",
            )}
          >
            Business Owners
            <span
              className={navigationUnderlineClass(
                isActive("/business-owners"),
              )}
            />
          </Link>

          {/* BLOG IS NOW A MAIN LINK */}
          <Link
            href="/blog"
            className={navigationLinkClass("/blog")}
          >
            Blog
            <span
              className={navigationUnderlineClass(
                isActive("/blog"),
              )}
            />
          </Link>

          {/* RESOURCES DROPDOWN */}
          <div
            className="relative flex h-full items-center"
            onMouseEnter={() => openDropdown("resources")}
            onMouseLeave={closeDropdownSlowly}
            onFocus={() => openDropdown("resources")}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "resources"}
              aria-haspopup="true"
              onClick={() => toggleDropdown("resources")}
              className={dropdownButtonClass(
                isResourcesActive,
              )}
            >
              Resources

              <ChevronDown
                className={[
                  "h-3.5 w-3.5 transition-transform duration-300",
                  activeDropdown === "resources"
                    ? "rotate-180"
                    : "",
                ].join(" ")}
                strokeWidth={2.3}
              />

              <span
                className={navigationUnderlineClass(
                  isResourcesActive,
                )}
              />
            </button>

            <div
              className={[
                "absolute right-0 top-full z-50 w-[355px] pt-4",
                "transition-all duration-200",
                activeDropdown === "resources"
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0",
              ].join(" ")}
              onMouseEnter={() => openDropdown("resources")}
              onMouseLeave={closeDropdownSlowly}
            >
              <div className="rounded-[22px] border border-[#ead5db] bg-white p-3 shadow-[0_28px_80px_rgba(7,27,51,0.16)]">
                <div className="border-b border-[#ead5db] px-4 pb-3 pt-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                    Explore Salons Assured
                  </p>
                </div>

                <div className="pt-2">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start justify-between gap-4 rounded-[15px] px-4 py-3.5 transition-colors hover:bg-[#fbf4f6]"
                    >
                      <div>
                        <p className="text-[13px] font-extrabold text-[#071b33] transition-colors group-hover:text-[#b87586]">
                          {link.label}
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {link.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-[#b87586] transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={navigationLinkClass("/contact")}
          >
            Contact
            <span
              className={navigationUnderlineClass(
                isActive("/contact"),
              )}
            />
          </Link>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden min-w-fit items-center justify-end gap-2.5 xl:flex">
          <Link
            href="/job-seekers"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#ead5db] bg-white px-4 text-[12px] font-extrabold text-[#071b33] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d9a3af] hover:bg-[#fbf4f6] hover:text-[#b87586]"
          >
            <UsersRound
              className="h-4 w-4"
              strokeWidth={2}
            />

            Find Jobs
          </Link>

          <Link
            href="/request-staff"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#071b33] px-5 text-[12px] font-extrabold text-white shadow-[0_12px_28px_rgba(7,27,51,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b87586] hover:shadow-[0_16px_35px_rgba(184,117,134,0.28)]"
          >
            <BriefcaseBusiness
              className="h-4 w-4"
              strokeWidth={2}
            />

            Request Staff
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setIsOpen((current) => !current);
            setActiveDropdown(null);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead5db] bg-white text-[#071b33] shadow-sm transition-colors hover:bg-[#fbf4f6] hover:text-[#b87586] xl:hidden"
        >
          {isOpen ? (
            <X
              className="h-5 w-5"
              strokeWidth={2}
            />
          ) : (
            <Menu
              className="h-5 w-5"
              strokeWidth={2}
            />
          )}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        className={[
          "absolute left-0 top-full w-full xl:hidden",
          "border-t border-[#ead5db] bg-white",
          "shadow-[0_24px_60px_rgba(7,27,51,0.15)]",
          "transition-all duration-300",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="max-h-[calc(100vh-82px)] overflow-y-auto px-5 py-6">
          <div className="mx-auto max-w-[760px]">
            {/* MAIN MOBILE LINKS */}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
              {mobileMainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "flex items-center justify-between rounded-[14px]",
                    "px-4 py-3.5 text-[14px] font-extrabold",
                    "transition-colors",
                    isActive(link.href)
                      ? "bg-[#fbf4f6] text-[#b87586]"
                      : "text-[#071b33] hover:bg-[#fbf4f6] hover:text-[#b87586]",
                  ].join(" ")}
                >
                  {link.label}

                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={1.9}
                  />
                </Link>
              ))}
            </div>

            {/* MOBILE SERVICES */}
            <div className="mt-5 rounded-[22px] border border-[#ead5db] bg-[#fbf4f6] p-3">
              <div className="flex items-center justify-between px-2 pb-2 pt-1">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                    Our Services
                  </p>

                  <p className="mt-1 text-[12px] text-slate-500">
                    Support for beauty businesses and professionals
                  </p>
                </div>

                <Sparkles
                  className="h-5 w-5 text-[#b87586]"
                  strokeWidth={1.8}
                />
              </div>

              <div className="mt-2 grid gap-1 sm:grid-cols-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[14px] bg-white/70 px-3.5 py-3 text-[12px] font-bold leading-5 text-[#071b33]/80 transition-colors hover:bg-white hover:text-[#b87586]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* MOBILE RESOURCES */}
            <div className="mt-4 rounded-[22px] border border-[#ead5db] bg-white p-3">
              <p className="px-2 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                More Resources
              </p>

              <div className="grid gap-1 sm:grid-cols-3">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[14px] px-3.5 py-3 text-[12px] font-bold text-[#071b33]/80 transition-colors hover:bg-[#fbf4f6] hover:text-[#b87586]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/job-seekers"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#ead5db] bg-white px-5 text-[13px] font-extrabold text-[#071b33] transition-colors hover:bg-[#fbf4f6] hover:text-[#b87586]"
              >
                <UsersRound
                  className="h-4 w-4"
                  strokeWidth={2}
                />

                Apply for Jobs
              </Link>

              <Link
                href="/request-staff"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#071b33] px-5 text-[13px] font-extrabold text-white transition-colors hover:bg-[#b87586]"
              >
                <BriefcaseBusiness
                  className="h-4 w-4"
                  strokeWidth={2}
                />

                Request Staff
              </Link>
            </div>

            {/* MOBILE CONTACT INFORMATION */}
            <div className="mt-5 grid gap-3 rounded-[22px] bg-[#071b33] p-5 text-[12px] text-white/75 sm:grid-cols-3">
              <a
                href="tel:+254715500268"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-[#e3b4bf]"
                  strokeWidth={2}
                />

                <span>0715 500 268</span>
              </a>

              <a
                href="mailto:info@salonsassured.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-[#e3b4bf]"
                  strokeWidth={2}
                />

                <span>info@salonsassured.com</span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin
                  className="h-4 w-4 shrink-0 text-[#e3b4bf]"
                  strokeWidth={2}
                />

                <span>Kwaheri Road, Runda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}