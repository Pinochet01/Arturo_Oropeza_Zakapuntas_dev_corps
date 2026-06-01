const services = [
  {
    icon: 'sun',
    title: 'Solar Residencial',
    desc: 'Sistemas personalizados de paneles solares que reducen tu recibo de luz y aumentan tu independencia energética a largo plazo.',
  },
  {
    icon: 'industry',
    title: 'Solar Comercial',
    desc: 'Instalaciones solares a gran escala diseñadas para instalaciones industriales y empresas que buscan energía sostenible.',
  },
  {
    icon: 'wrench',
    title: 'Mantenimiento y Monitoreo',
    desc: 'Inspecciones profesionales de sistemas, monitoreo de rendimiento y soporte de mantenimiento a largo plazo.',
  },
];

function ServiceIcon({ type }: { type: string }) {
  if (type === 'sun') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#cc785c"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
  if (type === 'industry') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#cc785c"><path d="M2 22V7l5-3v4l5-3v4l5-3v4l5-3v15H2zM2 22h20"/><rect x="4" y="10" width="3" height="3"/><rect x="9" y="10" width="3" height="3"/><rect x="14" y="10" width="3" height="3"/><rect x="4" y="15" width="3" height="3"/><rect x="9" y="15" width="3" height="3"/><rect x="14" y="15" width="3" height="3"/><rect x="4" y="20" width="3" height="2"/><rect x="9" y="20" width="3" height="2"/><rect x="14" y="20" width="3" height="2"/></svg>;
  if (type === 'wrench') return <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#cc785c"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
  return null;
}

export default function EcologicalServices() {
  return (
    <section id="eco-services" className="py-20 md:py-24 px-4"
      style={{ backgroundColor: '#faf9f5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            Nuestros Servicios
          </h2>
          <p className="text-xl" style={{ color: '#3d3d3a', fontWeight: 500 }}>
            Soluciones de energía limpia diseñadas para un rendimiento máximo.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i}
              className="relative p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 cursor-default"
              style={{
                backgroundColor: '#faf9f5',
                border: '1px solid #e6dfd8',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.2), 0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e6dfd8';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
              <div className="mb-4"><ServiceIcon type={s.icon} /></div>
              <h4 className="text-xl font-bold mb-3" style={{ color: '#cc785c' }}>{s.title}</h4>
              <p style={{ color: '#444', fontWeight: 500, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md p-6 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 cursor-default"
            style={{
              backgroundColor: '#faf9f5',
              border: '1px solid #e6dfd8',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.2), 0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e6dfd8';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}>
            <img src="/ecological/img/Small/Biogas.png" alt="Biogas"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-white"
              style={{ filter: 'sepia(100%) saturate(350%) hue-rotate(-10deg)' }} />
            <h4 className="text-xl font-bold mb-3" style={{ color: '#cc785c' }}>Diseño e Instalación de Biodigestores</h4>
            <p style={{ color: '#444', fontWeight: 500, lineHeight: 1.7 }}>
              Instalación completa y configuración de sistemas de biodigestión para gestión de residuos y producción de energía renovable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}