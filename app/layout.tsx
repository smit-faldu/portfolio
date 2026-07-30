import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { contact, person, siteUrl } from "@/content/site";

/*
 * Three families, three jobs, no overlap:
 *   Archivo          — structure and display. Industrial grotesk, tight fit.
 *   Instrument Serif — one emphasised idea per section, in italic.
 *   IBM Plex Mono    — every piece of metadata, numbering and specification.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${person.name} — ${person.role}`;
const description =
  "AI/ML engineer building generative and agentic systems: multi-agent frameworks, RAG pipelines and autonomous workflows with LangChain, LangGraph, AutoGen and FastAPI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${person.name}`,
  },
  description,
  applicationName: `${person.name} — Portfolio`,
  authors: [{ name: person.name, url: contact.github.url }],
  creator: person.name,
  keywords: [
    "Smit Faldu",
    "AI Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "Agentic AI",
    "LLM Engineer",
    "LangGraph",
    "LangChain",
    "AutoGen",
    "RAG",
    "FastAPI",
    "Ahmedabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: person.name,
    title,
    description,
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /*
       * Deliberately no `data-scroll-behavior="smooth"`.
       *
       * That attribute opts into Next's scroll-behaviour override for route
       * transitions, and it implements it by writing `scroll-behavior: smooth`
       * as an *inline* style on this element — which outranks every stylesheet
       * rule, including the one ScrollSmoother needs to switch off. There are no
       * route transitions on a single-page document to override anyway.
       *
       * Anchor scrolling is handled in CSS (`scroll-behavior`) for the native
       * path, and by `SmoothScroll` when the smoother is running.
       */
      className={`${archivo.variable} ${instrumentSerif.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        {/*
          Without JavaScript the entrance animations never run, so the elements
          they would have revealed must be shown as-is rather than left hidden.
        */}
        <noscript>
          <style>{`[data-hero-line] > *,[data-hero-item],[data-reveal],[data-reveal="mask"] > *,[data-reveal-batch] > *{opacity:1!important;transform:none!important}[data-hero-rule],[data-rule-draw]{transform:scaleX(1)!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
