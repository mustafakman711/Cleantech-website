import type { Metadata } from "next";
import { Mail, MapPin, Rocket, TrendingUp } from "lucide-react";
import { SocialLinks } from "@/components/Footer";
import { ButtonLink, PageHero } from "@/components/ui";
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
    { Icon: Rocket, title: p.startupTitle, text: p.startupText, href: contact.startupFormUrl, label: c.common.applyStartup },
    { Icon: TrendingUp, title: p.investorTitle, text: p.investorText, href: contact.investorFormUrl, label: c.common.applyInvestor },
  ];

  return (
    <>
      <PageHero eyebrow={c.meta.siteName} title={p.title} lead={p.lead} />
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-petrol-850/60 p-8 sm:p-10">
            <dl className="space-y-8">
              <div className="flex gap-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-neon/15 text-neon">
                  <Mail aria-hidden className="size-5" />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{p.email}</dt>
                  <dd className="mt-2 space-y-1 text-lg">
                    <a href={`mailto:${contact.email}`} className="block hover:text-neon">
                      {contact.email}
                    </a>
                    <a href={`mailto:${contact.secondaryEmail}`} className="block text-base text-mist/80 hover:text-neon">
                      {contact.secondaryEmail}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-neon/15 text-neon">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{p.address}</dt>
                  <dd className="mt-2">
                    <address className="text-lg not-italic leading-relaxed">{contact.address}</address>
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-neon hover:text-neon-300"
                    >
                      {p.showOnMap} ↗
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{p.follow}</p>
              <SocialLinks className="mt-4" />
            </div>
          </div>
          <div className="grid gap-5">
            {applications.map(({ Icon, title, text, href, label }) => (
              <article key={title} className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-petrol-700/60 to-petrol-850/60 p-8 sm:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-neon text-petrol-950">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-mist/85">{text}</p>
                <ButtonLink href={href} className="mt-8 self-start">
                  {label}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
