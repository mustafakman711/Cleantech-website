import { ChapterLabel, withAccent } from "../ui";

/**
 * Team hero: a giant cropped "EKİP" / "TEAM" (Mona Sans expanded, petrol-800) sits behind the heading
 * (World Fund pattern), bleeding off the bottom edge. Mono roster strip underneath the lead.
 */
export function TeamHero({
  eyebrow,
  title,
  accent,
  lead,
  word,
  stats,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  word: string;
  stats: { label: string; value: number; href: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-abyss-900">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_85%_0%,rgb(0_76_84/0.55),transparent_70%)]" />
      <div className="container-site relative pt-36 md:pt-44">
        <div className="animate-rise">
          <ChapterLabel label={eyebrow} />
          <h1 className="type-h1 mt-8 max-w-[16ch] text-mist">{withAccent(title, accent)}</h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <p className="type-lead max-w-[52ch] text-fog lg:col-span-6">{lead}</p>
            <ul className="grid grid-cols-3 border-t border-line-strong lg:col-span-5 lg:col-start-8">
              {stats.map((s, i) => (
                <li key={s.label} className={`${i > 0 ? "border-l border-line-strong pl-4" : ""} pr-2 pt-4`}>
                  <a href={s.href} className="group block min-h-11 outline-offset-4">
                    <span className="block text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] font-[350] leading-none tracking-[-0.04em] text-mist tabular-nums [font-stretch:120%]">
                      {String(s.value).padStart(2, "0")}
                    </span>
                    <span className="type-label mt-3 block text-fog transition-colors group-hover:text-volt">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* giant cropped word, bleeding off the bottom edge */}
      <div aria-hidden className="pointer-events-none relative -z-10 mt-8 h-[min(23vw,24rem)] select-none overflow-hidden lg:-mt-[3vw]">
        <span className="absolute inset-x-0 top-0 block whitespace-nowrap text-center text-[min(34vw,36rem)] font-[620] leading-[0.8] tracking-[-0.055em] text-petrol-800 [font-stretch:125%]">
          {word}
        </span>
      </div>
    </section>
  );
}
