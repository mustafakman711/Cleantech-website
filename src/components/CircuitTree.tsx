/**
 * Hero motif: a tree whose trunk, branches and roots are PCB traces growing out of a chip.
 * Structure (board, pins, roots, concentric "PCB rings") is drawn in hairline fog; the living part
 * (trunk → branches → leaves) carries the volt "current". Pulses travel from the roots into new growth.
 *
 * CSS-only motion (draw-in on load, travelling pulses, one slowly turning dashed ring), all disabled
 * under prefers-reduced-motion, which shows the fully drawn tree. Server component, ~0 KB JS.
 */
const C = { x: 320, y: 500 }; // chip centre
const LINE = "rgb(169 199 194 / 0.34)";
const VOLT = "#2CFF98";

type Pt = readonly [number, number];

const branches: { d: string; end: Pt; leaf?: { angle: number; scale?: number; solid?: boolean } }[] = [
  { d: "M320 404 H286 L250 368 V334", end: [250, 334], leaf: { angle: -38 } },
  { d: "M320 376 H354 L392 338 V306", end: [392, 306], leaf: { angle: 36 } },
  { d: "M320 304 L278 262 V222", end: [278, 222], leaf: { angle: -24, scale: 0.9 } },
  { d: "M320 268 L360 228 V188", end: [360, 188], leaf: { angle: 22, scale: 0.95 } },
  { d: "M320 440 H368 L384 424", end: [384, 424] },
  { d: "M320 340 H300 L288 328", end: [288, 328] },
];

const roots: { d: string; end: Pt }[] = [
  { d: "M296 532 V556 L264 588 H196", end: [196, 588] },
  { d: "M344 532 V556 L376 588 H444", end: [444, 588] },
  { d: "M320 532 V648", end: [320, 648] },
  { d: "M308 532 V546 L252 602 V664", end: [252, 664] },
  { d: "M332 532 V546 L388 602 V664", end: [388, 664] },
];

const board = [
  { d: "M276 486 H214 L194 466 H96", end: [96, 466] as Pt },
  { d: "M276 514 H186 L166 534 H64", end: [64, 534] as Pt },
  { d: "M364 486 H426 L446 466 H544", end: [544, 466] as Pt },
  { d: "M364 514 H454 L474 534 H576", end: [576, 534] as Pt },
];

const pulses = [
  "M196 588 H264 L296 556 V500 H320 V150",
  "M444 588 H376 L344 556 V500 H320 V376 H354 L392 338 V306",
  "M320 648 V404 H286 L250 368 V334",
  "M388 664 V602 L332 546 V500 H320 V268 L360 228 V188",
  "M252 664 V602 L308 546 V500 H320 V304 L278 262 V222",
];

/** Leaf outline with midrib + veins, base at origin, pointing up. */
const LEAF = "M0 0 C-17 -14 -19 -46 0 -68 C19 -46 17 -14 0 0 Z";
const VEINS = "M0 -2 V-60 M0 -22 L-9 -32 M0 -36 L9 -46 M0 -48 L-6 -55";

