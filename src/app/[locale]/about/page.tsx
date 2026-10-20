import type { Metadata } from "next";
import { FundProfile } from "@/components/about/FundProfile";
import { ImpactScale } from "@/components/about/ImpactScale";
import { SdgMatrix } from "@/components/about/SdgMatrix";
import { StrengthLedger } from "@/components/about/StrengthLedger";
import { CtaBand, PartnerGrid } from "@/components/sections";
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
  const [firstPara, ...restParas] = a.who.body;

  return (
    <>
      <PageHero eyebrow={a.title} title={a.heroTitle} accent={a.heroAccent} lead={a.lead} />

      {/* ─────────────── 01 — Who we are (asymmetric) ─────────────── */}
      <section aria-labelledby="who-title" className="section-y relative bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="who-title" index="01" label={a.who.label} title={a.who.title} accent={a.who.accent} />
          <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-5 lg:col-start-4">
              <p className="type-lead text-mist">{firstPara}</p>
              {restParas.map((p) => (
                <p key={p} className="mt-6 leading-relaxed text-fog">
                  {p}
                </p>
              ))}
              <p className="mt-6 leading-relaxed text-fog">{c.home.structure.lead}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-1.5" data-reveal>
              <FundProfile label={a.who.profileLabel} rows={a.who.profile} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 02 — Fund structure / partners ─────────────── */}
      <section aria-labelledby="structure-title" className="section-y relative border-t border-line bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="structure-title" index="02" label={a.structure.label} title={c.home.structure.title} accent={c.home.structure.accent} />
          <div className="mt-16 lg:mt-20">
            <PartnerGrid locale={locale} />
          </div>
        </div>
      </section>

      {/* ─────────────── 03 — Impact (signature, petrol flood) ─────────────── */}
      <section aria-labelledby="impact-title" className="section-y relative overflow-hidden bg-petrol-800">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
        <div className="container-site relative">
          <SectionHeader
            id="impact-title"
            index="03"
            label={a.impact.label}
            title={a.impact.title}
            accent={a.impact.accent}
            lead={a.impact.lead}
            className="[&_.text-slate]:text-fog"
          />
          <div className="mt-16 lg:mt-24">
            <ImpactScale
              locale={locale}
              labels={{
                targets: a.impact.targets,
                scale: a.impact.scale,
                social: a.impact.social,
                areaNote: a.impact.areaNote,
                dotNote: a.impact.dotNote,
                tableCaption: a.impact.tableCaption,
                target: c.common.target,
              }}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── 04 — SDGs ─────────────── */}
      <section aria-labelledby="sdg-title" className="section-y relative bg-abyss-900">
        <div className="container-site">
          <SectionHeader id="sdg-title" index="04" label={a.sdg.label} title={a.sdg.title} accent={a.sdg.accent} lead={a.sdg.lead} />
          <div className="mt-16 lg:mt-24">
            <SdgMatrix locale={locale} short={a.sdg.short} />
          </div>
        </div>
      </section>

      {/* ─────────────── 05 — Why us (light band) ─────────────── */}
      <section aria-labelledby="why-title" className="band-bone section-y relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(0_36_40/0.07)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
        <div className="container-site relative">
          <SectionHeader id="why-title" index="05" label={a.why.label} title={a.why.title} accent={a.why.accent} tone="light" />
          <div className="mt-16 lg:mt-24">
            <StrengthLedger locale={locale} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
