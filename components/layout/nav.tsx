"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { navItems, person, type SectionId } from "@/content/site";

/**
 * Fixed masthead.
 *
 * Desktop reads as a running header in a technical document: the name on the
 * left, numbered section entries on the right, and a hairline read-out of
 * scroll progress along the bottom edge.
 *
 * Mobile collapses the entries behind an index overlay rather than shrinking
 * them into an unusable row.
 */
export function Nav() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useGSAP(
    () => {
      const progress = root.current?.querySelector("[data-nav-progress]");

      // Scroll read-out along the bottom hairline of the bar.
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );
      }

      // Background only once the hero is behind us, so the bar sits directly
      // on the page at rest.
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top+=120 top",
        onToggle: (self) => setLifted(self.isActive),
      });

      // Current section: whichever one owns the upper third of the viewport.
      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 35%",
          end: "bottom 35%",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
            else
              setActive((current) => (current === id ? null : current));
          },
        });
      });
    },
    { scope: root },
  );

  // Overlay is modal in spirit: lock the page and honour Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      ref={root}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        lifted && "bg-[color-mix(in_srgb,var(--ink-900)_84%,transparent)] backdrop-blur-xl",
      )}
    >
      <nav aria-label="Sections" className="shell">
        <div className="flex h-(--nav-h) items-center justify-between gap-6">
          <a
            href="#index"
            className="group flex items-baseline gap-2.5"
          >
            <span className="t-meta text-fg-1 transition-colors group-hover:text-signal">
              {person.name}
            </span>
            <span className="t-meta-sm hidden text-fg-4 sm:inline">
              {person.role}
            </span>
          </a>

          {/* Desktop entries */}
          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? "true" : undefined}
                    className="group flex items-baseline gap-2 py-1"
                  >
                    <span
                      className={cn(
                        "t-meta-sm tabular-nums transition-colors duration-300",
                        current ? "text-signal" : "text-fg-4",
                      )}
                    >
                      {item.ordinal}
                    </span>
                    <span
                      className={cn(
                        "t-meta transition-colors duration-300 group-hover:text-fg-1 group-focus-visible:text-fg-1",
                        current ? "text-fg-1" : "text-fg-3",
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="section-index"
            className="t-meta flex items-center gap-2.5 py-3 pl-1 text-fg-2 transition-colors hover:text-fg-1 md:hidden"
          >
            {open ? "Close" : "Index"}
            <span aria-hidden className="relative block h-2.5 w-3.5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                  open && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <div className="relative h-px w-full bg-[var(--rule)]">
          <span
            data-nav-progress
            aria-hidden
            className="absolute inset-0 origin-left bg-[var(--signal-dim)]"
          />
        </div>
      </nav>

      {/* Mobile index overlay */}
      <div
        id="section-index"
        inert={!open}
        className={cn(
          "fixed inset-0 top-(--nav-h) z-40 bg-ink-900/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="shell flex flex-col pt-6">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              style={{ transitionDelay: `${index * 45}ms` }}
              className={cn(
                "border-b border-[var(--rule)] transition-all duration-500 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <a
                href={`#${item.id}`}
                onClick={close}
                className="flex items-baseline gap-5 py-6"
              >
                <span className="t-meta-sm text-signal tabular-nums">
                  §{item.ordinal}
                </span>
                <span className="t-h3">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
