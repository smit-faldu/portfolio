"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

// Plugins are registered once, on the client only. GSAP's own SSR guards make
// the imports safe during server render, but registration is skipped anyway so
// nothing touches `document` before hydration.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrambleTextPlugin,
  );
}

/** Shared easing so every transition on the site shares one motion signature. */
export const EASE = "power3.out";

/**
 * The two gates every non-essential animation passes through.
 *
 * `MOTION_OK` is the honest reading of the reader's own setting — anything
 * decorative is skipped when it is false. `POINTER_FINE` additionally excludes
 * touch and stylus input, for effects that only exist because there is a
 * cursor to follow.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const POINTER_FINE = `(hover: hover) and (pointer: fine) and ${MOTION_OK}`;

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrambleTextPlugin,
  useGSAP,
};
