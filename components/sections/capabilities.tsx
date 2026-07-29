import { SectionHeader } from "@/components/layout/section-header";
import { capabilities, practice, sections } from "@/content/site";

/**
 * §02 — Capabilities.
 *
 * A technical index rather than a badge wall. Seven lettered groups, each
 * item carrying its own reference code, ruled like a parts list. Reading it
 * top to bottom tells you how the work is actually organised — orchestration
 * first, interfaces last.
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative z-1 bg-tint-capabilities py-(--section-y)"
    >
      <SectionHeader
        ordinal="02"
        label={sections.capabilities.label}
        headingId="capabilities-heading"
        annotation={`${capabilities.length} groups`}
        titleLines={sections.capabilities.titleLines}
        lede={sections.capabilities.lede}
      />

      <div className="shell pt-16 md:pt-24">
        {capabilities.map((group) => (
          <div
            key={group.ordinal}
            data-reveal
            className="grid gap-x-8 gap-y-6 border-t border-[var(--edge)] py-10 md:grid-cols-12 md:py-12"
          >
            {/* ── Group identity ──────────────────────────────────── */}
            <div className="col-span-full flex flex-col gap-3 md:col-span-4">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center border border-[var(--edge)] font-mono text-xs text-signal"
                >
                  {group.ordinal}
                </span>
                <h3 className="t-h3">{group.title}</h3>
              </div>
              <p className="t-body max-w-[38ch] pl-11">{group.note}</p>
            </div>

            {/* ── Item index ──────────────────────────────────────── */}
            {/*
              One ruled column on phones so each entry keeps its own line;
              the index only splits into columns once there is room for it.
            */}
            <ul className="col-span-full gap-x-8 sm:columns-2 md:col-span-7 md:col-start-6 lg:columns-3">
              {group.items.map((item, index) => (
                <li
                  key={item}
                  className="group/item flex break-inside-avoid items-baseline justify-between gap-3 border-t border-[var(--rule)] py-2.5"
                >
                  <span className="t-mono text-fg-1 transition-colors duration-300 group-hover/item:text-signal">
                    {item}
                  </span>
                  <span
                    aria-hidden
                    className="t-meta-sm shrink-0 text-fg-4 tabular-nums"
                  >
                    {group.ordinal}
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* ── Footnote ──────────────────────────────────────────── */}
        <div
          data-reveal
          className="grid gap-x-8 gap-y-4 border-t border-[var(--edge)] pt-6 md:grid-cols-12"
        >
          <p className="t-meta-sm col-span-full text-fg-4 md:col-span-4">
            {sections.capabilities.practiceLabel}
          </p>
          <ul className="col-span-full flex flex-wrap gap-x-2 gap-y-1.5 md:col-span-7 md:col-start-6">
            {practice.map((item, index) => (
              <li key={item} className="t-mono flex items-center gap-2 text-fg-3">
                <span>{item}</span>
                {index < practice.length - 1 ? (
                  <span aria-hidden className="text-fg-4">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
