'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { parseResume } from '../../utils/resumeParser';
import { FaDownload } from 'react-icons/fa';

const Hero = () => {
  const resumeData = parseResume();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-accent mb-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {resumeData.name.split(' ')[0]}{' '}
            <span className="text-accent">{resumeData.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.div
            className="text-2xl md:text-3xl text-secondary mb-8 h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                'AI/ML Engineer',
                2000,
                'NLP Specialist',
                2000,
                'LLM Developer',
                2000,
                'RAG Pipeline Builder',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {resumeData.summary.split('.')[0] + '.'}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-accent text-background font-medium rounded-md hover:bg-opacity-90 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-white bg-opacity-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-accent text-accent font-medium rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-accent bg-opacity-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1w33qgoH4p-hq40HoRrGPa5VjFlBeM-tS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-secondary text-primary font-medium rounded-md hover:bg-opacity-80 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download Resume</span>
              <span className="absolute inset-0 bg-white bg-opacity-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        >
          <a href="#about" className="text-secondary hover:text-accent transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;