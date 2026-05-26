import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Mail,
  Phone,
  Scissors,
  Search,
  ShieldCheck,
  UserCheck,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beauty Industry Recruitment & Staffing | Salons Assured Kenya Ltd",
  description:
    "Salons Assured Kenya Ltd provides salon staffing, spa staffing, barbershop recruitment, beauty industry hiring support, job seeker placement, screening, shortlisting and recruitment guidance.",
};

const employerPoints = [
  "Salon, spa and barbershop staffing support",
  "Screened and shortlisted beauty professionals",
  "Support for managers, stylists, nail technicians, therapists and support staff",
  "Professional guidance from request to placement",
];

const professionalPoints = [
  "Apply for beauty industry opportunities",
  "Connect with salons, spas, barbershops and beauty brands",
  "Access roles that match your skills and experience",
  "Grow your career through trusted recruitment support",
];

const process = [
  {
    title: "Request / Apply",
    text: "Employers submit staff requests and beauty professionals submit applications.",
    icon: ClipboardCheck,
  },
  {
    title: "Screening",
    text: "We review details, experience, expectations and role fit.",
    icon: Search,
  },
  {
    title: "Shortlisting",
    text: "Qualified candidates are shortlisted based on the business need.",
    icon: UsersRound,
  },
  {
    title: "Interview",
    text: "We support interview coordination between the business and candidate.",
    icon: UserCheck,
  },
  {
    title: "Placement",
    text: "The right candidate is placed with guidance for a smooth start.",
    icon: Handshake,
  },
  {
    title: "Follow-up",
    text: "We follow up to support satisfaction and long-term success.",
    icon: BadgeCheck,
  },
];

const roles = [
  "Salon Manager",
  "Hair Stylist",
  "Nail Technician",
  "Barber",
  "Spa Therapist",
  "Beauty Therapist",
  "Receptionist",
  "Housekeeping Staff",
  "Social Media Manager",
  "Makeup Artist",
];

const faqs = [
  {
    q: "How do I request staff for my salon, spa or barbershop?",
    a: "Use the recruitment enquiry form and choose Request Staff. Share the role, location, number of staff needed and preferred experience level. Salons Assured will review your request and follow up.",
  },
  {
    q: "Can job seekers apply through the website?",
    a: "Yes. Beauty professionals can submit their details through the same recruitment enquiry form by choosing Apply for Jobs.",
  },
  {
    q: "What types of businesses do you recruit for?",
    a: "We support salons, spas, barbershops, nail studios, wellness businesses and beauty brands looking for reliable beauty industry professionals.",
  },
  {
    q: "What roles do you recruit for?",
    a: "We recruit for salon managers, stylists, nail technicians, barbers, spa therapists, beauty therapists, receptionists, housekeepers, social media managers and related beauty industry roles.",
  },
];

