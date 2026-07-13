import Image from "next/image";
import Link from "next/link";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  Quote,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import {urlFor} from "@/sanity/lib/image";

type SanityImageValue = {
  _type?: "image";
  alt?: string;
  caption?: string;
  displaySize?: "normal" | "wide" | "full";

  asset?: {
    _ref?: string;
    url?: string;

    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

type HighlightCalloutValue = {
  _type: "highlightCallout";
  tone?: "insight" | "tip" | "important" | "warning";
  eyebrow?: string;
  title?: string;
  text?: string;
};

type StatisticItem = {
  _key?: string;
  value?: string;
  label?: string;
  description?: string;
};

type StatisticsSectionValue = {
  _type: "statisticsSection";
  theme?: "light" | "blush" | "navy";
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: StatisticItem[];
};

type ImageTextSectionValue = {
  _type: "imageTextSection";
  background?: "white" | "blush" | "light" | "navy";
  imagePosition?: "left" | "right";
  image?: SanityImageValue;
  eyebrow?: string;
  title?: string;
  body?: PortableTextBlock[];
  buttonLabel?: string;
  buttonHref?: string;
};

type EditorialQuoteValue = {
  _type: "editorialQuote";
  quote?: string;
  name?: string;
  role?: string;
  organization?: string;
  photo?: SanityImageValue;
  style?: "light" | "blush" | "navy";
};

type ActionSectionValue = {
  _type: "actionSection";
  tone?: "navy" | "blush" | "light";
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

type ServicePromotionValue = {
  _type: "servicePromotion";
  service?:
    | "recruitment"
    | "training"
    | "systems"
    | "setup"
    | "digital"
    | "consultancy"
    | "custom";
  eyebrow?: string;
  title?: string;
  description?: string;
  benefits?: string[];
  buttonLabel?: string;
  buttonHref?: string;
  image?: SanityImageValue;
};

type ArticlePortableTextProps = {
  value: PortableTextBlock[];
};

type SmartLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

function SmartLink({
  href,
  children,
  className,
}: SmartLinkProps) {
  const safeHref = href || "/contact";

  if (safeHref.startsWith("/")) {
    return (
      <Link
        href={safeHref}
        className={className}
      >
        {children}
      </Link>
    );
  }

  const opensNewTab =
    safeHref.startsWith("https://") ||
    safeHref.startsWith("http://");

  return (
    <a
      href={safeHref}
      className={className}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function getImageUrl(
  image?: SanityImageValue,
  width = 1400,
) {
  if (!image) {
    return undefined;
  }

  if (image.asset?.url) {
    return image.asset.url;
  }

  try {
    return urlFor(image)
      .width(width)
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

const sectionTextComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-5 text-[15px] leading-7 text-inherit md:text-[16px]">
        {children}
      </p>
    ),

    h3: ({children}) => (
      <h3 className="mb-4 mt-7 font-serif text-[23px] font-black leading-tight tracking-[-0.025em] text-inherit">
        {children}
      </h3>
    ),
  },

  list: {
    bullet: ({children}) => (
      <ul className="mb-6 space-y-3">
        {children}
      </ul>
    ),

    number: ({children}) => (
      <ol className="mb-6 space-y-3">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({children}) => (
      <li className="relative pl-7 text-[15px] leading-7 before:absolute before:left-0 before:top-[11px] before:h-2 before:w-2 before:rounded-full before:bg-[#b87586] md:text-[16px]">
        {children}
      </li>
    ),

    number: ({children}) => (
      <li className="ml-5 list-decimal pl-2 text-[15px] leading-7 md:text-[16px]">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({children}) => (
      <strong className="font-extrabold">
        {children}
      </strong>
    ),

    em: ({children}) => (
      <em className="italic">
        {children}
      </em>
    ),

    link: ({children, value}) => {
      const href =
        typeof value?.href === "string"
          ? value.href
          : "/contact";

      return (
        <SmartLink
          href={href}
          className="font-extrabold text-[#b87586] underline underline-offset-4"
        >
          {children}
        </SmartLink>
      );
    },
  },
};

function ArticleImage({
  value,
}: {
  value: SanityImageValue;
}) {
  const imageUrl = getImageUrl(value);

  if (!imageUrl) {
    return null;
  }

  const width =
    value.asset?.metadata?.dimensions?.width ??
    1400;

  const height =
    value.asset?.metadata?.dimensions?.height ??
    900;

  const sizeClass =
    value.displaySize === "full"
      ? "md:-mx-24"
      : value.displaySize === "wide"
        ? "md:-mx-12"
        : "";

  return (
    <figure className={`my-12 ${sizeClass}`}>
      <div className="overflow-hidden rounded-[22px] bg-[#f2e9ec]">
        <Image
          src={imageUrl}
          alt={
            value.alt ||
            "Salons Assured article image"
          }
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 1000px"
          className="h-auto w-full object-cover"
        />
      </div>

      {value.caption && (
        <figcaption className="mt-3 border-l-2 border-[#d9a3af] pl-3 text-[12px] leading-5 text-slate-500">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

function HighlightCallout({
  value,
}: {
  value: HighlightCalloutValue;
}) {
  const tone = value.tone || "insight";

  const toneSettings = {
    insight: {
      label: "Key Insight",
      container:
        "border-[#d9a3af] bg-[#fbf4f6]",
      iconContainer:
        "bg-[#b87586] text-white",
      Icon: Sparkles,
    },

    tip: {
      label: "Practical Tip",
      container:
        "border-[#cbd5e1] bg-[#f8fafc]",
      iconContainer:
        "bg-[#071b33] text-white",
      Icon: Lightbulb,
    },

    important: {
      label: "Important Note",
      container:
        "border-[#f2c98b] bg-[#fff9ef]",
      iconContainer:
        "bg-[#d7983c] text-white",
      Icon: CircleAlert,
    },

    warning: {
      label: "Warning",
      container:
        "border-[#e9a6a6] bg-[#fff5f5]",
      iconContainer:
        "bg-[#b84f4f] text-white",
      Icon: TriangleAlert,
    },
  };

  const settings = toneSettings[tone];
  const Icon = settings.Icon;

  return (
    <aside
      className={`my-12 rounded-[24px] border px-6 py-7 md:px-8 md:py-8 ${settings.container}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${settings.iconContainer}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
            {value.eyebrow || settings.label}
          </p>

          {value.title && (
            <h3 className="mt-2 font-serif text-[25px] font-black leading-tight tracking-[-0.025em] text-[#071b33] md:text-[29px]">
              {value.title}
            </h3>
          )}

          {value.text && (
            <p className="mt-4 text-[15px] leading-7 text-[#475569] md:text-[17px] md:leading-8">
              {value.text}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

function StatisticsSection({
  value,
}: {
  value: StatisticsSectionValue;
}) {
  const theme = value.theme || "light";

  const themeClass =
    theme === "navy"
      ? "bg-[#071b33] text-white"
      : theme === "blush"
        ? "bg-[#fbf4f6] text-[#071b33]"
        : "border border-[#e2e8f0] bg-[#f8fafc] text-[#071b33]";

  const descriptionClass =
    theme === "navy"
      ? "text-white/70"
      : "text-slate-600";

  return (
    <section
      className={`my-14 overflow-hidden rounded-[28px] px-6 py-9 md:-mx-12 md:px-10 md:py-11 ${themeClass}`}
    >
      <div className="max-w-[650px]">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
          {value.eyebrow || "By the Numbers"}
        </p>

        {value.title && (
          <h2 className="mt-3 font-serif text-[30px] font-black leading-tight tracking-[-0.035em] md:text-[38px]">
            {value.title}
          </h2>
        )}

        {value.intro && (
          <p
            className={`mt-4 text-[15px] leading-7 md:text-[17px] ${descriptionClass}`}
          >
            {value.intro}
          </p>
        )}
      </div>

      {value.items && value.items.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {value.items.map((item, index) => (
            <div
              key={item._key || `${item.value}-${index}`}
              className={
                theme === "navy"
                  ? "rounded-[20px] border border-white/15 bg-white/5 p-6"
                  : "rounded-[20px] border border-[#ead5db] bg-white p-6"
              }
            >
              <p className="font-serif text-[38px] font-black leading-none tracking-[-0.045em] text-[#b87586] md:text-[45px]">
                {item.value}
              </p>

              {item.label && (
                <h3 className="mt-3 text-[14px] font-extrabold leading-6">
                  {item.label}
                </h3>
              )}

              {item.description && (
                <p
                  className={`mt-2 text-[13px] leading-6 ${descriptionClass}`}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ImageTextSection({
  value,
}: {
  value: ImageTextSectionValue;
}) {
  const imageUrl = getImageUrl(value.image, 1200);
  const navy = value.background === "navy";

  const backgroundClass =
    value.background === "navy"
      ? "bg-[#071b33] text-white"
      : value.background === "blush"
        ? "bg-[#fbf4f6] text-[#071b33]"
        : value.background === "light"
          ? "bg-[#f8fafc] text-[#071b33]"
          : "border border-[#e2e8f0] bg-white text-[#071b33]";

  const textClass = navy
    ? "text-white/75"
    : "text-slate-600";

  const imageFirst =
    value.imagePosition !== "right";

  return (
    <section
      className={`my-14 overflow-hidden rounded-[28px] md:-mx-20 ${backgroundClass}`}
    >
      <div className="grid md:grid-cols-2">
        <div
          className={`relative min-h-[300px] md:min-h-[520px] ${
            imageFirst
              ? "md:order-1"
              : "md:order-2"
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                value.image?.alt ||
                value.title ||
                "Salons Assured section image"
              }
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#ead5db]" />
          )}
        </div>

        <div
          className={`flex items-center px-6 py-9 md:px-10 md:py-12 ${
            imageFirst
              ? "md:order-2"
              : "md:order-1"
          }`}
        >
          <div>
            {value.eyebrow && (
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                {value.eyebrow}
              </p>
            )}

            {value.title && (
              <h2 className="mt-3 font-serif text-[30px] font-black leading-tight tracking-[-0.035em] md:text-[38px]">
                {value.title}
              </h2>
            )}

            {value.body && value.body.length > 0 && (
              <div className={`mt-5 ${textClass}`}>
                <PortableText
                  value={value.body}
                  components={sectionTextComponents}
                />
              </div>
            )}

            {value.buttonLabel && (
              <SmartLink
                href={value.buttonHref}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#b87586] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#965d6d]"
              >
                {value.buttonLabel}
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialQuote({
  value,
}: {
  value: EditorialQuoteValue;
}) {
  const imageUrl = getImageUrl(value.photo, 400);
  const navy = value.style === "navy";

  const styleClass =
    value.style === "navy"
      ? "bg-[#071b33] text-white"
      : value.style === "blush"
        ? "bg-[#fbf4f6] text-[#071b33]"
        : "border-y border-[#ead5db] bg-white text-[#071b33]";

  return (
    <figure
      className={`my-14 px-6 py-10 md:-mx-12 md:px-10 md:py-12 ${styleClass}`}
    >
      <Quote className="h-10 w-10 text-[#b87586]" />

      {value.quote && (
        <blockquote className="mt-5 font-serif text-[27px] font-black italic leading-[1.45] tracking-[-0.025em] md:text-[35px]">
          “{value.quote}”
        </blockquote>
      )}

      <figcaption className="mt-7 flex items-center gap-4">
        {imageUrl ? (
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image
              src={imageUrl}
              alt={
                value.photo?.alt ||
                value.name ||
                "Quote author"
              }
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b87586] text-lg font-black text-white">
            {value.name?.charAt(0) || "S"}
          </div>
        )}

        <div>
          <p className="text-[14px] font-extrabold">
            {value.name}
          </p>

          {(value.role || value.organization) && (
            <p
              className={`mt-1 text-[12px] ${
                navy
                  ? "text-white/65"
                  : "text-slate-500"
              }`}
            >
              {[value.role, value.organization]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

function ActionSection({
  value,
}: {
  value: ActionSectionValue;
}) {
  const navy = value.tone === "navy";

  const toneClass =
    value.tone === "blush"
      ? "bg-[#fbf4f6] text-[#071b33]"
      : value.tone === "light"
        ? "border border-[#e2e8f0] bg-[#f8fafc] text-[#071b33]"
        : "bg-[#071b33] text-white";

  return (
    <section
      className={`my-14 rounded-[28px] px-6 py-10 text-center md:-mx-16 md:px-12 md:py-14 ${toneClass}`}
    >
      {value.eyebrow && (
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
          {value.eyebrow}
        </p>
      )}

      {value.title && (
        <h2 className="mx-auto mt-3 max-w-[670px] font-serif text-[31px] font-black leading-tight tracking-[-0.035em] md:text-[42px]">
          {value.title}
        </h2>
      )}

      {value.description && (
        <p
          className={`mx-auto mt-5 max-w-[630px] text-[15px] leading-7 md:text-[17px] ${
            navy
              ? "text-white/70"
              : "text-slate-600"
          }`}
        >
          {value.description}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {value.primaryButtonLabel && (
          <SmartLink
            href={value.primaryButtonHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b87586] px-7 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#965d6d]"
          >
            {value.primaryButtonLabel}
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        )}

        {value.secondaryButtonLabel && (
          <SmartLink
            href={value.secondaryButtonHref}
            className={`inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] transition ${
              navy
                ? "border-white/30 text-white hover:bg-white hover:text-[#071b33]"
                : "border-[#071b33] text-[#071b33] hover:bg-[#071b33] hover:text-white"
            }`}
          >
            {value.secondaryButtonLabel}
          </SmartLink>
        )}
      </div>
    </section>
  );
}

function ServicePromotion({
  value,
}: {
  value: ServicePromotionValue;
}) {
  const imageUrl = getImageUrl(value.image, 800);

  const serviceNames: Record<string, string> = {
    recruitment: "Recruitment & Staffing",
    training: "Training & Staff Development",
    systems: "Business Systems & Documentation",
    setup: "Beauty Business Setup & Launch",
    digital: "Digital Growth & Visibility",
    consultancy: "Management Consultancy",
    custom: "Salons Assured Service",
  };

  return (
    <section className="my-14 overflow-hidden rounded-[28px] bg-[#071b33] text-white md:-mx-16">
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="px-6 py-10 md:px-10 md:py-12">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#d9a3af]">
            {value.eyebrow ||
              "Salons Assured Support"}
          </p>

          <p className="mt-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white/55">
            {serviceNames[value.service || "custom"]}
          </p>

          {value.title && (
            <h2 className="mt-3 font-serif text-[31px] font-black leading-tight tracking-[-0.035em] md:text-[40px]">
              {value.title}
            </h2>
          )}

          {value.description && (
            <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-white/70 md:text-[17px]">
              {value.description}
            </p>
          )}

          {value.benefits &&
            value.benefits.length > 0 && (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {value.benefits.map(
                  (benefit, index) => (
                    <li
                      key={`${benefit}-${index}`}
                      className="flex items-start gap-3 text-[13px] font-bold leading-6 text-white/85"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#d9a3af]" />
                      {benefit}
                    </li>
                  ),
                )}
              </ul>
            )}

          {value.buttonLabel && (
            <SmartLink
              href={value.buttonHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#b87586] px-7 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-[#965d6d]"
            >
              {value.buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </SmartLink>
          )}
        </div>

        {imageUrl && (
          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src={imageUrl}
              alt={
                value.image?.alt ||
                value.title ||
                "Salons Assured service"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 280px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#071b33]/30 to-transparent lg:bg-gradient-to-l" />
          </div>
        )}
      </div>
    </section>
  );
}

const articleComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-7 text-[17px] leading-[1.95] text-[#334155] md:text-[18px]">
        {children}
      </p>
    ),

    h2: ({children}) => (
      <h2 className="scroll-mt-36 border-t border-[#ead5db] pt-10 font-serif text-[31px] font-black leading-[1.15] tracking-[-0.035em] text-[#071b33] first:border-t-0 first:pt-0 md:text-[39px]">
        {children}
      </h2>
    ),

    h3: ({children}) => (
      <h3 className="scroll-mt-36 pt-3 font-serif text-[25px] font-black leading-tight tracking-[-0.025em] text-[#071b33] md:text-[29px]">
        {children}
      </h3>
    ),

    h4: ({children}) => (
      <h4 className="pt-2 text-[18px] font-extrabold leading-7 text-[#071b33] md:text-[20px]">
        {children}
      </h4>
    ),

    blockquote: ({children}) => (
      <blockquote className="my-10 border-l-[3px] border-[#b87586] bg-[#fbf4f6] px-6 py-7 font-serif text-[23px] font-bold italic leading-[1.55] text-[#071b33] md:px-8 md:text-[27px]">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({children}) => (
      <ul className="mb-8 ml-1 space-y-4">
        {children}
      </ul>
    ),

    number: ({children}) => (
      <ol className="mb-8 ml-5 list-decimal space-y-4">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({children}) => (
      <li className="relative pl-7 text-[17px] leading-8 text-[#334155] before:absolute before:left-0 before:top-[13px] before:h-2 before:w-2 before:rounded-full before:bg-[#b87586] md:text-[18px]">
        {children}
      </li>
    ),

    number: ({children}) => (
      <li className="pl-2 text-[17px] leading-8 text-[#334155] md:text-[18px]">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({children}) => (
      <strong className="font-extrabold text-[#071b33]">
        {children}
      </strong>
    ),

    em: ({children}) => (
      <em className="italic text-[#475569]">
        {children}
      </em>
    ),

    underline: ({children}) => (
      <span className="underline underline-offset-4">
        {children}
      </span>
    ),

    link: ({children, value}) => {
      const href =
        typeof value?.href === "string"
          ? value.href
          : "/contact";

      return (
        <SmartLink
          href={href}
          className="font-bold text-[#b87586] underline decoration-[#d9a3af] underline-offset-4 transition-colors hover:text-[#071b33]"
        >
          {children}
        </SmartLink>
      );
    },
  },

  types: {
    image: ({value}) => (
      <ArticleImage
        value={value as SanityImageValue}
      />
    ),

    highlightCallout: ({value}) => (
      <HighlightCallout
        value={value as HighlightCalloutValue}
      />
    ),

    statisticsSection: ({value}) => (
      <StatisticsSection
        value={value as StatisticsSectionValue}
      />
    ),

    imageTextSection: ({value}) => (
      <ImageTextSection
        value={value as ImageTextSectionValue}
      />
    ),

    editorialQuote: ({value}) => (
      <EditorialQuote
        value={value as EditorialQuoteValue}
      />
    ),

    actionSection: ({value}) => (
      <ActionSection
        value={value as ActionSectionValue}
      />
    ),

    servicePromotion: ({value}) => (
      <ServicePromotion
        value={value as ServicePromotionValue}
      />
    ),
  },

  unknownType: ({value}) => {
    console.warn(
      `Unknown article block type: ${value._type}`,
    );

    return null;
  },
};

export default function ArticlePortableText({
  value,
}: ArticlePortableTextProps) {
  return (
    <PortableText
      value={value}
      components={articleComponents}
    />
  );
}