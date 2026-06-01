export default function ConstruccionFooter() {
  return (
    <footer style={{ background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-lg font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span style={{ color: '#fff' }}>CHECOS</span>
              <span style={{ color: '#FF8A00' }}>CONSTRUYENDO</span>
              <span style={{ color: '#fff' }}> SUEÑOS</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8e8b82', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              Empresa mexicana especializada en construcción, plomería, electricidad e instalaciones industriales. Más de 15 años de experiencia al servicio de México.
            </p>
            <div className="flex gap-2 mt-4">
              {['f', 'in', 'ig', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold no-underline transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#C7C7C7' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FF8A00'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#C7C7C7'; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Servicios" items={['Albañilería y Obra Civil', 'Plomería Hidráulica', 'Electricidad Residencial', 'Electricidad Industrial', 'Vitropiso y Tablaroca', 'Mantenimiento Técnico']} />
          <FooterCol title="Empresa" items={['Quiénes somos', 'Proyectos', 'Certificaciones', 'Trabaja con nosotros', 'Aviso de Privacidad', 'Términos y Condiciones']} />
          <div>
            <h4 className="text-sm font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Contacto</h4>
            <ul className="space-y-2 text-xs" style={{ color: '#8e8b82', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              <li>+52 (55) 1234-5678</li>
              <li>contacto@tecnoobraMX.com</li>
              <li>Lun–Vie: 7am–7pm</li>
              <li>Sábado: 8am–2pm</li>
              <li style={{ color: '#FF8A00', marginTop: '0.5rem' }}>📍 Zacapu, Michoacán y región</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 px-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ color: '#6c6a64', fontFamily: "'Montserrat', sans-serif" }}>
          <span>© 2025 CHECOS CONSTRUYENDO SUEÑOS — Todos los derechos reservados</span>
          <span>Ing. en Construcción & Instalaciones Industriales</span>
        </div>
      </div>
      <a href="https://wa.me/5214436942217?text=Hola,%20me%20interesa%20solicitar%20una%20cotización"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 hover:scale-110 transition-transform"
        style={{ background: '#25D366' }}
        aria-label="Chat en WhatsApp">
        <svg viewBox="0 0 48 48" width="28" height="28">
          <path d="M24 4C12.954 4 4 12.954 4 24c0 3.531.929 6.85 2.555 9.72L4 44l10.52-2.52A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4z" fill="#fff"/>
          <path d="M18.2 15.6c-.4-.9-.8-.92-1.18-.94-.3-.01-.65-.01-1-.01-.35 0-.92.13-1.4.65-.48.52-1.84 1.8-1.84 4.38 0 2.58 1.88 5.08 2.14 5.43.26.35 3.64 5.77 8.96 7.85 4.43 1.75 5.33 1.4 6.29 1.31.96-.09 3.1-1.27 3.54-2.49.44-1.22.44-2.27.31-2.49-.13-.22-.48-.35-.99-.61-.52-.26-3.1-1.53-3.58-1.7-.48-.18-.83-.26-1.18.26-.35.52-1.35 1.7-1.66 2.05-.3.35-.61.39-1.13.13-.52-.26-2.2-.81-4.19-2.58-1.55-1.38-2.6-3.08-2.9-3.6-.31-.52-.03-.8.23-1.06.23-.23.52-.61.78-.91.26-.3.35-.52.52-.87.18-.35.09-.65-.04-.91-.13-.26-1.16-2.85-1.62-3.89z" fill="#25D366"/>
        </svg>
      </a>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>{title}</h4>
      <ul className="space-y-2 text-xs" style={{ color: '#8e8b82', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
