import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronUp,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const companyLinks = [
  {
    label: "About Salons Assured",
    href: "/about",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const serviceLinks = [
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
    label: "Business Setup",
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

const audienceLinks = [
  {
    label: "Business Owners",
    href: "/business-owners",
  },
  {
    label: "Investors",
    href: "/investors",
  },
  {
    label: "Beauty Professionals",
    href: "/job-seekers",
  },
];

const insightLinks = [
  {
    label: "Insights & Perspectives",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Events & Masterclasses",
    href: "/events",
    icon: CalendarDays,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/salonsassuredkenya/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-7.7H16l.4-3h-2.9V8.4c0-.9.3-1.5 1.6-1.5h1.5V4.2c-.7-.1-1.5-.2-2.3-.2-2.4 0-4.1 1.5-4.1 4.1v2.2H7.5v3h2.7V21h3.3Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/salonsassured/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M17.4 6.6h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@salonsassuredkenya",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.6 3c.4 2.4 1.8 3.9 4.1 4v3.2a7.2 7.2 0 0 1-4.1-1.3v6.2c0 3.1-2.1 5.9-5.8 5.9-3.2 0-5.5-2.2-5.5-5.1 0-3.5 2.8-5.5 6.2-5.2v3.3c-1.5-.3-2.8.4-2.8 1.8 0 1.1.9 1.9 2.1 1.9 1.4 0 2.3-.9 2.3-2.7V3h3.5Z" />
      </svg>
    ),
  },
];

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[13px] font-medium leading-6 text-white/75 transition-colors duration-300 hover:text-[#f2c8d2]"
    >
      <span>{label}</span>

      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-[#06172c] text-white"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 -top-80 h-[680px] w-[680px] rounded-full border border-white/[0.06]" />

        <div className="absolute -left-20 -top-24 h-[300px] w-[300px] rounded-full border border-[#d9a3af]/15" />

        <div className="absolute -bottom-80 -right-72 h-[700px] w-[700px] rounded-full border border-white/[0.05]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_10%,rgba(184,117,134,0.2),transparent_30%)]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9a3af]/60 to-transparent" />
      </div>

      <div className="relative">
        {/* FINAL BUSINESS STATEMENT */}
        <section className="border-b border-white/15">
          <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <Sparkles
                    className="h-4 w-4 text-[#f2c8d2]"
                    strokeWidth={1.8}
                  />

                  <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#f2c8d2]">
                    Salons Assured Kenya
                  </p>
                </div>

                <h2 className="mt-7 max-w-[1050px] [font-family:var(--font-display)] text-[50px] font-semibold leading-[0.89] tracking-[-0.06em] text-white sm:text-[72px] lg:text-[92px]">
                  Build the business
                  <span className="ml-3 font-medium italic text-[#d9a3af]">
                    behind the beauty.
                  </span>
                </h2>
              </div>

              <div className="border-l border-white/20 pl-6">
                <p className="text-[14px] leading-8 text-white/75">
                  Bring us the staffing, systems, leadership or growth
                  challenge. We will help you clarify what needs to change and
                  define the next practical steps.
                </p>

                <Link
                  href="/contact"
                  className="group mt-7 inline-flex h-[54px] items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Book a consultation

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN FOOTER */}
        <section>
          <div className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
            <div className="grid gap-14 lg:grid-cols-[1.25fr_0.7fr_1fr_0.78fr_0.95fr] lg:gap-10">
              {/* BRAND */}
              <div>
                <Link
                  href="/"
                  aria-label="Salons Assured Kenya Limited homepage"
                  className="inline-flex items-center gap-4"
                >
                  <div className="relative h-14 w-14 shrink-0">
                    <Image
                      src="/sak-footer-logo.png"
                      alt="Salons Assured Kenya Limited"
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <p className="[font-family:var(--font-display)] text-[30px] font-semibold leading-none tracking-[-0.04em] text-white">
                      Salons Assured
                    </p>

                    <p className="mt-2 text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                      Kenya Limited
                    </p>
                  </div>
                </Link>

                <p className="mt-7 max-w-[350px] text-[13px] leading-7 text-white/70">
                  Specialist consulting, recruitment, training, business
                  systems and growth support for salons, spas, barbershops,
                  beauty investors and professionals.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Salons Assured on ${social.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* COMPANY */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                  Company
                </p>

                <div className="mt-6 grid gap-3">
                  {companyLinks.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>

              {/* SERVICES */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                  Services
                </p>

                <div className="mt-6 grid gap-3">
                  {serviceLinks.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>

              {/* WHO WE HELP */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                  Who We Help
                </p>

                <div className="mt-6 grid gap-3">
                  {audienceLinks.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>

                <div className="mt-9 border-t border-white/15 pt-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                    Explore
                  </p>

                  <div className="mt-5 grid gap-4">
                    {insightLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-center gap-3 text-[12px] font-medium text-white/75 transition-colors duration-300 hover:text-white"
                        >
                          <Icon
                            className="h-4 w-4 text-[#f2c8d2]"
                            strokeWidth={1.8}
                          />

                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#f2c8d2]">
                  Contact
                </p>

                <div className="mt-6 divide-y divide-white/15 border-y border-white/15">
                  <a
                    href="tel:+254715500268"
                    className="group flex gap-4 py-5"
                  >
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#f2c8d2]"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">
                        Call
                      </p>

                      <p className="mt-2 text-[12px] font-medium leading-6 text-white/80 transition-colors group-hover:text-white">
                        0715 500 268
                        <br />
                        0706 551 028
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@salonsassured.com"
                    className="group flex gap-4 py-5"
                  >
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#f2c8d2]"
                      strokeWidth={1.8}
                    />

                    <div className="min-w-0">
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">
                        Email
                      </p>

                      <p className="mt-2 break-all text-[12px] font-medium leading-6 text-white/80 transition-colors group-hover:text-white">
                        info@salonsassured.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/254715500268"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 py-5"
                  >
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#f2c8d2]"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">
                        WhatsApp
                      </p>

                      <p className="mt-2 text-[12px] font-medium leading-6 text-white/80 transition-colors group-hover:text-white">
                        Start a conversation
                      </p>
                    </div>
                  </a>

                  <div className="flex gap-4 py-5">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#f2c8d2]"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/55">
                        Location
                      </p>

                      <p className="mt-2 text-[12px] font-medium leading-6 text-white/80">
                        Kwaheri Road
                        <br />
                        Runda, Nairobi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LARGE BRAND WORDMARK */}
        <section className="overflow-hidden border-t border-white/15">
          <div className="mx-auto max-w-[1380px] px-5 pt-10 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-5">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.27em] text-white/60">
                Beauty business consulting
              </p>

              <a
                href="#top"
                aria-label="Back to the top of the page"
                className="group flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-[#f2c8d2]"
              >
                Back to top

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-[#d9a3af] group-hover:bg-[#d9a3af] group-hover:text-[#071b33]">
                  <ChevronUp className="h-4 w-4" />
                </span>
              </a>
            </div>

            <p
              aria-hidden="true"
              className="-mb-[0.08em] mt-8 whitespace-nowrap text-center [font-family:var(--font-display)] text-[17vw] font-semibold leading-[0.67] tracking-[-0.075em] text-white/[0.1]"
            >
              SALONS ASSURED
            </p>
          </div>
        </section>

        {/* LEGAL BAR */}
        <section className="relative z-10 border-t border-white/15 bg-[#041122]">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 px-5 py-6 text-[10px] text-white/65 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <p>
              © {year} Salons Assured Kenya Limited. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-use"
                className="transition-colors hover:text-white"
              >
                Terms of Use
              </Link>

              <span className="hidden h-1 w-1 rounded-full bg-[#d9a3af] sm:block" />

              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}