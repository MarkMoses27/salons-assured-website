import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",

  groups: [
    {
      name: "identity",
      title: "Client & Engagement",
      default: true,
    },
    {
      name: "story",
      title: "Case Study Story",
    },
    {
      name: "placement",
      title: "Website Placement",
    },
    {
      name: "publishing",
      title: "Publishing & Approval",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "internalClientName",
      title: "Internal Client Name",
      type: "string",
      group: "identity",

      description:
        "The real company name for internal reference. It will only appear publicly when client-name approval is enabled.",

      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100),
    }),

    defineField({
      name: "publicClientName",
      title: "Public Display Name",
      type: "string",
      group: "identity",

      description:
        "Use an approved company name or a confidential description such as Premium Salon Group — Nairobi.",

      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100),
    }),

    defineField({
      name: "clientNameApproved",
      title: "Client Name Approved for Public Use",
      type: "boolean",
      group: "publishing",

      description:
        "Enable only after the client has approved public use of their company name.",

      initialValue: false,
    }),

    defineField({
      name: "title",
      title: "Case Study Title",
      type: "string",
      group: "identity",

      description:
        "Describe the engagement or transformation rather than simply repeating the company name.",

      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(120),
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "identity",

      options: {
        source: "title",
        maxLength: 96,
      },

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "engagement",
      title: "Engagement Type",
      type: "string",
      group: "identity",

      options: {
        list: [
          {
            title: "Staff Assessment",
            value: "Staff Assessment",
          },
          {
            title: "Business Systems",
            value: "Business Systems",
          },
          {
            title: "Leadership & Governance",
            value: "Leadership & Governance",
          },
          {
            title: "Business Setup",
            value: "Business Setup",
          },
          {
            title: "Training & Development",
            value: "Training & Development",
          },
          {
            title: "Recruitment",
            value: "Recruitment",
          },
          {
            title: "Growth Advisory",
            value: "Growth Advisory",
          },
          {
            title: "Digital Growth",
            value: "Digital Growth",
          },
        ],
      },

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "sector",
      title: "Strategic Focus",
      type: "string",
      group: "identity",

      description:
        "Examples: People & Performance, Systems & Governance, Leadership & Growth.",

      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(80),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "identity",

      initialValue: "Kenya",

      validation: (Rule) =>
        Rule.required()
          .max(80),
    }),

    defineField({
      name: "summary",
      title: "Executive Summary",
      type: "text",
      rows: 4,
      group: "story",

      description:
        "A concise overview used on the homepage and case studies page.",

      validation: (Rule) =>
        Rule.required()
          .min(60)
          .max(260),
    }),

    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 5,
      group: "story",

      validation: (Rule) =>
        Rule.required()
          .min(80)
          .max(700),
    }),

    defineField({
      name: "intervention",
      title: "SAK Intervention",
      type: "text",
      rows: 6,
      group: "story",

      validation: (Rule) =>
        Rule.required()
          .min(80)
          .max(900),
    }),

    defineField({
      name: "businessValue",
      title: "Business Value Created",
      type: "text",
      rows: 5,
      group: "story",

      description:
        "Explain the practical value without making unverified financial or performance claims.",

      validation: (Rule) =>
        Rule.required()
          .min(70)
          .max(700),
    }),

    defineField({
      name: "outputs",
      title: "Engagement Outputs",
      type: "array",
      group: "story",

      of: [
        defineArrayMember({
          type: "string",
        }),
      ],

      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(8)
          .error(
            "Add between two and eight engagement outputs.",
          ),
    }),

    defineField({
      name: "verifiedResults",
      title: "Verified Results",
      type: "array",
      group: "story",

      description:
        "Optional. Only add results that have been verified and approved for publication.",

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "value",
              title: "Result Value",
              type: "string",

              validation: (Rule) =>
                Rule.required()
                  .max(30),
            }),

            defineField({
              name: "label",
              title: "Result Label",
              type: "string",

              validation: (Rule) =>
                Rule.required()
                  .max(100),
            }),
          ],

          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        }),
      ],

      validation: (Rule) =>
        Rule.max(4),
    }),

    defineField({
      name: "coverImage",
      title: "Case Study Image",
      type: "image",
      group: "story",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",

          validation: (Rule) =>
            Rule.required(),
        }),

        defineField({
          name: "caption",
          title: "Image Caption",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "featuredOnHomepage",
      title: "Feature on Homepage",
      type: "boolean",
      group: "placement",

      description:
        "The homepage displays a maximum of three case studies.",

      initialValue: false,
    }),

    defineField({
      name: "homepageOrder",
      title: "Homepage Position",
      type: "number",
      group: "placement",

      description:
        "Use position 1, 2 or 3.",

      hidden: ({ parent }) =>
        !parent?.featuredOnHomepage,

      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .max(3),
    }),

    defineField({
      name: "displayOrder",
      title: "Case Studies Page Position",
      type: "number",
      group: "placement",

      initialValue: 10,

      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(999),
    }),

    defineField({
      name: "approvedForPublication",
      title: "Approved for Publication",
      type: "boolean",
      group: "publishing",

      description:
        "Enable after checking that the information is safe and approved for the public website.",

      initialValue: false,
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "publishing",

      initialValue: () =>
        new Date().toISOString(),

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",

      validation: (Rule) =>
        Rule.max(60).warning(
          "SEO titles should normally remain below 60 characters.",
        ),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",

      validation: (Rule) =>
        Rule.max(160).warning(
          "SEO descriptions should normally remain below 160 characters.",
        ),
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",

      by: [
        {
          field: "displayOrder",
          direction: "asc",
        },
      ],
    },

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
  ],

  preview: {
    select: {
      internalClientName:
        "internalClientName",
      publicClientName:
        "publicClientName",
      engagement: "engagement",
      approvedForPublication:
        "approvedForPublication",
      featuredOnHomepage:
        "featuredOnHomepage",
      media: "coverImage",
    },

    prepare({
      internalClientName,
      publicClientName,
      engagement,
      approvedForPublication,
      featuredOnHomepage,
      media,
    }) {
      const publicationLabel =
        approvedForPublication
          ? "Approved"
          : "Not approved";

      const placementLabel =
        featuredOnHomepage
          ? "Homepage"
          : "Archive";

      return {
        title:
          internalClientName ||
          publicClientName,

        subtitle: `${
          engagement || "Case study"
        } • ${publicationLabel} • ${placementLabel}`,

        media,
      };
    },
  },
});