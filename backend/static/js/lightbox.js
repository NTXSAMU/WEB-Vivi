/* lightbox.js — engancha cualquier elemento .lightbox-trigger (fotos sueltas
   y fotos de recuerdos) para que abra la imagen grande con modules/modal.js */
import { qsa } from './utils.js';
import { openModal } from './modules/modal.js';

export function initLightbox() {
  qsa('.lightbox-trigger').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.full;
      const alt = item.querySelector('img')?.alt || '';
      if (src) openModal(src, alt);
    });
  });
}
