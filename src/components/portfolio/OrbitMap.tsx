import { clusters } from "@/content/fund";
import type { Company } from "@/content/portfolio";
import { tx, type Locale } from "@/lib/i18n";
import { CompanyPictogram } from "../pictograms";

/**
 * Portfolio — signature moment (Addendum A): an "orbit" diagram. Four concentric hairline rings = the four
 * investment themes (01 outermost), every focus area a small via on its ring, portfolio companies as live
 * nodes on their theme's ring, and a slow radar sweep that "pings" each company as it passes (CSS only;
 * static under reduced motion).
 *
 * Accessibility: the drawing is aria-hidden. The legend beside it is the accessible content (themes, area
 * counts, company links). Node callouts are mouse shortcuts only (tabIndex -1) so keyboard users get one
 * clean list instead of duplicate links.
 */

const C = 500; // ring centre (x and y)
/** viewBoxes: the wide one leaves an annotation margin on the right for the callouts. */
const VB = {
  wide: { x: -70, y: -40, w: 1450, h: 1080 },
  square: { x: -30, y: -30, w: 1060, h: 1060 },
} as const;
const TAG_X = C + 440 + 70; // callout column (wide variant)
const RADII = [440, 350, 260, 170];
const SWEEP_S = 14;
/** Company angles on their ring (deg, 0 = 3 o'clock, clockwise). */
const NODE_ANGLES = [-52, 6, 58, -20, 30];

const rad = (d: number) => (d * Math.PI) / 180;
const polar = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;
const upper = (s: string, locale: Locale) => s.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-GB");
const pad = (n: number) => String(n).padStart(2, "0");

type Placed = { company: Company; ring: number; deg: number; x: number; y: number; n: number };

function place(companies: Company[]): Placed[] {
  const perRing = new Map<number, number>();
  return companies.map((company, n) => {
    const ring = Math.max(0, clusters.findIndex((cl) => cl.title.en === company.cluster.en));
    const k = perRing.get(ring) ?? 0;
    perRing.set(ring, k + 1);
    const deg = NODE_ANGLES[k % NODE_ANGLES.length] + ring * 17;
    const [x, y] = polar(RADII[ring], deg);
    return { company, ring, deg, x, y, n };
  });
}

/** Sector vias spread over the left half of each ring (the right half carries the company callouts). */
function sectorAngles(count: number, ring: number) {
  // read top → bottom on the left side (242° is upper-left, 118° lower-left; SVG angles run clockwise)
  const from = 242 - ring * 6;
  const to = 118 + ring * 6;
  return Array.from({ length: count }, (_, k) => (count === 1 ? 180 : from + ((to - from) * k) / (count - 1)));
}

