import { ImageResponse } from "next/og";
import { person, projects } from "@/content/site";

export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, built from the same parts as the page: hairline rules, mono
 * metadata, one oversized statement. Satori supports flexbox only, so this is
 * composed with nested rows rather than the grid used on the site.
 */
export default function OpenGraphImage() {
  const rule = "rgba(233,236,238,0.14)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090A",
          color: "#E9ECEE",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Masthead */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", height: 1, background: rule }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#767D82",
            }}
          >
            <span style={{ color: "#E9ECEE" }}>{person.name}</span>
            <span>{person.role}</span>
            <span>Ahmedabad, IN</span>
          </div>
        </div>

        {/* Statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: -4,
            fontWeight: 500,
          }}
        >
          <span>I build systems that</span>
          <span>reason, retrieve, and act.</span>
        </div>

        {/* Specification */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", height: 1, background: rule }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#767D82",
            }}
          >
            <span>Generative AI · Agentic Systems · LLMs</span>
            <span style={{ color: "#F0B341" }}>
              §01 — {String(projects.length).padStart(2, "0")} Selected Systems
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
