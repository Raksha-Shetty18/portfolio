export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// 1. Fetch all portfolio content (Public)
export async function GET() {
  try {
    const contents = await prisma.portfolioContent.findMany();
    
    // Map list to key-value object
    const mapped: Record<string, string> = {};
    contents.forEach((item) => {
      mapped[item.key] = item.value;
    });

    return NextResponse.json({ success: true, content: mapped });
  } catch (error) {
    console.error('Fetch Content Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Update content copy (Admin only)
export async function PUT(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json(); // key-value object of updates, e.g., { tagline: "...", bio: "..." }

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Invalid updates payload' }, { status: 400 });
    }

    // Update in transaction or sequential prisma updates
    const updatedEntries = [];
    for (const [key, value] of Object.entries(updates)) {
      if (typeof value !== 'string') continue;
      
      const updated = await prisma.portfolioContent.upsert({
        where: { key },
        update: { value },
        create: {
          key,
          value,
          section: 'general', // Default fallback section
        },
      });
      updatedEntries.push(updated);
    }

    // Remap to key-value
    const mapped: Record<string, string> = {};
    updatedEntries.forEach((item) => {
      mapped[item.key] = item.value;
    });

    return NextResponse.json({ success: true, content: mapped });
  } catch (error) {
    console.error('Update Content Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
