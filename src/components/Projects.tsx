// src/components/Projects.tsx
"use client";

import { motion, easeOut } from "framer-motion";
import resumeData from "@/data/resume.json";

// Shared animation variants
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

export default function Projects() {
  return (
    <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto mix-blend-difference w-full relative z-10">
      <motion.div
        variants={scrollContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h3 variants={scrollItemVariants} className="text-sm font-mono text-white/40 tracking-widest uppercase mb-16 border-t border-white/10 pt-10">
          02 / Projects
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {resumeData.projects.map((proj, idx) => (
            <motion.div variants={scrollItemVariants} key={idx} className="group cursor-default">
              <h4 className="text-2xl font-medium text-white mb-4 group-hover:text-white/80 transition-colors">{proj.title}</h4>
              <p className="text-white/50 font-light leading-relaxed mb-6 h-auto md:h-24">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-white/30 tracking-wider">
                    [{t}]
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}