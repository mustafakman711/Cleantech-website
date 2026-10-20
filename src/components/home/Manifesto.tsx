import type { Locale } from "@/lib/i18n";

/**
 * Manifesto paragraph: words brighten slate → mist one by one as the paragraph scrolls through the
 * viewport (CSS view-timeline; IO fallback in RevealObserver). `==phrase==` segments get the volt highlighter.
 * Split on the server, so the full sentence is in the HTML and reads normally with no JS / reduced motion.
 */
export function Manifesto({ text, locale, className = "" }: { text: string; locale: Locale; className?: string }) {
  const segments = text.split(/(==[^=]+==)/g).filter(Boolean);
  const units: { kind: "word" | "mark"; text: string }[] = [];
  for (const seg of segments) {
    if (seg.startsWith("==")) units.push({ kind: "mark", text: seg.slice(2, -2) });
    else for (const w of seg.split(/\s+/).filter(Boolean)) units.push({ kind: "word", text: w });
  }
  const last = Math.max(1, units.length - 1);

  return (
    <p lang={locale} className={`mf-root ${className}`}>
      {units.map((u, i) => {
        const style = { ["--p" as string]: (i / last).toFixed(3) };
        // Keep punctuation that follows a mark glued to it (no leading space).
        const space = i === 0 || /^[,.;:!?]/.test(u.text) ? "" : " ";
        return (
          <span key={i}>
            {space}
            {u.kind === "mark" ? (
              <mark className="mf-mark" style={style}>
                {u.text}
              </mark>
            ) : (
              <span className="mf-word" style={style}>
                {u.text}
              </span>
            )}
          </span>
        );
      })}
    </p>
  );
}
