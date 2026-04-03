// src/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="w-full px-8 md:px-24 max-w-7xl mx-auto pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Apple-style custom ease
        className="flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full animate-pulse" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            {resumeData.personal.title}
          </p>
        </div>

        {/* Massive, tight typography. No mix-blend-difference, just crisp rendering */}
        <h1 className="text-6xl md:text-[8rem] leading-[0.9] font-bold tracking-tighter text-white">
          SMIT<br />FALDU.
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-lg font-light leading-relaxed mt-4 border-l border-white/20 pl-6 backdrop-blur-sm">
          {resumeData.personal.summary}
        </p>

        <div className="flex items-center gap-6 mt-8">
          {/* Minimalist raw links instead of pill buttons for a more editorial feel */}
          <a href={resumeData.personal.links.github} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <FaGithub className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest relative overflow-hidden">
              GitHub
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </span>
          </a>
          <a href={resumeData.personal.links.linkedin} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <FaLinkedin className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest relative overflow-hidden">
              LinkedIn
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </span>
          </a>
          <a href={resumeData.personal.links.resume} className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <FaFileAlt className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest relative overflow-hidden">
              Resume
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}