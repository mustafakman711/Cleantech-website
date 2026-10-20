"use client";

import { useEffect } from "react";

/**
 * Opens the <details> row inside the element targeted by the URL hash (e.g. orbit/legend links to
 * `#werover`), on load, on hashchange and when a same-page hash link is clicked again.
 */
export function OpenOnHash() {
  useEffect(() => {
    const open = (hash: string) => {
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      const details = el?.querySelector("details");
      if (details && !details.open) details.open = true;
    };
    const onHash = () => open(window.location.hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (a) open(a.getAttribute("href") ?? "");
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
