'use client';

import { useEffect } from 'react';

export default function AnimationsProvider() {
  useEffect(() => {
    // Scroll reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e: Event) {
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (!href || href === '#') return;

        const element = document.querySelector(href);
        if (!element) return;

        e.preventDefault();
        const headerHeight = 70;
        const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return null;
}