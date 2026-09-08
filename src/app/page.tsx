'use client';

import React, { useState } from 'react';
import { SketchLoader } from '@/components/loader/SketchLoader';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { IntroStatement } from '@/components/intro/IntroStatement';
import { SelectedWork } from '@/components/projects/SelectedWork';
import { AboutSection } from '@/components/about/AboutSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { PhilosophySection } from '@/components/philosophy/PhilosophySection';
import { ContactSection } from '@/components/contact/ContactSection';
import { FooterSection } from '@/components/footer/FooterSection';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-paper text-charcoal bg-paper-texture">
      {/* Initial 01 -> 100 Sketch Loader */}
      <SketchLoader onComplete={() => setIsLoaded(true)} />

      {/* Sticky Editorial Navigation */}
      <Navbar isLoaded={isLoaded} />

      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      {/* Intro Statement Scroll Reveal */}
      <IntroStatement />

      {/* Selected Work Showcase */}
      <SelectedWork />

      {/* About Section */}
      <AboutSection />

      {/* Experience Timeline */}
      <ExperienceSection />

      {/* Skills Typography Cloud */}
      <SkillsSection />

      {/* Philosophy High-Impact Section */}
      <PhilosophySection />

      {/* Contact CTA & Links */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
