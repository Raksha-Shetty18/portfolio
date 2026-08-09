'use client';

import { useEffect } from 'react';

export default function ScrollRevealInit() {
  useEffect(() => {
    // Check if browser natively supports CSS scroll-driven view timelines
    const supportsScrollTimeline = 
      typeof window !== 'undefined' && 
      window.CSS && 
      window.CSS.supports && 
      window.CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (!supportsScrollTimeline) {
      console.log('Scroll timelines not supported natively. Initiating IntersectionObserver fallback.');

      const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element reaches center
        threshold: 0.05,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Once revealed, we don't need to observe it again
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Find all scroll-reveal elements
      const targets = document.querySelectorAll('.scroll-reveal');
      targets.forEach((target) => {
        observer.observe(target);
      });

      return () => {
        targets.forEach((target) => {
          observer.unobserve(target);
        });
      };
    }
  }, []);

  return null;
}
