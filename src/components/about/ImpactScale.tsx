import { impactHighlights, impactTargets } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";

type Labels = { targets: string; scale: string; social: string; areaNote: string; dotNote: string; tableCaption: string; target: string };

const pct = (v: number, locale: Locale) => (locale === "tr" ? `%${v}` : `${v}%`);
const TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

/**
 * About — signature moment (Addendum A). Impact targets as TRUE-SCALE bars (width = value% of a 0–100 axis,
 * QA #23) that draw in as each row scrolls into view (CSS scroll-driven, IO fallback, static under reduced motion).
 * The visible list *is* the accessible content: label + value text per row; the bars are aria-hidden.
 * Social highlights use proportional geometry: nested circles whose AREA is the share (%35) and a dot field
 * with one dot per job (270+).
 */
export function ImpactScale({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [share, jobs] = impactHighlights;
  const shareNum = parseInt(tx(share.value, locale).replace(/\D/g, ""), 10) || 0;
  const jobsNum = parseInt(tx(jobs.value, locale).replace(/\D/g, ""), 10) || 0;
  const outer = 56;
  const inner = outer * Math.sqrt(shareNum / 100);
  const cols = 27;
  const rows = Math.ceil(jobsNum / cols);

  return (
    <div className="grid gap-x-6 gap-y-20 lg:grid-cols-12">
      {/* ── True-scale target bars ── */}
      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-strong pb-4">
          <h3 className="type-label text-mist">{labels.targets}</h3>
          <p className="type-label text-fog">{labels.scale}</p>
        </div>

        {/* axis */}
        <div aria-hidden className="impact-grid mt-5">
          <div className="relative h-4 [grid-area:track]">
            {TICKS.map((t) => (
              <span
                key={t}
                className={`type-label absolute top-0 -translate-x-1/2 text-[0.625rem] text-fog ${t % 50 === 0 ? "" : "max-xl:hidden"} ${t === 0 ? "translate-x-0" : ""} ${t === 100 ? "-translate-x-full" : ""}`}
                style={{ left: `${t}%` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <ul aria-label={labels.tableCaption}>
          {impactTargets.map((t, i) => (
            <li key={t.label.en} data-reveal="fade" className="impact-grid impact-row border-b border-line py-4 md:py-3">
              <span className="text-[0.9375rem] leading-snug text-mist [grid-area:label] md:pr-4">
                <span aria-hidden className="type-label mr-3 text-fog">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tx(t.label, locale)}
              </span>
              <span className="type-mono self-center justify-self-end text-[1rem] text-volt [grid-area:value]">
                <span className="sr-only">{labels.target}: </span>
                {pct(t.value, locale)}
              </span>
              <span
                aria-hidden
                className="impact-track relative h-8 self-center border-r border-line [grid-area:track] bg-[linear-gradient(to_right,rgb(169_199_194/0.16)_1px,transparent_1px)] bg-[length:10%_100%]"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
                <span className="impact-fill absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-volt shadow-[0_0_10px_rgb(44_255_152/0.55)]" style={{ ["--v" as string]: `${Math.min(100, t.value)}%` }}>
                  <span className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-volt shadow-[0_0_0_4px_rgb(44_255_152/0.18)]" />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Social highlights, drawn to scale ── */}
      <div className="lg:col-span-4">
        <div className="flex items-baseline justify-between gap-6 border-b border-line-strong pb-4">
          <h3 className="type-label text-mist">{labels.social}</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex flex-col border-b border-line py-8 sm:border-r sm:pr-6 lg:border-r-0 lg:pr-0" data-reveal>
            <div className="flex items-end gap-6">
              <svg aria-hidden viewBox="0 0 120 120" className="impact-circles size-28 shrink-0 overflow-visible" fill="none">
                <path d="M60 -2 V122 M-2 60 H122" stroke="rgb(169 199 194 / 0.22)" strokeDasharray="2 4" />
                <circle cx="60" cy="60" r={outer} stroke="rgb(169 199 194 / 0.55)" strokeWidth="1" />
                <circle className="impact-inner" cx="60" cy={60 + outer - inner} r={inner} stroke="#2CFF98" strokeWidth="1.25" fill="rgb(44 255 152 / 0.16)" />
                <circle cx="60" cy={60 + outer} r="2" fill="#2CFF98" />
              </svg>
              <div className="min-w-0">
                <p className="type-stat text-[clamp(3rem,2rem+3vw,4.5rem)] text-mist">{tx(share.value, locale)}</p>
              </div>
            </div>
            <p className="mt-6 max-w-[30ch] leading-snug text-mist">{tx(share.label, locale)}</p>
            <p className="type-label mt-3 text-fog">↳ {labels.areaNote}</p>
          </div>

          <div className="flex flex-col py-8 sm:pl-6 lg:pl-0" data-reveal>
            <svg aria-hidden viewBox={`0 0 ${cols * 10} ${rows * 10}`} className="impact-dots w-full max-w-[22rem]" fill="#8fe3c4">
              {Array.from({ length: jobsNum }, (_, k) => (
                <circle key={k} cx={(k % cols) * 10 + 5} cy={Math.floor(k / cols) * 10 + 5} r="1.7" />
              ))}
            </svg>
            <p className="type-stat mt-6 text-[clamp(3rem,2rem+3vw,4.5rem)] text-mist">{tx(jobs.value, locale)}</p>
            <p className="mt-6 max-w-[30ch] leading-snug text-mist">{tx(jobs.label, locale)}</p>
            <p className="type-label mt-3 text-fog">↳ {labels.dotNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
