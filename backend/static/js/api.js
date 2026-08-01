/* api.js — cliente ligero para los endpoints /api/* del backend Flask */

const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let errMsg = `Error ${res.status}`;
    try {
      const data = await res.json();
      errMsg = data.error || errMsg;
    } catch {
      /* respuesta sin JSON, se mantiene el mensaje por defecto */
    }
    throw new Error(errMsg);
  }
  return res.json();
}

export function getGallery() {
  return request('/gallery');
}

export function getPlaylist() {
  return request('/playlist');
}

export function postContact(payload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
