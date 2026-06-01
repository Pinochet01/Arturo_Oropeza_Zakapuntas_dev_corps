const testimonials = [
  {
    text: 'Excelente trabajo, puntuales y muy profesionales. Renovaron toda la instalación eléctrica de mi nave industrial sin interrumpir operaciones. Muy recomendados.',
    initials: 'JM', name: 'Jorge Martínez', role: 'Gerente de Planta — Morelia', color: '#1F3B73',
  },
  {
    text: 'Contratamos TecnoObra para la plomería de un edificio de 8 departamentos. Trabajo limpio, en tiempo y con garantía. Los volvería a contratar sin dudar.',
    initials: 'AL', name: 'Ana Luisa Ramírez', role: 'Desarrolladora Inmobiliaria — Zacapu', color: '#cc785c',
  },
  {
    text: 'Instalaron la red neumática completa de nuestra planta. El diseño fue impecable y el tiempo de entrega superó nuestras expectativas. Profesionalismo total.',
    initials: 'RC', name: 'Roberto Cervantes', role: 'Director Técnico — Uruapan', color: '#5db8a6',
  },
  {
    text: 'Remodelamos nuestra casa completamente con ellos. Albañilería, electricidad y plomería en una sola empresa. Ahorro de tiempo y el resultado fue increíble.',
    initials: 'MG', name: 'María González', role: 'Propietaria — Morelia', color: '#D4AF37',
  },
  {
    text: 'Resolvieron una fuga complicada que otros no pudieron. Diagnóstico preciso, solución rápida y precio justo. Honestidad y calidad en cada paso del trabajo.',
    initials: 'FH', name: 'Fernando Herrera', role: 'Administrador — Zamora', color: '#FF8A00',
  },
];

export default function ConstruccionTestimonials() {
  return (
    <section id="constr-testimonios" className="py-20 md:py-24 px-4"
      style={{ background: '#0d1f42' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Lo que dicen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            Clientes Satisfechos
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: '#FF8A00' }} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i}
              className="p-6 rounded-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
              <div className="text-lg mb-3" style={{ color: '#FFD700' }}>
                {'★'.repeat(5)}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontStyle: 'italic' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: t.color, color: '#fff' }}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: '#8e8b82', fontFamily: "'Montserrat', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
