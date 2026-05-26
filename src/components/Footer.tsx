import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Training", href: "/training" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Recruitment & Staffing", href: "/recruitment" },
  { label: "Training & Staff Development", href: "/training" },
  { label: "Business Systems & Documentation", href: "/business-systems" },
  { label: "Beauty Business Setup & Launch", href: "/services" },
  { label: "Digital Growth & Visibility", href: "/services" },
  { label: "Management Consultancy & Growth", href: "/services" },
];

const audienceLinks = [
  { label: "For Business Owners", href: "/business-owners" },
  { label: "For Investors", href: "/investors" },
  { label: "For Job Seekers", href: "/job-seekers" },
  { label: "Industry Tips", href: "/blog" },
  { label: "Events", href: "/events" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21v-7.7H16l.4-3h-2.9V8.4c0-.9.3-1.5 1.6-1.5h1.5V4.2c-.7-.1-1.5-.2-2.3-.2-2.4 0-4.1 1.5-4.1 4.1v2.2H7.5v3h2.7V21h3.3Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
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
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16.6 3c.4 2.4 1.8 3.9 4.1 4v3.2a7.2 7.2 0 0 1-4.1-1.3v6.2c0 3.1-2.1 5.9-5.8 5.9-3.2 0-5.5-2.2-5.5-5.1 0-3.5 2.8-5.5 6.2-5.2v3.3c-1.5-.3-2.8.4-2.8 1.8 0 1.1.9 1.9 2.1 1.9 1.4 0 2.3-.9 2.3-2.7V3h3.5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.8 21H3.4V9h3.4v12ZM5.1 7.4A2 2 0 1 1 5.1 3a2 2 0 0 1 0 4.4ZM21 21h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-3.4V9h3.2v1.6h.1c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4.4 2.2 4.4 5.1V21Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14.2 10.6 21.5 2h-1.7l-6.4 7.4L8.4 2H2.5l7.7 11.2L2.5 22h1.7l6.8-7.9 5.4 7.9h5.9l-8.1-11.4Zm-2.4 2.8-.8-1.1L4.8 3.3h2.8l5 7.2.8 1.1 6.5 9.3h-2.8l-5.3-7.5Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#071b33] text-white">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(184,117,134,0.22),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(217,163,175,0.14),transparent_30%)]" />
      <div className="absolute left-[-10%] top-[-20%] h-[360px] w-[360px] rounded-full bg-[#b87586]/10 blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-12%] h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.8fr]">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-4"
              aria-label="Salons Assured Kenya Ltd Home"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[#d9a3af]/40 bg-white p-2 shadow-[0_18px_45px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
                <Image
                  src="/salons-assured-logo.png"
                  alt="Salons Assured Kenya Ltd"
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  Salons Assured
                </p>
                <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.34em] text-[#d9a3af]">
                  Kenya Ltd
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-[15px] leading-8 text-white/72">
              Beauty industry recruitment, salon staffing, spa staffing,
              barbershop recruitment, training, consulting, business systems,
              and growth support for beauty businesses, investors, and
              professionals locally and internationally.
            </p>

            {/* Contact details */}
            <div className="mt-7 grid gap-4 text-sm text-white/78">
              <a
                href="tel:+254715500268"
                className="flex items-start gap-3 transition hover:text-white"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>0715500268 / 0706551028</span>
              </a>

              <a
                href="mailto:info@salonsassured.co.ke"
                className="flex items-start gap-3 transition hover:text-white"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>info@salonsassured.co.ke</span>
              </a>

              <a
                href="https://wa.me/254715500268"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>WhatsApp: 0715500268</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>
                  Kwaheri Road, Runda. Serving beauty businesses locally and
                  internationally.
                </span>
              </div>
            </div>

            {/* Social media */}
            <div className="mt-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
                Connect With Us
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9a3af]/30 bg-white/5 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
                Company
              </h3>

              <div className="mt-5 grid gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/72 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
                Services
              </h3>

              <div className="mt-5 grid gap-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
                For You
              </h3>

              <div className="mt-5 grid gap-3">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/72 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© {year} Salons Assured Kenya Ltd. All rights reserved.</p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link href="/terms" className="transition hover:text-white">
                Terms of Use
              </Link>

              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}