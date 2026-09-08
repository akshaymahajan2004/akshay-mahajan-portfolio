'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';
import { Code, Compass, Heart, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setCursorState } = useCursor();

  const pillars = [
    {
      icon: <Code className="w-5 h-5 text-terracotta" />,
      title: 'Who I am',
      desc: 'A full-stack creative engineer with a passion for software craftsmanship, interactive algorithms, and system architecture.',
    },
    {
      icon: <Layers className="w-5 h-5 text-terracotta" />,
      title: 'What I build',
      desc: 'Real-world digital products, AI tools, web infrastructure, and expressive editorial web experiences.',
    },
    {
      icon: <Compass className="w-5 h-5 text-terracotta" />,
      title: 'How I work',
      desc: 'With clarity, iteration, zero-bloat modular design, and robust end-to-end type safety.',
    },
    {
      icon: <Heart className="w-5 h-5 text-terracotta" />,
      title: 'What I care about',
      desc: 'Performance, accessibility, user delight, and software that lasts long after the trend fades.',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-ivory border-y border-fine-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Headline & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 sticky top-28"
          >
            <div>
              <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold block mb-3">
                03 — About
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight">
                A developer with a{' '}
                <span
                  className="italic text-terracotta"
                  onMouseEnter={() => setCursorState('hover-link')}
                  onMouseLeave={() => setCursorState('normal')}
                >
                  designer&apos;s eye.
                </span>
              </h2>
              <HandDrawnUnderline className="mt-3 max-w-xs" />
            </div>

            <div className="p-6 bg-surface/70 border border-fine-border rounded-xl space-y-3">
              <p className="font-serif italic text-lg text-charcoal/90">
                &ldquo;I believe code and design are not two separate disciplines, but two perspectives on the same underlying art.&rdquo;
              </p>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-text block">
                — Akshay Mahajan
              </span>
            </div>
          </motion.div>

          {/* Right Column - Detailed Story & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-6 text-charcoal/80 font-sans text-base md:text-lg leading-relaxed font-light">
              <p>
                Hi, I&apos;m <strong className="font-semibold text-charcoal">Akshay Mahajan</strong>. I build thoughtful, real-world digital experiences—not just demos.
              </p>
              <p>
                My work spans modern frontend architecture, AI-driven automation workflows, and expressive creative coding. Whether designing a complex web app or fine-tuning micro-interactions, I focus on delivering speed, resilience, and visual clarity.
              </p>
              <p>
                Based in India and collaborating globally, I work closely with founders, engineering teams, and design studios to bring ambitious ideas to life.
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-paper border border-fine-border rounded-xl space-y-3 transition-transform duration-300 hover:-translate-y-1 hover:border-charcoal/40"
                  onMouseEnter={() => setCursorState('hover-link')}
                  onMouseLeave={() => setCursorState('normal')}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <h4 className="font-serif text-xl text-charcoal font-medium">{item.title}</h4>
                  </div>
                  <p className="font-sans text-xs text-muted-text leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
