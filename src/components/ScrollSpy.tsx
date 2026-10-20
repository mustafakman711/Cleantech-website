"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a section and sets `data-spy-active="<i>"` + `--spy-step` on itself for the
 * `[data-spy-panel="<i>"]` child currently crossing the middle of the viewport.
 * Styling lives in CSS (`[data-spy-active] [data-spy-item]`), so the server HTML is complete without JS.
 */
export function ScrollSpy({ children, className, total, id, labelledBy }: { children: ReactNode; className?: string; total: number; id?: string; labelledBy?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.setAttribute("data-spy-ready", "");
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-spy-panel]"));
    const set = (i: string) => {
      root.setAttribute("data-spy-active", i);
      root.style.setProperty("--spy-step", i);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) set(e.target.getAttribute("data-spy-panel") ?? "0");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} aria-labelledby={labelledBy} className={className} data-spy-active="0" style={{ ["--spy-total" as string]: total }}>
      {children}
    </div>
  );
}
