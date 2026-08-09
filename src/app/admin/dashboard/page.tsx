import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { Project, Skill, ContactMessage, Certificate } from '@prisma/client';
import AdminDashboardUI from '@/components/AdminDashboardUI';

export const revalidate = 0; // Disable caching to fetch live updates

export default async function AdminDashboardPage() {
  // 1. Verify Authentication
  const admin = await verifyAuth();
  if (!admin) {
    redirect('/admin/login');
  }

  // 2. Fetch Initial Database State
  let projects: Project[] = [];
  let skills: Skill[] = [];
  let messages: ContactMessage[] = [];
  let certificates: Certificate[] = [];
  let contentMap: Record<string, string> = {};

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });

    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const content = await prisma.portfolioContent.findMany();
    content.forEach((item) => {
      contentMap[item.key] = item.value;
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  return (
    <AdminDashboardUI
      adminUser={admin.username}
      initialProjects={projects}
      initialSkills={skills}
      initialMessages={messages}
      initialCertificates={certificates}
      initialContent={contentMap}
    />
  );
}
