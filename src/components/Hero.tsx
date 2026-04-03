// src/components/Hero.tsx
"use client";

import { motion, cubicBezier } from "framer-motion";
import resumeData from "@/data/resume.json";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

// Define the animation sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each text element
      delayChildren: 0.2,    // Wait a moment before starting
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: cubicBezier(0.16, 1, 0.3, 1) }, // Apple-style custom ease
  },
};

export default function Hero() {
  return (
    <section className="w-full px-8 md:px-24 max-w-7xl mx-auto pointer-events-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <div className="w-3 h-3 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full animate-pulse" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            {resumeData.personal.title}
          </p>
        </motion.div>

        {/* Massive, tight typography. */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-[8rem] leading-[0.9] font-bold tracking-tighter text-white">
          SMIT<br />FALDU.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/50 max-w-lg font-light leading-relaxed mt-4 border-l border-white/20 pl-6 backdrop-blur-sm">
          {resumeData.personal.summary}
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center gap-6 mt-8">
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
        </motion.div>
      </motion.div>
    </section>
  );
}