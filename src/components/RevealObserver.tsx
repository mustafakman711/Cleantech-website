"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fallback for browsers without CSS scroll-driven animations (`animation-timeline: view()`).
 * Adds `reveal-js` to <html> and sets `data-inview` on every `[data-reveal]` / `.mf-root`
 * element once it enters the viewport. Supporting browsers do everything in CSS, so this is a no-op there.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal-js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-inview", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not([data-inview]), .mf-root:not([data-inview])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
