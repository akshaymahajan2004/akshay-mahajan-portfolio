'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { FeaturedProject } from './FeaturedProject';

interface SelectedWorkProps {
  initialProjects?: Project[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  const featured = projects.find((p) => p.featured) || projects[0];
  const regularProjects = projects.filter((p) => p.id !== featured?.id);

  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-fine-border"
      >
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold">
              02 — Work
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight">
            Selected Work
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-muted-text max-w-md mt-4 md:mt-0 font-light leading-relaxed">
          A collection of things I&apos;ve built, shipped, experimented with, and learned from.
        </p>
      </motion.div>

      {/* Featured Project Showcase */}
      {featured && <FeaturedProject project={featured} />}

      {/* Project Grid / List */}
      <div className="divide-y divide-fine-border">
        {regularProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};
