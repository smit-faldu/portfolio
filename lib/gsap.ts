"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Plugins are registered once, on the client only. GSAP's own SSR guards make
// the import safe during server render, but registration is skipped anyway so
// nothing touches `document` before hydration.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/** Shared easing so every transition on the site shares one motion signature. */
export const EASE = "power3.out";

export { gsap, ScrollTrigger, useGSAP };
