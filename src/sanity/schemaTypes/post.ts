import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Article Content",
      default: true,
    },
    {
      name: "editorial",
      title: "Editorial Placement",
    },
    {
      name: "publishing",
      title: "Publishing",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      group: "content",

      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(120)
          .error(
            "Enter an article title between 10 and 120 characters",
          ),
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",

      description:
        "Click Generate to create the website URL from the article title.",

      options: {
        source: "title",
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Article Summary",
      type: "text",
      rows: 4,
      group: "content",

      description:
        "A short introduction displayed on the blog page and in search results.",

      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(220)
          .error(
            "The summary should be between 50 and 220 characters",
          ),
    }),

    defineField({
      name: "coverImage",
      title: "Featured Image",
      type: "image",
      group: "content",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",

          description:
            "Describe what is visible in the image for accessibility and SEO.",

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "caption",
          title: "Image Caption",
          type: "string",
        }),
      ],

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Article Content",
      type: "array",
      group: "content",

      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("The article must have content"),

      of: [
        defineArrayMember({
          type: "block",

          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "Heading 2 — Main Section",
              value: "h2",
            },
            {
              title: "Heading 3 — Subsection",
              value: "h3",
            },
            {
              title: "Heading 4 — Small Heading",
              value: "h4",
            },
            {
              title: "Editorial Quote",
              value: "blockquote",
            },
          ],

          lists: [
            {
              title: "Bullet List",
              value: "bullet",
            },
            {
              title: "Numbered List",
              value: "number",
            },
          ],

          marks: {
            decorators: [
              {
                title: "Bold",
                value: "strong",
              },
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Underline",
                value: "underline",
              },
            ],

            annotations: [
              {
                name: "link",
                title: "Website Link",
                type: "object",

                fields: [
                  defineField({
                    name: "href",
                    title: "Website Address",
                    type: "url",

                    validation: (Rule) =>
                      Rule.uri({
                        scheme: [
                          "http",
                          "https",
                          "mailto",
                          "tel",
                        ],
                      }),
                  }),

                  defineField({
                    name: "openInNewTab",
                    title: "Open in New Tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: "image",
          title: "Article Image",

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "caption",
              title: "Image Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "editorialPlacement",
      title: "Website Placement",
      type: "string",
      group: "editorial",

      description:
        "Choose how prominently this article should appear on the main blog page.",

      options: {
        layout: "radio",

        list: [
          {
            title: "Standard Article",
            value: "standard",
          },
          {
            title: "Featured Story",
            value: "featured",
          },
          {
            title: "Cover Story",
            value: "cover",
          },
        ],
      },

      initialValue: "standard",

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "featuredOrder",
      title: "Featured Story Position",
      type: "number",
      group: "editorial",

      description:
        "Use 1 for the first featured story and 2 for the second featured story.",

      hidden: ({parent}) =>
        parent?.editorialPlacement !== "featured",

      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .max(2)
          .error("Featured position must be 1 or 2"),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "publishing",
      to: [{type: "author"}],

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "publishing",

      of: [
        defineArrayMember({
          type: "reference",
          to: [{type: "category"}],
        }),
      ],

      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Select at least one category"),
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "publishing",

      initialValue: () => new Date().toISOString(),

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",

      description:
        "Optional. Leave empty to use the article title automatically.",

      validation: (Rule) =>
        Rule.max(60).warning(
          "SEO titles should normally be below 60 characters",
        ),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",

      description:
        "Optional. Leave empty to use the article summary automatically.",

      validation: (Rule) =>
        Rule.max(160).warning(
          "SEO descriptions should normally be below 160 characters",
        ),
    }),

    defineField({
      name: "seoImage",
      title: "Social Sharing Image",
      type: "image",
      group: "seo",

      description:
        "Optional. Leave empty to use the featured image automatically.",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",

      by: [
        {
          field: "publishedAt",
          direction: "desc",
        },
      ],
    },
    {
      title: "Oldest First",
      name: "publishedAtAsc",

      by: [
        {
          field: "publishedAt",
          direction: "asc",
        },
      ],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",

      by: [
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      publishedAt: "publishedAt",
      placement: "editorialPlacement",
    },

    prepare({
      title,
      author,
      media,
      publishedAt,
      placement,
    }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-KE")
        : "No publication date";

      const placementLabel =
        placement === "cover"
          ? "Cover Story"
          : placement === "featured"
            ? "Featured Story"
            : "Standard Article";

      return {
        title,
        subtitle: `${placementLabel} • ${
          author || "No author"
        } • ${date}`,
        media,
      };
    },
  },
});