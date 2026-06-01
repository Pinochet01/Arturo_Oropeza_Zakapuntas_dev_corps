import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#constr-servicios', label: 'Servicios' },
  { href: '#constr-cultura', label: 'Nosotros' },
  { href: '#constr-galeria', label: 'Proyectos' },
  { href: '#constr-testimonios', label: 'Clientes' },
  { href: '#constr-contacto', label: 'Cotizar', cta: true },
];

export default function ConstruccionNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
        style={{ background: isScrolled ? 'rgba(10,10,15,0.97)' : 'transparent', borderBottom: isScrolled ? '1px solid rgba(255,138,0,0.15)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#constr-home" className="flex items-center gap-1 no-underline"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
            <span style={{ color: '#fff', fontSize: '1.25rem', letterSpacing: '1px' }}>CHECOS</span>
            <span style={{ color: '#FF8A00', fontSize: '1.25rem', letterSpacing: '1px' }}>CONSTRUYENDO</span>
            <span style={{ color: '#fff', fontSize: '1.25rem', letterSpacing: '1px' }}> SUEÑOS</span>
          </a>
          <button className="lg:hidden w-[42px] h-[42px] flex items-center justify-center rounded"
            style={{ border: '1px solid rgba(255,138,0,0.4)', background: 'rgba(255,138,0,0.1)' }}
            onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
            <span style={{ color: '#FF8A00', fontSize: '1.5rem', lineHeight: 1 }}>{isOpen ? '✕' : '☰'}</span>
          </button>
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}
                  className="px-3 py-2 text-sm font-medium tracking-wide transition-all rounded"
                  style={{
                    color: link.cta ? '#fff' : '#C7C7C7',
                    background: link.cta ? '#FF8A00' : 'transparent',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: link.cta ? 600 : 400,
                  }}
                  onMouseEnter={e => { if (!link.cta) e.currentTarget.style.color = '#FF8A00'; }}
                  onMouseLeave={e => { if (!link.cta) e.currentTarget.style.color = '#C7C7C7'; }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setIsOpen(false)} />}
      <div className={`fixed top-0 right-0 z-50 w-72 h-full transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: '#0d1f42', borderLeft: '1px solid rgba(255,138,0,0.2)' }}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} style={{ color: '#FF8A00', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
        <div className="px-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className="block py-3 text-sm font-medium transition-colors"
              style={{
                color: link.cta ? '#fff' : '#C7C7C7',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'Montserrat', sans-serif",
              }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
