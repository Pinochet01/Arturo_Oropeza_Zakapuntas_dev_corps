export default function CryptoSovereignty() {
  return (
    <section className="py-16 px-6 backdrop-blur-sm bg-[#0D0B1E]/50 border-t border-[#2A2550]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Columna Izquierda: Filosofia e IA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Web3 & soberania digital
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-white">
              Soberania Individual, <br />
              <span className="text-zinc-400">Cripto e Inteligencia Artificial</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              En Delphos creemos que el futuro de la tecnologia pertenece a las personas. Abrazamos la descentralizacion, el codigo abierto y la soberania individual como pilares fundamentales para contrarrestar la centralizacion de datos.
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              Nuestra vision conecta el potencial transformador de la Inteligencia Artificial con el ecosistema Web3, garantizando que el desarrollo tecnologico de vanguardia respete la privacidad, la autonomia financiera y el control de la informacion por parte del usuario.
            </p>
          </div>

          {/* Columna Derecha: Criptomonedas Aceptadas */}
          <div className="lg:col-span-7 space-y-6 bg-zinc-950 p-8 rounded-2xl border border-zinc-900">
            <h3 className="text-xl font-semibold font-sans text-white mb-4">
              Apoyamos activamente el ecosistema cripto
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Para impulsar la economia descentralizada y colaborar de forma activa con su comunidad global, aceptamos y promovemos el uso de los siguientes protocolos y redes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bitcoin */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#2A2550] hover:border-zinc-700 transition-colors">
                <h4 className="font-bold text-base text-zinc-100 mb-1">Bitcoin (BTC)</h4>
                <p className="text-xs text-zinc-500">Reserva de valor descentralizada y el pilar fundamental del dinero soberano.</p>
              </div>

              {/* Kaspa */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#2A2550] hover:border-zinc-700 transition-colors">
                <h4 className="font-bold text-base text-zinc-100 mb-1">Kaspa (KAS)</h4>
                <p className="text-xs text-zinc-500">Tecnologia BlockDAG que ofrece transacciones de confirmacion instantanea sin sacrificar seguridad.</p>
              </div>

              {/* Nym */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#2A2550] hover:border-zinc-700 transition-colors">
                <h4 className="font-bold text-base text-zinc-100 mb-1">Nym (NYM)</h4>
                <p className="text-xs text-zinc-500">Privacidad absoluta a nivel de metadatos y proteccion de la infraestructura digital.</p>
              </div>

              {/* Alephium */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#2A2550] hover:border-zinc-700 transition-colors">
                <h4 className="font-bold text-base text-zinc-100 mb-1">Alephium (ALPH)</h4>
                <p className="text-xs text-zinc-500">Sharding ligero, seguro e inteligente utilizando un enfoque eficiente de Proof-of-Less-Work.</p>
              </div>

              {/* Cardano */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#2A2550] hover:border-zinc-700 transition-colors md:col-span-2">
                <h4 className="font-bold text-base text-zinc-100 mb-1">Cardano (ADA)</h4>
                <p className="text-xs text-zinc-500">Sostenibilidad, gobernanza descentralizada y contratos inteligentes respaldados por rigurosa investigacion cientifica.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
