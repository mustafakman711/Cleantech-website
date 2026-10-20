import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CircuitTree } from "@/components/CircuitTree";
import { FocusAreas } from "@/components/home/FocusAreas";
import { Manifesto } from "@/components/home/Manifesto";
import { StatsLedger } from "@/components/home/StatsLedger";
import { PortfolioIndex } from "@/components/PortfolioIndex";
import { Faq, PartnerGrid } from "@/components/sections";
import { ButtonLink, ChapterLabel, CornerTicks, Eyebrow, HairlineList, rich, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact, principles, valueCreation } from "@/content/fund";
import { portfolio } from "@/content/portfolio";
import { formatDate, tx, type Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, path: "" });
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const h = c.home;
  const [featured, ...moreNews] = getPosts(locale, "news");

  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative isolate overflow-hidden bg-abyss-900">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_65%_at_78%_78%,rgb(0_76_84/0.75),transparent_70%)]" />
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(60%_60%_at_78%_60%,black,transparent)]" />

        <CircuitTree
          id="ct-lg"
          className="pointer-events-none absolute -right-12 top-[calc(var(--header-h)+1.5rem)] -z-10 hidden h-[30rem] w-auto md:block lg:h-[34rem] xl:right-[calc(var(--gutter)-2rem)] xl:top-[calc(var(--header-h)+1rem)] xl:h-[calc(100%-var(--header-h)-11rem)] xl:max-h-[54rem]"
        />

        <div className="container-site flex flex-col pt-[calc(var(--header-h)+2rem)] xl:min-h-[max(100svh,46rem)] xl:pt-[calc(var(--header-h)+3rem)]">
          <Eyebrow className="fade-in-late">{h.hero.eyebrow}</Eyebrow>

          <CircuitTree id="ct-sm" className="pointer-events-none -mb-6 mt-0 h-[clamp(13rem,52vw,26rem)] w-auto self-center sm:self-end md:hidden" />

          <h1 className="type-display mt-6 text-mist md:mt-20 xl:mt-auto xl:max-w-[11ch] xl:pt-[0.2em]">
            <span className="sr-only">{h.hero.title}</span>
            <span aria-hidden>
              {h.hero.titleLines.map((line, i) => (
                <span key={line} className="line-mask">
                  <span className="line-inner" style={{ ["--i" as string]: i }}>
                    {rich(line)}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end lg:mt-12">
            <p className="type-lead fade-in-late max-w-[46ch] text-fog md:col-span-7 lg:col-span-5" style={{ ["--i" as string]: 2 }}>
              {h.hero.lead}
            </p>
            <div className="fade-in-late flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-7" style={{ ["--i" as string]: 3 }}>
              <ButtonLink href={`/${locale}/founders`}>{c.common.applyStartup}</ButtonLink>
              <ButtonLink href={`/${locale}/investors`} variant="bracket">
                {c.nav.investors}
              </ButtonLink>
            </div>
          </div>

          {/* mono data strip */}
          <div className="mt-14 border-t border-line lg:mt-12">
            <p className="sr-only">{h.hero.stripLabel}</p>
            <ul className="grid grid-cols-2 md:grid-cols-5 xl:flex">
              {h.hero.strip.map((item, i) => (
                <li
                  key={item}
                  className={`type-label flex items-center gap-2.5 border-b border-line py-4 text-fog md:col-span-1 md:border-b-0 md:border-l md:px-4 md:py-5 md:first:border-l-0 md:first:pl-0 xl:px-6 ${
                    i === 0 ? "col-span-2 text-mist" : i % 2 === 0 ? "border-l pl-4" : ""
                  }`}
                >
                  {i === 0 && <span aria-hidden className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)] motion-safe:animate-pulse-node" />}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────── 01 — Thesis / manifesto ─────────────── */}
      <section aria-labelledby="thesis-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-3 lg:pt-3">
              <ChapterLabel index="01" label={h.manifesto.label} />
              <h2 id="thesis-title" className="sr-only">
                {h.manifesto.title}
              </h2>
            </div>
            <div className="lg:col-span-9">
              <Manifesto
                text={h.manifesto.text}
                locale={locale}
                className="max-w-[30ch] text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] font-[400] leading-[1.14] tracking-[-0.025em] [font-stretch:104%] md:max-w-[34ch]"
              />
            </div>
          </div>

          <ol className="mt-20 grid border-t border-line md:grid-cols-3 lg:mt-28 lg:ml-[calc((100%+1.5rem)*3/12)]">
            {h.thesis.pillars.map((p, i) => (
              <li key={p.title} data-reveal className={`py-8 md:px-6 md:first:pl-0 md:last:pr-0 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                <p className="type-label text-slate">[ {String(i + 1).padStart(2, "0")} ]</p>
                <h3 className="type-h3 mt-5 text-mist">{p.title}</h3>
                <p className="mt-3 text-fog">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── 02 — Focus areas (signature) ─────────────── */}
      <section aria-labelledby="focus-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="focus-title" index="02" label={h.sectors.label} title={h.sectors.title} accent={h.sectors.accent} lead={h.sectors.lead} />
          <div className="mt-16 lg:mt-24">
            <FocusAreas locale={locale} areasLabel={h.sectors.areas} skipLabel={c.common.skip} skipHref="#portfolio" themesLabel={h.sectors.themes} />
          </div>
        </div>
      </section>

      {/* ─────────────── Stats ledger (light band) ─────────────── */}
      <StatsLedger stats={h.stats} locale={locale} />

      {/* ─────────────── 03 — Portfolio index ─────────────── */}
      <section id="portfolio" aria-labelledby="portfolio-title" className="section-y relative scroll-mt-16 bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="portfolio-title" index="03" label={h.portfolio.eyebrow} title={h.portfolio.title} accent={h.portfolio.accent} lead={h.portfolio.lead}>
            <ButtonLink href={`/${locale}/portfolio`} variant="text">
              {c.common.viewPortfolio}
            </ButtonLink>
          </SectionHeader>
          <div className="mt-16 lg:mt-24">
            <PortfolioIndex companies={portfolio} locale={locale} />
          </div>
        </div>
      </section>

      {/* ─────────────── 04 — Value creation ─────────────── */}
      <section aria-labelledby="value-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="value-title" index="04" label={h.value.label} title={h.value.title} accent={h.value.accent} lead={h.value.lead} />
          <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-4 lg:col-start-4">
              <p className="type-label text-slate">{h.value.principles}</p>
              <ul className="mt-6">
                {principles.map((p) => (
                  <li key={p.title.en} className="border-t border-line py-6" data-reveal>
                    <h3 className="text-xl font-medium leading-snug tracking-[-0.01em] text-mist">{tx(p.title, locale)}</h3>
                    <p className="mt-2 text-fog">{tx(p.text, locale)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="type-label text-slate">{h.value.support}</p>
              <HairlineList className="mt-6" size="md" items={valueCreation.map((v) => ({ key: v.en, title: tx(v, locale) }))} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 05 — Fund structure ─────────────── */}
      <section aria-labelledby="structure-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="structure-title" index="05" label={h.structure.label} title={h.structure.title} accent={h.structure.accent} lead={h.structure.lead} />
          <div className="mt-16 lg:mt-20">
            <PartnerGrid locale={locale} />
          </div>
        </div>
      </section>

      {/* ─────────────── Investors teaser (petrol band) ─────────────── */}
      <section aria-labelledby="investors-title" className="section-y relative overflow-hidden bg-petrol-800">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <SectionHeader id="investors-title" layout="stacked" label={h.investors.eyebrow} title={h.investors.title} accent={h.investors.accent} lead={h.investors.lead}>
              <ButtonLink href={`/${locale}/investors`}>{h.investors.cta}</ButtonLink>
              <ButtonLink href={contact.investorFormUrl} variant="bracket">
                {c.common.applyInvestor}
              </ButtonLink>
            </SectionHeader>
          </div>
          <div className="relative self-end lg:col-span-5 lg:col-start-8">
            <CornerTicks />
            <dl className="border border-line-strong bg-abyss-950/30 backdrop-blur-sm">
              {h.investors.points.map((p, i) => (
                <div key={p.label} className={`grid gap-2 p-6 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6 md:p-8 ${i > 0 ? "border-t border-line-strong" : ""}`}>
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="text-[2.5rem] font-[350] leading-none tracking-[-0.04em] text-mist [font-stretch:120%]">{p.value}</dd>
                  <dd className="text-[0.9375rem] leading-snug text-fog">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─────────────── 06 — News ─────────────── */}
      {featured && (
        <section aria-labelledby="news-title" className="section-y relative bg-abyss-900">
          <div className="container-site">
            <SectionHeader id="news-title" index="06" label={h.news.eyebrow} title={h.news.title} accent={h.news.accent}>
              <ButtonLink href={`/${locale}/news`} variant="text">
                {c.common.allNews}
              </ButtonLink>
            </SectionHeader>

            <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-6">
              <article className="group relative lg:col-span-6 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-volt">
                {featured.image && (
                  <div className="relative aspect-video overflow-hidden bg-abyss-850">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover saturate-[0.85] transition duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
                    />
                    <CornerTicks />
                  </div>
                )}
                <div className="mt-6 flex items-center gap-3">
                  <span className="type-label text-volt">● {h.news.featured}</span>
                  <time dateTime={featured.date} className="type-label text-slate">
                    {formatDate(featured.date, locale)}
                  </time>
                </div>
                <h3 className="type-h3 mt-4 max-w-[30ch] text-mist transition-colors group-hover:text-volt">
                  <Link href={`/${locale}/news/${featured.slug}`} className="outline-none after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h3>
              </article>

              <ul className="self-start border-b border-line lg:col-span-6">
                {moreNews.slice(0, 3).map((post) => (
                  <li key={post.slug} className="group relative border-t border-line has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-volt">
                    <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 py-7 transition-colors group-hover:bg-volt/[0.04] md:grid-cols-[9rem_1fr_auto]">
                      <time dateTime={post.date} className="type-label col-span-2 pt-1 text-slate md:col-span-1">
                        {formatDate(post.date, locale)}
                      </time>
                      <h3 className="text-lg font-medium leading-snug text-mist transition-colors group-hover:text-volt md:text-xl">
                        <Link href={`/${locale}/news/${post.slug}`} className="outline-none after:absolute after:inset-0">
                          {post.title}
                        </Link>
                      </h3>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-5 text-fog transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt"
                        strokeWidth={1.5}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── FAQ ─────────────── */}
      <section aria-labelledby="faq-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <SectionHeader id="faq-title" layout="stacked" index="07" label={h.faq.eyebrow} title={h.faq.title} accent={h.faq.accent} lead={h.faq.lead}>
                <ButtonLink href={`/${locale}/contact`} variant="bracket">
                  {c.common.contactUs}
                </ButtonLink>
              </SectionHeader>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
