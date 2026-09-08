'use client';

import React from 'react';
import { CursorProvider } from '@/components/cursor/CursorContext';
import { CanvasCursorTrail } from '@/components/cursor/CanvasCursorTrail';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <CanvasCursorTrail />
      {children}
    </CursorProvider>
  );
}
