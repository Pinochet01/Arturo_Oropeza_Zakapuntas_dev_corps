import { useState } from 'react';

export default function ConstruccionContact() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', servicio: '', proyecto: '' });
  const [msg, setMsg] = useState<{ text: string; type: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.servicio || !form.proyecto) {
      setMsg({ text: 'Por favor, completa todos los campos requeridos.', type: 'warning' });
      return;
    }
    const subject = encodeURIComponent('Solicitud de cotización - ' + form.servicio);
    const body = encodeURIComponent(
      'Nombre: ' + form.nombre + '\n' +
      'Teléfono: ' + form.telefono + '\n' +
      'Email: ' + form.email + '\n' +
      'Tipo de servicio: ' + form.servicio + '\n\n' +
      'Descripción del proyecto:\n' + form.proyecto
    );
    window.location.href = 'mailto:arturooropezaprieto3@gmail.com?subject=' + subject + '&body=' + body;
    setMsg({ text: '✅ Tu cliente de correo se abrirá. Envíanos el mensaje y te responderemos en menos de 24h.', type: 'success' });
    setForm({ nombre: '', telefono: '', email: '', servicio: '', proyecto: '' });
  };

  return (
    <section id="constr-contacto" className="relative py-20 md:py-24 px-4 overflow-hidden"
      style={{ background: '#0d1f42' }}>
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/construccion/blueprint.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
            Contacto
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            Solicita tu Cotización
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: '#FF8A00' }} />
        </div>
        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 p-6 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#fff', fontFamily: "'Oswald', sans-serif" }}>
              ¿Listo para tu próximo proyecto?
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              Nuestro equipo de especialistas está disponible para asesorarte sin costo. Cuéntanos tu proyecto y te damos una cotización en menos de 24 horas.
            </p>
            <div className="space-y-4">
              <ContactDetail icon={
                <svg viewBox="0 0 48 48" width="18" height="18"><path d="M24 4C12.954 4 4 12.954 4 24c0 3.531.929 6.85 2.555 9.72L4 44l10.52-2.52A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4z" fill="#25D366"/><path d="M18.2 15.6c-.4-.9-.8-.92-1.18-.94-.3-.01-.65-.01-1-.01-.35 0-.92.13-1.4.65-.48.52-1.84 1.8-1.84 4.38 0 2.58 1.88 5.08 2.14 5.43.26.35 3.64 5.77 8.96 7.85 4.43 1.75 5.33 1.4 6.29 1.31.96-.09 3.1-1.27 3.54-2.49.44-1.22.44-2.27.31-2.49-.13-.22-.48-.35-.99-.61-.52-.26-3.1-1.53-3.58-1.7-.48-.18-.83-.26-1.18.26-.35.52-1.35 1.7-1.66 2.05-.3.35-.61.39-1.13.13-.52-.26-2.2-.81-4.19-2.58-1.55-1.38-2.6-3.08-2.9-3.6-.31-.52-.03-.8.23-1.06.23-.23.52-.61.78-.91.26-.3.35-.52.52-.87.18-.35.09-.65-.04-.91-.13-.26-1.16-2.85-1.62-3.89z" fill="white"/></svg>
              } label="WhatsApp" value="+52 1 443 694 2217" href="https://wa.me/5214436942217" color="#25D366" />
              <ContactDetail icon={<span>✉️</span>} label="Email" value="arturooropezaprieto3@gmail.com" href="mailto:arturooropezaprieto3@gmail.com" />
              <ContactDetail icon={<span>📍</span>} label="Ubicación" value="Zacapu, Michoacán" />
              <ContactDetail icon={<span>🕐</span>} label="Horario" value="Lun–Vie: 7am–7pm | Sáb: 8am–2pm" />
            </div>
            <div className="mt-6 p-4 rounded-lg" style={{ border: '1px solid rgba(255,138,0,0.2)', background: 'rgba(255,138,0,0.06)' }}>
              <div className="text-xs font-semibold tracking-widest mb-1" style={{ color: '#FF8A00', fontFamily: "'Roboto Mono', monospace" }}>
                {'// ZONAS DE SERVICIO'}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#C7C7C7', fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
                Zacapu · Morelia · Uruapan · Zamora · Pátzcuaro · Charapan · Nahuatzen
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormInput label="Nombre completo" value={form.nombre} onChange={v => setForm(f => ({ ...f, nombre: v }))} placeholder="Ej. Juan García" />
                <FormInput label="Teléfono" value={form.telefono} onChange={v => setForm(f => ({ ...f, telefono: v }))} placeholder="+52 55 0000-0000" />
              </div>
              <div className="mb-4">
                <FormInput label="Correo electrónico" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="correo@empresa.com" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>Tipo de servicio</label>
                <select value={form.servicio} onChange={e => setForm(f => ({ ...f, servicio: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all"
                  style={{ background: '#1a1a25', border: '1px solid rgba(255,255,255,0.1)', color: form.servicio ? '#fff' : '#8e8b82', fontFamily: "'Montserrat', sans-serif" }}
                  onFocus={e => e.currentTarget.style.borderColor = '#FF8A00'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <option value="">— Seleccionar servicio —</option>
                  <option>Albañilería y Obra Civil</option>
                  <option>Plomería e Instalaciones Hidráulicas</option>
                  <option>Electricidad Residencial</option>
                  <option>Electricidad Industrial</option>
                  <option>Vitropiso y Tablaroca</option>
                  <option>Mantenimiento Preventivo</option>
                  <option>Proyecto Integral (varios servicios)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1.5" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>Descripción del proyecto</label>
                <textarea value={form.proyecto} onChange={e => setForm(f => ({ ...f, proyecto: e.target.value }))} rows={4}
                  placeholder="Describe brevemente tu proyecto, dimensiones aproximadas, plazos y cualquier detalle relevante..."
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all resize-none"
                  style={{ background: '#1a1a25', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}
                  onFocus={e => e.currentTarget.style.borderColor = '#FF8A00'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              {msg && (
                <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.type === 'warning' ? 'text-yellow-200' : 'text-green-200'}`}
                  style={{ background: msg.type === 'warning' ? 'rgba(255,200,0,0.1)' : 'rgba(0,200,100,0.1)', border: `1px solid ${msg.type === 'warning' ? 'rgba(255,200,0,0.2)' : 'rgba(0,200,100,0.2)'}` }}>
                  {msg.text}
                </div>
              )}
              <button type="submit"
                className="w-full py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90"
                style={{ background: '#FF8A00', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                Enviar Solicitud
              </button>
              <div className="flex gap-3 mt-3">
                <a href="https://wa.me/5214436942217" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold no-underline transition-all hover:opacity-90"
                  style={{ background: '#25D366', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                  <svg viewBox="0 0 48 48" width="16" height="16"><path d="M24 4C12.954 4 4 12.954 4 24c0 3.531.929 6.85 2.555 9.72L4 44l10.52-2.52A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4z" fill="#fff"/><path d="M18.2 15.6c-.4-.9-.8-.92-1.18-.94-.3-.01-.65-.01-1-.01-.35 0-.92.13-1.4.65-.48.52-1.84 1.8-1.84 4.38 0 2.58 1.88 5.08 2.14 5.43.26.35 3.64 5.77 8.96 7.85 4.43 1.75 5.33 1.4 6.29 1.31.96-.09 3.1-1.27 3.54-2.49.44-1.22.44-2.27.31-2.49-.13-.22-.48-.35-.99-.61-.52-.26-3.1-1.53-3.58-1.7-.48-.18-.83-.26-1.18.26-.35.52-1.35 1.7-1.66 2.05-.3.35-.61.39-1.13.13-.52-.26-2.2-.81-4.19-2.58-1.55-1.38-2.6-3.08-2.9-3.6-.31-.52-.03-.8.23-1.06.23-.23.52-.61.78-.91.26-.3.35-.52.52-.87.18-.35.09-.65-.04-.91-.13-.26-1.16-2.85-1.62-3.89z" fill="white"/></svg>
                  WhatsApp
                </a>
                <a href="https://www.facebook.com/profile.php?id=61588355014660" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold no-underline transition-all hover:opacity-90"
                  style={{ background: '#1877F2', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                  <svg viewBox="0 0 48 48" width="16" height="16" fill="#fff"><path d="M24 4C12.954 4 4 12.954 4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4zm5 10h-3c-2 0-4 1-4 4v3h-2v4h2v8h4v-8h3l1-4h-4v-2c0-1 0-2 2-2h2v-3z"/></svg>
                  Facebook
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1.5" style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-sm transition-all"
        style={{ background: '#1a1a25', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}
        onFocus={e => e.currentTarget.style.borderColor = '#FF8A00'}
        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
    </div>
  );
}

function ContactDetail({ icon, label, value, href, color }: {
  icon: React.ReactNode; label: string; value: string; href?: string; color?: string;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: 'rgba(255,255,255,0.06)' }}>{icon}</div>
      <div>
        <div className="text-xs" style={{ color: '#8e8b82', fontFamily: "'Montserrat', sans-serif" }}>{label}</div>
        <div className="text-sm font-semibold" style={{ color: color || '#fff', fontFamily: "'Montserrat', sans-serif" }}>{value}</div>
      </div>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">{content}</a>;
  return <div className="block">{content}</div>;
}
