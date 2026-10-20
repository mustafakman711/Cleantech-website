/**
 * Portfolio pictograms — line drawings in the circuit vocabulary (Extantia-style index icons).
 * 48×48 viewBox, `currentColor` strokes with `vector-effect: non-scaling-stroke`, so they stay 1.25px at any size.
 * Parts drawn with `var(--pg-live, currentColor)` light up when an ancestor sets `--pg-live` (e.g. on row hover/open).
 *
 *   <CompanyPictogram slug="werover" className="size-12 text-fog" />
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { title?: string };

const LIVE = "var(--pg-live, currentColor)";

function Frame({ title, children, className = "", ...props }: P) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={`pg ${className}`}
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

/** ARC Clean Technology — sodium-cooled reactor core: vessel rings, fuel lattice, control rods. */
export function ArcPictogram(props: P) {
  const lattice: [number, number][] = [
    [24, 28],
    [20, 25.7],
    [28, 25.7],
    [20, 30.3],
    [28, 30.3],
    [24, 23.4],
    [24, 32.6],
  ];
  return (
    <Frame {...props}>
      <circle cx="24" cy="28" r="16" />
      <circle cx="24" cy="28" r="11" strokeDasharray="1.5 2.5" />
      {lattice.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" stroke={LIVE} />
      ))}
      <path d="M18 4 V16 M24 2 V20 M30 4 V16" />
      <path d="M16 4 H32" />
      <path d="M8 44 H40" strokeDasharray="1 3" />
    </Frame>
  );
}

/** Remus Enerji — grid node with a consumption meter: a gauge arc, needle and three connected sites. */
export function RemusPictogram(props: P) {
  return (
    <Frame {...props}>
      <path d="M9 24 A15 15 0 0 1 39 24" />
      <path d="M12.5 15.5 L14.6 17 M24 9 V11.6 M35.5 15.5 L33.4 17" />
      <path d="M24 24 L32 14" stroke={LIVE} />
      <circle cx="24" cy="24" r="2.6" stroke={LIVE} />
      <path d="M24 26.6 V34 M24 34 L12 40 M24 34 L36 40 M24 34 V43" />
      <circle cx="12" cy="40" r="2" />
      <circle cx="36" cy="40" r="2" />
      <circle cx="24" cy="44" r="1.2" />
    </Frame>
  );
}

/** Werover — wind-turbine rotor with acoustic waves (blade-health listening). */
export function WeroverPictogram(props: P) {
  const blade = "M0 0 C1.8 -4 2 -12 0.4 -17 C-0.6 -12 -1.4 -5 0 0 Z";
  return (
    <Frame {...props}>
      <path d="M19 21 L17.5 45 M19 21 L20.5 45 M14 45 H24" />
      {[0, 120, 240].map((a) => (
        <path key={a} d={blade} transform={`translate(19 19) rotate(${a})`} />
      ))}
      <circle cx="19" cy="19" r="1.8" />
      <path d="M31 13 A9 9 0 0 1 31 25" stroke={LIVE} />
      <path d="M35 9.5 A14 14 0 0 1 35 28.5" stroke={LIVE} strokeOpacity="0.7" />
      <path d="M39 6 A19 19 0 0 1 39 32" stroke={LIVE} strokeOpacity="0.45" />
    </Frame>
  );
}

export const companyPictograms: Record<string, (props: P) => React.JSX.Element> = {
  "arc-clean-technology": ArcPictogram,
  remus: RemusPictogram,
  werover: WeroverPictogram,
};

/** Pictogram for a portfolio company by slug (falls back to the ARC core). */
export function CompanyPictogram({ slug, ...props }: P & { slug: string }) {
  const Icon = companyPictograms[slug] ?? ArcPictogram;
  return <Icon {...props} />;
}
