"use client";

import { useEffect, useState } from "react";

/** Live wall-clock time in a given IANA time zone (default Istanbul). Renders "--:--" until hydrated. */
export function LocalTime({ locale = "tr-TR", timeZone = "Europe/Istanbul", className }: { locale?: string; timeZone?: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, [locale, timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
