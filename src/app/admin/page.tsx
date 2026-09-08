'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { ProjectManager } from '@/components/admin/ProjectManager';
import { SkillManager } from '@/components/admin/SkillManager';
import { ArrowLeft, FolderKanban, Wrench, LogOut, Sparkles } from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');

  if (!token) {
    return (
      <main className="min-h-screen bg-paper text-charcoal flex flex-col">
        <header className="p-6 border-b border-fine-border flex items-center justify-between">
          <Link
            href="/"
            className="font-sans text-xs uppercase tracking-widest text-muted-text hover:text-charcoal flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Portfolio</span>
          </Link>
          <span className="font-serif text-xl font-medium">AKSHAY.</span>
        </header>

        <AdminLogin onSuccess={(t) => setToken(t)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper text-charcoal">
      {/* Header */}
      <header className="py-6 px-6 md:px-12 bg-ivory border-b border-fine-border sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 bg-paper border border-fine-border rounded-lg text-muted-text hover:text-charcoal transition-colors"
              title="Return to main portfolio site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-terracotta" />
                <h1 className="font-serif text-2xl font-normal text-charcoal">Studio CMS</h1>
              </div>
              <p className="font-sans text-[11px] text-muted-text uppercase tracking-wider">
                Content Management System · Akshay Mahajan
              </p>
            </div>
          </div>

          <button
            onClick={() => setToken(null)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-paper border border-fine-border text-xs uppercase tracking-wider text-muted-text hover:text-red-700 hover:border-red-300 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock CMS</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-3 pb-8 border-b border-fine-border mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest transition-all ${
              activeTab === 'projects'
                ? 'bg-charcoal text-paper shadow-sm'
                : 'bg-ivory border border-fine-border text-muted-text hover:text-charcoal'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest transition-all ${
              activeTab === 'skills'
                ? 'bg-charcoal text-paper shadow-sm'
                : 'bg-ivory border border-fine-border text-muted-text hover:text-charcoal'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skills Manager</span>
          </button>
        </div>

        {/* Active Tab Panel */}
        <div className="bg-ivory border border-fine-border rounded-2xl p-6 md:p-8 shadow-xs">
          {activeTab === 'projects' ? <ProjectManager /> : <SkillManager />}
        </div>
      </div>
    </main>
  );
}
