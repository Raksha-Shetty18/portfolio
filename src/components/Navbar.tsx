'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code2, Lock } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Me', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className="glass"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: isScrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
        background: isScrolled ? 'rgba(8, 11, 17, 0.85)' : 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.05em' }}>
          <Code2 className="text-gradient" size={24} />
          <span>RAKSHA</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-menu">
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/admin/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}>
            <Lock size={14} />
            Admin Login
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            width: '100%',
            background: 'rgba(8, 11, 17, 0.95)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '1.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none', width: '100%', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="btn btn-secondary"
            style={{ width: '80%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Lock size={16} />
            Admin Login
          </Link>
        </div>
      )}

      {/* Media Queries */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
