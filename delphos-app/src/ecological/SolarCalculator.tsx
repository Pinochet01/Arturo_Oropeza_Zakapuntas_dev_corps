import { useState } from 'react';

function solarFmt(n: number) {
  return '$' + Math.round(n).toLocaleString('es-MX');
}

export default function SolarCalculator() {
  const [bill, setBill] = useState(1200);
  const [kw, setKw] = useState(5);
  const [pct, setPct] = useState(85);

  const saved = bill * pct / 100;
  const remaining = bill - saved;
  const annual = saved * 12;
  const ten = annual * 10;
  const co2 = (kw * 0.7).toFixed(1);
  const trees = Math.round(kw * 10);

  const postText =
    '☀️ ¿CUÁNTO PUEDES AHORRAR CON PANELES SOLARES?\n\n' +
    'Si hoy pagas ' + solarFmt(bill) + ' al mes en luz, escucha esto:\n\n' +
    'Con un sistema solar de ' + kw.toFixed(1) + ' kW puedes reducir tu factura hasta un ' + pct + '%.\n\n' +
    'Eso significa:\n' +
    '💰 Ahorro mensual: ' + solarFmt(saved) + '\n' +
    '📅 Ahorro anual: ' + solarFmt(annual) + '\n' +
    '🚀 En 10 años: ' + solarFmt(ten) + ' en tu bolsillo\n\n' +
    'Y de bonus: evitas ' + co2 + ' toneladas de CO₂ al año — el equivalente a plantar ' + trees + ' árboles. 🌿\n\n' +
    'En Michoacán tenemos más de 300 días de sol al año. Cada día sin paneles es energía (y dinero) desperdiciado.\n\n' +
    '¿Quieres saber cuánto ahorrarías TÚ exactamente?\n' +
    '👉 Escríbenos por WhatsApp: wa.me/5214436942217\n\n' +
    '#PanelesSolares #AhorroEnergético #EnergíaSolar #Michoacán #EcologicalConsciousness #Sustentabilidad #CFE #Zacapu #Morelia';

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* fallback */ }
  };

  return (
    <section id="eco-calculator" className="py-20 md:py-24 px-4" style={{ backgroundColor: '#f5f2eb' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#cc785c' }}>
            Ecological Consciousness Solutions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#cc785c', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            ¿Cuánto puedes ahorrar con energía solar?
          </h2>
          <p className="text-lg" style={{ color: '#3d3d3a' }}>
            Ajusta los valores según tu situación y descubre tus ahorros estimados
          </p>
        </div>

        <div className="p-6 rounded-lg mb-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <span className="block text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: '#6c6a64' }}>
            Personaliza tu estimación
          </span>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <label className="min-w-[190px] text-base font-medium" style={{ color: '#3d3d3a' }}>Recibo mensual actual (CFE)</label>
            <input type="range" min={200} max={5000} step={100} value={bill} onChange={e => setBill(Number(e.target.value))}
              className="flex-1" style={{ accentColor: '#cc785c' }} />
            <span className="text-base font-semibold min-w-[72px] text-right" style={{ color: '#141413' }}>{solarFmt(bill)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <label className="min-w-[190px] text-base font-medium" style={{ color: '#3d3d3a' }}>Tamaño del sistema (kW)</label>
            <input type="range" min={1.5} max={50} step={0.5} value={kw} onChange={e => setKw(Number(e.target.value))}
              className="flex-1" style={{ accentColor: '#cc785c' }} />
            <span className="text-base font-semibold min-w-[72px] text-right" style={{ color: '#141413' }}>{kw.toFixed(1)} kW</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-0">
            <label className="min-w-[190px] text-base font-medium" style={{ color: '#3d3d3a' }}>Reducción estimada</label>
            <input type="range" min={50} max={95} step={5} value={pct} onChange={e => setPct(Number(e.target.value))}
              className="flex-1" style={{ accentColor: '#cc785c' }} />
            <span className="text-base font-semibold min-w-[72px] text-right" style={{ color: '#141413' }}>{pct}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <Metric label="Monthly savings" value={solarFmt(saved)} sub="pesos/month" />
          <Metric label="Annual savings" value={solarFmt(annual)} sub="pesos/year" />
          <Metric label="10-year savings" value={solarFmt(ten)} sub="pesos accumulated" />
          <Metric label="CO₂ avoided/year" value={`${co2} ton`} sub={`equiv. to ${trees} trees`} />
        </div>

        <div className="p-6 rounded-lg mb-5" style={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <span className="block text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: '#6c6a64' }}>
            Monthly comparison
          </span>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1" style={{ color: '#6c6a64' }}>
              <span>Without panels (CFE)</span>
              <span>{solarFmt(bill)}</span>
            </div>
            <div className="h-2.5 rounded overflow-hidden" style={{ backgroundColor: '#ebe6df' }}>
              <div className="h-full rounded" style={{ width: '100%', backgroundColor: '#8e8b82', transition: 'width 0.4s ease' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1" style={{ color: '#6c6a64' }}>
              <span>With solar panels</span>
              <span>{solarFmt(remaining)}</span>
            </div>
            <div className="h-2.5 rounded overflow-hidden" style={{ backgroundColor: '#ebe6df' }}>
              <div className="h-full rounded" style={{ width: `${Math.round(100 - pct)}%`, backgroundColor: '#cc785c', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>

        <a href="https://wa.me/5214436942217" target="_blank" rel="noopener noreferrer"
          className="block w-full py-4 text-center text-white font-semibold rounded-lg text-lg mb-2 transition-all hover:opacity-90"
          style={{ backgroundColor: '#25d366', fontFamily: '"Raleway", sans-serif' }}>
          Calcular mi ahorro real → WhatsApp
        </a>
        <p className="text-sm text-center" style={{ color: '#8e8b82' }}>
          Estimación de referencia. Tu ahorro real depende de tu consumo, orientación del techo y sistema instalado.
        </p>

        <div className="mt-5 p-5 rounded-lg" style={{ backgroundColor: '#f5f0e8' }}>
          <pre className="whitespace-pre-line text-base leading-relaxed mb-4" style={{ color: '#3d3d3a', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>{postText}</pre>
          <button onClick={handleCopy}
            className="w-full py-3 rounded-lg text-base font-medium transition-all cursor-pointer"
            style={{ backgroundColor: '#faf9f5', color: '#141413', border: '1px solid #e6dfd8' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e8e0d2'; e.currentTarget.style.borderColor = '#cc785c'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#faf9f5'; e.currentTarget.style.borderColor = '#e6dfd8'; }}>
            {copied ? '¡Copiado al portapapeles!' : 'Copiar post para Facebook'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <p className="text-xs uppercase tracking-wide mb-1.5" style={{ color: '#6c6a64' }}>{label}</p>
      <p className="text-2xl font-medium" style={{ color: '#141413' }}>{value}</p>
      <p className="text-sm mt-0.5" style={{ color: '#8e8b82' }}>{sub}</p>
    </div>
  );
}