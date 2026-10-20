import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { copy } from "@/content/copy";
import { contact } from "@/content/fund";
import { isLocale, locales } from "@/lib/i18n";
import { getTranslationMap } from "@/lib/posts";
import { siteUrl } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit", display: "swap" });

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
  themeColor: "#002428",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Header locale={locale} nav={copy[locale].nav} platformUrl={contact.platformUrl} translations={getTranslationMap()} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
