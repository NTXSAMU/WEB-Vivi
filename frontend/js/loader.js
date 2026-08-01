/* loader.js — pantalla de precarga (preloader), se oculta cuando la página termina de cargar */

export function initLoader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hide = () => preloader.classList.add('is-hidden');

  if (document.readyState === 'complete') {
    setTimeout(hide, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 300));
  }
}
