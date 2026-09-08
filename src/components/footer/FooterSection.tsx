'use client';

import React from 'react';
import { useCursor } from '../cursor/CursorContext';
import { ArrowUp } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const { setCursorState } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-12 bg-paper border-t border-fine-border text-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal">
            AKSHAY.
          </span>
          <span className="font-sans text-xs text-muted-text">
            Designed &amp; built with curiosity.
          </span>
        </div>

        {/* Center */}
        <div className="font-sans text-xs text-muted-text flex items-center space-x-4">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>·</span>
          <span>INDIA</span>
        </div>

        {/* Right Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 bg-ivory border border-fine-border rounded-full hover:border-charcoal transition-all group shadow-xs"
          aria-label="Scroll back to top"
          onMouseEnter={() => setCursorState('hover-link')}
          onMouseLeave={() => setCursorState('normal')}
        >
          <ArrowUp className="w-4 h-4 text-charcoal transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
};
