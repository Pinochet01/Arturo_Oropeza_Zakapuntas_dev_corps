import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio | Renova Energía Solar',
  description: 'Términos y condiciones de servicio de Renova Energía Solar.',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="container-main max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-8">Términos de Servicio</h1>
        
        <div className="prose prose-lg max-w-none text-body leading-relaxed space-y-6">
          <p><strong>Última actualización:</strong> 2026</p>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar el sitio web de Renova Energía Solar, usted acepta estos términos de servicio. Si no está de acuerdo, por favor no utilice nuestro sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">2. Servicios Ofrecidos</h2>
            <p>Renova Energía Solar ofrece servicios de:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Instalación de paneles solares residenciales y comerciales</li>
              <li>Mantenimiento de sistemas solares</li>
              <li>Financiamiento para proyectos de energía solar</li>
              <li>Cotizaciones y asesoría personalizada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">3. Propiedad Intelectual</h2>
            <p>Todo el contenido del sitio web (textos, imágenes, logotipos, gráficos) es propiedad de Renova Energía Solar y está protegido por leyes de propiedad intelectual. No se permite su reproducción sin autorización previa.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">4. Cotizaciones y Precios</h2>
            <p>Las cotizaciones proporcionadas son estimaciones basadas en la información suministrada. Los precios finales pueden variar según evaluación técnica del sitio. Todas las cotizaciones tienen una validez de 15 días hábiles.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">5. Garantías</h2>
            <p>Nuestros sistemas incluyen:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>25 años de garantía en paneles solares</li>
              <li>5 años de garantía en instalación</li>
              <li>Garantía de rendimiento del 80% a 25 años</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">6. Limitación de Responsabilidad</h2>
            <p>Renova Energía Solar no será responsable por daños indirectos o consecuentes derivados del uso de este sitio web o de la información contenida en él.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">7. Ley Aplicable</h2>
            <p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa será resuelta en los tribunales competentes de Morelia, Michoacán.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink mt-8 mb-4">8. Contacto</h2>
            <ul className="list-none pl-0 space-y-2">
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
