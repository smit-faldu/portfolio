import { MaskedText } from "@/components/motion/masked-text";
import { ScrambleLabel } from "@/components/motion/scramble-label";
import { RichText } from "@/components/ui/rich-text";
import type { RichLines } from "@/content/site";

interface SectionHeaderProps {
  /** Document ordinal, e.g. "01" — rendered as §01. */
  ordinal: string;
  /** Uppercase mono label sitting beside the ordinal. */
  label: string;
  /** Title lines, already parsed from `resume.json`. */
  titleLines: RichLines;
  /** Optional right-hand annotation, e.g. an item count. */
  annotation?: string;
  /** Optional standfirst beneath the heading. */
  lede?: string;
  headingId: string;
}

/**
 * Every section opens the same way: a ruled masthead carrying its ordinal,
 * label and heading. Repeating this exactly is what makes the site read as one
 * document rather than a stack of unrelated blocks.
 *
 * The heading reveals line by line rather than as a single block — against the
 * lines as actually rendered, which is why the authored lines are only a
 * starting point. The label decodes itself as the section arrives, in the same
 * register as the ordinals and reference codes around it.
 */
export function SectionHeader({
  ordinal,
  label,
  titleLines,
  annotation,
  lede,
  headingId,
}: SectionHeaderProps) {
  return (
    <header className="shell relative z-1">
      <div data-rule-draw className="h-px w-full bg-[var(--edge)]" aria-hidden />

      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-4">
        <p className="t-meta flex items-baseline gap-3">
          <span className="text-signal">§{ordinal}</span>
          <ScrambleLabel>{label}</ScrambleLabel>
        </p>
        {annotation ? <p className="t-meta-sm text-fg-4">{annotation}</p> : null}
      </div>

      <div className="grid gap-x-8 gap-y-6 pt-10 md:grid-cols-12 md:pt-14">
        {/*
          `data-reveal-group` hands every masked line inside to one SplitText
          call, so a two-line title staggers as a single gesture.
        */}
        <h2
          id={headingId}
          data-reveal-group
          className="t-h2 col-span-full md:col-span-7"
        >
          {titleLines.map((line, index) => (
            <MaskedText key={index}>
              <RichText parts={line} />
            </MaskedText>
          ))}
        </h2>
        {lede ? (
          <p
            data-reveal
            data-reveal-delay="0.08"
            className="t-body col-span-full max-w-prose md:col-span-4 md:col-start-9"
          >
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}
