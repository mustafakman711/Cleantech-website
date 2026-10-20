/**
 * Content sections shared by inner pages (restyled to the v2 hairline system; Phase 2b may redesign further).
 * Exports kept stable: CtaBand, ImpactTargets, PartnerGrid, SdgGrid, StrengthGrid, CheckList, SectorClusters,
 * ValueCreationList, PortfolioCard, TeamGrid, PostCard, Faq.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { copy } from "@/content/copy";
import {
  clusters,
  contact,
  faq,
  impactHighlights,
  impactTargets,
  partners,
  sdgs,
  strengths,
  valueCreation,
} from "@/content/fund";
import type { Company } from "@/content/portfolio";
import type { Member } from "@/content/team";
import { formatDate, tx, type Locale } from "@/lib/i18n";
import type { Post } from "@/lib/posts";
import { LinkedInIcon, sectorIcons } from "./icons";
import { CompanyPictogram } from "./pictograms";
import { ButtonLink, ChapterLabel, CornerTicks, HairlineList } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** Four themes as a hairline 2-col grid; each theme lists its sectors as rows with icons. */
export function SectorClusters({ locale }: { locale: Locale }) {
  return (
    <div className="grid border-t border-line md:grid-cols-2">
      {clusters.map((cluster, i) => (
        <article key={cluster.title.en} className="border-b border-line py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="type-h3 text-mist">{tx(cluster.title, locale)}</h3>
            <span className="type-label text-slate">[ {pad(i + 1)} ]</span>
          </div>
          <p className="mt-3 max-w-[48ch] text-fog">{tx(cluster.summary, locale)}</p>
          <ul className="mt-6 border-t border-line">
            {cluster.sectors.map((s) => {
              const Icon = sectorIcons[s.key];
              return (
                <li key={s.key} className="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem] text-mist">
                  <Icon aria-hidden className="size-4 shrink-0 text-volt" strokeWidth={1.5} />
                  {tx(s.name, locale)}
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function CheckList({ items, locale, columns = 2 }: { items: { tr: string; en: string }[]; locale: Locale; columns?: 2 | 3 }) {
  return <HairlineList columns={columns} items={items.map((item) => ({ key: item.en, title: tx(item, locale) }))} />;
}

export function ValueCreationList({ locale, tone = "dark", className = "" }: { locale: Locale; tone?: "dark" | "light"; className?: string }) {
  return <HairlineList tone={tone} className={className} items={valueCreation.map((v) => ({ key: v.en, title: tx(v, locale) }))} />;
}

/**
 * Portfolio company card (portfolio page until Phase 2b). Header row wraps and the website pill truncates
 * (QA #1), the stats row sticks to the bottom (QA #8), logos sit in a fixed tile (QA #7).
 */
export function PortfolioCard({ company, locale, detailed = false }: { company: Company; locale: Locale; detailed?: boolean }) {
  const c = copy[locale].common;
  const host = company.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return (
    <article id={company.slug} className="relative flex min-w-0 scroll-mt-28 flex-col border border-line bg-abyss-850/40 p-6 sm:p-8">
      <CornerTicks />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-12 items-center">
          <Image src={company.logo} alt={company.name} width={company.logoWidth} height={company.logoHeight} className="h-9 w-auto max-w-[11rem] object-contain object-left" />
        </div>
        <CompanyPictogram slug={company.slug} className="size-11 text-fog" />
      </div>
      <h3 className="type-h3 mt-8 text-mist">{company.name}</h3>
      <p className="type-label mt-2 text-slate">{tx(company.sector, locale)}</p>
      <p className="mt-4 leading-relaxed text-fog">{tx(company.description, locale)}</p>
      <div aria-hidden className="min-h-6 flex-1" />
      <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
        {company.highlights.map((h) => (
          <div key={h.label.en} className="min-w-0">
            <dt className="sr-only">{tx(h.label, locale)}</dt>
            <dd className="text-[clamp(1.125rem,0.9rem+0.8vw,1.5rem)] font-[450] leading-tight tracking-[-0.02em] text-mist [font-stretch:110%]">{tx(h.value, locale)}</dd>
            <dd className="mt-1.5 text-xs leading-snug text-slate">{tx(h.label, locale)}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="type-label inline-flex min-h-10 min-w-0 max-w-full items-center gap-1.5 text-fog hover:text-volt"
        >
          <span className="truncate">{host}</span>
          <ArrowUpRight aria-hidden className="size-3.5 shrink-0 text-volt" />
        </a>
        <span className="type-label text-slate">
          {c.headquarters}: {tx(company.hq, locale)}
        </span>
      </div>
      {detailed && (
        <div className="mt-2">
          <h4 className="type-label mt-4 text-slate">{c.founders}</h4>
          <ul className="mt-2">
            {company.founders.map((f) => (
              <li key={f.name}>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm text-mist hover:text-volt">
                  <LinkedInIcon className="size-4 text-volt" />
                  <span>
                    {f.name} <span className="text-slate">· {tx(f.role, locale)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

/** Optical logo sizing: every partner logo gets the same visual AREA (not the same height), QA #16. */
const LOGO_AREA = 4600;

/**
 * Fund partners as a hairline ledger: stacked < md, one row per partner (role | logo | text) from md, three
 * columns from xl. A volt node marks each partner on the top "bus" line. Logos are cropped SVGs sized by area.
 */
export function PartnerGrid({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const light = tone === "light";
  const line = light ? "border-line-ink" : "border-line";
  return (
    <ol className={`grid border-t xl:grid-cols-3 ${line}`}>
      {partners.map((p, i) => {
        const aspect = p.logoWidth / p.logoHeight;
        const h = Math.round(Math.sqrt(LOGO_AREA / aspect));
        return (
          <li
            key={p.name}
            className={`relative grid gap-y-6 border-b py-8 md:grid-cols-12 md:items-center md:gap-x-6 md:py-10 xl:flex xl:flex-col xl:items-stretch xl:gap-y-0 xl:border-b-0 xl:px-8 xl:py-10 xl:first:pl-0 xl:last:pr-0 ${line} ${
              i > 0 ? (light ? "xl:border-l xl:border-line-ink" : "xl:border-l xl:border-line") : ""
            }`}
          >
            <span
              aria-hidden
              className={`absolute -top-[3.5px] size-1.5 rounded-full ${i > 0 ? "left-0 xl:-left-[3.5px]" : "left-0"} ${
                light ? "bg-volt-ink" : "bg-volt shadow-[0_0_8px_rgb(44_255_152/0.8)]"
              }`}
            />
            <p className={`type-label md:col-span-3 ${light ? "text-bone-ink" : "text-slate"}`}>
              <span className={light ? "text-abyss-900" : "text-fog"}>{pad(i + 1)}</span> — {tx(p.role, locale)}
            </p>
            <div className="flex h-12 items-center md:col-span-3 xl:mt-10">
              <Image
                src={p.logo}
                alt={p.name}
                width={p.logoWidth}
                height={p.logoHeight}
                style={{ height: h, width: Math.round(h * aspect) }}
                className={`max-w-full object-contain object-left ${light ? "invert" : ""}`}
              />
            </div>
            <p className={`text-[0.9375rem] leading-relaxed md:col-span-6 xl:mt-10 ${light ? "text-bone-ink" : "text-fog"}`}>{tx(p.description, locale)}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function StrengthGrid({ locale }: { locale: Locale }) {
  return <HairlineList columns={3} items={strengths.map((s) => ({ key: s.title.en, title: tx(s.title, locale), text: tx(s.text, locale) }))} />;
}

/** Impact targets as true-scale bars (QA #23: width = value% of 100). */
export function ImpactTargets({ locale }: { locale: Locale }) {
  const target = copy[locale].common.target;
  const pct = (v: number) => (locale === "tr" ? `%${v}` : `${v}%`);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <ul className="border-t border-line">
        {impactTargets.map((t) => (
          <li key={t.label.en} className="border-b border-line py-5">
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-[0.9375rem] text-mist sm:text-base">{tx(t.label, locale)}</span>
              <span className="type-mono shrink-0 text-volt">
                <span className="sr-only">{target}: </span>
                {pct(t.value)}
              </span>
            </div>
            <div aria-hidden className="relative mt-3 h-px bg-line-strong">
              <div className="absolute inset-y-[-1px] left-0 bg-volt" style={{ width: `${Math.min(100, t.value)}%` }} />
              <span className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt" style={{ left: `${Math.min(100, t.value)}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-px self-start border border-line bg-line">
        {impactHighlights.map((h) => (
          <div key={h.label.en} className="bg-abyss-900 p-8">
            <p className="type-stat text-mist">{tx(h.value, locale)}</p>
            <p className="mt-4 text-fog">{tx(h.label, locale)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SdgGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
      {sdgs.map((s) => (
        <li key={s.number} className="relative border-b border-r border-line p-5">
          <div className="flex items-start justify-between gap-2">
            <span className="type-label flex items-center gap-2 text-slate">
              <span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              {locale === "tr" ? "SKA" : "SDG"} {pad(s.number)}
            </span>
            <Image src={`/sdg/sdg-${s.number}.png`} alt="" width={40} height={40} className="size-10 object-contain opacity-80 grayscale" />
          </div>
          <p className="mt-6 text-[0.9375rem] leading-snug text-mist">{tx(s.name, locale)}</p>
        </li>
      ))}
    </ul>
  );
}

/** FAQ accordion: hairline rows, +/× icon, native <details>. */
export function Faq({ locale, items = faq, tone = "dark" }: { locale: Locale; items?: typeof faq; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div className={`border-t ${light ? "border-line-ink" : "border-line"}`}>
      {items.map((item, i) => (
        <details key={item.q.en} className={`disclosure group border-b ${light ? "border-line-ink" : "border-line"}`}>
          <summary
            className={`grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-6 text-lg leading-snug transition-colors md:text-xl ${
              light ? "text-abyss-900 hover:text-volt-ink" : "text-mist hover:text-volt"
            }`}
          >
            <span className={`type-label pt-1.5 ${light ? "text-bone-ink" : "text-slate"}`}>{pad(i + 1)}</span>
            <span className="font-[450] tracking-[-0.01em]">{tx(item.q, locale)}</span>
            <span
              aria-hidden
              className={`mt-0.5 grid size-7 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 group-open:rotate-45 ${
                light ? "border-line-ink" : "border-line-strong group-open:border-volt group-open:bg-volt group-open:text-abyss-950"
              }`}
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
            </span>
          </summary>
          <p className={`max-w-[62ch] pb-7 pl-[3.25rem] pr-10 leading-relaxed ${light ? "text-bone-ink" : "text-fog"}`}>{tx(item.a, locale)}</p>
        </details>
      ))}
    </div>
  );
}

export function TeamGrid({ members, locale }: { members: Member[]; locale: Locale }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((m) => (
        <li key={m.name} className="group min-w-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-abyss-850">
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 50vw"
              className="object-cover object-top grayscale transition duration-700 group-hover:grayscale-0 group-focus-within:grayscale-0"
            />
            <div aria-hidden className="absolute inset-0 bg-petrol-800/25 mix-blend-multiply" />
          </div>
          <div className="mt-4 flex items-start justify-between gap-3 border-t border-line pt-4">
            <div className="min-w-0">
              <h3 className="text-base font-medium leading-tight text-mist text-balance sm:text-lg">{m.name}</h3>
              {m.organization && <p className="type-label mt-2 text-fog">{m.organization}</p>}
              <p className="mt-1 text-sm text-slate">{tx(m.title, locale)}</p>
            </div>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} LinkedIn`}
                className="-mr-1 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fog hover:text-volt"
              >
                <LinkedInIcon className="size-4" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Post card: 16:9 image (QA #11), focus ring on the whole card (QA #12), full-card link. */
export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const href = `/${locale}/${post.type}/${post.slug}`;
  return (
    <article className="group relative flex flex-col border-t border-line pt-5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-volt">
      {post.image && (
        <div className="relative aspect-video overflow-hidden bg-abyss-850">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
            className="object-cover saturate-[0.85] transition duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col pt-5">
        <time dateTime={post.date} className="type-label text-slate">
          {formatDate(post.date, locale)}
        </time>
        <h3 className="mt-3 line-clamp-3 text-lg font-medium leading-snug text-mist transition-colors group-hover:text-volt">
          <Link href={href} className="outline-none after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-fog">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-mist">
          {copy[locale].common.readMore}
          <ArrowRight aria-hidden className="size-4 text-volt transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}

/**
 * Closing "apply" band for inner pages: two application panels (founders / investors) in a hairline split.
 * (The footer finale carries the general contact CTA, so this band stays specific.)
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const p = c.contactPage;
  const panels = [
    { title: p.startupTitle, text: p.startupText, href: contact.startupFormUrl, label: c.common.applyStartup, primary: true },
    { title: p.investorTitle, text: p.investorText, href: contact.investorFormUrl, label: c.common.applyInvestor, primary: false },
  ];
  return (
    <section className="section-y relative border-t border-line bg-abyss-900">
      <div className="container-site">
        <ChapterLabel label={c.footer.apply} />
        <h2 className="type-h2 mt-8 max-w-[20ch] text-mist">{c.cta.title}</h2>
        <div className="mt-14 grid border-t border-line md:grid-cols-2">
          {panels.map((panel, i) => (
            <div key={panel.title} className={`flex flex-col py-10 md:px-10 ${i === 0 ? "md:border-r md:border-line md:pl-0" : "border-t border-line md:border-t-0 md:pr-0"}`}>
              <p className="type-label text-slate">[ {pad(i + 1)} ]</p>
              <h3 className="type-h3 mt-4 text-mist">{panel.title}</h3>
              <p className="mt-3 max-w-[44ch] text-fog">{panel.text}</p>
              <div className="mt-8">
                <ButtonLink href={panel.href} variant={panel.primary ? "primary" : "bracket"}>
                  {panel.label}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
