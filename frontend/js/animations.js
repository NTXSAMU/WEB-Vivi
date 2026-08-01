/* animations.js — micro-interacciones que no encajan en scroll.js (reveal genérico).
   Por ahora: la entrada escalonada del hero al cargar la página. */

export function initHeroIntro() {
  const content = document.querySelector('.hero__content');
  if (!content) return;

  requestAnimationFrame(() => {
    setTimeout(() => content.classList.add('is-visible'), 250);
  });
}
