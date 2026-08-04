/*
 * bucketlist.js — checklist de "cosas por hacer".
 * Los ítems marcados como cumplidos en content.json (data-official="true")
 * son fijos. Los demás se pueden marcar/desmarcar libremente en el navegador
 * de quien los mire -- se guarda con localStorage, así que es un "check"
 * personal (no cambia el archivo de contenido ni se sincroniza entre
 * dispositivos). Cuando de verdad se cumpla algo, edita content.json.
 */
import { qsa } from './utils.js';

const STORAGE_KEY = 'bucketlist-checked';

function getChecked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function saveChecked(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function initBucketlist() {
  const app = document.getElementById('bucketlistApp');
  if (!app) return;

  const items = qsa('.bucketlist__item', app);
  const total = Number(app.dataset.total) || items.length;
  const countEl = document.getElementById('bucketlistDoneCount');
  const fillEl = document.getElementById('bucketlistProgressFill');
  const checked = getChecked();

  function updateProgress() {
    const officialDone = items.filter((i) => i.dataset.official === 'true').length;
    const locallyDone = items.filter(
      (i) => i.dataset.official !== 'true' && checked.has(i.dataset.id)
    ).length;
    const doneCount = officialDone + locallyDone;
    countEl.textContent = String(doneCount);
    fillEl.style.width = total ? `${(doneCount / total) * 100}%` : '0%';
  }

  items.forEach((item) => {
    if (item.dataset.official === 'true') return;

    const btn = item.querySelector('.bucketlist__check');
    if (checked.has(item.dataset.id)) {
      item.classList.add('is-done');
      btn.setAttribute('aria-pressed', 'true');
    }

    btn.addEventListener('click', () => {
      const isChecked = checked.has(item.dataset.id);
      if (isChecked) {
        checked.delete(item.dataset.id);
        item.classList.remove('is-done');
        btn.setAttribute('aria-pressed', 'false');
      } else {
        checked.add(item.dataset.id);
        item.classList.add('is-done');
        btn.setAttribute('aria-pressed', 'true');
      }
      saveChecked(checked);
      updateProgress();
    });
  });

  updateProgress();
}
