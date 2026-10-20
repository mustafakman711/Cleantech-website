"use client";

import { usePathname } from "next/navigation";
import type { Copy } from "@/content/copy";
import { BrokenTrace } from "./BrokenTrace";
import { ButtonLink, ChapterLabel, withAccent } from "./ui";

type Strings = { notFound: Copy["notFound"]; nav: Pick<Copy["nav"], "portfolio" | "contact" | "news"> };

/** Branded 404. `not-found.tsx` has no params, so the locale is read from the URL on the client. */
export function NotFoundView({ tr, en }: { tr: Strings; en: Strings }) {
  const pathname = usePathname() ?? "/tr";
  const locale = pathname.split("/")[1] === "en" ? "en" : "tr";
  const t = locale === "en" ? en : tr;
  const [first, ...rest] = t.notFound.title.split(" ");

  return (
    <section lang={locale} className="relative flex min-h-[88svh] items-end overflow-hidden border-b border-line bg-abyss-900">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_60%_40%,rgb(0_76_84/0.5),transparent_70%)]" />
      <BrokenTrace className="absolute inset-x-0 top-[22%] h-auto w-full opacity-90 md:top-[18%]" />
      <div className="container-site relative pb-20 pt-[45svh] md:pb-28">
        <ChapterLabel index="404" label={t.notFound.code} />
        <h1 className="type-display mt-8 text-mist">{withAccent(t.notFound.title, rest.join(" ") || first)}</h1>
        <p className="type-lead mt-8 max-w-[52ch] text-fog">{t.notFound.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`/${locale}`}>{t.notFound.home}</ButtonLink>
          <ButtonLink href={`/${locale}/portfolio`} variant="bracket">
            {t.nav.portfolio}
          </ButtonLink>
          <ButtonLink href={`/${locale}/contact`} variant="bracket">
            {t.nav.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
