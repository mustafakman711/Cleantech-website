import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Languages } from "lucide-react";
import { copy } from "@/content/copy";
import { formatDate, otherLocale, type Locale } from "@/lib/i18n";
import { getPost, getPosts, renderMarkdown, type Post, type PostType } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, ChapterLabel, CornerTicks, PageHero } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");
const pageCopy = (locale: Locale, type: PostType) => (type === "news" ? copy[locale].newsPage : copy[locale].insightsPage);
const postHref = (locale: Locale, post: Post) => `/${locale}/${post.type}/${post.slug}`;
const readingMinutes = (body: string) => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200));

/** Focus ring on the whole card/row when its (stretched) link is focused (QA #12). */
const cardFocus = "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-volt";

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** Featured (latest) post: 16:9 image with corner ticks + headline column. */
function FeaturedPost({ post, locale, label }: { post: Post; locale: Locale; label: string }) {
  return (
    <article className={`group relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-6 ${cardFocus}`}>
      {post.image && (
        <div className="relative aspect-video overflow-hidden bg-abyss-850 lg:col-span-7">
          <Image
            src={post.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover saturate-[0.85] transition duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
          />
          <CornerTicks />
        </div>
      )}
      <div className={post.image ? "lg:col-span-5" : "lg:col-span-9"}>
        <p className="type-label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-volt">● {label}</span>
          <time dateTime={post.date} className="text-slate">
            {formatDate(post.date, locale)}
          </time>
        </p>
        <h2 className="mt-5 text-[clamp(1.5rem,1rem+1.3vw,2.375rem)] font-[440] leading-[1.08] tracking-[-0.03em] text-mist transition-colors [font-stretch:106%] group-hover:text-volt">
          <Link href={postHref(locale, post)} className="outline-none after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-5 line-clamp-4 max-w-[52ch] leading-relaxed text-fog">{post.excerpt}</p>
        <span className="mt-8 inline-flex min-h-10 items-center gap-2 text-[0.9375rem] font-medium text-mist">
          <span className="link-trace pb-0.5">{copy[locale].common.readMore}</span>
          <ArrowRight aria-hidden className="size-4 text-volt transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}

/** Editorial hairline row: date (mono) | title + excerpt | thumbnail | arrow. */
function PostRow({ post, locale, index }: { post: Post; locale: Locale; index: number }) {
  return (
    <li className={`group relative border-b border-line ${cardFocus} has-[a:focus-visible]:outline-offset-0`}>
      <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 py-8 transition-colors duration-300 group-hover:bg-volt/[0.035] md:grid-cols-[10rem_1fr_auto] md:py-10 lg:grid-cols-[3rem_10rem_1fr_13rem_auto]">
        <span className="type-label hidden pt-1.5 text-slate lg:block">{pad(index)}</span>
        <time dateTime={post.date} className="type-label col-span-2 pt-1.5 text-fog md:col-span-1">
          {formatDate(post.date, locale)}
        </time>
        <div className="min-w-0">
          <h3 className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-[460] leading-[1.18] tracking-[-0.02em] text-mist transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-volt">
            <Link href={postHref(locale, post)} className="outline-none after:absolute after:inset-0">
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">{post.excerpt}</p>
        </div>
        {post.image ? (
          <div className="relative hidden aspect-video w-full overflow-hidden bg-abyss-850 lg:block">
            <Image src={post.image} alt="" fill sizes="208px" className="object-cover opacity-80 saturate-[0.7] transition duration-700 group-hover:opacity-100 group-hover:saturate-100" />
          </div>
        ) : (
          <span className="hidden lg:block" />
        )}
        <ArrowUpRight
          aria-hidden
          className="row-start-2 mt-1 size-5 text-fog transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt md:row-start-auto"
          strokeWidth={1.5}
        />
      </div>
    </li>
  );
}

/** Card for 3-col grids: 16:9 image, mono date, clamped title. Whole card is the link. */
function PostTile({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <article className={`group relative flex min-w-0 flex-col ${cardFocus}`}>
      {post.image && (
        <div className="relative aspect-video overflow-hidden bg-abyss-850">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover saturate-[0.8] transition duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col border-b border-line pb-6 pt-5">
        <time dateTime={post.date} className="type-label text-slate">
          {formatDate(post.date, locale)}
        </time>
        <h3 className="mt-3 line-clamp-4 text-lg font-[480] leading-snug tracking-[-0.01em] text-mist transition-colors group-hover:text-volt md:text-xl">
          <Link href={postHref(locale, post)} className="outline-none after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-fog">{post.excerpt}</p>
        <span aria-hidden className="mt-auto flex justify-end pt-5">
          <ArrowRight className="size-4 text-volt transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export function postIndexMetadata(locale: Locale, type: PostType): Metadata {
  const c = pageCopy(locale, type);
  return pageMetadata({ locale, path: `/${type}`, title: c.title, description: c.lead });
}

/**
 * News: featured latest post + editorial hairline rows.
 * Insights: featured + a 2/3-col card grid of complete rows only (a multiple of 6 so there is never an
 * orphan card at md or lg — QA #17); any remainder continues as editorial rows.
 */
export function PostIndex({ locale, type }: { locale: Locale; type: PostType }) {
  const c = pageCopy(locale, type);
  const common = copy[locale].common;
  const [featured, ...rest] = getPosts(locale, type);
  const total = rest.length + (featured ? 1 : 0);
  // Cards in complete rows (multiple of 6 → full rows at 2 and 3 columns), capped at two rows of three;
  // everything after that continues as an editorial list.
  const useGrid = type === "insights" && rest.length >= 6;
  const gridCount = useGrid ? Math.min(12, rest.length - (rest.length % 6)) : 0;
  const grid = rest.slice(0, gridCount);
  const rows = rest.slice(gridCount);

  return (
    <>
      <PageHero eyebrow={c.title} title={c.heading} lead={c.lead}>
        {featured && (
          <p className="type-label mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate">
            <span className="text-mist">
              [ {pad(total)} ] {c.count}
            </span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>
              {common.latest}: <time dateTime={featured.date}>{formatDate(featured.date, locale)}</time>
            </span>
          </p>
        )}
      </PageHero>

      {featured && (
        <section aria-label={copy[locale].home.news.featured} className="section-y-tight relative bg-abyss-900 md:pt-24">
          <div className="container-site">
            <FeaturedPost post={featured} locale={locale} label={type === "news" ? copy[locale].home.news.featured : common.latest} />
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="archive-title" className="section-y relative bg-abyss-900 pt-12 md:pt-16">
          <div className="container-site">
            <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
              <ChapterLabel index="01" label={c.label} />
              <h2 id="archive-title" className="sr-only">
                {c.label}
              </h2>
              <span className="type-label text-slate">{pad(rest.length)}</span>
            </div>

            {grid.length > 0 && (
              <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {grid.map((post) => (
                  <PostTile key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            )}

            {rows.length > 0 && grid.length > 0 && (
              <div className="mt-24 flex items-end justify-between gap-6 border-b border-line pb-5 md:mt-32">
                <ChapterLabel index="02" label={common.relatedPosts} />
                <span className="type-label text-slate">{pad(rows.length)}</span>
              </div>
            )}
            {rows.length > 0 && (
              <ul>
                {rows.map((post, i) => (
                  <PostRow key={post.slug} post={post} locale={locale} index={gridCount + i + 2} />
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Article                                                             */
/* ------------------------------------------------------------------ */

export function postStaticParams(locale: string, type: PostType) {
  return getPosts(locale as Locale, type).map((p) => ({ slug: p.slug }));
}

export function postMetadata(locale: Locale, type: PostType, slug: string): Metadata {
  const post = getPost(locale, type, slug);
  if (!post) return {};
  const metadata = pageMetadata({
    locale,
    path: `/${type}/${slug}`,
    title: post.title,
    description: post.excerpt,
    altPath: post.translationSlug ? `/${otherLocale(locale)}/${type}/${post.translationSlug}` : null,
    image: post.image,
  });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date } };
}

/**
 * Article: asymmetric 12-col — a mono metadata rail in cols 1–3 (sticky on lg), display H1, 16:9 image
 * and a 68ch body from col 4 (QA #22). Related posts as a 3-col row (no orphan at 768 — QA #17).
 */
export function PostArticle({ locale, type, slug }: { locale: Locale; type: PostType; slug: string }) {
  const post = getPost(locale, type, slug);
  if (!post) notFound();
  const c = copy[locale];
  const pc = pageCopy(locale, type);
  const related = getPosts(locale, type)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const minutes = readingMinutes(post.body);
  const toc = Array.from(post.body.matchAll(/^## +(.+)$/gm), (m) => m[1].replace(/[*_`]/g, "").trim());
  let h2 = 0;
  const html = renderMarkdown(post.body).replace(/<h2>/g, () => `<h2 id="s-${++h2}">`);
  const other = otherLocale(locale);

  const meta = (
    <ul className="type-label flex flex-wrap items-center gap-x-6 gap-y-3 text-mist lg:flex-col lg:items-start">
      <li className="flex items-center gap-2.5">
        <span aria-hidden className="size-1.5 rounded-full bg-volt" />
        <span className="sr-only">{c.common.published}: </span>
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      </li>
      <li className="text-fog">
        {minutes} {c.common.readingTime}
      </li>
      {post.translationSlug && (
        <li>
          <Link
            href={`/${other}/${type}/${post.translationSlug}`}
            hrefLang={other}
            lang={other}
            className="-my-2 inline-flex min-h-10 items-center gap-2 text-fog transition-colors hover:text-volt"
          >
            <Languages aria-hidden className="size-4 text-volt" strokeWidth={1.5} />
            {c.common.readInOther}
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <>
      <article className="relative bg-abyss-900">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(70%_80%_at_85%_0%,rgb(0_76_84/0.5),transparent_70%)]" />
        <div className="container-site relative grid gap-y-10 pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pb-32 md:pt-[calc(var(--header-h)+4.5rem)] lg:grid-cols-12 lg:gap-x-6">
          {/* rail */}
          <div className="lg:col-span-3 lg:row-span-3">
            <Link href={`/${locale}/${type}`} className="type-label -ml-1 inline-flex min-h-11 items-center gap-2 pl-1 pr-3 text-fog transition-colors hover:text-volt">
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
              {pc.title}
            </Link>
            <div className="mt-8 hidden border-t border-line pt-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:block">
              {meta}
              {toc.length > 1 && (
                <nav aria-label={c.common.contents} className="mt-10 border-t border-line pt-6">
                  <p className="type-label text-slate">{c.common.contents}</p>
                  <ol className="mt-4">
                    {toc.map((t, i) => (
                      <li key={t}>
                        <a
                          href={`#s-${i + 1}`}
                          className="group grid min-h-10 grid-cols-[2rem_1fr] items-baseline gap-x-2 py-1.5 text-[0.875rem] leading-snug text-fog transition-colors hover:text-mist"
                        >
                          <span className="type-label text-slate group-hover:text-volt">{pad(i + 1)}</span>
                          <span className="pr-6">{t}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          </div>

          <header className="animate-rise lg:col-span-9">
            <ChapterLabel label={pc.title} />
            <h1 className="mt-8 max-w-[24ch] text-[clamp(2.125rem,1rem+3.4vw,4.75rem)] font-[430] leading-[1.0] tracking-[-0.035em] text-mist [font-stretch:108%]">
              {post.title}
            </h1>
            <div className="mt-10 border-y border-line py-5 lg:hidden">{meta}</div>
          </header>

          {post.image && (
            <div className="relative aspect-video overflow-hidden bg-abyss-850 lg:col-span-9 lg:col-start-4">
              <Image src={post.image} alt="" fill priority sizes="(min-width: 1024px) 72vw, 100vw" className="object-cover" />
              <CornerTicks />
            </div>
          )}

          <div className="min-w-0 lg:col-span-7 lg:col-start-4">
            <div className="prose-ct mt-4 lg:mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y relative border-t border-line bg-abyss-950">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <ChapterLabel label={c.common.keepReading} />
                <h2 id="related-title" className="type-h2 mt-8 text-mist">
                  {c.common.relatedPosts}
                </h2>
              </div>
              <ButtonLink href={`/${locale}/${type}`} variant="text">
                {type === "news" ? c.common.allNews : c.common.allInsights}
              </ButtonLink>
            </div>
            <div className={`mt-14 grid gap-x-6 gap-y-12 ${related.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {related.map((p) => (
                <PostTile key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
