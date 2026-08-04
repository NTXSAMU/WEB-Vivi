/* likes.js — pestañas de la sección "para ti" (Comida / Joyería / Sitios / ...) */
import { qsa } from './utils.js';

export function initLikesTabs() {
  const tabs = qsa('.likes__tab');
  const panels = qsa('.likes__panel');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById(tab.dataset.target)?.classList.add('is-active');
    });
  });
}
