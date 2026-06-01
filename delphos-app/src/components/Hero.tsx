import { Icons } from './Icons';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0D0B1E' }} id="hero">
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="Delphos" className="w-full h-full object-cover" style={{ opacity: 1, filter: 'brightness(1.8) contrast(1.3) saturate(2.5)' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B1E]/30 via-transparent to-[#0D0B1E]/50" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 255, 255, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(191, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0, 255, 159, 0.08) 0%, transparent 40%)' }} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Icons.Hexagon color="#00FFFF" size={48} />
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
            Delphos
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
          Iluminamos tu historia
        </p>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
           Desarrollo web profesional desde Zacapu, Michoacán. Infraestructura digital, automatización, blockchain y sistemas GIS para marcas que buscan trascender.
         </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <a href="#contacto" className="px-8 py-3 bg-[#00FFFF] text-[#0D0B1E] font-semibold rounded hover:bg-[#00CCCC] transition-all">
             Contactanos
           </a>
           <a href="#servicios" className="px-8 py-3 border border-[#00FFFF] text-[#00FFFF] rounded hover:bg-[#00FFFF] hover:text-[#0D0B1E] transition-all">
            Servicios
          </a>
        </div>
      </div>
    </section>
  );
}
