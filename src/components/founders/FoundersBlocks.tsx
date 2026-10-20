import { clusters } from "@/content/fund";
import { tx, type Locale, type L } from "@/lib/i18n";
import { sectorIcons } from "../icons";

const pad = (n: number) => String(n).padStart(2, "0");

/** Mono "term sheet" strip for the founders hero: stage / ticket / focus in hairline columns. */
export function TermSheet({ label, items }: { label: string; items: { label: string; value: string }[] }) {
  return (
    <div className="mt-16 md:mt-20">
      <p className="type-label flex items-center gap-2.5 text-slate">
        <span aria-hidden className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)]" />
        {label}
      </p>
      <dl className="mt-4 grid border-t border-line md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`grid grid-cols-[7.5rem_1fr] gap-x-4 border-b border-line py-4 md:grid-cols-1 md:gap-y-2 md:border-b-0 md:px-6 md:py-5 md:first:pl-0 ${
              i > 0 ? "md:border-l" : ""
            }`}
          >
            <dt className="type-label pt-0.5 text-slate">
              {String.fromCharCode(65 + i)}&nbsp;·&nbsp;{item.label}
            </dt>
            <dd className="type-mono leading-snug text-mist">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Investment criteria as large numbered hairline rows (editorial, not boxed). */
export function CriteriaRows({ items, locale }: { items: L[]; locale: Locale }) {
  return (
    <ol className="border-b border-line">
      {items.map((item, i) => (
        <li key={item.en} data-reveal className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 border-t border-line py-6 md:grid-cols-[4.5rem_1fr_auto] md:py-8">
          <span className="type-label text-fog">{pad(i + 1)}</span>
          <span className="text-[clamp(1.375rem,1rem+1.5vw,2.375rem)] font-[420] leading-[1.1] tracking-[-0.028em] text-mist transition-transform duration-500 ease-out-expo [font-stretch:106%] group-hover:translate-x-2">
            {tx(item, locale)}
          </span>
          <span aria-hidden className="hidden size-2 rounded-full border border-line-strong transition-colors duration-300 group-hover:border-volt group-hover:bg-volt md:block" />
        </li>
      ))}
    </ol>
  );
}

const focusCell = [
  "md:border-r md:pl-0 md:pr-8 xl:pr-8",
  "md:pl-8 md:pr-0 xl:border-r xl:px-8",
  "md:border-r md:pl-0 md:pr-8 xl:px-8",
  "md:pl-8 md:pr-0 xl:pl-8",
];

/**
 * Compact, static version of the home focus areas (no sticky moment): the four themes in a hairline
 * grid (1 → 2 → 4 columns), each with its sectors as icon rows and mono codes.
 */
export function FocusCompact({ locale, areasLabel }: { locale: Locale; areasLabel: string }) {
  return (
    <div className="grid border-t border-line md:grid-cols-2 xl:grid-cols-4 xl:border-b">
      {clusters.map((c, i) => (
        <article
          key={c.title.en}
          data-reveal
          className={`flex flex-col border-b border-line py-10 xl:border-b-0 ${focusCell[i % 4]}`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="type-label text-fog">[ {pad(i + 1)} ]</span>
            <span className="type-label text-slate">
              {pad(c.sectors.length)} {areasLabel}
            </span>
          </div>
          <h3 className="type-h3 mt-8 text-mist">{tx(c.title, locale)}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-fog">{tx(c.summary, locale)}</p>
          <ul className="mt-8 border-t border-line">
            {c.sectors.map((s, j) => {
              const Icon = sectorIcons[s.key];
              return (
                <li key={s.key} className="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem] leading-snug text-mist">
                  <Icon aria-hidden className="size-4 shrink-0 text-volt" strokeWidth={1.5} />
                  <span className="min-w-0 flex-1">{tx(s.name, locale)}</span>
                  <span className="type-label text-slate">
                    {pad(i + 1)}.{pad(j + 1)}
                  </span>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
