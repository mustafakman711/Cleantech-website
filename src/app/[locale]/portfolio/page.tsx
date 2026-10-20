import type { Metadata } from "next";
import { OpenOnHash } from "@/components/portfolio/OpenOnHash";
import { OrbitMap } from "@/components/portfolio/OrbitMap";
import { PortfolioIndex } from "@/components/PortfolioIndex";
import { CtaBand } from "@/components/sections";
import { PageHero, SectionHeader } from "@/components/ui";
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
  const p = c.portfolioPage;

  return (
    <>
      <PageHero eyebrow={p.title} title={p.heroTitle} accent={p.heroAccent} lead={p.lead} />

      {/* ─────────────── 01 — Orbit (signature) ─────────────── */}
      <section aria-labelledby="orbit-title" className="section-y relative overflow-hidden bg-abyss-900">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(55%_60%_at_66%_62%,black,transparent)]" />
        <div className="container-site relative">
          <SectionHeader id="orbit-title" index="01" label={p.orbit.label} title={p.orbit.title} accent={p.orbit.accent} lead={p.orbit.lead} />
          <div className="mt-16 lg:mt-24">
            <OrbitMap companies={portfolio} locale={locale} labels={p.orbit} />
          </div>
        </div>
      </section>

      {/* ─────────────── 02 — Full index ─────────────── */}
      <section aria-labelledby="index-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="index-title" index="02" label={p.index.label} title={p.index.title} accent={p.index.accent} />
          <div className="mt-16 lg:mt-24">
            <PortfolioIndex companies={portfolio} locale={locale} openSlugs={[portfolio[0]?.slug ?? ""]} />
          </div>
        </div>
        <OpenOnHash />
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
