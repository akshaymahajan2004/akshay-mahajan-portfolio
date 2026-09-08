import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/storage';
import { Skill } from '@/types';

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.skills);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDB();

    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: body.name || 'New Skill',
      category: body.category || 'Frontend',
      description: body.description || '',
      iconName: body.iconName || '',
      priority: body.priority ? Number(body.priority) : db.skills.length + 1
    };

    db.skills.push(newSkill);
    saveDB(db);

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    const db = getDB();
    const index = db.skills.findIndex((s) => s.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    db.skills[index] = {
      ...db.skills[index],
      ...body
    };

    saveDB(db);
    return NextResponse.json(db.skills[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
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
    db.skills = db.skills.filter((s) => s.id !== id);
    saveDB(db);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
