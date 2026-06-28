import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Submitted | Salons Assured Kenya Ltd",
  description:
    "Your job application has been submitted successfully to Salons Assured Kenya Ltd.",
};

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fbf4f6] px-5 py-20 sm:px-6 lg:py-24">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white shadow-[0_30px_90px_rgba(7,27,51,0.09)]">
        <div className="bg-[#071b33] px-6 py-14 text-center text-white sm:px-10 lg:px-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-[#d9a3af] ring-1 ring-white/15">
            <BadgeCheck className="h-11 w-11" />
          </div>

          <p className="mt-8 text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
            Application Submitted
          </p>

          <h1 className="mt-5 font-serif text-[42px] font-black leading-tight tracking-[-0.045em] sm:text-[58px]">
            Thank you for applying.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-white/75">
            Your application has been received by Salons Assured Kenya Ltd. Our
            recruitment team will review your details and contact you when a
            suitable opportunity is available.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-10 text-center sm:px-10 lg:px-14">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#ead5db] bg-[#fbf4f6] p-5">
            <p className="text-sm leading-7 text-slate-600">
              Submitting an application does not guarantee employment. Suitable
              candidates will be contacted based on available roles, location,
              experience and client requirements.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#071b33] px-7 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d2748]"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>

            <Link
              href="/job-seekers"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#d9a3af] px-7 text-sm font-extrabold text-[#071b33] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d9a3af]"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Submit Another Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}