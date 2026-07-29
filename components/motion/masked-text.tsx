import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One line of text behind a mask. `MotionProvider` slides the inner span up
 * from below the overflow edge; before that it is simply hidden by the mask,
 * so there is nothing to flash on first paint.
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
