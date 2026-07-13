import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

const validateArticleLink = (
  value: string | undefined,
) => {
  if (!value) {
    return true;
  }

  const isAllowed =
    value.startsWith("/") ||
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:");

  return isAllowed
    ? true
    : "Use an internal link such as /contact or a complete https:// address.";
};

export const articleContent = defineType({
  name: "articleContent",
  title: "Article Content",
  type: "array",

  of: [
    defineArrayMember({
      type: "block",
      title: "Text",

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
          title: "Simple Quote",
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
                type: "string",

                description:
                  "Use /contact for an internal page or a complete https:// address.",

                validation: (Rule) =>
                  Rule.required().custom(
                    validateArticleLink,
                  ),
              }),

              defineField({
                name: "openInNewTab",
                title: "Open in New Tab",
                type: "boolean",
                initialValue: false,
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

          description:
            "Describe what is visible in the image for accessibility.",

          validation: (Rule) =>
            Rule.required().error(
              "Alternative text is required.",
            ),
        }),

        defineField({
          name: "caption",
          title: "Image Caption",
          type: "string",

          validation: (Rule) =>
            Rule.max(180).warning(
              "Keep the image caption below 180 characters.",
            ),
        }),

        defineField({
          name: "displaySize",
          title: "Image Display Size",
          type: "string",

          options: {
            layout: "radio",

            list: [
              {
                title: "Normal Reading Width",
                value: "normal",
              },
              {
                title: "Wide",
                value: "wide",
              },
              {
                title: "Full Article Width",
                value: "full",
              },
            ],
          },

          initialValue: "normal",
        }),
      ],

      preview: {
        select: {
          media: "asset",
          alt: "alt",
          caption: "caption",
        },

        prepare({media, alt, caption}) {
          return {
            title:
              caption ||
              alt ||
              "Article Image",
            subtitle: "Article Image",
            media,
          };
        },
      },
    }),

    defineArrayMember({
      type: "highlightCallout",
    }),

    defineArrayMember({
      type: "statisticsSection",
    }),

    defineArrayMember({
      type: "imageTextSection",
    }),

    defineArrayMember({
      type: "editorialQuote",
    }),

    defineArrayMember({
      type: "actionSection",
    }),

    defineArrayMember({
      type: "servicePromotion",
    }),
  ],
});