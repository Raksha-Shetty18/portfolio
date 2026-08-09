'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500); // Wait for transition
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#080b11',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? 'none' : 'auto',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <h2
          className="text-gradient"
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          RAKSHA
        </h2>
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'var(--accent-gradient)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>

      <span
        style={{
          marginTop: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
        }}
      >
        {Math.min(progress, 100)}% LOADED
      </span>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
