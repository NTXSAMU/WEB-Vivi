/* gallery.js — abre cada imagen de la galería en el lightbox (modules/modal.js) */
import { qsa } from './utils.js';
import { openModal } from './modules/modal.js';

export function initGallery() {
  qsa('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.full;
      const alt = item.querySelector('img')?.alt || '';
      if (src) openModal(src, alt);
    });
  });
}
