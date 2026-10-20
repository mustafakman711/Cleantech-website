import { Boxes, Building2, Droplets, Earth, Fish, HeartPulse, Infinity as InfinityIcon, SunMedium, TreeDeciduous, VenusAndMars, type LucideIcon } from "lucide-react";
import { sdgs } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";

/** One crisp line icon per goal, echoing the official pictogram's subject (QA #14). */
const sdgIcons: Record<number, LucideIcon> = {
  3: HeartPulse,
  5: VenusAndMars,
  6: Droplets,
  7: SunMedium,
  9: Boxes,
  11: Building2,
  12: InfinityIcon,
  13: Earth,
  14: Fish,
  15: TreeDeciduous,
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * SDGs as a brand-recoloured hairline grid (Addendum A: no official rainbow tiles). Each cell: large light goal number,
 * a lucide line icon in a fixed 40–44px box, the goal name, and a ≤6px official-colour marker for recognition.
 * 10 goals → 2 cols (5 rows) / 5 cols (2 rows): rows are always complete.
 */
export function SdgMatrix({ locale, short }: { locale: Locale; short: string }) {
  return (
    <ul className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-5">
      {sdgs.map((s) => {
        const Icon = sdgIcons[s.number] ?? Earth;
        return (
          <li key={s.number} className="group relative flex min-h-[13rem] flex-col bg-abyss-900 p-5 transition-colors duration-500 hover:bg-abyss-850 md:min-h-[16.5rem] md:p-6" data-reveal="fade">
            <span aria-hidden className="pcb-brackets pointer-events-none absolute inset-2 opacity-0 transition-[opacity,inset] duration-500 ease-out-expo [--tick-color:var(--color-volt)] group-hover:inset-1.5 group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-3">
              <p className="type-label flex items-center gap-2 text-fog">
                <span aria-hidden className="size-1.5 shrink-0" style={{ backgroundColor: s.color }} />
                <span>
                  {short}
                  <span className="sr-only"> {s.number}</span>
                </span>
              </p>
              <Icon aria-hidden className="size-10 shrink-0 text-fog transition-colors duration-500 group-hover:text-volt md:size-8 lg:size-11" strokeWidth={1} />
            </div>
            <p aria-hidden className="mt-3 text-[clamp(2.75rem,1.8rem+2.4vw,4rem)] font-[300] leading-none tracking-[-0.04em] text-mist tabular-nums [font-stretch:120%]">
              {pad(s.number)}
            </p>
            <p className="mt-auto pt-8 text-[0.9375rem] leading-snug text-mist [hyphens:manual]">{tx(s.name, locale)}</p>
          </li>
        );
      })}
    </ul>
  );
}
