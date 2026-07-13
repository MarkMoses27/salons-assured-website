import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

const internalOrExternalLinkValidation = (
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
    : "Use an internal path such as /contact or a complete https:// address.";
};

export const highlightCallout = defineType({
  name: "highlightCallout",
  title: "Highlight Callout",
  type: "object",

  fields: [
    defineField({
      name: "tone",
      title: "Callout Style",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "Key Insight",
            value: "insight",
          },
          {
            title: "Practical Tip",
            value: "tip",
          },
          {
            title: "Important Note",
            value: "important",
          },
          {
            title: "Warning",
            value: "warning",
          },
        ],
      },

      initialValue: "insight",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Small Label",
      type: "string",

      description:
        "Optional label such as Key Insight, Management Tip or Important.",

      validation: (Rule) =>
        Rule.max(40).warning(
          "Keep the small label below 40 characters.",
        ),
    }),

    defineField({
      name: "title",
      title: "Callout Title",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error(
            "Enter a callout title between 5 and 100 characters.",
          ),
    }),

    defineField({
      name: "text",
      title: "Callout Text",
      type: "text",
      rows: 5,

      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(500)
          .error(
            "Enter callout text between 20 and 500 characters.",
          ),
    }),
  ],

  preview: {
    select: {
      title: "title",
      tone: "tone",
      eyebrow: "eyebrow",
    },

    prepare({title, tone, eyebrow}) {
      const toneLabel =
        tone === "tip"
          ? "Practical Tip"
          : tone === "important"
            ? "Important Note"
            : tone === "warning"
              ? "Warning"
              : "Key Insight";

      return {
        title: title || "Untitled callout",
        subtitle: `${eyebrow || toneLabel} • Highlight Callout`,
      };
    },
  },
});

export const statisticsSection = defineType({
  name: "statisticsSection",
  title: "Statistics Section",
  type: "object",

  fields: [
    defineField({
      name: "theme",
      title: "Section Style",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "Light",
            value: "light",
          },
          {
            title: "Soft Pink",
            value: "blush",
          },
          {
            title: "Navy",
            value: "navy",
          },
        ],
      },

      initialValue: "light",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Small Label",
      type: "string",

      description:
        "Optional label such as Business Impact, Key Findings or By the Numbers.",

      validation: (Rule) =>
        Rule.max(50).warning(
          "Keep the small label below 50 characters.",
        ),
    }),

    defineField({
      name: "title",
      title: "Section Title",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error(
            "Enter a section title between 5 and 100 characters.",
          ),
    }),

    defineField({
      name: "intro",
      title: "Short Introduction",
      type: "text",
      rows: 3,

      validation: (Rule) =>
        Rule.max(280).warning(
          "Keep the introduction below 280 characters.",
        ),
    }),

    defineField({
      name: "items",
      title: "Statistics",
      type: "array",

      of: [
        defineArrayMember({
          name: "statistic",
          title: "Statistic",
          type: "object",

          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",

              description:
                "Examples: 70%, 3×, 150+, KES 50K.",

              validation: (Rule) =>
                Rule.required()
                  .max(20)
                  .error(
                    "Enter a short statistic value.",
                  ),
            }),

            defineField({
              name: "label",
              title: "Label",
              type: "string",

              validation: (Rule) =>
                Rule.required()
                  .min(3)
                  .max(70)
                  .error(
                    "Enter a statistic label between 3 and 70 characters.",
                  ),
            }),

            defineField({
              name: "description",
              title: "Explanation",
              type: "text",
              rows: 2,

              validation: (Rule) =>
                Rule.max(180).warning(
                  "Keep the explanation below 180 characters.",
                ),
            }),
          ],

          preview: {
            select: {
              value: "value",
              label: "label",
            },

            prepare({value, label}) {
              return {
                title: value || "New statistic",
                subtitle: label || "No label added",
              };
            },
          },
        }),
      ],

      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(4)
          .error(
            "Add between two and four statistics.",
          ),
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },

    prepare({title, items}) {
      const count = Array.isArray(items)
        ? items.length
        : 0;

      return {
        title: title || "Untitled statistics section",
        subtitle: `${count} statistic${count === 1 ? "" : "s"} • Statistics Section`,
      };
    },
  },
});

