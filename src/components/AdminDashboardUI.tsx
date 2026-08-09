'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FolderGit2,
  ListRestart,
  FileText,
  Mail,
  Edit,
  LogOut,
  Plus,
  Trash2,
  Globe,
  Upload,
  CheckCircle,
  AlertCircle,
  Code2,
  Calendar,
  X,
  Award
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  iconName: string;
  proficiency: number;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string | Date;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

interface AdminDashboardUIProps {
  adminUser: string;
  initialProjects: Project[];
  initialSkills: Skill[];
  initialMessages: Message[];
  initialCertificates: Certificate[];
  initialContent: Record<string, string>;
}

export default function AdminDashboardUI({
  adminUser,
  initialProjects,
  initialSkills,
  initialMessages,
  initialCertificates,
  initialContent,
}: AdminDashboardUIProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'content' | 'resume' | 'messages' | 'certificates'>('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [content, setContent] = useState<Record<string, string>>(initialContent);

  // Status notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Forms states
  const [projectForm, setProjectForm] = useState<{
    id?: string;
    title: string;
    description: string;
    technologies: string;
    githubUrl: string;
    liveUrl: string;
    imageUrl: string;
  }>({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
  const [isEditingProject, setIsEditingProject] = useState(false);

  const [skillForm, setSkillForm] = useState<{
    id?: string;
    name: string;
    category: string;
    iconName: string;
    proficiency: number;
  }>({ name: '', category: 'Frontend', iconName: 'Layout', proficiency: 80 });
  const [isEditingSkill, setIsEditingSkill] = useState(false);

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [certificateForm, setCertificateForm] = useState<{
    id?: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl: string;
  }>({ title: '', issuer: '', date: '', credentialUrl: '' });
  const [isEditingCertificate, setIsEditingCertificate] = useState(false);

  const router = useRouter();

  // Show status callback helper
  const showStatus = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // 2. Project CRUD functions
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = isEditingProject ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });

      const data = await res.json();
      if (res.ok) {
        if (isEditingProject) {
          setProjects((prev) => prev.map((p) => (p.id === data.project.id ? data.project : p)));
          showStatus('success', 'Project updated successfully!');
        } else {
          setProjects((prev) => [data.project, ...prev]);
          showStatus('success', 'New project added successfully!');
        }
        setProjectForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
        setIsEditingProject(false);
      } else {
        showStatus('error', data.error || 'Failed to save project.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showStatus('success', 'Project deleted successfully.');
      } else {
        const data = await res.json();
        showStatus('error', data.error || 'Failed to delete project.');
      }
    } catch (err) {
      showStatus('error', 'Network error during delete operation.');
    } finally {
      setLoading(false);
    }
  };

  const selectEditProject = (p: Project) => {
    setProjectForm(p);
    setIsEditingProject(true);
  };

  // 3. Skill CRUD functions
  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = isEditingSkill ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/skills', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm),
      });

      const data = await res.json();
      if (res.ok) {
        if (isEditingSkill) {
          setSkills((prev) => prev.map((s) => (s.id === data.skill.id ? data.skill : s)));
          showStatus('success', 'Skill updated successfully!');
        } else {
          setSkills((prev) => [...prev, data.skill]);
          showStatus('success', 'New skill added successfully!');
        }
        setSkillForm({ name: '', category: 'Frontend', iconName: 'Layout', proficiency: 80 });
        setIsEditingSkill(false);
      } else {
        showStatus('error', data.error || 'Failed to save skill.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        showStatus('success', 'Skill deleted successfully.');
      } else {
        const data = await res.json();
        showStatus('error', data.error || 'Failed to delete skill.');
      }
    } catch (err) {
      showStatus('error', 'Network error during delete operation.');
    } finally {
      setLoading(false);
    }
  };

  const selectEditSkill = (s: Skill) => {
    setSkillForm(s);
    setIsEditingSkill(true);
  };

  // 3b. Certificate CRUD functions
  const saveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = isEditingCertificate ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/certificates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificateForm),
      });

      const data = await res.json();
      if (res.ok) {
        if (isEditingCertificate) {
          setCertificates((prev) => prev.map((c) => (c.id === data.certificate.id ? data.certificate : c)));
          showStatus('success', 'Certificate updated successfully!');
        } else {
          setCertificates((prev) => [data.certificate, ...prev]);
          showStatus('success', 'New certificate added successfully!');
        }
        setCertificateForm({ title: '', issuer: '', date: '', credentialUrl: '' });
        setIsEditingCertificate(false);
      } else {
        showStatus('error', data.error || 'Failed to save certificate.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        showStatus('success', 'Certificate deleted successfully.');
      } else {
        const data = await res.json();
        showStatus('error', data.error || 'Failed to delete certificate.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const selectEditCertificate = (c: Certificate) => {
    setCertificateForm(c);
    setIsEditingCertificate(true);
  };

  // 4. Update Copy Handler
  const updateCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (res.ok) {
        setContent(data.content);
        showStatus('success', 'Portfolio content updated successfully!');
      } else {
        showStatus('error', data.error || 'Failed to update content.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Resume Upload Handler
  const uploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      showStatus('error', 'Please pick a file first.');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('file', resumeFile);

    try {
      const res = await fetch('/api/admin/resume', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showStatus('success', 'Resume PDF uploaded successfully!');
        setContent((prev) => ({ ...prev, resumeUrl: data.url }));
        setResumeFile(null);
      } else {
        showStatus('error', data.error || 'Failed to upload resume.');
      }
    } catch (err) {
      showStatus('error', 'Network error during upload.');
    } finally {
      setLoading(false);
    }
  };

  // 6. Delete Message Handler
  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showStatus('success', 'Message deleted successfully.');
      } else {
        const data = await res.json();
        showStatus('error', data.error || 'Failed to delete message.');
      }
    } catch (err) {
      showStatus('error', 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#080b11',
        color: '#fff',
      }}
    >
      {/* Dashboard Topbar */}
      <header
        style={{
          height: '70px',
          borderBottom: '1px solid var(--border-glass)',
          background: 'rgba(15, 21, 36, 0.9)',
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
              <Code2 className="text-gradient" size={24} />
              <span>DASHBOARD</span>
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-glass)',
              }}
            >
              Logged in as: {adminUser}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/" target="_blank" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Globe size={15} />
              View Site
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#f87171' }}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <div
        className="container dashboard-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '2.5rem',
          padding: '2.5rem 1.5rem',
          flexGrow: 1,
        }}
      >
        {/* SIDEBAR TABS */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="dashboard-sidebar">
          {[
            { id: 'projects', label: 'Projects CRUD', icon: <FolderGit2 size={18} /> },
            { id: 'skills', label: 'Skills Set', icon: <ListRestart size={18} /> },
            { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
            { id: 'content', label: 'Site Copy', icon: <FileText size={18} /> },
            { id: 'resume', label: 'Resume PDF', icon: <Upload size={18} /> },
            { id: 'messages', label: 'Messages', icon: <Mail size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '0.8rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                width: '100%',
                border: '1px solid transparent',
                background: activeTab === tab.id ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                boxShadow: activeTab === tab.id ? '0 4px 10px rgba(139, 92, 246, 0.15)' : 'none',
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'messages' && messages.length > 0 && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                  }}
                >
                  {messages.length}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* DETAILS SECTION */}
        <section style={{ position: 'relative' }}>
          {/* Notifications */}
          {notification && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid',
                background: notification.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: notification.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: notification.type === 'success' ? 'var(--success)' : 'var(--error)',
                animation: 'fadeInUp var(--transition-fast)',
              }}
            >
              {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span style={{ fontSize: '0.9rem' }}>{notification.text}</span>
            </div>
          )}

          {/* TAB CONTENT: PROJECTS */}
          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  Manage <span className="text-gradient">Projects</span>
                </h2>
                {isEditingProject && (
                  <button
                    onClick={() => {
                      setIsEditingProject(false);
                      setProjectForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={saveProject} className="glass" style={{ padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                  {isEditingProject ? 'Edit Project details' : 'Add New Project'}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Project Title</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      placeholder="e.g. WeatherNow"
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, technologies: e.target.value }))}
                      required
                      placeholder="e.g. React.js, OpenWeatherMap API, CSS"
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Project Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                    placeholder="Short description of what the project does..."
                    style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>GitHub Link</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="e.g. https://github.com/..."
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Live Project URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="e.g. https://..."
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Image URL (Unsplash or local)</label>
                  <input
                    type="text"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '200px', display: 'flex', gap: '0.5rem', alignSelf: 'flex-start' }}>
                  <Plus size={16} />
                  {isEditingProject ? 'Update Project' : 'Add Project'}
                </button>
              </form>

              {/* Projects List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Existing Projects ({projects.length})</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="glass project-list-row"
                      style={{
                        padding: '1.25rem',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt=""
                        style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', background: '#0a0d16' }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontWeight: 600, fontSize: '1.05rem' }}>{p.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.technologies}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => selectEditProject(p)}
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SKILLS */}
          {activeTab === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  Manage <span className="text-gradient">Skills</span>
                </h2>
                {isEditingSkill && (
                  <button
                    onClick={() => {
                      setIsEditingSkill(false);
                      setSkillForm({ name: '', category: 'Frontend', iconName: 'Layout', proficiency: 80 });
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={saveSkill} className="glass" style={{ padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                  {isEditingSkill ? 'Edit Skill details' : 'Add New Skill'}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Skill Name</label>
                    <input
                      type="text"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="e.g. Next.js"
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm((prev) => ({ ...prev, category: e.target.value }))}
                      required
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(15, 21, 36, 0.95)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Proficiency (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm((prev) => ({ ...prev, proficiency: Number(e.target.value) }))}
                      required
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Icon Reference</label>
                    <select
                      value={skillForm.iconName}
                      onChange={(e) => setSkillForm((prev) => ({ ...prev, iconName: e.target.value }))}
                      required
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(15, 21, 36, 0.95)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    >
                      <option value="Layout">Layout (Frontend)</option>
                      <option value="Server">Server (Backend)</option>
                      <option value="Database">Database (DB)</option>
                      <option value="Settings">Settings (Tools)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '200px', display: 'flex', gap: '0.5rem', alignSelf: 'flex-start' }}>
                  <Plus size={16} />
                  {isEditingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </form>

              {/* Skills Category Lists */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {['Frontend', 'Backend', 'Database', 'Tools'].map((cat) => {
                  const catSkills = skills.filter((s) => s.category === cat);
                  if (catSkills.length === 0) return null;
                  return (
                    <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{cat}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                        {catSkills.map((s) => (
                          <div
                            key={s.id}
                            className="glass"
                            style={{
                              padding: '1rem',
                              borderRadius: '8px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</h4>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.proficiency}%</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                              <button
                                onClick={() => selectEditSkill(s)}
                                style={{ padding: '0.3rem 0.5rem', background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer' }}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => deleteSkill(s.id)}
                                style={{ padding: '0.3rem 0.5rem', background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Manage <span className="text-gradient">Certificates</span>
              </h2>

              <form
                onSubmit={saveCertificate}
                className="glass"
                style={{
                  padding: '2rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Certificate Title</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Cloud Practitioner"
                      value={certificateForm.title}
                      onChange={(e) => setCertificateForm((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Issuing Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      value={certificateForm.issuer}
                      onChange={(e) => setCertificateForm((prev) => ({ ...prev, issuer: e.target.value }))}
                      required
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Issue Date / Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2026 or Aug 2025"
                      value={certificateForm.date}
                      onChange={(e) => setCertificateForm((prev) => ({ ...prev, date: e.target.value }))}
                      required
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Credential URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={certificateForm.credentialUrl}
                      onChange={(e) => setCertificateForm((prev) => ({ ...prev, credentialUrl: e.target.value }))}
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '6px',
                        color: '#fff',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{
                      width: '200px',
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={16} />
                    {isEditingCertificate ? 'Update Certificate' : 'Add Certificate'}
                  </button>

                  {isEditingCertificate && (
                    <button
                      type="button"
                      onClick={() => {
                        setCertificateForm({ title: '', issuer: '', date: '', credentialUrl: '' });
                        setIsEditingCertificate(false);
                      }}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '6px',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                      }}
                    >
                      <X size={16} />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Certificates List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Active Certificates ({certificates.length})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                  {certificates.map((c) => (
                    <div
                      key={c.id}
                      className="glass"
                      style={{
                        padding: '1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <Award size={24} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '0.1rem' }} />
                          <div>
                            <h4 style={{ fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.3' }}>{c.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{c.issuer}</p>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Issued: {c.date}</p>
                        {c.credentialUrl && (
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--color-secondary)',
                              textDecoration: 'none',
                              display: 'inline-block',
                              marginTop: '0.5rem',
                            }}
                          >
                            Verify Credential ↗
                          </a>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => selectEditCertificate(c)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            background: 'rgba(167, 139, 250, 0.1)',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            borderRadius: '4px',
                            color: '#a78bfa',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '0.3rem',
                            alignItems: 'center',
                            fontSize: '0.8rem',
                          }}
                        >
                          <Edit size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCertificate(c.id)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            background: 'rgba(248, 113, 113, 0.1)',
                            border: '1px solid rgba(248, 113, 113, 0.2)',
                            borderRadius: '4px',
                            color: '#f87171',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '0.3rem',
                            alignItems: 'center',
                            fontSize: '0.8rem',
                          }}
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {certificates.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No certificates added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: COPY CONTENT */}
          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Update <span className="text-gradient">Site Content</span>
              </h2>

              <form onSubmit={updateCopy} className="glass" style={{ padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input
                      type="text"
                      value={content.name || ''}
                      onChange={(e) => setContent((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Professional Role</label>
                    <input
                      type="text"
                      value={content.title || ''}
                      onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Hero Tagline</label>
                  <input
                    type="text"
                    value={content.tagline || ''}
                    onChange={(e) => setContent((prev) => ({ ...prev, tagline: e.target.value }))}
                    required
                    style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Biography Introduction</label>
                  <textarea
                    value={content.introduction || ''}
                    onChange={(e) => setContent((prev) => ({ ...prev, introduction: e.target.value }))}
                    required
                    rows={4}
                    style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Education</label>
                  <input
                    type="text"
                    value={content.education || ''}
                    onChange={(e) => setContent((prev) => ({ ...prev, education: e.target.value }))}
                    required
                    style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Career Objective</label>
                    <textarea
                      value={content.careerObjective || ''}
                      onChange={(e) => setContent((prev) => ({ ...prev, careerObjective: e.target.value }))}
                      required
                      rows={3}
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Technical Interests</label>
                    <textarea
                      value={content.interests || ''}
                      onChange={(e) => setContent((prev) => ({ ...prev, interests: e.target.value }))}
                      required
                      rows={3}
                      style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#fff', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '200px' }}>
                  Save Content Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB CONTENT: RESUME PDF */}
          {activeTab === 'resume' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Upload <span className="text-gradient">Resume PDF</span>
              </h2>

              <form onSubmit={uploadResume} className="glass" style={{ padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '2rem', border: '2px dashed var(--border-glass)', borderRadius: '8px', textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
                  <Upload size={32} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    style={{ display: 'block', margin: '0 auto 1rem' }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Only PDF documents are supported (max 5MB).
                  </span>
                </div>

                {resumeFile && (
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                    Selected File: <strong>{resumeFile.name}</strong> ({(resumeFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}

                <button type="submit" disabled={loading || !resumeFile} className="btn btn-primary" style={{ width: '200px' }}>
                  Upload PDF
                </button>
              </form>

              {content.resumeUrl && (
                <div className="glass" style={{ padding: '1.25rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Current Resume Link: <strong>{content.resumeUrl}</strong></span>
                  <a href={content.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    View PDF
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Manage <span className="text-gradient">Contact Messages</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No contact messages found.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="glass"
                      style={{
                        padding: '1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                      }}
                    >
                      {/* Message header details */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }} className="message-header">
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{m.subject}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            From: <strong>{m.name}</strong> ({m.email})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={13} />
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteMessage(m.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.25rem',
                            }}
                            title="Delete message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Message body */}
                      <p
                        style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '1rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.02)',
                          fontSize: '0.95rem',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
