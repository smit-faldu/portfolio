/**
 * The drafting sheet.
 *
 * A fixed set of hairline column rules that every section aligns to. It is the
 * site's one recurring structural device — present on every screen, never
 * competing with content. Purely decorative, so it is hidden from assistive
 * technology and cannot receive pointer events.
 */
export function GridRules() {
  return (
    // Sits above section backgrounds — at 6% opacity it reads as the sheet the
    // content is printed on, rather than a layer drawn over it.
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 select-none"
    >
      <div className="shell h-full">
        <div className="relative h-full">
          <span className="absolute inset-y-0 left-0 w-px bg-[var(--rule)]" />
          <span className="absolute inset-y-0 left-1/4 hidden w-px bg-[var(--rule)] md:block" />
          <span className="absolute inset-y-0 left-1/2 hidden w-px bg-[var(--rule)] sm:block" />
          <span className="absolute inset-y-0 left-3/4 hidden w-px bg-[var(--rule)] md:block" />
          <span className="absolute inset-y-0 right-0 w-px bg-[var(--rule)]" />
        </div>
      </div>
    </div>
  );
}
