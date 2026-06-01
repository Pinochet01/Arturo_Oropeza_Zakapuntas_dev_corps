import { Icons } from './Icons';

export default function About() {
  return (
    <section className="py-20 px-6" id="nosotros">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <span className="inline-block text-[#00FFFF] text-sm font-mono tracking-widest uppercase mb-2">Nosotros</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Hecho en Michoacán</h2>
          <p className="text-xl text-gray-300 mb-4">
            Desarrollador web independiente desde Zacapu, Michoacán. Construyo infraestructura digital que trasciende.
          </p>
          <p className="text-gray-400 mb-8">
            Lo que comenzó como un proyecto personal —una Chromebook siempre encendida— se convirtió en una plataforma que hoy sirve 7 sitios web en vivo. Todo orquestado con túneles zrok, redes Ziti, y un flujo CI/CD artesanal pero efectivo.
          </p>
          <div className="space-y-4">
            {[
              { Icon: Icons.Diamond, title: 'Infraestructura', desc: 'Servidores 24/7 desde cualquier parte', color: '#00FFFF' },
              { Icon: Icons.Target, title: 'Precisión', desc: 'Cada detalle de principio a fin', color: '#FF00FF' },
              { Icon: Icons.Circuit, title: 'Automatización', desc: 'Despliegues simples y confiables', color: '#00FF9F' },
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-4">
                <v.Icon color={v.color} size={28} />
                <div>
                  <h4 className="font-semibold text-white">{v.title}</h4>
                  <p className="text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-[#1A1A25] border border-[#2A2550] rounded-lg p-8 flex flex-col items-center justify-center">
            <Icons.Hexagon color="#00FFFF" size={80} />
            <span className="text-gray-500">Zacapu, Mich.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
