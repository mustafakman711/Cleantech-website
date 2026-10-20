import type { Metadata } from "next";
import { CheckList, CtaBand, SectorClusters, ValueCreationList } from "@/components/sections";
import { ButtonLink, PageHero, SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact, criteria } from "@/content/fund";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  return pageMetadata({ locale, path: "/founders", title: c.nav.founders, description: c.founders.lead });
}

export default async function FoundersPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const f = c.founders;
  const t = c.home.thesis;

  return (
    <>
      <PageHero eyebrow={c.nav.founders} title={f.title} lead={f.lead}>
        <div className="mt-10">
          <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
        </div>
      </PageHero>

      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={f.look.eyebrow} title={f.look.title} lead={f.look.lead} />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-neon/30 bg-neon/20 md:grid-cols-3">
            {[
              [t.stageLabel, t.stage],
              [t.ticketLabel, t.ticket],
              [t.focusLabel, t.focus],
            ].map(([label, value]) => (
              <div key={label} className="bg-petrol-900 p-7">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{label}</dt>
                <dd className="mt-3 font-display text-lg font-medium leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <CheckList items={criteria} locale={locale} columns={3} />
          </div>
        </div>
      </section>

      <section className="bg-petrol-800 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={c.home.sectors.eyebrow} title={c.home.sectors.title} lead={c.home.sectors.lead} />
          <div className="mt-14">
            <SectorClusters locale={locale} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader eyebrow={f.process.eyebrow} title={f.process.title} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {f.process.steps.map((step, i) => (
              <li key={step.title} className="relative rounded-3xl border border-white/10 bg-petrol-850/60 p-7">
                <span className="font-display text-5xl font-bold text-neon/25">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-petrol-850 py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow={f.support.eyebrow} title={f.support.title} lead={c.home.value.lead} />
            <ButtonLink href={contact.startupFormUrl} className="mt-10">
              {c.common.applyStartup}
            </ButtonLink>
          </div>
          <div className="self-center">
            <ValueCreationList locale={locale} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
