import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Recruitment & Staffing", href: "/services#recruitment-staffing" },
  { label: "Training & Staff Development", href: "/services#training-development" },
  { label: "Business Systems & Documentation", href: "/services#business-systems" },
  { label: "Beauty Business Setup & Launch", href: "/services#business-setup" },
  { label: "Digital Growth & Visibility", href: "/services#digital-growth" },
  { label: "Management Consultancy & Growth", href: "/services#management-consultancy" },
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
    href: "https://www.facebook.com/salonsassuredkenya/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21v-7.7H16l.4-3h-2.9V8.4c0-.9.3-1.5 1.6-1.5h1.5V4.2c-.7-.1-1.5-.2-2.3-.2-2.4 0-4.1 1.5-4.1 4.1v2.2H7.5v3h2.7V21h3.3Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/salonsassured/",
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
    href: "https://www.tiktok.com/@salonsassuredkenya",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16.6 3c.4 2.4 1.8 3.9 4.1 4v3.2a7.2 7.2 0 0 1-4.1-1.3v6.2c0 3.1-2.1 5.9-5.8 5.9-3.2 0-5.5-2.2-5.5-5.1 0-3.5 2.8-5.5 6.2-5.2v3.3c-1.5-.3-2.8.4-2.8 1.8 0 1.1.9 1.9 2.1 1.9 1.4 0 2.3-.9 2.3-2.7V3h3.5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/search/results/all/?keywords=Salons%20Assured",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.8 21H3.4V9h3.4v12ZM5.1 7.4A2 2 0 1 1 5.1 3a2 2 0 0 1 0 4.4ZM21 21h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-3.4V9h3.2v1.6h.1c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4.4 2.2 4.4 5.1V21Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/search?q=Salons%20Assured&src=typed_query",
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
      {/* Premium background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.20),transparent_28%),radial-gradient(circle_at_92%_90%,rgba(217,163,175,0.13),transparent_32%)]" />
      <div className="absolute -left-28 -top-28 h-[360px] w-[360px] rounded-full bg-[#d9a3af]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-28 h-[420px] w-[420px] rounded-full bg-[#b87586]/12 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
        {/* Top footer */}
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-4"
              aria-label="Salons Assured Kenya Ltd Home"
            >
              <div className="relative h-16 w-16 shrink-0">
                <Image
                  src="/sak-footer-logo.png"
                  alt="Salons Assured Kenya Ltd"
                  fill
                  sizes="64px"
                  className="object-contain"
                  priority
                />
              </div>

              <div>
                <p className="font-serif text-[34px] font-black leading-none tracking-[-0.04em] text-white">
                  Salons Assured
                </p>
                <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#d9a3af]">
                  Kenya Ltd
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-md text-[15px] leading-8 text-white/68">
              Professional beauty business consulting, recruitment, staffing,
              training, systems and growth support for salons, spas,
              barbershops, beauty investors and professionals.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/5 text-white/70 transition duration-300 hover:-translate-y-1 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-[28px] font-black tracking-[-0.035em] text-white">
              Company
            </h3>

            <div className="mt-7 grid gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium text-white/62 transition hover:text-[#d9a3af]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-[28px] font-black tracking-[-0.035em] text-white">
              Services
            </h3>

            <div className="mt-7 grid gap-4">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-start gap-2 text-[15px] font-medium leading-6 text-white/62 transition hover:text-[#d9a3af]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="mt-1 h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact / Newsletter style */}
          <div>
            <h3 className="font-serif text-[28px] font-black tracking-[-0.035em] text-white">
              Work With Us
            </h3>

            <p className="mt-7 text-[15px] leading-8 text-white/64">
              Need staffing, training, systems or beauty business growth
              support? Reach out and our team will guide you.
            </p>

            <div className="mt-7 grid gap-4 text-[14px] text-white/70">
              <a
                href="tel:+254715500268"
                className="flex items-start gap-3 transition hover:text-[#d9a3af]"
              >
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>0715500268 / 0706551028</span>
              </a>

              <a
                href="mailto:info@salonsassured.co.ke"
                className="flex items-start gap-3 transition hover:text-[#d9a3af]"
              >
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>info@salonsassured.co.ke</span>
              </a>

              <a
                href="https://wa.me/254715500268"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-[#d9a3af]"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>WhatsApp: 0715500268</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d9a3af]" />
                <span>Kwaheri Road, Runda, Nairobi, Kenya</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-[#d9a3af]/70 px-6 py-3 text-sm font-extrabold text-white transition duration-300 hover:bg-[#d9a3af] hover:text-[#071b33]"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Audience links row */}
        <div className="mt-16 border-y border-white/10 py-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              For You
            </p>

            {audienceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/56 transition hover:text-[#d9a3af]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} Salons Assured Kenya Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy-policy" className="transition hover:text-[#d9a3af]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-[#d9a3af]">
              Terms of Use
            </Link>

            <Link href="/contact" className="transition hover:text-[#d9a3af]">
              Contact
            </Link>

            <a
              href="#top"
              className="ml-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33] md:ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}