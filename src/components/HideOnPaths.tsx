"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders its (server-rendered) children except on routes ending with one of `suffixes`, e.g. the footer CTA on /contact. */
export function HideOnPaths({ suffixes, children }: { suffixes: string[]; children: ReactNode }) {
  const pathname = usePathname() ?? "";
  if (suffixes.some((s) => pathname.endsWith(s))) return null;
  return <>{children}</>;
}
