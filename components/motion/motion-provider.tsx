"use client";

import { useRef, type ReactNode } from "react";
import {
  EASE,
  MOTION_OK,
  ScrollTrigger,
  SplitText,
  gsap,
  useGSAP,
} from "@/lib/gsap";

/**
 * The site's only motion controller.
 *
 * Sections stay server-rendered and simply mark elements with data attributes;
 * this island reads them once on mount and wires the choreography. That keeps
 * client-side JS to a single component instead of one island per animated
 * section, and keeps the animation vocabulary in one reviewable place.
 *
 * Initial (hidden) states are declared in CSS — see `globals.css` — so nothing
 * flashes before hydration, and reduced-motion / no-JS visitors get the final
 * state without waiting on this file at all.
 *
 * Contract:
 *   [data-hero-line]     — hero headline line; split to characters and raised
 *   [data-hero-item]     — hero supporting element, faded in after the lines
 *   [data-hero-rule]     — hero hairline, drawn on load
 *   [data-reveal-group]  — heading whose masked lines reveal as one stagger
 *   [data-reveal]        — rises + fades when scrolled into view
 *   [data-reveal="mask"] — a line inside a group; split and masked
 *   [data-reveal-batch]  — direct children reveal together, lightly staggered
 *   [data-rule-draw]     — hairline that draws horizontally on entry
 *
 * `[data-speed]` and `[data-lag]` are read by `SmoothScroll`, not here.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const mm = gsap.matchMedia();

      // ── Reduced motion: no travel, no scrub. The content simply exists. ──
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          q(
            "[data-hero-line] > *, [data-hero-item], [data-reveal], [data-reveal-batch] > *, [data-reveal='mask'] > *",
          ),
          { opacity: 1, y: 0, yPercent: 0 },
        );
        gsap.set(q("[data-hero-rule], [data-rule-draw]"), { scaleX: 1 });
      });

      mm.add(MOTION_OK, () => {
        /* ── Hero entrance ───────────────────────────────────────────── */
        const heroLines = q("[data-hero-line] > *");
        const heroItems = q("[data-hero-item]");
        const heroRules = q("[data-hero-rule]");

        if (heroLines.length) {
          /*
           * The thesis is set at display size and wraps differently at every
           * width, so the mask has to follow the *rendered* lines rather than
           * the authored ones. SplitText measures them, wraps each in its own
           * clip, and `autoSplit` re-measures whenever the webfont lands or the
           * column changes width — returning the timeline from `onSplit` lets
           * it carry its progress across that re-measure instead of replaying.
           */
          SplitText.create(heroLines, {
            type: "lines,words,chars",
            mask: "lines",
            linesClass: "split-line",
            // The <h1> already carries the full statement for screen readers,
            // and these spans are aria-hidden; nothing to relabel.
            aria: "none",
            autoSplit: true,
            onSplit(self) {
              // Hand over from the pre-hydration guard in CSS: the parent stops
              // being the thing that hides the text, and the characters take
              // over. Both happen before paint, so there is nothing to see.
              gsap.set(heroLines, { yPercent: 0, y: 0 });

              const intro = gsap.timeline({
                defaults: { ease: EASE },
                delay: 0.12,
              });

              if (heroRules.length) {
                intro.fromTo(
                  heroRules,
                  { scaleX: 0 },
                  {
                    scaleX: 1,
                    duration: 1.1,
                    stagger: 0.07,
                    ease: "power2.inOut",
                  },
                  0,
                );
              }

              intro.from(
                self.chars,
                {
                  yPercent: 118,
                  duration: 1,
                  // Tight enough to read as one gesture sweeping across the
                  // line, not as fifty separate letters arriving.
                  stagger: { each: 0.016 },
                },
                0.06,
              );

              if (heroItems.length) {
                intro.fromTo(
                  heroItems,
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.85, stagger: 0.07 },
                  0.5,
                );
              }

              return intro;
            },
          });
        }

        /* ── Headings ────────────────────────────────────────────────── */
        // One stagger per heading, so a two-line title reads as a single
        // gesture rather than two lines that happen to move at once.
        q("[data-reveal-group]").forEach((group) => {
          const lines = gsap.utils.toArray<HTMLElement>(
            group.querySelectorAll("[data-reveal='mask'] > *"),
          );
          if (!lines.length) return;

          SplitText.create(lines, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            aria: "none",
            autoSplit: true,
            onSplit(self) {
              gsap.set(lines, { yPercent: 0, y: 0 });

              return gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.05,
                ease: EASE,
                stagger: 0.08,
                scrollTrigger: { trigger: group, start: "top 88%", once: true },
              });
            },
          });
        });

        /* ── Rise + fade ─────────────────────────────────────────────── */
        q("[data-reveal]")
          .filter((el) => (el as HTMLElement).dataset.reveal !== "mask")
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 26 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: EASE,
                delay: Number((el as HTMLElement).dataset.revealDelay ?? 0),
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              },
            );
          });

        /* ── Grouped children ────────────────────────────────────────── */
        q("[data-reveal-batch]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: EASE,
              stagger: 0.045,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        /* ── Drawn hairlines ─────────────────────────────────────────── */
        q("[data-rule-draw]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top 96%", once: true },
            },
          );
        });
      });

      // Late-loading webfonts change text metrics; recompute trigger positions
      // once they settle so reveals don't fire against stale offsets.
      if ("fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
