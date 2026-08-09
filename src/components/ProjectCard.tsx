'use client';

import { ExternalLink, Github, Folder } from 'lucide-react';

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    githubUrl: string;
    liveUrl: string;
    imageUrl: string;
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  // Convert technologies string comma-separated into array
  const techList = project.technologies
    .split(',')
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);

  return (
    <div className="glass-card scroll-reveal" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Project Image */}
      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', background: '#0a0d16' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl || '/placeholder.jpg'}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(8, 11, 17, 0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-glass)',
          }}
        >
          <Folder size={18} className="text-gradient" />
        </div>
      </div>

      {/* Project Info */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {techList.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#c084fc',
                border: '1px solid rgba(139, 92, 246, 0.15)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.85rem' }}
          >
            <ExternalLink size={16} />
            View Project
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
