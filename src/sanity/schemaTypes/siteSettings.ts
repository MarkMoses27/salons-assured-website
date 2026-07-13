import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    {
      name: "company",
      title: "Company",
      default: true,
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "address",
      title: "Address",
    },
    {
      name: "social",
      title: "Social Media",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "company",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "company",
    }),

    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      rows: 4,
      group: "company",
    }),

    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      group: "company",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "email",
      title: "Primary Email",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.required().email().error("Enter a valid email address"),
    }),

    defineField({
      name: "supportEmail",
      title: "Support Email",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.email().error("Enter a valid email address"),
    }),

    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "array",
      group: "contact",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      group: "address",
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "address",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "address",
      initialValue: "Kenya",
    }),

    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Link",
      type: "url",
      group: "address",
    }),

    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "openGraphImage",
      title: "Default Social Sharing Image",
      type: "image",
      group: "seo",
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Salons Assured Kenya Website Settings",
        subtitle: "Company, contact and SEO settings",
      };
    },
  },
});