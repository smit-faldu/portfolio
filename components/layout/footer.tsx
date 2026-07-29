import { navItems, person } from "@/content/site";

/**
 * Colophon.
 *
 * A technical document ends by declaring how it was made. It also doubles as
 * the second navigation surface, which is why the section index repeats here.
 */
export function Footer() {
  return (
    <footer className="relative z-1 pb-10">
      <div className="shell">
        <div className="h-px w-full bg-[var(--edge)]" aria-hidden />

        <div className="grid gap-x-8 gap-y-10 pt-8 md:grid-cols-12">
          <div className="col-span-full flex flex-col gap-2 md:col-span-4">
            <p className="t-meta text-fg-1">{person.name}</p>
            <p className="t-meta-sm text-fg-4">{person.role}</p>
          </div>

          <nav
            aria-label="Sections"
            className="col-span-full md:col-span-4 md:col-start-6"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href="#index" className="link-draw t-meta-sm text-fg-3">
                  §00 Index
                </a>
              </li>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-draw t-meta-sm text-fg-3"
                  >
                    §{item.ordinal} {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-full flex flex-col gap-2 md:col-span-3 md:col-start-10">
            <p className="t-meta-sm text-fg-4">Colophon</p>
            <p className="t-meta-sm text-fg-3">
              Set in Archivo, Instrument Serif and IBM Plex Mono. Built with
              Next.js and GSAP.
            </p>
          </div>
        </div>

        <p className="t-meta-sm pt-10 text-fg-4">
          © {new Date().getFullYear()} {person.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
