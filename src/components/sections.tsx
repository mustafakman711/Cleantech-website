import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Globe } from "lucide-react";
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
import { CircuitField } from "./CircuitField";
import { LinkedInIcon, sectorIcons } from "./icons";
import { ButtonLink, Eyebrow } from "./ui";

export function SectorClusters({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {clusters.map((cluster, i) => (
        <article
          key={cluster.title.en}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-petrol-850/70 p-7 transition-colors hover:border-neon/40 sm:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold">{tx(cluster.title, locale)}</h3>
            <span className="font-display text-sm text-neon/70">0{i + 1}</span>
          </div>
          <p className="mt-3 text-mist/80">{tx(cluster.summary, locale)}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {cluster.sectors.map((s) => {
              const Icon = sectorIcons[s.key];
              return (
                <li
                  key={s.key}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-petrol-900/70 py-2 pl-2 pr-4 text-sm font-medium"
                >
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-neon/15 text-neon">
                    <Icon aria-hidden className="size-4" />
                  </span>
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
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item, i) => (
        <li key={item.en} className="flex gap-4 rounded-2xl border border-white/10 bg-petrol-850/60 p-5">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-neon font-display text-sm font-bold text-petrol-950">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="self-center font-medium leading-snug">{tx(item, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

export function ValueCreationList({ locale }: { locale: Locale }) {
  return (
    <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-petrol-850/60">
      {valueCreation.map((v) => (
        <li key={v.en} className="flex items-center gap-4 px-6 py-5">
          <Check aria-hidden className="size-5 shrink-0 text-neon" />
          <span className="font-medium">{tx(v, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

export function PortfolioCard({ company, locale, detailed = false }: { company: Company; locale: Locale; detailed?: boolean }) {
  const c = copy[locale].common;
  return (
    <article
      id={company.slug}
      className="flex scroll-mt-28 flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-petrol-800/80 to-petrol-850/80 p-7 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 shrink-0 items-center rounded-2xl bg-white/5 px-4">
          <Image src={company.logo} alt={company.name} width={company.logoWidth} height={company.logoHeight} className="h-9 w-auto" />
        </div>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-neon hover:text-neon"
        >
          <Globe aria-hidden className="size-3.5" />
          {company.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold">{company.name}</h3>
      <p className="mt-1 text-sm font-medium text-neon">{tx(company.sector, locale)}</p>
      <p className="mt-4 leading-relaxed text-mist/85">{tx(company.description, locale)}</p>
      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
        {company.highlights.map((h) => (
          <div key={h.label.en}>
            <dt className="sr-only">{tx(h.label, locale)}</dt>
            <dd className="whitespace-nowrap font-display text-xl font-semibold text-white">{tx(h.value, locale)}</dd>
            <dd className="mt-1 text-xs leading-snug text-mist/70">{tx(h.label, locale)}</dd>
          </div>
        ))}
      </dl>
      {detailed && (
        <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{c.founders}</h4>
            <ul className="mt-3 space-y-2">
              {company.founders.map((f) => (
                <li key={f.name}>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm hover:text-neon"
                  >
                    <LinkedInIcon className="size-4 text-neon" />
                    <span>
                      {f.name} <span className="text-white/60">· {tx(f.role, locale)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{c.headquarters}</h4>
            <p className="mt-3 text-sm">{tx(company.hq, locale)}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export function PartnerGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {partners.map((p) => (
        <article key={p.name} className="flex flex-col rounded-3xl border border-white/10 bg-petrol-850/60 p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{tx(p.role, locale)}</p>
          <div className="mt-6 flex h-14 items-center">
            <Image src={p.logo} alt={p.name} width={p.logoWidth} height={p.logoHeight} className="h-11 w-auto" />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-mist/80">{tx(p.description, locale)}</p>
        </article>
      ))}
    </div>
  );
}

export function StrengthGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {strengths.map((s) => (
        <div key={s.title.en} className="bg-petrol-900 p-7">
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-neon/40 text-neon">
            <Check aria-hidden className="size-5" />
          </span>
          <h3 className="mt-5 font-display text-lg font-semibold">{tx(s.title, locale)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/80">{tx(s.text, locale)}</p>
        </div>
      ))}
    </div>
  );
}

export function ImpactTargets({ locale }: { locale: Locale }) {
  const target = copy[locale].common.target;
  const pct = (v: number) => (locale === "tr" ? `%${v}` : `${v}%`);
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <ul className="space-y-6">
        {impactTargets.map((t) => (
          <li key={t.label.en}>
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-sm font-medium sm:text-base">{tx(t.label, locale)}</span>
              <span className="shrink-0 font-display text-lg font-semibold text-neon">
                <span className="sr-only">{target}: </span>
                {pct(t.value)}
              </span>
            </div>
            <div aria-hidden className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-600 to-neon"
                style={{ width: `${Math.min(100, t.value * 3)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-5 self-start">
        {impactHighlights.map((h) => (
          <div key={h.label.en} className="rounded-3xl bg-neon p-8 text-petrol-950">
            <p className="font-display text-5xl font-bold">{tx(h.value, locale)}</p>
            <p className="mt-3 font-medium leading-snug">{tx(h.label, locale)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SdgGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {sdgs.map((s) => (
        <li key={s.number} className="relative overflow-hidden rounded-2xl border border-white/10 bg-petrol-850/70 p-5">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: s.color }} />
          <div className="flex items-start justify-between gap-2">
            <span className="font-display text-xs font-semibold tracking-widest text-white/60">
              {locale === "tr" ? "SKA" : "SDG"} {s.number}
            </span>
            <Image src={`/sdg/sdg-${s.number}.png`} alt="" width={40} height={40} className="h-8 w-auto opacity-90" />
          </div>
          <p className="mt-6 font-medium leading-snug">{tx(s.name, locale)}</p>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ locale, items = faq }: { locale: Locale; items?: typeof faq }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.q.en} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-medium marker:hidden hover:text-neon [&::-webkit-details-marker]:hidden">
            {tx(item.q, locale)}
            <ChevronDown aria-hidden className="size-5 shrink-0 text-neon transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-5 pr-10 leading-relaxed text-mist/85">{tx(item.a, locale)}</p>
        </details>
      ))}
    </div>
  );
}

export function TeamGrid({ members, locale }: { members: Member[]; locale: Locale }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((m) => (
        <li key={m.name}>
          <div className="group relative aspect-square overflow-hidden rounded-3xl bg-black">
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
              className="object-cover grayscale transition duration-500 group-hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-petrol-950/60 via-transparent" />
          </div>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
              {m.organization && <p className="mt-1 text-sm font-medium text-neon">{m.organization}</p>}
              <p className="mt-0.5 text-sm text-mist/75">{tx(m.title, locale)}</p>
            </div>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} LinkedIn`}
                className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/80 hover:border-neon hover:text-neon"
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

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const href = `/${locale}/${post.type}/${post.slug}`;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-petrol-850/60 transition-colors hover:border-neon/40">
      {post.image && (
        <div className="relative aspect-[2/1] overflow-hidden bg-petrol-800">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={post.date} className="text-xs font-medium uppercase tracking-wider text-neon/80">
          {formatDate(post.date, locale)}
        </time>
        <h3 className="mt-3 line-clamp-3 font-display text-lg font-semibold leading-snug">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist/75">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-neon">
          {copy[locale].common.readMore}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="relative overflow-hidden bg-petrol-800">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(44_255_152/0.18),transparent_65%)]" />
      <CircuitField className="absolute inset-x-0 bottom-0 h-40 w-full opacity-50" />
      <div className="container-site relative py-24 text-center sm:py-32">
        <Eyebrow className="justify-center">{c.nav.contact}</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl">{c.cta.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-mist/90">{c.cta.lead}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
          <ButtonLink href={contact.investorFormUrl} variant="outline">
            {c.common.applyInvestor}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
