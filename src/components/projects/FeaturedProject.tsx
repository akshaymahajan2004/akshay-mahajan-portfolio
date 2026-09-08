'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { useCursor } from '../cursor/CursorContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';

interface FeaturedProjectProps {
  project?: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  const { setCursorState } = useCursor();

  if (!project) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="my-20 p-8 md:p-14 bg-surface border border-fine-border rounded-2xl relative overflow-hidden shadow-xs"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-4 h-4 text-terracotta" />
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
          Featured Case Study
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal">
            {project.title}
          </h3>

          <p className="font-sans text-lg text-charcoal/90 leading-relaxed font-light">
            {project.description}
          </p>

          {project.caseStudy && (
            <div className="p-4 bg-paper/80 border border-fine-border rounded-lg text-sm text-muted-text font-light leading-relaxed">
              <span className="font-semibold text-charcoal block mb-1">Architecture Highlight:</span>
              {project.caseStudy}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t, i) => (
              <span key={i} className="font-mono text-xs px-3 py-1 bg-ivory border border-fine-border text-charcoal rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-charcoal text-paper text-xs uppercase tracking-widest rounded-full hover:bg-terracotta transition-colors shadow-sm"
                onMouseEnter={() => setCursorState('hover-link')}
                onMouseLeave={() => setCursorState('normal')}
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Featured Visual Accent */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-6 bg-paper rounded-xl border border-fine-border">
          <div className="space-y-4 text-center">
            <span className="font-serif italic text-6xl text-terracotta font-light">
              {project.number || '01'}
            </span>
            <p className="font-sans text-xs uppercase tracking-widest text-muted-text">
              Flagship Project · {project.year}
            </p>
            <HandDrawnUnderline className="max-w-[140px] mx-auto" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
