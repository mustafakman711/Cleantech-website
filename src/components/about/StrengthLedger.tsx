import { strengths } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";

/**
 * "Why us" as a numbered hairline ledger for the light (bone) band. 6 items → 1 / 2 / 3 columns, always full rows.
 * Each item: mono index on a short trace with a node, title, text. Ink colours only (no volt on light).
 */
export function StrengthLedger({ locale }: { locale: Locale }) {
  return (
    <ol className="grid gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {strengths.map((s, i) => (
        <li key={s.title.en} className="group border-t border-abyss-900/80 pb-12 pt-6 md:pb-14" data-reveal>
          <p aria-hidden className="type-label flex items-center gap-3 text-bone-ink">
            <span className="text-abyss-900">{String(i + 1).padStart(2, "0")}</span>
            <span className="relative h-px w-8 bg-abyss-900/25 transition-[width] duration-500 ease-out-expo group-hover:w-14">
              <span className="absolute -right-0.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-volt-ink" />
            </span>
          </p>
          <h3 className="type-h3 mt-8 max-w-[18ch] text-abyss-900">{tx(s.title, locale)}</h3>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-bone-ink">{tx(s.text, locale)}</p>
        </li>
      ))}
    </ol>
  );
}
