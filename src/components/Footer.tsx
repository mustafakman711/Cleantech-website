import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/content/copy";
import { contact } from "@/content/fund";
import { portfolio } from "@/content/portfolio";
import { committee, management } from "@/content/team";
import type { Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { InstagramIcon, LinkedInIcon, XIcon } from "./icons";
import { LocalTime } from "./LocalTime";
import { HideOnPaths } from "./HideOnPaths";
import { Logo } from "./Logo";
import { ButtonLink, ChapterLabel, withAccent } from "./ui";

export function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: contact.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: contact.social.x, label: "X", Icon: XIcon },
  ];
  return (
    <ul className={`flex gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fog transition-colors hover:border-volt hover:text-volt"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Global footer "finale": CTA + big email, counted nav, Istanbul local time, legal line, cropped wordmark. */
export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const f = c.footer;
  const counts: Partial<Record<string, number>> = {
    portfolio: portfolio.length,
    team: management.length + committee.length,
    news: getPosts(locale, "news").length,
    insights: getPosts(locale, "insights").length,
  };
  const link = (k: keyof typeof c.nav) => ({ href: `/${locale}/${k}`, label: c.nav[k], count: counts[k] });
  const columns = [
    { title: f.fund, links: [link("about"), link("portfolio"), link("team")] },
    { title: f.apply, links: [link("founders"), link("investors"), link("contact")] },
    { title: f.media, links: [link("news"), link("insights")] },
  ];

  return (
    <footer className="relative overflow-hidden bg-abyss-950 text-mist">
      <div className="container-site pt-24 md:pt-32">
        {/* CTA row (the contact page already leads with the same email + applications, so it is skipped there) */}
        <HideOnPaths suffixes={["/contact"]}>
          <div className="mb-20">
            <ChapterLabel label={f.ctaLabel} />
            <h2 className="type-h2 mt-8 max-w-[16ch] text-mist">{withAccent(f.ctaTitle, f.ctaAccent)}</h2>
            <div className="mt-12 grid gap-10 xl:grid-cols-12 xl:items-end">
              <div className="min-w-0 xl:col-span-8">
                <p className="type-label text-slate">{f.writeUs}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="group mt-1 inline-flex max-w-full items-start gap-3 py-2 text-[clamp(1.25rem,0.5rem+3.6vw,4rem)] font-[380] leading-[1.05] tracking-[-0.035em] text-mist [font-stretch:104%] [overflow-wrap:anywhere] hover:text-volt"
                >
                  <span className="link-trace pb-1">{contact.email}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-[0.15em] size-[0.7em] shrink-0 text-volt transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={1.25}
                  />
                </a>
              </div>
              <div className="flex flex-wrap gap-3 xl:col-span-4 xl:justify-end">
                <ButtonLink href={contact.startupFormUrl}>{c.common.applyStartup}</ButtonLink>
                <ButtonLink href={contact.investorFormUrl} variant="bracket">
                  {c.common.applyInvestor}
                </ButtonLink>
              </div>
            </div>
          </div>
        </HideOnPaths>

        {/* Nav grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-12 md:grid-cols-12 md:pt-16">
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <Logo className="h-9 w-auto" />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-fog">{f.tagline}</p>
            <SocialLinks className="mt-6" />
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-3 lg:col-span-2">
              <h2 className="type-label text-slate">{col.title}</h2>
              <ul className="mt-4">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex min-h-10 items-center gap-2 text-[0.9375rem] text-mist transition-colors hover:text-volt">
                      <span>{l.label}</span>
                      {l.count !== undefined && <span className="type-label text-slate group-hover:text-volt">[{pad(l.count)}]</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="md:col-span-3 lg:col-span-2">
            <h2 className="type-label text-slate">{f.office}</h2>
            <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-fog">{contact.address}</address>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] text-mist hover:text-volt"
            >
              {c.contactPage.showOnMap}
              <ArrowUpRight aria-hidden className="size-3.5 text-volt" strokeWidth={1.75} />
            </a>
            <p className="mt-6 flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)] motion-safe:animate-pulse-node" />
              <span className="type-label text-slate">{f.localTime}</span>
            </p>
            <p className="type-mono mt-1 text-2xl text-mist">
              <LocalTime locale={locale === "tr" ? "tr-TR" : "en-GB"} />
              <span className="ml-2 text-sm text-slate">GMT+3</span>
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 grid gap-6 border-t border-line py-8 md:grid-cols-12 md:items-start">
          <p className="max-w-[90ch] text-xs leading-relaxed text-slate md:col-span-8">{f.legal}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:col-span-4 md:justify-end">
            <p className="type-label text-slate">
              © {new Date().getFullYear()} Cleantech Ventures · {f.rights}
            </p>
            <a href="#main" className="type-label inline-flex min-h-10 items-center text-fog hover:text-volt">
              ↑ {f.backToTop}
            </a>
          </div>
        </div>
      </div>

      {/* Giant cropped wordmark bleeding off the bottom edge */}
      <svg aria-hidden viewBox="0 0 1000 150" className="block w-full select-none text-petrol-800" preserveAspectRatio="xMidYMin meet">
        <text
          x="500"
          y="190"
          textAnchor="middle"
          textLength="992"
          lengthAdjust="spacingAndGlyphs"
          fontSize="232"
          fill="currentColor"
          style={{ fontFamily: "var(--font-mona)", fontWeight: 680, fontStretch: "125%" }}
        >
          CLEANTECH
        </text>
      </svg>
    </footer>
  );
}
