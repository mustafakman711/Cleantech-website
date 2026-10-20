import type { Metadata } from "next";
import { BrainCircuit, Globe, Leaf } from "lucide-react";
import { CircuitTree } from "@/components/CircuitTree";
import {
  CtaBand,
  Faq,
  PartnerGrid,
  PortfolioCard,
  PostCard,
  SectorClusters,
  ValueCreationList,
} from "@/components/sections";
import { ButtonLink, Eyebrow, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact, principles } from "@/content/fund";
import { portfolio } from "@/content/portfolio";
import { tx, type Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, path: "" });
}

const pillarIcons = [Leaf, BrainCircuit, Globe];

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const h = c.home;
  const news = getPosts(locale, "news").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-petrol-800">
        <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
        <div aria-hidden className="absolute -right-40 top-20 size-[42rem] rounded-full bg-neon/10 blur-3xl" />
        <div className="container-site relative grid items-center gap-8 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.1fr_1fr] lg:pb-20">
          <div className="animate-rise">
            <Eyebrow>{h.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl xl:text-7xl">
              {h.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist/90 sm:text-xl">{h.hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/founders`}>{c.common.applyStartup}</ButtonLink>
              <ButtonLink href={`/${locale}/investors`} variant="outline">
                {c.nav.investors}
              </ButtonLink>
            </div>
          </div>
          <CircuitTree className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
        <div className="relative border-t border-white/10 bg-petrol-900/40">
          <dl className="container-site grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
            {h.facts.map((f) => (
              <div key={f.label} className="py-8 lg:px-8 lg:first:pl-0">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-3xl font-semibold text-neon sm:text-4xl">{f.value}</dd>
                <dd className="mt-2 max-w-[16rem] text-sm leading-snug text-mist/80">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Thesis */}
      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={h.thesis.eyebrow} title={h.thesis.title} lead={h.thesis.lead} />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {h.thesis.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <article key={p.title} className="rounded-3xl border border-white/10 bg-petrol-850/60 p-8">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon/15 text-neon">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist/80">{p.text}</p>
                </article>
              );
            })}
          </div>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-neon/30 bg-neon/20 md:grid-cols-3">
            {[
              [h.thesis.stageLabel, h.thesis.stage],
              [h.thesis.ticketLabel, h.thesis.ticket],
              [h.thesis.focusLabel, h.thesis.focus],
            ].map(([label, value]) => (
              <div key={label} className="bg-petrol-900 p-7">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{label}</dt>
                <dd className="mt-3 font-display text-lg font-medium leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-petrol-800 py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader eyebrow={h.sectors.eyebrow} title={h.sectors.title} lead={h.sectors.lead} />
            <ButtonLink href={`/${locale}/founders`} variant="outline" className="shrink-0 self-start lg:self-auto">
              {c.common.learnMore}
            </ButtonLink>
          </div>
          <div className="mt-14">
            <SectorClusters locale={locale} />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader eyebrow={h.portfolio.eyebrow} title={h.portfolio.title} lead={h.portfolio.lead} />
            <ButtonLink href={`/${locale}/portfolio`} variant="outline" className="shrink-0 self-start lg:self-auto">
              {c.common.viewPortfolio}
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {portfolio.map((company) => (
              <PortfolioCard key={company.slug} company={company} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Value creation */}
      <section className="bg-petrol-850 py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow={h.value.eyebrow} title={h.value.title} lead={h.value.lead} />
            <ul className="mt-10 space-y-6">
              {principles.map((p, i) => (
                <li key={p.title.en} className="flex gap-5">
                  <span className="font-display text-sm font-semibold text-neon">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{tx(p.title, locale)}</h3>
                    <p className="mt-1 text-mist/80">{tx(p.text, locale)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-center">
            <ValueCreationList locale={locale} />
          </div>
        </div>
      </section>

      {/* Fund structure */}
      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={h.structure.eyebrow} title={h.structure.title} lead={h.structure.lead} />
          <div className="mt-14">
            <PartnerGrid locale={locale} />
          </div>
        </div>
      </section>

      {/* Investors teaser */}
      <section className="pb-24 sm:pb-32">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[2rem] border border-neon/30 bg-gradient-to-br from-petrol-700 via-petrol-800 to-petrol-900 p-8 sm:p-14">
            <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-neon/20 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <SectionHeader eyebrow={h.investors.eyebrow} title={h.investors.title} lead={h.investors.lead} />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`/${locale}/investors`}>{h.investors.cta}</ButtonLink>
                  <ButtonLink href={contact.investorFormUrl} variant="outline">
                    {c.common.applyInvestor}
                  </ButtonLink>
                </div>
              </div>
              <dl className="grid gap-4">
                {h.investors.points.map((p) => (
                  <div key={p.label} className="flex items-center gap-6 rounded-2xl border border-white/10 bg-petrol-950/40 p-5">
                    <dt className="sr-only">{p.label}</dt>
                    <dd className="w-28 shrink-0 font-display text-3xl font-bold text-neon">{p.value}</dd>
                    <dd className="text-sm leading-snug text-mist/90">{p.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      {news.length > 0 && (
        <section className="bg-petrol-800 py-24 sm:py-32">
          <div className="container-site">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <SectionHeader eyebrow={h.news.eyebrow} title={h.news.title} />
              <ButtonLink href={`/${locale}/news`} variant="outline" className="shrink-0 self-start sm:self-auto">
                {c.common.allNews}
              </ButtonLink>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {news.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={h.faq.eyebrow} title={h.faq.title} lead={h.faq.lead} />
            <ButtonLink href={`/${locale}/contact`} variant="outline" className="mt-8">
              {c.common.contactUs}
            </ButtonLink>
          </div>
          <Faq locale={locale} />
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
