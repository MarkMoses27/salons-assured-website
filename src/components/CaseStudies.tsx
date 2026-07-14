import CaseStudiesClient from "@/components/CaseStudiesClient";
import { getFeaturedFallbackCaseStudies } from "@/data/caseStudies";
import { client } from "@/sanity/lib/client";
import { HOME_CASE_STUDIES_QUERY } from "@/sanity/lib/caseStudyQueries";
import type { CaseStudy } from "@/types/caseStudy";

const fetchOptions = {
  next: {
    revalidate: 60,
  },
};

export default async function CaseStudies() {
  let cmsCaseStudies: CaseStudy[] = [];

  try {
    cmsCaseStudies =
      await client.fetch<CaseStudy[]>(
        HOME_CASE_STUDIES_QUERY,
        {},
        fetchOptions,
      );
  } catch {
    cmsCaseStudies = [];
  }

  const studies =
    cmsCaseStudies.length > 0
      ? cmsCaseStudies.slice(0, 3)
      : getFeaturedFallbackCaseStudies();

  return (
    <CaseStudiesClient
      studies={studies}
    />
  );
}