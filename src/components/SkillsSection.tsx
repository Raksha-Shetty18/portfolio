'use client';

import { useState } from 'react';
import { Layout, Server, Database, Settings } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  iconName: string;
  proficiency: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  const categories: ('All' | 'Frontend' | 'Backend' | 'Database' | 'Tools')[] = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Tools',
  ];

  // Filter skills
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((sk) => sk.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Layout size={18} className="text-gradient" />;
      case 'Backend':
        return <Server size={18} className="text-gradient" />;
      case 'Database':
        return <Database size={18} className="text-gradient" />;
      default:
        return <Settings size={18} className="text-gradient" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-glass)',
              background: activeCategory === cat ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.03)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeCategory === cat ? '0 4px 12px rgba(139, 92, 246, 0.2)' : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredSkills.map((sk) => (
          <div
            key={sk.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-glass)',
                  padding: '0.5rem',
                }}
              >
                {getCategoryIcon(sk.category)}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{sk.name}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 500 }}>
                    {sk.proficiency}%
                  </span>
                </div>
                {/* Progress track */}
                <div
                  style={{
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${sk.proficiency}%`,
                      background: 'var(--accent-gradient)',
                      borderRadius: '3px',
                      transition: 'width 1s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
