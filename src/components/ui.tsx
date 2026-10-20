/**
 * Shared design-system primitives ("Living Circuit" v2).
 *
 * Layout      Section, Container            — section rhythm + gutters (py-24 md:py-32 / tight py-16 md:py-20)
 * Type        Accent, rich(), Eyebrow        — Instrument Serif accent word, `*accent*` markup, mono labels
 * Headers     SectionHeader, PageHero        — numbered chapter header (asymmetric 12-col), inner-page hero
 * Actions     ButtonLink                     — primary volt pill / PCB "bracket" / text link, all ≥44px
 * Structure   HairlineList, CornerTicks, IndexTag
 *
 * Tones: components default to dark surfaces. Inside `.band-bone` (light band) pass `tone="light"`
 * where offered — volt is never used for text on light backgrounds.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { CircuitField } from "./CircuitField";

type Tone = "dark" | "light";

/* ------------------------------------------------------------------ */
/* Type helpers                                                        */
/* ------------------------------------------------------------------ */

/** One italic Instrument Serif word/phrase per headline. `tone="mist"` for a quieter accent. */
export function Accent({ children, tone = "volt", className = "" }: { children: ReactNode; tone?: "volt" | "mist" | "ink"; className?: string }) {
  const color = tone === "volt" ? "text-volt" : tone === "ink" ? "text-volt-ink" : "text-mist";
  return <span className={`type-accent whitespace-nowrap ${color} ${className}`}>{children}</span>;
}

/**
 * Renders lightweight inline markup used in copy strings:
 *   `*word*`   → <Accent>   (Instrument Serif italic)
 *   `==text==` → highlighter mark (volt background, abyss text)
 */
export function rich(text: string, accentTone: "volt" | "mist" | "ink" = "volt"): ReactNode {
  const parts = text.split(/(\*[^*]+\*|==[^=]+==)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*"))
      return (
        <Accent key={i} tone={accentTone}>
          {part.slice(1, -1)}
        </Accent>
      );
    if (part.startsWith("==") && part.endsWith("=="))
      return (
        <mark key={i} className="mf-mark">
          {part.slice(2, -2)}
        </mark>
      );
    return part;
  });
}

/** Wraps the first occurrence of `accent` inside `title` with <Accent>. */
export function withAccent(title: string, accent?: string, tone: "volt" | "mist" | "ink" = "volt"): ReactNode {
  if (!accent) return rich(title, tone);
  const at = title.indexOf(accent);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <Accent tone={tone}>{accent}</Accent>
      {title.slice(at + accent.length)}
    </>
  );
}

/** Mono "[ 01 ]" chapter index. */
export function IndexTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`type-label whitespace-nowrap ${className}`}>
      [&nbsp;{children}&nbsp;]
    </span>
  );
}

/**
 * Mono eyebrow / label. `● LABEL` by default, `[ 01 ] LABEL` when `index` is given.
 * Legacy usage `<Eyebrow>01</Eyebrow>` still works.
 */
