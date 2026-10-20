import type { Metadata } from "next";
import { CtaBand } from "@/components/sections";
import { PortraitGrid } from "@/components/team/PortraitGrid";
import { TeamHero } from "@/components/team/TeamHero";
import { SectionHeader } from "@/components/ui";
import { copy } from "@/content/copy";
import { strengths } from "@/content/fund";
import { committee, management } from "@/content/team";
import { tx, type Locale } from "@/lib/i18n";
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
  const t = c.teamPage;
  const [teamStrength, committeeStrength] = strengths;

  return (
    <>
      <TeamHero
        eyebrow={t.title}
        title={t.heroTitle}
        accent={t.heroAccent}
        lead={t.lead}
        word={t.word}
        stats={[
          { label: t.managementLabel, value: management.length, href: "#management" },
          { label: t.committeeLabel, value: committee.length, href: "#committee" },
          { label: t.total, value: management.length + committee.length, href: "#management" },
        ]}
      />

      {/* ─────────────── 01 — Management ─────────────── */}
      <section id="management" aria-labelledby="management-title" className="section-y relative scroll-mt-16 bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="management-title" index="01" label={t.managementLabel} title={t.management} accent={t.managementAccent} lead={tx(teamStrength.text, locale)} />
          <div className="mt-16 lg:mt-24">
            <PortraitGrid
              members={management}
              locale={locale}
              columns="four"
              sizes="(min-width: 1600px) 360px, (min-width: 768px) 24vw, 50vw"
              fill={{ value: management.length, label: t.people, caption: t.managementLabel }}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── 02 — Investment committee ─────────────── */}
      <section id="committee" aria-labelledby="committee-title" className="section-y relative scroll-mt-16 border-t border-line bg-abyss-950">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <SectionHeader id="committee-title" index="02" layout="stacked" label={t.committeeLabel} title={t.committee} accent={t.committeeAccent} lead={tx(committeeStrength.text, locale)} />
            </div>
          </div>
          <div className="lg:col-span-8">
            <PortraitGrid members={committee} locale={locale} columns="three" start={management.length + 1} sizes="(min-width: 1600px) 340px, (min-width: 1024px) 22vw, (min-width: 768px) 32vw, 50vw" />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} index="03" />
    </>
  );
}
