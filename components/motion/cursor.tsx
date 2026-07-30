"use client";

import { useRef } from "react";
import { POINTER_FINE, gsap, useGSAP } from "@/lib/gsap";

/**
 * Anything worth reacting to. `[data-cursor-label]` opts an element into the
 * labelled state; everything else here gets the plain interactive one.
 */
const INTERACTIVE =
  'a[href], button, summary, [role="button"], input, textarea, select, [data-cursor-label]';

/** Resting geometry of the ring, in pixels. */
const RING = 38;

type State = "idle" | "interactive" | "labelled";

/**
 * A two-part cursor: a dot that is exactly where you are, and a ring that is
 * always slightly behind.
 *
 * The lag is the whole point — it gives the pointer mass, so the page feels
 * like it has weight. The dot stays honest at the real coordinate, which is
 * what makes it safe to hide the system cursor: nothing about pointing gets
 * less precise, and the ring is free to become an indicator.
 *
 * Three states. At rest it is a hairline ring, blended against whatever is
 * beneath it. Over anything interactive it opens up and the dot steps aside.
 * Over an element carrying `data-cursor-label` it fills with signal amber and
 * says what the thing does — a tooltip that costs no layout.
 *
 * Built only where it can be felt: fine pointers, motion allowed. On touch and
 * for reduced-motion readers this component mounts and does nothing, and the
 * system cursor is never taken away.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;
      const mm = gsap.matchMedia();

      mm.add(POINTER_FINE, () => {
        const ringEl = ring.current!;
        const dotEl = dot.current!;
        const labelEl = label.current!;

        // Centre both parts on their own coordinate so `x`/`y` are the pointer
        // position, not a top-left corner to keep correcting for.
        gsap.set([ringEl, dotEl], { xPercent: -50, yPercent: -50 });
        gsap.set(ringEl, { width: RING, height: RING });

        // quickTo keeps one reusable tween per property instead of allocating a
        // new one on every pointermove — the difference is measurable at 120Hz.
        const ringX = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3" });
        const ringY = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3" });
        const dotX = gsap.quickTo(dotEl, "x", { duration: 0.1, ease: "power3" });
        const dotY = gsap.quickTo(dotEl, "y", { duration: 0.1, ease: "power3" });

        let state: State = "idle";
        let visible = false;

        // Faded on the parts themselves, never on `.cursor-root` — a parent with
        // opacity below 1 isolates the blend mode and the ring would stop
        // inverting against the page.
        const show = () => {
          if (visible) return;
          visible = true;
          document.documentElement.classList.add("cursor-custom");
          gsap.to([ringEl, dotEl], {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const hide = () => {
          if (!visible) return;
          visible = false;
          document.documentElement.classList.remove("cursor-custom");
          gsap.to([ringEl, dotEl], {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const setState = (next: State, text: string | null) => {
          if (next === state && next !== "labelled") return;
          state = next;

          if (text !== null) labelEl.textContent = text;
          ringEl.classList.toggle("is-labelled", next === "labelled");

          gsap.to(ringEl, {
            width: next === "labelled" ? 74 : next === "interactive" ? 62 : RING,
            height: next === "labelled" ? 74 : next === "interactive" ? 62 : RING,
            borderColor: next === "interactive" ? "var(--fg-1)" : "var(--fg-3)",
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(labelEl, {
            autoAlpha: next === "labelled" ? 1 : 0,
            duration: 0.25,
            ease: "power2.out",
          });

          // The dot would only sit inside the open ring competing with it.
          gsap.to(dotEl, {
            scale: next === "idle" ? 1 : 0,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        const onMove = contextSafe((event: PointerEvent) => {
          ringX(event.clientX);
          ringY(event.clientY);
          dotX(event.clientX);
          dotY(event.clientY);
          // The first move is the first time the real position is known — until
          // then the cursor would be parked in the top-left corner.
          if (!visible) {
            gsap.set([ringEl, dotEl], { x: event.clientX, y: event.clientY });
            show();
          }
        });

        const onOver = contextSafe((event: PointerEvent) => {
          const target = (event.target as Element | null)?.closest?.(INTERACTIVE);
          if (!target) {
            setState("idle", null);
            return;
          }
          const text = target.getAttribute("data-cursor-label");
          if (text) setState("labelled", text);
          else setState("interactive", null);
        });

        const onDown = contextSafe(() => {
          gsap.to(ringEl, { scale: 0.82, duration: 0.2, ease: "power3.out" });
        });

        const onUp = contextSafe(() => {
          gsap.to(ringEl, { scale: 1, duration: 0.35, ease: "power3.out" });
        });

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointerleave", hide);
        // Dragging out of the window, or a tab switch mid-move, both otherwise
        // leave the cursor stranded on screen.
        window.addEventListener("blur", hide);

        return () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerover", onOver);
          window.removeEventListener("pointerdown", onDown);
          window.removeEventListener("pointerup", onUp);
          document.removeEventListener("pointerleave", hide);
          window.removeEventListener("blur", hide);
          document.documentElement.classList.remove("cursor-custom");
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="cursor-root">
      <div ref={ring} className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
