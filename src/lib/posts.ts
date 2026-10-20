import { marked } from "marked";
import raw from "@/content/posts.json";
import type { Locale } from "./i18n";

export type PostType = "news" | "insights";

export type Post = {
  id: number;
  lang: Locale;
  type: PostType;
  slug: string;
  legacySlug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  body: string;
  translationSlug?: string;
};

const posts = raw as Post[];

export function getPosts(locale: Locale, type?: PostType): Post[] {
  return posts.filter((p) => p.lang === locale && (!type || p.type === type));
}

export function getPost(locale: Locale, type: PostType, slug: string): Post | undefined {
  return posts.find((p) => p.lang === locale && p.type === type && p.slug === slug);
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}

/** Maps every localized post path to its counterpart in the other locale. */
export function getTranslationMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const p of posts) {
    if (!p.translationSlug) continue;
    const other = p.lang === "tr" ? "en" : "tr";
    map[`/${p.lang}/${p.type}/${p.slug}`] = `/${other}/${p.type}/${p.translationSlug}`;
  }
  return map;
}
