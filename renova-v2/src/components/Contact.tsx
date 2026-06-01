'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-4 bg-surface-soft" id="contacto">
      <div className="container-main grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-ink">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Hablemos</h2>
          <p className="text-body text-lg mb-8">Estamos listos para ayudarte a dar el paso hacia la energía renovable. Contáctanos hoy mismo.</p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-renova-turquoise rounded-xl flex items-center justify-center text-xl text-white">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <span className="block text-sm text-muted">Teléfono</span>
                <span className="text-base font-semibold text-ink">+52 443 111 2869</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-renova-turquoise rounded-xl flex items-center justify-center text-xl text-white">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <span className="block text-sm text-muted">WhatsApp</span>
                <span className="text-base font-semibold text-ink">Escríbenos ahora</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-renova-gold rounded-xl flex items-center justify-center text-xl text-white">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <span className="block text-sm text-muted">Ubicación</span>
                <span className="text-base font-semibold text-ink">Morelia, Michoacán</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-renova-turquoise rounded-xl flex items-center justify-center text-xl text-white">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <span className="block text-sm text-muted">Email</span>
                <a href="mailto:techoskn@gmail.com" className="text-base font-semibold text-ink hover:text-primary transition-colors">techoskn@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-hairline">
          <form action="https://formsubmit.co/arturooropezaprieto3@gmail.com" method="POST">
            <h3 className="text-xl font-display font-bold text-ink mb-6">Envíanos un Mensaje</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-ink mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  placeholder="Tu nombre" 
                  required 
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-hairline rounded-lg text-ink placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="tu@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-hairline rounded-lg text-ink placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-ink mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  placeholder="Tu teléfono" 
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-hairline rounded-lg text-ink placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="servicio" className="block text-sm font-semibold text-ink mb-2">Servicio de Interés</label>
                <select 
                  id="servicio" 
                  name="servicio" 
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-hairline rounded-lg text-ink focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="financiamiento">Financiamiento</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="mensaje" className="block text-sm font-semibold text-ink mb-2">Mensaje</label>
                <textarea 
                  id="mensaje" 
                  name="mensaje" 
                  placeholder="¿En qué podemos ayudarte?" 
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-hairline rounded-lg text-ink placeholder-muted focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-y"
                ></textarea>
              </div>
            </div>

            <input type="hidden" name="_subject" value="Nuevo mensaje de Renova Solar" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="#contacto" />

            <button 
              type="submit" 
              className="w-full mt-6 px-6 py-4 bg-terracotta text-black font-bold text-lg rounded-lg transition-all hover:bg-terracotta-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)]"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}