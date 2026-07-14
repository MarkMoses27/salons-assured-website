import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Sparkles,
  Target,
} from "lucide-react";

import { fallbackCaseStudies } from "@/data/caseStudies";
import { client } from "@/sanity/lib/client";
import { ALL_CASE_STUDIES_QUERY } from "@/sanity/lib/caseStudyQueries";
import type { CaseStudy } from "@/types/caseStudy";

export const metadata: Metadata = {
  title:
    "Beauty Business Case Studies | Salons Assured Kenya",

  description:
    "Explore selected Salons Assured engagements across staff assessment, business systems, leadership, governance and premium beauty business operations.",
};

export const revalidate = 60;

const fetchOptions = {
  next: {
    revalidate: 60,
  },
};

export default async function CaseStudiesPage() {
  let cmsCaseStudies: CaseStudy[] = [];

  try {
    cmsCaseStudies =
      await client.fetch<CaseStudy[]>(
        ALL_CASE_STUDIES_QUERY,
        {},
        fetchOptions,
      );
  } catch {
    cmsCaseStudies = [];
  }

  const studies =
    cmsCaseStudies.length > 0
      ? cmsCaseStudies
      : fallbackCaseStudies;

  return (
    <main className="overflow-hidden bg-[#f7f2f3] text-[#071b33]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#071b33]/10 bg-[#071b33] pb-16 pt-24 text-white sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-52 -top-52 h-[540px] w-[540px] rounded-full border border-white/[0.06]" />

          <div className="absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full border border-[#d9a3af]/12" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_5%,rgba(184,117,134,0.22),transparent_33%)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#d9a3af]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to homepage
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#d9a3af]" />

                <p className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#d9a3af]">
                  Client Work
                </p>
              </div>

              <h1 className="mt-7 max-w-[950px] [font-family:var(--font-display)] text-[54px] font-semibold leading-[0.9] tracking-[-0.058em] sm:text-[72px] lg:text-[94px]">
                Business challenges.
                <span className="ml-3 font-medium italic text-[#d9a3af]">
                  Structured responses.
                </span>
              </h1>
            </div>

            <div className="border-l border-white/[0.14] pl-6">
              <p className="text-[15px] leading-8 text-white/55">
                Selected engagements
                demonstrating how Salons
                Assured works across people,
                systems, leadership and
                operational structure in the
                beauty industry.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <BadgeCheck
                  className="h-4 w-4 text-[#d9a3af]"
                  strokeWidth={1.8}
                />

                <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-white/35">
                  Published information only
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-5 border-t border-white/[0.12] pt-6">
            <span className="[font-family:var(--font-display)] text-[32px] font-semibold text-[#d9a3af]">
              {String(
                studies.length,
              ).padStart(2, "0")}
            </span>

            <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-white/40">
              Selected engagements
            </span>
          </div>
        </div>
      </section>

      {/* CASE STUDY ARCHIVE */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="border-t border-[#071b33]/12">
          {studies.map(
            (study, index) => (
              <article
                id={study.slug}
                key={study._id}
                className="grid gap-8 border-b border-[#071b33]/12 py-12 lg:grid-cols-[110px_0.75fr_1.25fr] lg:gap-12 lg:py-16"
              >
                <div>
                  <span className="[font-family:var(--font-display)] text-[54px] font-medium italic leading-none text-[#b87586]/35">
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                    {study.engagement}
                  </p>

                  <h2 className="mt-5 [font-family:var(--font-display)] text-[38px] font-semibold leading-[0.95] tracking-[-0.043em] sm:text-[46px]">
                    {study.title}
                  </h2>

                  <p className="mt-5 text-[14px] font-semibold text-[#071b33]/70">
                    {study.displayName}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-[#071b33]/45">
                    <span>
                      {study.sector}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#b87586]" />

                    <span className="inline-flex items-center gap-2">
                      <MapPin
                        className="h-3.5 w-3.5 text-[#b87586]"
                        strokeWidth={1.8}
                      />

                      {study.location}
                    </span>
                  </div>

                  <p className="mt-7 text-[13px] leading-7 text-[#071b33]/58">
                    {study.summary}
                  </p>
                </div>

                <div>
                  <div className="grid border-y border-[#071b33]/10 lg:grid-cols-3">
                    <div className="border-b border-[#071b33]/10 py-7 lg:border-b-0 lg:border-r lg:pr-7">
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#071b33]/35">
                        Challenge
                      </p>

                      <p className="mt-4 text-[12px] leading-6 text-[#071b33]/58">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="border-b border-[#071b33]/10 py-7 lg:border-b-0 lg:border-r lg:px-7">
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#071b33]/35">
                        SAK Intervention
                      </p>

                      <p className="mt-4 text-[12px] leading-6 text-[#071b33]/58">
                        {
                          study.intervention
                        }
                      </p>
                    </div>

                    <div className="py-7 lg:pl-7">
                      <p className="text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#071b33]/35">
                        Business Value
                      </p>

                      <p className="mt-4 text-[12px] leading-6 text-[#071b33]/58">
                        {
                          study.businessValue
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center gap-3">
                      <Target
                        className="h-4 w-4 text-[#b87586]"
                        strokeWidth={1.8}
                      />

                      <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#071b33]/35">
                        Engagement Outputs
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {study.outputs.map(
                        (output) => (
                          <span
                            key={output}
                            className="rounded-full border border-[#071b33]/10 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#071b33]/50"
                          >
                            {output}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#d9a3af] px-5 py-16 text-[#071b33] sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4" />

              <p className="text-[9px] font-extrabold uppercase tracking-[0.26em]">
                Your business challenge
              </p>
            </div>

            <h2 className="mt-6 max-w-[850px] [font-family:var(--font-display)] text-[44px] font-semibold leading-[0.93] tracking-[-0.048em] sm:text-[60px]">
              Let’s turn it into a clearer
              plan of action.
            </h2>
          </div>

          <Link
            href="/contact"
            className="group inline-flex h-[54px] items-center justify-center gap-4 self-start rounded-full bg-[#071b33] px-7 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white lg:self-auto"
          >
            Discuss your business

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}