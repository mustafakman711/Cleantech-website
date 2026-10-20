"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { Copy } from "@/content/copy";
import { otherLocale, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  nav: Copy["nav"];
  platformUrl: string;
  translations: Record<string, string>;
};

const links = ["about", "founders", "investors", "portfolio", "team", "news", "insights"] as const;

function switchPath(pathname: string, locale: Locale, translations: Record<string, string>) {
  if (translations[pathname]) return translations[pathname];
  const target = otherLocale(locale);
  const parts = pathname.split("/").filter(Boolean);
  // A post without a counterpart in the other language falls back to its listing page.
  if (parts.length === 3 && (parts[1] === "news" || parts[1] === "insights")) return `/${target}/${parts[1]}`;
  return "/" + [target, ...parts.slice(1)].join("/");
}

export function Header({ locale, nav, platformUrl, translations }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (key: string) => pathname.startsWith(`/${locale}/${key}`);
  const other = otherLocale(locale);
  const altHref = switchPath(pathname, locale, translations);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-white/5 bg-petrol-950/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-neon focus:px-4 focus:py-2 focus:text-petrol-950"
      >
        {nav.skip}
      </a>
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="shrink-0" aria-label="Cleantech Ventures">
          <Image src="/brand/cleantech-logo.svg" alt="Cleantech Ventures" width={120} height={48} priority className="h-11 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((key) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${key}`}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(key) ? "bg-white/10 text-neon" : "text-white/85 hover:text-neon"
                  }`}
                >
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-neon/50 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-neon hover:bg-neon/10 lg:inline-flex"
          >
            {nav.platform}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full bg-neon px-4 py-2 text-sm font-semibold text-petrol-950 transition-colors hover:bg-neon-300 sm:inline-flex"
          >
            {nav.contact}
          </Link>
          <Link
            href={altHref}
            hrefLang={other}
            title={nav.switchLanguage}
            className="ml-1 rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white/85 hover:text-neon"
          >
            <span className="sr-only">{nav.switchLanguage}: </span>
            {other}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-white hover:text-neon xl:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">{open ? nav.close : nav.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/5 bg-petrol-950 xl:hidden">
          <nav aria-label="Mobile" className="container-site flex flex-col gap-1 py-8">
            {[...links, "contact" as const].map((key) => (
              <Link
                key={key}
                href={`/${locale}/${key}`}
                aria-current={isActive(key) ? "page" : undefined}
                className={`border-b border-white/5 py-4 font-display text-2xl font-medium ${isActive(key) ? "text-neon" : "text-white"}`}
              >
                {nav[key]}
              </Link>
            ))}
            <a
              href={platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-neon/60 px-6 py-3.5 font-semibold"
            >
              {nav.platform}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
