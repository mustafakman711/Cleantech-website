import type { ReactNode } from "react";
import type { TaxRow } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";

/** Highlights the 0% figures in a tax cell (mono, volt) — data highlight, not decoration. */
function mark(text: string): ReactNode {
  return text.split(/((?<![\d.,])0%|%0(?![\d.,]))/g).map((part, i) =>
    part === "%0" || part === "0%" ? (
      <span key={i} className="font-mono text-[0.95em] text-volt">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Tax table in the hairline system (QA #10): `table-fixed` + identical <colgroup> widths, so stacked
 * tables line up column for column. Below `sm` the same data renders as a stacked definition list.
 */
export function TaxTable({
  code,
  title,
  rows,
  locale,
  labels,
}: {
  code: string;
  title: string;
  rows: TaxRow[];
  locale: Locale;
  labels: { income: string; residents: string; nonResidents: string; table: string };
}) {
  const id = `tax-${code.toLowerCase()}`;
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-4 border-b border-mist/40 pb-4">
        <h3 id={id} className="type-h3 text-mist">
          {title}
        </h3>
        <span className="type-label text-slate">
          [ {labels.table} {code} ]
        </span>
      </div>

      {/* < sm: stacked */}
      <dl className="sm:hidden" aria-labelledby={id}>
        {rows.map((row) => (
          <div key={row.label.en} className="border-b border-line py-5">
            <dt className="font-medium text-mist">{tx(row.label, locale)}</dt>
            <dd className="mt-3 grid grid-cols-[7rem_1fr] gap-x-3 text-[0.9375rem] leading-relaxed text-fog">
              <span className="type-label pt-1 text-slate">{labels.residents}</span>
              <span>{mark(tx(row.residents, locale))}</span>
            </dd>
            <dd className="mt-2 grid grid-cols-[7rem_1fr] gap-x-3 text-[0.9375rem] leading-relaxed text-fog">
              <span className="type-label pt-1 text-slate">{labels.nonResidents}</span>
              <span>{mark(tx(row.nonResidents, locale))}</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* ≥ sm: fixed-layout table */}
      <table className="hidden w-full table-fixed border-collapse text-left sm:table" aria-labelledby={id}>
        <colgroup>
          <col className="w-[24%]" />
          <col className="w-[38%]" />
          <col className="w-[38%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-line">
            {[labels.income, labels.residents, labels.nonResidents].map((h) => (
              <th key={h} scope="col" className="type-label py-4 pr-6 align-bottom font-[450] text-slate">
                {h.replace(/-/g, "\u2011")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label.en} className="border-b border-line align-top transition-colors hover:bg-volt/[0.03]">
              <th scope="row" className="py-5 pr-6 font-medium leading-snug text-mist">
                {tx(row.label, locale)}
              </th>
              <td className="py-5 pr-6 text-[0.9375rem] leading-relaxed text-fog">{mark(tx(row.residents, locale))}</td>
              <td className="py-5 pr-6 text-[0.9375rem] leading-relaxed text-fog">{mark(tx(row.nonResidents, locale))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
