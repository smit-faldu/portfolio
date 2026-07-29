import { SectionHeader } from "@/components/layout/section-header";
import { education, experience, person, sections } from "@/content/site";

/**
 * §03 — Trajectory.
 *
 * Experience and education share one ledger, but not one weight: the role is
 * given room to explain itself, the qualifications are set as a compact table.
 * A sticky label column holds the reader's place while the entries scroll.
 */
export function Trajectory() {
  return (
    <section
      id="trajectory"
      aria-labelledby="trajectory-heading"
      className="relative z-1 bg-tint-trajectory py-(--section-y)"
    >
      <SectionHeader
        ordinal="03"
        label={sections.trajectory.label}
        headingId="trajectory-heading"
        annotation={`${String(experience.length).padStart(2, "0")} role · ${String(education.length).padStart(2, "0")} qualifications`}
        titleLines={sections.trajectory.titleLines}
        lede={sections.trajectory.lede}
      />

      <div className="shell grid gap-x-8 gap-y-14 pt-16 md:grid-cols-12 md:pt-24">
        {/* ── Sticky rail ─────────────────────────────────────────── */}
        <div className="col-span-full md:col-span-3">
          <dl className="flex flex-col md:sticky md:top-32">
            <div className="flex flex-col gap-2 border-b border-[var(--rule)] pb-4">
              <dt className="t-meta-sm text-fg-4">Practice</dt>
              <dd className="t-mono text-fg-2">{person.discipline}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-4">
              <dt className="t-meta-sm text-fg-4">Span</dt>
              <dd className="t-meta text-fg-2 tabular-nums">{person.span}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="t-meta-sm text-fg-4">Base</dt>
              <dd className="t-meta text-fg-2">{person.locationShort}</dd>
            </div>
          </dl>
        </div>

        <div className="col-span-full flex flex-col gap-16 md:col-span-8 md:col-start-5">
          {/* ── Experience ────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex items-baseline justify-between gap-6 border-b border-[var(--edge)] pb-3">
              <h3 className="t-meta text-fg-2">Experience</h3>
              <span className="t-meta-sm text-fg-4">
                {String(experience.length).padStart(2, "0")}
              </span>
            </div>

            {experience.map((entry) => (
              <article key={entry.organisation} data-reveal className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <p className="t-meta text-signal">{entry.period}</p>
                  <h4 className="t-h2">{entry.title}</h4>
                  <p className="t-meta text-fg-2">
                    {entry.organisation}
                    <span aria-hidden className="px-2.5 text-fg-4">
                      /
                    </span>
                    <span className="text-fg-3">{entry.location}</span>
                  </p>
                </div>

                <ul data-reveal-batch className="flex flex-col">
                  {entry.detail.map((line, index) => (
                    <li
                      key={line}
                      className="grid grid-cols-[2.5ch_1fr] gap-x-5 border-t border-[var(--rule)] py-4"
                    >
                      <span
                        aria-hidden
                        className="t-meta-sm pt-1 text-fg-4 tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="t-body max-w-[62ch]">{line}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* ── Education ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex items-baseline justify-between gap-6 border-b border-[var(--edge)] pb-3">
              <h3 className="t-meta text-fg-2">Education</h3>
              <span className="t-meta-sm text-fg-4">
                {String(education.length).padStart(2, "0")}
              </span>
            </div>

            <ul data-reveal-batch className="flex flex-col">
              {education.map((entry) => (
                <li
                  key={entry.title}
                  className="grid gap-x-8 gap-y-2 border-b border-[var(--rule)] py-6 sm:grid-cols-12"
                >
                  <p className="t-meta text-fg-3 sm:col-span-4">
                    {entry.period}
                  </p>
                  <div className="flex flex-col gap-1.5 sm:col-span-8">
                    <h4 className="t-h3">{entry.title}</h4>
                    <p className="t-body">
                      {entry.organisation}
                      <span aria-hidden className="px-2 text-fg-4">
                        /
                      </span>
                      <span className="text-fg-3">{entry.location}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
