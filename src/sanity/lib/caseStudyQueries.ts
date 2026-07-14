import { defineQuery } from "next-sanity";

const CASE_STUDY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  engagement,
  sector,
  location,
  summary,
  challenge,
  intervention,
  businessValue,
  outputs,
  verifiedResults,
  featuredOnHomepage,
  homepageOrder,
  displayOrder,
  publishedAt,

  "displayName": select(
    clientNameApproved == true => internalClientName,
    publicClientName
  )
`;

export const HOME_CASE_STUDIES_QUERY =
  defineQuery(`
    *[
      _type == "caseStudy" &&
      approvedForPublication == true &&
      featuredOnHomepage == true &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ]
    | order(
        homepageOrder asc,
        publishedAt desc
      )[0...3] {
      ${CASE_STUDY_FIELDS}
    }
  `);

export const ALL_CASE_STUDIES_QUERY =
  defineQuery(`
    *[
      _type == "caseStudy" &&
      approvedForPublication == true &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ]
    | order(
        displayOrder asc,
        publishedAt desc
      ) {
      ${CASE_STUDY_FIELDS}
    }
  `);