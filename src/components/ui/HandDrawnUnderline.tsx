'use client';

import React from 'react';

interface HandDrawnUnderlineProps {
  className?: string;
}

export const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-4 text-terracotta ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 4 12 C 45 6, 120 15, 236 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 12 14 C 70 10, 160 16, 228 11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};
