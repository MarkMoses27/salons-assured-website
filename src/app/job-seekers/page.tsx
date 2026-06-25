import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Beauty Jobs | Salons Assured Kenya Ltd",
  description:
    "Apply for salon, spa, barbershop, nail, hair, braiding, lash, barber, receptionist, management and beauty business jobs through Salons Assured Kenya Ltd.",
};

const roles = [
  "Hair Stylist",
  "Braider",
  "Nail Technician",
  "Lash Technician",
  "Beautician",
  "Spa Therapist",
  "Barber",
  "Makeup Artist",
  "Salon Manager",
  "Assistant Manager",
  "Operations Manager",
  "Branch Manager",
  "Receptionist / Front Desk",
  "Cashier",
  "Social Media Manager",
  "Sales Agent / Beauty Retail Consultant",
  "Trainer",
  "Stock Controller / Storekeeper",
  "Housekeeper / Cleaner",
  "Other Beauty Business Role",
];

const skills = [
  "Hair Styling",
  "Braiding",
  "Natural Hair",
  "Caucasian Hair",
  "Wigs & Weaving",
  "Nails",
  "Pedicure",
  "Lashes",
  "Waxing",
  "Facials",
  "Massage / Spa Therapy",
  "Barbering",
  "Makeup",
  "Reception / Front Desk",
  "Customer Care",
  "Sales / Upselling",
  "Social Media",
  "Management",
  "Stock Control",
];

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-extrabold text-[#071b33]">
      {children}
      {required && <span className="text-[#b87586]"> *</span>}
    </label>
  );
}

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[#ead5db] pb-4">
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071b33] text-sm font-black text-[#d9a3af]">
          {number}
        </span>

        <div>
          <h2 className="font-serif text-[28px] font-black leading-tight tracking-[-0.035em] text-[#071b33] sm:text-[34px]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JobSeekersPage() {
  return (
    <main className="min-h-screen bg-[#fbf4f6] px-5 py-16 sm:px-6 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
            Salons Assured Kenya Ltd
          </p>

          <h1 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.045em] text-[#071b33] sm:text-[58px]">
            Beauty Job Application Form
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[16px]">
            Complete your details below. Our recruitment team will review your
            application and contact you when a suitable opportunity is available.
          </p>
        </div>

        <form
          action="https://formsubmit.co/salonsassuredsupportbusiness@gmail.com"
          method="POST"
          encType="multipart/form-data"
          className="overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white shadow-[0_30px_90px_rgba(7,27,51,0.09)]"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Job Application - Salons Assured Kenya"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value="https://www.salonsassured.com/application-success"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" />

          <div className="grid gap-10 p-6 sm:p-8 lg:p-10">
            <section className="grid gap-6">
              <SectionTitle
                number="01"
                title="Personal Details"
                description="Tell us who you are and how we can reach you."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Full Name</FieldLabel>
                  <input
                    name="Full Name"
                    type="text"
                    required
                    placeholder="e.g. Mary Wanjiku"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel required>Phone / WhatsApp Number</FieldLabel>
                  <input
                    name="Phone / WhatsApp"
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <input
                    name="Email Address"
                    type="email"
                    placeholder="e.g. name@email.com"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel required>Current Location</FieldLabel>
                  <input
                    name="Current Location"
                    type="text"
                    required
                    placeholder="Town / Estate / County"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-6">
              <SectionTitle
                number="02"
                title="Role & Availability"
                description="Select the role you are applying for and when you are available."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Role Applying For</FieldLabel>
                  <select
                    name="Role Applying For"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel required>Years of Experience</FieldLabel>
                  <select
                    name="Years of Experience"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select experience
                    </option>
                    <option>Below 1 year</option>
                    <option>1 - 2 years</option>
                    <option>3 - 5 years</option>
                    <option>6 - 10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>Availability</FieldLabel>
                  <select
                    name="Availability"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select availability
                    </option>
                    <option>Immediately</option>
                    <option>Within 1 week</option>
                    <option>Within 2 weeks</option>
                    <option>Within 1 month</option>
                    <option>Currently employed but open</option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>Preferred Work Type</FieldLabel>
                  <select
                    name="Preferred Work Type"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select work type
                    </option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Commission based</option>
                    <option>Contract</option>
                    <option>Open to any</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>Preferred Work Areas</FieldLabel>
                  <input
                    name="Preferred Work Areas"
                    type="text"
                    placeholder="e.g. CBD, Kilimani, Westlands, Runda, Ngong Road"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-6">
              <SectionTitle
                number="03"
                title="Skills & Services"
                description="Select the services or professional skills you can confidently perform."
              />

              <div className="grid gap-3 rounded-[1.5rem] border border-[#ead5db] bg-[#fbf4f6] p-5 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[#ead5db]/70 transition hover:-translate-y-0.5 hover:ring-[#d9a3af]"
                  >
                    <input
                      type="checkbox"
                      name="Skills"
                      value={skill}
                      className="h-4 w-4 rounded border-[#d9a3af] accent-[#b87586]"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </section>

            <section className="grid gap-6">
              <SectionTitle
                number="04"
                title="Portfolio & Work Samples"
                description="Portfolio links are optional. You may upload work photos instead."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel>Portfolio / Instagram / TikTok Link</FieldLabel>
                  <input
                    name="Portfolio / Instagram / TikTok Link"
                    type="url"
                    placeholder="Optional — https://..."
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Upload CV / Certificate</FieldLabel>
                  <input
                    name="CV / Certificate"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#071b33] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:border-[#b87586]"
                  />
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-dashed border-[#d9a3af] bg-[#fbf4f6] p-5">
                <FieldLabel>Upload Work Images</FieldLabel>

                <p className="mb-4 text-sm leading-6 text-slate-600">
                  Upload photos of your work such as nails, hair, braids,
                  lashes, barber cuts, makeup, spa work, reception setup or
                  social media work samples.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    name="Work Image 1"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#071b33] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:border-[#b87586]"
                  />

                  <input
                    name="Work Image 2"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#071b33] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:border-[#b87586]"
                  />

                  <input
                    name="Work Image 3"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#071b33] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white hover:border-[#b87586]"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-6">
              <SectionTitle
                number="05"
                title="Experience Summary"
                description="Briefly tell us about your work history and the opportunity you want."
              />

              <textarea
                name="Message / Work Experience Summary"
                rows={6}
                placeholder="Tell us about your experience, previous workplaces, strengths, and the kind of job you are looking for."
                className="w-full resize-none rounded-xl border border-[#ead5db] bg-white px-4 py-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
              />
            </section>
          </div>

          <div className="border-t border-[#ead5db] bg-[#071b33] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <p className="text-sm leading-7 text-white/70">
                By submitting this form, you agree that Salons Assured Kenya may
                review your details and contact you when a suitable opportunity
                is available. Submission does not guarantee employment.
              </p>

              <button
                type="submit"
                className="group relative h-14 overflow-hidden rounded-full bg-[#d9a3af] px-8 text-sm font-extrabold text-[#071b33] shadow-[0_18px_45px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_60px_rgba(217,163,175,0.35)] active:translate-y-0"
              >
                <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/60 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
                <span className="relative">Submit Application</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}