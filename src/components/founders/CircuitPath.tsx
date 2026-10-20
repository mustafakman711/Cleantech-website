import type { ReactNode } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Founders — signature moment: the process as a circuit path. Four PCB-pad nodes on one trace;
 * the volt "current" draws along the trace as the section scrolls through the viewport and each node
 * powers up as the current reaches it (CSS scroll-driven, see `.cp-*` in globals.css).
 * Horizontal from lg, vertical below. Without scroll-timeline support or with reduced motion the
 * final (fully drawn) state is shown — the markup is complete without JS.
 */
export function CircuitPath({
  steps,
  stepLabel,
  terminal,
}: {
  steps: { title: string; text: string }[];
  stepLabel: string;
  /** Label for the trace's terminal (where the path leads after the last step). */
  terminal?: ReactNode;
}) {
  return (
    <div className="cp relative">
      {/* Trace: base hairline + dotted return line + volt fill. Vertical < lg, horizontal ≥ lg. */}
      <div aria-hidden className="cp-track absolute bottom-5 left-[0.5625rem] top-[0.5625rem] w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[55px] lg:h-px lg:w-auto">
        <span className="absolute inset-0 bg-line-strong" />
        <span className="absolute -right-px left-[5px] top-0 hidden h-px bg-[repeating-linear-gradient(to_right,rgb(169_199_194/0.28)_0_2px,transparent_2px_8px)] lg:block lg:top-[5px]" />
        <span className="cp-fill absolute inset-0 bg-volt shadow-[0_0_10px_rgb(44_255_152/0.75)]" />
      </div>

      <ol className="relative grid gap-y-14 lg:grid-cols-4 lg:gap-x-8">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-12 lg:pl-0 lg:pr-4">
            <p className="type-label flex h-[1.125rem] items-center text-fog lg:h-auto">
              <span className="sr-only">{stepLabel} </span>
              <span aria-hidden>{stepLabel}&nbsp;</span>
              {pad(i + 1)}
              <span aria-hidden className="ml-2 text-slate">/ {pad(steps.length)}</span>
            </p>
            {/* PCB pad node */}
            <span
              aria-hidden
              className="cp-node absolute left-0 top-0 grid size-[1.125rem] place-items-center border border-volt bg-abyss-900 lg:static lg:mt-[1.875rem]"
              style={{ ["--i" as string]: i }}
            >
              <span className="cp-core size-1.5 rounded-full bg-volt shadow-[0_0_8px_rgb(44_255_152/0.9)]" />
            </span>
            <h3 className="type-h3 mt-4 text-mist lg:mt-9">{step.title}</h3>
            <p className="mt-3 max-w-[34ch] text-fog">{step.text}</p>
          </li>
        ))}
      </ol>

      {terminal && (
        <div className="relative mt-12 flex min-h-10 items-center pl-12 lg:absolute lg:right-0 lg:top-[-0.75rem] lg:mt-0 lg:pl-0">
          <span
            aria-hidden
            className="cp-term absolute left-[0.3125rem] top-1/2 size-2.5 -translate-y-1/2 rotate-45 border border-volt bg-volt lg:left-auto lg:right-[-0.3125rem] lg:top-[calc(55px+0.75rem)]"
          />
          {terminal}
        </div>
      )}
    </div>
  );
}
