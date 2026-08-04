/* modules/modal.js — lightbox mínimo (fotos y recuerdos), sin dependencias */

function onKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

export function openModal(src, alt = '') {
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-label="${alt}">
      <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
      <img src="${src}" alt="${alt}">
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('modal-close')) closeModal();
  });
  document.addEventListener('keydown', onKeydown);
}

export function closeModal() {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeydown);
}
