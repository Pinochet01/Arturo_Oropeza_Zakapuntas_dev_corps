import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Renova Energía Solar',
  description: 'Aviso de Privacidad de Renova Energía Solar. Conoce cómo protegemos tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="container-main max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-8">Aviso de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none text-body leading-relaxed space-y-6">
          <p><strong>Última actualización:</strong> 2026</p>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">1. Identidad del Responsable</h2>
            <p>Renova Energía Solar, con domicilio en Morelia, Michoacán, es responsable del tratamiento de sus datos personales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">2. Datos Personales que Recabamos</h2>
            <p>Recabamos los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información de consumo eléctrico (para cotizaciones solares)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">3. Finalidad del Tratamiento</h2>
            <p>Sus datos personales serán utilizados para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Proveer los servicios y productos solicitados</li>
              <li>Elaborar cotizaciones personalizadas de sistemas solares</li>
              <li>Comunicarnos con usted sobre nuestros servicios</li>
              <li>Mejorar nuestra atención al cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">4. Protección de Datos</h2>
            <p>Implementamos medidas de seguridad técnicas y administrativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">5. Derechos ARCO</h2>
            <p>Usted tiene derecho a Acceder, Rectificar, Cancelar y Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, envíe un correo a <a href="mailto:techoskn@gmail.com" className="text-primary hover:text-primary-active">techoskn@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">6. Transferencia de Datos</h2>
            <p>No compartimos sus datos personales con terceros sin su consentimiento previo, salvo requerimiento legal.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">7. Contacto</h2>
            <p>Para cualquier duda sobre este aviso de privacidad, contáctenos:</p>
            <ul className="list-none pl-0 space-y-2 mt-2">
              <li><strong>Email:</strong> <a href="mailto:techoskn@gmail.com" className="text-primary hover:text-primary-active">techoskn@gmail.com</a></li>
              <li><strong>Teléfono:</strong> +52 443 111 2869</li>
              <li><strong>Ubicación:</strong> Morelia, Michoacán</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
