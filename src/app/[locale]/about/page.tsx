import type { Metadata } from "next";
import { CtaBand, ImpactTargets, PartnerGrid, SdgGrid, StrengthGrid } from "@/components/sections";
import { PageHero, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].about;
  return pageMetadata({ locale, path: "/about", title: c.title, description: c.lead });
}

export default async function AboutPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const a = c.about;

  return (
    <>
      <PageHero eyebrow={c.meta.siteName} title={a.title} lead={a.lead} />

      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader eyebrow={a.who.eyebrow} title={a.who.title} />
          <div className="space-y-6 text-lg leading-relaxed text-mist/90">
            {a.who.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{c.home.structure.lead}</p>
          </div>
        </div>
        <div className="container-site mt-16">
          <PartnerGrid locale={locale} />
        </div>
      </section>

      <section className="bg-petrol-850 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={a.impact.eyebrow} title={a.impact.title} lead={a.impact.lead} />
          <div className="mt-14">
            <ImpactTargets locale={locale} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={a.sdg.eyebrow} title={a.sdg.title} lead={a.sdg.lead} />
          <div className="mt-14">
            <SdgGrid locale={locale} />
          </div>
        </div>
      </section>

      <section className="bg-petrol-800 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={a.why.eyebrow} title={a.why.title} />
          <div className="mt-14">
            <StrengthGrid locale={locale} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
