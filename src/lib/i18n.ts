export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A string available in every locale. */
export type L = Record<Locale, string>;

export function tx(value: L, locale: Locale): string {
  return value[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
