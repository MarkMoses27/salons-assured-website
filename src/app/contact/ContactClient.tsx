"use client";

import Image from "next/image";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

type ContactFormData = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  clientType: string;
  service: string;
  location: string;
  preferredContact: string;
  message: string;
};

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const initialFormData: ContactFormData = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  clientType: "",
  service: "",
  location: "",
  preferredContact:
    "WhatsApp",
  message: "",
};

const contactMethods = [
  {
    label:
      "Call",
    value:
      "0715 500 268",
    secondary:
      "0706 551 028",
    href:
      "tel:+254715500268",
    icon:
      Phone,
  },
  {
    label:
      "WhatsApp",
    value:
      "0715 500 268",
    secondary:
      "Send us a direct message",
    href:
      "https://wa.me/254715500268",
    icon:
      MessageCircle,
    external: true,
  },
  {
    label:
      "Email",
    value:
      "info@salonsassured.com",
    secondary:
      "Business and partnership enquiries",
    href:
      "mailto:info@salonsassured.com",
    icon:
      Mail,
  },
];

const processSteps = [
  {
    number: "01",
    title:
      "Share the challenge",
    description:
      "Tell us about your business and the support you are looking for.",
  },
  {
    number: "02",
    title:
      "We review it",
    description:
      "Our team identifies the most suitable service and next step.",
  },
  {
    number: "03",
    title:
      "We connect",
    description:
      "We respond through your preferred communication channel.",
  },
];

