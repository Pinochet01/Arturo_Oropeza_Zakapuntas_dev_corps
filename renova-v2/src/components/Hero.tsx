export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-16 px-4 bg-white" id="inicio">
      <div className="container-main relative z-10 w-full">
        {/* Mobile: Centered stacked layout */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-6">
            Transforma tu hogar con <span className="text-primary">energía solar</span>
          </h1>
          
          <div className="relative mb-8 animate-bounce-slow">
            <img 
              src="/assets/logos/Renova_logo.png" 
              alt="Renova Energía Solar" 
              className="w-64 md:w-80 max-w-xs mx-auto"
            />
          </div>

          <p className="text-lg text-body mb-6 leading-relaxed max-w-lg">
            Ahorra hasta 90% en tu factura de luz con paneles solares de primera calidad. 
            Instalación profesional en solo 3 días con garantía de 25 años.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="#contacto" 
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold text-lg rounded-[20px] transition-all hover:bg-primary-active hover:-translate-y-0.5"
            >
              Solicitar Cotización Gratis
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-ink text-sm">
              <i className="fas fa-award text-primary"></i>
              <span>Certificados CFE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-ink text-sm">
              <i className="fas fa-leaf text-primary"></i>
              <span>100% Limpia</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-full text-ink text-sm">
              <i className="fas fa-tools text-primary"></i>
              <span>Servicio Local</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}