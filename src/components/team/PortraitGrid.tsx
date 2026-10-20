import Image from "next/image";
import type { Member } from "@/content/team";
import { tx, type Locale } from "@/lib/i18n";
import { LinkedInIcon } from "../icons";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Team portraits (QA #24). Sources are normalised offline to the same 4:5 crop, head size and backdrop
 * (public/team/portrait); here they get one petrol duotone (multiply tint + lighten lift) that falls away to the
 * natural photo on hover / focus-within. Names in display type never break mid-word; title + organisation in mono.
 *
 * `fill` adds a non-person stat cell so every row is complete (7 people + 1 = 2×4).
 */
export function PortraitGrid({
  members,
  locale,
  columns,
  start = 1,
  fill,
  sizes,
}: {
  members: Member[];
  locale: Locale;
  columns: "four" | "three";
  start?: number;
  fill?: { value: number; label: string; caption: string };
  sizes: string;
}) {
  const cols = columns === "four" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";
  return (
    <ul className={`grid gap-x-4 gap-y-12 sm:gap-x-6 md:gap-y-16 ${cols}`}>
      {members.map((m, i) => (
        <li key={m.name} className="portrait-card group relative min-w-0" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-abyss-950">
            <Image src={m.portrait ?? m.photo} alt="" fill sizes={sizes} className="portrait-img object-cover object-top" />
            <span aria-hidden className="portrait-tint absolute inset-0" />
            <span aria-hidden className="portrait-lift absolute inset-0" />
            <span
              aria-hidden
              className="pcb-brackets pointer-events-none absolute inset-3 opacity-0 transition-[opacity,inset] duration-500 ease-out-expo [--tick-color:var(--color-volt)] group-focus-within:inset-2 group-focus-within:opacity-100 group-hover:inset-2 group-hover:opacity-100"
            />
            <span aria-hidden className="type-label absolute bottom-3 left-3 text-fog transition-colors duration-500 group-hover:text-volt sm:bottom-4 sm:left-4">
              [ {pad(start + i)} ]
            </span>
          </div>
          <div className="mt-4 flex items-start justify-between gap-2 border-t border-line pt-4 sm:gap-3">
            <div className="min-w-0">
              <h3 className="text-[clamp(1.0625rem,0.95rem+0.55vw,1.5rem)] font-[500] leading-[1.08] tracking-[-0.025em] text-mist [font-stretch:106%] [hyphens:manual] [overflow-wrap:normal] [text-wrap:balance]">
                {m.name}
              </h3>
              <p className="type-label mt-3 text-fog">{tx(m.title, locale)}</p>
              {m.organization && <p className="type-label mt-1.5 text-slate">↳ {m.organization}</p>}
            </div>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} — LinkedIn`}
                className="-mt-1.5 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fog transition-colors duration-300 hover:border-volt hover:text-volt"
              >
                <LinkedInIcon className="size-3.5" />
              </a>
            )}
          </div>
        </li>
      ))}
      {fill && (
        <li aria-hidden className="relative min-w-0">
          <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-line bg-abyss-850/40 p-4 sm:p-6">
            <div className="dot-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_top,black,transparent_80%)]" />
            <p className="type-label relative flex items-center gap-2.5 text-fog">
              <span className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)]" />
              {fill.caption}
            </p>
            <div className="relative">
              <p className="type-stat text-[clamp(3.5rem,2rem+6vw,7rem)] text-mist">{pad(fill.value)}</p>
              <p className="type-label mt-3 text-fog">{fill.label}</p>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}
