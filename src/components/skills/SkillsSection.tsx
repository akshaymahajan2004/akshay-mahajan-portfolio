'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { Skill } from '@/types';
import { Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  initialSkills?: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ initialSkills = [] }) => {
  const { setCursorState } = useCursor();
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch((err) => console.error('Error fetching skills:', err));
  }, []);

  const defaultSkillsList: Skill[] = [
    { id: '1', name: 'React', category: 'Frontend', description: 'Building fluid, reactive component architectures and custom state-driven interfaces.' },
    { id: '2', name: 'Next.js', category: 'Frontend', description: 'Architecting server-rendered apps, edge API routes, and optimized web performance.' },
    { id: '3', name: 'TypeScript', category: 'Frontend', description: 'Building reliable and scalable frontend & backend systems.' },
    { id: '4', name: 'Node.js', category: 'Backend & Cloud', description: 'Designing scalable asynchronous backend services and REST APIs.' },
    { id: '5', name: 'Python', category: 'Backend & Cloud', description: 'Scripting automation pipelines, backend services, and AI data integrations.' },
    { id: '6', name: 'AI & LLMs', category: 'AI & Data', description: 'Integrating LLM workflows, structured outputs, embeddings, and prompt architecture.' },
    { id: '7', name: 'PostgreSQL', category: 'Backend & Cloud', description: 'Designing relational database schemas, complex queries, and index strategies.' },
    { id: '8', name: 'Git', category: 'Design & Tools', description: 'Managing collaborative branch strategies, code reviews, and version control.' },
    { id: '9', name: 'Figma', category: 'Design & Tools', description: 'Translating editorial design systems, visual hierarchy, and component specs.' },
    { id: '10', name: 'Tailwind CSS', category: 'Frontend', description: 'Crafting clean, accessible, paper-aesthetic design systems with utility classes.' },
  ];

  const activeSkills = skills.length > 0 ? skills : defaultSkillsList;

  return (
    <section id="skills" className="py-24 md:py-36 bg-ivory border-y border-fine-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold block mb-3">
            05 — Technical Capabilities
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight">
            I work with
          </h2>
        </motion.div>

        {/* Typography Skill Cloud */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 py-8">
          {activeSkills.map((skill) => {
            const isSelected = hoveredSkill?.id === skill.id;

            return (
              <motion.button
                key={skill.id}
                onMouseEnter={() => {
                  setHoveredSkill(skill);
                  setCursorState('hover-skill');
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setCursorState('normal');
                }}
                onClick={() => setHoveredSkill(isSelected ? null : skill)}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ duration: 0.2 }}
                className={`font-serif text-3xl sm:text-5xl md:text-6xl px-4 py-2 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'text-terracotta bg-surface border border-terracotta/40 shadow-xs scale-105'
                    : 'text-charcoal/80 hover:text-charcoal bg-transparent hover:bg-paper'
                }`}
              >
                {skill.name}
              </motion.button>
            );
          })}
        </div>

        {/* Contextual Description Panel */}
        <div className="mt-8 min-h-[100px]">
          <AnimatePresence mode="wait">
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 bg-paper border border-fine-border rounded-xl max-w-2xl space-y-2 shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <h4 className="font-serif text-2xl text-charcoal font-medium">
                    {hoveredSkill.name}
                  </h4>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-text px-2 py-0.5 bg-ivory rounded border border-fine-border">
                    {hoveredSkill.category}
                  </span>
                </div>
                <p className="font-sans text-sm md:text-base text-charcoal/90 font-light leading-relaxed">
                  {hoveredSkill.description}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif italic text-base text-muted-text/70 pt-4"
              >
                Hover or tap any technology above to inspect how I use it.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
