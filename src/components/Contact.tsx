// src/components/Contact.tsx
"use client";

import { motion, easeOut } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import resumeData from "@/data/resume.json";

// Shared animation variants for scroll reveal
const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scrollItemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: easeOut },
  },
};

export default function Contact() {
  const phoneNumber = (resumeData.personal.links as any).phone || "+91 98765 43210";

  return (
    <section className="py-32 px-8 md:px-24 max-w-7xl mx-auto mix-blend-difference w-full relative z-10 flex flex-col items-center text-center">
      <motion.div
        variants={scrollContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers slightly before it fully enters the screen
        className="flex flex-col items-center"
      >
        <motion.p variants={scrollItemVariants} className="text-white/40 font-mono text-sm tracking-widest uppercase mb-6">
          03 / Connect
        </motion.p>

        <motion.h2 variants={scrollItemVariants} className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-12">
          Let's Build.
        </motion.h2>

        <motion.div variants={scrollItemVariants} className="flex flex-col sm:flex-row gap-6">
          <a
            href={`mailto:${resumeData.personal.links.email}`}
            className="group relative inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white text-white px-8 py-4 rounded-full transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 font-medium tracking-wide group-hover:text-black transition-colors duration-500">
              {resumeData.personal.links.email}
            </span>
            <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 group-hover:text-black transition-all duration-500" />
            <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0"></div>
          </a>

          <a
            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
            className="group relative inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white text-white px-8 py-4 rounded-full transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 font-medium tracking-wide group-hover:text-black transition-colors duration-500">
              {phoneNumber}
            </span>
            <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 group-hover:text-black transition-all duration-500" />
            <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0"></div>
          </a>
        </motion.div>

        <motion.div variants={scrollItemVariants} className="mt-32 flex gap-8 font-mono text-sm text-white/30">
          <a href={resumeData.personal.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={resumeData.personal.links.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={resumeData.personal.links.resume} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Resume</a>
        </motion.div>
      </motion.div>
    </section>
  );
}