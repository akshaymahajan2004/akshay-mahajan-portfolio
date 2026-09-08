'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SketchLoaderProps {
  onComplete: () => void;
}

export const SketchLoader: React.FC<SketchLoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1200; // 1.2 seconds total
    const intervalTime = 16; // ~60fps
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / totalSteps);
      // Ease out count animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easedProgress * 99) + 1;
      setCount(currentVal);

      if (progress >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 400);
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper text-charcoal select-none"
        >
          <div className="flex flex-col items-center space-y-6 max-w-xs w-full px-6">
            {/* Editorial brand signature */}
            <span className="font-serif text-2xl tracking-wider text-charcoal font-medium">
              AKSHAY.
            </span>

            {/* Counter */}
            <div className="font-serif text-5xl md:text-6xl font-light tracking-tight text-charcoal">
              {formattedCount} <span className="text-xl md:text-2xl text-muted-text font-sans">%</span>
            </div>

            {/* Sketch progress stroke */}
            <div className="w-full h-1 bg-fine-border/50 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-charcoal rounded-full"
                style={{ width: `${count}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <p className="font-sans text-xs tracking-widest uppercase text-muted-text">
              Sketching canvas
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