export default function RecruitmentPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#071b33] text-white">
        <div className="absolute inset-y-0 right-0 -z-20 hidden w-[62%] lg:block">
          <Image
            src="/hero-beauty-team.png"
            alt="Beauty industry recruitment and staffing for salons spas and barbershops"
            fill
            sizes="62vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071b33_0%,#071b33_38%,rgba(7,27,51,0.88)_55%,rgba(7,27,51,0.42)_78%,rgba(7,27,51,0.10)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_22%,rgba(184,117,134,0.30),transparent_28%),radial-gradient(circle_at_90%_82%,rgba(217,163,175,0.16),transparent_30%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:min-h-[680px] lg:grid-cols-[0.48fr_0.52fr] lg:py-24">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Premium Beauty Recruitment Solutions
            </p>

            <h1 className="mt-6 font-serif text-[48px] font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-[64px] lg:text-[76px]">
              Beauty Industry{" "}
              <span className="block bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text italic text-transparent">
                Recruitment & Staffing
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/78 sm:text-[18px]">
              Salons Assured helps salons, spas, barbershops and beauty
              businesses find qualified, reliable and professional talent
              through structured sourcing, screening, shortlisting and placement
              support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#recruitment-desk"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                <BriefcaseBusiness className="h-5 w-5" />
                Request Staff
              </a>

              <a
                href="#recruitment-desk"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d9a3af]/70 bg-white/5 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >
                <UsersRound className="h-5 w-5" />
                Apply for Jobs
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.25)] lg:hidden">
            <Image
              src="/hero-beauty-team.png"
              alt="Beauty industry recruitment and staffing team"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* SMOOTH SPLIT SECTION */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(184,117,134,0.08),transparent_28%),radial-gradient(circle_at_90%_84%,rgba(244,223,229,0.60),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Recruitment Desk
              </p>

              <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071b33] sm:text-[56px]">
                One service. Two clear paths.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-700">
                Whether you are hiring for your beauty business or looking for
                your next opportunity, our recruitment process is structured to
                help the right people meet the right businesses.
              </p>
            </div>

            <div className="divide-y divide-[#ead5db] border-y border-[#ead5db]">
              <div className="grid gap-8 py-8 md:grid-cols-[0.36fr_0.64fr] md:items-start">
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                    For Employers
                  </p>
                  <h3 className="mt-3 font-serif text-[34px] font-black tracking-[-0.04em] text-[#071b33]">
                    I Need Staff
                  </h3>
                </div>

                <div>
                  <p className="max-w-2xl text-[15px] leading-7 text-slate-700">
                    For salons, spas, barbershops and beauty businesses that
                    need reliable professionals, structured screening and proper
                    hiring support.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {employerPoints.map((item) => (
                      <p
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b87586]" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-8 py-8 md:grid-cols-[0.36fr_0.64fr] md:items-start">
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                    For Beauty Professionals
                  </p>
                  <h3 className="mt-3 font-serif text-[34px] font-black tracking-[-0.04em] text-[#071b33]">
                    I Am Looking for a Job
                  </h3>
                </div>

                <div>
                  <p className="max-w-2xl text-[15px] leading-7 text-slate-700">
                    For stylists, nail technicians, barbers, therapists,
                    receptionists, managers and beauty professionals looking for
                    better opportunities.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {professionalPoints.map((item) => (
                      <p
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b87586]" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECRUITMENT DESK FORM */}
      <section
        id="recruitment-desk"
        className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,117,134,0.26),transparent_28%),radial-gradient(circle_at_90%_84%,rgba(217,163,175,0.14),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
              Start Here
            </p>

            <h2 className="mt-5 font-serif text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-[56px]">
              Submit your recruitment enquiry.
            </h2>

            <p className="mt-6 max-w-md text-[16px] leading-8 text-white/72">
              Use one clean form to request staff or apply for beauty industry
              opportunities. Choose your request type and our team will follow
              up.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <p className="flex gap-3 text-sm leading-6 text-white/75">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ef8fb0]" />
                Your information is treated confidentially and used only for
                recruitment support.
              </p>

              <p className="flex gap-3 text-sm leading-6 text-white/75">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#ef8fb0]" />
                0715500268 / 0706551028
              </p>

              <p className="flex gap-3 text-sm leading-6 text-white/75">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#ef8fb0]" />
                info@salonsassured.co.ke
              </p>
            </div>
          </div>

          <form className="rounded-[2rem] bg-white p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-7">
            <div className="mb-6 border-b border-[#ead5db] pb-5">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                Recruitment Form
              </p>
              <h3 className="mt-2 font-serif text-[30px] font-black tracking-[-0.04em] text-[#071b33]">
                Tell us how we can help
              </h3>
            </div>

            <div className="grid gap-4">
              <select
                name="requestType"
                required
                className="h-14 rounded-lg border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Request Type *
                </option>
                <option>Request Staff</option>
                <option>Apply for Jobs</option>
              </select>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Full Name / Contact Person *"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="businessName"
                  placeholder="Business / Salon Name"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="phone"
                  required
                  placeholder="Phone Number *"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="location"
                  required
                  placeholder="Location *"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="role"
                  required
                  placeholder="Role / Position *"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="experience"
                  placeholder="Preferred / Years of Experience"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />

                <input
                  name="availability"
                  placeholder="Availability / Date Needed"
                  className="h-14 rounded-lg border border-[#ead5db] px-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                />
              </div>

              <textarea
                name="message"
                rows={5}
                placeholder="Tell us more about your recruitment needs, skills, experience or job application..."
                className="resize-none rounded-lg border border-[#ead5db] px-4 py-4 text-sm text-[#071b33] outline-none focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
              />

              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.25)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a]"
              >
                Submit Enquiry
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Our Process
              </p>

              <h2 className="mt-5 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[54px]">
                Simple. Transparent. Professional.
              </h2>
            </div>

            <div className="divide-y divide-[#ead5db] border-y border-[#ead5db]">
              {process.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="grid gap-5 py-6 md:grid-cols-[90px_1fr]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-[30px] font-black text-[#d9a3af]">
                        0{index + 1}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbf4f6] text-[#b87586] ring-1 ring-[#ead5db]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-[25px] font-black text-[#071b33]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="bg-[#fbf4f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                Roles We Recruit For
              </p>
              <h2 className="mt-5 font-serif text-[40px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] sm:text-[52px]">
                Beauty industry talent categories.
              </h2>
            </div>

            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-3 border-b border-[#ead5db] pb-4"
                >
                  <Scissors className="h-5 w-5 shrink-0 text-[#b87586]" />
                  <p className="text-sm font-extrabold text-[#071b33]">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 font-serif text-[40px] font-black tracking-[-0.04em] text-[#071b33] sm:text-[52px]">
              Recruitment Questions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#ead5db] border-y border-[#ead5db]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-extrabold text-[#071b33]">
                  {faq.q}
                  <FileCheck2 className="h-5 w-5 shrink-0 text-[#b87586]" />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}