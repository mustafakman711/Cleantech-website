import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Mona_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { GridFrame } from "@/components/GridFrame";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { copy } from "@/content/copy";
import { contact } from "@/content/fund";
import { isLocale, locales } from "@/lib/i18n";
import { getTranslationMap } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import "../globals.css";

// Mona Sans (variable wght + wdth) carries display and body; Geist Mono is the "instrument" layer;
// Instrument Serif italic is reserved for one accent word per headline.
const mona = Mona_Sans({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-mona", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = copy[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${c.meta.siteName} | Cleantech GSYF`, template: `%s | ${c.meta.siteName}` },
    description: c.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#001417",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${mona.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <GridFrame />
        <RevealObserver />
        <Header locale={locale} nav={copy[locale].nav} platformUrl={contact.platformUrl} translations={getTranslationMap()} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