export const imageTextSection = defineType({
  name: "imageTextSection",
  title: "Image and Text Section",
  type: "object",

  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "White",
            value: "white",
          },
          {
            title: "Soft Pink",
            value: "blush",
          },
          {
            title: "Light Grey",
            value: "light",
          },
          {
            title: "Navy",
            value: "navy",
          },
        ],
      },

      initialValue: "white",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "Image on Left",
            value: "left",
          },
          {
            title: "Image on Right",
            value: "right",
          },
        ],
      },

      initialValue: "left",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Section Image",
      type: "image",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",

          validation: (Rule) =>
            Rule.required().error(
              "Add alternative text for accessibility.",
            ),
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
      name: "eyebrow",
      title: "Small Label",
      type: "string",

      validation: (Rule) =>
        Rule.max(50).warning(
          "Keep the small label below 50 characters.",
        ),
    }),

    defineField({
      name: "title",
      title: "Section Title",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(110)
          .error(
            "Enter a section title between 5 and 110 characters.",
          ),
    }),

    defineField({
      name: "body",
      title: "Section Content",
      type: "array",

      of: [
        defineArrayMember({
          type: "block",

          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "Small Heading",
              value: "h3",
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

                    validation: (Rule) =>
                      Rule.custom(
                        internalOrExternalLinkValidation,
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
      ],

      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Add content to the section."),
    }),

    defineField({
      name: "buttonLabel",
      title: "Button Text",
      type: "string",

      description:
        "Optional. Leave empty if the section does not need a button.",

      validation: (Rule) =>
        Rule.max(40).warning(
          "Keep button text below 40 characters.",
        ),
    }),

    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",

      description:
        "Examples: /contact, /services or https://example.com",

      hidden: ({parent}) =>
        !parent?.buttonLabel,

      validation: (Rule) =>
        Rule.custom(
          internalOrExternalLinkValidation,
        ),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      imagePosition: "imagePosition",
    },

    prepare({title, media, imagePosition}) {
      return {
        title: title || "Untitled image section",
        subtitle: `Image ${imagePosition === "right" ? "right" : "left"} • Image and Text Section`,
        media,
      };
    },
  },
});

export const editorialQuote = defineType({
  name: "editorialQuote",
  title: "Editorial Quote",
  type: "object",

  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 6,

      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(600)
          .error(
            "Enter a quote between 20 and 600 characters.",
          ),
    }),

    defineField({
      name: "name",
      title: "Person’s Name",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Add the speaker’s name."),
    }),

    defineField({
      name: "role",
      title: "Position or Role",
      type: "string",

      validation: (Rule) =>
        Rule.max(100).warning(
          "Keep the position below 100 characters.",
        ),
    }),

    defineField({
      name: "organization",
      title: "Organisation",
      type: "string",

      validation: (Rule) =>
        Rule.max(100).warning(
          "Keep the organisation below 100 characters.",
        ),
    }),

    defineField({
      name: "photo",
      title: "Person’s Photo",
      type: "image",

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

    defineField({
      name: "style",
      title: "Quote Style",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "Light",
            value: "light",
          },
          {
            title: "Soft Pink",
            value: "blush",
          },
          {
            title: "Navy",
            value: "navy",
          },
        ],
      },

      initialValue: "light",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      name: "name",
      role: "role",
      quote: "quote",
      media: "photo",
    },

    prepare({name, role, quote, media}) {
      const shortenedQuote =
        typeof quote === "string" &&
        quote.length > 75
          ? `${quote.slice(0, 75)}…`
          : quote;

      return {
        title: name || "Unnamed speaker",
        subtitle:
          role ||
          shortenedQuote ||
          "Editorial Quote",
        media,
      };
    },
  },
});

