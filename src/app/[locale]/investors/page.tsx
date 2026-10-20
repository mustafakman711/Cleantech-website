import type { Metadata } from "next";
import { ArrowUpRight, BadgePercent, CandlestickChart, FlaskConical, LayoutDashboard } from "lucide-react";
import { Faq } from "@/components/sections";
import { ButtonLink, PageHero, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact, taxFootnote, taxTable, type TaxRow } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].investors;
  return pageMetadata({ locale, path: "/investors", title: c.title, description: c.lead });
}

const cardIcons = [CandlestickChart, BadgePercent, FlaskConical, LayoutDashboard];

function TaxTable({ title, rows, locale }: { title: string; rows: TaxRow[]; locale: Locale }) {
  const t = copy[locale].investors.tax;
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-petrol-850/60">
      <h3 className="border-b border-white/10 bg-neon px-6 py-4 font-display text-lg font-semibold text-petrol-950">{title}</h3>
      <dl className="divide-y divide-white/10 sm:hidden">
        {rows.map((row) => (
          <div key={row.label.en} className="space-y-2 px-5 py-4 text-sm">
            <dt className="font-semibold text-white">{tx(row.label, locale)}</dt>
            <dd className="text-mist/85">
              <span className="block text-xs uppercase tracking-wider text-white/50">{t.residents}</span>
              {tx(row.residents, locale)}
            </dd>
            <dd className="text-mist/85">
              <span className="block text-xs uppercase tracking-wider text-white/50">{t.nonResidents}</span>
              {tx(row.nonResidents, locale)}
            </dd>
          </div>
        ))}
      </dl>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/60">
              <th scope="col" className="px-6 py-4 font-semibold">
                {t.income}
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                {t.residents}
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                {t.nonResidents}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.label.en} className="align-top">
                <th scope="row" className="px-6 py-4 font-semibold text-white">
                  {tx(row.label, locale)}
                </th>
                <td className="px-6 py-4 leading-relaxed text-mist/85">{tx(row.residents, locale)}</td>
                <td className="px-6 py-4 leading-relaxed text-mist/85">{tx(row.nonResidents, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function InvestorsPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const inv = c.investors;

  return (
    <>
      <PageHero eyebrow={c.home.investors.title} title={inv.title} lead={inv.lead}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contact.investorFormUrl}>{c.common.applyInvestor}</ButtonLink>
          <ButtonLink href={contact.platformUrl} variant="outline">
            {c.nav.platform}
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={inv.why.eyebrow} title={inv.why.title} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {inv.why.cards.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <article key={card.title} className="rounded-3xl border border-white/10 bg-petrol-850/60 p-8">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon/15 text-neon">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist/80">{card.text}</p>
                </article>
              );
            })}
          </div>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-neon/30 bg-neon/20 sm:grid-cols-3">
            {c.home.investors.points.map((p) => (
              <div key={p.label} className="bg-petrol-900 p-7">
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-display text-4xl font-bold text-neon">{p.value}</dd>
                <dd className="mt-2 text-sm leading-snug text-mist/85">{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="tax" className="scroll-mt-24 bg-petrol-850 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={inv.tax.eyebrow} title={inv.tax.title} />
          <div className="mt-14 grid gap-5 xl:grid-cols-2">
            <TaxTable title={inv.tax.individual} rows={taxTable.individual} locale={locale} />
            <TaxTable title={inv.tax.corporate} rows={taxTable.corporate} locale={locale} />
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-white/55">{tx(taxFootnote, locale)}</p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeader eyebrow={inv.faq.eyebrow} title={inv.faq.title} />
          <Faq locale={locale} />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-neon p-8 text-petrol-950 sm:p-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold">{inv.apply.title}</h2>
              <p className="mt-2 text-lg">{inv.apply.text}</p>
            </div>
            <a
              href={contact.investorFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-petrol-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-petrol-800"
            >
              {c.common.applyInvestor}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
