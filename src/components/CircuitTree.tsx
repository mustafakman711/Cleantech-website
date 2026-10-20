/**
 * Hero illustration: a tree whose trunk and roots are circuit traces growing out of a chip.
 * Capital (pulses) flows from the roots up into new growth.
 */
const BOARD_Y = 372;

function sprout(x: number, h: number, dir: 1 | -1) {
  const knee = BOARD_Y - h * 0.5;
  return { d: `M${x} ${BOARD_Y} V${knee} l${dir * 16} -16 V${BOARD_Y - h}`, end: [x + dir * 16, BOARD_Y - h] as const };
}

const sprouts = [
  sprout(70, 70, 1),
  sprout(112, 104, -1),
  sprout(152, 58, 1),
  sprout(200, 88, -1),
  sprout(360, 92, 1),
  sprout(406, 60, -1),
  sprout(448, 108, 1),
  sprout(490, 72, -1),
];

const branches = [
  { d: "M280 150 L252 122 V92", end: [252, 86] },
  { d: "M280 136 L306 110 V80", end: [306, 74] },
  { d: "M280 290 L326 244", end: [330, 240] },
  { d: "M280 240 L236 196", end: [232, 192] },
];

const roots = [
  { d: "M268 444 V468 L236 500 H198", end: [192, 500] },
  { d: "M292 444 V468 L324 500 H362", end: [368, 500] },
  { d: "M280 444 V530", end: [280, 536] },
  { d: "M256 444 V452 L222 486 V520", end: [222, 526] },
  { d: "M304 444 V452 L338 486 V520", end: [338, 526] },
];

const leaves = [
  { d: "M280 262 C300 228 344 212 394 220 C372 258 330 274 280 262 Z", delay: 1.1 },
  { d: "M280 226 C258 194 216 180 168 190 C190 226 236 240 280 226 Z", delay: 1.3 },
  { d: "M280 178 C294 154 322 144 354 148 C340 174 310 186 280 178 Z", delay: 1.5 },
  { d: "M280 314 C262 290 232 280 198 286 C214 312 248 322 280 314 Z", delay: 1.7 },
];

const pulsePaths = ["M280 536 V104", "M192 500 H236 L268 468 V444 L280 444 V104", "M368 500 H324 L292 468 V444 L280 444 V104"];

export function CircuitTree({ className = "" }: { className?: string }) {
  const trace = { stroke: "#2CFF98", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const draw = (delay: number) => ({
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    className: "animate-draw",
    style: { animationDelay: `${delay}s` },
  });

  return (
    <svg className={className} viewBox="0 0 560 560" fill="none" role="img" aria-labelledby="tree-title">
      <title id="tree-title">Circuit tree</title>
      <defs>
        <radialGradient id="tree-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2CFF98" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2CFF98" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leaf-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8AFFC6" />
          <stop offset="100%" stopColor="#19D97C" />
        </linearGradient>
        <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="280" cy="290" r="250" fill="url(#tree-glow)" />

      <g filter="url(#neon)">
        {/* circuit board baseline */}
        <path d={`M40 ${BOARD_Y} H252 M308 ${BOARD_Y} H520`} {...trace} {...draw(0)} />
        <path d={`M40 ${BOARD_Y + 8} H252 M308 ${BOARD_Y + 8} H520`} {...trace} strokeWidth={1.2} strokeOpacity={0.5} {...draw(0.1)} />

        {/* chip */}
        <rect x="252" y="388" width="56" height="56" rx="10" {...trace} {...draw(0.2)} />
        <path d="M292 404 A14 14 0 1 0 292 428" {...trace} strokeWidth={4} {...draw(0.6)} />
        {[402, 416, 430].map((y) => (
          <path key={y} d={`M252 ${y} H238 M308 ${y} H322`} {...trace} strokeWidth={1.5} {...draw(0.4)} />
        ))}

        {/* trunk, branches, roots, sprouts */}
        <path d="M280 388 V112" {...trace} strokeWidth={3} {...draw(0.5)} />
        {branches.map((b, i) => (
          <path key={b.d} d={b.d} {...trace} strokeWidth={1.8} {...draw(1 + i * 0.1)} />
        ))}
        {roots.map((r, i) => (
          <path key={r.d} d={r.d} {...trace} strokeWidth={1.8} {...draw(0.4 + i * 0.08)} />
        ))}
        {sprouts.map((s, i) => (
          <path key={s.d} d={s.d} {...trace} strokeWidth={1.6} strokeOpacity={0.8} {...draw(0.3 + i * 0.07)} />
        ))}

        {/* leaves */}
        {leaves.map((l) => (
          <path
            key={l.d}
            d={l.d}
            fill="url(#leaf-fill)"
            fillOpacity={0.9}
            className="animate-rise"
            style={{ animationDelay: `${l.delay}s`, transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}

        {/* nodes */}
        {[...branches, ...roots, ...sprouts].map((n, i) => (
          <circle
            key={`n${i}`}
            cx={n.end[0]}
            cy={n.end[1]}
            r="5"
            fill="#002428"
            stroke="#2CFF98"
            strokeWidth="2"
            className="animate-pulse-node"
            style={{ animationDelay: `${(i % 6) * 0.45}s` }}
          />
        ))}
        <circle cx="280" cy="102" r="10" fill="#2CFF98" className="animate-pulse-node" />
      </g>

      {/* capital flowing from roots to new growth */}
      {pulsePaths.map((path, i) => (
        <circle key={path} r="3.5" fill="#E9FFF4" opacity="0">
          <animateMotion dur="3.6s" repeatCount="indefinite" begin={`${2 + i * 1.2}s`} path={path} />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.6s" repeatCount="indefinite" begin={`${2 + i * 1.2}s`} />
        </circle>
      ))}
    </svg>
  );
}
