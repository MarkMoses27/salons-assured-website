"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type MenuKey =
  | "services"
  | "audiences"
  | "insights";

type DropdownLink = {
  number: string;
  label: string;
  href: string;
  note?: string;
};

const serviceLinks: DropdownLink[] = [
  {
    number: "01",
    label: "Recruitment & Staffing",
    href: "/recruitment",
    note: "Find and place the right beauty professionals.",
  },
  {
    number: "02",
    label: "Training & Development",
    href: "/services#training-development",
    note: "Improve team capability and service performance.",
  },
  {
    number: "03",
    label: "Business Systems",
    href: "/services#business-systems",
    note: "Build structure, accountability and consistency.",
  },
  {
    number: "04",
    label: "Business Setup & Launch",
    href: "/services#business-setup",
    note: "Move from concept to an operational business.",
  },
  {
    number: "05",
    label: "Digital Growth",
    href: "/services#digital-growth",
    note: "Strengthen visibility and customer acquisition.",
  },
  {
    number: "06",
    label: "Management Consultancy",
    href: "/services#management-consultancy",
    note: "Improve leadership, profitability and growth.",
  },
];

const audienceLinks: DropdownLink[] = [
  {
    number: "01",
    label: "Business Owners",
    href: "/business-owners",
  },
  {
    number: "02",
    label: "Investors",
    href: "/investors",
  },
  {
    number: "03",
    label: "Beauty Professionals",
    href: "/job-seekers",
  },
];

const insightLinks: DropdownLink[] = [
  {
    number: "01",
    label: "Blog & Insights",
    href: "/blog",
  },
  {
    number: "02",
    label: "Events",
    href: "/events",
  },
];

const mobileLinks = [
  {
    number: "01",
    label: "Home",
    href: "/",
  },
  {
    number: "02",
    label: "About",
    href: "/about",
  },
  {
    number: "03",
    label: "Services",
    href: "/services",
  },
  {
    number: "04",
    label: "Business Owners",
    href: "/business-owners",
  },
  {
    number: "05",
    label: "Investors",
    href: "/investors",
  },
  {
    number: "06",
    label: "Job Seekers",
    href: "/job-seekers",
  },
  {
    number: "07",
    label: "Blog & Insights",
    href: "/blog",
  },
  {
    number: "08",
    label: "Events",
    href: "/events",
  },
  {
    number: "09",
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

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

function RollingLabel({
  label,
}: {
  label: string;
}) {
  return (
    <span className="relative block h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-5">
        <span className="flex h-5 items-center whitespace-nowrap">
          {label}
        </span>

        <span className="flex h-5 items-center whitespace-nowrap text-[#d9a3af]">
          {label}
        </span>
      </span>
    </span>
  );
}

function NavigationHighlight({
  dark,
}: {
  dark: boolean;
}) {
  return (
    <motion.span
      layoutId="sak-navigation-highlight"
      className={[
        "absolute inset-x-1 top-1/2 h-9",
        "-translate-y-1/2 rounded-full",
        dark
          ? "bg-white/[0.10]"
          : "bg-[#071b33]/[0.055]",
      ].join(" ")}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 34,
        mass: 0.7,
      }}
    />
  );
}

type DropdownPanelProps = {
  title: string;
  links: DropdownLink[];
  isOpen: boolean;
  widthClass: string;
  columns?: 1 | 2;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  routeIsActive: (
    href: string,
  ) => boolean;
};

