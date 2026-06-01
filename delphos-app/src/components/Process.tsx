const steps = [
  { num: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio, tu mercado y tu visión. Identificamos oportunidades, desafíos y ventajas competitivas para construir una base estratégica sólida.', color: '#00FFFF' },
  { num: '02', title: 'Estrategia', desc: 'Diseñamos una hoja de ruta orientada a resultados. Cada decisión creativa y tecnológica responde a objetivos reales de crecimiento e impacto.', color: '#FF00FF' },
  { num: '03', title: 'Creación', desc: 'Construimos con pasión y precisión. Prototipamos, iteramos y refinamos hasta la excelencia.', color: '#BF00FF' },
  { num: '04', title: 'Escalar', desc: 'Impulsamos la evolución continua de tu proyecto mediante análisis, optimización y nuevas oportunidades de crecimiento.', color: '#00FF9F' },
];

export default function Process() {
  return (
    <section className="py-20 px-6" id="proceso">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Proceso</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Cómo trabajamos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-bold text-gray-800 mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b" style={{ background: `linear-gradient(to bottom, ${step.color}, transparent)` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
