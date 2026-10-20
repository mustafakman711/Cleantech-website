import { ArrowUpRight } from "lucide-react";
import { CornerTicks } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export const officialSources = {
  bist: "https://www.borsaistanbul.com/",
  kap: "https://www.kap.org.tr/",
};

/**
 * Investors — a dense, terminal-like fund data panel (mono, hairlines, corner ticks).
 * Facts only (no live price feed): headline figures, a numbered key/value ledger, and links out to
 * the official sources for prices and disclosures.
 */
export function DataTerminal({
  title,
  status,
  figures,
  rows,
  noPrice,
  sourcesLabel,
  bistLabel,
  kapLabel,
  kapFull,
}: {
  title: string;
  status: string;
  figures: { value: string; label: string }[];
  rows: { k: string; v: string }[];
  noPrice: string;
  sourcesLabel: string;
  bistLabel: string;
  kapLabel: string;
  kapFull: string;
}) {
  return (
    <div className="relative min-w-0 border border-line-strong bg-abyss-950/70 font-mono">
      <CornerTicks />
      {/* title bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line-strong px-4 py-3 sm:px-6">
        <p className="type-label flex items-center gap-2.5 text-mist">
          <span aria-hidden className="flex gap-1">
            <span className="size-1.5 bg-line-strong" />
            <span className="size-1.5 bg-line-strong" />
            <span className="size-1.5 bg-line-strong" />
          </span>
          {title}
        </p>
        <p className="type-label flex items-center gap-2 text-fog">
          <span aria-hidden className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)] motion-safe:animate-pulse-node" />
          {status}
        </p>
      </div>

      {/* headline figures */}
      <dl className="grid border-b border-line-strong sm:grid-cols-3">
        {figures.map((f, i) => (
          <div key={f.label} className={`flex flex-col gap-3 px-4 py-6 sm:px-6 sm:py-8 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
            <dt className="sr-only">{f.label}</dt>
            <dd
              className={`font-sans text-[clamp(2.5rem,1.6rem+2.4vw,4rem)] font-[300] leading-[0.9] tracking-[-0.04em] [font-stretch:120%] ${
                i === 0 ? "text-volt" : "text-mist"
              }`}
            >
              {f.value}
            </dd>
            <dd className="font-sans text-[0.875rem] leading-snug text-fog">{f.label}</dd>
          </div>
        ))}
      </dl>

      {/* ledger */}
      <dl className="px-4 py-2 sm:px-6">
        {rows.map((row, i) => (
          <div key={row.k} className="grid grid-cols-[1.75rem_1fr] gap-x-3 border-b border-dashed border-line py-3 text-[0.8125rem] leading-relaxed last:border-b-0 md:grid-cols-[1.75rem_13rem_1fr]">
            <span aria-hidden className="text-slate/70">
              {pad(i + 1)}
            </span>
            <dt className="uppercase tracking-[0.08em] text-slate">{row.k}</dt>
            <dd className="col-start-2 text-mist md:col-start-3">{row.v}</dd>
          </div>
        ))}
      </dl>

      {/* sources */}
      <div className="border-t border-line-strong px-4 py-5 sm:px-6">
        <p className="text-[0.8125rem] text-fog">
          <span aria-hidden className="text-volt">&gt;&nbsp;</span>
          {noPrice}
          <span aria-hidden className="term-cursor ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-volt/80" />
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="type-label mr-2 text-slate">{sourcesLabel}</span>
          <a
            href={officialSources.bist}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bracket type-label inline-flex min-h-11 items-center gap-2 px-4 text-mist hover:text-volt"
          >
            {bistLabel}
            <ArrowUpRight aria-hidden className="size-3.5 text-volt" />
          </a>
          <a
            href={officialSources.kap}
            target="_blank"
            rel="noopener noreferrer"
            title={kapFull}
            className="btn-bracket type-label inline-flex min-h-11 items-center gap-2 px-4 text-mist hover:text-volt"
          >
            {kapLabel}
            <span className="hidden text-slate normal-case tracking-normal sm:inline">· {kapFull}</span>
            <ArrowUpRight aria-hidden className="size-3.5 text-volt" />
          </a>
        </div>
      </div>
    </div>
  );
}
