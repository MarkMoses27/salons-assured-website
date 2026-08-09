"use client";

import {
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";

const enquiryTypes = [
  "Ticket Support",
  "Group Registration",
  "Speaker Application",
  "Exhibitor Application",
  "Sponsorship Enquiry",
  "General Enquiry",
];

export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/salonsassuredkenya@gmail.com"
      method="POST"
      className="rounded-[28px] border border-[#0D1D34]/10 bg-white p-6 shadow-[0_24px_70px_rgba(13,29,52,0.08)] sm:p-8"
    >
      <input
        type="hidden"
        name="_subject"
        value="New EBBC2026 Enquiry - Salons Assured Kenya"
      />

      <input
        type="hidden"
        name="_template"
        value="table"
      />

      <input
        type="hidden"
        name="_next"
        value="https://www.salonsassured.com/ebbc2026/contact"
      />

      <input
        type="hidden"
        name="_captcha"
        value="false"
      />

      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#CC8591]/12 text-[#CC8591]">
          <Mail className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#0D1D34]">
            Send Your Enquiry
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#0D1D34]/45">
            Complete the form below and your enquiry
            will be sent directly to the EBBC2026 team
            by email.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Enquiry Type *
          </span>

          <select
            required
            name="Enquiry Type"
            defaultValue=""
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm text-[#0D1D34] outline-none transition focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          >
            <option
              value=""
              disabled
            >
              Select enquiry type
            </option>

            {enquiryTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Full Name *
          </span>

          <input
            required
            name="Full Name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Phone Number *
          </span>

          <input
            required
            name="Phone Number"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 0712 345 678"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Email Address *
          </span>

          <input
            required
            name="Email Address"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Company, Salon or Organisation
          </span>

          <input
            name="Company / Salon / Organisation"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label className="sm:col-span-2">
          <span className="text-[11px] font-extrabold text-[#0D1D34]">
            Your Message *
          </span>

          <textarea
            required
            name="Message"
            rows={6}
            placeholder="Tell us how the EBBC2026 team can assist you."
            className="mt-2 w-full resize-none rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 py-4 text-sm leading-6 text-[#0D1D34] outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
      >
        Send Email Enquiry

        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-5 flex items-start gap-2 rounded-[14px] bg-[#FAFAFA] px-4 py-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

        <p className="text-[10px] leading-5 text-[#0D1D34]/45">
          Your enquiry will be sent to Salons Assured
          Kenya for review. Sending an enquiry does not
          confirm a ticket, speaking position,
          exhibition space or sponsorship package.
          Official confirmation will be provided
          separately by the EBBC2026 team.
        </p>
      </div>
    </form>
  );
}