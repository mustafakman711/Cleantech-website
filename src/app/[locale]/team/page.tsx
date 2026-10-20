import type { Metadata } from "next";
import { CtaBand, TeamGrid } from "@/components/sections";
import { Eyebrow, PageHero } from "@/components/ui";
import { copy } from "@/content/copy";
import { committee, management } from "@/content/team";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].teamPage;
  return pageMetadata({ locale, path: "/team", title: c.title, description: c.lead });
}

export default async function TeamPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];

  return (
    <>
      <PageHero eyebrow={c.meta.siteName} title={c.teamPage.title} lead={c.teamPage.lead} />
      <section className="py-20 sm:py-24">
        <div className="container-site">
          <Eyebrow>01</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.teamPage.management}</h2>
          <div className="mt-12">
            <TeamGrid members={management} locale={locale} />
          </div>
        </div>
      </section>
      <section className="bg-petrol-850 py-20 sm:py-24">
        <div className="container-site">
          <Eyebrow>02</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{c.teamPage.committee}</h2>
          <div className="mt-12">
            <TeamGrid members={committee} locale={locale} />
          </div>
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