export const actionSection = defineType({
  name: "actionSection",
  title: "Action Section",
  type: "object",

  fields: [
    defineField({
      name: "tone",
      title: "Section Style",
      type: "string",

      options: {
        layout: "radio",

        list: [
          {
            title: "Navy",
            value: "navy",
          },
          {
            title: "Soft Pink",
            value: "blush",
          },
          {
            title: "Light",
            value: "light",
          },
        ],
      },

      initialValue: "navy",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Small Label",
      type: "string",

      validation: (Rule) =>
        Rule.max(50).warning(
          "Keep the small label below 50 characters.",
        ),
    }),

    defineField({
      name: "title",
      title: "Action Title",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(110)
          .error(
            "Enter an action title between 5 and 110 characters.",
          ),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,

      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(400)
          .error(
            "Enter a description between 20 and 400 characters.",
          ),
    }),

    defineField({
      name: "primaryButtonLabel",
      title: "Primary Button Text",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .max(40)
          .error(
            "Add primary button text.",
          ),
    }),

    defineField({
      name: "primaryButtonHref",
      title: "Primary Button Link",
      type: "string",

      description:
        "Examples: /contact, /request-staff or https://example.com",

      validation: (Rule) =>
        Rule.required().custom(
          internalOrExternalLinkValidation,
        ),
    }),

    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary Button Text",
      type: "string",

      validation: (Rule) =>
        Rule.max(40).warning(
          "Keep button text below 40 characters.",
        ),
    }),

    defineField({
      name: "secondaryButtonHref",
      title: "Secondary Button Link",
      type: "string",

      hidden: ({parent}) =>
        !parent?.secondaryButtonLabel,

      validation: (Rule) =>
        Rule.custom(
          internalOrExternalLinkValidation,
        ),
    }),
  ],

  preview: {
    select: {
      title: "title",
      primaryButtonLabel: "primaryButtonLabel",
    },

    prepare({title, primaryButtonLabel}) {
      return {
        title: title || "Untitled action section",
        subtitle: `${primaryButtonLabel || "No button"} • Action Section`,
      };
    },
  },
});

export const servicePromotion = defineType({
  name: "servicePromotion",
  title: "Service Promotion",
  type: "object",

  fields: [
    defineField({
      name: "service",
      title: "Service",
      type: "string",

      options: {
        list: [
          {
            title: "Recruitment & Staffing",
            value: "recruitment",
          },
          {
            title: "Training & Staff Development",
            value: "training",
          },
          {
            title: "Business Systems & Documentation",
            value: "systems",
          },
          {
            title: "Beauty Business Setup & Launch",
            value: "setup",
          },
          {
            title: "Digital Growth & Visibility",
            value: "digital",
          },
          {
            title: "Management Consultancy & Growth",
            value: "consultancy",
          },
          {
            title: "Custom Service Promotion",
            value: "custom",
          },
        ],
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Small Label",
      type: "string",

      initialValue: "Salons Assured Support",

      validation: (Rule) =>
        Rule.max(50).warning(
          "Keep the small label below 50 characters.",
        ),
    }),

    defineField({
      name: "title",
      title: "Promotion Title",
      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(110)
          .error(
            "Enter a promotion title between 5 and 110 characters.",
          ),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,

      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(400)
          .error(
            "Enter a description between 20 and 400 characters.",
          ),
    }),

    defineField({
      name: "benefits",
      title: "Key Benefits",
      type: "array",

      of: [
        defineArrayMember({
          type: "string",
        }),
      ],

      validation: (Rule) =>
        Rule.max(5).warning(
          "Use no more than five benefits.",
        ),
    }),

    defineField({
      name: "buttonLabel",
      title: "Button Text",
      type: "string",

      initialValue: "Request Consultation",

      validation: (Rule) =>
        Rule.required()
          .max(40)
          .error("Add button text."),
    }),

    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",

      initialValue: "/contact",

      validation: (Rule) =>
        Rule.required().custom(
          internalOrExternalLinkValidation,
        ),
    }),

    defineField({
      name: "image",
      title: "Optional Promotional Image",
      type: "image",

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

  preview: {
    select: {
      title: "title",
      service: "service",
      media: "image",
    },

    prepare({title, service, media}) {
      const serviceNames: Record<
        string,
        string
      > = {
        recruitment: "Recruitment & Staffing",
        training: "Training & Development",
        systems: "Business Systems",
        setup: "Business Setup",
        digital: "Digital Growth",
        consultancy: "Management Consultancy",
        custom: "Custom Promotion",
      };

      return {
        title: title || "Untitled service promotion",
        subtitle: `${serviceNames[service] || "Salons Assured Service"} • Service Promotion`,
        media,
      };
    },
  },
});