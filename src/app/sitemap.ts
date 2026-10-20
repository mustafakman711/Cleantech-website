import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";

const pages = ["", "/about", "/founders", "/investors", "/portfolio", "/team", "/news", "/insights", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])) },
    })),
  );
  const posts = locales.flatMap((locale) =>
    getPosts(locale).map((p) => ({
      url: `${siteUrl}/${locale}/${p.type}/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: p.type === "news" ? 0.6 : 0.4,
    })),
  );
  return [...staticPages, ...posts];
}
