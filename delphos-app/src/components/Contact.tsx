import { Icons } from './Icons';

export default function Contact() {
  return (
    <section className="py-20 px-6" id="contacto">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Hablemos</h2>
          <p className="text-xl text-gray-400 mb-8">¿Listo para llevar tu proyecto al siguiente nivel? Hablemos.</p>
          <div className="space-y-6">
            {[
              { Icon: Icons.Command, label: 'Email', value: 'Arturooropezaprieto3@gmail.com', href: 'mailto:Arturooropezaprieto3@gmail.com', color: '#00FFFF' },
              { Icon: Icons.Grid, label: 'Ubicación', value: 'Zacapu / Morelia, Michoacán, México', color: '#BF00FF' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <item.Icon color={item.color} size={28} />
                <div>
                  <strong className="text-white block">{item.label}</strong>
                  {item.href ? (
                    <a href={item.href} className="text-[#00FFFF] hover:underline">{item.value}</a>
                  ) : (
                    <span className="text-gray-400">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="space-y-6" action="https://formsubmit.co/Arturooropezaprieto3@gmail.com" method="POST">
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-[#1A1A25] border border-gray-700 rounded text-white focus:border-[#00FFFF] focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-[#1A1A25] border border-gray-700 rounded text-white focus:border-[#00FFFF] focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-[#1A1A25] border border-gray-700 rounded text-white focus:border-[#00FFFF] focus:outline-none transition-colors resize-none"></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-[#00FFFF] text-[#0D0B1E] font-semibold rounded hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all">
            Enviar Mensaje
          </button>
          <input type="hidden" name="_subject" value="Nuevo contacto desde Delphos" />
        </form>
      </div>
    </section>
  );
}