export function CircuitTree({ className = "", title, id = "ct" }: { className?: string; title?: string; id?: string }) {
  const draw = (delay: number) => ({
    pathLength: 1,
    className: "draw-in",
    style: { animationDelay: `${delay}s` },
  });

  return (
    <svg className={className} viewBox="0 0 640 720" fill="none" {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
      <defs>
        <radialGradient id={`${id}-bloom`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={VOLT} stopOpacity="0.16" />
          <stop offset="100%" stopColor={VOLT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient bloom behind the chip — on geometry only */}
      <circle cx={C.x} cy={C.y} r="180" fill={`url(#${id}-bloom)`} />

      {/* concentric PCB rings */}
      <g stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke">
        <circle cx={C.x} cy={C.y} r="96" strokeOpacity="0.8" />
        <circle cx={C.x} cy={C.y} r="156" strokeDasharray="2 7" className="ring-spin" />
        <circle cx={C.x} cy={C.y} r="226" strokeOpacity="0.55" />
        <circle cx={C.x} cy={C.y} r="306" strokeDasharray="1 9" strokeOpacity="0.6" />
        {/* crosshair through the chip */}
        <path d={`M${C.x} 560 V720 M0 ${C.y} H40 M600 ${C.y} H640`} strokeOpacity="0.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r1 = 222;
          const r2 = 232;
          const rad = (a * Math.PI) / 180;
          return (
            <path
              key={a}
              d={`M${(C.x + r1 * Math.cos(rad)).toFixed(1)} ${(C.y + r1 * Math.sin(rad)).toFixed(1)} L${(C.x + r2 * Math.cos(rad)).toFixed(1)} ${(
                C.y +
                r2 * Math.sin(rad)
              ).toFixed(1)}`}
            />
          );
        })}
      </g>

      {/* board traces + roots (structure) */}
      <g stroke={LINE} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {board.map((b, i) => (
          <path key={b.d} d={b.d} {...draw(0.1 + i * 0.05)} />
        ))}
        {roots.map((r, i) => (
          <path key={r.d} d={r.d} {...draw(0.3 + i * 0.07)} />
        ))}
        {/* chip pins */}
        {[480, 492, 504, 516].map((y) => (
          <path key={y} d={`M288 ${y} H276 M352 ${y} H364`} />
        ))}
        {[296, 308, 320, 332, 344].map((x) => (
          <path key={x} d={`M${x} 532 V540`} />
        ))}
      </g>

      {/* the living part: trunk + branches carry the current */}
      <g stroke={VOLT} strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 5px rgb(44 255 152 / 0.45))" }}>
        <path d="M320 468 V150" strokeWidth="1.75" {...draw(0.5)} />
        {branches.map((b, i) => (
          <path key={b.d} d={b.d} strokeWidth="1.25" strokeOpacity="0.9" {...draw(0.9 + i * 0.12)} />
        ))}
      </g>

      {/* travelling pulses: roots → growth */}
      <g stroke="#E9FFF4" strokeWidth="2.25" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px rgb(44 255 152 / 0.9))" }}>
        {pulses.map((d, i) => (
          <path key={d} d={d} pathLength={1} strokeDasharray="0.05 2" strokeDashoffset="0.05" className="trace-pulse" style={{ ["--i" as string]: i }} />
        ))}
      </g>

      {/* chip */}
      <g>
        <rect x="288" y="468" width="64" height="64" rx="6" fill="#002428" stroke={LINE} strokeWidth="1.25" />
        <rect x="296" y="476" width="48" height="48" rx="3" stroke={VOLT} strokeOpacity="0.55" strokeWidth="1" {...draw(0.25)} />
        <path d="M331 490 A12 12 0 1 0 331 510" stroke={VOLT} strokeWidth="3" strokeLinecap="round" {...draw(0.6)} />
        <circle cx="331" cy="490" r="1.6" fill={VOLT} />
      </g>

      {/* leaves */}
      {branches.map((b, i) =>
        b.leaf ? (
          <g key={`leaf${i}`} transform={`translate(${b.end[0]} ${b.end[1]}) rotate(${b.leaf.angle}) scale(${b.leaf.scale ?? 1})`}>
            <g className="leaf-in" style={{ animationDelay: `${1.5 + i * 0.15}s` }}>
              <path d={LEAF} stroke={VOLT} strokeOpacity="0.85" strokeWidth="1.1" fill={VOLT} fillOpacity="0.07" vectorEffect="non-scaling-stroke" />
              <path d={VEINS} stroke={VOLT} strokeOpacity="0.55" strokeWidth="0.9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
          </g>
        ) : null,
      )}
      {/* crown leaf — the single solid accent */}
      <g transform="translate(320 150) scale(1.25)">
        <g className="leaf-in" style={{ animationDelay: "2.1s" }}>
          <path d={LEAF} fill={VOLT} />
          <path d={VEINS} stroke="#002428" strokeWidth="1.1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
      </g>

      {/* nodes */}
      {[...board, ...roots].map((n, i) => (
        <circle key={`s${i}`} cx={n.end[0]} cy={n.end[1]} r="3.5" fill="#002428" stroke={LINE} strokeWidth="1.25" />
      ))}
      {branches
        .filter((b) => !b.leaf)
        .map((b, i) => (
          <circle
            key={`b${i}`}
            cx={b.end[0]}
            cy={b.end[1]}
            r="3.5"
            fill="#002428"
            stroke={VOLT}
            strokeWidth="1.25"
            className="animate-pulse-node"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
    </svg>
  );
}
