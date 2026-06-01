import { useEffect, useState } from 'react';

export default function Stats() {
  const [counts, setCounts] = useState({ proyectos: 0, tecnologias: 0, uptime: 0, disponibilidad: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const el = document.getElementById('stats');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function animateCounters() {
    const targets = { proyectos: 7, tecnologias: 5, uptime: 999, disponibilidad: 247 };
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        proyectos: Math.round(targets.proyectos * ease),
        tecnologias: Math.round(targets.tecnologias * ease),
        uptime: Math.round(targets.uptime * ease),
        disponibilidad: Math.round(targets.disponibilidad * ease),
      });
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  return (
    <section className="py-12 backdrop-blur-sm bg-[#13102A]/60 border-y border-[#2A2550]" id="stats">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#00FFFF] animate-counter-glow">{counts.proyectos}</div>
          <div className="text-gray-500 mt-2">Sitios Web</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#FF00FF]">{counts.tecnologias}</div>
          <div className="text-gray-500 mt-2">Tecnolog&iacute;as</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#BF00FF]">{counts.uptime / 10}%</div>
          <div className="text-gray-500 mt-2">Uptime</div>
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-bold text-[#00FF9F]">24/7</div>
          <div className="text-gray-500 mt-2">Disponibilidad</div>
        </div>
      </div>
    </section>
  );
}
