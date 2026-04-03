"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// Dynamically import the Scene component to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full h-full min-h-screen bg-black overflow-hidden z-0">
      {/* 3D Background */}
      <Scene />

      {/* Foreground Scrollable Content */}
      <div className="relative z-10 w-full h-full overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
