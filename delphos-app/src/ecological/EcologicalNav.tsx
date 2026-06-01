import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#eco-home', label: 'INICIO' },
  { href: '#eco-services', label: 'SERVICIOS' },
  { href: '#eco-why-us', label: '¿POR QUÉ NOSOTROS?' },
  { href: '#eco-about', label: 'ACERCA DE' },
  { href: '#eco-portfolio', label: 'PROYECTOS' },
  { href: '#eco-calculator', label: 'CALCULADORA' },
  { href: '#eco-contact', label: 'CONTACTO' },
];

export default function EcologicalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
        style={{ background: isScrolled
          ? 'linear-gradient(90deg, #ffffff, #f4fff6, #d7f2dc)'
          : 'linear-gradient(90deg, #ffffff, #f4fff6, #d7f2dc)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#eco-home" className="flex items-center">
            <img src="/ecological/img/logo.png" alt="ECOLOGICAL CONSCIOUSNESS Logo" className="h-10 md:h-12"
              style={{ filter: 'brightness(1.05) contrast(1.1)', mixBlendMode: 'multiply' }} />
          </a>
          <button className="md:hidden w-[42px] h-[42px] flex items-center justify-center rounded-full border-2"
            style={{ borderColor: '#D4AF37', background: 'linear-gradient(135deg, #f5f0e5, #e8dcc8, #D4AF37)' }}
            onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
            <svg className="w-5 h-5" fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
          </button>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium tracking-wide transition-colors"
                  style={{ color: '#3d3d3a' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#cc785c'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3d3d3a'}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsOpen(false)} />}
      <div className={`fixed top-0 right-0 z-50 w-72 h-full bg-white border-l shadow-lg p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
            className="block py-3 border-b border-gray-100 text-gray-700 hover:text-[#cc785c] transition-colors font-medium">
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}