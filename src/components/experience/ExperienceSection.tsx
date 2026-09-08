'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { ExperienceItem } from '@/types';

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  const { setCursorState } = useCursor();

  const defaultExperiences: ExperienceItem[] = [
    {
      id: 'exp-1',
      year: 'AUG 2026 – PRESENT',
      role: 'Freelance Software Engineer',
      company: 'Self-Employed',
      description: 'Building custom full-stack web applications, integrating AI workflows, and developing scalable web solutions for clients and personal products.',
    },
    {
      id: 'exp-2',
      year: 'JAN 2026 – JUL 2026',
      role: 'Python Developer Intern',
      company: 'AgriCode Solutions',
      description: 'Developed scalable Python backend services, implemented RESTful APIs, optimized database workflows, and collaborated on automated testing procedures.',
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pb-12 border-b border-fine-border"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold block mb-3">
          04 — Career History
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight">
          Experience
        </h2>
      </motion.div>

      {/* Minimal Timeline */}
      <div className="divide-y divide-fine-border">
        {defaultExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group"
            onMouseEnter={() => setCursorState('hover-link')}
            onMouseLeave={() => setCursorState('normal')}
          >
            {/* Year */}
            <div className="md:col-span-3 font-mono text-xs text-terracotta tracking-widest uppercase font-semibold flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-terracotta/40 group-hover:bg-terracotta transition-colors" />
              <span>{exp.year}</span>
            </div>

            {/* Role & Company */}
            <div className="md:col-span-4 space-y-1">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-normal group-hover:text-terracotta transition-colors duration-300">
                {exp.role}
              </h3>
              <p className="font-sans text-xs uppercase tracking-wider text-muted-text font-medium">
                {exp.company}
              </p>
            </div>

            {/* Description */}
            <div className="md:col-span-5 font-sans text-sm md:text-base text-charcoal/80 leading-relaxed font-light">
              {exp.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
