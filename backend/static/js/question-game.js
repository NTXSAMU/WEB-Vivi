/*
 * question-game.js — "¿Seguimos conociéndonos?": muestra una pregunta al
 * azar de content.json (sección "questions") cada vez que se pulsa el botón,
 * evitando repetir hasta que se hayan visto todas en esta sesión.
 */
const SEEN_KEY = 'question-game-seen';

function loadQuestions() {
  const el = document.getElementById('questionsData');
  if (!el) return [];
  try {
    return JSON.parse(el.textContent);
  } catch {
    return [];
  }
}

function getSeen() {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export function initQuestionGame() {
  const card = document.getElementById('questionCard');
  const text = document.getElementById('questionText');
  const btn = document.getElementById('questionShuffle');
  const questions = loadQuestions();
  if (!card || !btn || questions.length === 0) return;

  let seen = getSeen();

  function pickNext() {
    if (seen.size >= questions.length) seen = new Set();
    let index;
    do {
      index = Math.floor(Math.random() * questions.length);
    } while (seen.has(index) && seen.size < questions.length - 1);
    seen.add(index);
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
    return questions[index];
  }

  btn.addEventListener('click', () => {
    card.classList.remove('is-flip');
    requestAnimationFrame(() => {
      text.textContent = pickNext();
      card.classList.add('is-flip');
    });
  });
}
