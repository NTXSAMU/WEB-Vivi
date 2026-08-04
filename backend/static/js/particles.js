/* particles.js — motas suaves flotando hacia arriba en el hero (estilo luciérnagas).
   Ligero (canvas 2D, sin librerías) y desactivado si el usuario prefiere menos movimiento. */
import { prefersReducedMotion } from './utils.js';

export function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.max(24, Math.floor((width * height) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.5,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.5 + 0.25,
      flicker: Math.random() * 0.02 + 0.005,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += (Math.random() - 0.5) * p.flicker;
      p.alpha = Math.min(0.8, Math.max(0.1, p.alpha));

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0 || p.x > width) p.vx *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 160, 186, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  requestAnimationFrame(tick);
}
