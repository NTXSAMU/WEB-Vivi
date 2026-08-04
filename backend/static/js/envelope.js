/* envelope.js — abre la carta (sección "carta") al hacer click en el sobre */

export function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const button = document.getElementById('envelopeButton');
  if (!envelope || !button) return;

  button.addEventListener('click', () => {
    envelope.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
  });
}
