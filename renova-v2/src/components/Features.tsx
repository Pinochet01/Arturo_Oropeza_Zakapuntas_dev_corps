'use client';

import { useEffect, useState } from 'react';

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('garantias');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Garantía de 25 Años',
      description: 'Todos nuestros paneles incluyen garantía completa de rendimiento. Tu inversión protegida.',
    },
    {
      icon: 'fas fa-certificate',
      title: 'Técnicos Certificados',
      description: 'Equipo profesional con más de 10 años de experiencia. Instalación segura y eficiente.',
    },
    {
      icon: 'fas fa-hand-holding-usd',
      title: 'Garantía de Ahorro',
      description: 'Te garantizamos mínimo 70% de ahorro o devolvemos la diferencia. Sin letras pequeñas.',
    },
  ];

  const stats = [
    { num: '10+', label: 'Instalaciones' },
    { num: '98%', label: 'Clientes Satisfechos' },
    { num: '10+', label: 'Años de Experiencia' },
    { num: '24/7', label: 'Soporte' },
  ];

  return (
    <section className="py-20 px-4 bg-surface-soft" id="garantias">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">¿Por Qué Elegirnos?</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">Tu Mejor Opción en Michoacán</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-4">Compromiso, calidad y respaldo en cada instalación</p>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white border border-hairline rounded-xl p-10 text-center transition-all duration-400 hover:-translate-y-2 hover:border-primary hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-5 bg-renova-turquoise rounded-full flex items-center justify-center text-2xl text-white">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{feature.title}</h3>
              <p className="text-body leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-white rounded-2xl border border-hairline">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="block text-5xl font-bold text-primary">{stat.num}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}