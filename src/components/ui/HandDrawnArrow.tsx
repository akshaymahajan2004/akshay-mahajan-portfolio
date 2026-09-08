'use client';

import React from 'react';

interface HandDrawnArrowProps {
  className?: string;
}

export const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 60 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-18 text-charcoal opacity-80 ${className}`}
      aria-hidden="true"
    >
      {/* Hand drawn curve line */}
      <path
        d="M28 6 C32 25, 24 55, 30 76"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="svg-draw-path"
      />
      {/* Arrowhead left leg */}
      <path
        d="M16 64 C20 70, 26 76, 30 78"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="svg-draw-path"
      />
      {/* Arrowhead right leg */}
      <path
        d="M44 63 C38 70, 33 76, 30 78"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="svg-draw-path"
      />
    </svg>
  );
};
