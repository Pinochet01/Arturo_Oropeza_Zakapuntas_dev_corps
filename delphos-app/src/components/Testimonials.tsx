const testimonials = [
  {
    quote: "Transformamos nuestra presencia digital por completo. Ahora nuestros clientes pueden calcular su ahorro solar desde el primer clic. La plataforma es rápida, confiable y se ve profesional.",
    initials: 'AE', name: 'Ing. Angel E.', role: 'Renova Solar', color: '#00FFFF',
  },
  {
    quote: "El sitio web de concientización ambiental que necesitábamos. La calculadora de carbono y el blog han sido clave para nuestra labor de divulgación en Michoacán.",
    initials: 'EN', name: 'Ing. Esteban Negrete', role: 'Eco Conciencia', color: '#00FF9F',
  },
  {
    quote: "Antes mis clientes me encontraban de boca en boca. Ahora tengo presencia profesional en internet y recibo cotizaciones nuevas cada semana.",
    initials: 'MS', name: 'Maestro Albañil Sergio', role: 'Albañil Patio', color: '#BF00FF',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-[#1A1A25] border border-[#2A2550] rounded-lg">
              <p className="text-gray-300 mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: `${t.color}33`, color: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <strong className="text-white">{t.name}</strong>
                  <span className="block text-gray-500 text-sm">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
