'use client';

import React, { useState, useEffect } from 'react';
import { Skill } from '@/types';
import { X } from 'lucide-react';

interface SkillFormModalProps {
  skill?: Skill | null;
  onClose: () => void;
  onSave: (data: Partial<Skill>) => void;
}

export const SkillFormModal: React.FC<SkillFormModalProps> = ({ skill, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'Frontend',
    description: '',
    priority: 1,
  });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    }
  }, [skill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-ivory border border-fine-border w-full max-w-lg rounded-2xl p-6 space-y-6 shadow-xl relative my-8">
        <div className="flex items-center justify-between border-b border-fine-border pb-4">
          <h3 className="font-serif text-2xl text-charcoal">
            {skill ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          <button onClick={onClose} className="p-2 text-muted-text hover:text-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Next.js"
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Category
            </label>
            <select
              value={formData.category || 'Frontend'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend & Cloud">Backend &amp; Cloud</option>
              <option value="AI & Data">AI &amp; Data</option>
              <option value="Design & Tools">Design &amp; Tools</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
              Contextual Hover Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe how you use this technology in real projects..."
              className="w-full px-3 py-2 bg-paper border border-fine-border rounded text-sm text-charcoal"
            />
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
              Save Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
