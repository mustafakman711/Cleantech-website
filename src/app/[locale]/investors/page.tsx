import type { Metadata } from "next";
import { BadgePercent, CandlestickChart, FlaskConical, LayoutDashboard } from "lucide-react";
import { ApplyBand } from "@/components/contact/ApplyBand";
import { DataTerminal } from "@/components/investors/DataTerminal";
import { TaxTable } from "@/components/investors/TaxTables";
import { Faq } from "@/components/sections";
import { ButtonLink, ChapterLabel, PageHero, rich, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact, taxFootnote, taxTable } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].investors;
  return pageMetadata({ locale, path: "/investors", title: c.title, description: c.lead });
}

const cardIcons = [CandlestickChart, BadgePercent, FlaskConical, LayoutDashboard];
const pad = (n: number) => String(n).padStart(2, "0");

export default async function InvestorsPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const inv = c.investors;
  const term = inv.terminal;

  return (
    <>
      <PageHero eyebrow={inv.title} title={inv.heading} lead={inv.lead}>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={contact.investorFormUrl}>{c.common.applyInvestor}</ButtonLink>
          <ButtonLink href={contact.platformUrl} variant="bracket">
            {c.nav.platform}
          </ButtonLink>
        </div>
      </PageHero>

      {/* 01 — Fund data terminal */}
      <section aria-labelledby="data-title" className="section-y relative overflow-hidden bg-abyss-950">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_70%_at_75%_50%,black,transparent)]" />
        <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <ChapterLabel index="01" label={term.label} />
              <h2 id="data-title" className="type-h2 mt-8 text-mist">
                {rich(term.title)}
              </h2>
              <p className="type-lead mt-6 max-w-[34ch] text-fog">{term.lead}</p>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <DataTerminal
              title={term.panel}
              status={term.status}
              figures={c.home.investors.points}
              rows={term.rows}
              noPrice={term.noPrice}
              sourcesLabel={term.sources}
              bistLabel={term.bist}
              kapLabel={term.kap}
              kapFull={term.kapFull}
            />
          </div>
        </div>
      </section>

      {/* 02 — Why invest: 2x2 hairline grid */}
      <section aria-labelledby="why-title" className="section-y relative bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="why-title" index="02" label={inv.why.label} title={inv.why.title} accent={inv.why.accent} />
          <div className="mt-16 grid border-t border-line md:grid-cols-2 lg:mt-24 lg:ml-[calc((100%+1.5rem)*3/12)]">
            {inv.why.cards.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <article
                  key={card.title}
                  data-reveal
                  className={`group border-b border-line py-10 md:py-12 ${i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="type-label text-fog">[ {pad(i + 1)} ]</span>
                    <Icon aria-hidden className="size-6 text-volt transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.25} />
                  </div>
                  <h3 className="type-h3 mt-10 text-mist">{card.title}</h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-fog">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — Tax tables (petrol brand band) */}
      <section id="tax" aria-labelledby="tax-title" className="section-y relative scroll-mt-16 overflow-hidden bg-petrol-800">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
        <div className="container-site relative">
          <SectionHeader id="tax-title" index="03" label={inv.tax.label} title={inv.tax.title} accent={inv.tax.accent} lead={inv.tax.lead} />
          <div className="mt-16 grid gap-16 lg:mt-24 lg:ml-[calc((100%+1.5rem)*3/12)] lg:gap-20">
            <TaxTable code="A" title={inv.tax.individual} rows={taxTable.individual} locale={locale} labels={inv.tax} />
            <TaxTable code="B" title={inv.tax.corporate} rows={taxTable.corporate} locale={locale} labels={inv.tax} />
            <p className="max-w-[90ch] border-l border-line-strong pl-5 text-[0.8125rem] leading-relaxed text-fog">{tx(taxFootnote, locale)}</p>
          </div>
        </div>
      </section>

      {/* 04 — FAQ (sticky left) */}
      <section aria-labelledby="faq-title" className="section-y relative bg-abyss-900">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <SectionHeader id="faq-title" layout="stacked" index="04" label={inv.faq.eyebrow} title={inv.faq.title} accent={inv.faq.accent} lead={c.home.faq.lead}>
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

      <ApplyBand id="apply-title" tone="bone" index="05" label={inv.apply.label} title={inv.apply.title.replace(inv.apply.accent, `*${inv.apply.accent}*`)} text={inv.apply.text}>
        <ButtonLink href={contact.investorFormUrl}>{c.common.applyInvestor}</ButtonLink>
        <ButtonLink href={contact.platformUrl} variant="bracket">
          {c.nav.platform}
        </ButtonLink>
      </ApplyBand>
    </>
  );
}
