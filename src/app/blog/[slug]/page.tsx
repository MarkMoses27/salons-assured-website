import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import ArticlePortableText from "@/components/blog/ArticlePortableText";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ArticleCategory = {
  _id: string;
  title: string;
  slug?: string;
};

type ArticleAuthor = {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
};

type ArticleBodyBlock = {
  _key?: string;
  _type: string;
  style?: string;
  alt?: string;
  caption?: string;

  asset?: {
    url?: string;

    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };

  children?: Array<{
    _key?: string;
    _type?: string;
    text?: string;
  }>;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  author?: ArticleAuthor;
  categories?: ArticleCategory[];
  body?: ArticleBodyBlock[];
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImageUrl?: string;
  category?: string;
};

type TableOfContentsItem = {
  id: string;
  title: string;
  level: "h2" | "h3";
};

const articleQuery = `
  *[
    _type in ["post", "blogPost"] &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, summary, description),
    "publishedAt": coalesce(publishedAt, _createdAt),

    "coverImageUrl": coalesce(
      mainImage.asset->url,
      featuredImage.asset->url,
      coverImage.asset->url
    ),

    "coverImageAlt": coalesce(
      mainImage.alt,
      featuredImage.alt,
      coverImage.alt,
      title
    ),

    "author": author->{
      name,
      "role": coalesce(role, position),
      bio,

      "imageUrl": coalesce(
        image.asset->url,
        photo.asset->url,
        mainImage.asset->url
      )
    },

    "categories": categories[]->{
      _id,
      "title": coalesce(title, name),
      "slug": slug.current
    },

    "body": coalesce(body, content)[] {
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
    }
  }
`;

const relatedByCategoryQuery = `
  *[
    _type in ["post", "blogPost"] &&
    _id != $postId &&
    defined(slug.current) &&
    count(categories[@._ref in $categoryIds]) > 0
  ]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, summary, description),
    "publishedAt": coalesce(publishedAt, _createdAt),

    "coverImageUrl": coalesce(
      mainImage.asset->url,
      featuredImage.asset->url,
      coverImage.asset->url
    ),

    "category": categories[0]->title
  }
`;

const latestPostsQuery = `
  *[
    _type in ["post", "blogPost"] &&
    _id != $postId &&
    defined(slug.current)
  ]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, summary, description),
    "publishedAt": coalesce(publishedAt, _createdAt),

    "coverImageUrl": coalesce(
      mainImage.asset->url,
      featuredImage.asset->url,
      coverImage.asset->url
    ),

    "category": categories[0]->title
  }
`;

