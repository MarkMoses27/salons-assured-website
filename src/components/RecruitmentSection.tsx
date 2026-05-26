import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";

const employerBenefits = [
  "Access pre-screened & qualified candidates",
  "Save time and reduce hiring pressure",
  "We handle sourcing, screening & shortlisting",
  "Placement support until you’re satisfied",
];

const jobSeekerBenefits = [
  "Access verified job opportunities",
  "Increase your visibility to top employers",
  "Get connected with the right businesses",
  "Career growth & development support",
];

const stats = [
  {
    value: "500+",
    title: "Qualified Professionals",
    text: "In Our Network",
    icon: UsersRound,
  },
  {
    value: "300+",
    title: "Salons, Spas & Barbershops",
    text: "Served",
    icon: Store,
  },
  {
    value: "QUALITY TALENT.",
    title: "STRONGER BUSINESSES.",
    text: "",
    icon: Sparkles,
    center: true,
  },
  {
    value: "98%",
    title: "Employer Satisfaction",
    text: "",
    icon: ShieldCheck,
  },
  {
    value: "100%",
    title: "Professional & Ethical",
    text: "Recruitment",
    icon: Handshake,
  },
];

export default function RecruitmentSection() {
  return (
    <section className="relative overflow-hidden bg-[#071b33] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,117,134,0.24),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(217,163,175,0.16),transparent_30%)]" />
      <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-[#b87586]/10 blur-3xl" />
      <div className="absolute bottom-[-18%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#d9a3af]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-[#d9a3af]" />
            <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#d9a3af]">
              Recruitment Network
            </p>
            <span className="h-px w-16 bg-[#d9a3af]" />
          </div>

          <h2 className="mt-6 font-serif text-[40px] font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[64px]">
            Connecting Beauty Businesses{" "}
            <span className="block">
              With{" "}
              <span className="bg-gradient-to-r from-[#d9a3af] via-[#ef8fb0] to-[#f7c9d4] bg-clip-text text-transparent">
                Top Talent
              </span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-white/75 sm:text-[17px]">
            We connect salons, spas, barbershops and beauty businesses with
            qualified, pre-screened professionals who deliver excellence and
            help your business grow.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {/* Employers */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d9a3af]/35 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm">
            <div className="grid min-h-[620px] lg:grid-cols-[0.43fr_0.57fr] xl:min-h-[640px]">
              <div className="relative min-h-[380px] overflow-hidden lg:min-h-full">
                <Image
                  src="/recruitment-employer.png"
                  alt="Salon business owner looking for professional beauty staff"
                  fill
                  sizes="(max-width: 1280px) 100vw, 30vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,51,0.05),rgba(7,27,51,0.34))]" />
                <div className="absolute -right-24 top-[-5%] hidden h-[110%] w-48 rounded-l-[100%] border-l border-[#ef8fb0]/60 bg-[#071b33] lg:block" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9a3af]/35 bg-[#06162b] text-[#ef8fb0]">
                  <BriefcaseBusiness className="h-8 w-8" strokeWidth={1.65} />
                </div>

                <p className="mt-7 text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#ef8fb0]">
                  For Employers
                </p>

                <h3 className="mt-5 max-w-[470px] font-serif text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-white sm:text-[42px]">
                  Need Reliable Staff for{" "}
                  <span className="text-[#ef8fb0]">Your Beauty Business?</span>
                </h3>

                <div className="mt-5 h-[3px] w-14 bg-[#ef8fb0]" />

                <p className="mt-6 max-w-[500px] text-[15px] leading-8 text-white/75 sm:text-[16px]">
                  We help you find, screen and connect with qualified beauty
                  professionals who are skilled, reliable and ready to add value
                  to your team.
                </p>

                <div className="mt-7 grid gap-3">
                  {employerBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#ef8fb0]"
                        strokeWidth={2}
                      />
                      <p className="text-sm leading-6 text-white/82">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/recruitment"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a] sm:w-auto"
                >
                  <UsersRound className="h-5 w-5" strokeWidth={1.9} />
                  Request Staff
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>

                <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
                  <ShieldCheck className="h-4 w-4 text-[#ef8fb0]" />
                  Trusted • Verified • Professional
                </p>
              </div>
            </div>
          </div>

          {/* Job Seekers */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d9a3af]/35 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm">
            <div className="grid min-h-[620px] lg:grid-cols-[0.57fr_0.43fr] xl:min-h-[640px]">
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9a3af]/35 bg-[#06162b] text-[#ef8fb0]">
                  <UserRound className="h-8 w-8" strokeWidth={1.65} />
                </div>

                <p className="mt-7 text-[13px] font-extrabold uppercase tracking-[0.22em] text-[#ef8fb0]">
                  For Job Seekers
                </p>

                <h3 className="mt-5 max-w-[470px] font-serif text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-white sm:text-[42px]">
                  Looking for Beauty Industry{" "}
                  <span className="text-[#ef8fb0]">Opportunities?</span>
                </h3>

                <div className="mt-5 h-[3px] w-14 bg-[#ef8fb0]" />

                <p className="mt-6 max-w-[500px] text-[15px] leading-8 text-white/75 sm:text-[16px]">
                  Apply and get matched with top salons, spas, barbershops and
                  beauty brands looking for talented professionals like you.
                </p>

                <div className="mt-7 grid gap-3">
                  {jobSeekerBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[#ef8fb0]"
                        strokeWidth={2}
                      />
                      <p className="text-sm leading-6 text-white/82">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/job-seekers"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#b87586] to-[#ef8fb0] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(184,117,134,0.28)] transition duration-300 hover:from-[#a76476] hover:to-[#df789a] sm:w-auto"
                >
                  <Sparkles className="h-5 w-5" strokeWidth={1.9} />
                  Apply for Jobs
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>

                <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
                  <ShieldCheck className="h-4 w-4 text-[#ef8fb0]" />
                  Free to Apply • Safe • Confidential
                </p>
              </div>

              <div className="relative min-h-[380px] overflow-hidden lg:min-h-full">
                <Image
                  src="/recruitment-jobseeker.png"
                  alt="Beauty professional looking for salon spa and barbershop jobs"
                  fill
                  sizes="(max-width: 1280px) 100vw, 30vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(7,27,51,0.05),rgba(7,27,51,0.34))]" />
                <div className="absolute -left-24 top-[-5%] hidden h-[110%] w-48 rounded-r-[100%] border-r border-[#ef8fb0]/60 bg-[#071b33] lg:block" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-[#d9a3af]/25 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.value}
                className={`flex gap-4 rounded-2xl p-3 transition duration-300 hover:bg-white/[0.05] ${
                  item.center ? "items-center justify-center text-center" : ""
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d9a3af]/25 bg-[#06162b] text-[#ef8fb0]">
                  <Icon className="h-6 w-6" strokeWidth={1.65} />
                </div>

                <div>
                  <h4 className="text-[28px] font-extrabold leading-none text-[#ef8fb0]">
                    {item.value}
                  </h4>
                  <p className="mt-2 text-sm font-semibold leading-5 text-white">
                    {item.title}
                  </p>
                  {item.text && (
                    <p className="mt-1 text-sm leading-5 text-white/68">
                      {item.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}