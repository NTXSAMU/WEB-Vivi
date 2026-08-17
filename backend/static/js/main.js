/*
 * main.js — punto de entrada (type="module"). Importa e inicializa cada módulo.
 *
 * Orden importante: initPlaylist() debe ir ANTES que initGate(). gate.js
 * dispara el evento "gate:unlocked" de forma síncrona (incluso antes de que
 * el usuario haga nada, si no hay candado o ya estaba desbloqueado), así
 * que su listener en playlist.js tiene que existir ya en ese momento.
 */
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
import { initGate } from './gate.js';

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
  initEnvelope();
  initPlaylist();
  initNotesFilter();
  initLikesTabs();
  initBucketlist();
  initLightbox();
  initQuestionGame();
  initHeroIntro();
  initGate();
  setFooterYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
