const services = [
  {
    title: 'Albañilería y Obra Civil',
    desc: 'Construcción y remodelación de espacios residenciales e industriales. Trabajamos con los mejores materiales y técnicas de construcción modernas para garantizar durabilidad.',
    svg: <g><rect x="8" y="36" width="48" height="8" /><rect x="12" y="28" width="22" height="8" /><rect x="36" y="28" width="22" height="8" /><rect x="8" y="20" width="48" height="8" /><line x1="32" y1="8" x2="32" y2="20" /><line x1="20" y1="8" x2="44" y2="8" /></g>,
  },
  {
    title: 'Plomería e Instalaciones Hidráulicas',
    desc: 'Diseño e instalación de sistemas hidráulicos y sanitarios. Desde tuberías residenciales hasta sistemas industriales de alta presión con cumplimiento de normas NOM.',
    svg: <g><path d="M 16 8 L 16 28 Q 16 32 20 32 L 44 32 Q 48 32 48 36 L 48 56" /><circle cx="48" cy="56" r="6" /><rect x="12" y="28" width="8" height="8" rx="1" /><line x1="28" y1="32" x2="36" y2="32" /></g>,
  },
  {
    title: 'Electricidad Residencial e Industrial',
    desc: 'Instalaciones eléctricas certificadas para hogar, empresa e industria. Tableros, centros de carga, iluminación LED, sistemas de tierra física y protección.',
    svg: <g><polygon points="36,8 20,36 32,36 28,56 44,28 32,28" /><circle cx="32" cy="32" r="28" strokeDasharray="6,4" opacity="0.4" /></g>,
  },
  {
    title: 'Vitropiso y Tablaroca',
    desc: 'Instalación profesional de vitropiso y tablaroca de primera calidad. Acabados perfectos para baños, cocinas y pisos. Variedad de diseños y colores.',
    svg: <g><rect x="8" y="16" width="48" height="32" rx="2" /><line x1="32" y1="16" x2="32" y2="48" /><line x1="8" y1="32" x2="56" y2="32" /><rect x="12" y="20" width="18" height="10" rx="1" /><rect x="34" y="20" width="18" height="10" rx="1" /><circle cx="21" cy="38" r="3" /><circle cx="43" cy="38" r="3" /></g>,
  },
];

export default function ConstruccionServices() {
  return (
    <section id="constr-servicios" className="py-20 md:py-24 px-4"
      style={{ background: '#111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Nuestros Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            ¿Qué Hacemos?
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: '#FF8A00' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i}
              className="p-8 rounded-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: '#1a1a25',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="mb-4">
                <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#FFD700" strokeWidth="1.5">
                  {s.svg}
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>{s.desc}</p>
              <a href="#constr-contacto" className="text-sm font-semibold transition-colors no-underline"
                style={{ color: '#FF8A00', fontFamily: "'Montserrat', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFD700'}
                onMouseLeave={e => e.currentTarget.style.color = '#FF8A00'}>
                Más información →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
