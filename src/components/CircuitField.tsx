/**
 * A wide band of circuit "sprouts" growing from a baseline: the brand's tech-meets-nature motif.
 * Deterministic so server and client renders match.
 */
const WIDTH = 1440;
const HEIGHT = 160;
const heights = [62, 96, 48, 120, 74, 104, 56, 88, 132, 66, 92, 52, 112, 80];

export function CircuitField({ className = "" }: { className?: string }) {
  const sprouts = Array.from({ length: 36 }, (_, i) => {
    const x = 20 + i * 40;
    const h = heights[i % heights.length];
    const dir = i % 2 === 0 ? 1 : -1;
    const knee = HEIGHT - h * 0.55;
    const d = `M${x} ${HEIGHT} V${knee} l${dir * 14} -14 V${HEIGHT - h}`;
    return { d, end: [x + dir * 14, HEIGHT - h] as const, leaf: i % 3 === 1, x, knee, dir };
  });

  return (
    <svg aria-hidden className={className} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMax slice" fill="none">
      {sprouts.map((s, i) => (
        <g key={i} stroke="#2CFF98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={s.d} strokeOpacity="0.55" />
          <circle cx={s.end[0]} cy={s.end[1]} r="4" fill="#002428" strokeOpacity="0.8" />
          {s.leaf && (
            <path
              d={`M${s.x} ${s.knee + 10} q ${-s.dir * 12} -4 ${-s.dir * 18} -16 q ${s.dir * 12} 2 ${s.dir * 18} 16 z`}
              fill="#2CFF98"
              fillOpacity="0.25"
              strokeOpacity="0.5"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
