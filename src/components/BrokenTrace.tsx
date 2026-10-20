/** 404 motif: a live trace that runs into a break; the far side is dead (hairline, dashed ghost link). */
export function BrokenTrace({ className = "" }: { className?: string }) {
  const draw = (delay: number) => ({
    pathLength: 1,
    className: "draw-in",
    style: { animationDelay: `${delay}s` },
  });
  return (
    <svg aria-hidden viewBox="0 0 1200 260" fill="none" preserveAspectRatio="xMidYMid meet" className={className}>
      <g stroke="rgb(169 199 194 / 0.3)" strokeWidth="1">
        <path d="M0 200 H1200" strokeDasharray="1 7" />
        <path d="M700 130 H760 L800 90 H1200" />
        <path d="M760 130 V200" strokeDasharray="2 5" />
        <path d="M860 90 V40 M940 90 V150 L970 180 H1040" />
        <circle cx="860" cy="36" r="4" fill="#002428" />
        <circle cx="1044" cy="180" r="4" fill="#002428" />
        <circle cx="700" cy="130" r="5" fill="#002428" />
      </g>
      <g stroke="#2CFF98" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 6px rgb(44 255 152 / 0.55))" }}>
        <path d="M0 130 H260 L300 90 H420 L460 130 H596" {...draw(0.1)} />
        <path d="M300 90 V40 M420 90 V30" strokeOpacity="0.6" {...draw(0.6)} />
        <circle cx="300" cy="36" r="4" fill="#002428" />
        <circle cx="420" cy="26" r="4" fill="#002428" />
        <circle cx="602" cy="130" r="6" fill="#002428" className="animate-pulse-node" />
      </g>
      {/* spark across the gap */}
      <g stroke="#2CFF98" strokeWidth="1.25" strokeLinecap="round" className="animate-pulse-node">
        <path d="M624 112 L640 124 M628 150 L644 138 M650 106 L652 122 M652 140 L656 156" />
      </g>
    </svg>
  );
}
