import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { copy } from "@/content/copy";
import type { Company } from "@/content/portfolio";
import { tx, type Locale } from "@/lib/i18n";
import { LinkedInIcon } from "./icons";
import { CompanyPictogram } from "./pictograms";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/**
 * Typographic portfolio index (Extantia-style). Each row is a native <details>: summary shows pictogram,
 * big name, sector, HQ; the panel reveals description, three metrics, website, founders and the logo.
 * Reused by the portfolio page (`openSlugs` expands rows by default; every row stays expandable).
 */
export function PortfolioIndex({ companies, locale, openSlugs = [] }: { companies: Company[]; locale: Locale; openSlugs?: string[] }) {
  const c = copy[locale];
  const cols = c.home.portfolio.columns;
  return (
    <div>
      <div aria-hidden className="type-label hidden grid-cols-[4.5rem_minmax(0,1fr)_17rem_11rem_2.75rem] gap-x-6 pb-4 text-slate lg:grid">
        <span />
        <span>{cols.company}</span>
        <span>{cols.sector}</span>
        <span>{cols.hq}</span>
        <span />
      </div>
      <ul className="border-b border-line">
        {companies.map((co, i) => (
          <li key={co.slug} id={co.slug} className="scroll-mt-28 border-t border-line">
            <details className="disclosure group/row" open={openSlugs.includes(co.slug)}>
              <summary className="group grid cursor-pointer grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-x-4 py-6 transition-colors duration-500 [--pg-live:currentColor] hover:bg-volt/[0.05] hover:[--pg-live:var(--color-volt)] group-open/row:[--pg-live:var(--color-volt)] md:py-8 lg:grid-cols-[4.5rem_minmax(0,1fr)_17rem_11rem_2.75rem] lg:gap-x-6">
                <CompanyPictogram slug={co.slug} className="size-11 text-fog lg:size-14" />
                <span className="min-w-0">
                  <span className="block text-[clamp(1.875rem,1.1rem+3vw,3.75rem)] font-[440] leading-[0.98] tracking-[-0.04em] text-mist transition-transform duration-500 ease-out-expo [font-stretch:108%] group-hover:translate-x-2">
                    {co.name}
                  </span>
                  <span className="type-label mt-3 block text-slate lg:hidden">
                    {tx(co.sector, locale)} · {tx(co.hq, locale)}
                  </span>
                </span>
                <span className="type-label hidden text-fog lg:block">{tx(co.sector, locale)}</span>
                <span className="type-label hidden text-fog lg:block">
                  <span className="text-slate">{String(i + 1).padStart(2, "0")} · </span>
                  {tx(co.hq, locale)}
                </span>
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-mist transition-[transform,background-color,border-color,color] duration-500 group-hover:border-volt group-open/row:rotate-45 group-open/row:border-volt group-open/row:bg-volt group-open/row:text-abyss-950"
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </summary>

              <div className="grid gap-10 pb-12 pt-2 lg:grid-cols-[4.5rem_minmax(0,1fr)_17rem_11rem_2.75rem] lg:gap-x-6">
                <div className="hidden lg:block" />
                <div className="min-w-0">
                  <p className="type-lead max-w-[54ch] text-fog">{tx(co.description, locale)}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a
                      href={co.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-bracket inline-flex min-h-11 min-w-0 max-w-full items-center gap-2 px-4 text-sm text-mist"
                    >
                      <span className="truncate">{host(co.website)}</span>
                      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-volt" strokeWidth={1.75} />
                    </a>
                    <div className="flex h-11 items-center">
                      <Image
                        src={co.logo}
                        alt={co.name}
                        width={co.logoWidth}
                        height={co.logoHeight}
                        className={`w-auto object-contain opacity-80 ${co.logoWidth / co.logoHeight < 2.5 ? "h-10" : "h-6"}`}
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="type-label text-slate">{c.common.founders}</p>
                    <ul className="mt-2 flex flex-wrap gap-x-6">
                      {co.founders.map((f) => (
                        <li key={f.name}>
                          <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-[0.9375rem] text-mist hover:text-volt">
                            <LinkedInIcon className="size-3.5 text-fog" />
                            {f.name}
                            <span className="text-slate">· {tx(f.role, locale)}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid content-start self-start border-t border-line lg:col-span-3">
                  <p className="type-label pt-4 text-slate">{c.home.portfolio.highlights}</p>
                  <dl className="grid">
                  {co.highlights.map((h) => (
                    <div key={h.label.en} className="grid grid-cols-[minmax(0,9rem)_1fr] items-baseline gap-4 border-b border-line py-4">
                      <dt className="sr-only">{tx(h.label, locale)}</dt>
                      <dd className="text-[1.75rem] font-[400] leading-none tracking-[-0.03em] text-mist [font-stretch:118%] [font-variant-numeric:tabular-nums]">{tx(h.value, locale)}</dd>
                      <dd className="text-sm leading-snug text-fog">{tx(h.label, locale)}</dd>
                    </div>
                  ))}
                  </dl>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
