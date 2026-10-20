import type { Copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { CountUp } from "../CountUp";
import { SectionHeader } from "../ui";

type Stats = Copy["home"]["stats"];

/**
 * Light "bone" band: a hairline ledger of the fund's verifiable figures (General Catalyst / 2150 pattern).
 * Numbers count up once on enter; final values are in the server HTML. Every figure carries a mono source line.
 */
export function StatsLedger({ stats, locale, index }: { stats: Stats; locale: Locale; index?: string }) {
  const numeric = stats.items.filter((s) => s.value !== undefined);
  const ticker = stats.items.find((s) => s.text);
  const nf = locale === "tr" ? "tr-TR" : "en-GB";
  return (
    <section aria-labelledby="stats-title" className="band-bone section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(0_36_40/0.07)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="container-site relative">
        <SectionHeader id="stats-title" index={index} label={stats.label} title={stats.title} accent={stats.accent} tone="light" />
        <dl className="mt-16 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
          {numeric.map((s) => (
            <div key={s.label} className="flex flex-col border-t border-abyss-900/80 pb-10 pt-6 lg:pb-0" data-reveal>
              <dt className="sr-only">{s.label}</dt>
              <dd className="order-1 type-stat whitespace-nowrap text-abyss-900">
                {s.value !== undefined && <CountUp to={s.value} locale={nf} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />}
                {s.unit && <span className="ml-2 align-top font-mono text-[0.7rem] font-medium tracking-[0.1em] [font-stretch:100%]">{s.unit}</span>}
              </dd>
              <dd className="order-2 mt-6 max-w-[22ch] text-[0.9375rem] leading-snug text-abyss-900">{s.label}</dd>
              <dd className="type-label order-3 mt-4 text-bone-ink">↳ {s.source}</dd>
            </div>
          ))}
        </dl>
        {ticker && (
          <dl className="mt-6 grid items-end gap-6 border-y border-abyss-900/80 py-8 md:grid-cols-12 lg:mt-16" data-reveal>
            <dt className="sr-only">{ticker.label}</dt>
            <dd className="md:col-span-5">
              <span className="type-stat block text-abyss-900">{ticker.text}</span>
            </dd>
            <dd className="text-[0.9375rem] leading-snug text-abyss-900 md:col-span-4">{ticker.label}</dd>
            <dd className="type-label text-bone-ink md:col-span-3 md:text-right">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-volt-ink align-middle" aria-hidden />
              {ticker.source}
            </dd>
          </dl>
        )}
      </div>
    </section>
  );
}
