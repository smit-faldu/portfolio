// src/components/Experience.tsx
"use client";

import { motion, easeOut } from "framer-motion";
import resumeData from "@/data/resume.json";

// Shared animation variants
const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Slightly slower stagger for large blocks of text
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

export default function Experience() {
  return (
    <section className="min-h-screen py-24 px-8 md:px-24 max-w-7xl mx-auto mix-blend-difference w-full relative z-10 flex flex-col justify-center">
      <motion.div
        variants={scrollContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h3 variants={scrollItemVariants} className="text-sm font-mono text-white/40 tracking-widest uppercase mb-12">
          01 / Experience
        </motion.h3>

        <div className="flex flex-col gap-24">
          {resumeData.experience.map((exp, idx) => (
            <motion.div variants={scrollItemVariants} key={idx} className="flex flex-col md:flex-row gap-8 md:gap-32 w-full justify-between items-start border-t border-white/10 pt-10 group">
              <div className="w-full md:w-1/3">
                <h4 className="text-3xl font-semibold text-white tracking-tight">{exp.company}</h4>
                <p className="text-white/40 mt-2 font-mono text-sm">{exp.date}</p>
                <p className="text-white/60 mt-1">{exp.role}</p>
              </div>

              <div className="w-full md:w-2/3">
                <ul className="space-y-6 text-white/50 text-lg font-light group-hover:text-white/80 transition-colors duration-700">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      <span className="text-white block mb-1">{pt.title}</span>
                      {pt.description}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Area */}
        <motion.div variants={scrollItemVariants} className="mt-32 border-t border-white/10 pt-10">
          <h4 className="text-xl font-medium text-white mb-8">Core Technologies</h4>
          <div className="flex flex-wrap gap-3 gap-y-4">
            {resumeData.skills.map((tech) => (
              <span key={tech} className="px-4 py-2 border border-white/10 rounded-full text-sm font-light text-white/60 hover:text-white hover:border-white/30 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}