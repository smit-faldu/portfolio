'use client';

import { motion } from 'framer-motion';
import { parseResume } from '../../utils/resumeParser';
import TiltEffect from '../layout/TiltEffect';

const Skills = () => {
  const resumeData = parseResume();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <motion.h3
              className="text-xl font-semibold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Languages & Frameworks
            </motion.h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {resumeData.skills.languagesAndFrameworks.map((skill, index) => (
                <TiltEffect key={index} intensity={5}>
                  <motion.div
                    className="card flex items-center justify-center p-4 text-center"
                    variants={item}
                    whileHover={{ scale: 1.05, borderColor: '#EAE4D5' }}
                  >
                    <span className="text-secondary">{skill}</span>
                  </motion.div>
                </TiltEffect>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.h3
              className="text-xl font-semibold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Technical Skills
            </motion.h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {resumeData.skills.technicalSkills.map((skill, index) => (
                <TiltEffect key={index} intensity={5}>
                  <motion.div
                    className="card flex items-center justify-center p-4 text-center"
                    variants={item}
                    whileHover={{ scale: 1.05, borderColor: '#EAE4D5' }}
                  >
                    <span className="text-secondary">{skill}</span>
                  </motion.div>
                </TiltEffect>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;