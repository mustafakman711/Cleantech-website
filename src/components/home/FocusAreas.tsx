import { clusters } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";
import { sectorIcons } from "../icons";
import { ScrollSpy } from "../ScrollSpy";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Home 02 — signature moment. Desktop: a sticky column lists the four themes; as each theme's panel
 * crosses the viewport centre it lights up (ScrollSpy), with a progress rail and a "Skip" link.
 * Mobile: a plain stacked list (no sticky).
 */
export function FocusAreas({ locale, areasLabel, skipLabel, skipHref, themesLabel }: { locale: Locale; areasLabel: string; skipLabel: string; skipHref: string; themesLabel: string }) {
  const total = clusters.length;
  return (
    <ScrollSpy total={total} className="relative grid gap-x-6 lg:grid-cols-12">
      {/* Sticky theme index (lg+) */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2.5rem)] pb-10">
          <div className="flex items-center justify-between">
            <p className="type-label text-slate">{themesLabel}</p>
            <a href={skipHref} className="type-label inline-flex min-h-10 items-center gap-1.5 text-fog hover:text-volt">
              {skipLabel} <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="relative mt-4">
            {/* progress rail */}
            <span aria-hidden className="absolute -left-5 top-0 h-full w-px bg-line">
              <span className="spy-rail-fill absolute inset-0 bg-volt shadow-[0_0_8px_rgb(44_255_152/0.8)]" />
            </span>
            <ol className="border-b border-line">
              {clusters.map((c, i) => (
                <li key={c.title.en} data-spy-item={i} className="spy-item border-t border-line">
                  <a href={`#theme-${i + 1}`} className="group flex min-h-11 items-center gap-4 py-5 outline-offset-0">
                    <span className="type-label w-8 shrink-0 text-slate">{pad(i + 1)}</span>
                    <span className="spy-name spy-accent text-[clamp(1.625rem,2.4vw,2.625rem)] font-[440] leading-[1.02] tracking-[-0.03em] [font-stretch:110%] group-hover:text-mist">
                      {tx(c.title, locale)}
                    </span>
                    <span aria-hidden className="spy-node ml-auto size-2 shrink-0 rounded-full bg-volt shadow-[0_0_10px_rgb(44_255_152/0.9)]" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Panels */}
      <div className="lg:col-span-7">
        {clusters.map((c, i) => (
          <article
            key={c.title.en}
            id={`theme-${i + 1}`}
            data-spy-panel={i}
            className="spy-panel flex scroll-mt-28 flex-col justify-center border-t border-line py-12 first:border-t-0 lg:min-h-[66vh] lg:first:border-t lg:py-16"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="type-label text-slate">[ {pad(i + 1)} / {pad(total)} ]</p>
              <p className="type-label text-slate">
                {pad(c.sectors.length)} {areasLabel}
              </p>
            </div>
            <h3 className="type-h3 mt-6 text-mist lg:sr-only">{tx(c.title, locale)}</h3>
            <p className="type-lead mt-4 max-w-[40ch] text-mist lg:mt-0 lg:text-[clamp(1.375rem,1rem+1vw,2rem)] lg:leading-[1.25] lg:tracking-[-0.015em]">
              {tx(c.summary, locale)}
            </p>
            <ul className="spy-trace relative ml-1.5 mt-10 border-l border-line-strong">
              {c.sectors.map((s, j) => {
                const Icon = sectorIcons[s.key];
                return (
                  <li key={s.key} className="relative flex items-center gap-4 py-3.5 pl-8 md:py-4">
                    <span aria-hidden className="absolute left-0 top-1/2 h-px w-5 bg-line-strong" />
                    <span aria-hidden className="spy-via absolute left-5 top-1/2 size-2 -translate-y-1/2 rounded-full border border-line-strong bg-abyss-900" />
                    <Icon aria-hidden className="ml-2 size-5 shrink-0 text-fog" strokeWidth={1.4} />
                    <span className="text-lg text-mist md:text-xl">{tx(s.name, locale)}</span>
                    <span className="type-label ml-auto text-slate">
                      {pad(i + 1)}.{pad(j + 1)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </ScrollSpy>
  );
}
