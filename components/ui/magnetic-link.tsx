"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * A link that leans toward the cursor.
 *
 * Used once, on the email address — the single most important action on the
 * page. Pointer tracking is skipped entirely on coarse pointers and when
 * reduced motion is requested, so it costs nothing where it would not be felt.
 */
export function MagneticLink({
  href,
  children,
  className,
  cursorLabel,
  strength = 0.22,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Verb shown inside the cursor while this link is under it. */
  cursorLabel?: string;
  /** Fraction of the cursor offset the link travels. */
  strength?: number;
}) {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el || !contextSafe) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const move = contextSafe((event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            gsap.to(el, {
              x: (event.clientX - (rect.left + rect.width / 2)) * strength,
              y: (event.clientY - (rect.top + rect.height / 2)) * strength * 1.6,
              duration: 0.7,
              ease: "power3.out",
            });
          });

          const reset = contextSafe(() => {
            gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
          });

          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", reset);
          el.addEventListener("blur", reset);

          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", reset);
            el.removeEventListener("blur", reset);
            gsap.set(el, { x: 0, y: 0 });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <a
      ref={root}
      href={href}
      data-cursor-label={cursorLabel}
      className={cn(
        "link-draw will-change-transform",
        className,
      )}
    >
      {children}
    </a>
  );
}
