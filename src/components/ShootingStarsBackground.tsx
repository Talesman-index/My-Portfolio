import React, { useEffect, useRef } from 'react';

/**
 * ShootingStarsBackground
 * A high-performance canvas-based background effect that renders a static star field
 * and animated shooting stars.
 */
const ShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: ShootingStar[] = [];
    let staticStars: StaticStar[] = [];

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;

    // Static star field implementation
    class StaticStar {
      x: number;
      y: number;
      size: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.5;
        this.opacity = Math.random() * 0.2 + 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Shooting star animation logic
    class ShootingStar {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      opacity: number = 0;
      angle: number;
      delay: number;

      constructor(width: number, height: number, delay = 0) {
        this.angle = (35 * Math.PI) / 180; // 35 degree angle
        this.delay = delay;
        this.init(width, height);
      }

      init(width: number, height: number) {
        // Spawn from top or right side for diagonal motion
        const spawnEdge = Math.random();
        if (spawnEdge < 0.6) {
          // Spawn above viewport
          this.x = Math.random() * width * 1.5;
          this.y = -200;
        } else {
          // Spawn to the right of viewport
          this.x = width + 200;
          this.y = Math.random() * height * 0.7;
        }

        this.length = Math.random() * 140 + 60; // 60px - 200px
        this.speed = Math.random() * 25 + 15;   // ~0.8s to 2.5s duration
        this.opacity = Math.random() * 0.6 + 0.4; // 0.4 - 1.0
      }

      update(width: number, height: number) {
        if (this.delay > 0) {
          this.delay--;
          return;
        }

        // Move diagonally (top-right to bottom-left)
        this.x -= this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // Recycle star when out of view
        if (this.x < -200 || this.y > height + 200) {
          this.init(width, height);
          this.delay = Math.floor(Math.random() * 80);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.delay > 0) return;

        // Calculate tail position for gradient line
        const tailX = this.x + this.length * Math.cos(this.angle);
        const tailY = this.y - this.length * Math.sin(this.angle);

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.2, `rgba(37, 99, 235, ${this.opacity * 0.8})`); // Electric Blue #2563EB
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        
        // Add glow to the head of the streak
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(37, 99, 235, 0.6)';
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      staticStars = Array.from({ length: 75 }, () => new StaticStar(canvas.width, canvas.height));
      
      if (!reducedMotion) {
        // Initialize 6 shooting stars with staggered delays
        stars = Array.from({ length: 6 }, (_, i) => new ShootingStar(canvas.width, canvas.height, i * 45));
      } else {
        stars = [];
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fixed background stars
      staticStars.forEach(star => star.draw(ctx));

      // Update and draw shooting stars if motion is enabled
      if (!reducedMotion) {
        stars.forEach(star => {
          star.update(canvas.width, canvas.height);
          star.draw(ctx);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      init();
    };

    window.addEventListener('resize', handleResize);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="shooting-stars-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent'
      }}
    />
  );
};

export default ShootingStarsBackground;
