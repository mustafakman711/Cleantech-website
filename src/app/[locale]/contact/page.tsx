import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/Footer";
import { LocalTime } from "@/components/LocalTime";
import { ButtonLink, ChapterLabel, CornerTicks, PageHero, rich } from "@/components/ui";
import { copy } from "@/content/copy";
import { contact } from "@/content/fund";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale].contactPage;
  return pageMetadata({ locale, path: "/contact", title: c.title, description: c.lead });
}

export default async function ContactPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];
  const p = c.contactPage;

  const applications = [
    { title: p.startupTitle, text: p.startupText, href: contact.startupFormUrl, label: c.common.applyStartup, primary: true },
    { title: p.investorTitle, text: p.investorText, href: contact.investorFormUrl, label: c.common.applyInvestor, primary: false },
  ];

  return (
    <>
      <PageHero eyebrow={p.title} title={p.heading} lead={p.lead} />

      {/* 01 — Write to us: oversized email + channels */}
      <section aria-labelledby="write-title" className="section-y relative bg-abyss-900">
        <div className="container-site grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-3 lg:pt-4">
            <ChapterLabel index="01" label={p.writeUs} />
            <h2 id="write-title" className="sr-only">
              {p.email}
            </h2>
          </div>
          <div className="@container min-w-0 lg:col-span-9">
            <p className="type-label text-slate">{p.general}</p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-4 block max-w-full text-[clamp(1.875rem,6.8cqi,6.5rem)] font-[380] leading-[1.02] tracking-[-0.04em] text-mist transition-colors duration-300 [font-stretch:104%] [overflow-wrap:anywhere] hover:text-volt"
            >
              <span className="underline decoration-volt/70 decoration-1 underline-offset-[0.14em] transition-[text-decoration-color] group-hover:decoration-volt">
                {contact.email.split("@")[0]}@<wbr />
                {contact.email.split("@")[1]}
              </span>
              <ArrowUpRight
                aria-hidden
                className="ml-[0.1em] inline-block size-[0.5em] -translate-y-[0.55em] text-volt transition-transform duration-500 group-hover:-translate-y-[0.7em] group-hover:translate-x-1"
                strokeWidth={1.25}
              />
            </a>

            <dl className="mt-16 grid grid-cols-1 border-t border-line md:grid-cols-2 xl:grid-cols-4">
              <div className="min-w-0 border-b border-line py-7 md:border-r md:pr-8 xl:border-b-0">
                <dt className="type-label text-slate">{p.manager}</dt>
                <dd className="mt-4">
                  <a
                    href={`mailto:${contact.secondaryEmail}`}
                    className="link-trace inline-flex min-h-11 items-center text-lg text-mist [overflow-wrap:anywhere] hover:text-volt"
                  >
                    {contact.secondaryEmail}
                  </a>
                </dd>
              </div>
              <div className="min-w-0 border-b border-line py-7 md:pl-8 xl:border-b-0 xl:border-r xl:pr-8">
                <dt className="type-label text-slate">{p.address}</dt>
                <dd className="mt-4">
                  <address className="not-italic leading-relaxed text-mist">{contact.address}</address>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-label mt-3 inline-flex min-h-10 items-center gap-1.5 text-fog transition-colors hover:text-volt"
                  >
                    {p.showOnMap}
                    <ArrowUpRight aria-hidden className="size-3.5 text-volt" />
                  </a>
                </dd>
              </div>
              <div className="min-w-0 border-b border-line py-7 md:border-b-0 md:border-r md:pr-8 xl:pl-8">
                <dt className="type-label text-slate">{c.footer.localTime}</dt>
                <dd className="mt-4 flex items-baseline gap-3">
                  <LocalTime locale={locale === "tr" ? "tr-TR" : "en-GB"} className="text-[2.5rem] font-[300] leading-none tracking-[-0.04em] text-mist [font-stretch:120%]" />
                  <span className="type-label text-slate">GMT+3</span>
                </dd>
              </div>
              <div className="min-w-0 py-7 md:pl-8">
                <dt className="type-label text-slate">{p.follow}</dt>
                <dd className="mt-4">
                  <SocialLinks />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 02 — Applications: two PCB panels */}
      <section aria-labelledby="apply-title" className="section-y relative overflow-hidden border-t border-line bg-abyss-950">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-3 lg:pt-4">
              <ChapterLabel index="02" label={p.applyLabel} />
            </div>
            <h2 id="apply-title" className="type-h2 max-w-[18ch] text-mist lg:col-span-9">
              {rich(p.applyTitle)}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20 lg:ml-[calc((100%+1.5rem)*3/12)]">
            {applications.map((a, i) => (
              <article
                key={a.title}
                className={`relative flex min-w-0 flex-col border p-7 sm:p-10 ${a.primary ? "border-line-volt bg-petrol-800/50" : "border-line-strong bg-abyss-900/60"}`}
              >
                <CornerTicks />
                {a.primary && <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_left,black,transparent_60%)]" />}
                <div className="relative flex items-baseline justify-between gap-4">
                  <span className="type-label text-fog">[ {String(i + 1).padStart(2, "0")} ]</span>
                  <span aria-hidden className={`size-2 rounded-full ${a.primary ? "bg-volt shadow-[0_0_10px_rgb(44_255_152/0.9)]" : "border border-line-strong"}`} />
                </div>
                <h3 className="type-h3 relative mt-12 text-mist">{a.title}</h3>
                <p className="relative mt-3 max-w-[40ch] text-fog">{a.text}</p>
                <div className="relative mt-auto pt-10">
                  <ButtonLink href={a.href} variant={a.primary ? "primary" : "bracket"}>
                    {a.label}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
