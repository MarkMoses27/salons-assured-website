"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type DropdownName =
  | "services"
  | "audiences"
  | "insights"
  | null;

type DropdownLink = {
  label: string;
  href: string;
};

const serviceLinks: DropdownLink[] = [
  {
    label: "Recruitment & Staffing",
    href: "/recruitment",
  },
  {
    label: "Training & Development",
    href: "/services#training-development",
  },
  {
    label: "Business Systems",
    href: "/services#business-systems",
  },
  {
    label: "Business Setup & Launch",
    href: "/services#business-setup",
  },
  {
    label: "Digital Growth",
    href: "/services#digital-growth",
  },
  {
    label: "Management Consultancy",
    href: "/services#management-consultancy",
  },
];

const audienceLinks: DropdownLink[] = [
  {
    label: "Business Owners",
    href: "/business-owners",
  },
  {
    label: "Investors",
    href: "/investors",
  },
  {
    label: "Job Seekers",
    href: "/job-seekers",
  },
];

const insightLinks: DropdownLink[] = [
  {
    label: "Blog & Insights",
    href: "/blog",
  },
  {
    label: "Events",
    href: "/events",
  },
];

const mobileLinks: DropdownLink[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Business Owners",
    href: "/business-owners",
  },
  {
    label: "Investors",
    href: "/investors",
  },
  {
    label: "Job Seekers",
    href: "/job-seekers",
  },
  {
    label: "Blog & Insights",
    href: "/blog",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const overlayRoutes = [
  "/",
  "/about",
  "/services",
  "/recruitment",
  "/business-owners",
  "/investors",
  "/events",
];

type DesktopDropdownProps = {
  name: Exclude<DropdownName, null>;
  label: string;
  eyebrow: string;
  links: DropdownLink[];
  active: boolean;
  activeDropdown: DropdownName;
  width?: string;
  onOpen: (
    name: Exclude<DropdownName, null>,
  ) => void;
  onClose: () => void;
  onToggle: (
    name: Exclude<DropdownName, null>,
  ) => void;
  isActive: (href: string) => boolean;
};

function DesktopDropdown({
  name,
  label,
  eyebrow,
  links,
  active,
  activeDropdown,
  width = "w-[340px]",
  onOpen,
  onClose,
  onToggle,
  isActive,
}: DesktopDropdownProps) {
  const isOpen =
    activeDropdown === name;

  return (
    <div
      className="relative flex h-full items-center"
      onMouseEnter={() => onOpen(name)}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => onToggle(name)}
        className={[
          "group relative flex h-full items-center gap-2",
          "text-[13px] font-extrabold tracking-[-0.015em]",
          "transition-colors duration-300",
          active
            ? "text-[#b87586]"
            : "text-[#071b33]/85 hover:text-[#071b33]",
        ].join(" ")}
      >
        {label}

        <ChevronDown
          className={[
            "h-3.5 w-3.5 transition-transform duration-300",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
          strokeWidth={2.2}
        />

        <span
          className={[
            "absolute bottom-[12px] left-1/2 h-1.5 w-1.5",
            "-translate-x-1/2 rounded-full bg-[#b87586]",
            "transition-all duration-300",
            active
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
          ].join(" ")}
        />
      </button>

      <div
        className={[
          "absolute left-1/2 top-full z-50",
          "-translate-x-1/2 pt-3",
          width,
          "transition-all duration-200",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0",
        ].join(" ")}
        onMouseEnter={() => onOpen(name)}
        onMouseLeave={onClose}
      >
        <div className="overflow-hidden rounded-[18px] border border-[#ead5db] bg-white p-2 shadow-[0_28px_90px_rgba(7,27,51,0.18)]">
          <div className="px-4 pb-3 pt-3">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">
              {eyebrow}
            </p>
          </div>

          <div className="border-t border-[#ead5db]">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "group flex items-center justify-between gap-5",
                  "border-b border-[#ead5db] px-4 py-4",
                  "transition-colors duration-300",
                  "last:border-b-0 hover:bg-[#fbf4f6]",
                  isActive(link.href)
                    ? "bg-[#fbf4f6]"
                    : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[14px] font-black text-[#d9a3af]">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span
                    className={[
                      "text-[13px] font-extrabold",
                      "transition-colors duration-300",
                      isActive(link.href)
                        ? "text-[#b87586]"
                        : "text-[#071b33] group-hover:text-[#b87586]",
                    ].join(" ")}
                  >
                    {link.label}
                  </span>
                </div>

                <ArrowUpRight
                  className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const headerRef =
    useRef<HTMLElement | null>(null);

  const closeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const [isOpen, setIsOpen] =
    useState(false);

  const [
    activeDropdown,
    setActiveDropdown,
  ] = useState<DropdownName>(null);

  const [hasScrolled, setHasScrolled] =
    useState(false);

  const isOverlayRoute =
    overlayRoutes.some((route) => {
      if (route === "/") {
        return pathname === "/";
      }

      return (
        pathname === route ||
        pathname.startsWith(`${route}/`)
      );
    });

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(
        window.scrollY > 20,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleOutsideClick = (
      event: PointerEvent,
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          event.target as Node,
        )
      ) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    document.addEventListener(
      "pointerdown",
      handleOutsideClick,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(
          closeTimerRef.current,
        );
      }
    };
  }, []);

  const isActive = (href: string) => {
    const cleanHref =
      href.split("#")[0];

    if (cleanHref === "/") {
      return pathname === "/";
    }

    return (
      pathname === cleanHref ||
      pathname.startsWith(
        `${cleanHref}/`,
      )
    );
  };

  const groupActive = (
    links: DropdownLink[],
  ) => {
    return links.some((link) =>
      isActive(link.href),
    );
  };

  const servicesActive =
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname === "/recruitment" ||
    pathname.startsWith(
      "/recruitment/",
    );

  const openDropdown = (
    name: Exclude<
      DropdownName,
      null
    >,
  ) => {
    if (closeTimerRef.current) {
      clearTimeout(
        closeTimerRef.current,
      );
    }

    setActiveDropdown(name);
  };

  const closeDropdownSlowly = () => {
    if (closeTimerRef.current) {
      clearTimeout(
        closeTimerRef.current,
      );
    }

    closeTimerRef.current =
      setTimeout(() => {
        setActiveDropdown(null);
      }, 180);
  };

  const toggleDropdown = (
    name: Exclude<
      DropdownName,
      null
    >,
  ) => {
    setActiveDropdown((current) =>
      current === name ? null : name,
    );
  };

  const desktopLinkClass = (
    href: string,
  ) => {
    const active = isActive(href);

    return [
      "group relative flex h-full items-center",
      "text-[13px] font-extrabold tracking-[-0.015em]",
      "transition-colors duration-300",
      active
        ? "text-[#b87586]"
        : "text-[#071b33]/85 hover:text-[#071b33]",
    ].join(" ");
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 top-0 z-[100] w-full px-3 pt-3 sm:px-4"
      >
        <nav
          className={[
            "mx-auto flex h-[70px] w-full max-w-[1360px]",
            "items-center rounded-[18px] border px-5",
            "bg-white/95 backdrop-blur-xl",
            "transition-all duration-300 sm:px-7",
            hasScrolled
              ? "border-[#ead5db] shadow-[0_16px_48px_rgba(7,27,51,0.14)]"
              : "border-white/70 shadow-[0_12px_36px_rgba(7,27,51,0.10)]",
          ].join(" ")}
        >
          {/* BRAND */}
          <Link
            href="/"
            aria-label="Salons Assured Kenya Limited home"
            className="group flex min-w-[230px] shrink-0 items-center gap-3.5"
          >
            <div className="relative h-[44px] w-[44px] shrink-0">
              <Image
                src="/salons-assured.png"
                alt="Salons Assured logo"
                fill
                priority
                sizes="44px"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>

            <div className="min-w-fit">
              <p className="font-serif text-[20px] font-black leading-none tracking-[-0.045em] text-[#071b33] sm:text-[21px]">
                Salons Assured
              </p>

              <p className="mt-1.5 text-[8px] font-extrabold uppercase tracking-[0.29em] text-[#b87586]">
                Kenya Limited
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden h-full flex-1 items-center justify-center gap-9 xl:flex 2xl:gap-11">
            <Link
              href="/about"
              className={desktopLinkClass(
                "/about",
              )}
              aria-current={
                isActive("/about")
                  ? "page"
                  : undefined
              }
            >
              About

              <span
                className={[
                  "absolute bottom-[12px] left-1/2 h-1.5 w-1.5",
                  "-translate-x-1/2 rounded-full bg-[#b87586]",
                  "transition-all duration-300",
                  isActive("/about")
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                ].join(" ")}
              />
            </Link>

            <DesktopDropdown
              name="services"
              label="Services"
              eyebrow="Our Expertise"
              links={serviceLinks}
              active={servicesActive}
              activeDropdown={
                activeDropdown
              }
              width="w-[380px]"
              onOpen={openDropdown}
              onClose={
                closeDropdownSlowly
              }
              onToggle={toggleDropdown}
              isActive={isActive}
            />

            <DesktopDropdown
              name="audiences"
              label="Who We Help"
              eyebrow="Choose Your Pathway"
              links={audienceLinks}
              active={groupActive(
                audienceLinks,
              )}
              activeDropdown={
                activeDropdown
              }
              width="w-[340px]"
              onOpen={openDropdown}
              onClose={
                closeDropdownSlowly
              }
              onToggle={toggleDropdown}
              isActive={isActive}
            />

            <DesktopDropdown
              name="insights"
              label="Insights"
              eyebrow="Learn and Explore"
              links={insightLinks}
              active={groupActive(
                insightLinks,
              )}
              activeDropdown={
                activeDropdown
              }
              width="w-[300px]"
              onOpen={openDropdown}
              onClose={
                closeDropdownSlowly
              }
              onToggle={toggleDropdown}
              isActive={isActive}
            />

            <Link
              href="/contact"
              className={desktopLinkClass(
                "/contact",
              )}
              aria-current={
                isActive("/contact")
                  ? "page"
                  : undefined
              }
            >
              Contact

              <span
                className={[
                  "absolute bottom-[12px] left-1/2 h-1.5 w-1.5",
                  "-translate-x-1/2 rounded-full bg-[#b87586]",
                  "transition-all duration-300",
                  isActive("/contact")
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                ].join(" ")}
              />
            </Link>
          </div>

          {/* DESKTOP CTA */}
          <div className="ml-auto hidden w-[190px] shrink-0 justify-end xl:flex">
            <Link
              href="/contact"
              className="group inline-flex h-10 items-center justify-center gap-2.5 rounded-full bg-[#071b33] px-5 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(7,27,51,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b87586] hover:shadow-[0_14px_32px_rgba(184,117,134,0.26)]"
            >
              Book Consultation

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setIsOpen(
                (current) => !current,
              );

              setActiveDropdown(null);
            }}
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#071b33] text-white transition-colors hover:bg-[#b87586] xl:hidden"
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
            "mx-auto mt-2 w-full max-w-[1360px]",
            "overflow-hidden rounded-[18px]",
            "border border-white/10 bg-[#071b33]",
            "shadow-[0_30px_80px_rgba(7,27,51,0.32)]",
            "transition-all duration-300 xl:hidden",
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0",
          ].join(" ")}
        >
          <div className="max-h-[calc(100vh-104px)] overflow-y-auto px-6 py-7 sm:px-8">
            <div className="flex items-center gap-3.5 border-b border-white/15 pb-5">
              <div className="relative h-[42px] w-[42px] shrink-0">
                <Image
                  src="/salons-assured.png"
                  alt="Salons Assured logo"
                  fill
                  sizes="42px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="font-serif text-[19px] font-black leading-none tracking-[-0.04em] text-white">
                  Salons Assured
                </p>

                <p className="mt-1.5 text-[7px] font-extrabold uppercase tracking-[0.3em] text-[#d9a3af]">
                  Kenya Limited
                </p>
              </div>
            </div>

            <p className="mt-7 text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Explore Salons Assured
            </p>

            <div className="mt-5 border-t border-white/15">
              {mobileLinks.map(
                (link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between border-b border-white/15 py-4"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-serif text-[14px] font-black text-[#d9a3af]">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span
                        className={[
                          "font-serif text-[25px] font-black tracking-[-0.04em]",
                          isActive(link.href)
                            ? "text-[#d9a3af]"
                            : "text-white",
                        ].join(" ")}
                      >
                        {link.label}
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-[#d9a3af] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ),
              )}
            </div>

            <Link
              href="/contact"
              className="group mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#d9a3af] px-6 text-[13px] font-extrabold text-[#071b33] transition-colors duration-300 hover:bg-white"
            >
              Book Consultation

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </header>

      {!isOverlayRoute && (
        <div
          className="h-[94px]"
          aria-hidden="true"
        />
      )}
    </>
  );
}