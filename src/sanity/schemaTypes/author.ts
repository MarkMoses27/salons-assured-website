import {defineField, defineType} from "sanity";

export const author = defineType({
  name: "author",
  title: "Authors",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(2).error("Author name is required"),
    }),

    defineField({
      name: "slug",
      title: "Author Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role or Position",
      type: "string",
      description:
        "Example: Beauty Business Consultant, Trainer or SAK Editorial Team",
    }),

    defineField({
      name: "image",
      title: "Author Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the photo for accessibility and SEO.",
        }),
      ],
    }),

    defineField({
      name: "bio",
      title: "Short Biography",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(400),
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.email().error("Enter a valid email address"),
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn Profile",
      type: "url",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});