import { useEffect } from 'react';
import EcologicalNav from './EcologicalNav';
import EcologicalHero from './EcologicalHero';
import EcologicalServices from './EcologicalServices';
import EcologicalWhyUs from './EcologicalWhyUs';
import EcologicalAbout from './EcologicalAbout';
import EcologicalPortfolio from './EcologicalPortfolio';
import SolarCalculator from './SolarCalculator';
import EcologicalContact from './EcologicalContact';
import EcologicalFooter from './EcologicalFooter';
import EcoCanvas from './EcoCanvas';

export default function EcologicalPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        }
      });
    }, { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    document.querySelectorAll('.eco-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="eco-scroll" style={{ backgroundColor: '#faf9f5' }}>
      <EcologicalNav />
      <EcologicalHero />
      <div className="eco-animate"><EcologicalServices /></div>
      <div className="eco-animate"><EcologicalWhyUs /></div>
      <div className="eco-animate"><EcologicalAbout /></div>
      <div className="eco-animate"><EcologicalPortfolio /></div>
      <div className="eco-animate"><SolarCalculator /></div>
      <div className="eco-animate"><EcologicalContact /></div>
      <EcologicalFooter />
      <EcoCanvas />

      <style>{`
        .eco-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .eco-animate.animate-active {
          opacity: 1;
          transform: translateY(0);
        }
        .eco-scroll {
          scroll-behavior: smooth;
        }
        html { scroll-behavior: smooth; }
        #eco-calculator .hero-floating {
          animation: ecoFloat 3s ease-in-out infinite;
        }
        @keyframes ecoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}