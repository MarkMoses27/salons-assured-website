import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import type {SanityImageSource} from "@sanity/image-url";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Sparkles,
  UserRound,
} from "lucide-react";

import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_EDITORIAL_QUERY,
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_PAGE_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Beauty Business Insights | Salons Assured Kenya",

  description:
    "Explore practical insights on salon growth, recruitment, training, management, marketing and beauty business systems from Salons Assured Kenya.",
};

export const revalidate = 60;

const POSTS_PER_PAGE = 6;

type BlogPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};

type BlogImage = {
  _type?: "image";

  asset?: {
    _ref?: string;
    _type?: string;
  };

  alt?: string;
  caption?: string;
  crop?: unknown;
  hotspot?: unknown;
};

type BlogAuthor = {
  _id?: string;
  name?: string;
  role?: string;
};

type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  postCount?: number;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  editorialPlacement?: string;
  featuredOrder?: number;
  coverImage?: BlogImage;
  author?: BlogAuthor;
  categories?: BlogCategory[];
};

type EditorialResponse = {
  coverPost?: BlogPost | null;
  legacyFeaturedPost?: BlogPost | null;
  featuredPosts?: BlogPost[];
  fallbackPosts?: BlogPost[];
};

const fetchOptions = {
  next: {
    revalidate: 60,
  },
};

function readSearchParameter(
  value: string | string[] | undefined,
) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function hasImageAsset(image?: BlogImage) {
  return Boolean(image?.asset?._ref);
}

function deduplicatePosts(
  posts: Array<BlogPost | null | undefined>,
) {
  const result: BlogPost[] = [];
  const existingIds = new Set<string>();

  posts.forEach((post) => {
    if (!post || existingIds.has(post._id)) {
      return;
    }

    existingIds.add(post._id);
    result.push(post);
  });

  return result;
}

function buildBlogHref(
  categorySlug: string,
  page: number,
) {
  const parameters = new URLSearchParams();

  if (categorySlug) {
    parameters.set("category", categorySlug);
  }

  if (page > 1) {
    parameters.set("page", String(page));
  }

  const queryString = parameters.toString();

  return queryString
    ? `/blog?${queryString}`
    : "/blog";
}