const fieldClass = [
  "h-[58px] w-full",
  "border border-[#071b33]/15",
  "bg-[#fbf9f8] px-4",
  "text-[13px] text-[#071b33]",
  "outline-none transition-all",
  "placeholder:text-[#071b33]/35",
  "focus:border-[#b87586]",
  "focus:bg-white",
  "focus:ring-4",
  "focus:ring-[#d9a3af]/20",
].join(" ");

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children:
    ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y:
          shouldReduceMotion
            ? 0
            : 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.75,

        delay:
          shouldReduceMotion
            ? 0
            : delay,

        ease:
          premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({
  children,
  light = false,
}: {
  children:
    ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={[
          "h-px w-10",
          light
            ? "bg-[#d9a3af]"
            : "bg-[#b87586]",
        ].join(" ")}
      />

      <p
        className={[
          "text-[9px] font-extrabold",
          "uppercase tracking-[0.31em]",
          light
            ? "text-[#d9a3af]"
            : "text-[#b87586]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
  required = false,
}: {
  children:
    ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/60"
    >
      {children}

      {required && (
        <span className="ml-1 text-[#b87586]">
          *
        </span>
      )}
    </label>
  );
}

export default function ContactClient() {
  const shouldReduceMotion =
    useReducedMotion();

  const [
    formData,
    setFormData,
  ] =
    useState<ContactFormData>(
      initialFormData,
    );

  const [
    submitted,
    setSubmitted,
  ] =
    useState(false);

  const handleChange = (
    event:
      ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
      >,
  ) => {
    const {
      name,
      value,
    } =
      event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]:
          value,
      }),
    );

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const messageLines = [
      "Hello Salons Assured Kenya,",
      "",
      "I would like to make a business enquiry.",
      "",
      `Name: ${formData.name}`,
      `Business/Brand: ${
        formData.businessName ||
        "Not provided"
      }`,
      `Phone: ${formData.phone}`,
      `Email: ${
        formData.email ||
        "Not provided"
      }`,
      `Client category: ${formData.clientType}`,
      `Support required: ${formData.service}`,
      `Location: ${
        formData.location ||
        "Not provided"
      }`,
      `Preferred response: ${formData.preferredContact}`,
      "",
      "Enquiry:",
      formData.message,
    ];

    const whatsappUrl =
      `https://wa.me/254715500268?text=${
        encodeURIComponent(
          messageLines.join(
            "\n",
          ),
        )
      }`;

    setSubmitted(true);

    const whatsappWindow =
      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

    if (!whatsappWindow) {
      window.location.href =
        whatsappUrl;
    }
  };

  return (
    <main
      id="top"
      className="overflow-hidden bg-white text-[#071b33]"
    >
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#071b33] text-white">
        <div className="absolute inset-0">
          <Image
            src="/contact-hero.png"
            alt="Professional beauty business consultation environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#071b33]/68" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,51,0.99)_0%,rgba(7,27,51,0.92)_45%,rgba(7,27,51,0.35)_100%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(217,163,175,0.28),transparent_30%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[760px] max-w-[1380px] items-center px-5 pb-20 pt-36 sm:px-8 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y:
                shouldReduceMotion
                  ? 0
                  : 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.9,

              ease:
                premiumEase,
            }}
            className="max-w-[850px]"
          >
            <SectionLabel light>
              Contact Salons Assured
            </SectionLabel>

            <h1 className="mt-8 [font-family:var(--font-display)] text-[58px] font-semibold leading-[0.87] tracking-[-0.067em] sm:text-[82px] lg:text-[104px]">
              Let&apos;s talk about what your business
              <span className="ml-3 font-medium italic text-[#d9a3af]">
                needs next.
              </span>
            </h1>

            <p className="mt-8 max-w-[670px] text-[16px] leading-8 text-white/72 sm:text-[18px]">
              Tell us about your staffing, systems, training,
              setup, management or growth challenge. We will help
              identify the right next step.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#enquiry"
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-[#d9a3af] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#071b33] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Start your enquiry

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="https://wa.me/254715500268"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[10px] font-bold text-white/75 transition-colors hover:text-[#d9a3af]"
              >
                <MessageCircle className="h-4 w-4" />

                Or message us directly

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section
        id="enquiry"
        className="relative overflow-hidden bg-[#f8f5f3] py-20 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute -left-72 -top-72 h-[650px] w-[650px] rounded-full border border-[#b87586]/10" />

        <div className="relative mx-auto grid max-w-[1380px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
          {/* CONTACT INFORMATION */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>
              Speak With Our Team
            </SectionLabel>

            <h2 className="mt-7 [font-family:var(--font-display)] text-[48px] font-semibold leading-[0.92] tracking-[-0.054em] sm:text-[65px]">
              Start with the
              <span className="ml-3 font-medium italic text-[#b87586]">
                real challenge.
              </span>
            </h2>

            <p className="mt-7 max-w-[520px] text-[14px] leading-8 text-[#071b33]/62">
              Share the situation clearly and our team will guide
              you toward the most appropriate service or
              consultation.
            </p>

            <div className="mt-9 border-y border-[#071b33]/10 bg-white">
              {contactMethods.map(
                (method) => {
                  const Icon =
                    method.icon;

                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={
                        method.external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        method.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group grid grid-cols-[48px_1fr_34px] items-center gap-4 border-b border-[#071b33]/10 px-5 py-6 last:border-b-0 transition-colors hover:bg-[#fbf4f6]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071b33]/10 text-[#b87586] transition-all duration-300 group-hover:border-[#b87586] group-hover:bg-[#b87586] group-hover:text-white">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                        />
                      </span>

                      <div>
                        <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                          {method.label}
                        </p>

                        <p className="mt-2 break-words [font-family:var(--font-display)] text-[25px] font-semibold leading-none tracking-[-0.035em]">
                          {method.value}
                        </p>

                        <p className="mt-2 text-[10px] leading-5 text-[#071b33]/48">
                          {method.secondary}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-[#b87586] transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                  );
                },
              )}
            </div>

            <div className="mt-8">
              <p className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                What happens next
              </p>

              <div className="mt-5 space-y-5">
                {processSteps.map(
                  (step) => (
                    <div
                      key={step.number}
                      className="grid grid-cols-[42px_1fr] gap-4"
                    >
                      <span className="[font-family:var(--font-display)] text-[20px] font-semibold italic text-[#b87586]">
                        {step.number}
                      </span>

                      <div>
                        <h3 className="text-[12px] font-extrabold text-[#071b33]">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-[11px] leading-6 text-[#071b33]/52">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal
            delay={0.08}
            className="bg-white p-6 shadow-[0_35px_100px_rgba(7,27,51,0.12)] sm:p-9 lg:p-11"
          >
            <div className="flex flex-col gap-5 border-b border-[#071b33]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                  Business Enquiry
                </p>

                <h2 className="mt-4 [font-family:var(--font-display)] text-[39px] font-semibold leading-[0.96] tracking-[-0.045em] sm:text-[49px]">
                  Tell us how we can help.
                </h2>
              </div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#071b33]/45">
                <Lock className="h-4 w-4 text-[#b87586]" />

                Private enquiry
              </div>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel
                    htmlFor="name"
                    required
                  >
                    Your name
                  </FieldLabel>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Full name"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="businessName"
                  >
                    Business or brand
                  </FieldLabel>

                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    value={
                      formData.businessName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Business name"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="phone"
                    required
                  >
                    Phone number
                  </FieldLabel>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 0712 345 678"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="email"
                  >
                    Email address
                  </FieldLabel>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="name@example.com"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="clientType"
                    required
                  >
                    You are contacting us as
                  </FieldLabel>

                  <select
                    id="clientType"
                    name="clientType"
                    required
                    value={
                      formData.clientType
                    }
                    onChange={
                      handleChange
                    }
                    className={[
                      fieldClass,
                      "appearance-none",
                    ].join(" ")}
                  >
                    <option value="">
                      Select your category
                    </option>

                    <option value="Beauty business owner">
                      Beauty business owner
                    </option>

                    <option value="Beauty industry investor">
                      Beauty industry investor
                    </option>

                    <option value="Salon or spa manager">
                      Salon or spa manager
                    </option>

                    <option value="Beauty professional">
                      Beauty professional
                    </option>

                    <option value="Corporate or training partner">
                      Corporate or training partner
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel
                    htmlFor="service"
                    required
                  >
                    Support required
                  </FieldLabel>

                  <select
                    id="service"
                    name="service"
                    required
                    value={
                      formData.service
                    }
                    onChange={
                      handleChange
                    }
                    className={[
                      fieldClass,
                      "appearance-none",
                    ].join(" ")}
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="Recruitment and staffing">
                      Recruitment and staffing
                    </option>

                    <option value="Training and staff development">
                      Training and staff development
                    </option>

                    <option value="Business systems and documentation">
                      Business systems and documentation
                    </option>

                    <option value="Beauty business setup and launch">
                      Beauty business setup and launch
                    </option>

                    <option value="Digital growth and visibility">
                      Digital growth and visibility
                    </option>

                    <option value="Management consulting">
                      Management consulting
                    </option>

                    <option value="Business assessment or audit">
                      Business assessment or audit
                    </option>

                    <option value="Career or job enquiry">
                      Career or job enquiry
                    </option>

                    <option value="Partnership or event">
                      Partnership or event
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <FieldLabel
                    htmlFor="location"
                  >
                    Business location
                  </FieldLabel>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    value={
                      formData.location
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Town, county or country"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="preferredContact"
                    required
                  >
                    Preferred response
                  </FieldLabel>

                  <select
                    id="preferredContact"
                    name="preferredContact"
                    required
                    value={
                      formData.preferredContact
                    }
                    onChange={
                      handleChange
                    }
                    className={[
                      fieldClass,
                      "appearance-none",
                    ].join(" ")}
                  >
                    <option value="WhatsApp">
                      WhatsApp
                    </option>

                    <option value="Phone call">
                      Phone call
                    </option>

                    <option value="Email">
                      Email
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel
                  htmlFor="message"
                  required
                >
                  Tell us about the challenge
                </FieldLabel>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Describe the business, what is happening and the support you need."
                  className="w-full resize-none border border-[#071b33]/15 bg-[#fbf9f8] px-4 py-4 text-[13px] leading-7 text-[#071b33] outline-none transition-all placeholder:text-[#071b33]/35 focus:border-[#b87586] focus:bg-white focus:ring-4 focus:ring-[#d9a3af]/20"
                />
              </div>

              <div className="mt-7 flex flex-col gap-5 border-t border-[#071b33]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex max-w-[420px] items-start gap-3 text-[10px] leading-5 text-[#071b33]/50">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#b87586]" />

                  Your details are used only to review and respond
                  to your enquiry.
                </p>

                <button
                  type="submit"
                  className="group inline-flex min-h-[56px] items-center justify-center gap-4 rounded-full bg-[#071b33] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b87586]"
                >
                  <Send
                    className="h-4 w-4 text-[#d9a3af]"
                    strokeWidth={1.8}
                  />

                  Send enquiry

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>

              {submitted && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  role="status"
                  aria-live="polite"
                  className="mt-6 flex items-start gap-4 border border-[#b87586]/25 bg-[#fbf4f6] p-5"
                >
                  <BadgeCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#b87586]"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-[12px] font-extrabold">
                      Your enquiry is ready in WhatsApp.
                    </p>

                    <p className="mt-2 text-[11px] leading-6 text-[#071b33]/55">
                      Review the prepared message and press send to
                      deliver it to Salons Assured.
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <Reveal className="relative min-h-[480px] overflow-hidden border border-[#071b33]/10 bg-[#f8f5f3]">
            <iframe
              title="Salons Assured Kenya location on Kwaheri Road, Runda"
              src="https://www.google.com/maps?q=Kwaheri%20Road%20Runda%20Nairobi%20Kenya&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative flex min-h-[480px] flex-col justify-between overflow-hidden bg-[#071b33] p-7 text-white sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-48 -top-48 h-[430px] w-[430px] rounded-full border border-white/[0.06]" />

            <div className="relative z-10">
              <SectionLabel light>
                Visit Salons Assured
              </SectionLabel>

              <h2 className="mt-7 [font-family:var(--font-display)] text-[49px] font-semibold leading-[0.91] tracking-[-0.054em] sm:text-[62px]">
                Find us in
                <span className="ml-3 font-medium italic text-[#d9a3af]">
                  Runda.
                </span>
              </h2>

              <p className="mt-7 max-w-[430px] text-[14px] leading-8 text-white/62">
                Consultations and business meetings are best
                arranged in advance.
              </p>
            </div>

            <div className="relative z-10 mt-12 border-t border-white/15 pt-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d9a3af]" />

                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#d9a3af]">
                    Salons Assured Kenya Limited
                  </p>

                  <p className="mt-3 [font-family:var(--font-display)] text-[31px] font-semibold leading-[1.05]">
                    Kwaheri Road
                    <br />
                    Runda, Nairobi
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#d9a3af]" />

                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#d9a3af]">
                    Business Hours
                  </p>

                  <p className="mt-3 text-[12px] leading-6 text-white/65">
                    Monday – Saturday
                    <br />
                    8:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Salons%20Assured%20Kenya%2C%20Kwaheri%20Road%2C%20Runda%2C%20Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex h-[52px] items-center justify-center gap-4 rounded-full border border-white/20 px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-[#d9a3af] hover:bg-[#d9a3af] hover:text-[#071b33]"
              >
                Get directions

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}