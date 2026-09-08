'use client';

import React, { useState, useEffect } from 'react';
import { Skill } from '@/types';
import { SkillFormModal } from './SkillFormModal';
import { Plus, Edit2, Trash2, Code2 } from 'lucide-react';

export const SkillManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSkills(data);
      }
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async (formData: Partial<Skill>) => {
    try {
      const isEdit = Boolean(editingSkill?.id);
      const url = '/api/skills';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit ? { ...formData, id: editingSkill?.id } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingSkill(null);
        fetchSkills();
      } else {
        alert('Failed to save skill');
      }
    } catch (err) {
      console.error('Save skill error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSkills();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl text-charcoal">Skills &amp; Capabilities ({skills.length})</h3>
          <p className="font-sans text-xs text-muted-text">
            Add or update technical skills and hover descriptions.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingSkill(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal text-paper font-sans text-xs uppercase tracking-widest rounded-lg hover:bg-terracotta transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-text text-sm font-serif">
          Loading skills data...
        </div>
      ) : skills.length === 0 ? (
        <div className="py-12 text-center text-muted-text text-sm font-sans bg-ivory border border-fine-border rounded-xl">
          No skills found. Click &quot;Add Skill&quot; to populate your skills cloud.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 bg-paper border border-fine-border rounded-xl flex flex-col justify-between space-y-3 hover:border-charcoal/30 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl text-charcoal font-medium">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-ivory border border-fine-border text-muted-text rounded">
                    {skill.category}
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-text leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-fine-border/50">
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-muted-text hover:text-charcoal bg-ivory border border-fine-border rounded"
                  title="Edit Skill"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 border border-red-200 rounded"
                  title="Delete Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <SkillFormModal
          skill={editingSkill}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
