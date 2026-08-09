import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// 1. Fetch all skills (Public)
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
    return NextResponse.json({ success: true, skills });
  } catch (error) {
    console.error('Fetch Skills Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Create skill (Admin only)
export async function POST(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, category, iconName, proficiency } = await request.json();

    if (!name || !category || !iconName || proficiency === undefined) {
      return NextResponse.json({ error: 'Name, category, iconName, and proficiency are required' }, { status: 400 });
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        iconName,
        proficiency: Number(proficiency),
      },
    });

    return NextResponse.json({ success: true, skill: newSkill });
  } catch (error) {
    console.error('Create Skill Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. Update skill (Admin only)
export async function PUT(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, category, iconName, proficiency } = await request.json();

    if (!id || !name || !category || !iconName || proficiency === undefined) {
      return NextResponse.json({ error: 'ID, Name, category, iconName, and proficiency are required' }, { status: 400 });
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        iconName,
        proficiency: Number(proficiency),
      },
    });

    return NextResponse.json({ success: true, skill: updatedSkill });
  } catch (error) {
    console.error('Update Skill Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. Delete skill (Admin only)
export async function DELETE(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Skill Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
