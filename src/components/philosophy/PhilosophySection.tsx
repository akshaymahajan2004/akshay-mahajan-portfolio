'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';
import { useCursor } from '../cursor/CursorContext';

export const PhilosophySection: React.FC = () => {
  const { setCursorState } = useCursor();

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-muted-text">
          06 — Core Belief
        </span>

        <h2
          className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal leading-tight max-w-4xl mx-auto"
          onMouseEnter={() => setCursorState('hover-link')}
          onMouseLeave={() => setCursorState('normal')}
        >
          &ldquo;Good software should disappear behind the experience.&rdquo;
        </h2>

        <HandDrawnUnderline className="max-w-md mx-auto text-terracotta opacity-80 mt-4" />
      </motion.div>
    </section>
  );
};
