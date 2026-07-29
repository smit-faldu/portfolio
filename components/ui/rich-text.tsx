import { cn } from "@/lib/utils";
import type { TextPart } from "@/content/site";

/**
 * Renders a line parsed from `resume.json`, setting any `*marked*` run in the
 * editorial serif. Markup only — no client JS.
 */
export function RichText({
  parts,
  className,
}: {
  parts: readonly TextPart[];
  className?: string;
}) {
  return (
    <>
      {parts.map((part, index) =>
        part.em ? (
          <em
            key={index}
            className={cn("t-editorial pr-[0.015em]", className)}
          >
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}
