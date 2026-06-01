export default function Projects() {
  const projects = [
    {
      img: '/assets/proyectos/residencial-1.jpg',
      category: 'Residencial',
      title: 'Casa Familiar',
      description: 'Sistema 6kW - Morelia',
    },
    {
      img: '/assets/proyectos/comercial-1.jpg',
      category: 'Comercial',
      title: 'Nave Industrial',
      description: 'Sistema 25kW - Morelia',
    },
    {
      img: '/assets/proyectos/residencial-2.jpg',
      category: 'Residencial',
      title: 'Casa Premium',
      description: 'Sistema 8kW - Morelia',
    },
    {
      img: '/assets/proyectos/industrial-install.jpg',
      category: 'Industrial',
      title: 'Instalación Industrial',
      description: 'Sistema 30kW',
    },
    {
      img: '/assets/proyectos/proyecto-1.jpg',
      category: 'Residencial',
      title: 'Casa Habitación',
      description: 'Sistema 5kW',
    },
    {
      img: '/assets/proyectos/proyecto-3.jpg',
      category: 'Residencial',
      title: 'Villa Solar',
      description: 'Sistema 7kW',
    },
    {
      img: '/assets/proyectos/instalation_de_paneles.jpeg',
      category: 'Industrial',
      title: 'Planta Solar',
      description: 'Sistema 50kW',
    },
  ];

  return (
    <section className="py-20 px-4 bg-surface-soft" id="proyectos">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">Portafolio</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">Nuestros Proyectos</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-4">Instalaciones realizadas en Morelia y Michoacán</p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-orange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative bg-surface-dark rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(113,194,56,0.15)] border border-[rgba(113,194,56,0.1)]"
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full aspect-[4/3] object-cover bg-surface-dark" 
                loading="lazy" 
              />
              <span className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold rounded ${project.category === 'Industrial' ? 'bg-renova-gold text-white' : 'bg-renova-turquoise text-white'}`}>
                {project.category}
              </span>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <h3 className="text-lg text-white mb-1">{project.title}</h3>
                <p className="text-sm text-white/70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 p-8 bg-[rgba(20,40,60,0.5)] rounded-xl">
          <p className="text-lg text-ink mb-4">¿Listo para tu propio proyecto de energía solar?</p>
          <a 
            href="#contacto" 
            className="inline-block px-7 py-3.5 bg-terracotta text-black font-semibold rounded-[20px] transition-all hover:bg-terracotta-dark hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)]"
          >
            Contáctanos Ahora
          </a>
        </div>
      </div>
    </section>
  );
}