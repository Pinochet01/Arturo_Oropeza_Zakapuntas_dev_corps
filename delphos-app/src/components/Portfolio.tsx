const projects = [
  { img: '/screenshots/renova.png', title: 'Renova Solar', desc: 'Distribuidora de paneles solares con calculadora de ahorro energético', tags: ['Next.js 16', 'Tailwind 4', 'TypeScript'], url: 'https://renovasolarmx.share.zrok.io/', color: '#00FFFF' },
  { img: '/screenshots/eco.png', title: 'Eco Conciencia', desc: 'ONG ambiental con calculadora solar, portafolio y blog', tags: ['Next.js 16', 'Tailwind 4', 'TypeScript'], url: 'https://ecoconciencia.share.zrok.io/', color: '#00FF9F' },
  { img: '/screenshots/eco.png', title: 'Conciencia Ecológica', desc: 'Versión en español con traducción EN/ES y patrón circuito dorado', tags: ['Next.js 16', 'Tailwind 4', 'i18n'], url: 'https://concienciaecologica.share.zrok.io/', color: '#D4AF37' },
  { img: '/screenshots/const.png', title: 'Construcción Pro', desc: 'Directorio de profesionales de la construcción en Michoacán', tags: ['HTML', 'CSS', 'JavaScript'], url: 'https://construccionpro.share.zrok.io/', color: '#FF00FF' },
  { img: '/screenshots/albanil.png', title: 'Albañil Patio', desc: 'Plataforma para conectar albañiles con clientes en Michoacán', tags: ['HTML', 'CSS', 'JavaScript'], url: 'https://albanilpatio.share.zrok.io/', color: '#BF00FF' },
  { img: '/screenshots/cv.png', title: 'CV Profesional', desc: 'Hoja de vida interactiva con terminal y efectos visuales', tags: ['Node.js', 'Express', 'CSS'], url: 'https://arturooropeza.share.zrok.io/', color: '#00FFFF' },
  { img: '/screenshots/legal.png', title: 'Legal Docs', desc: 'Plataforma de documentos legales con generación automatizada', tags: ['HTML', 'CSS', 'JavaScript'], url: 'https://legal.share.zrok.io/', color: '#00FF9F' },
];

export default function Portfolio() {
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, rgba(19,16,42,0.3) 0%, rgba(26,22,56,0.5) 50%, rgba(19,16,42,0.3) 100%)', backdropFilter: 'blur(2px)' }} id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Portafolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Proyectos en Vivo</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <a key={i} href={project.url} target="_blank" rel="noopener noreferrer">
              <article className="relative overflow-hidden rounded-lg bg-[#1A1638] group border border-[#2A2550] hover:border-[#00FFFF] transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded border border-gray-700 text-gray-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
