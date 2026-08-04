/* notes.js — filtro de la sección "notas" (Todas / Sentimientos / Notas / Cartas) */
import { qsa } from './utils.js';

export function initNotesFilter() {
  const filters = qsa('.notes__filter');
  const cards = qsa('.note-card');
  if (!filters.length || !cards.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const type = btn.dataset.filter;
      cards.forEach((card) => {
        const show = type === 'all' || card.dataset.type === type;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}
