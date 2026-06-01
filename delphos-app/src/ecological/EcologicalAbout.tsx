export default function EcologicalAbout() {
  return (
    <section id="eco-about" className="py-20 md:py-24 px-4"
      style={{ backgroundColor: '#faf9f5' }}>
      <div className="max-w-3xl mx-auto text-center">
        <img src="/ecological/img/about/about1.png" alt="About Ecological Consciousness"
          className="w-full max-w-2xl mx-auto mb-8 rounded-lg"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} />
        <h2 className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          Sobre Nuestra Misión
        </h2>
        <p className="text-lg mb-4" style={{ color: '#3d3d3a', fontWeight: 500, lineHeight: 1.8 }}>
          Estamos comprometidos a ofrecer sistemas de energía solar de alto rendimiento diseñados para reducir significativamente tus costos de energía mientras contribuimos a un futuro más sostenible.
        </p>
        <p className="text-lg" style={{ color: '#3d3d3a', fontWeight: 500, lineHeight: 1.8 }}>
          Con años de experiencia y pasión por la energía limpia, traemos soluciones confiables que ayudan a construir un mundo más verde.
        </p>
      </div>
    </section>
  );
}