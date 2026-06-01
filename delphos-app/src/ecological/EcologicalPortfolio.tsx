const projects = [
  { img: 'folio01.jpg', title: 'Residential Solar', desc: '5.2kW System - Altozano, Morelia' },
  { img: 'folio02.jpg', title: 'Commercial Solar', desc: '50kW System - Frankfurt, Alemania' },
  { img: 'folio03.jpg', title: 'Rooftop Installation', desc: '7.8kW System - Carniceria la Espanola, Morelia, Mich' },
  { img: 'folio04.jpg', title: 'Ground Mount System', desc: '12kW System - La Promotora, Zacapu, Mich' },
  { img: 'folio05.jpg', title: 'Solar Farm', desc: '250kW Installation - La Promotora, Zacapu, Mich' },
  { img: 'folio7.jpeg', title: 'Industrial Solar', desc: '100kW System - Morelia, Mich' },
  { img: 'folio7.jpeg', title: 'Community Solar', desc: '75kW Project - Morelia, Mich' },
  { img: 'folio01.jpg', title: 'Solar + Storage', desc: '8kW with Battery - Morelia, Mich' },
  { img: 'folio02.jpg', title: 'Agricultural Solar', desc: '30kW System - Alemania' },
];

export default function EcologicalPortfolio() {
  return (
    <section id="eco-portfolio" className="py-20 md:py-24 px-4"
      style={{ backgroundColor: '#f5f0e8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            Nuestros Proyectos Solares
          </h2>
          <p className="text-xl" style={{ color: '#3d3d3a', fontWeight: 500 }}>
            Instalaciones reales que muestran eficiencia, calidad y soluciones de energía limpia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i}
              className="relative overflow-hidden rounded-lg cursor-default group"
              style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '2px solid transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(212,175,55,0.25), 0 15px 35px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}>
              <img src={`/ecological/img/portafolios/${p.img}`} alt={p.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-400"
                style={{ transitionDuration: '0.4s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                <h5 className="text-white font-semibold text-base">{p.title}</h5>
                <p className="text-white/90 text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://wa.me/5214436942217" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full transition-all"
            style={{ backgroundColor: '#25d366', color: '#fff', fontFamily: "'Raleway', sans-serif" }}>
            Solicitar Información del Proyecto
          </a>
        </div>
      </div>
    </section>
  );
}