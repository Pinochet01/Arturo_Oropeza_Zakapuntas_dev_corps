import { useEffect, useRef } from 'react';

interface Seed {
  x: number; y: number; size: number;
  color: string; vX: number; vY: number;
  life: number; decay: number;
}

export default function EcoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Seed[]>([]);
  const animFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseEnter = (e: MouseEvent) => {
      if (Math.random() > 0.4) return;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const isGolden = target.classList.contains('golden-spark');
      const count = isGolden ? 40 : 25;

      for (let i = 0; i < count; i++) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        const size = isGolden ? Math.random() * 12 + 4 : Math.random() * 10 + 3;
        const vX = (Math.random() - 0.5) * (isGolden ? 12 : 8);
        const vY = (Math.random() - 0.5) * (isGolden ? 12 : 8) - 4;
        let color: string;
        if (isGolden) {
          const hue = Math.random() * 40 + 35;
          color = `hsl(${hue}, 100%, 60%)`;
        } else {
          const hue = Math.random() * 20 + 160;
          color = `hsl(${hue}, 90%, 55%)`;
        }
        particlesRef.current.push({ x, y, size, color, vX, vY, life: 1, decay: Math.random() * 0.02 + 0.01 });
      }
    };

    const buttons = document.querySelectorAll('button, .btn, a.btn, input[type="submit"], input[type="button"]');
    buttons.forEach(btn => btn.addEventListener('mouseenter', handleMouseEnter as EventListener));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vX;
        p.y += p.vY;
        p.vY += 0.05;
        p.life -= p.decay;
        if (p.size > 0.3) p.size -= 0.03;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      buttons.forEach(btn => btn.removeEventListener('mouseenter', handleMouseEnter as EventListener));
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }} />
  );
}