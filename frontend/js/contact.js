/*
 * contact.js — versión para el sitio ESTÁTICO (GitHub Pages / frontend/).
 *
 * Primero intenta enviar a /api/contact (por si este HTML se sirve junto al
 * backend Flask). Si no hay backend disponible —el caso normal en GitHub
 * Pages, que solo sirve archivos estáticos— cae automáticamente a abrir el
 * cliente de correo del visitante con el mensaje ya redactado.
 *
 * Cambia FALLBACK_EMAIL por tu email real antes de publicar.
 */
import { postContact } from './api.js';

const FALLBACK_EMAIL = 'tu-email@example.com'; // TODO: pon aquí tu email real

function openMailtoFallback({ name, email, message }) {
  const subject = encodeURIComponent(`Contacto desde la web — ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
}

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
      // No hay backend disponible (típico en GitHub Pages): fallback a mailto
      openMailtoFallback(payload);
      status.textContent = 'Abriendo tu cliente de correo para enviar el mensaje…';
      status.dataset.state = 'ok';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
