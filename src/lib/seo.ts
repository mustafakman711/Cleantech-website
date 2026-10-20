import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { otherLocale, type Locale } from "./i18n";

export const siteUrl = "https://cleantechgsyf.com";

/**
 * Builds page metadata with canonical and hreflang alternates.
 * `path` is the locale-less path (e.g. "/about"); `altPath` overrides the other locale's full path.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  altPath,
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  altPath?: string | null;
  image?: string | null;
}): Metadata {
  const other = otherLocale(locale);
  const canonical = `/${locale}${path}`;
  const languages: Record<string, string> = { [locale]: canonical };
  if (altPath !== null) languages[other] = altPath ?? `/${other}${path}`;
  const desc = description ?? copy[locale].meta.description;

  return {
    title,
    description: desc,
    alternates: { canonical, languages },
    openGraph: {
      title: title ?? copy[locale].meta.siteName,
      description: desc,
      url: canonical,
      siteName: copy[locale].meta.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", site: "@cleantechgsyf" },
  };
}
