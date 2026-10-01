
import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    const numberOfParticles = 80; // Updated to 80 as requested
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 3 + 1; // Updated size logic: Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5; // Updated speed: Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5;
        
        // Keeping the National Theme Colors (Blue & Gold) instead of generic Cyan
        this.color = Math.random() > 0.5 
          ? "rgba(59, 130, 246, 0.6)"  // Blue
          : "rgba(234, 179, 8, 0.6)";  // Gold
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!canvas) return;
        // Rebondir sur les bords (Bounce logic)
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Créer les particules
    const init = () => {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Relier les particules proches
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            // Dynamic opacity based on distance
            ctx.strokeStyle = `rgba(148, 163, 184, ${1 - distance / 120})`; // Using Slate-400 for connections
            ctx.lineWidth = 0.8;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ease-in opacity-100">
      <canvas ref={canvasRef} id="particles-js" className="block" />
    </div>
  );
};

export default ParticlesBackground;
