'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { parseResume } from '../../utils/resumeParser';
import TiltEffect from '../layout/TiltEffect';

const Projects = () => {
  const resumeData = parseResume();
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {resumeData.projects.map((project, index) => (
            <TiltEffect 
              key={index} 
              intensity={activeProject === index ? 0 : 3}
              className={`${activeProject === index ? 'md:col-span-2' : ''}`}
            >
              <motion.div
                className="card overflow-hidden transition-all duration-300"
                variants={item}
                whileHover={{ y: -5 }}
                onClick={() => setActiveProject(activeProject === index ? null : index)}
              >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                  <button
                    className="text-secondary hover:text-accent transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(activeProject === index ? null : index);
                    }}
                  >
                    {activeProject === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-accent bg-opacity-10 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeProject === index ? 'max-h-[1000px]' : 'max-h-24'
                  }`}
                >
                  <ul className="space-y-2 text-secondary">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeProject !== index && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
                )}

                {activeProject !== index && (
                  <button
                    className="mt-4 text-accent hover:text-primary transition-colors duration-300 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(index);
                    }}
                  >
                    Read more
                  </button>
                )}
              </div>
            </motion.div>
            </TiltEffect>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;