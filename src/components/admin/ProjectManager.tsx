'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { ProjectFormModal } from './ProjectFormModal';
import { Plus, Edit2, Trash2, Star, ExternalLink } from 'lucide-react';

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (formData: Partial<Project>) => {
    try {
      const isEdit = Boolean(editingProject?.id);
      const url = '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit ? { ...formData, id: editingProject?.id } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error('Save project error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl text-charcoal">Projects ({projects.length})</h3>
          <p className="font-sans text-xs text-muted-text">
            Add, update, or remove portfolio projects.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal text-paper font-sans text-xs uppercase tracking-widest rounded-lg hover:bg-terracotta transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-text text-sm font-serif">
          Loading projects data...
        </div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center text-muted-text text-sm font-sans bg-ivory border border-fine-border rounded-xl">
          No projects found. Click &quot;Add Project&quot; above to create your first portfolio piece.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 bg-paper border border-fine-border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-charcoal/30 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs text-terracotta font-semibold">
                    {proj.number || '00'}
                  </span>
                  <h4 className="font-serif text-xl text-charcoal font-medium">{proj.title}</h4>
                  {proj.featured && (
                    <span className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase px-2 py-0.5 bg-terracotta/10 text-terracotta border border-terracotta/30 rounded-full">
                      <Star className="w-3 h-3 fill-terracotta" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-muted-text line-clamp-1">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="font-mono text-[10px] px-2 py-0.5 bg-ivory border border-fine-border text-charcoal/70 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-muted-text hover:text-charcoal bg-ivory border border-fine-border rounded-lg"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 text-red-600 hover:text-red-800 bg-red-50 border border-red-200 rounded-lg"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
