import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Request Beauty Staff | Salons Assured Kenya Ltd",
  description:
    "Request salon, spa, barbershop, nail, hair, beauty, front desk, sales and management staff through Salons Assured Kenya Ltd.",
};

const businessTypes = [
  "Salon",
  "Spa",
  "Barbershop",
  "Nail Studio",
  "Beauty Studio",
  "Salon & Spa",
  "Barbershop & Spa",
  "Cosmetics / Beauty Retail",
  "New Beauty Business",
  "Other",
];

const staffRoles = [
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
  "Other",
];

const requirements = [
  "Experienced staff only",
  "Junior staff accepted",
  "Must have portfolio/photos",
  "Must have certificates",
  "Must be good with clients",
  "Must be strong in sales",
  "Must work weekends",
  "Must start immediately",
  "Must be trainable",
];

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
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

export default function RequestStaffPage() {
  return (
    <main className="min-h-screen bg-[#fbf4f6] px-5 py-16 sm:px-6 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
            For Salon, Spa & Beauty Business Owners
          </p>

          <h1 className="mt-4 font-serif text-[42px] font-black leading-tight tracking-[-0.045em] text-[#071b33] sm:text-[58px]">
            Request Beauty Staff for Your Business
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[16px]">
            This form is for salon owners, spa owners, barbershop owners,
            beauty investors and managers who need qualified staff. Tell us what
            you need and our recruitment team will contact you.
          </p>
        </div>

        <form
          action="https://formsubmit.co/salonsassuredsupportbusiness@gmail.com"
          method="POST"
          className="overflow-hidden rounded-[2rem] border border-[#ead5db] bg-white shadow-[0_30px_90px_rgba(7,27,51,0.09)]"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Staff Request - Salons Assured Kenya"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value="https://www.salonsassured.com/request-staff-success"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" />

          <div className="grid gap-10 p-6 sm:p-8 lg:p-10">
            {/* 01 Business Details */}
            <section className="grid gap-6">
              <SectionTitle
                number="01"
                title="Business Details"
                description="Tell us about your salon, spa, barbershop or beauty business."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Business Name</FieldLabel>
                  <input
                    name="Business Name"
                    type="text"
                    required
                    placeholder="e.g. Glam Beauty Salon"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel required>Business Type</FieldLabel>
                  <select
                    name="Business Type"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select business type
                    </option>

                    {businessTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel required>Business Location</FieldLabel>
                  <input
                    name="Business Location"
                    type="text"
                    required
                    placeholder="e.g. Kilimani, CBD, Runda, Ngong Road"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Branch / Area Details</FieldLabel>
                  <input
                    name="Branch / Area Details"
                    type="text"
                    placeholder="e.g. Inside mall, along main road, estate branch"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>
              </div>
            </section>

            {/* 02 Contact Person */}
            <section className="grid gap-6">
              <SectionTitle
                number="02"
                title="Contact Person"
                description="Who should our recruitment team contact about this request?"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Contact Person Name</FieldLabel>
                  <input
                    name="Contact Person Name"
                    type="text"
                    required
                    placeholder="Full name"
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
                    placeholder="e.g. business@email.com"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Position / Role</FieldLabel>
                  <input
                    name="Contact Person Position"
                    type="text"
                    placeholder="Owner, Manager, HR, Director..."
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>
              </div>
            </section>

            {/* 03 Staff Needed */}
            <section className="grid gap-6">
              <SectionTitle
                number="03"
                title="Staff Needed"
                description="Select the type of staff you are looking for."
              />

              <div className="grid gap-3 rounded-[1.5rem] border border-[#ead5db] bg-[#fbf4f6] p-5 sm:grid-cols-2 lg:grid-cols-3">
                {staffRoles.map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[#ead5db]/70 transition duration-300 hover:-translate-y-0.5 hover:ring-[#d9a3af]"
                  >
                    <input
                      type="checkbox"
                      name="Staff Needed"
                      value={role}
                      className="h-4 w-4 rounded border-[#d9a3af] accent-[#b87586]"
                    />
                    {role}
                  </label>
                ))}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Number of Staff Needed</FieldLabel>
                  <input
                    name="Number of Staff Needed"
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 3"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel required>Experience Level Required</FieldLabel>
                  <select
                    name="Experience Level Required"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select experience level
                    </option>
                    <option>Junior</option>
                    <option>Intermediate</option>
                    <option>Senior</option>
                    <option>Managerial</option>
                    <option>Open to all levels</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 04 Employment Details */}
            <section className="grid gap-6">
              <SectionTitle
                number="04"
                title="Employment Details"
                description="Help us understand the working arrangement and offer structure."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel required>Employment Type</FieldLabel>
                  <select
                    name="Employment Type"
                    required
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  >
                    <option value="" disabled>
                      Select employment type
                    </option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Commission based</option>
                    <option>Contract</option>
                    <option>Internship / Trainee</option>
                    <option>Open to discuss</option>
                  </select>
                </div>

                <div>
                  <FieldLabel required>Preferred Start Date</FieldLabel>
                  <input
                    name="Preferred Start Date"
                    type="date"
                    required
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Salary / Commission Structure</FieldLabel>
                  <input
                    name="Salary / Commission Structure"
                    type="text"
                    placeholder="e.g. Basic + commission, commission only, fixed salary"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>

                <div>
                  <FieldLabel>Expected Working Days / Hours</FieldLabel>
                  <input
                    name="Expected Working Days / Hours"
                    type="text"
                    placeholder="e.g. Mon-Sat, weekends, shifts, 8am-7pm"
                    className="h-14 w-full rounded-xl border border-[#ead5db] bg-white px-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
                  />
                </div>
              </div>
            </section>

            {/* 05 Special Requirements */}
            <section className="grid gap-6">
              <SectionTitle
                number="05"
                title="Special Requirements"
                description="Select any important requirements for the candidates."
              />

              <div className="grid gap-3 rounded-[1.5rem] border border-[#ead5db] bg-[#fbf4f6] p-5 sm:grid-cols-2 lg:grid-cols-3">
                {requirements.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[#ead5db]/70 transition duration-300 hover:-translate-y-0.5 hover:ring-[#d9a3af]"
                  >
                    <input
                      type="checkbox"
                      name="Special Requirements"
                      value={item}
                      className="h-4 w-4 rounded border-[#d9a3af] accent-[#b87586]"
                    />
                    {item}
                  </label>
                ))}
              </div>

              <textarea
                name="Additional Staff Requirements"
                rows={6}
                placeholder="Tell us more about the staff you need, skills required, location details, salary range, urgency, or any special expectations."
                className="w-full resize-none rounded-xl border border-[#ead5db] bg-white px-4 py-4 text-sm text-[#071b33] outline-none transition placeholder:text-slate-400 focus:border-[#b87586] focus:ring-4 focus:ring-[#f4dfe5]"
              />
            </section>
          </div>

          {/* Submit Area */}
          <div className="border-t border-[#ead5db] bg-[#071b33] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <p className="text-sm leading-7 text-white/70">
                By submitting this request, you agree that Salons Assured Kenya
                may review your staffing needs and contact you with recruitment
                support options. Submission does not guarantee immediate staff
                placement.
              </p>

              <button
                type="submit"
                className="group relative h-14 overflow-hidden rounded-full bg-[#d9a3af] px-8 text-sm font-extrabold text-[#071b33] shadow-[0_18px_45px_rgba(217,163,175,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_60px_rgba(217,163,175,0.35)] active:translate-y-0"
              >
                <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/60 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
                <span className="relative">Submit Staff Request</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}