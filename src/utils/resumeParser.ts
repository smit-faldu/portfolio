import resumeData from './resumeData.json';

export interface ResumeData {
  name: string;
  location: string;
  phone: string;
  email: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    huggingface?: string;
    [key: string]: string | undefined;
  };
  summary: string;
  workExperience: Array<{
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
  }>;
  skills: {
    languagesAndFrameworks: string[];
    technicalSkills: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  projects: Array<{
    title: string;
    technologies: string[];
    description: string[];
  }>;
}

export function parseResume(): ResumeData {
  return resumeData as ResumeData;
}