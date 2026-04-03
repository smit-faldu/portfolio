"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import resumeData from "@/data/resume.json";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start pt-20 px-8 md:px-24 max-w-7xl mx-auto mix-blend-difference w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center gap-16"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
          <Image
            src="/profile.jpg"
            alt="Smit Faldu"
            fill
            sizes="(max-width: 768px) 192px, 256px"
            className="object-cover object-center"
            priority
          />
        </div>
        
        <div className="flex flex-col gap-6 text-left">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
            >
              {resumeData.personal.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="flex items-center gap-3 mt-4"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <h2 className="text-xl md:text-2xl font-mono text-white/50 tracking-widest uppercase">
                {resumeData.personal.title}
              </h2>
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed"
          >
            {resumeData.personal.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
            className="flex items-center gap-4 mt-2"
          >
            <a 
              href={resumeData.personal.links.github} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 border border-white/10 hover:border-white/50 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full text-white/70 hover:text-white transition-all duration-300"
            >
              <FaGithub className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider">GitHub</span>
            </a>
            <a 
              href={resumeData.personal.links.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 border border-white/10 hover:border-white/50 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full text-white/70 hover:text-white transition-all duration-300"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider">LinkedIn</span>
            </a>
            <a 
              href={resumeData.personal.links.resume} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 border border-white/10 hover:border-white/50 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full text-white/70 hover:text-white transition-all duration-300"
            >
              <FaFileAlt className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider">Resume</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
