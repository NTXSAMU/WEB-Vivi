/* main.js — punto de entrada (type="module"). Importa e inicializa cada módulo. */
import { initLoader } from './loader.js';
import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initScrollReveal } from './scroll.js';
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initGallery } from './gallery.js';
import { initMusic } from './music.js';
import { initHeroIntro } from './animations.js';
import { initContactForm } from './contact.js';

function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function init() {
  initLoader();
  initTheme();
  initNavbar();
  initScrollReveal();
  initCursor();
  initParticles();
  initGallery();
  initMusic();
  initHeroIntro();
  initContactForm();
  setFooterYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
