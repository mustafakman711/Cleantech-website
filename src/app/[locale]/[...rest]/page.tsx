import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths inside a valid locale. Calling notFound() here makes Next render
 * `[locale]/not-found.tsx` inside the locale layout (header, footer, fonts) instead of the bare default 404.
 */
export default function CatchAll() {
  notFound();
}
