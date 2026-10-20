import type { ReactNode } from "react";
import { ChapterLabel, CornerTicks, rich } from "../ui";

/**
 * Closing "apply" band for a single audience (founders or investors): a PCB panel with corner ticks,
 * big headline (with `*accent*` markup) on the left, text + actions on the right.
 * `tone="bone"` renders the light band (accent in volt-ink, never volt).
 */
export function ApplyBand({
  id,
  label,
  index,
  title,
  text,
  children,
  tone = "dark",
}: {
  id: string;
  label: string;
  index?: string;
  title: string;
  text: string;
  children: ReactNode;
  tone?: "dark" | "bone";
}) {
  const light = tone === "bone";
  return (
    <section aria-labelledby={id} className={`section-y relative overflow-hidden ${light ? "band-bone" : "border-t border-line bg-abyss-900"}`}>
      {!light && <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgb(0_76_84/0.6),transparent_70%)]" />}
      <div className="container-site relative">
        <div className={`relative border p-6 sm:p-10 lg:p-14 ${light ? "border-line-ink" : "border-line-strong bg-abyss-950/30"}`}>
          <CornerTicks tone={light ? "light" : "dark"} />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 [background-size:24px_24px] [mask-image:linear-gradient(to_left,black,transparent_55%)] ${
              light ? "bg-[radial-gradient(rgb(0_36_40/0.12)_1px,transparent_1.2px)]" : "dot-grid opacity-60"
            }`}
          />
          <ChapterLabel index={index} label={label} tone={light ? "light" : "dark"} className="relative" />
          <div className="relative mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <div className="lg:col-span-7">
              <h2 id={id} className={`type-h2 max-w-[16ch] ${light ? "text-abyss-900" : "text-mist"}`}>
                {rich(title, light ? "ink" : "volt")}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className={`type-lead max-w-[40ch] ${light ? "text-bone-ink" : "text-fog"}`}>{text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
