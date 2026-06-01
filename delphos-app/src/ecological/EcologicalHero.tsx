import { useEffect, useRef } from 'react';

export default function EcologicalHero() {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const els = floatingRef.current?.querySelectorAll('.hero-floating');
      if (els) {
        els.forEach((el, i) => {
          const speed = 0.2 + i * 0.08;
          (el as HTMLElement).style.transform = `translateY(${winScroll * speed}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="eco-home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/ecological/img/header_bg.jpeg')" }}>
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(135deg, rgba(250,249,245,0.15), rgba(204,120,92,0.1), rgba(212,175,55,0.1))' }} />
      <div ref={floatingRef} className="absolute inset-0 z-[5] pointer-events-none">
        <div className="hero-floating absolute" style={{ top: '15%', left: '10%', fontSize: '2rem', opacity: 0.4 }}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#D4AF37"><circle cx="12" cy="12" r="8"/></svg>
        </div>
        <div className="hero-floating absolute" style={{ top: '25%', right: '15%', fontSize: '1.5rem', opacity: 0.4, animationDelay: '0.5s' }}>
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#5db8a6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div className="hero-floating absolute" style={{ bottom: '20%', left: '20%', fontSize: '1.8rem', opacity: 0.4, animationDelay: '1s' }}>
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#cc785c"><polygon points="13,2 4,14 11,14 10,22 20,10 13,10"/></svg>
        </div>
        <div className="hero-floating absolute" style={{ bottom: '30%', right: '10%', fontSize: '1.2rem', opacity: 0.4, animationDelay: '1.5s' }}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#D4AF37"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>
        </div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="inline-block px-6 py-4 rounded-lg text-3xl md:text-5xl font-bold mb-4 font-serif"
          style={{ color: '#ff8c00', background: 'rgba(40,40,40,0.75)', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          Energizando un Futuro Más Limpio
        </h1>
        <p className="inline-block px-5 py-3 rounded-lg text-lg md:text-xl max-w-2xl mx-auto mb-6"
          style={{ color: '#ff8c00', background: 'rgba(40,40,40,0.75)', fontFamily: "'Inter', sans-serif" }}>
          Soluciones de Energía Sostenible para Hogares y Empresas — Desde Energía Solar hasta Biodigestores.
        </p>
        <div>
          <a href="#eco-services"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full transition-all hover:translate-y-[-2px] hover:shadow-lg"
            style={{ background: '#ff8c00', color: '#fff', fontFamily: "'Raleway', sans-serif" }}>
            Explora Nuestras Soluciones
          </a>
        </div>
      </div>
    </header>
  );
}