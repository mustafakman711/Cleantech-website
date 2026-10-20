import { CornerTicks } from "../ui";

/**
 * "Spec sheet" panel (engineering-drawing vocabulary): the fund's key facts as a mono key/value ledger.
 * Every value comes from copy (about.who.profile), which only restates facts held elsewhere in content.
 */
export function FundProfile({ label, rows }: { label: string; rows: readonly { k: string; v: string }[] }) {
  return (
    <div className="relative">
      <CornerTicks />
      <div className="border border-line-strong bg-abyss-950/40">
        <p className="type-label flex items-center justify-between gap-4 border-b border-line-strong px-5 py-3.5 text-fog">
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)]" />
            {label}
          </span>
          <span aria-hidden className="text-slate">
            {String(rows.length).padStart(2, "0")}
          </span>
        </p>
        <dl className="divide-y divide-line">
          {rows.map((r, i) => (
            <div key={r.k} className="grid gap-x-4 gap-y-1 px-5 py-3.5 sm:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
              <dt className="type-label flex pt-px text-slate">
                <span aria-hidden className="w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r.k}</span>
              </dt>
              <dd className="pl-8 text-[0.9375rem] leading-snug text-mist sm:pl-0">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
