import { Footer } from "@/components/layout/footer";
import { GridRules } from "@/components/layout/grid-rules";
import { Nav } from "@/components/layout/nav";
import { Cursor } from "@/components/motion/cursor";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Trajectory } from "@/components/sections/trajectory";
import { Work } from "@/components/sections/work";
import { contact, person, projects, siteUrl } from "@/content/site";

/**
 * Structured data, so the profile and its projects are legible to crawlers
 * and not only to readers.
 */
function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.summary,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: [contact.github.url, contact.linkedin.url],
    knowsAbout: [
      "Generative AI",
      "Agentic AI Systems",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Multi-Agent Architectures",
      "Natural Language Processing",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "SAL Institute of Technology & Engineering Research",
    },
    subjectOf: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      keywords: project.stack.join(", "),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Build-time constant; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <StructuredData />

      <a
        href="#main"
        className="sr-only-focusable fixed top-4 left-4 z-100 border border-signal bg-ink-900 px-4 py-2.5"
      >
        <span className="t-meta text-signal">Skip to content</span>
      </a>

      {/*
        Everything fixed to the viewport stays outside SmoothScroll: its wrapper
        is transformed on every frame, and anything inside would be carried
        along with the page instead of staying put.
      */}
      <GridRules />
      <Nav />
      <Cursor />

      <SmoothScroll>
        <MotionProvider>
          {/* tabIndex allows the skip link to move focus here, not just scroll. */}
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <Work />
            <Capabilities />
            <Trajectory />
            <Contact />
          </main>
          <Footer />
        </MotionProvider>
      </SmoothScroll>
    </>
  );
}
