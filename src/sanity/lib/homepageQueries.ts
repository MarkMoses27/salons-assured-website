import { defineQuery } from "next-sanity";

export const HOME_INSIGHTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,

    coverImage {
      "url": asset->url,
      alt
    },

    "categories": categories[]->{
      title
    }
  }
`);