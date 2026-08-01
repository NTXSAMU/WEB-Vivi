/* contact.js — envío del formulario de contacto vía fetch a /api/contact */
import { postContact } from './api.js';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = Object.fromEntries(new FormData(form).entries());
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    status.textContent = 'Enviando…';
    status.removeAttribute('data-state');

    try {
      const data = await postContact(payload);
      status.textContent = data.message || 'Mensaje enviado.';
      status.dataset.state = 'ok';
      form.reset();
    } catch (err) {
      status.textContent = err.message || 'No se pudo enviar el mensaje.';
      status.dataset.state = 'error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
