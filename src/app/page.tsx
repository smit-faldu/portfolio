// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// Dynamically import the Scene component
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full bg-[#050505] selection:bg-white/30 text-white min-h-screen">
      
      {/* 3D Background - Fixed in place, pointer-events-none so we can click links */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Foreground Scrollable HTML */}
      <div className="relative z-10 w-full flex flex-col pointer-events-auto">
        <div className="min-h-screen flex items-center">
          <Hero />
        </div>
        <div className="min-h-screen flex items-center">
          <Experience />
        </div>
        <div className="min-h-screen flex items-start pt-32">
          <Projects />
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <Contact />
        </div>
      </div>

    </main>
  );
}