"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import resumeData from "@/data/resume.json";

export default function Contact() {
  return (
    <section className="py-32 px-8 md:px-24 max-w-7xl mx-auto mix-blend-difference w-full relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-6">03 / Connect</p>
        <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-12">Let's Build.</h2>
        
        <a 
          href={`mailto:${resumeData.personal.links.email}`} 
          className="group relative inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-8 py-4 rounded-full transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10 font-medium tracking-wide">{resumeData.personal.links.email}</span>
          <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0"></div>
          {/* Change text color on hover effectively via mix blend mode trick - simplified here */}
        </a>

        <div className="mt-32 flex gap-8 font-mono text-sm text-white/30">
          <a href={resumeData.personal.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={resumeData.personal.links.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={resumeData.personal.links.resume} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Resume</a>
        </div>
      </motion.div>
    </section>
  );
}
