import type { NextConfig } from "next";
import posts from "./src/content/posts.json";

// Permanent redirects from the previous WordPress site so existing links and search rankings keep working.
const legacyPages: [string, string][] = [
  ["/hakkimizda", "/tr/about"],
  ["/ekibimiz", "/tr/team"],
  ["/yatirimlarimiz", "/tr/portfolio"],
  ["/bultenler", "/tr/news"],
  ["/blog", "/tr/insights"],
  ["/bize-ulasin", "/tr/contact"],
  ["/vergi-avantaji", "/tr/investors"],
  ["/en/home", "/en"],
  ["/en/investments", "/en/portfolio"],
  ["/en/blog-2", "/en/insights"],
];

const legacyPosts: [string, string][] = posts.map((p) => [
  p.lang === "tr" ? `/${p.legacySlug}` : `/en/${p.legacySlug}`,
  `/${p.lang}/${p.type}/${p.slug}`,
]);

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/tr", permanent: false },
      ...[...legacyPages, ...legacyPosts]
        .filter(([source, destination]) => source !== destination)
        .map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
