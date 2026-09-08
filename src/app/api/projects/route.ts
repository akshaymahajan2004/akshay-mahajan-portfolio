import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/storage';
import { Project } from '@/types';

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDB();
    
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      number: body.number || `0${db.projects.length + 1}`,
      title: body.title || 'Untitled Project',
      subtitle: body.subtitle || '',
      description: body.description || '',
      caseStudy: body.caseStudy || '',
      tech: Array.isArray(body.tech) ? body.tech : (body.tech ? body.tech.split(',').map((s: string) => s.trim()) : []),
      year: body.year || new Date().getFullYear().toString(),
      featured: Boolean(body.featured),
      liveUrl: body.liveUrl || '',
      githubUrl: body.githubUrl || '',
      visualType: body.visualType || 'canvas-ai',
      imageUrl: body.imageUrl || ''
    };

    db.projects.unshift(newProject);
    const success = saveDB(db);

    if (!success) {
      return NextResponse.json({ error: 'Failed to write project to database' }, { status: 500 });
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const db = getDB();
    const index = db.projects.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const updatedTech = Array.isArray(body.tech)
      ? body.tech
      : (typeof body.tech === 'string' ? body.tech.split(',').map((s: string) => s.trim()) : db.projects[index].tech);

    db.projects[index] = {
      ...db.projects[index],
      ...body,
      tech: updatedTech
    };

    saveDB(db);
    return NextResponse.json(db.projects[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID query param required' }, { status: 400 });
    }

    const db = getDB();
    db.projects = db.projects.filter((p) => p.id !== id);
    saveDB(db);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
