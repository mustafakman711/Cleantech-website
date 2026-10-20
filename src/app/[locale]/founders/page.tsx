import type { Metadata } from "next";
import { ApplyBand } from "@/components/contact/ApplyBand";
import { CircuitPath } from "@/components/founders/CircuitPath";
import { CriteriaRows, FocusCompact, TermSheet } from "@/components/founders/FoundersBlocks";
import { ValueCreationList } from "@/components/sections";
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
  const s = c.home.sectors;

  return (
    <>
      <PageHero eyebrow={c.nav.founders} title={f.title} accent={f.accent} lead={f.lead}>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
          <ButtonLink href="#process" variant="bracket" icon="none">
            {f.process.title}
            <span aria-hidden className="ml-2 text-volt">↓</span>
          </ButtonLink>
        </div>
        <TermSheet
          label={f.termSheet}
          items={[
            { label: t.stageLabel, value: t.stage },
            { label: t.ticketLabel, value: t.ticket },
            { label: t.focusLabel, value: t.focus },
          ]}
        />
      </PageHero>

      {/* 01 — Criteria */}
      <section aria-labelledby="criteria-title" className="section-y relative bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="criteria-title" index="01" label={f.look.label} title={f.look.title} accent={f.look.accent} lead={f.look.lead} />
          <div className="mt-16 lg:mt-24 lg:ml-[calc((100%+1.5rem)*3/12)]">
            <CriteriaRows items={criteria} locale={locale} />
          </div>
        </div>
      </section>

      {/* 02 — Focus areas (compact, petrol brand band) */}
      <section aria-labelledby="focus-title" className="section-y relative overflow-hidden bg-petrol-800">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
        <div className="container-site relative">
          <SectionHeader id="focus-title" index="02" label={f.focus.label} title={s.title} accent={s.accent} lead={s.lead} />
          <div className="mt-16 lg:mt-24">
            <FocusCompact locale={locale} areasLabel={s.areas} />
          </div>
        </div>
      </section>

      {/* 03 — Process: circuit path (signature) */}
      <section id="process" aria-labelledby="process-title" className="section-y relative scroll-mt-16 bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="process-title" index="03" label={f.process.eyebrow} title={f.process.title} accent={f.process.accent} lead={f.process.lead} />
          <div className="mt-16 lg:mt-28">
            <CircuitPath
              steps={f.process.steps}
              stepLabel={f.process.step}
              terminal={
                <a href="#value" className="type-label inline-flex min-h-10 items-center gap-2 text-fog transition-colors hover:text-volt lg:hidden lg:pr-6 xl:inline-flex">
                  {f.support.eyebrow} <span aria-hidden>→</span>
                </a>
              }
            />
          </div>
        </div>
      </section>

      {/* 04 — Value creation (light band) */}
      <section id="value" aria-labelledby="value-title" className="band-bone section-y relative scroll-mt-16">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <SectionHeader
                id="value-title"
                layout="stacked"
                tone="light"
                index="04"
                label={f.support.label}
                title={f.support.title}
                accent={f.support.accent}
                lead={c.home.value.lead}
              >
                <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
              </SectionHeader>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="type-label text-bone-ink">{f.support.list}</p>
            <ValueCreationList locale={locale} tone="light" className="mt-6 border-b border-line-ink" />
          </div>
        </div>
      </section>

      <ApplyBand id="apply-title" index="05" label={f.apply.label} title={f.apply.title} text={f.apply.text}>
        <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
        <ButtonLink href={`/${locale}/contact`} variant="bracket">
          {c.common.contactUs}
        </ButtonLink>
      </ApplyBand>
    </>
  );
}
