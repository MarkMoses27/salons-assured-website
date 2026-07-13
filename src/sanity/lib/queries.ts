import {defineQuery} from "next-sanity";

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "category" &&
    defined(slug.current) &&
    count(
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now() &&
        references(^._id)
      ]
    ) > 0
  ]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current,

    "postCount": count(
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now() &&
        references(^._id)
      ]
    )
  }
`);

export const BLOG_EDITORIAL_QUERY = defineQuery(`
  {
    "coverPost": *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        $categorySlug == "" ||
        $categorySlug in categories[]->slug.current
      ) &&
      editorialPlacement == "cover"
    ]
    | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      editorialPlacement,
      featuredOrder,

      coverImage {
        ...,
        alt,
        caption
      },

      "author": author->{
        _id,
        name,
        role
      },

      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    },

    "legacyFeaturedPost": *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        $categorySlug == "" ||
        $categorySlug in categories[]->slug.current
      ) &&
      featured == true
    ]
    | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      editorialPlacement,
      featuredOrder,

      coverImage {
        ...,
        alt,
        caption
      },

      "author": author->{
        _id,
        name,
        role
      },

      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    },

    "featuredPosts": *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        $categorySlug == "" ||
        $categorySlug in categories[]->slug.current
      ) &&
      editorialPlacement == "featured"
    ]
    | order(featuredOrder asc, publishedAt desc)[0...2] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      editorialPlacement,
      featuredOrder,

      coverImage {
        ...,
        alt,
        caption
      },

      "author": author->{
        _id,
        name,
        role
      },

      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    },

    "fallbackPosts": *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        $categorySlug == "" ||
        $categorySlug in categories[]->slug.current
      )
    ]
    | order(publishedAt desc)[0...8] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      editorialPlacement,
      featuredOrder,

      coverImage {
        ...,
        alt,
        caption
      },

      "author": author->{
        _id,
        name,
        role
      },

      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
  }
`);

export const BLOG_POSTS_COUNT_QUERY = defineQuery(`
  count(
    *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        $categorySlug == "" ||
        $categorySlug in categories[]->slug.current
      ) &&
      !(_id in $excludedIds)
    ]
  )
`);

export const BLOG_POSTS_PAGE_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    (
      $categorySlug == "" ||
      $categorySlug in categories[]->slug.current
    ) &&
    !(_id in $excludedIds)
  ]
  | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    editorialPlacement,

    coverImage {
      ...,
      alt,
      caption
    },

    "author": author->{
      _id,
      name,
      role
    },

    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    editorialPlacement,
    featuredOrder,

    coverImage {
      ...,
      alt,
      caption
    },

    "author": author->{
      _id,
      name,
      role
    },

    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const POST_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    editorialPlacement,
    featuredOrder,

    coverImage {
      ...,
      alt,
      caption
    },

    body[] {
      ...,

      _type == "image" => {
        ...,

        asset->{
          url,

          metadata {
            dimensions
          }
        }
      }
    },

    seoTitle,
    seoDescription,

    seoImage {
      ...
    },

    "author": author->{
      _id,
      name,
      role,
      bio,
      email,
      linkedIn,
      image
    },

    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] {
    "slug": slug.current
  }
`);