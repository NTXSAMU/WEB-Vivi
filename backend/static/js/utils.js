/* utils.js — helpers pequeños y reutilizables, sin dependencias */

export function qs(sel, ctx = document) {
  return ctx.querySelector(sel);
}

export function qsa(sel, ctx = document) {
  return Array.from(ctx.querySelectorAll(sel));
}

export function debounce(fn, wait = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export function throttle(fn, limit = 200) {
  let inThrottle = false;
  return (...args) => {
    if (inThrottle) return;
    fn(...args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  };
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
