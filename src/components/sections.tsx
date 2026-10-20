/**
 * Content sections shared across pages: ValueCreationList, PartnerGrid, Faq, CtaBand.
 */
import Image from "next/image";
import { Plus } from "lucide-react";
import { copy } from "@/content/copy";
import { contact, faq, partners, valueCreation } from "@/content/fund";
import { tx, type Locale } from "@/lib/i18n";
import { ButtonLink, ChapterLabel, HairlineList, withAccent } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function ValueCreationList({ locale, tone = "dark", className = "" }: { locale: Locale; tone?: "dark" | "light"; className?: string }) {
  return <HairlineList tone={tone} className={className} items={valueCreation.map((v) => ({ key: v.en, title: tx(v, locale) }))} />;
}

/** Optical logo sizing: every partner logo gets the same visual AREA (not the same height), QA #16. */
const LOGO_AREA = 4600;

/**
 * Fund partners as a hairline ledger: stacked < md, one row per partner (role | logo | text) from md, three
 * columns from xl. A volt node marks each partner on the top "bus" line. Logos are cropped SVGs sized by area.
 */
export function PartnerGrid({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const light = tone === "light";
  const line = light ? "border-line-ink" : "border-line";
  return (
    <ol className={`grid border-t xl:grid-cols-3 ${line}`}>
      {partners.map((p, i) => {
        const aspect = p.logoWidth / p.logoHeight;
        const h = Math.round(Math.sqrt(LOGO_AREA / aspect));
        return (
          <li
            key={p.name}
            className={`relative grid gap-y-6 border-b py-8 md:grid-cols-12 md:items-center md:gap-x-6 md:py-10 xl:flex xl:flex-col xl:items-stretch xl:gap-y-0 xl:border-b-0 xl:px-8 xl:py-10 xl:first:pl-0 xl:last:pr-0 ${line} ${
              i > 0 ? (light ? "xl:border-l xl:border-line-ink" : "xl:border-l xl:border-line") : ""
            }`}
          >
            <span
              aria-hidden
              className={`absolute -top-[3.5px] size-1.5 rounded-full ${i > 0 ? "left-0 xl:-left-[3.5px]" : "left-0"} ${
                light ? "bg-volt-ink" : "bg-volt shadow-[0_0_8px_rgb(44_255_152/0.8)]"
              }`}
            />
            <p className={`type-label md:col-span-3 ${light ? "text-bone-ink" : "text-slate"}`}>
              <span className={light ? "text-abyss-900" : "text-fog"}>{pad(i + 1)}</span> — {tx(p.role, locale)}
            </p>
            <div className="flex h-12 items-center md:col-span-3 xl:mt-10">
              <Image
                src={p.logo}
                alt={p.name}
                width={p.logoWidth}
                height={p.logoHeight}
                style={{ height: h, width: Math.round(h * aspect) }}
                className={`max-w-full object-contain object-left ${light ? "invert" : ""}`}
              />
            </div>
            <p className={`text-[0.9375rem] leading-relaxed md:col-span-6 xl:mt-10 ${light ? "text-bone-ink" : "text-fog"}`}>{tx(p.description, locale)}</p>
          </li>
        );
      })}
    </ol>
  );
}

/** FAQ accordion: hairline rows, +/× icon, native <details>. */
export function Faq({ locale, items = faq, tone = "dark" }: { locale: Locale; items?: typeof faq; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div className={`border-t ${light ? "border-line-ink" : "border-line"}`}>
      {items.map((item, i) => (
        <details key={item.q.en} className={`disclosure group border-b ${light ? "border-line-ink" : "border-line"}`}>
          <summary
            className={`grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-6 text-lg leading-snug transition-colors md:text-xl ${
              light ? "text-abyss-900 hover:text-volt-ink" : "text-mist hover:text-volt"
            }`}
          >
            <span className={`type-label pt-1.5 ${light ? "text-bone-ink" : "text-slate"}`}>{pad(i + 1)}</span>
            <span className="font-[450] tracking-[-0.01em]">{tx(item.q, locale)}</span>
            <span
              aria-hidden
              className={`mt-0.5 grid size-7 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 group-open:rotate-45 ${
                light ? "border-line-ink" : "border-line-strong group-open:border-volt group-open:bg-volt group-open:text-abyss-950"
              }`}
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
            </span>
          </summary>
          <p className={`max-w-[62ch] pb-7 pl-[3.25rem] pr-10 leading-relaxed ${light ? "text-bone-ink" : "text-fog"}`}>{tx(item.a, locale)}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Closing "apply" band for inner pages: two application panels (founders / investors) in a hairline split.
 * (The footer finale carries the general contact CTA, so this band stays specific.)
 */
export function CtaBand({ locale, index }: { locale: Locale; index?: string }) {
  const c = copy[locale];
  const p = c.contactPage;
  const panels = [
    { title: p.startupTitle, text: p.startupText, href: contact.startupFormUrl, label: c.common.applyStartup, primary: true },
    { title: p.investorTitle, text: p.investorText, href: contact.investorFormUrl, label: c.common.applyInvestor, primary: false },
  ];
  return (
    <section className="section-y relative border-t border-line bg-abyss-900">
      <div className="container-site">
        <ChapterLabel index={index} label={c.footer.apply} />
        <h2 className="type-h2 mt-8 max-w-[20ch] text-mist">{withAccent(c.cta.title, c.cta.accent)}</h2>
        <div className="mt-14 grid border-t border-line md:grid-cols-2">
          {panels.map((panel, i) => (
            <div key={panel.title} className={`flex flex-col py-10 md:px-10 ${i === 0 ? "md:border-r md:border-line md:pl-0" : "border-t border-line md:border-t-0 md:pr-0"}`}>
              <p className="type-label text-slate">[ {pad(i + 1)} ]</p>
              <h3 className="type-h3 mt-4 text-mist">{panel.title}</h3>
              <p className="mt-3 max-w-[44ch] text-fog">{panel.text}</p>
              <div className="mt-8">
                <ButtonLink href={panel.href} variant={panel.primary ? "primary" : "bracket"}>
                  {panel.label}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
