const projects = [
  {
    label: 'Obra Civil — Zacapu',
    desc: 'Construcción de nave industrial de 500m² · 2024',
    svg: <g><rect x="8" y="20" width="48" height="32" rx="2" /><rect x="16" y="28" width="15" height="12" /><rect x="33" y="28" width="15" height="20" /><line x1="8" y1="20" x2="32" y2="4" /><line x1="56" y1="20" x2="32" y2="4" /></g>,
  },
  {
    label: 'Instalación Eléctrica Industrial',
    desc: 'Centro de carga 400A · Morelia · 2023',
    svg: <g><circle cx="20" cy="32" r="12" /><line x1="32" y1="32" x2="56" y2="32" /><rect x="44" y="24" width="12" height="16" rx="2" /></g>,
  },
  {
    label: 'Sistema Hidráulico',
    desc: 'Red hidráulica edificio 8 deptos · Zacapu · 2024',
    svg: <g><path d="M16 8 L16 28 Q16 32 20 32 L44 32 Q48 32 48 36 L48 56" /><circle cx="48" cy="56" r="6" /></g>,
  },
  {
    label: 'Vitropiso — Morelia',
    desc: 'Acabado vitropiso 200m² · 2023',
    svg: <g><rect x="8" y="16" width="48" height="32" rx="1" /><line x1="32" y1="16" x2="32" y2="48" /><line x1="8" y1="32" x2="56" y2="32" /></g>,
  },
  {
    label: 'Remodelación Residencial',
    desc: 'Casa habitación 150m² · Uruapan · 2024',
    svg: <g><rect x="12" y="24" width="40" height="28" rx="2" /><rect x="20" y="32" width="24" height="12" /><circle cx="32" cy="38" r="4" /></g>,
  },
  {
    label: 'Mantenimiento Industrial',
    desc: 'Planta maquilera · Zamora · 2024',
    svg: <g><circle cx="24" cy="24" r="8" /><circle cx="24" cy="24" r="3" /><rect x="36" y="20" width="16" height="24" rx="2" /><line x1="20" y1="44" x2="44" y2="44" /></g>,
  },
];

export default function ConstruccionPortfolio() {
  return (
    <section id="constr-galeria" className="py-20 md:py-24 px-4"
      style={{ background: '#111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Portafolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            Proyectos Realizados
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: '#FF8A00' }} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div key={i}
              className="relative overflow-hidden rounded-lg cursor-default group"
              style={{ background: '#1a1a25', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="flex items-center justify-center h-56"
                style={{ background: 'linear-gradient(135deg, #0d1f42, #1a3060)' }}>
                <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.7">
                  {p.svg}
                </svg>
              </div>
              <div className="p-5">
                <h4 className="text-base font-bold mb-1" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif" }}>{p.label}</h4>
                <p className="text-xs" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif" }}>{p.desc}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(10,10,15,0.85)' }}>
                <span className="px-5 py-2 rounded-full text-sm font-semibold"
                  style={{ border: '1px solid #FFD700', color: '#FFD700', fontFamily: "'Montserrat', sans-serif" }}>
                  Ver Proyecto
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
