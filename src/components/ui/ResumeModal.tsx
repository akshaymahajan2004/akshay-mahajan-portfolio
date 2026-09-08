'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useCursor } from '../cursor/CursorContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fileName?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl = '/resume.pdf',
  fileName = 'Akshay_Mahajan_Resume.pdf',
}) => {
  const { setCursorState } = useCursor();

  // Handle ESC key to close modal & lock background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[90vh] max-h-[900px] bg-ivory border border-fine-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-4 bg-paper/95 border-b border-fine-border flex items-center justify-between gap-4 flex-shrink-0">
              {/* Left Title & Status */}
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center space-x-2">
                    <h3 id="resume-modal-title" className="font-serif text-lg sm:text-xl text-charcoal font-medium truncate">
                      Curriculum Vitae
                    </h3>
                    <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans font-semibold bg-terracotta/10 text-terracotta rounded-full border border-terracotta/20">
                      PDF Preview
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-text truncate">
                    Akshay Mahajan · Creative Developer & Full-Stack Engineer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {/* Open in New Tab */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-sans font-medium text-charcoal/80 bg-surface/70 hover:bg-surface border border-fine-border rounded-lg transition-colors group"
                  onMouseEnter={() => setCursorState('hover-link')}
                  onMouseLeave={() => setCursorState('normal')}
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-terracotta transition-colors" />
                  <span className="hidden md:inline">Open in Tab</span>
                </a>

                {/* Download PDF Button */}
                <a
                  href={resumeUrl}
                  download={fileName}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-sans font-medium text-paper bg-charcoal hover:bg-terracotta rounded-lg transition-colors shadow-sm group"
                  onMouseEnter={() => setCursorState('hover-link')}
                  onMouseLeave={() => setCursorState('normal')}
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                  <span>Download</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-surface rounded-lg border border-transparent hover:border-fine-border transition-colors"
                  onMouseEnter={() => setCursorState('hover-link')}
                  onMouseLeave={() => setCursorState('normal')}
                  aria-label="Close resume preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Embedded PDF View */}
            <div className="flex-1 w-full h-full bg-surface/30 relative overflow-hidden flex flex-col">
              <iframe
                src={`${resumeUrl}#toolbar=1&navpanes=0`}
                title="Akshay Mahajan Resume"
                className="w-full h-full border-0 bg-white"
              />

              {/* Fallback footer notice */}
              <div className="px-4 py-2 bg-paper/90 border-t border-fine-border/60 text-center text-xs text-muted-text flex items-center justify-between">
                <span>Having trouble previewing?</span>
                <div className="space-x-3">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:underline font-medium"
                  >
                    Open directly
                  </a>
                  <span>·</span>
                  <a
                    href={resumeUrl}
                    download={fileName}
                    className="text-charcoal hover:underline font-medium"
                  >
                    Download copy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
