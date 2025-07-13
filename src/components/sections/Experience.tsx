'use client';

import { motion } from 'framer-motion';
import { parseResume } from '../../utils/resumeParser';

const Experience = () => {
  const resumeData = parseResume();

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Work Experience
        </motion.h2>

        <div className="space-y-12">
          {resumeData.workExperience.map((job, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                  <p className="text-accent">{job.company}</p>
                </div>
                <p className="text-secondary mt-2 md:mt-0">{job.period}</p>
              </div>
              <ul className="space-y-2 text-secondary">
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Education</h2>
          <div className="space-y-8 mt-8">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{edu.institution}</h3>
                    <p className="text-accent">{edu.degree}</p>
                  </div>
                  <p className="text-secondary mt-2 md:mt-0">{edu.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;