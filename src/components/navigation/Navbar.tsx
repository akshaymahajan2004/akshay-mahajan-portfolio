'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../cursor/CursorContext';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  isLoaded: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoaded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-paper/90 backdrop-blur-md border-b border-fine-border shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Brand */}
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-charcoal flex items-center space-x-2 group"
            onMouseEnter={() => setCursorState('hover-link')}
            onMouseLeave={() => setCursorState('normal')}
          >
            <span>AKSHAY.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta transition-transform group-hover:scale-150" />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-sans text-sm tracking-wide text-charcoal/80 hover:text-charcoal transition-colors relative py-1 group"
                onMouseEnter={() => setCursorState('hover-link')}
                onMouseLeave={() => setCursorState('normal')}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action & Admin Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="font-sans text-xs tracking-wider uppercase text-muted-text hover:text-charcoal flex items-center space-x-1 px-3 py-1.5 rounded border border-fine-border hover:border-charcoal transition-all"
              onMouseEnter={() => setCursorState('hover-link')}
              onMouseLeave={() => setCursorState('normal')}
              title="Admin CMS Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-muted-text" />
              <span>Admin</span>
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-paper bg-charcoal rounded-full hover:bg-terracotta transition-colors duration-300 shadow-sm"
              onMouseEnter={() => setCursorState('hover-link')}
              onMouseLeave={() => setCursorState('normal')}
            >
              <span>Available for work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-ivory border-b border-fine-border p-6 md:hidden shadow-lg"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-charcoal py-2 border-b border-fine-border/40"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-between px-5 py-3 text-sm uppercase tracking-widest text-paper bg-charcoal rounded-md"
                >
                  <span>Available for work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider text-muted-text border border-fine-border rounded-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin CMS</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
