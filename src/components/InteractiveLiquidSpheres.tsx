import React, { useEffect, useRef } from 'react';

interface Sphere {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
  floatAngle: number;
  floatDist: number;
}

export const InteractiveLiquidSpheres: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create 3 glossy liquid spheres like in the reference
    const spheres: Sphere[] = [
      {
        x: width * 0.5,
        y: height * 0.55,
        baseX: width * 0.5,
        baseY: height * 0.55,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.22,
        phase: 0,
        speed: 0.02,
        floatAngle: 0,
        floatDist: 25,
      },
      {
        x: width * 0.65,
        y: height * 0.22,
        baseX: width * 0.65,
        baseY: height * 0.22,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.14,
        phase: Math.PI * 0.7,
        speed: 0.025,
        floatAngle: 2,
        floatDist: 35,
      },
      {
        x: width * 0.28,
        y: height * 0.35,
        baseX: width * 0.28,
        baseY: height * 0.35,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.16,
        phase: Math.PI * 1.3,
        speed: 0.018,
        floatAngle: 4,
        floatDist: 30,
      },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const drawGlossySphere = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number
    ) => {
      ctx.save();

      // Outer glow / ambient drop shadow
      const shadowGrad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.5);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Base Sphere Gradient (Deep Glossy Black Chrome)
      const baseGrad = ctx.createRadialGradient(
        cx - r * 0.25,
        cy - r * 0.25,
        r * 0.05,
        cx,
        cy,
        r
      );
      baseGrad.addColorStop(0, '#2A303C');
      baseGrad.addColorStop(0.3, '#141822');
      baseGrad.addColorStop(0.7, '#07090E');
      baseGrad.addColorStop(1, '#020305');

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Subtle Rim Light (Emerald / Cyan glow edge)
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      // Curved Window / Softbox Grid Reflection (Glossy Glass / Studio Look)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.95, 0, Math.PI * 2);
      ctx.clip();

      // Grid reflection pattern on top of sphere
      const gridX = cx - r * 0.2;
      const gridY = cy - r * 0.25;
      const gridR = r * 0.45;

      const gridGrad = ctx.createRadialGradient(gridX, gridY, 0, gridX, gridY, gridR);
      gridGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      gridGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)');
      gridGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
      gridGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gridGrad;
      ctx.beginPath();
      ctx.ellipse(gridX, gridY, gridR, gridR * 0.7, -Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();

      // Reflection grid lines
      ctx.strokeStyle = 'rgba(10, 14, 22, 0.5)';
      ctx.lineWidth = 1.2;

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(gridX + i * 8, gridY, gridR * 0.8, gridR * 0.6, -Math.PI / 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Bottom bounce reflection (Light bouncing off the dark floor)
      const bounceGrad = ctx.createRadialGradient(
        cx + r * 0.1,
        cy + r * 0.7,
        0,
        cx,
        cy + r * 0.7,
        r * 0.6
      );
      bounceGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      bounceGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.12)');
      bounceGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = bounceGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy + r * 0.65, r * 0.6, r * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Top Specular Hotspot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(cx - r * 0.3, cy - r * 0.35, r * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();
    };

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Subtle background glow inside the container
      const bgGlow = ctx.createRadialGradient(width * 0.5, height * 0.5, 20, width * 0.5, height * 0.5, width * 0.6);
      bgGlow.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
      bgGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.02)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw spheres
      spheres.forEach((sphere) => {
        // Organic floating motion
        const floatX = Math.cos(time * sphere.speed + sphere.floatAngle) * sphere.floatDist;
        const floatY = Math.sin(time * sphere.speed * 1.2 + sphere.phase) * sphere.floatDist;

        let targetX = sphere.baseX + floatX;
        let targetY = sphere.baseY + floatY;

        // Interactive mouse interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - sphere.x;
          const dy = mouseRef.current.y - sphere.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 35;
            targetX -= (dx / dist) * force;
            targetY -= (dy / dist) * force;
          }
        }

        // Smooth spring interpolation
        sphere.x += (targetX - sphere.x) * 0.08;
        sphere.y += (targetY - sphere.y) * 0.08;

        drawGlossySphere(ctx, sphere.x, sphere.y, sphere.radius);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="v2-connect-liquid-container" style={{ width: '100%', height: '100%', minHeight: '380px', position: 'relative', overflow: 'hidden', borderRadius: '20px', background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.4) 0%, rgba(3, 5, 8, 0.8) 100%)' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'grab',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'rgba(255, 255, 255, 0.3)',
          letterSpacing: '0.08em',
          pointerEvents: 'none'
        }}
      >
        INTERACTIVE 3D
      </div>
    </div>
  );
};

export default InteractiveLiquidSpheres;
