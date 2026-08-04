/* main.js — punto de entrada (type="module"). Importa e inicializa cada módulo. */
import { initGate } from './gate.js';
import { initLoader } from './loader.js';
import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initScrollReveal } from './scroll.js';
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initEnvelope } from './envelope.js';
import { initPlaylist } from './playlist.js';
import { initNotesFilter } from './notes.js';
import { initLikesTabs } from './likes.js';
import { initBucketlist } from './bucketlist.js';
import { initLightbox } from './lightbox.js';
import { initQuestionGame } from './question-game.js';
import { initHeroIntro } from './animations.js';

function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function init() {
  initGate();
  initLoader();
  initTheme();
  initNavbar();
  initScrollReveal();
  initCursor();
  initParticles();
  initEnvelope();
  initPlaylist();
  initNotesFilter();
  initLikesTabs();
  initBucketlist();
  initLightbox();
  initQuestionGame();
  initHeroIntro();
  setFooterYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
