import { useState, useEffect } from 'react';
import { Icons } from './Icons';

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#portfolio', label: 'Portafolio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0D0B1E]/95 backdrop-blur-md border-[#2A2550]' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-display font-bold text-white">
            <Icons.Hexagon color="#00FFFF" size={24} />
            <span>Delphos</span>
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-gray-300 hover:text-[#00FFFF] transition-colors">{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="px-4 py-2 border border-[#00FFFF] text-[#00FFFF] rounded hover:bg-[#00FFFF] hover:text-[#0D0B1E] transition-all">Contacto</a>
            </li>
          </ul>
          <button className="md:hidden p-2 text-gray-300" onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 z-50 w-72 h-full bg-[#13102A] border-l border-[#2A2550] p-6 transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <Icons.Hexagon color="#00FFFF" size={24} />
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-gray-300 hover:text-[#00FFFF] border-b border-[#2A2550] transition-colors">
            {link.label}
          </a>
        ))}
        <a href="#contacto" onClick={() => setIsOpen(false)} className="block mt-6 py-3 bg-[#00FFFF] text-[#0D0B1E] font-semibold text-center rounded">Contacto</a>
      </div>
    </>
  );
}
