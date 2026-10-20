import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Languages } from "lucide-react";
import { copy } from "@/content/copy";
import { formatDate, otherLocale, type Locale } from "@/lib/i18n";
import { getPost, getPosts, renderMarkdown, type PostType } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PostCard } from "./sections";
import { PageHero } from "./ui";

const pageCopy = (locale: Locale, type: PostType) => (type === "news" ? copy[locale].newsPage : copy[locale].insightsPage);

export function postIndexMetadata(locale: Locale, type: PostType): Metadata {
  const c = pageCopy(locale, type);
  return pageMetadata({ locale, path: `/${type}`, title: c.title, description: c.lead });
}

export function PostIndex({ locale, type }: { locale: Locale; type: PostType }) {
  const c = pageCopy(locale, type);
  const posts = getPosts(locale, type);
  return (
    <>
      <PageHero eyebrow={copy[locale].meta.siteName} title={c.title} lead={c.lead} />
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

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

export function PostArticle({ locale, type, slug }: { locale: Locale; type: PostType; slug: string }) {
  const post = getPost(locale, type, slug);
  if (!post) notFound();
  const c = copy[locale];
  const related = getPosts(locale, type)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-petrol-800">
          <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="container-site relative max-w-4xl pb-14 pt-36 sm:pt-44">
            <Link href={`/${locale}/${type}`} className="type-label -my-2 inline-flex min-h-10 items-center gap-2 text-fog hover:text-volt">
              <ArrowLeft aria-hidden className="size-4" />
              {pageCopy(locale, type).title}
            </Link>
            <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mist/80">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              {post.translationSlug && (
                <Link
                  href={`/${otherLocale(locale)}/${type}/${post.translationSlug}`}
                  hrefLang={otherLocale(locale)}
                  className="inline-flex items-center gap-1.5 text-neon hover:text-neon-300"
                >
                  <Languages aria-hidden className="size-4" />
                  {c.common.readInOther}
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className="container-site max-w-4xl py-14 sm:py-20">
          {post.image && (
            <div className="relative mb-12 aspect-video overflow-hidden border border-line">
              <Image src={post.image} alt="" fill priority sizes="(min-width: 896px) 832px, 100vw" className="object-cover" />
            </div>
          )}
          <div className="prose-ct" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-white/5 bg-petrol-850 py-20">
          <div className="container-site">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{c.common.relatedPosts}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
