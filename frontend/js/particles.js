/* particles.js — campo de partículas ambiente en el canvas del hero.
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
    const count = Math.max(20, Math.floor((width * height) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(242, 177, 56, 0.5)';
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
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
