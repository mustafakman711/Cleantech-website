/**
 * A horizontal circuit "bus" that runs along a section's bottom hairline: one baseline trace with short
 * chamfered taps, via nodes, a few vein-leaves and a single travelling volt pulse.
 * Kept low (default 56px) so it never collides with content above it (QA #5/#6).
 * Deterministic (no randomness) so server and client output match.
 */
const W = 1440;
const H = 56;
const BASE = H - 8;

type Tap = { x: number; h: number; dir: 1 | -1; leaf?: boolean; live?: boolean };

const taps: Tap[] = [
  { x: 84, h: 22, dir: 1 },
  { x: 168, h: 34, dir: -1, leaf: true },
  { x: 236, h: 18, dir: 1 },
  { x: 352, h: 30, dir: 1, live: true },
  { x: 430, h: 20, dir: -1 },
  { x: 548, h: 36, dir: -1, leaf: true },
  { x: 640, h: 16, dir: 1 },
  { x: 760, h: 28, dir: 1 },
  { x: 846, h: 38, dir: -1, leaf: true, live: true },
  { x: 958, h: 22, dir: 1 },
  { x: 1052, h: 32, dir: -1 },
  { x: 1150, h: 18, dir: 1, leaf: true },
  { x: 1236, h: 34, dir: 1, live: true },
  { x: 1330, h: 24, dir: -1 },
];

export function CircuitField({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" fill="none">
      <g stroke="rgb(169 199 194 / 0.32)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        <path d={`M0 ${BASE} H${W}`} />
        <path d={`M0 ${BASE + 4} H${W}`} strokeOpacity="0.4" strokeDasharray="2 6" />
        {taps.map((t) => {
          const knee = BASE - t.h * 0.5;
          return (
            <g key={t.x}>
              <path d={`M${t.x} ${BASE} V${knee} l${t.dir * 8} -8 V${BASE - t.h}`} />
              {t.leaf && (
                <path
                  d={`M${t.x + t.dir * 8} ${BASE - t.h + 4} q ${t.dir * 14} -4 ${t.dir * 18} -16 q ${-t.dir * 14} 0 ${-t.dir * 18} 16 z M${t.x + t.dir * 8} ${BASE - t.h + 4} l ${t.dir * 12} -10`}
                  fill="rgb(44 255 152 / 0.06)"
                />
              )}
            </g>
          );
        })}
      </g>
      {taps.map((t) => (
        <circle
          key={`n${t.x}`}
          cx={t.x + t.dir * 8}
          cy={BASE - t.h}
          r="2.5"
          fill={t.live ? "#2CFF98" : "#002428"}
          stroke={t.live ? "#2CFF98" : "rgb(169 199 194 / 0.5)"}
          strokeWidth="1"
          className={t.live ? "animate-pulse-node" : undefined}
        />
      ))}
      <path
        d={`M0 ${BASE} H${W}`}
        pathLength={1}
        stroke="#2CFF98"
        strokeWidth="1.5"
        strokeDasharray="0.07 2"
        strokeDashoffset="0.07"
        strokeLinecap="round"
        className="trace-pulse"
        style={{ filter: "drop-shadow(0 0 4px rgb(44 255 152 / 0.8))" }}
      />
    </svg>
  );
}
