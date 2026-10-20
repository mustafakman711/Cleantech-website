import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { CircuitField } from "./CircuitField";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neon ${className}`}>
      <span aria-hidden className="h-px w-6 bg-neon" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow className={centered ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <Heading className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Heading>
      {lead && <p className="mt-5 text-lg leading-relaxed text-mist/90">{lead}</p>}
    </div>
  );
}

type ButtonVariant = "primary" | "outline" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-neon text-petrol-950 hover:bg-neon-300 shadow-[0_0_32px_-8px_rgb(44_255_152/0.7)]",
  outline: "border border-neon/60 text-white hover:border-neon hover:bg-neon/10",
  ghost: "text-neon hover:text-neon-300 px-0",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const Icon = external && !href.startsWith("mailto:") ? ArrowUpRight : ArrowRight;
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      <Icon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-petrol-800">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <CircuitField className="absolute inset-x-0 bottom-0 h-28 w-full opacity-40" />
      <div className="container-site relative pb-24 pt-36 sm:pt-44">
        <div className="max-w-3xl animate-rise">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist/90 sm:text-xl">{lead}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
