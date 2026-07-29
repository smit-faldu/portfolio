"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
 *   [data-hero-line]     — hero headline line; its child is masked and raised
 *   [data-hero-item]     — hero supporting element, faded in after the lines
 *   [data-hero-rule]     — hero hairline, drawn on load
 *   [data-reveal]        — rises + fades when scrolled into view
 *   [data-reveal="mask"] — children slide up from behind the element's mask
 *   [data-reveal-batch]  — direct children reveal together, lightly staggered
 *   [data-rule-draw]     — hairline that draws horizontally on entry
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

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Hero entrance ───────────────────────────────────────────── */
        const heroLines = q("[data-hero-line] > *");
        const heroItems = q("[data-hero-item]");
        const heroRules = q("[data-hero-rule]");

        const intro = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });

        if (heroRules.length) {
          intro.fromTo(
            heroRules,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, stagger: 0.07, ease: "power2.inOut" },
            0,
          );
        }
        if (heroLines.length) {
          intro.fromTo(
            heroLines,
            { yPercent: 108, y: 0 },
            { yPercent: 0, duration: 1.15, stagger: 0.085 },
            0.05,
          );
        }
        if (heroItems.length) {
          intro.fromTo(
            heroItems,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.07 },
            0.45,
          );
        }

        /* ── Masked text reveals ─────────────────────────────────────── */
        q("[data-reveal='mask']").forEach((el) => {
          gsap.fromTo(
            el.children,
            { yPercent: 108, y: 0 },
            {
              yPercent: 0,
              duration: 1.05,
              ease: EASE,
              stagger: 0.07,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
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
