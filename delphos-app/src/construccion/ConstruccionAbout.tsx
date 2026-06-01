const values = [
  { icon: 'trophy', label: 'Profesionalismo' },
  { icon: 'handshake', label: 'Honestidad' },
  { icon: 'check', label: 'Calidad y Seguridad' },
  { icon: 'star', label: 'Respeto' },
  { icon: 'bulb', label: 'Innovación' },
  { icon: 'clipboard', label: 'Cumplimiento' },
];

function ValueIcon({ type }: { type: string }) {
  const props = { width: 28, height: 28, fill: 'none', stroke: '#FFD700', strokeWidth: 1.5 };
  if (type === 'trophy') return <svg {...props} viewBox="0 0 64 64"><path d="M20 8h24v12c0 8-6 16-12 16s-12-8-12-16V8z"/><path d="M20 8H12v4c0 6 4 10 8 10"/><path d="M44 8h8v4c0 6-4 10-8 10"/><line x1="32" y1="36" x2="32" y2="52"/><line x1="22" y1="52" x2="42" y2="52"/></svg>;
  if (type === 'handshake') return <svg {...props} viewBox="0 0 64 64"><path d="M8 40v16h16l16-16"/><path d="M56 24v-8H40L24 32"/><path d="M8 40l8-8 16-16h12"/><path d="M48 24l8 8v8"/></svg>;
  if (type === 'check') return <svg {...props} viewBox="0 0 64 64"><circle cx="32" cy="32" r="22"/><polyline points="20,32 28,40 44,24"/></svg>;
  if (type === 'star') return <svg {...props} viewBox="0 0 64 64"><polygon points="32,4 40,24 60,24 44,36 48,56 32,44 16,56 20,36 4,24 24,24"/></svg>;
  if (type === 'bulb') return <svg {...props} viewBox="0 0 64 64"><path d="M32 8c-8 0-14 6-14 14 0 6 3 10 6 14 2 2 3 4 3 6h10c0-2 1-4 3-6 3-4 6-8 6-14 0-8-6-14-14-14z"/><line x1="26" y1="46" x2="38" y2="46"/><line x1="28" y1="52" x2="36" y2="52"/></svg>;
  if (type === 'clipboard') return <svg {...props} viewBox="0 0 64 64"><rect x="16" y="8" width="32" height="48" rx="4"/><line x1="22" y1="20" x2="42" y2="20"/><line x1="22" y1="30" x2="42" y2="30"/><line x1="22" y1="40" x2="34" y2="40"/><rect x="24" y="4" width="16" height="8" rx="2"/></svg>;
  return null;
}

export default function ConstruccionAbout() {
  return (
    <section id="constr-cultura" className="py-20 md:py-24 px-4"
      style={{ background: '#0d1f42' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Quiénes Somos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            Cultura Corporativa
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: '#FF8A00' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-xs font-semibold tracking-widest mb-2" style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
              {'// misión'}
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif" }}>Misión</h3>
            <p style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
              Brindar soluciones integrales con calidad, seguridad y profesionalismo en cada proyecto, superando las expectativas de nuestros clientes mediante innovación técnica y un equipo humano comprometido con la excelencia.
            </p>
          </div>
          <div className="p-8 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-xs font-semibold tracking-widest mb-2" style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
              {'// visión'}
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif" }}>Visión</h3>
            <p style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
              Ser la empresa técnica más confiable y recomendada en México por su excelencia y compromiso. Expandir nuestra presencia nacional como referente de calidad en construcción e instalaciones industriales para 2030.
            </p>
          </div>
        </div>
        <div className="text-center mb-8">
          <div className="text-xs font-semibold tracking-widest mb-2" style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Nuestros Valores
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {values.map((v, i) => (
            <div key={i}
              className="flex flex-col items-center p-5 rounded-lg text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.background = 'rgba(255,215,0,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
              <div className="mb-3"><ValueIcon type={v.icon} /></div>
              <div className="text-sm font-semibold" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
