'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HandDrawnUnderline } from '../ui/HandDrawnUnderline';

export const IntroStatement: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-28 md:py-40 bg-ivory border-y border-fine-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col space-y-6"
        >
          {/* Tag */}
          <motion.div variants={lineVariants} className="flex items-center space-x-3">
            <span className="font-sans text-xs tracking-widest uppercase text-terracotta font-semibold">
              01 — Philosophy
            </span>
            <div className="h-[1px] w-12 bg-terracotta/40" />
          </motion.div>

          {/* Statement Lines */}
          <motion.p
            variants={lineVariants}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal/70 leading-tight font-normal"
          >
            I don&apos;t just write code.
          </motion.p>

          <motion.div variants={lineVariants} className="relative inline-block pt-2">
            <p className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal leading-tight font-normal">
              I turn ideas into things people can actually use.
            </p>
            <HandDrawnUnderline className="mt-3 text-terracotta opacity-90" />
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="font-sans text-base sm:text-lg md:text-xl text-muted-text max-w-2xl pt-6 leading-relaxed font-light"
          >
            Thoughtful software engineering requires listening to users, simplifying complexity, and crafting interfaces that feel weightless.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
