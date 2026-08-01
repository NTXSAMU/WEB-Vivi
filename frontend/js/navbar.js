/* navbar.js — fondo al hacer scroll + menú hamburguesa en móvil */
import { qs, qsa } from './utils.js';

export function initNavbar() {
  const navbar = qs('#navbar');
  const burger = qs('#navToggle');
  const links = qs('.navbar__links');
  if (!navbar) return;

  window.addEventListener(
    'scroll',
    () => navbar.classList.toggle('is-scrolled', window.scrollY > 20),
    { passive: true }
  );

  burger?.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  qsa('.navbar__links a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });
}
