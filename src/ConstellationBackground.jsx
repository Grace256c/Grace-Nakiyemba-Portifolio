import { useEffect, useRef } from 'react';

/** Decorative, low-motion particle network for the portfolio hero. */
export default function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame = null;
    let visible = true;
    let reducedMotion = motionQuery.matches;
    let lastFrame = 0;

    function resize() {
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Limit particle count on smaller screens for smoother rendering.
      const count = Math.min(42, Math.max(12, Math.floor((width * height) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: 1 + Math.random() * 1.3,
      }));
      draw();
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      const reach = width < 640 ? 105 : 145;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < reach) {
            context.strokeStyle = `rgba(139, 92, 246, ${0.16 * (1 - distance / reach)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
        context.fillStyle = 'rgba(139, 92, 246, 0.36)';
        context.beginPath();
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function animate(timestamp) {
      if (!visible || reducedMotion) return;
      if (timestamp - lastFrame >= 32) {
        const step = Math.min((timestamp - (lastFrame || timestamp)) / 32, 2);
        for (const particle of particles) {
          particle.x += particle.vx * step;
          particle.y += particle.vy * step;
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        }
        draw();
        lastFrame = timestamp;
      }
      animationFrame = window.requestAnimationFrame(animate);
    }

    function updateAnimation() {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      lastFrame = 0;
      draw();
      if (visible && !reducedMotion) animationFrame = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      updateAnimation();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    const onMotionChange = (event) => {
      reducedMotion = event.matches;
      updateAnimation();
    };

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    motionQuery.addEventListener('change', onMotionChange);
    resize();
    updateAnimation();

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}
