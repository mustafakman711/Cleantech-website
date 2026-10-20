import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";
import { contact } from "@/content/fund";
import type { Locale } from "@/lib/i18n";
import { InstagramIcon, LinkedInIcon, XIcon } from "./icons";

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
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-neon hover:text-neon"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const columns = [
    { title: c.footer.fund, links: (["about", "portfolio", "team"] as const).map((k) => ({ href: `/${locale}/${k}`, label: c.nav[k] })) },
    {
      title: c.footer.apply,
      links: [
        { href: `/${locale}/founders`, label: c.nav.founders },
        { href: `/${locale}/investors`, label: c.nav.investors },
        { href: `/${locale}/contact`, label: c.nav.contact },
      ],
    },
    { title: c.footer.media, links: (["news", "insights"] as const).map((k) => ({ href: `/${locale}/${k}`, label: c.nav[k] })) },
  ];

  return (
    <footer className="border-t border-white/5 bg-petrol-950">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Image src="/brand/cleantech-logo.svg" alt="Cleantech Ventures" width={150} height={60} className="h-14 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-mist/80">{c.footer.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1fr_1fr_1.5fr]">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/80 hover:text-neon">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{c.nav.contact}</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/80">
              <a href={`mailto:${contact.email}`} className="block hover:text-neon">
                {contact.email}
              </a>
              <span className="block leading-relaxed">{contact.address}</span>
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-site flex flex-col gap-4 py-8 text-xs leading-relaxed text-white/50 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">{c.footer.legal}</p>
          <p className="shrink-0">
            © {new Date().getFullYear()} Cleantech Ventures. {c.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
