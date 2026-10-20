import Image from "next/image";

/** Brand logo with the SVG's internal padding cropped, so it aligns optically with the content edge (QA #19). */
export function Logo({ className = "h-9 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/brand/cleantech-logo-cropped.svg" alt="Cleantech Ventures" width={242} height={72} priority={priority} className={className} />;
}
