import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One authored line of a heading, behind a mask.
 *
 * The mask does two jobs at two different times. Before hydration it is the
 * only thing hiding the text, which is why the inner span starts translated
 * down in CSS — nothing can flash. After hydration `MotionProvider` hands the
 * line to SplitText, which re-masks it per *rendered* line and animates those
 * instead; this wrapper then just keeps the authored break.
 *
 * Must sit inside an element marked `data-reveal-group` — that is what collects
 * the lines of one heading into a single stagger. On its own it will not
 * animate at all.
 *
 * Deliberately not a client component — it only ships markup.
 */
export function MaskedText({
  children,
  className,
  as: As = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div";
}) {
  return (
    <As data-reveal="mask" className={cn("reveal-mask", className)}>
      <span className="block">{children}</span>
    </As>
  );
}