function OrbitSvg({ variant, placed, locale }: { variant: "wide" | "square"; placed: Placed[]; locale: Locale }) {
  const vb = VB[variant];
  const id = (s: string) => `orbit-${variant}-${s}`;
  const wide = variant === "wide";
  return (
    <svg aria-hidden viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className="block h-auto w-full" fill="none">
      <defs>
        {RADII.map((r, i) => (
          <path key={i} id={id(`arc-${i}`)} d={`M ${polar(r + 12, -158).join(" ")} A ${r + 12} ${r + 12} 0 0 1 ${polar(r + 12, -22).join(" ")}`} />
        ))}
        <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2CFF98" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2CFF98" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* drawing frame: crosshair + degree ticks */}
      <g stroke="rgb(169 199 194 / 0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path d={`M ${C - 490} ${C} H ${C + 490} M ${C} ${C - 490} V ${C + 490}`} strokeDasharray="2 7" />
        {Array.from({ length: 72 }, (_, k) => {
          const a = k * 5;
          const long = a % 30 === 0;
          const [x1, y1] = polar(RADII[0] + 26, a);
          const [x2, y2] = polar(RADII[0] + (long ? 44 : 34), a);
          return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={long ? "rgb(169 199 194 / 0.4)" : undefined} />;
        })}
      </g>
      {wide &&
        [0, 90, 180, 270].map((a) => {
          const [x, y] = polar(RADII[0] + 66, a - 90);
          return (
            <text key={a} x={x} y={y + 6} textAnchor="middle" fill="rgb(169 199 194 / 0.6)" fontSize="17" className="font-mono" letterSpacing="1.5">
              {a}°
            </text>
          );
        })}

      {/* rings */}
      {RADII.map((r, i) => {
        const live = placed.some((p) => p.ring === i);
        return (
          <g key={r} data-ring={i} className={`orbit-ring ${live ? "is-live" : ""}`}>
            <circle cx={C} cy={C} r={r} className="orbit-ring-line" strokeWidth={live ? 1.5 : 1} vectorEffect="non-scaling-stroke" />
            {!live && <circle cx={C} cy={C} r={r} stroke="rgb(169 199 194 / 0.12)" strokeDasharray="1 9" strokeWidth="5" />}
            <text className="orbit-ring-label font-mono" fontSize={wide ? 17 : 26} letterSpacing={wide ? 2.2 : 3}>
              <textPath href={`#${id(`arc-${i}`)}`} startOffset="50%" textAnchor="middle">
                {wide ? `${pad(i + 1)} · ${upper(tx(clusters[i].title, locale), locale)}` : pad(i + 1)}
              </textPath>
            </text>
            {/* sector vias */}
            {sectorAngles(clusters[i].sectors.length, i).map((a, k) => {
              const [x, y] = polar(r, a);
              const [lx, ly] = polar(r - 30, a);
              return (
                <g key={k}>
                  <circle cx={x} cy={y} r={wide ? 5 : 7} fill="#002428" stroke="rgb(169 199 194 / 0.6)" strokeWidth="1.25" />
                  {wide && (
                    <text x={lx} y={ly + 5} textAnchor="middle" fill="rgb(169 199 194 / 0.55)" fontSize="13" className="font-mono">
                      {pad(i + 1)}.{pad(k + 1)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* core: the fund */}
      <circle cx={C} cy={C} r="96" fill={`url(#${id("core")})`} />
      <g stroke="#2CFF98" strokeWidth="1.5" strokeLinecap="round">
        {[-18, -6, 6, 18].map((o) => (
          <path key={o} d={`M ${C + o} ${C - 36} v -12 M ${C + o} ${C + 36} v 12 M ${C - 36} ${C + o} h -12 M ${C + 36} ${C + o} h 12`} strokeOpacity="0.7" />
        ))}
        <rect x={C - 36} y={C - 36} width="72" height="72" rx="10" fill="#001417" />
      </g>
      <text x={C} y={C + 7} textAnchor="middle" fill="#2CFF98" fontSize="20" fontWeight="600" className="font-mono" letterSpacing="1">
        CV
      </text>
      {wide && (
        <text x={C} y={C + 82} textAnchor="middle" fill="rgb(169 199 194 / 0.75)" fontSize="15" className="font-mono" letterSpacing="2">
          NPCLN
        </text>
      )}

      {/* company nodes + callout leaders */}
      {placed.map((p) => {
        const delay = ((((p.deg + 90) % 360) + 360) % 360) / 360 * SWEEP_S;
        return (
          <g key={p.company.slug} data-node={p.company.slug} className="orbit-node">
            {wide && <path d={`M ${p.x} ${p.y} L ${p.x + 24} ${p.y} L ${TAG_X - 12} ${p.y}`} className="orbit-leader" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
            <circle cx={p.x} cy={p.y} r="11" className="orbit-ping" style={{ animationDelay: `${delay.toFixed(2)}s` }} stroke="#2CFF98" strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r={wide ? 20 : 26} fill="rgb(44 255 152 / 0.12)" />
            <circle cx={p.x} cy={p.y} r={wide ? 9 : 12} fill="#2CFF98" />
            {!wide && (
              <text x={p.x - 40} y={p.y + 10} textAnchor="end" fill="#E9F5F1" fontSize="32" fontWeight="500" letterSpacing="-0.5" stroke="#002428" strokeWidth="10" paintOrder="stroke">
                {p.company.name.split(" ")[0]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function OrbitMap({
  companies,
  locale,
  labels,
}: {
  companies: Company[];
  locale: Locale;
  labels: { mapLabel: string; themes: string; ring: string; areas: string; companies: string };
}) {
  const placed = place(companies);
  const wv = VB.wide;
  const pctX = (x: number) => `${((x - wv.x) / wv.w) * 100}%`;
  const pctY = (y: number) => `${((y - wv.y) / wv.h) * 100}%`;
  const sq = VB.square;
  // Hover/focus on a legend row lights its ring (and a company row its node) — pure CSS via :has().
  const css = [
    ...clusters.map((_, i) => `[data-orbit]:has([data-ring-trigger="${i}"]:is(:hover,:focus-within)) [data-ring="${i}"] .orbit-ring-line{stroke:var(--color-volt);stroke-opacity:1}`),
    ...clusters.map((_, i) => `[data-orbit]:has([data-ring-trigger="${i}"]:is(:hover,:focus-within)) [data-ring="${i}"] .orbit-ring-label{fill:var(--color-volt)}`),
    ...placed.map((p) => `[data-orbit]:has([data-node-trigger="${p.company.slug}"]:is(:hover,:focus-visible)) [data-node="${p.company.slug}"] .orbit-ping{animation:none;opacity:.9;transform:scale(2.2)}`),
  ].join("");

  return (
    <div data-orbit className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
      <style>{css}</style>

      {/* ── Diagram ── */}
      <div className="lg:order-2 lg:col-span-8 xl:col-span-8">
        <figure aria-label={labels.mapLabel} className="relative">
          {/* square variant (< md) */}
          <div className="relative mx-auto max-w-[34rem] md:hidden">
            <div
              aria-hidden
              className="orbit-sweep pointer-events-none absolute aspect-square rounded-full"
              style={{ left: `${((C - RADII[0] - sq.x) / sq.w) * 100}%`, top: `${((C - RADII[0] - sq.y) / sq.h) * 100}%`, width: `${((RADII[0] * 2) / sq.w) * 100}%` }}
            />
            <OrbitSvg variant="square" placed={placed} locale={locale} />
          </div>
          {/* wide variant with callouts (md+) */}
          <div className="relative max-md:hidden">
            <div
              aria-hidden
              className="orbit-sweep pointer-events-none absolute aspect-square rounded-full"
              style={{ left: pctX(C - RADII[0]), top: pctY(C - RADII[0]), width: `${((RADII[0] * 2) / wv.w) * 100}%` }}
            />
            <OrbitSvg variant="wide" placed={placed} locale={locale} />
            {placed.map((p) => (
              <a
                key={p.company.slug}
                href={`#${p.company.slug}`}
                tabIndex={-1}
                aria-hidden
                data-node-trigger={p.company.slug}
                className="group absolute flex -translate-y-1/2 items-center gap-3 outline-none"
                style={{ left: pctX(TAG_X), top: pctY(p.y) }}
              >
                <CompanyPictogram slug={p.company.slug} className="size-9 shrink-0 text-fog transition-colors group-hover:text-volt lg:size-10" />
                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-[clamp(0.875rem,0.6rem+0.55vw,1.1875rem)] font-[480] leading-tight tracking-[-0.015em] text-mist transition-colors group-hover:text-volt [font-stretch:106%]">
                    {p.company.name}
                  </span>
                  <span className="type-label mt-1 block whitespace-nowrap text-[0.625rem] text-fog">
                    {pad(p.n + 1)} · {tx(p.company.hq, locale)}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </figure>
      </div>

      {/* ── Legend: the accessible content ── */}
      <div className="lg:order-1 lg:col-span-4 xl:col-span-4">
        <p className="type-label border-b border-line-strong pb-4 text-fog">{labels.themes}</p>
        <ol>
          {clusters.map((cl, i) => {
            const own = placed.filter((p) => p.ring === i);
            return (
              <li key={cl.title.en} data-ring-trigger={i} className="group/ring border-b border-line py-5 md:py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="type-label text-fog">
                    [ {pad(i + 1)} ] {labels.ring}
                  </span>
                  <span className="type-label text-slate">
                    {pad(cl.sectors.length)} {labels.areas} · <span className={own.length ? "text-volt" : ""}>{pad(own.length)}</span> {labels.companies}
                  </span>
                </div>
                <h3 className="mt-3 text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] font-[440] leading-[1.05] tracking-[-0.03em] text-mist transition-colors [font-stretch:108%] group-hover/ring:text-volt">
                  {tx(cl.title, locale)}
                </h3>
                {own.length > 0 && (
                  <ul className="mt-4 border-l border-line-strong pl-4">
                    {own.map((p) => (
                      <li key={p.company.slug}>
                        <a
                          href={`#${p.company.slug}`}
                          data-node-trigger={p.company.slug}
                          className="group/co flex min-h-10 items-center gap-3 text-[0.9375rem] text-mist transition-colors hover:text-volt"
                        >
                          <span aria-hidden className="type-label w-5 text-slate">
                            {pad(p.n + 1)}
                          </span>
                          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)]" />
                          <span className="min-w-0 truncate">{p.company.name}</span>
                          <span aria-hidden className="ml-auto text-fog transition-transform duration-500 group-hover/co:translate-y-0.5">
                            ↓
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
