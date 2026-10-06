import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, Store, UsersRound } from "lucide-react";

const pathways = [
  {
    title: "Hire the right people",
    description: "Tell us the role and location. Our recruitment team will review your staffing needs and explain the next steps.",
    detail: "Sourcing · Screening · Placement support",
    action: "Request staff",
    href: "/recruitment#recruitment-desk",
    icon: UsersRound,
  },
  {
    title: "Improve your business",
    description: "Get support with staff accountability, operating systems, customer experience and the challenges affecting daily performance.",
    detail: "Assessment · Systems · Management support",
    action: "Discuss a business assessment",
    href: "/contact?service=Business%20assessment%20or%20audit#enquiry",
    icon: ClipboardCheck,
  },
  {
    title: "Plan your launch",
    description: "Discuss your salon, spa or barbershop concept, location, staffing and launch requirements before the next big decision.",
    detail: "Planning · Setup · Launch readiness",
    action: "Discuss your setup",
    href: "/contact?service=Beauty%20business%20setup%20and%20launch#enquiry",
    icon: Store,
  },
];

export default function OwnerSupport() {
  return (
    <section id="owner-support" className="scroll-mt-28 bg-[#f8f5f2] py-16 text-[#071b33] sm:py-20">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#b87586]">For business owners &amp; investors</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_420px] lg:items-end">
          <h2 className="[font-family:var(--font-display)] text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[58px]">What does your business need next?</h2>
          <p className="text-[14px] leading-7 text-[#071b33]/65">Start with the challenge you want to solve. We will clarify the scope and explain the appropriate support.</p>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {pathways.map(({ icon: Icon, ...pathway }, index) => (
            <article key={pathway.title} className="flex flex-col border border-[#071b33]/10 bg-white p-7 sm:p-8">
              <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-[#b87586]" aria-hidden="true" /><span className="text-[10px] font-bold text-[#071b33]/35">0{index + 1}</span></div>
              <h3 className="mt-6 [font-family:var(--font-display)] text-[31px] font-semibold leading-tight">{pathway.title}</h3>
              <p className="mt-4 text-[13px] leading-7 text-[#071b33]/65">{pathway.description}</p>
              <p className="mb-6 mt-5 text-[10px] font-bold text-[#b87586]">{pathway.detail}</p>
              <Link href={pathway.href} className="group mt-auto inline-flex min-h-12 items-center justify-between gap-3 border-t border-[#071b33]/10 pt-4 text-[12px] font-extrabold transition hover:text-[#b87586]">{pathway.action}<ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-[#071b33]/60">Looking for work? <Link href="/job-seekers" className="inline-flex min-h-11 items-center font-bold text-[#071b33] underline underline-offset-4">Explore beauty career opportunities</Link>.</p>
      </div>
    </section>
  );
}
