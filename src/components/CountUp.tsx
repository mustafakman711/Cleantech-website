"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Final numeric value; it is rendered in the server HTML, so no-JS and reduced-motion users see it. */
  to: number;
  /** BCP-47 locale for number formatting, e.g. "tr-TR". */
  locale?: string;
  prefix?: string;
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
};

/** Counts from 0 to `to` once, when it first scrolls into view (≤ 1 run, respects reduced motion). */
export function CountUp({ to, locale = "en-GB", prefix = "", suffix = "", duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = new Intl.NumberFormat(locale);
    const render = (n: number) => {
      el.textContent = `${prefix}${fmt.format(n)}${suffix}`;
    };
    const rect = el.getBoundingClientRect();
    // Already visible on load: leave the final value alone.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    render(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          render(Math.round(eased * to));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      render(to);
    };
  }, [to, locale, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {new Intl.NumberFormat(locale).format(to)}
      {suffix}
    </span>
  );
}
