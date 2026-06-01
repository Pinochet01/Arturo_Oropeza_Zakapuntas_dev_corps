import { useEffect } from 'react';
import ConstruccionNav from './ConstruccionNav';
import ConstruccionHero from './ConstruccionHero';
import ConstruccionServices from './ConstruccionServices';
import ConstruccionAbout from './ConstruccionAbout';
import ConstruccionPortfolio from './ConstruccionPortfolio';
import ConstruccionTestimonials from './ConstruccionTestimonials';
import ConstruccionContact from './ConstruccionContact';
import ConstruccionFooter from './ConstruccionFooter';

export default function ConstruccionPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('constr-visible');
        }
      });
    }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    document.querySelectorAll('.constr-fade').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh' }}>
      <ConstruccionNav />
      <ConstruccionHero />
      <div className="constr-fade"><ConstruccionServices /></div>
      <div className="constr-fade"><ConstruccionAbout /></div>
      <div className="constr-fade"><ConstruccionPortfolio /></div>
      <div className="constr-fade"><ConstruccionTestimonials /></div>
      <div className="constr-fade"><ConstruccionContact /></div>
      <ConstruccionFooter />

      <style>{`
        .constr-fade {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .constr-fade.constr-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