function DropdownPanel({
  title,
  links,
  isOpen,
  widthClass,
  columns = 1,
  onMouseEnter,
  onMouseLeave,
  routeIsActive,
}: DropdownPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.985,
          }}
          transition={{
            duration: 0.25,
            ease: premiumEase,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={[
            "absolute left-1/2 top-full z-50",
            "-translate-x-1/2 pt-3",
            widthClass,
          ].join(" ")}
        >
          <div className="overflow-hidden rounded-[20px] border border-[#eadde1] bg-[#fffdfd] p-2 shadow-[0_28px_75px_rgba(7,27,51,0.18)]">
            <div className="flex items-center justify-between px-5 pb-4 pt-4">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#b87586]">
                {title}
              </p>

              {columns === 2 && (
                <Link
                  href="/services"
                  className="group flex items-center gap-2 text-[10px] font-bold text-[#071b33]/55 transition-colors hover:text-[#b87586]"
                >
                  View all

                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>

            <div
              className={[
                "border-t border-[#eadde1]",
                columns === 2
                  ? "grid grid-cols-2"
                  : "grid grid-cols-1",
              ].join(" ")}
            >
              {links.map(
                (link, index) => {
                  const isLast =
                    index ===
                    links.length - 1;

                  const isSecondLast =
                    index ===
                    links.length - 2;

                  const hasBottomBorder =
                    columns === 2
                      ? !isLast &&
                        !isSecondLast
                      : !isLast;

                  const hasRightBorder =
                    columns === 2 &&
                    index % 2 === 0;

                  const active =
                    routeIsActive(
                      link.href,
                    );

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={[
                        "group flex items-start justify-between gap-4",
                        "px-5 py-5",
                        "transition-colors duration-300",
                        "hover:bg-[#fbf4f6]",
                        hasBottomBorder
                          ? "border-b border-[#eadde1]"
                          : "",
                        hasRightBorder
                          ? "border-r border-[#eadde1]"
                          : "",
                        active
                          ? "bg-[#fbf4f6]"
                          : "",
                      ].join(" ")}
                    >
                      <div className="flex min-w-0 gap-4">
                        <span className="[font-family:var(--font-display)] text-[16px] font-semibold italic text-[#b87586]">
                          {link.number}
                        </span>

                        <div className="min-w-0">
                          <p
                            className={[
                              "text-[14px] font-bold",
                              "tracking-[-0.02em]",
                              "transition-colors duration-300",
                              active
                                ? "text-[#b87586]"
                                : "text-[#071b33] group-hover:text-[#b87586]",
                            ].join(" ")}
                          >
                            {link.label}
                          </p>

                          {link.note && (
                            <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-[#071b33]/48">
                              {link.note}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#071b33]/10 text-[#071b33] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white">
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          strokeWidth={1.9}
                        />
                      </span>
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const pathname =
    usePathname();

  const headerRef =
    useRef<HTMLElement | null>(
      null,
    );

  const closeTimerRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const [
    hasScrolled,
    setHasScrolled,
  ] = useState(false);

  const [
    activeDropdown,
    setActiveDropdown,
  ] = useState<MenuKey | null>(
    null,
  );

  const [
    hoveredTopItem,
    setHoveredTopItem,
  ] = useState<string | null>(
    null,
  );

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const isOverlayRoute =
    overlayRoutes.some(
      (route) => {
        if (route === "/") {
          return pathname === "/";
        }

        return (
          pathname === route ||
          pathname.startsWith(
            `${route}/`,
          )
        );
      },
    );

  const darkAtTop =
    isOverlayRoute &&
    !hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(
        window.scrollY > 36,
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
    setActiveDropdown(null);
    setHoveredTopItem(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setActiveDropdown(null);
        setHoveredTopItem(null);
        setMobileOpen(false);
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
        setHoveredTopItem(null);
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

    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (
        closeTimerRef.current
      ) {
        clearTimeout(
          closeTimerRef.current,
        );
      }
    };
  }, []);

  const routeIsActive = (
    href: string,
  ) => {
    if (
      href.includes("#")
    ) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`,
      )
    );
  };

  const servicesActive =
    pathname === "/services" ||
    pathname.startsWith(
      "/services/",
    ) ||
    pathname === "/recruitment" ||
    pathname.startsWith(
      "/recruitment/",
    );

  const audiencesActive =
    audienceLinks.some(
      (link) =>
        routeIsActive(
          link.href,
        ),
    );

  const insightsActive =
    insightLinks.some(
      (link) =>
        routeIsActive(
          link.href,
        ),
    );

  const showHighlight = (
    id: string,
    active: boolean,
  ) => {
    if (
      hoveredTopItem !== null
    ) {
      return (
        hoveredTopItem === id
      );
    }

    return active;
  };

  const clearCloseTimer =
    () => {
      if (
        closeTimerRef.current
      ) {
        clearTimeout(
          closeTimerRef.current,
        );
      }
    };

  const openDropdown = (
    key: MenuKey,
  ) => {
    clearCloseTimer();

    setActiveDropdown(key);
    setHoveredTopItem(key);
  };

  const scheduleDropdownClose =
    () => {
      clearCloseTimer();

      closeTimerRef.current =
        setTimeout(() => {
          setActiveDropdown(null);
          setHoveredTopItem(null);
        }, 170);
    };

  const toggleDropdown = (
    key: MenuKey,
  ) => {
    clearCloseTimer();

    if (
      activeDropdown === key
    ) {
      setActiveDropdown(null);
      setHoveredTopItem(null);
      return;
    }

    openDropdown(key);
  };

  const handleDirectHover = (
    id: string,
  ) => {
    clearCloseTimer();

    setActiveDropdown(null);
    setHoveredTopItem(id);
  };

  const textColour =
    darkAtTop
      ? "text-white"
      : "text-[#071b33]";

  const mutedTextColour =
    darkAtTop
      ? "text-white/72"
      : "text-[#071b33]/68";

  const navigationItemClass =
    [
      "group relative flex h-full",
      "items-center px-[14px]",
      "font-semibold",
      "tracking-[-0.012em]",
      "transition-colors duration-300",
      hasScrolled
        ? "text-[13px]"
        : "text-[14px]",
    ].join(" ");

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{
          opacity: 0,
          y: -22,
        }}
        animate={{
          opacity: 1,
          y: 0,
          top: hasScrolled
            ? 10
            : 12,
        }}
        transition={{
          duration: 0.55,
          ease: premiumEase,
        }}
        className="fixed left-0 z-[100] w-full px-3 sm:px-5"
      >
        <motion.nav
          layout
          animate={{
            height: hasScrolled
              ? 62
              : 72,

            maxWidth: hasScrolled
              ? 1240
              : 1400,

            borderRadius:
              hasScrolled
                ? 21
                : 18,

            backgroundColor:
              darkAtTop
                ? "rgba(7,27,51,0.90)"
                : "rgba(255,253,253,0.96)",

            borderColor:
              darkAtTop
                ? "rgba(255,255,255,0.14)"
                : "rgba(234,221,225,0.95)",

            boxShadow:
              darkAtTop
                ? "0 16px 45px rgba(0,0,0,0.18)"
                : "0 16px 45px rgba(7,27,51,0.13)",
          }}
          transition={{
            duration: 0.4,
            ease: premiumEase,
          }}
          style={{
            borderWidth: 1,
            borderStyle:
              "solid",
          }}
          className="relative mx-auto flex w-full items-center px-4 backdrop-blur-2xl sm:px-6"
        >
          {/* BRAND */}
          <Link
            href="/"
            aria-label="Salons Assured Kenya Limited home"
            className="group relative z-20 flex min-w-[238px] items-center gap-3"
          >
            <motion.div
              animate={{
                width: hasScrolled
                  ? 36
                  : 43,

                height: hasScrolled
                  ? 36
                  : 43,
              }}
              transition={{
                duration: 0.4,
                ease: premiumEase,
              }}
              className="relative shrink-0"
            >
              <Image
                src="/salons-assured.png"
                alt="Salons Assured logo"
                fill
                priority
                sizes="43px"
                className="object-contain transition-transform duration-500 group-hover:rotate-[4deg] group-hover:scale-105"
              />
            </motion.div>

            <div>
              <motion.p
                animate={{
                  fontSize:
                    hasScrolled
                      ? 21
                      : 25,
                }}
                transition={{
                  duration: 0.4,
                  ease: premiumEase,
                }}
                className={[
                  "[font-family:var(--font-display)]",
                  "font-semibold leading-[0.82]",
                  "tracking-[-0.045em]",
                  "transition-colors duration-300",
                  textColour,
                ].join(" ")}
              >
                Salons Assured
              </motion.p>

              <motion.p
                animate={{
                  marginTop:
                    hasScrolled
                      ? 4
                      : 6,

                  fontSize:
                    hasScrolled
                      ? 6
                      : 7,
                }}
                className={[
                  "font-bold uppercase",
                  "tracking-[0.32em]",
                  "transition-colors duration-300",
                  darkAtTop
                    ? "text-[#e8bac5]"
                    : "text-[#b87586]",
                ].join(" ")}
              >
                Kenya Limited
              </motion.p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <LayoutGroup id="sak-navigation">
            <div className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-1 xl:flex">
              {/* HOME */}
              <Link
                href="/"
                onMouseEnter={() =>
                  handleDirectHover(
                    "home",
                  )
                }
                onMouseLeave={() =>
                  setHoveredTopItem(
                    null,
                  )
                }
                className={[
                  navigationItemClass,
                  routeIsActive("/")
                    ? textColour
                    : mutedTextColour,
                ].join(" ")}
              >
                {showHighlight(
                  "home",
                  routeIsActive("/"),
                ) && (
                  <NavigationHighlight
                    dark={darkAtTop}
                  />
                )}

                <span className="relative z-10">
                  <RollingLabel label="Home" />
                </span>
              </Link>

              {/* ABOUT */}
              <Link
                href="/about"
                onMouseEnter={() =>
                  handleDirectHover(
                    "about",
                  )
                }
                onMouseLeave={() =>
                  setHoveredTopItem(
                    null,
                  )
                }
                className={[
                  navigationItemClass,
                  routeIsActive(
                    "/about",
                  )
                    ? textColour
                    : mutedTextColour,
                ].join(" ")}
              >
                {showHighlight(
                  "about",
                  routeIsActive(
                    "/about",
                  ),
                ) && (
                  <NavigationHighlight
                    dark={darkAtTop}
                  />
                )}

                <span className="relative z-10">
                  <RollingLabel label="About" />
                </span>
              </Link>

              {/* SERVICES */}
              <div
                className="relative flex h-full items-center"
                onMouseEnter={() =>
                  openDropdown(
                    "services",
                  )
                }
                onMouseLeave={
                  scheduleDropdownClose
                }
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={
                    activeDropdown ===
                    "services"
                  }
                  onClick={() =>
                    toggleDropdown(
                      "services",
                    )
                  }
                  className={[
                    navigationItemClass,
                    "gap-1.5",
                    servicesActive
                      ? textColour
                      : mutedTextColour,
                  ].join(" ")}
                >
                  {showHighlight(
                    "services",
                    servicesActive,
                  ) && (
                    <NavigationHighlight
                      dark={darkAtTop}
                    />
                  )}

                  <span className="relative z-10">
                    <RollingLabel label="Services" />
                  </span>

                  <ChevronDown
                    className={[
                      "relative z-10 h-3.5 w-3.5",
                      "transition-transform duration-300",
                      activeDropdown ===
                      "services"
                        ? "rotate-180"
                        : "",
                    ].join(" ")}
                    strokeWidth={2}
                  />
                </button>

                <DropdownPanel
                  title="Our Services"
                  links={serviceLinks}
                  isOpen={
                    activeDropdown ===
                    "services"
                  }
                  widthClass="w-[680px]"
                  columns={2}
                  onMouseEnter={
                    clearCloseTimer
                  }
                  onMouseLeave={
                    scheduleDropdownClose
                  }
                  routeIsActive={
                    routeIsActive
                  }
                />
              </div>

              {/* WHO WE HELP */}
              <div
                className="relative flex h-full items-center"
                onMouseEnter={() =>
                  openDropdown(
                    "audiences",
                  )
                }
                onMouseLeave={
                  scheduleDropdownClose
                }
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={
                    activeDropdown ===
                    "audiences"
                  }
                  onClick={() =>
                    toggleDropdown(
                      "audiences",
                    )
                  }
                  className={[
                    navigationItemClass,
                    "gap-1.5",
                    audiencesActive
                      ? textColour
                      : mutedTextColour,
                  ].join(" ")}
                >
                  {showHighlight(
                    "audiences",
                    audiencesActive,
                  ) && (
                    <NavigationHighlight
                      dark={darkAtTop}
                    />
                  )}

                  <span className="relative z-10">
                    <RollingLabel label="Who We Help" />
                  </span>

                  <ChevronDown
                    className={[
                      "relative z-10 h-3.5 w-3.5",
                      "transition-transform duration-300",
                      activeDropdown ===
                      "audiences"
                        ? "rotate-180"
                        : "",
                    ].join(" ")}
                    strokeWidth={2}
                  />
                </button>

                <DropdownPanel
                  title="Who We Help"
                  links={
                    audienceLinks
                  }
                  isOpen={
                    activeDropdown ===
                    "audiences"
                  }
                  widthClass="w-[350px]"
                  onMouseEnter={
                    clearCloseTimer
                  }
                  onMouseLeave={
                    scheduleDropdownClose
                  }
                  routeIsActive={
                    routeIsActive
                  }
                />
              </div>

              {/* INSIGHTS */}
              <div
                className="relative flex h-full items-center"
                onMouseEnter={() =>
                  openDropdown(
                    "insights",
                  )
                }
                onMouseLeave={
                  scheduleDropdownClose
                }
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={
                    activeDropdown ===
                    "insights"
                  }
                  onClick={() =>
                    toggleDropdown(
                      "insights",
                    )
                  }
                  className={[
                    navigationItemClass,
                    "gap-1.5",
                    insightsActive
                      ? textColour
                      : mutedTextColour,
                  ].join(" ")}
                >
                  {showHighlight(
                    "insights",
                    insightsActive,
                  ) && (
                    <NavigationHighlight
                      dark={darkAtTop}
                    />
                  )}

                  <span className="relative z-10">
                    <RollingLabel label="Insights" />
                  </span>

                  <ChevronDown
                    className={[
                      "relative z-10 h-3.5 w-3.5",
                      "transition-transform duration-300",
                      activeDropdown ===
                      "insights"
                        ? "rotate-180"
                        : "",
                    ].join(" ")}
                    strokeWidth={2}
                  />
                </button>

                <DropdownPanel
                  title="Explore Insights"
                  links={
                    insightLinks
                  }
                  isOpen={
                    activeDropdown ===
                    "insights"
                  }
                  widthClass="w-[310px]"
                  onMouseEnter={
                    clearCloseTimer
                  }
                  onMouseLeave={
                    scheduleDropdownClose
                  }
                  routeIsActive={
                    routeIsActive
                  }
                />
              </div>

              {/* CONTACT */}
              <Link
                href="/contact"
                onMouseEnter={() =>
                  handleDirectHover(
                    "contact",
                  )
                }
                onMouseLeave={() =>
                  setHoveredTopItem(
                    null,
                  )
                }
                className={[
                  navigationItemClass,
                  routeIsActive(
                    "/contact",
                  )
                    ? textColour
                    : mutedTextColour,
                ].join(" ")}
              >
                {showHighlight(
                  "contact",
                  routeIsActive(
                    "/contact",
                  ),
                ) && (
                  <NavigationHighlight
                    dark={darkAtTop}
                  />
                )}

                <span className="relative z-10">
                  <RollingLabel label="Contact" />
                </span>
              </Link>
            </div>
          </LayoutGroup>

          {/* DESKTOP CTA */}
          <div className="ml-auto hidden items-center xl:flex">
            <motion.div
              animate={{
                scale:
                  hasScrolled
                    ? 0.96
                    : 1,
              }}
              transition={{
                duration: 0.35,
                ease: premiumEase,
              }}
            >
              <Link
                href="/contact"
                className={[
                  "group relative inline-flex",
                  "items-center overflow-hidden",
                  "rounded-full pl-5 pr-1.5",
                  "text-[11px] font-bold",
                  "tracking-[-0.01em]",
                  "transition-all duration-500",
                  hasScrolled
                    ? "h-[42px]"
                    : "h-[46px]",
                  darkAtTop
                    ? "border border-white/20 bg-white/[0.08] text-white hover:bg-white hover:text-[#071b33]"
                    : "bg-[#071b33] text-white shadow-[0_10px_26px_rgba(7,27,51,0.17)] hover:bg-[#b87586]",
                ].join(" ")}
              >
                <span className="whitespace-nowrap">
                  Book Consultation
                </span>

                <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#d9a3af] text-[#071b33] transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white">
                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              mobileOpen
            }
            onClick={() => {
              setMobileOpen(
                (current) =>
                  !current,
              );

              setActiveDropdown(
                null,
              );

              setHoveredTopItem(
                null,
              );
            }}
            className={[
              "ml-auto flex h-10 w-10",
              "items-center justify-center",
              "rounded-full border",
              "transition-all duration-300",
              "xl:hidden",
              darkAtTop
                ? "border-white/20 bg-white/[0.08] text-white"
                : "border-[#071b33]/10 bg-[#071b33] text-white",
            ].join(" ")}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                  }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                  }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath:
                "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              clipPath:
                "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              clipPath:
                "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.5,
              ease: premiumEase,
            }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#071b33] px-5 pb-10 pt-[104px] text-white xl:hidden"
          >
            <div className="pointer-events-none absolute -right-44 top-20 h-[420px] w-[420px] rounded-full border border-white/[0.07]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.31em] text-[#d9a3af]">
                  Explore
                </p>

                <p className="text-[9px] tracking-[0.15em] text-white/35">
                  SAK / MENU
                </p>
              </div>

              <div className="border-b border-white/15">
                {mobileLinks.map(
                  (
                    link,
                    index,
                  ) => (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.42,
                        delay:
                          0.16 +
                          index *
                            0.04,
                        ease: premiumEase,
                      }}
                    >
                      <Link
                        href={link.href}
                        className={[
                          "group grid grid-cols-[42px_1fr_auto]",
                          "items-center gap-3 border-b border-white/15",
                          "py-4 last:border-b-0",
                          routeIsActive(
                            link.href,
                          )
                            ? "text-[#d9a3af]"
                            : "text-white",
                        ].join(" ")}
                      >
                        <span className="[font-family:var(--font-display)] text-[14px] italic text-[#d9a3af]">
                          {link.number}
                        </span>

                        <span className="[font-family:var(--font-display)] text-[33px] font-semibold leading-none tracking-[-0.045em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#d9a3af]">
                          {link.label}
                        </span>

                        <ArrowRight className="h-4 w-4 text-white/30 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>

              <Link
                href="/contact"
                className="group mt-8 flex h-14 w-full items-center justify-between rounded-full bg-[#d9a3af] pl-7 pr-2 text-[12px] font-bold text-[#071b33]"
              >
                Book Consultation

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071b33] text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <div className="mt-7 flex flex-wrap justify-between gap-4 text-[10px] text-white/45">
                <a href="tel:+254715500268">
                  0715 500 268
                </a>

                <a href="mailto:info@salonsassured.com">
                  info@salonsassured.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOverlayRoute && (
        <div
          className="h-[88px]"
          aria-hidden="true"
        />
      )}
    </>
  );
}