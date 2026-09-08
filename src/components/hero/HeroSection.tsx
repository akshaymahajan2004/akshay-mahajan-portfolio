'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { HandDrawnArrow } from '../ui/HandDrawnArrow';

interface HeroSectionProps {
  isLoaded: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const { setCursorState } = useCursor();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Location Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center space-x-3 mb-8"
      >
        <div className="flex items-center space-x-2 px-3 py-1 bg-ivory border border-fine-border rounded-full shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-sans text-xs font-medium tracking-wide text-charcoal/90">
            Based in India · Available worldwide
          </span>
        </div>
      </motion.div>

      {/* Main Editorial Headline */}
      <div className="my-auto py-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-charcoal font-sans font-light max-w-6xl"
        >
          I build digital experiences that{' '}
          <span
            className="font-serif italic font-normal text-terracotta cursor-default underline decoration-terracotta/30 decoration-wavy underline-offset-8"
            onMouseEnter={() => setCursorState('hover-link')}
            onMouseLeave={() => setCursorState('normal')}
          >
            feel as good
          </span>{' '}
          as they work.
        </motion.h1>

        {/* Subtitle / Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 font-sans text-lg sm:text-xl md:text-2xl text-muted-text max-w-3xl leading-relaxed font-light"
        >
          Developer, builder, and problem solver creating thoughtful products with code, design, and curiosity.
        </motion.p>
      </div>

      {/* Hero Footer with Animated Hand-Drawn Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="flex items-end justify-between pt-12 border-t border-fine-border/60"
      >
        <div className="flex flex-col space-y-1">
          <span className="font-sans text-xs uppercase tracking-widest text-muted-text">
            Scroll to explore
          </span>
          <span className="font-serif italic text-sm text-charcoal">
            Selected projects & engineering thoughts
          </span>
        </div>

        {/* Hand-drawn Arrow Anchor */}
        <a
          href="#work"
          className="flex flex-col items-center group cursor-pointer"
          aria-label="Scroll down to Selected Work"
          onMouseEnter={() => setCursorState('hover-link')}
          onMouseLeave={() => setCursorState('normal')}
        >
          <HandDrawnArrow className="transform transition-transform duration-300 group-hover:translate-y-2" />
        </a>
      </motion.div>
    </section>
  );
};
