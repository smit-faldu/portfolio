import { motion } from 'framer-motion';
import Link from 'next/link';
import { parseResume } from '../../utils/resumeParser';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiHuggingface } from 'react-icons/si';

const Footer = () => {
  const resumeData = parseResume();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-secondary border-opacity-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#home" className="text-xl font-bold">
              <span className="text-accent">S</span>
              <span className="text-primary">mit</span>
            </Link>
            <p className="text-secondary mt-2 text-sm">
              AI/ML Engineer
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {resumeData.socialLinks.linkedin && (
              <a
                href={resumeData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {resumeData.socialLinks.github && (
              <a
                href={resumeData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300"
              >
                <FaGithub size={24} />
              </a>
            )}
            {resumeData.socialLinks.huggingface && (
              <a
                href={resumeData.socialLinks.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300"
              >
                <SiHuggingface size={24} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 border-t border-secondary border-opacity-20 pt-8 text-center text-secondary text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {currentYear} {resumeData.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;