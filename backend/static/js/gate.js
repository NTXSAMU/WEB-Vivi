/*
 * gate.js — candado de bienvenida (no es seguridad real: el contenido sigue
 * en el código fuente de la página, solo queda oculto tras la pregunta).
 * Sirve para que no entre cualquiera que tropiece con el link. Una vez
 * acertada la respuesta, se recuerda en este navegador (localStorage) para
 * no volver a preguntar en próximas visitas.
 *
 * Al desbloquear (por cualquiera de las tres vías: sin candado activo, ya
 * desbloqueado antes, o acertado ahora) dispara el evento global
 * "gate:unlocked" -- playlist.js lo escucha para arrancar la música justo
 * en ese gesto de "Entrar", que es lo que permite que el navegador deje
 * reproducir audio con sonido sin más interacción.
 */
const UNLOCK_KEY = 'gate-unlocked';
export const UNLOCK_EVENT = 'gate:unlocked';

function dispatchUnlocked() {
  window.dispatchEvent(new CustomEvent(UNLOCK_EVENT));
}

export function initGate() {
  const gate = document.getElementById('gate');

  if (!gate) {
    // No hay candado configurado: se considera desbloqueado desde ya.
    dispatchUnlocked();
    return;
  }

  if (localStorage.getItem(UNLOCK_KEY) === 'true') {
    gate.classList.add('is-unlocked');
    dispatchUnlocked();
    return;
  }

  document.body.style.overflow = 'hidden';

  const form = document.getElementById('gateForm');
  const input = document.getElementById('gateInput');
  const error = document.getElementById('gateError');
  const answer = (gate.dataset.answer || '').trim();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim().toLowerCase();

    if (answer && value === answer) {
      localStorage.setItem(UNLOCK_KEY, 'true');
      gate.classList.add('is-unlocked');
      document.body.style.overflow = '';
      dispatchUnlocked();
    } else {
      error.textContent = 'No es eso... inténtalo otra vez.';
      input.focus();
      input.select();
      gate.classList.add('is-shake');
      setTimeout(() => gate.classList.remove('is-shake'), 400);
    }
  });
}
