'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { X } from 'lucide-react';

interface ProjectFormModalProps {
  project?: Project | null;
  onClose: () => void;
  onSave: (data: Partial<Project>) => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    number: '01',
    subtitle: '',
    description: '',
    caseStudy: '',
    tech: [],
    year: new Date().getFullYear().toString(),
    featured: false,
    liveUrl: '',
    githubUrl: '',
    visualType: 'canvas-ai',
    imageUrl: '',
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
      setTechInput(project.tech ? project.tech.join(', ') : '');
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = techInput.split(',').map((s) => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      tech: techArray,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-ivory border border-fine-border w-full max-w-2xl rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative my-8">
        <div className="flex items-center justify-between border-b border-fine-border pb-4">
          <h3 className="font-serif text-2xl text-charcoal">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="p-2 text-muted-text hover:text-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI Scheduling Agent"
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Number / Index
              </label>
              <input
                type="text"
                value={formData.number || ''}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="01"
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Natural Language Calendar Automation"
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed overview of what the project accomplishes..."
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Case Study Technical Breakdown
            </label>
            <textarea
              rows={2}
              value={formData.caseStudy || ''}
              onChange={(e) => setFormData({ ...formData, caseStudy: e.target.value })}
              placeholder="Key architectural highlights, optimizations, or technical metrics..."
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Next.js, TypeScript, AI / LLM, Calendar APIs, Tailwind CSS"
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Live URL
              </label>
              <input
                type="text"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Visual Art Preset
              </label>
              <select
                value={formData.visualType || 'canvas-ai'}
                onChange={(e) => setFormData({ ...formData, visualType: e.target.value as any })}
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              >
                <option value="canvas-ai">AI Neural Network (Canvas)</option>
                <option value="canvas-editorial">Editorial Grid (Canvas)</option>
                <option value="canvas-market">Telemetry Wave (Canvas)</option>
                <option value="canvas-audio">Spatial Audio Concentric (Canvas)</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Custom Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={Boolean(formData.featured)}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-terracotta rounded"
            />
            <label htmlFor="featured" className="font-sans text-xs font-medium text-charcoal">
              Set as Flagship Featured Project
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-fine-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-muted-text hover:text-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-charcoal text-paper font-sans text-xs uppercase tracking-widest rounded hover:bg-terracotta transition-colors"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
