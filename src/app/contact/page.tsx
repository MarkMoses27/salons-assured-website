import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Clock,
  Headphones,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Salons Assured Kenya Ltd | Beauty Business Support",
  description:
    "Contact Salons Assured Kenya Ltd for salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, and beauty business growth support.",
};

const contactHighlights = [
  {
    title: "Book a Consultation",
    text: "Let’s talk about your beauty business needs.",
    icon: Headphones,
  },
  {
    title: "Request Staff",
    text: "Get the right talent for your business.",
    icon: UsersRound,
  },
  {
    title: "Business Support",
    text: "We’re here to support your growth.",
    icon: BriefcaseBusiness,
  },
];

const contactDetails = [
  {
    title: "Call Us",
    main: "0715500268 / 0706551028",
    sub: "Monday - Saturday: 8:00 AM - 6:00 PM",
    href: "tel:+254715500268",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    main: "0715500268",
    sub: "Chat with us on WhatsApp",
    href: "https://wa.me/254715500268",
    icon: MessageCircle,
  },
  {
    title: "Email Us",
    main: "info@salonsassured.co.ke",
    sub: "We reply as soon as possible",
    href: "mailto:info@salonsassured.co.ke",
    icon: Mail,
  },
  {
    title: "Our Location",
    main: "Kwaheri Road, Runda",
    sub: "Nairobi, Kenya",
    href: "https://www.google.com/maps/search/?api=1&query=Kwaheri%20Road%20Runda%20Nairobi%20Kenya",
    icon: MapPin,
  },
  {
    title: "Business Hours",
    main: "Monday - Saturday: 8:00 AM - 6:00 PM",
    sub: "Sunday: By appointment",
    href: "#",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#071b33] text-white">
        {/* Hero image */}
        <div className="absolute inset-y-0 right-0 -z-20 hidden w-[65%] lg:block">
          <Image
            src="/contact-hero.png"
            alt="Premium salon reception and beauty business consultation space"
            fill
            sizes="65vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Mobile hero image */}
        <div className="absolute inset-0 -z-20 lg:hidden">
          <Image
            src="/contact-hero.png"
            alt="Premium salon reception and beauty business consultation space"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Dark overlay / fade */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071b33_0%,rgba(7,27,51,0.96)_34%,rgba(7,27,51,0.78)_52%,rgba(7,27,51,0.35)_74%,rgba(7,27,51,0.12)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[#071b33]/75 lg:bg-transparent" />

        {/* Background accents */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(184,117,134,0.35),transparent_30%),radial-gradient(circle_at_88%_70%,rgba(217,163,175,0.18),transparent_30%)]" />
        <div className="absolute right-[-8%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#b87586]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Get In Touch
            </p>

            <h1 className="mt-6 font-serif text-[48px] font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-[64px] lg:text-[76px]">
              Contact{" "}
              <span className="bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text italic text-transparent">
                Us
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/78 sm:text-[18px]">
              We are here to help salons, spas, barbershops, investors, and
              beauty professionals grow with the right people, systems, training,
              recruitment support, and business guidance.
            </p>

            <div className="mt-8 h-[2px] w-24 bg-[#d9a3af]" />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {contactHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b87586] to-[#ef8fb0] text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)]">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(184,117,134,0.10),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(244,223,229,0.65),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.35fr_0.85fr]">
          {/* Form */}
          <div className="rounded-[2rem] border border-[#ead5db] bg-white p-6 shadow-[0_24px_80px_rgba(7,27,51,0.08)] sm:p-8 lg:p-10">
            <div>
              <h2 className="font-serif text-[34px] font-black leading-tight tracking-[-0.035em] text-[#071b33] sm:text-[42px]">
                Send Us a Message
              </h2>

              <div className="mt-4 h-[2px] w-16 bg-[#b87586]" />

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
            </div>

            <form className="mt-8 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name *"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="businessName"
                  type="text"
                  placeholder="Business Name"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <select
                  name="interest"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    What do you need help with?
                  </option>
                  <option>Request Staff</option>
                  <option>Book Consultation</option>
                  <option>Training & Staff Development</option>
                  <option>Business Systems & Documentation</option>
                  <option>Beauty Business Setup & Launch</option>
                  <option>Digital Growth & Visibility</option>
                  <option>Job Application</option>
                  <option>Other</option>
                </select>

                <input
                  name="subject"
                  type="text"
                  required
                  placeholder="Subject *"
                  className="h-14 w-full rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />
              </div>

              <textarea
                name="message"
                required
                rows={7}
                placeholder="How can we help you? *"
                className="w-full resize-none rounded-lg border border-[#ead5db] bg-white px-4 py-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
              />

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.25)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                Send Message
              </button>

              <p className="flex items-start gap-3 pt-3 text-sm leading-6 text-slate-500">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#b87586]" />
                Your information is secure and will only be used to respond to
                your enquiry.
              </p>
            </form>
          </div>

          {/* Contact info */}
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-[#ead5db] bg-white p-6 shadow-[0_24px_80px_rgba(7,27,51,0.08)] sm:p-8">
              <h2 className="font-serif text-[30px] font-black tracking-[-0.035em] text-[#071b33]">
                Contact Information
              </h2>

              <div className="mt-4 h-[2px] w-16 bg-[#b87586]" />

              <div className="mt-7 grid gap-6">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-[#071b33]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {item.main}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  );

                  if (item.href === "#") {
                    return <div key={item.title}>{content}</div>;
                  }

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block transition hover:translate-x-1"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-[#071b33] p-6 text-white shadow-[0_24px_80px_rgba(7,27,51,0.18)] sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#b87586] to-[#ef8fb0] text-white">
                <CalendarCheck className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <h3 className="mt-6 font-serif text-[30px] font-black leading-tight tracking-[-0.035em] text-white">
                Ready to Grow Your Beauty Business?
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-white/72">
                Book a consultation and let’s create a structured plan for your
                salon, spa, barbershop, team, or beauty business.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-6 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[420px] overflow-hidden border-y border-[#ead5db]">
        <iframe
          title="Salons Assured Kenya Ltd Location - Kwaheri Road Runda"
          src="https://www.google.com/maps?q=Kwaheri%20Road%20Runda%20Nairobi%20Kenya&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_40%,rgba(255,255,255,0.28))]" />

        <div className="absolute left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#ead5db] bg-white p-5 shadow-[0_24px_80px_rgba(7,27,51,0.16)]">
          <h3 className="text-base font-extrabold text-[#071b33]">
            Salons Assured Kenya Ltd
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Kwaheri Road, Runda
            <br />
            Nairobi, Kenya
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Kwaheri%20Road%20Runda%20Nairobi%20Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#b87586]"
          >
            Get Directions
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>
    </main>
  );
}