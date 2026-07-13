import {defineField, defineType} from "sanity";

export const category = defineType({
  name: "category",
  title: "Blog Categories",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(2).error("Category name is required"),
    }),

    defineField({
      name: "slug",
      title: "Category Slug",
      type: "slug",
      description: "Click Generate to create the category URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(300).warning(
          "Keep the category description below 300 characters",
        ),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});