function formatDate(date?: string) {
  if (!date) {
    return "Recently published";
  }

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getBlockText(block: ArticleBodyBlock) {
  return (
    block.children
      ?.map((child) => child.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

function calculateReadingTime(
  body?: ArticleBodyBlock[],
) {
  if (!body?.length) {
    return 1;
  }

  const wordCount = body.reduce(
    (total, block) => {
      const text = getBlockText(block);

      if (!text) {
        return total;
      }

      return (
        total +
        text.split(/\s+/).filter(Boolean).length
      );
    },
    0,
  );

  return Math.max(
    1,
    Math.ceil(wordCount / 220),
  );
}

function buildTableOfContents(
  body?: ArticleBodyBlock[],
): TableOfContentsItem[] {
  if (!body?.length) {
    return [];
  }

  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" ||
          block.style === "h3"),
    )
    .map((block) => {
      const title = getBlockText(block);

      return {
        id: slugifyHeading(title),
        title,
        level: block.style as "h2" | "h3",
      };
    })
    .filter((item) => item.title);
}

async function getArticle(slug: string) {
  return client.fetch<BlogPost | null>(
    articleQuery,
    {
      slug,
    },
  );
}

async function getRelatedPosts(
  post: BlogPost,
) {
  const categoryIds =
    post.categories
      ?.map((category) => category._id)
      .filter(Boolean) ?? [];

  if (categoryIds.length > 0) {
    const categoryPosts =
      await client.fetch<RelatedPost[]>(
        relatedByCategoryQuery,
        {
          postId: post._id,
          categoryIds,
        },
      );

    if (categoryPosts.length > 0) {
      return categoryPosts;
    }
  }

  return client.fetch<RelatedPost[]>(
    latestPostsQuery,
    {
      postId: post._id,
    },
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title:
        "Article Not Found | Salons Assured Kenya",
    };
  }

  const description =
    article.excerpt ||
    `Read ${article.title} on Salons Assured Kenya.`;

  return {
    title: `${article.title} | Salons Assured Kenya`,
    description,

    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.publishedAt,

      images: article.coverImageUrl
        ? [
            {
              url: article.coverImageUrl,
              alt:
                article.coverImageAlt ||
                article.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedPosts =
    await getRelatedPosts(article);

  const readingTime =
    calculateReadingTime(article.body);

  const tableOfContents =
    buildTableOfContents(article.body);

  const primaryCategory =
    article.categories?.[0]?.title;

  const authorName =
    article.author?.name ||
    "Salons Assured Editorial Team";

  return (
    <main className="min-h-screen bg-white text-[#071b33]">
      {/* ARTICLE HEADER */}
      <section className="border-b border-[#ead5db] bg-[#fbf7f8]">
        <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-9 md:px-8 md:pb-16 md:pt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#64748b] transition-colors hover:text-[#b87586]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>

          <div className="mx-auto mt-10 max-w-[930px] text-center">
            {primaryCategory && (
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#b87586]">
                {primaryCategory}
              </p>
            )}

            <h1 className="mt-5 font-serif text-[40px] font-black leading-[1.04] tracking-[-0.05em] text-[#071b33] sm:text-[52px] md:text-[66px] lg:text-[76px]">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mx-auto mt-7 max-w-[760px] text-[17px] leading-8 text-[#536174] md:text-[20px] md:leading-9">
                {article.excerpt}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-[12px] font-bold text-[#64748b]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#ead5db] bg-white">
                  {article.author?.imageUrl ? (
                    <Image
                      src={
                        article.author
                          .imageUrl
                      }
                      alt={authorName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <UserRound className="h-4 w-4 text-[#b87586]" />
                  )}
                </div>

                <span className="text-[#071b33]">
                  {authorName}
                </span>
              </div>

              <span className="hidden h-1 w-1 rounded-full bg-[#cbd5e1] sm:block" />

              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#b87586]" />

                {formatDate(
                  article.publishedAt,
                )}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#cbd5e1] sm:block" />

              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#b87586]" />

                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      {article.coverImageUrl && (
        <section className="bg-white px-5 pt-8 md:px-8 md:pt-12">
          <div className="relative mx-auto aspect-[16/8.2] max-w-[1240px] overflow-hidden rounded-[24px] bg-[#f2e9ec] md:rounded-[32px]">
            <Image
              src={article.coverImageUrl}
              alt={
                article.coverImageAlt ||
                article.title
              }
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1240px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/20 via-transparent to-transparent" />
          </div>
        </section>
      )}

      {/* ARTICLE CONTENT */}
      <section className="bg-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 lg:grid-cols-[160px_minmax(0,720px)_240px] lg:gap-12">
          {/* LEFT ARTICLE INFORMATION */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 border-t border-[#ead5db] pt-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                Article Details
              </p>

              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Published
                  </dt>

                  <dd className="mt-1 text-[12px] font-bold leading-5 text-[#071b33]">
                    {formatDate(
                      article.publishedAt,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Reading time
                  </dt>

                  <dd className="mt-1 text-[12px] font-bold text-[#071b33]">
                    {readingTime} minutes
                  </dd>
                </div>

                {article.categories &&
                  article.categories.length >
                    0 && (
                    <div>
                      <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Topics
                      </dt>

                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {article.categories.map(
                          (category) => (
                            <span
                              key={
                                category._id
                              }
                              className="rounded-full bg-[#fbf4f6] px-2.5 py-1 text-[10px] font-bold text-[#b87586]"
                            >
                              {
                                category.title
                              }
                            </span>
                          ),
                        )}
                      </dd>
                    </div>
                  )}
              </dl>
            </div>
          </aside>

          {/* MAIN READING COLUMN */}
          <article className="min-w-0">
            {article.excerpt && (
              <div className="mb-12 border-y border-[#ead5db] py-8">
                <p className="font-serif text-[24px] font-bold leading-[1.6] tracking-[-0.015em] text-[#071b33] md:text-[28px]">
                  {article.excerpt}
                </p>
              </div>
            )}

            {article.body?.length ? (
              <div className="space-y-8">
                <ArticlePortableText
                  value={
                    article.body as PortableTextBlock[]
                  }
                />
              </div>
            ) : (
              <div className="border-y border-[#ead5db] py-14 text-center">
                <p className="font-serif text-2xl font-black text-[#071b33]">
                  This article is being
                  prepared.
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Please check again soon
                  for the complete story.
                </p>
              </div>
            )}

            {/* AUTHOR PROFILE */}
            <div className="mt-16 border-y border-[#ead5db] py-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fbf4f6]">
                  {article.author?.imageUrl ? (
                    <Image
                      src={
                        article.author
                          .imageUrl
                      }
                      alt={authorName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <UserRound className="h-7 w-7 text-[#b87586]" />
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                    Written by
                  </p>

                  <h2 className="mt-2 font-serif text-[27px] font-black tracking-[-0.03em] text-[#071b33]">
                    {authorName}
                  </h2>

                  {article.author?.role && (
                    <p className="mt-1 text-[12px] font-bold text-slate-500">
                      {
                        article.author
                          .role
                      }
                    </p>
                  )}

                  <p className="mt-4 max-w-[580px] text-[14px] leading-7 text-slate-600">
                    {article.author?.bio ||
                      "Practical insight, professional guidance and industry perspectives from the Salons Assured Kenya editorial team."}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* RIGHT CONTENT NAVIGATION */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-6">
              {tableOfContents.length >
                0 && (
                <div className="border-t border-[#ead5db] pt-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                    In This Article
                  </p>

                  <nav className="mt-5 space-y-3">
                    {tableOfContents.map(
                      (item) => (
                        <a
                          key={`${item.id}-${item.title}`}
                          href={`#${item.id}`}
                          className={`block border-l border-[#ead5db] text-[12px] font-bold leading-5 text-slate-500 transition-colors hover:border-[#b87586] hover:text-[#071b33] ${
                            item.level ===
                            "h3"
                              ? "pl-6"
                              : "pl-4"
                          }`}
                        >
                          {item.title}
                        </a>
                      ),
                    )}
                  </nav>
                </div>
              )}

              <div className="bg-[#071b33] p-6 text-white">
                <Sparkles className="h-5 w-5 text-[#e3b4bf]" />

                <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e3b4bf]">
                  Grow Your Business
                </p>

                <h3 className="mt-3 font-serif text-[24px] font-black leading-tight tracking-[-0.03em]">
                  Need professional beauty
                  business support?
                </h3>

                <p className="mt-3 text-[12px] leading-6 text-white/65">
                  Speak to Salons Assured
                  about staffing, systems,
                  training and business
                  growth.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 border-b border-[#e3b4bf] pb-1 text-[11px] font-extrabold text-white transition-colors hover:text-[#e3b4bf]"
                >
                  Talk to our team

                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* NEWSLETTER STRIP */}
      <section className="border-y border-[#ead5db] bg-[#fbf4f6]">
        <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-7 px-5 py-10 md:flex-row md:items-center md:px-8">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
              Salons Assured Insights
            </p>

            <h2 className="mt-2 font-serif text-[28px] font-black tracking-[-0.035em] text-[#071b33] md:text-[34px]">
              Practical insight for the
              beauty industry.
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-slate-600">
              Follow industry guidance,
              business advice and
              professional opportunities.
            </p>
          </div>

          <a
            href="mailto:info@salonsassured.co.ke"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#071b33] px-6 text-[12px] font-extrabold text-white transition-colors hover:bg-[#b87586]"
          >
            <Mail className="h-4 w-4" />
            Join the Conversation
          </a>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col justify-between gap-5 border-b border-[#ead5db] pb-7 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b87586]">
                  Continue Reading
                </p>

                <h2 className="mt-3 font-serif text-[34px] font-black tracking-[-0.04em] text-[#071b33] md:text-[43px]">
                  More from our editorial
                  desk
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[12px] font-extrabold text-[#071b33] transition-colors hover:text-[#b87586]"
              >
                View all insights

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-[#ead5db]">
              {relatedPosts.map(
                (post, index) => (
                  <article
                    key={post._id}
                    className="grid gap-6 py-8 md:grid-cols-[70px_minmax(0,1fr)_260px] md:items-center"
                  >
                    <span className="font-serif text-[28px] font-black text-[#d7c3c8]">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#b87586]">
                        {post.category && (
                          <span>
                            {post.category}
                          </span>
                        )}

                        <span className="h-1 w-1 rounded-full bg-[#cbd5e1]" />

                        <span className="text-slate-400">
                          {formatDate(
                            post.publishedAt,
                          )}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                      >
                        <h3 className="mt-3 max-w-[680px] font-serif text-[27px] font-black leading-tight tracking-[-0.035em] text-[#071b33] transition-colors hover:text-[#b87586] md:text-[32px]">
                          {post.title}
                        </h3>
                      </Link>

                      {post.excerpt && (
                        <p className="mt-3 line-clamp-2 max-w-[690px] text-[13px] leading-6 text-slate-500">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    {post.coverImageUrl && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative aspect-[16/9] overflow-hidden rounded-[16px] bg-[#f2e9ec]"
                      >
                        <Image
                          src={
                            post.coverImageUrl
                          }
                          alt={post.title}
                          fill
                          sizes="260px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </Link>
                    )}
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}