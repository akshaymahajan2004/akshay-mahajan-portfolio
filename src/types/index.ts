export type CursorState = 'normal' | 'hover-link' | 'hover-project' | 'hover-skill' | 'click';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  caseStudy?: string;
  tech: string[];
  year: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  visualType?: 'canvas-ai' | 'canvas-market' | 'canvas-audio' | 'canvas-editorial';
  imageUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & Cloud' | 'AI & Data' | 'Design & Tools';
  description: string;
  iconName?: string;
  priority?: number;
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  highlights?: string[];
}

export interface PortfolioDB {
  projects: Project[];
  skills: Skill[];
  experiences: ExperienceItem[];
  about: {
    heroStatement: string;
    subStatement: string;
    location: string;
    bioParagraphs: string[];
    philosophyQuote: string;
    contactEmail: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
      resume: string;
    };
  };
}
