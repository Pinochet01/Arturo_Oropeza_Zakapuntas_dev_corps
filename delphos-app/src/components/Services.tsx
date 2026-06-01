import { Icons } from './Icons';

const services = [
  {
    Icon: Icons.Layers,
    title: 'Desarrollo Web',
    desc: 'Creamos sitios web modernos, rápidos y responsivos con las mejores tecnologías del mercado.',
    items: ['React / Next.js', 'Tailwind CSS', 'Optimización SEO'],
    border: '#00FFFF',
  },
  {
    Icon: Icons.Circuit,
    title: 'Infraestructura Digital',
    desc: 'Desplegamos y mantenemos infraestructura cloud confiable con alta disponibilidad.',
    items: ['Servidores 24/7', 'CI/CD automatizado', 'Monitoreo continuo'],
    border: '#FF00FF',
  },
  {
    Icon: Icons.Hexagon,
    title: 'Blockchain y Web3',
    desc: 'Integramos tecnologías descentralizadas para aplicaciones seguras y transparentes.',
    items: ['Smart contracts', 'Redes Ziti', 'Identidad digital'],
    border: '#BF00FF',
  },
  {
    Icon: Icons.Grid,
    title: 'Ruteo y GIS',
    desc: 'Optimizamos rutas de entrega con sistemas de información geográfica.',

    items: ['Optimización de rutas', 'Mapas interactivos', 'Logística inteligente'],
    border: '#00FF9F',
  },
];

export default function Services() {
  return (
    <section className="py-20 px-6" id="servicios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Servicios</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Lo que hacemos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <article
              key={i}
              className="p-6 bg-[#1A1A25] border border-[#2A2550] rounded-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                ['--hover-border' as string]: service.border,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = service.border; e.currentTarget.style.boxShadow = `0 0 30px ${service.border}33`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="mb-4 flex justify-center"><service.Icon color={service.border} size={36} /></div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.desc}</p>
              <ul className="text-gray-500 space-y-2">
                {service.items.map((item, j) => <li key={j}>• {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
