import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { copy } from "@/content/copy";

export const metadata: Metadata = { title: `${copy.tr.notFound.metaTitle} · ${copy.en.notFound.metaTitle}`, robots: { index: false } };

const pick = (l: "tr" | "en") => ({
  notFound: copy[l].notFound,
  nav: { portfolio: copy[l].nav.portfolio, contact: copy[l].nav.contact, news: copy[l].nav.news },
});

// Rendered inside the locale layout for unknown paths (see `[...rest]/page.tsx`).
export default function NotFound() {
  return <NotFoundView tr={pick("tr")} en={pick("en")} />;
}
