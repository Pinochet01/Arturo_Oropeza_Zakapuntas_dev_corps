import { useState } from 'react';

export default function EcologicalContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState<{ text: string; type: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg({ text: 'Por favor llena todos los campos.', type: 'warning' });
      return;
    }
    const subject = encodeURIComponent('New Contact from Website - ' + form.name);
    const body = encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\nMessage:\n' + form.message);
    window.location.href = 'mailto:arturooropezaprieto3@gmail.com?subject=' + subject + '&body=' + body;
    setMsg({ text: 'Tu cliente de correo se está abriendo. Por favor haz clic en Enviar allí.', type: 'success' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="eco-contact" className="py-20 md:py-24 px-4" style={{ backgroundColor: '#faf9f5' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            Contacto
          </h2>
          <p className="text-xl" style={{ color: '#3d3d3a', fontWeight: 500 }}>
            ¿Listo para usar energía solar? Ponte en contacto con nuestro equipo hoy.
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="text" placeholder="Tu Nombre" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border text-base transition-all"
                style={{ borderColor: '#e6dfd8', backgroundColor: '#faf9f5', color: '#3d3d3a' }}
                onFocus={e => e.currentTarget.style.borderColor = '#cc785c'}
                onBlur={e => e.currentTarget.style.borderColor = '#e6dfd8'} />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Tu Correo Electrónico" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border text-base transition-all"
                style={{ borderColor: '#e6dfd8', backgroundColor: '#faf9f5', color: '#3d3d3a' }}
                onFocus={e => e.currentTarget.style.borderColor = '#cc785c'}
                onBlur={e => e.currentTarget.style.borderColor = '#e6dfd8'} />
            </div>
            <div className="mb-4">
              <textarea placeholder="Tu Mensaje" rows={5} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border text-base transition-all resize-none"
                style={{ borderColor: '#e6dfd8', backgroundColor: '#faf9f5', color: '#3d3d3a' }}
                onFocus={e => e.currentTarget.style.borderColor = '#cc785c'}
                onBlur={e => e.currentTarget.style.borderColor = '#e6dfd8'} />
            </div>
            {msg && (
              <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.type === 'warning' ? 'text-yellow-800' : 'text-green-800'}`}
                style={{ backgroundColor: msg.type === 'warning' ? '#fff3cd' : '#d4edda' }}>
                {msg.text}
              </div>
            )}
            <div className="flex flex-col gap-3">
              <button type="submit"
                className="w-full py-3 rounded-full text-base font-semibold transition-all"
                style={{ backgroundColor: '#ff8c00', color: '#fff', fontFamily: '"Raleway", sans-serif' }}>
                Enviar Mensaje
              </button>
              <a href="https://wa.me/5214436942217" target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-base font-semibold text-center transition-all block"
                style={{ backgroundColor: '#25D366', color: '#fff', fontFamily: '"Raleway", sans-serif' }}>
                Chat en WhatsApp
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588355014660" target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-full text-base font-semibold text-center transition-all block"
                style={{ backgroundColor: '#1877F2', color: '#fff', fontFamily: '"Raleway", sans-serif' }}>
                Síguenos en Facebook
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}