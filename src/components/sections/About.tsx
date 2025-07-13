'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { parseResume } from '../../utils/resumeParser';

const About = () => {
  const resumeData = parseResume();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Mouse parallax effect
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-background" ref={sectionRef}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ 
              y: y1,
              x: mousePosition.x * -20 // Subtle mouse movement effect
            }}
          >
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden bg-accent bg-opacity-10 border border-accent border-opacity-20">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-accent"
                style={{
                  x: mousePosition.x * 30, // More pronounced movement for the icon
                  y: mousePosition.y * 30
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-1/3"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ 
              y: y2,
              x: mousePosition.x * 10 // Subtle mouse movement effect
            }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">
              AI/ML Engineer based in {resumeData.location}
            </h3>
            <p className="text-secondary mb-6 leading-relaxed">
              {resumeData.summary}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-accent font-medium">Name:</p>
                <p className="text-secondary">{resumeData.name}</p>
              </div>
              <div>
                <p className="text-accent font-medium">Email:</p>
                <p className="text-secondary">{resumeData.email}</p>
              </div>
              <div>
                <p className="text-accent font-medium">Location:</p>
                <p className="text-secondary">{resumeData.location}</p>
              </div>
              <div>
                <p className="text-accent font-medium">Phone:</p>
                <p className="text-secondary">{resumeData.phone}</p>
              </div>
            </div>

            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 bg-accent text-background font-medium rounded-md hover:bg-opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;