function EditorialImage({
  image,
  title,
  className,
  sizes,
  priority = false,
}: {
  image?: BlogImage;
  title: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!hasImageAsset(image)) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#071b33]">
        <div className="text-center">
          <BookOpen className="mx-auto h-11 w-11 text-[#d9a3af]" />

          <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">
            SAK Insights
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = urlFor(image as SanityImageSource)
    .width(1800)
    .height(1200)
    .fit("crop")
    .quality(90)
    .url();

  return (
    <Image
      src={imageUrl}
      alt={image?.alt || title}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const resolvedSearchParams = await searchParams;

  const categorySlug =
    readSearchParameter(
      resolvedSearchParams.category,
    )?.trim() || "";

  const requestedPageValue = Number.parseInt(
    readSearchParameter(resolvedSearchParams.page) ||
      "1",
    10,
  );

  const requestedPage =
    Number.isFinite(requestedPageValue) &&
    requestedPageValue > 0
      ? requestedPageValue
      : 1;

  const [categories, editorialData] =
    await Promise.all([
      client.fetch<BlogCategory[]>(
        BLOG_CATEGORIES_QUERY,
        {},
        fetchOptions,
      ),

      client.fetch<EditorialResponse>(
        BLOG_EDITORIAL_QUERY,
        {
          categorySlug,
        },
        fetchOptions,
      ),
    ]);

  const fallbackPosts =
    editorialData.fallbackPosts || [];

  const coverPost =
    editorialData.coverPost ||
    editorialData.legacyFeaturedPost ||
    fallbackPosts[0] ||
    null;

  const featuredCandidates = deduplicatePosts([
    ...(editorialData.featuredPosts || []),
    ...fallbackPosts,
  ]);

  const featuredPosts = featuredCandidates
    .filter((post) => post._id !== coverPost?._id)
    .slice(0, 2);

  const editorialPosts = deduplicatePosts([
    coverPost,
    ...featuredPosts,
  ]);

  const excludedIds = editorialPosts.map(
    (post) => post._id,
  );

  const remainingPostCount =
    await client.fetch<number>(
      BLOG_POSTS_COUNT_QUERY,
      {
        categorySlug,
        excludedIds,
      },
      fetchOptions,
    );

  const totalPages = Math.max(
    1,
    Math.ceil(
      remainingPostCount / POSTS_PER_PAGE,
    ),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const start =
    (currentPage - 1) * POSTS_PER_PAGE;

  const end = start + POSTS_PER_PAGE;

  const latestPosts = await client.fetch<
    BlogPost[]
  >(
    BLOG_POSTS_PAGE_QUERY,
    {
      categorySlug,
      excludedIds,
      start,
      end,
    },
    fetchOptions,
  );

  const selectedCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  const totalArticleCount =
    remainingPostCount + editorialPosts.length;

  const showEditorialFeatures =
    currentPage === 1 && Boolean(coverPost);

  const latestHeading =
    currentPage === 1
      ? "Latest perspectives"
      : "Journal archive";

  const latestDescription =
    currentPage === 1
      ? "Fresh guidance on leadership, recruitment, systems, customer experience and sustainable beauty business growth."
      : `Browsing page ${currentPage} of ${totalPages} from the Salons Assured editorial archive.`;

  return (
    <main className="overflow-hidden bg-[#f8f6f3]">
      {/* EDITORIAL MASTHEAD */}
      <section className="relative overflow-hidden border-b border-[#d8d1ca] bg-[#f8f6f3]">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#d9a3af]/15 blur-[120px]" />

        <div className="absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-[#071b33]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 pb-14 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
          <div className="flex items-center justify-between border-b border-[#cfc7bf] pb-5">
            <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
              <Sparkles className="h-4 w-4" />
              Salons Assured Kenya Journal
            </p>

            <p className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-[#071b33]/45 sm:block">
              Business · People · Beauty · Growth
            </p>
          </div>

          <div className="grid gap-10 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                {selectedCategory
                  ? selectedCategory.title
                  : "Insights & Perspectives"}
              </p>

              <h1 className="mt-5 max-w-5xl font-serif text-[55px] font-black leading-[0.9] tracking-[-0.065em] text-[#071b33] sm:text-[78px] lg:text-[103px]">
                {selectedCategory
                  ? `${selectedCategory.title} insights.`
                  : "The beauty business journal."}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-[16px] leading-8 text-slate-600 sm:text-[18px]">
                Practical intelligence for salon, spa,
                barbershop and beauty business leaders
                building better teams, stronger systems and
                more profitable brands.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#071b33]/55">
                <span>
                  {String(totalArticleCount).padStart(
                    2,
                    "0",
                  )}{" "}
                  Articles
                </span>

                <span className="h-1 w-1 rounded-full bg-[#b87586]" />

                <span>Kenya Beauty Industry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="border-b border-[#d8d1ca] bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 overflow-x-auto px-5 py-5 sm:px-8">
          <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.22em] text-[#b87586]">
            Explore
          </span>

          <span className="h-5 w-px shrink-0 bg-[#d8d1ca]" />

          <Link
            href="/blog"
            className={`shrink-0 whitespace-nowrap border-b pb-1 text-[12px] font-extrabold transition ${
              !categorySlug
                ? "border-[#b87586] text-[#b87586]"
                : "border-transparent text-[#071b33] hover:text-[#b87586]"
            }`}
          >
            All Insights
          </Link>

          {categories.map((category) => (
            <Link
              key={category._id}
              href={buildBlogHref(category.slug, 1)}
              className={`shrink-0 whitespace-nowrap border-b pb-1 text-[12px] font-extrabold transition ${
                categorySlug === category.slug
                  ? "border-[#b87586] text-[#b87586]"
                  : "border-transparent text-[#071b33] hover:text-[#b87586]"
              }`}
            >
              {category.title}

              {typeof category.postCount ===
                "number" && (
                <span className="ml-1.5 text-[9px] text-slate-400">
                  {category.postCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* EMPTY STATE */}
      {totalArticleCount === 0 && (
        <section className="bg-white px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-2xl border-y border-[#d8d1ca] py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[#b87586]" />

            <h2 className="mt-6 font-serif text-[38px] font-black tracking-[-0.045em] text-[#071b33]">
              No articles found.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              There are currently no published articles
              under this category.
            </p>

            <Link
              href="/blog"
              className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#071b33] transition hover:text-[#b87586]"
            >
              <ArrowLeft className="h-4 w-4" />
              View all insights
            </Link>
          </div>
        </section>
      )}

      {/* COVER STORY */}
      {showEditorialFeatures && coverPost && (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <article className="group">
              <div className="mb-7 flex items-end justify-between border-b border-[#d8d1ca] pb-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#b87586]">
                    Cover Story
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#071b33]/45">
                    Featured insight from the SAK
                    editorial desk
                  </p>
                </div>

                <p className="hidden font-serif text-4xl font-black text-[#071b33]/10 sm:block">
                  01
                </p>
              </div>

              <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
                <Link
                  href={`/blog/${coverPost.slug}`}
                  className="relative block min-h-[400px] overflow-hidden bg-[#071b33] sm:min-h-[540px] lg:min-h-[650px]"
                >
                  <EditorialImage
                    image={coverPost.coverImage}
                    title={coverPost.title}
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    priority
                    className="object-cover transition duration-[1200ms] group-hover:scale-[1.035]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/55 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white sm:bottom-8 sm:left-8">
                    <span>SAK Journal</span>

                    <span className="h-1 w-1 rounded-full bg-[#d9a3af]" />

                    <span>
                      {formatDate(
                        coverPost.publishedAt,
                      )}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center bg-[#071b33] px-7 py-12 text-white sm:px-10 lg:px-13">
                  <div>
                    {coverPost.categories?.[0] && (
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#d9a3af]">
                        {
                          coverPost.categories[0]
                            .title
                        }
                      </p>
                    )}

                    <h2 className="mt-6 font-serif text-[40px] font-black leading-[1] tracking-[-0.05em] sm:text-[52px] lg:text-[59px]">
                      {coverPost.title}
                    </h2>

                    <p className="mt-7 text-[15px] leading-8 text-white/70">
                      {coverPost.excerpt}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-6 text-xs text-white/55">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#d9a3af]" />

                        {formatLongDate(
                          coverPost.publishedAt,
                        )}
                      </span>

                      {coverPost.author?.name && (
                        <span className="inline-flex items-center gap-2">
                          <UserRound className="h-4 w-4 text-[#d9a3af]" />

                          {coverPost.author.name}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/blog/${coverPost.slug}`}
                      className="mt-9 inline-flex items-center gap-3 border-b border-[#d9a3af] pb-2 text-sm font-extrabold text-white transition hover:gap-5 hover:text-[#d9a3af]"
                    >
                      Read the cover story

                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* TWO FEATURED STORIES */}
      {showEditorialFeatures &&
        featuredPosts.length > 0 && (
          <section className="border-t border-[#d8d1ca] bg-white pb-20 lg:pb-24">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
              <div className="flex items-end justify-between border-b border-[#d8d1ca] py-7">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                    Featured Stories
                  </p>

                  <h2 className="mt-2 font-serif text-[31px] font-black tracking-[-0.04em] text-[#071b33]">
                    Selected by our editorial team
                  </h2>
                </div>
              </div>

              <div className="grid gap-10 pt-9 md:grid-cols-2">
                {featuredPosts.map(
                  (post, index) => (
                    <article
                      key={post._id}
                      className="group"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block aspect-[16/10] overflow-hidden bg-[#071b33]"
                      >
                        <EditorialImage
                          image={post.coverImage}
                          title={post.title}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition duration-[900ms] group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#071b33]/45 via-transparent to-transparent" />

                        <span className="absolute bottom-5 left-5 font-serif text-[34px] font-black text-white/75">
                          {String(index + 2).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </Link>

                      <div className="pt-6">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b87586]">
                          <span>
                            {post.categories?.[0]
                              ?.title ||
                              "Beauty Business"}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-[#b87586]" />

                          <span className="text-slate-400">
                            {formatDate(
                              post.publishedAt,
                            )}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                        >
                          <h3 className="mt-4 font-serif text-[32px] font-black leading-[1.05] tracking-[-0.04em] text-[#071b33] transition group-hover:text-[#b87586] sm:text-[39px]">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                          {post.excerpt}
                        </p>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-6 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#071b33] transition hover:text-[#b87586]"
                        >
                          Read article

                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {/* LATEST ARTICLES */}
      {latestPosts.length > 0 && (
        <section className="bg-[#f8f6f3] py-18 lg:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <div className="grid gap-7 border-b border-[#cfc7bf] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#b87586]">
                  {currentPage === 1
                    ? "Latest Insights"
                    : `Archive Page ${currentPage}`}
                </p>

                <h2 className="mt-4 max-w-4xl font-serif text-[45px] font-black leading-[0.98] tracking-[-0.05em] text-[#071b33] sm:text-[63px]">
                  {latestHeading}
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-500">
                {latestDescription}
              </p>
            </div>

            <div>
              {latestPosts.map(
                (post, index) => {
                  const articleNumber =
                    editorialPosts.length +
                    (currentPage - 1) *
                      POSTS_PER_PAGE +
                    index +
                    1;

                  return (
                    <article
                      key={post._id}
                      className="group border-b border-[#cfc7bf] py-9 sm:py-11"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="grid gap-7 lg:grid-cols-[80px_minmax(0,1fr)_300px] lg:items-center"
                      >
                        <div className="flex items-center justify-between lg:block">
                          <span className="font-serif text-[38px] font-black leading-none text-[#071b33]/15 transition group-hover:text-[#b87586]">
                            {String(
                              articleNumber,
                            ).padStart(2, "0")}
                          </span>

                          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b87586] lg:hidden">
                            {post.categories?.[0]
                              ?.title ||
                              "SAK Insight"}
                          </span>
                        </div>

                        <div className="max-w-3xl">
                          <div className="hidden items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#b87586] lg:flex">
                            <span>
                              {post.categories?.[0]
                                ?.title ||
                                "SAK Insight"}
                            </span>

                            <span className="h-1 w-1 rounded-full bg-[#b87586]" />

                            <span className="text-slate-400">
                              {formatDate(
                                post.publishedAt,
                              )}
                            </span>
                          </div>

                          <h3 className="mt-3 font-serif text-[31px] font-black leading-[1.04] tracking-[-0.04em] text-[#071b33] transition group-hover:text-[#b87586] sm:text-[40px]">
                            {post.title}
                          </h3>

                          <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-7 text-slate-600">
                            {post.excerpt}
                          </p>

                          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.13em] text-[#071b33]">
                            Read article

                            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </span>
                        </div>

                        <div className="relative h-[220px] overflow-hidden bg-[#071b33] sm:h-[280px] lg:h-[210px]">
                          <EditorialImage
                            image={post.coverImage}
                            title={post.title}
                            sizes="(max-width: 1024px) 100vw, 300px"
                            className="object-cover transition duration-[900ms] group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    </article>
                  );
                },
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav
                aria-label="Blog pagination"
                className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#cfc7bf] pt-8 sm:flex-row"
              >
                {currentPage > 1 ? (
                  <Link
                    href={buildBlogHref(
                      categorySlug,
                      currentPage - 1,
                    )}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#d8d1ca] bg-white px-5 text-xs font-extrabold text-[#071b33] transition hover:border-[#b87586] hover:text-[#b87586]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Page
                  </Link>
                ) : (
                  <span className="hidden h-11 sm:block" />
                )}

                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Page{" "}
                  <span className="text-[#071b33]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="text-[#071b33]">
                    {totalPages}
                  </span>
                </p>

                {currentPage < totalPages ? (
                  <Link
                    href={buildBlogHref(
                      categorySlug,
                      currentPage + 1,
                    )}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071b33] px-5 text-xs font-extrabold text-white transition hover:bg-[#b87586]"
                  >
                    Next Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="hidden h-11 sm:block" />
                )}
              </nav>
            )}
          </div>
        </section>
      )}
    </main>
  );
}