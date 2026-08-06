"use client";

import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";

import { EBBC2026 } from "@/lib/ebbc2026/config";

const enquiryTypes = [
  "Ticket Support",
  "Group Registration",
  "Speaker Application",
  "Exhibitor Application",
  "Sponsorship Enquiry",
  "General Enquiry",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    enquiryType: "",
    fullName: "",
    phone: "",
    email: "",
    organisation: "",
    message: "",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const whatsappMessage = [
      "Hello Salons Assured Kenya.",
      "",
      "I have an EBBC2026 enquiry.",
      "",
      `Enquiry Type: ${formData.enquiryType}`,
      `Name: ${formData.fullName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Organisation: ${
        formData.organisation || "Not provided"
      }`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    const whatsappUrl =
      `${EBBC2026.contacts.whatsappUrl}` +
      `?text=${encodeURIComponent(
        whatsappMessage,
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#0D1D34]/8 bg-white p-6 shadow-[0_28px_80px_rgba(13,29,52,0.09)] sm:p-9"
    >
      <div className="flex items-start gap-4 border-b border-[#0D1D34]/8 pb-6">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] bg-[#CC8591]/15 text-[#CC8591]">
          <MessageCircle className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold">
            Send Your Enquiry
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#0D1D34]/45">
            Complete the form and continue the
            conversation securely on WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="text-[11px] font-extrabold">
            Enquiry Type *
          </span>

          <select
            required
            value={formData.enquiryType}
            onChange={(event) =>
              updateField(
                "enquiryType",
                event.target.value,
              )
            }
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          >
            <option value="">
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
          <span className="text-[11px] font-extrabold">
            Full Name *
          </span>

          <input
            required
            type="text"
            value={formData.fullName}
            onChange={(event) =>
              updateField(
                "fullName",
                event.target.value,
              )
            }
            placeholder="Enter your full name"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold">
            Phone Number *
          </span>

          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value,
              )
            }
            placeholder="e.g. 0712 345 678"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold">
            Email Address *
          </span>

          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value,
              )
            }
            placeholder="name@example.com"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label>
          <span className="text-[11px] font-extrabold">
            Company, Salon or Organisation
          </span>

          <input
            type="text"
            value={formData.organisation}
            onChange={(event) =>
              updateField(
                "organisation",
                event.target.value,
              )
            }
            placeholder="Optional"
            className="mt-2 h-[52px] w-full rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 text-sm outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>

        <label className="sm:col-span-2">
          <span className="text-[11px] font-extrabold">
            Your Message *
          </span>

          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(event) =>
              updateField(
                "message",
                event.target.value,
              )
            }
            placeholder="Tell us how the EBBC2026 team can assist you."
            className="mt-2 w-full resize-none rounded-[14px] border border-[#0D1D34]/12 bg-[#FAFAFA] px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-[#0D1D34]/30 focus:border-[#CC8591] focus:ring-4 focus:ring-[#CC8591]/10"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC8591] px-7 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(204,133,145,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0D1D34]"
      >
        Continue on WhatsApp

        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-5 flex items-start gap-2 rounded-[14px] bg-[#FAFAFA] px-4 py-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#CC8591]" />

        <p className="text-[10px] leading-5 text-[#0D1D34]/45">
          Sending an enquiry does not confirm a
          ticket, speaking position, exhibition
          space or sponsorship package. The
          EBBC2026 team will provide official
          confirmation separately.
        </p>
      </div>
    </form>
  );
}