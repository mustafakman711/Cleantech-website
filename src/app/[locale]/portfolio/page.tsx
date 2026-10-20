import type { Metadata } from "next";
import { CtaBand, PortfolioCard } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { copy } from "@/content/copy";
import { portfolio } from "@/content/portfolio";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].portfolioPage;
  return pageMetadata({ locale, path: "/portfolio", title: c.title, description: c.lead });
}

export default async function PortfolioPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];

  return (
    <>
      <PageHero eyebrow={c.home.portfolio.title} title={c.portfolioPage.title} lead={c.portfolioPage.lead} />
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {portfolio.map((company) => (
            <PortfolioCard key={company.slug} company={company} locale={locale} detailed />
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
