import { LocalTime } from "@/components/ui/local-time";
import { RichText } from "@/components/ui/rich-text";
import { cn } from "@/lib/utils";
import {
  contact,
  navItems,
  person,
  plainStatement,
  projects,
} from "@/content/site";

/**
 * §00 — Index.
 *
 * No photograph, no greeting. The page opens the way a technical document
 * opens: the name and discipline as the first hard facts, the thesis set as
 * large as it will go, and a ruled foot carrying the specification.
 */

/** The thesis cascades right as it descends — an editorial stair. */
const HERO_INDENT = ["", "md:pl-[6%]", "md:pl-[14%]"] as const;

export function Hero() {
  const [work, , , contactNav] = navItems;

  return (
    <section
      id="index"
      aria-labelledby="index-heading"
      className="relative z-1 flex min-h-svh flex-col justify-between pt-(--nav-h)"
    >
      {/* ── Masthead ─────────────────────────────────────────────────── */}
      <div className="shell pt-10 md:pt-16">
        <div data-hero-rule className="h-px w-full bg-[var(--edge)]" aria-hidden />

        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 pt-4 md:grid-cols-4">
          {/* The name is the first datum on the sheet, and the largest. */}
          <div data-hero-item className="flex flex-col gap-1.5">
            <dt className="t-meta-sm text-fg-4">Name</dt>
            <dd className="flex flex-col gap-1">
              <span className="t-h3 text-fg-1">{person.name}</span>
              <span className="t-meta-sm text-fg-3">{person.role}</span>
            </dd>
          </div>

          <div data-hero-item className="flex flex-col gap-1.5">
            <dt className="t-meta-sm text-fg-4">Focus</dt>
            <dd className="t-meta text-fg-2">{person.focus}</dd>
          </div>

          <div data-hero-item className="flex flex-col gap-1.5">
            <dt className="t-meta-sm text-fg-4">Based in</dt>
            <dd className="t-meta text-fg-2">{person.locationShort}</dd>
          </div>

          <div data-hero-item className="flex flex-col gap-1.5">
            <dt className="t-meta-sm text-fg-4">Local time</dt>
            <dd className="t-meta text-fg-2">
              <LocalTime />
            </dd>
          </div>
        </dl>
      </div>

      {/* ── Thesis ───────────────────────────────────────────────────── */}
      <div className="shell py-16 md:py-24">
        <h1 id="index-heading" className="t-display">
          <span className="sr-only">
            {person.name} — {person.role}. {plainStatement}
          </span>
          {person.statement.map((line, index) => (
            <span
              key={index}
              data-hero-line
              aria-hidden
              className={cn("reveal-mask", HERO_INDENT[index])}
            >
              <span className="block">
                <RichText parts={line} />
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* ── Specification ────────────────────────────────────────────── */}
      <div className="shell pb-10 md:pb-14">
        <div data-hero-rule className="h-px w-full bg-[var(--edge)]" aria-hidden />

        <div className="grid gap-x-8 gap-y-8 pt-6 md:grid-cols-12">
          <p
            data-hero-item
            className="t-lead col-span-full max-w-[62ch] md:col-span-6 lg:col-span-5"
          >
            {person.intro}
          </p>

          <div
            data-hero-item
            className="col-span-full flex flex-col gap-3 md:col-span-3 md:col-start-8"
          >
            <p className="t-meta-sm text-fg-4">Currently</p>
            <p className="t-mono text-fg-2">{person.currently}</p>
          </div>

          <nav
            data-hero-item
            aria-label="Primary"
            className="col-span-full flex flex-wrap items-end gap-x-8 gap-y-4 md:col-span-2 md:col-start-11 md:flex-col md:items-start md:gap-4"
          >
            <a href={`#${work.id}`} className="link-draw t-meta text-fg-1">
              {work.label}
              <span aria-hidden className="pl-2 text-signal">
                ({String(projects.length).padStart(2, "0")})
              </span>
            </a>
            <a href={`#${contactNav.id}`} className="link-draw t-meta text-fg-1">
              {contactNav.label}
            </a>
            <a
              href={contact.github.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw t-meta text-fg-1"
            >
              GitHub
              <span aria-hidden className="pl-1.5 text-fg-4">
                ↗
              </span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
