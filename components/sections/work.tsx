import { SectionHeader } from "@/components/layout/section-header";
import { WorkEntry } from "@/components/sections/work-entry";
import { contact, projectYears, projects, sections } from "@/content/site";

/**
 * §01 — Selected Work.
 *
 * The centre of gravity for the whole page: four systems presented as
 * catalogue entries rather than cards, each carrying its own specification.
 */
export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative z-1 bg-tint-work py-(--section-y)"
    >
      <SectionHeader
        ordinal="01"
        label={sections.work.label}
        headingId="work-heading"
        annotation={`${String(projects.length).padStart(2, "0")} systems · ${projectYears}`}
        titleLines={sections.work.titleLines}
        lede={sections.work.lede}
      />

      <div className="shell pt-16 md:pt-24">
        {projects.map((project) => (
          <div key={project.slug} data-reveal>
            <WorkEntry project={project} />
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--edge)] pt-6">
          <p className="t-meta-sm text-fg-4">{sections.work.outro}</p>
          <a
            href={contact.github.url}
            target="_blank"
            rel="noreferrer noopener"
            className="link-draw t-meta text-fg-1"
          >
            {sections.work.outroLink}
            <span aria-hidden className="pl-1.5 text-signal">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
