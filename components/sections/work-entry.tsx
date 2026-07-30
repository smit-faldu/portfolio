"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/site";

/**
 * One catalogue entry in Selected Work.
 *
 * Two columns, always: the argument on the left, the specification on the
 * right. Every project uses this same anatomy — prominence is expressed only
 * through scale and through what is open by default, never through a
 * different layout.
 */
export function WorkEntry({ project }: { project: Project }) {
  const { featured } = project;
  const headingId = `work-${project.slug}`;
  // Rendered only when a verified URL exists — an empty affordance is worse
  // than none at all.
  const hasLinks = Boolean(project.repo || project.demo);

  return (
    <article
      aria-labelledby={headingId}
      className="group/entry relative border-t border-[var(--edge)]"
    >
      {/* Signal marker: draws along the entry's top edge on hover. */}
      <span
        aria-hidden
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/entry:scale-x-100 group-focus-within/entry:scale-x-100"
      />

      <div
        className={cn(
          "grid gap-x-8 md:grid-cols-12",
          featured ? "gap-y-8 py-12 md:py-20" : "gap-y-7 py-10 md:py-16",
        )}
      >
        {/* ── Ordinal ─────────────────────────────────────────────── */}
        <div className="col-span-full flex items-baseline justify-between gap-4 md:col-span-1 md:flex-col md:items-start md:justify-start md:gap-3">
          {/*
            The catalogue number drifts slightly ahead of its entry as the page
            moves — enough to separate the numbering from the text it labels,
            not enough to read as an animation.
          */}
          <span
            data-speed="1.1"
            className={cn(
              "block font-mono leading-none tracking-tight tabular-nums transition-colors duration-500 group-hover/entry:text-signal",
              featured
                ? "text-[clamp(1.75rem,3vw,2.5rem)] text-fg-3"
                : "text-[clamp(1.25rem,2vw,1.75rem)] text-fg-4",
            )}
          >
            {project.ordinal}
          </span>
          {featured ? (
            <span className="t-meta-sm text-signal">Featured</span>
          ) : null}
        </div>

        {/* ── Argument ────────────────────────────────────────────── */}
        <div
          className={cn(
            "col-span-full flex flex-col",
            featured
              ? "gap-6 md:col-span-7 md:col-start-2"
              : "gap-5 md:col-span-6 md:col-start-2",
          )}
        >
          <h3
            id={headingId}
            className={cn(featured ? "t-h1" : "t-h2", "text-balance")}
          >
            {project.title}
          </h3>

          <p className={cn(featured ? "t-lead" : "t-body", "max-w-[48ch]")}>
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-1">
            <Accordion
              type="single"
              collapsible
              defaultValue={featured ? project.slug : undefined}
              className="order-2 w-full sm:order-1"
            >
              <AccordionItem value={project.slug}>
                <AccordionTrigger>
                  <span className="group-aria-expanded/trigger:hidden">
                    Read the approach
                  </span>
                  <span className="hidden group-aria-expanded/trigger:inline">
                    Close
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex max-w-[58ch] flex-col gap-8 border-l border-[var(--edge)] pl-6 md:pl-8">
                    <div className="flex flex-col gap-2.5">
                      <p className="t-meta-sm text-fg-4">Problem</p>
                      <p className="t-body">{project.problem}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="t-meta-sm text-fg-4">Approach</p>
                      <ol className="flex flex-col gap-4">
                        {project.approach.map((step, index) => (
                          <li
                            key={step}
                            className="grid grid-cols-[2.5ch_1fr] gap-x-4"
                          >
                            <span
                              aria-hidden
                              className="t-meta-sm pt-1 text-fg-4 tabular-nums"
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="t-body">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {hasLinks ? (
              <div className="order-1 flex flex-wrap items-center gap-x-7 gap-y-3 sm:order-2">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor-label="Demo"
                    className="link-draw t-meta text-fg-1"
                  >
                    Live demo
                    <span aria-hidden className="pl-1.5 text-signal">
                      ↗
                    </span>
                    <span className="sr-only"> — {project.title}</span>
                  </a>
                ) : null}
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor-label="Source"
                    className="link-draw t-meta text-fg-1"
                  >
                    Source
                    <span aria-hidden className="pl-1.5 text-signal">
                      ↗
                    </span>
                    <span className="sr-only"> — {project.title}</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Specification ───────────────────────────────────────── */}
        {/*
          `data-lag` lets the specification trail the scroll and settle a beat
          after it stops — the column reads as the lighter, secondary object it
          is, without changing a single type or colour value.
        */}
        <dl
          data-lag="0.14"
          className={cn(
            "col-span-full self-start border-t border-[var(--rule)] pt-5 md:col-start-10 md:col-span-3 md:border-t-0 md:pt-2",
          )}
        >
          <div className="flex flex-col gap-1.5 border-b border-[var(--rule)] pb-4 md:border-t md:pt-4">
            <dt className="t-meta-sm text-fg-4">Role</dt>
            <dd className="t-meta text-fg-2">{project.discipline}</dd>
          </div>

          <div className="flex flex-col gap-2 border-b border-[var(--rule)] py-4">
            <dt className="t-meta-sm text-fg-4">Stack</dt>
            <dd>
              {/*
                The separator trails its item rather than leading the next one,
                so a wrapped line never opens with a stray slash.
              */}
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {project.stack.map((item, index) => (
                  <li key={item} className="t-mono flex items-center gap-2">
                    <span>{item}</span>
                    {index < project.stack.length - 1 ? (
                      <span aria-hidden className="text-fg-4">
                        /
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-4">
            <dt className="t-meta-sm text-fg-4">Deployed</dt>
            <dd className="t-meta text-right text-fg-2">
              {project.deployment}
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-4 py-4">
            <dt className="t-meta-sm text-fg-4">Year</dt>
            <dd className="t-meta text-fg-2 tabular-nums">{project.year}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
