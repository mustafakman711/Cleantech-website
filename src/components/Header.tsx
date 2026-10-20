"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "@/content/copy";
import { otherLocale, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

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
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButton.current?.focus());
  }, []);

  // Close on route change (no focus restore: the new page takes focus).
  useEffect(() => setOpen(false), [pathname]);

  // Scroll lock, Escape, focus trap.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const el = dialog.current;
    const focusables = () => Array.from(el?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (key: string) => pathname.startsWith(`/${locale}/${key}`);
  const other = otherLocale(locale);
  const altHref = switchPath(pathname, locale, translations);

  const langLink = (className: string) => (
    <Link href={altHref} hrefLang={other} lang={other} className={className}>
      <span className="sr-only">{nav.switchLanguage}</span>
      <span aria-hidden className="type-label">
        {locale.toUpperCase()}
        <span className="mx-1 text-slate">/</span>
        <span className="text-mist">{other.toUpperCase()}</span>
      </span>
    </Link>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-line bg-abyss-950/75 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-volt focus:px-4 focus:py-2.5 focus:text-abyss-950"
      >
        {nav.skip}
      </a>
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={`/${locale}`} className="-my-2 shrink-0 py-2" aria-label={`Cleantech Ventures — ${nav.home}`}>
          <Logo priority className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((key) => {
              const active = isActive(key);
              return (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key}`}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center px-3 text-sm transition-colors ${active ? "text-mist" : "text-fog hover:text-mist"}`}
                  >
                    {nav[key]}
                    <span
                      aria-hidden
                      className={`absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)] transition-opacity ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 px-3 text-sm text-fog transition-colors hover:text-mist xl:inline-flex"
          >
            {nav.platform}
            <ArrowUpRight aria-hidden className="size-3.5 text-volt" strokeWidth={1.75} />
          </a>
          <Link
            href={`/${locale}/contact`}
            className="hidden min-h-10 items-center rounded-full bg-volt px-4 text-sm font-medium text-abyss-950 transition-colors hover:bg-volt-300 sm:inline-flex"
          >
            {nav.contact}
          </Link>
          {langLink("inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-fog transition-colors hover:text-mist")}
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group inline-flex min-h-11 items-center gap-2.5 pl-2 text-mist xl:hidden"
          >
            <span className="type-label hidden sm:inline">{nav.menu}</span>
            <span aria-hidden className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong transition-colors group-hover:border-volt">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 translate-x-1 bg-current transition-transform group-hover:translate-x-0" />
            </span>
            <span className="sr-only sm:hidden">{nav.menu}</span>
          </button>
        </div>
      </div>

      {/* Portal: the header's backdrop-filter would otherwise become the containing block of this fixed overlay. */}
      {open &&
        createPortal(
        <div
          id="site-menu"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-abyss-950 xl:hidden"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
          <div className="container-site relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href={`/${locale}`} onClick={() => close(false)} aria-label={`Cleantech Ventures — ${nav.home}`}>
              <Logo className="h-8 w-auto md:h-9" />
            </Link>
            <button type="button" onClick={() => close()} className="group inline-flex min-h-11 items-center gap-2.5 text-mist">
              <span className="type-label">{nav.close}</span>
              <span aria-hidden className="relative flex size-11 items-center justify-center rounded-full border border-line-strong group-hover:border-volt">
                <span className="absolute h-px w-4 rotate-45 bg-current" />
                <span className="absolute h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>
          <nav aria-label="Mobile" className="container-site relative flex flex-1 flex-col pb-10 pt-6">
            <ol className="border-b border-line">
              {[...links, "contact" as const].map((key, i) => {
                const active = isActive(key);
                return (
                  <li key={key} className="border-t border-line">
                    <Link
                      href={`/${locale}/${key}`}
                      aria-current={active ? "page" : undefined}
                      onClick={() => close(false)}
                      className="group flex items-baseline gap-4 py-3.5 md:py-4"
                      style={{ animation: `rise .7s var(--ease-out-expo) both ${0.04 * i}s` }}
                    >
                      <span className="type-label w-8 shrink-0 text-slate">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`text-[clamp(1.75rem,7vw,3rem)] font-[450] leading-none tracking-[-0.03em] [font-stretch:110%] transition-colors ${
                          active ? "text-volt" : "text-mist group-hover:text-volt"
                        }`}
                      >
                        {nav[key]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
              <a href={platformUrl} target="_blank" rel="noopener noreferrer" className="btn-bracket inline-flex min-h-11 items-center gap-2 px-5 text-sm text-mist">
                {nav.platform}
                <ArrowUpRight aria-hidden className="size-4 text-volt" strokeWidth={1.75} />
              </a>
              {langLink("inline-flex min-h-11 items-center px-2 text-fog hover:text-mist")}
            </div>
          </nav>
        </div>,
          document.body,
        )}
    </header>
  );
}
