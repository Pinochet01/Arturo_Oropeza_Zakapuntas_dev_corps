const reasons = [
  {
    icon: 'check',
    title: 'Expertos Certificados',
    desc: 'Nuestros técnicos están certificados y capacitados para entregar instalaciones solares de primer nivel según los estándares de la industria.',
    iconColor: '#5db8a6',
  },
  {
    icon: 'bolt',
    title: 'Alto Rendimiento',
    desc: 'Utilizamos paneles solares premium diseñados para máxima eficiencia y durabilidad a largo plazo.',
    iconColor: '#cc785c',
  },
  {
    icon: 'leaf',
    title: 'Enfoque en Sostenibilidad',
    desc: 'Te ayudamos a reducir las emisiones de carbono y transitar hacia una fuente de energía más limpia y renovable.',
    iconColor: '#5db8a6',
  },
];

function ReasonIcon({ type }: { type: string }) {
  if (type === 'check') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#5db8a6"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
  if (type === 'bolt') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#cc785c"><polygon points="13,2 4,14 11,14 10,22 20,10 13,10"/></svg>;
  if (type === 'leaf') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#5db8a6"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>;
  return null;
}

export default function EcologicalWhyUs() {
  return (
    <section id="eco-why-us" className="py-20 md:py-24 px-4"
      style={{ backgroundColor: '#faf9f5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            ¿Por Qué Elegir ECOLOGICAL CONSCIOUSNESS?
          </h2>
          <p className="text-xl" style={{ color: '#3d3d3a', fontWeight: 500 }}>
            Confiados por hogares y empresas que buscan energía limpia confiable.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i}
              className="p-6 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 cursor-default"
              style={{
                backgroundColor: '#f5f0e8',
                border: '1px solid #e6dfd8',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.2), 0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e6dfd8';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
              <div className="mb-4 flex justify-center"><ReasonIcon type={r.icon} /></div>
              <h4 className="text-xl font-bold mb-3" style={{ color: '#cc785c' }}>{r.title}</h4>
              <p style={{ color: '#444', fontWeight: 500, lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}