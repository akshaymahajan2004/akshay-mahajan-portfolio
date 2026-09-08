'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, FileText } from 'lucide-react';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';
import { ResumeModal } from '../ui/ResumeModal';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  isModal?: boolean;
}

export const ContactSection: React.FC = () => {
  const { setCursorState } = useCursor();
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const socialLinks: SocialLink[] = [
    { name: 'Email', href: 'mailto:akshaymahajan730@gmail.com', icon: <Mail className="w-4 h-4" /> },
    { name: 'GitHub', href: 'https://github.com/akshaymahajan2004', icon: <Github className="w-4 h-4" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/akshaymahajan1274', icon: <Linkedin className="w-4 h-4" /> },
    { name: 'Twitter', href: 'https://x.com/akshaymahajan74', icon: <Twitter className="w-4 h-4" /> },
    {
      name: 'Resume',
      href: '#resume',
      icon: <FileText className="w-4 h-4" />,
      isModal: true,
    },
  ];

  return (
    <>
      <section id="contact" className="py-28 md:py-40 bg-ivory border-t border-fine-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-10"
          >
            <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold block">
              07 — Get In Touch
            </span>

            <div className="space-y-4">
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-charcoal font-normal tracking-tight leading-[1.05]">
                Have an idea? <br />
                <span className="italic text-terracotta">Let&apos;s build it.</span>
              </h2>
              <HandDrawnUnderline className="max-w-md text-terracotta opacity-90" />
            </div>

            <p className="font-sans text-lg md:text-2xl text-muted-text font-light leading-relaxed max-w-2xl">
              Whether you have a specific project in mind, need technical leadership, or simply want to connect—drop me a line.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="mailto:akshay.mahajan.dev@gmail.com"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-charcoal text-paper font-sans text-sm uppercase tracking-widest rounded-full hover:bg-terracotta transition-colors duration-300 shadow-md group"
                onMouseEnter={() => setCursorState('hover-link')}
                onMouseLeave={() => setCursorState('normal')}
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center space-x-3 px-7 py-4 border border-charcoal/30 bg-surface/40 hover:bg-charcoal hover:text-paper text-charcoal font-sans text-sm uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm group"
                onMouseEnter={() => setCursorState('hover-link')}
                onMouseLeave={() => setCursorState('normal')}
              >
                <FileText className="w-4 h-4 group-hover:text-paper text-charcoal transition-colors" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Social Links List */}
            <div className="pt-12 border-t border-fine-border/80 flex flex-wrap items-center gap-6 md:gap-10">
              {socialLinks.map((link) => {
                if (link.isModal) {
                  return (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => setIsResumeOpen(true)}
                      className="font-sans text-sm text-charcoal/80 hover:text-charcoal flex items-center space-x-2 relative py-1 group cursor-pointer"
                      onMouseEnter={() => setCursorState('hover-link')}
                      onMouseLeave={() => setCursorState('normal')}
                    >
                      {link.icon}
                      <span className="font-medium">{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
                    </button>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-charcoal/80 hover:text-charcoal flex items-center space-x-2 relative py-1 group"
                    onMouseEnter={() => setCursorState('hover-link')}
                    onMouseLeave={() => setCursorState('normal')}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl="/resume.pdf"
        fileName="Akshay_Mahajan_Resume.pdf"
      />
    </>
  );
};
