'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#garantias', label: 'Garantías' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect if Google Translate already applied (e.g. after reload with cookie)
  useEffect(() => {
    const hasCookie =
      document.cookie.includes('googtrans=/es/en') ||
      document.cookie.includes('googtrans=/auto/en');
    if (hasCookie) setLang('en');
  }, []);

  const closeMenu = () => setIsOpen(false);

  const switchToEnglish = () => {
    if (lang === 'en' || isTranslating) return;
    setIsTranslating(true);
    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
        setLang('en');
        setIsTranslating(false);
      } else if (attempts < 30) {
        setTimeout(() => tryTranslate(attempts + 1), 150);
      } else {
        // Fallback: set cookie and reload — Google Translate picks it up on load
        document.cookie = 'googtrans=/es/en; path=/';
        document.cookie = `googtrans=/es/en; path=/; domain=.${window.location.hostname}`;
        window.location.reload();
      }
    };
    tryTranslate();
  };

  const switchToSpanish = () => {
    if (lang === 'es') return;
    // Clear Google Translate cookies — page reloads in original Spanish
    const clearCookie = (name: string, domain?: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domain ? `; domain=${domain}` : ''}`;
    };
    clearCookie('googtrans');
    clearCookie('googtrans', `.${window.location.hostname}`);
    window.location.reload();
  };

  const handleDesktopToggle = () => {
    if (lang === 'es') switchToEnglish();
    else switchToSpanish();
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-white shadow-lg py-2'
            : 'bg-white/95 backdrop-blur-md py-3'}`}
      >
        <div className="container-main flex items-center justify-between h-14 px-4 md:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img
              src="/assets/logos/Renova_logo.png"
              alt="Renova"
              className="h-8 w-auto"
            />
            <span className="font-display text-lg font-bold text-ink">
              RENOVA<span className="text-xs font-normal opacity-80 block font-body text-muted">ENERGÍA</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            <ul className="flex gap-2 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-ink font-medium text-xs hover:text-primary transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Language toggle — desktop */}
            <button
              onClick={handleDesktopToggle}
              disabled={isTranslating}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-ink font-medium text-xs hover:text-primary transition-all border border-primary/30 rounded disabled:opacity-50 disabled:cursor-wait"
              title={lang === 'es' ? 'Translate to English' : 'Ver en Español'}
            >
              <i className={`fas ${isTranslating ? 'fa-spinner fa-spin' : 'fa-globe'} text-xs`} />
              <span>{isTranslating ? '...' : lang === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white font-semibold text-xs rounded hover:bg-primary-active transition-all"
            >
              Cotizar Ahora
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="w-5 h-0.5 bg-primary rounded" />
            <span className="w-5 h-0.5 bg-primary rounded" />
            <span className="w-5 h-0.5 bg-primary rounded" />
          </button>
        </div>
      </header>


      {/* Mobile Menu */}
      <nav
        className={`mobile-nav fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-[1001] p-6 flex flex-col gap-4 transition-all duration-300 ${
          isOpen ? 'right-0' : 'right-[-100%]'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <img src="/assets/logos/Renova_logo.png" alt="Renova" className="h-8" />
          <button onClick={closeMenu} className="p-2 text-ink hover:text-primary">
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        <a href="#inicio" onClick={closeMenu} className="py-3 text-ink font-medium border-b border-hairline">Inicio</a>
        <a href="#servicios" onClick={closeMenu} className="py-3 text-ink font-medium border-b border-hairline">Servicios</a>
        <a href="#proyectos" onClick={closeMenu} className="py-3 text-ink font-medium border-b border-hairline">Proyectos</a>
        <a href="#garantias" onClick={closeMenu} className="py-3 text-ink font-medium border-b border-hairline">Garantías</a>
        <a href="#contacto" onClick={closeMenu} className="py-3 text-ink font-medium border-b border-hairline">Contacto</a>

        {/* Language toggle — mobile */}
        <div className="py-3 border-b border-hairline">
          <span className="text-sm text-muted mb-2 block">Idioma / Language:</span>
          <div className="flex gap-2">
            <button
              onClick={() => { switchToSpanish(); closeMenu(); }}
              disabled={lang === 'es' || isTranslating}
              className={`px-3 py-1 text-xs rounded transition-all ${
                lang === 'es'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-surface-soft text-ink hover:bg-hairline disabled:opacity-50'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => { switchToEnglish(); closeMenu(); }}
              disabled={lang === 'en' || isTranslating}
              className={`px-3 py-1 text-xs rounded transition-all ${
                lang === 'en'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-surface-soft text-ink hover:bg-hairline disabled:opacity-50'
              }`}
            >
              {isTranslating ? '...' : 'English'}
            </button>
          </div>
        </div>

        <a
          href="#contacto"
          onClick={closeMenu}
          className="mt-4 py-3 bg-primary text-white font-semibold text-center rounded-lg"
        >
          Cotizar Ahora
        </a>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-all z-40 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      />
    </>
  );
}
