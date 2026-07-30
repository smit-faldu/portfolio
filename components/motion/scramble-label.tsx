"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * A same-length stand-in for `text`, so the label occupies its final width
 * from the very first frame and the scramble never shifts the layout around it.
 *
 * Derived from the text rather than randomised: the resting state is then
 * stable across re-renders, and identical between two labels only if they were
 * identical to begin with.
 */
function placeholder(text: string) {
  return Array.from(text, (char, index) =>
    char === " " ? " " : ALPHABET[(char.charCodeAt(0) + index * 7) % 26],
  ).join("");
}

/**
 * A mono label that decodes itself as it comes into view.
 *
 * Used only on the section labels, where it reads as a machine resolving a
 * field rather than as decoration — the same register as the ordinals and
 * reference codes around it. Anywhere else on this site it would be noise.
 *
 * The real string is always in the DOM for assistive technology and for
 * readers who asked for less motion; only the visual copy is ever scrambled.
 */
export function ScrambleLabel({
  children: text,
  className,
}: {
  children: string;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const visual = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = visual.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Set before first paint, so the label is never seen resolved, then
        // scrambled — it simply arrives encoded.
        el.textContent = placeholder(text);

        const tween = gsap.to(el, {
          duration: 1.1,
          ease: "none",
          scrambleText: {
            text,
            chars: "upperCase",
            speed: 0.55,
            // Churn for a moment before letters start locking into place.
            revealDelay: 0.3,
            // The stand-in is already the right length; tweening it too would
            // reintroduce exactly the reflow the stand-in exists to prevent.
            tweenLength: false,
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });

        return () => {
          tween.kill();
          // Reverting a scramble mid-flight would otherwise strand the label on
          // a random frame.
          el.textContent = text;
        };
      });

      // Trigger positions are refreshed once for the whole page after the
      // webfonts settle — see `MotionProvider`. Doing it per label would mean
      // five identical full-document recalculations.
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <span ref={root} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={visual} aria-hidden>
        {text}
      </span>
    </span>
  );
}
