import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// 1. Fetch all projects (Public)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Fetch Projects Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Create project (Admin only)
export async function POST(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, technologies, githubUrl, liveUrl, imageUrl } = await request.json();

    if (!title || !description || !technologies) {
      return NextResponse.json({ error: 'Title, description, and technologies are required' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        technologies,
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
        imageUrl: imageUrl || '',
      },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Create Project Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. Update project (Admin only)
export async function PUT(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, description, technologies, githubUrl, liveUrl, imageUrl } = await request.json();

    if (!id || !title || !description || !technologies) {
      return NextResponse.json({ error: 'ID, Title, description, and technologies are required' }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        technologies,
        githubUrl,
        liveUrl,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error('Update Project Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. Delete project (Admin only)
export async function DELETE(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Project Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
