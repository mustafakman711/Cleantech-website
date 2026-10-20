/**
 * Fixed hairline frame: two 1px vertical rules just outside the content gutters (2150 / Stonegate).
 * Purely decorative; hidden below 768px. Rendered once in the locale layout.
 */
export function GridFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div className="container-site h-full">
        <div className="-mx-[var(--frame-inset)] h-full border-x border-line" />
      </div>
    </div>
  );
}