export function Eyebrow({
  children,
  index,
  dot = true,
  tone = "dark",
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  index?: string;
  dot?: boolean;
  tone?: Tone;
  className?: string;
  as?: ElementType;
}) {
  const color = tone === "light" ? "text-bone-ink" : "text-slate";
  return (
    <Tag className={`type-label flex items-start gap-2.5 ${color} ${className}`}>
      {index ? (
        <IndexTag className={tone === "light" ? "text-abyss-900" : "text-fog"}>{index}</IndexTag>
      ) : dot ? (
        <span aria-hidden className={`mt-[0.32em] size-1.5 shrink-0 rounded-full ${tone === "light" ? "bg-volt-ink" : "bg-volt"}`} />
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

const sectionTones = {
  base: "bg-abyss-900 text-mist",
  deep: "bg-abyss-950 text-mist",
  raised: "bg-abyss-850 text-mist",
  petrol: "bg-petrol-800 text-mist",
  bone: "band-bone",
} as const;

/**
 * Page section with the standard rhythm. `spacing`: default = py-24 md:py-32, tight = py-16 md:py-20.
 * `tone="bone"` gives the light band (use 1–2 per page max).
 */
export function Section({
  children,
  tone = "base",
  spacing = "default",
  className = "",
  id,
  labelledBy,
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: keyof typeof sectionTones;
  spacing?: "default" | "tight" | "none";
  className?: string;
  id?: string;
  labelledBy?: string;
  as?: ElementType;
}) {
  const pad = spacing === "default" ? "section-y" : spacing === "tight" ? "section-y-tight" : "";
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={`relative ${sectionTones[tone]} ${pad} ${className}`}>
      {children}
    </Tag>
  );
}

/** Max-width wrapper with the site gutter (`container-site`). */
export function Container({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag className={`container-site ${className}`}>{children}</Tag>;
}

/** Engineering-drawing crosshair ticks on the four corners of the nearest `relative` parent. */
export function CornerTicks({ className = "", tone = "dark" }: { className?: string; tone?: Tone }) {
  const c = tone === "light" ? "text-abyss-900/50" : "text-fog/60";
  const tick = "absolute size-3";
  const svg = (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 0v12M0 6h12" />
    </svg>
  );
  return (
    <span aria-hidden className={`pointer-events-none ${c} ${className}`}>
      <span className={`${tick} -left-1.5 -top-1.5`}>{svg}</span>
      <span className={`${tick} -right-1.5 -top-1.5`}>{svg}</span>
      <span className={`${tick} -bottom-1.5 -left-1.5`}>{svg}</span>
      <span className={`${tick} -bottom-1.5 -right-1.5`}>{svg}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Headers                                                             */
/* ------------------------------------------------------------------ */

/** The chapter marker: `[ 01 ] ──● LABEL`. */
export function ChapterLabel({ index, label, tone = "dark", className = "" }: { index?: string; label?: string; tone?: Tone; className?: string }) {
  const light = tone === "light";
  return (
    <p className={`type-label flex items-center gap-3 ${light ? "text-bone-ink" : "text-slate"} ${className}`}>
      {index && <IndexTag className={light ? "text-abyss-900" : "text-fog"}>{index}</IndexTag>}
      <span aria-hidden className={`relative h-px w-8 shrink-0 ${light ? "bg-abyss-900/25" : "bg-line-strong"}`}>
        <span
          className={`absolute -right-0.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full ${
            light ? "bg-volt-ink" : "bg-volt shadow-[0_0_10px_rgb(44_255_152/0.7)]"
          }`}
        />
      </span>
      {label && <span>{label}</span>}
    </p>
  );
}

/**
 * Numbered chapter header. Asymmetric 12-col split (label in cols 1–3, title from col 4) whenever its
 * container is ≥ 56rem wide (container query), otherwise stacked — so it also works inside half-width columns.
 *
 * Props: index ("01"), label ("Tez"), title, accent (substring of title rendered in Instrument Serif italic,
 * or use `*markup*` in title), lead, children (actions under the lead), tone ("dark" | "light"),
 * layout ("auto" | "stacked"), as ("h1" | "h2"), id (heading id for aria-labelledby).
 * Legacy: `eyebrow` is accepted as an alias of `label`.
 */
export function SectionHeader({
  index,
  label,
  eyebrow,
  title,
  accent,
  lead,
  children,
  tone = "dark",
  layout = "auto",
  as: Heading = "h2",
  id,
  className = "",
  titleClassName = "",
}: {
  index?: string;
  label?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: Tone;
  layout?: "auto" | "stacked";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  titleClassName?: string;
}) {
  const light = tone === "light";
  const split = layout === "auto";
  return (
    <div className={`@container ${className}`}>
      <div className={`grid gap-y-6 ${split ? "@4xl:grid-cols-12 @4xl:gap-x-6" : ""}`}>
        <ChapterLabel index={index} label={label ?? eyebrow} tone={tone} className={split ? "@4xl:col-span-3 @4xl:pt-[0.9rem]" : ""} />
        <div className={split ? "@4xl:col-span-9" : ""}>
          <Heading id={id} className={`type-h2 max-w-[22ch] ${light ? "text-abyss-900" : "text-mist"} ${titleClassName}`}>
            {withAccent(title, accent, light ? "ink" : "volt")}
          </Heading>
          {lead && <div className={`type-lead mt-6 max-w-[58ch] ${light ? "text-bone-ink" : "text-fog"}`}>{lead}</div>}
          {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Inner-page hero. Mono breadcrumb (`[ index ] Cleantech Ventures / eyebrow`), display H1 with optional accent,
 * lead, optional actions (children). A circuit "bus" runs along the bottom hairline, clear of the text (QA #5).
 */
export function PageHero({
  index,
  eyebrow,
  title,
  accent,
  lead,
  children,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-abyss-900">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_0%,rgb(0_76_84/0.55),transparent_70%)]" />
      <div className="container-site relative pb-28 pt-36 md:pb-36 md:pt-44">
        <div className="animate-rise">
          {eyebrow && <ChapterLabel index={index} label={eyebrow} />}
          <h1 className="type-h1 mt-8 max-w-[15ch] text-mist">{withAccent(title, accent)}</h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="type-lead max-w-[56ch] text-fog lg:col-span-7">{lead}</div>
          </div>
          {children}
        </div>
      </div>
      <CircuitField className="absolute inset-x-0 bottom-0 h-14 w-full" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "bracket" | "text" | /** @deprecated → bracket */ "outline" | /** @deprecated → text */ "ghost";

const buttonBase =
  "group inline-flex min-h-11 items-center justify-center gap-3 text-[0.9375rem] font-medium leading-none tracking-[-0.005em] transition-colors duration-300";

function buttonClasses(variant: ButtonVariant) {
  switch (variant) {
    case "primary":
      return `${buttonBase} rounded-full bg-volt py-1.5 pl-6 pr-1.5 text-abyss-950 hover:bg-volt-300 in-[.band-bone]:bg-abyss-900 in-[.band-bone]:text-bone in-[.band-bone]:hover:bg-petrol-800`;
    case "bracket":
    case "outline":
      return `${buttonBase} btn-bracket px-5 py-3 text-mist in-[.band-bone]:text-abyss-900`;
    case "text":
    case "ghost":
      return `${buttonBase} min-h-10 gap-2 text-mist hover:text-volt in-[.band-bone]:text-abyss-900 in-[.band-bone]:hover:text-volt-ink`;
  }
}

/**
 * Link styled as a button. Internal hrefs use next/link; http(s) open in a new tab with an ↗ icon.
 * Variants: "primary" (solid volt pill, one per viewport), "bracket" (PCB corner ticks), "text".
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Force the trailing icon; defaults to ↗ for external links, → otherwise. */
  icon?: "arrow" | "external" | "none";
}) {
  const external = /^https?:/.test(href);
  const mail = href.startsWith("mailto:");
  const kind = icon ?? (external ? "external" : "arrow");
  const Icon = kind === "external" ? ArrowUpRight : ArrowRight;
  const classes = `${buttonClasses(variant)} ${className}`;
  const iconEl =
    kind === "none" ? null : variant === "primary" ? (
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-abyss-950 text-volt transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 in-[.band-bone]:bg-volt in-[.band-bone]:text-abyss-950">
        <Icon aria-hidden className="size-4" strokeWidth={1.75} />
      </span>
    ) : (
      <Icon
        aria-hidden
        className={`size-4 shrink-0 text-volt transition-transform duration-500 group-hover:translate-x-0.5 in-[.band-bone]:text-volt-ink ${
          kind === "external" ? "group-hover:-translate-y-0.5" : ""
        }`}
        strokeWidth={1.75}
      />
    );
  const content = (
    <>
      <span className={variant === "text" || variant === "ghost" ? "link-trace pb-0.5" : ""}>{children}</span>
      {iconEl}
    </>
  );
  if (external || mail) {
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Structure                                                           */
/* ------------------------------------------------------------------ */

/**
 * Numbered hairline list (no boxed cards). Each row: mono index, title, optional text.
 * `columns` lays rows out in a 1/2/3-col hairline grid from md/lg up.
 */
export function HairlineList({
  items,
  columns = 1,
  numbered = true,
  tone = "dark",
  size = "md",
  start = 1,
  className = "",
}: {
  items: { title: ReactNode; text?: ReactNode; key?: string }[];
  columns?: 1 | 2 | 3;
  numbered?: boolean;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  start?: number;
  className?: string;
}) {
  const light = tone === "light";
  const cols = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "";
  const titleSize = size === "lg" ? "type-h3" : size === "sm" ? "text-base font-medium" : "text-lg font-medium leading-snug md:text-xl";
  const ListTag = numbered ? "ol" : "ul";
  return (
    <ListTag className={`grid gap-x-8 ${cols} ${className}`}>
      {items.map((item, i) => (
        <li
          key={item.key ?? i}
          className={`grid grid-cols-[3.25rem_1fr] gap-x-4 border-t py-6 md:py-7 ${light ? "border-line-ink" : "border-line"} ${
            columns > 1 ? "md:grid-cols-1 md:gap-y-5" : ""
          }`}
        >
          <span className={`type-label pt-1 ${light ? "text-bone-ink" : "text-slate"}`}>{numbered ? String(i + start).padStart(2, "0") : "●"}</span>
          <div className="min-w-0">
            <div className={`${titleSize} ${light ? "text-abyss-900" : "text-mist"}`}>{item.title}</div>
            {item.text && <div className={`mt-2 leading-relaxed ${light ? "text-bone-ink" : "text-fog"}`}>{item.text}</div>}
          </div>
        </li>
      ))}
    </ListTag>
  );
}
