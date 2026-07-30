"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_OK, ScrollSmoother, gsap, useGSAP } from "@/lib/gsap";

/**
 * Distance to hold back from an anchor target so the fixed masthead does not
 * cover the heading you just jumped to.
 *
 * Read from `scroll-padding-top`, which already declares exactly this for the
 * native scroller — one number, honoured by both paths.
 */
function anchorOffset() {
  const declared = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(declared);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Momentum scrolling for the whole document.
 *
 * ScrollSmoother takes the page out of the native scroller and drives it on a
 * transform instead, which is what gives the site its weight — scrolling now
 * has inertia, and every `data-speed` / `data-lag` element drifts against it.
 *
 * Three deliberate limits:
 *
 *   • Reduced motion gets the native scroller, untouched. No wrapper is
 *     created at all, so there is nothing to feel and nothing to go wrong.
 *   • Touch keeps native scrolling (`smoothTouch: false`). Fighting a
 *     platform's own scroll physics with a rewritten one always loses.
 *   • Fixed chrome — the masthead, the drafting rules, the cursor — stays
 *     *outside* the wrapper. Anything inside is transformed with the page.
 *
 * Because the document is no longer the scroller, `href="#id"` jumps stop
 * working on their own; the delegated handler below restores them.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP((_context, contextSafe) => {
    if (!contextSafe) return;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        // Seconds for the page to catch up to the real scroll position. Past
        // ~1.5 the lag reads as unresponsive rather than heavy.
        smooth: 1.15,
        // Activates [data-speed] and [data-lag] anywhere in the content.
        effects: true,
        smoothTouch: false,
        // The mobile address bar collapsing is not a layout change worth
        // recomputing every trigger position for.
        ignoreMobileResize: true,
      });

      const onClick = contextSafe((event: MouseEvent) => {
        // Leave modified clicks to the browser — they open tabs and windows.
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const anchor = (event.target as Element | null)?.closest?.("a");
        if (!anchor) return;

        // Same document, and actually pointing at a fragment.
        const url = new URL(anchor.href, location.href);
        if (
          url.origin !== location.origin ||
          url.pathname !== location.pathname ||
          url.search !== location.search ||
          !url.hash
        ) {
          return;
        }

        const id = decodeURIComponent(url.hash.slice(1));
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        // The mobile index overlay pauses the smoother while open; a click on
        // one of its entries is also the moment it closes.
        smoother.paused(false);
        smoother.scrollTo(
          smoother.offset(target, "top top") - anchorOffset(),
          true,
        );

        // Keep the address bar shareable, and — for targets that opted into
        // focus, like the skip link's `#main` — move the keyboard caret too.
        history.pushState(null, "", url.hash);
        if (target.hasAttribute("tabindex")) {
          target.focus({ preventScroll: true });
        }
      });

      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        smoother.kill();
      };
    });

    return () => mm.revert();
  });

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
