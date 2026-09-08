'use client';

import React, { createContext, useContext, useState } from 'react';
import { CursorState } from '@/types';

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: 'normal',
  setCursorState: () => {},
  hoveredProject: null,
  setHoveredProject: () => {},
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorState, setCursorState] = useState<CursorState>('normal');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, hoveredProject, setHoveredProject }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
