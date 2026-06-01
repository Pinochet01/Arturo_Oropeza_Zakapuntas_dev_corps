export default function Footer() {
  return (
    <footer className="bg-white text-ink py-12 px-4 border-t-4 border-primary">
      <div className="container-main grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/logos/Renova_logo.png" alt="Renova" className="h-10 rounded-lg" />
            <span className="font-display text-xl font-bold text-ink">
              RENOVA<span className="text-xs font-normal opacity-80 block font-body text-muted">ENERGÍA</span>
            </span>
          </div>
          <p className="text-muted text-sm mb-4">Líderes en energía solar en Morelia y Michoacán. Comprometidos con un futuro más limpio y sostenible.</p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/RSolucionesRenovables" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center text-orange hover:bg-terracotta hover:text-black transition-all">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center text-orange hover:bg-terracotta hover:text-black transition-all">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center text-orange hover:bg-terracotta hover:text-black transition-all">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Servicios</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#servicios" className="text-muted hover:text-primary transition-colors">Paneles Residenciales</a></li>
            <li><a href="#servicios" className="text-muted hover:text-primary transition-colors">Paneles Comerciales</a></li>
            <li><a href="#servicios" className="text-muted hover:text-primary transition-colors">Mantenimiento</a></li>
            <li><a href="#servicios" className="text-muted hover:text-primary transition-colors">Financiamiento</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Empresa</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Nosotros</a></li>
            <li><a href="#proyectos" className="text-muted hover:text-primary transition-colors">Proyectos</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#contacto" className="text-muted hover:text-primary transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Contacto</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="tel:+524431112869" className="text-muted hover:text-primary transition-colors">+52 443 111 2869</a></li>
            <li><a href="mailto:info@renova.mx" className="text-muted hover:text-primary transition-colors">info@renova.mx</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Morelia, Michoacán</a></li>
          </ul>
        </div>
      </div>

      <div className="container-main mt-10 pt-6 border-t border-white/10 text-center">
        <p className="text-text-muted text-sm">
          © 2026 <a href="#" className="text-primary hover:text-primary-active transition-colors">Renova Energía Solar</a>. 
          Desarrollado por <a href="https://delphosdesign.share.zrok.io/" className="text-primary hover:text-primary-active transition-colors">Delphos Marketing</a>
        </p>
      </div>
    </footer>
  );
}