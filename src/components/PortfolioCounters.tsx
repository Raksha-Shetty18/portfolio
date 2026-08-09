'use client';

import AnimatedCounter from './AnimatedCounter';
import { Award, Briefcase, Cpu } from 'lucide-react';

export default function PortfolioCounters() {
  const stats = [
    { label: 'Completed Projects', value: 12, suffix: '+', icon: <Briefcase size={28} /> },
    { label: 'Technologies & Tools', value: 15, suffix: '+', icon: <Cpu size={28} /> },
    { label: 'Certificates Earned', value: 5, suffix: '+', icon: <Award size={28} /> },
  ];

  return (
    <div
      className="glass stats-container scroll-reveal"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)',
        textAlign: 'center',
        marginTop: '3rem',
        background: 'rgba(15, 21, 36, 0.3)',
      }}
    >
      {stats.map((stat, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              color: 'var(--color-primary)',
            }}
          >
            {stat.icon}
          </div>
          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
            {stat.label}
          </span>
        </div>
      ))}

      <style jsx global>{`
        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
