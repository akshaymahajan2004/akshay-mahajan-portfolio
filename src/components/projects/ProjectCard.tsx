'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { useCursor } from '../cursor/CursorContext';
import { ProjectVisualCanvas } from './ProjectVisualCanvas';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorState } = useCursor();

  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 md:py-20 border-b border-fine-border last:border-b-0 group"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorState('hover-project');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorState('normal');
      }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Project Visual Art / Canvas */}
        <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
          <div className="relative overflow-hidden rounded-xl bg-surface p-2 border border-fine-border shadow-xs transition-all duration-500 group-hover:shadow-md group-hover:border-charcoal/40">
            {project.imageUrl ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ) : (
              <ProjectVisualCanvas visualType={project.visualType} isHovered={isHovered} />
            )}
          </div>
        </div>

        {/* Project Meta Info */}
        <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
          <div className="space-y-4">
            {/* Number & Year */}
            <div className="flex items-center justify-between font-serif text-sm text-muted-text">
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta transition-transform duration-300 group-hover:-translate-y-1">
                {project.number || `0${index + 1}`}
              </span>
              <span className="font-sans text-xs tracking-wider">{project.year}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="relative inline-block">
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight group-hover:text-terracotta transition-colors duration-300">
                {project.title}
              </h3>
              {isHovered && <HandDrawnUnderline className="mt-1" />}
            </div>

            {project.subtitle && (
              <p className="font-sans text-sm font-medium text-muted-text uppercase tracking-wider">
                {project.subtitle}
              </p>
            )}

            {/* Description */}
            <p className="font-sans text-base text-charcoal/80 leading-relaxed font-light">
              {project.description}
            </p>

            {project.caseStudy && (
              <p className="font-sans text-xs text-muted-text italic border-l-2 border-terracotta/40 pl-3 py-1 bg-ivory/60 rounded-r">
                {project.caseStudy}
              </p>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 bg-ivory border border-fine-border text-charcoal/80 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-6 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors group/link"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 font-sans text-xs text-muted-text hover:text-charcoal transition-colors"
                title="View Source Code on GitHub"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
