export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// 1. Fetch all certificates (Public)
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    console.error('Fetch Certificates Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. Create certificate (Admin only)
export async function POST(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, issuer, date, credentialUrl } = await request.json();

    if (!title || !issuer || !date) {
      return NextResponse.json({ error: 'Title, issuer, and date are required' }, { status: 400 });
    }

    const newCert = await prisma.certificate.create({
      data: {
        title,
        issuer,
        date,
        credentialUrl: credentialUrl || '',
      },
    });

    return NextResponse.json({ success: true, certificate: newCert });
  } catch (error) {
    console.error('Create Certificate Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. Update certificate (Admin only)
export async function PUT(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, issuer, date, credentialUrl } = await request.json();

    if (!id || !title || !issuer || !date) {
      return NextResponse.json({ error: 'ID, Title, issuer, and date are required' }, { status: 400 });
    }

    const updatedCert = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        issuer,
        date,
        credentialUrl,
      },
    });

    return NextResponse.json({ success: true, certificate: updatedCert });
  } catch (error) {
    console.error('Update Certificate Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. Delete certificate (Admin only)
export async function DELETE(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Certificate Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
