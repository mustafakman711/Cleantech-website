import { CircuitField } from "@/components/CircuitField";
import { ButtonLink } from "@/components/ui";
import { copy } from "@/content/copy";

// Rendered for unknown paths inside a valid locale; locale isn't available here, so both languages are shown.
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-petrol-800">
      <CircuitField className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40" />
      <div className="container-site relative py-40 text-center">
        <p className="font-display text-8xl font-bold text-neon">404</p>
        <h1 className="mt-6 font-display text-3xl font-semibold">
          {copy.tr.notFound.title} · {copy.en.notFound.title}
        </h1>
        <p className="mt-4 text-mist/85">{copy.tr.notFound.text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/tr">{copy.tr.notFound.home}</ButtonLink>
          <ButtonLink href="/en" variant="outline">
            {copy.en.notFound.home}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
