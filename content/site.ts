/**
 * Typed view over `resume.json`.
 *
 * `resume.json` is the single editable source of truth — this module only
 * validates its shape and derives the things a human should never have to
 * maintain by hand: project numbering, capability letters, slugs, counts,
 * year ranges and the phone href.
 *
 * Nothing here holds content. Add a project, a skill group or a role to the
 * JSON and it appears on the site; no component needs to change.
 */

import resumeFile from "@/resume.json";

/* ────────────────────────────────────────────────── the file schema ── */

/**
 * Declared shape of `resume.json`.
 *
 * The import is cast to this rather than relying on TypeScript's structural
 * inference from the file's current contents. That matters: inference would
 * make every key that happens to be present today *required*, so adding a
 * project without a `repo` key would fail the build. Optional here means
 * optional in the file.
 */
interface ResumeFile {
  site: { url: string };
  person: {
    name: string;
    role: string;
    focus: string;
    location: string;
    locationShort: string;
    timezone: string;
    timezoneAbbr: string;
    statement: string[];
    intro: string;
    currently: string;
    summary: string;
    discipline: string;
    span: string;
    ambition: string;
    knowsAbout: string[];
  };
  contact: {
    email: string;
    phone: string;
    note: string;
    github: { handle: string; url: string };
    linkedin: { handle: string; url: string };
  };
  sections: {
    work: {
      label: string;
      title: string;
      lede: string;
      outro: string;
      outroLink: string;
    };
    capabilities: {
      label: string;
      title: string;
      lede: string;
      practiceLabel: string;
    };
    trajectory: { label: string; title: string; lede: string };
    contact: { label: string; title: string };
  };
  projects: {
    title: string;
    summary: string;
    problem: string;
    approach: string[];
    discipline: string;
    stack: string[];
    deployment: string;
    year: string;
    featured?: boolean;
    repo?: string;
    demo?: string;
  }[];
  capabilities: { title: string; note: string; items: string[] }[];
  practice: string[];
  experience: {
    period: string;
    title: string;
    organisation: string;
    location: string;
    detail: string[];
  }[];
  education: {
    period: string;
    title: string;
    organisation: string;
    location: string;
    detail?: string[];
  }[];
}

const resume = resumeFile as unknown as ResumeFile;

/* ─────────────────────────────────────────────────────────── types ── */

/** A run of text, optionally set in the editorial italic. */
export interface TextPart {
  text: string;
  em?: boolean;
}

/** A title broken into typeset lines, each line a series of parts. */
export type RichLines = readonly (readonly TextPart[])[];

export type SectionId = "index" | "work" | "capabilities" | "trajectory" | "contact";

export interface NavItem {
  id: Exclude<SectionId, "index">;
  ordinal: string;
  label: string;
}

export interface Project {
  slug: string;
  ordinal: string;
  title: string;
  summary: string;
  problem: string;
  approach: readonly string[];
  discipline: string;
  stack: readonly string[];
  deployment: string;
  year: string;
  featured: boolean;
  /** Undefined when the JSON leaves it blank — the link is then not rendered. */
  repo?: string;
  demo?: string;
}

export interface CapabilityGroup {
  ordinal: string;
  title: string;
  note: string;
  items: readonly string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  organisation: string;
  location: string;
  detail: readonly string[];
}

/* ───────────────────────────────────────────────────────── parsing ── */

/**
 * Splits `*emphasised*` runs out of a string.
 * The capture group means odd indices are always the emphasised runs.
 */
export function parseEmphasis(input: string): readonly TextPart[] {
  return input
    .split(/\*([^*]+)\*/g)
    .map((text, index) => ({ text, em: index % 2 === 1 }))
    .filter((part) => part.text.length > 0);
}

/** Splits on `|` into lines, then parses emphasis within each line. */
export function parseRich(input: string): RichLines {
  return input.split("|").map((line) => parseEmphasis(line));
}

/** Flattens rich lines back to plain text, for `alt`, `title` and sr-only copy. */
export function toPlainText(lines: RichLines): string {
  return lines.map((line) => line.map((part) => part.text).join("")).join(" ");
}

/* ───────────────────────────────────────────────────────── helpers ── */

const pad = (value: number) => String(value).padStart(2, "0");

/** 0 → A, 25 → Z, 26 → AA. Keeps lettering automatic past the alphabet. */
function letterFor(index: number): string {
  let ordinal = "";
  let remaining = index;
  do {
    ordinal = String.fromCharCode(65 + (remaining % 26)) + ordinal;
    remaining = Math.floor(remaining / 26) - 1;
  } while (remaining >= 0);
  return ordinal;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Treats blank strings in the JSON as "not provided". */
const optional = (value: string | undefined) =>
  value && value.trim().length > 0 ? value.trim() : undefined;

/* ──────────────────────────────────────────────────────── identity ── */

export const siteUrl = resume.site.url;

export const person = {
  ...resume.person,
  /** Hero headline, pre-parsed into masked lines. */
  statement: resume.person.statement.map(parseEmphasis) as RichLines,
} as const;

/** Plain transcript of the headline, for assistive technology and metadata. */
export const plainStatement = toPlainText(person.statement);

export const contact = {
  ...resume.contact,
  /** `tel:` hrefs must not contain spaces. */
  phoneHref: resume.contact.phone.replace(/[^\d+]/g, ""),
} as const;

/* ──────────────────────────────────────────────────────── sections ── */

const rawSections = resume.sections;

export const sections = {
  work: {
    ...rawSections.work,
    titleLines: parseRich(rawSections.work.title),
  },
  capabilities: {
    ...rawSections.capabilities,
    titleLines: parseRich(rawSections.capabilities.title),
  },
  trajectory: {
    ...rawSections.trajectory,
    titleLines: parseRich(rawSections.trajectory.title),
  },
  contact: {
    ...rawSections.contact,
    titleLines: parseRich(rawSections.contact.title),
  },
} as const;

/** Numbered §01…§04 in the order the sections appear on the page. */
export const navItems: readonly NavItem[] = (
  ["work", "capabilities", "trajectory", "contact"] as const
).map((id, index) => ({
  id,
  ordinal: pad(index + 1),
  label: sections[id].label,
}));

/* ──────────────────────────────────────────────────────── projects ── */

export const projects: readonly Project[] = resume.projects.map(
  (project, index) => ({
    slug: slugify(project.title),
    ordinal: pad(index + 1),
    title: project.title,
    summary: project.summary,
    problem: project.problem,
    approach: project.approach,
    discipline: project.discipline,
    stack: project.stack,
    deployment: project.deployment,
    year: project.year,
    featured: project.featured === true,
    repo: optional(project.repo),
    demo: optional(project.demo),
  }),
);

/** e.g. "2025" or "2023 — 2025", derived from whatever years are present. */
export const projectYears = (() => {
  const years = [...new Set(projects.map((p) => p.year))].sort();
  if (years.length === 0) return "";
  return years.length === 1 ? years[0] : `${years[0]} — ${years[years.length - 1]}`;
})();

/* ───────────────────────────────────────────────────── capabilities ── */

export const capabilities: readonly CapabilityGroup[] = resume.capabilities.map(
  (group, index) => ({ ordinal: letterFor(index), ...group }),
);

export const practice: readonly string[] = resume.practice;

/* ─────────────────────────────────────────────────────── trajectory ── */

export const experience: readonly TimelineEntry[] = resume.experience;

export const education: readonly TimelineEntry[] = resume.education.map(
  (entry) => ({ ...entry, detail: entry.detail ?? [] }),
);
