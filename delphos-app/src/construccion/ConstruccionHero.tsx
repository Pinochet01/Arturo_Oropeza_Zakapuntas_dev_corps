export default function ConstruccionHero() {
  return (
    <header id="constr-home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }}>
        <img src="/construccion/Exterior_design.png" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(6,14,31,0.6) 0%, rgba(10,25,50,0.3) 40%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
        }} />
        <svg className="absolute inset-0 z-[2] w-full h-full opacity-80" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(120,180,255,0.8)" strokeWidth="1.5" fill="none">
            <rect x="60" y="80" width="220" height="160" />
            <rect x="80" y="100" width="180" height="60" />
            <rect x="80" y="170" width="80" height="60" />
            <rect x="320" y="60" width="200" height="220" />
            <rect x="560" y="100" width="120" height="120" />
          </g>
          <g stroke="rgba(255,220,80,0.7)" strokeWidth="1.5" fill="none">
            <circle cx="850" cy="120" r="12" />
            <line x1="838" y1="120" x2="862" y2="120" />
            <line x1="850" y1="108" x2="850" y2="132" />
            <polyline points="850,132 850,200 920,200 920,155" />
          </g>
          <g stroke="rgba(80,200,255,0.6)" strokeWidth="2" fill="none">
            <line x1="650" y1="400" x2="900" y2="400" />
            <line x1="750" y1="400" x2="750" y2="500" />
            <line x1="800" y1="400" x2="800" y2="480" />
          </g>
          <g stroke="rgba(200,100,255,0.5)" strokeWidth="1.5" fill="none">
            <ellipse cx="1200" cy="300" rx="40" ry="28" />
            <line x1="1240" y1="300" x2="1350" y2="300" />
            <rect x="1350" y="285" width="50" height="30" fill="rgba(200,100,255,0.12)" />
          </g>
          <g stroke="rgba(120,180,255,0.6)" strokeWidth="1.5" fill="none">
            <rect x="100" y="550" width="350" height="280" />
            <rect x="100" y="550" width="150" height="130" />
            <rect x="100" y="680" width="150" height="150" />
            <rect x="250" y="550" width="200" height="80" />
            <rect x="250" y="630" width="200" height="200" />
            <text x="160" y="620" fill="rgba(120,180,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SALA</text>
            <text x="340" y="740" fill="rgba(120,180,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">COCINA</text>
            <text x="160" y="760" fill="rgba(120,180,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RECÁMARA</text>
          </g>
          <g stroke="rgba(255,138,0,0.4)" strokeWidth="1">
            <line x1="700" y1="0" x2="700" y2="900" />
            <line x1="0" y1="450" x2="1440" y2="450" />
          </g>
        </svg>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5"
          style={{ background: 'rgba(255,138,0,0.12)', color: '#FF8A00', border: '1px solid rgba(255,138,0,0.2)', fontFamily: "'Roboto Mono', monospace" }}>
          Empresa Mexicana de Construcción — Desde 2010
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Oswald', sans-serif", color: '#fff', textTransform: 'uppercase' }}>
          Soluciones<br />
          <span style={{ color: '#FF8A00' }}>Profesionales</span> en<br />
          Construcción &<br />
          Instalaciones
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-8"
          style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
          Construcción, plomería, electricidad y más. Calidad, compromiso y experiencia al servicio de México.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#constr-contacto"
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90"
            style={{ background: '#FF8A00', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
            Solicitar Cotización
          </a>
          <a href="https://wa.me/5214436942217" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
            <svg viewBox="0 0 48 48" width="18" height="18"><path d="M24 4C12.954 4 4 12.954 4 24c0 3.531.929 6.85 2.555 9.72L4 44l10.52-2.52A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4z" fill="#25d366"/><path fillRule="evenodd" clipRule="evenodd" d="M18.2 15.6c-.4-.9-.8-.92-1.18-.94-.3-.01-.65-.01-1-.01-.35 0-.92.13-1.4.65-.48.52-1.84 1.8-1.84 4.38 0 2.58 1.88 5.08 2.14 5.43.26.35 3.64 5.77 8.96 7.85 4.43 1.75 5.33 1.4 6.29 1.31.96-.09 3.1-1.27 3.54-2.49.44-1.22.44-2.27.31-2.49-.13-.22-.48-.35-.99-.61-.52-.26-3.1-1.53-3.58-1.7-.48-.18-.83-.26-1.18.26-.35.52-1.35 1.7-1.66 2.05-.3.35-.61.39-1.13.13-.52-.26-2.2-.81-4.19-2.58-1.55-1.38-2.6-3.08-2.9-3.6-.31-.52-.03-.8.23-1.06.23-.23.52-.61.78-.91.26-.3.35-.52.52-.87.18-.35.09-.65-.04-.91-.13-.26-1.16-2.85-1.62-3.89z" fill="white"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-8 md:gap-16 pb-8 px-4">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold" style={{ color: '#FFD700', fontFamily: "'Oswald', sans-serif" }}>500+</div>
          <div className="text-xs tracking-wider uppercase" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif" }}>Proyectos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold" style={{ color: '#FFD700', fontFamily: "'Oswald', sans-serif" }}>15</div>
          <div className="text-xs tracking-wider uppercase" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif" }}>Años exp.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold" style={{ color: '#FFD700', fontFamily: "'Oswald', sans-serif" }}>100%</div>
          <div className="text-xs tracking-wider uppercase" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif" }}>Satisfacción</div>
        </div>
      </div>
    </header>
  );
}
