import { Icons } from './Icons';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#2A2550]" style={{ background: 'linear-gradient(180deg, #0D0B1E 0%, #0A0818 100%)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-2xl font-display font-bold text-white">
          <Icons.Hexagon color="#00FFFF" size={22} />
          <span>Delphos</span>
        </div>
        <p className="text-gray-500">© 2026 Arturo Oropeza. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <span className="text-gray-600">Instagram — Próximamente</span>
          <a href="https://www.linkedin.com/in/arturo-oropeza-prieto-9584073b1" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
