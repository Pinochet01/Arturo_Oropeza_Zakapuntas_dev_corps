export default function Services() {
  const services = [
    {
      icon: 'fas fa-home',
      title: 'Residencial',
      description: 'Sistemas de 4kW a 10kW para casas. Reduce hasta 90% tu consumo de energía.',
      price: '$45,000 MXN',
    },
    {
      icon: 'fas fa-building',
      title: 'Comercial',
      description: 'Sistemas de mayor capacidad para negocios. Optimiza costos operativos.',
      price: '$120,000 MXN',
    },
    {
      icon: 'fas fa-tools',
      title: 'Mantenimiento',
      description: 'Servicio preventivo y correctivo. Mantén tu sistema rindiendo al máximo.',
      price: '$2,500 MXN',
    },
    {
      icon: 'fas fa-file-invoice-dollar',
      title: 'Financiamiento',
      description: 'Planes sin intereses. Haz realidad tu transición a energía renovable.',
      price: '$1,200 MXN/mes',
    },
  ];

  return (
    <section className="py-20 px-4 bg-canvas" id="servicios">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal uppercase mb-3">Nuestros Servicios</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">¿Qué Hacemos?</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-4">Soluciones solares integrales para hogares y negocios en Morelia y región</p>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-surface-card border border-hairline rounded-lg p-8 text-center transition-all duration-400 hover:-translate-y-2.5 hover:border-primary hover:shadow-lg"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-[linear-gradient(135deg,#00B4EB,#F7931E)] rounded-full flex items-center justify-center text-2xl text-white">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 uppercase tracking-wide">{service.title}</h3>
              <p className="text-body leading-relaxed">{service.description}</p>
              <span className="inline-block mt-5 text-sm text-teal">
                Desde <span className="font-bold text-teal">{service.price}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}