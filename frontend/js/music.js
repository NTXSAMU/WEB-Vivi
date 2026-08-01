/* music.js — conecta el botón de la navbar con el reproductor ambiente.
   Si no hay pistas en backend/static/music, el botón se deshabilita solo. */
import { getPlaylist } from './api.js';
import { AudioPlayer } from './modules/player.js';

export async function initMusic() {
  const toggle = document.getElementById('musicToggle');
  if (!toggle) return;

  let player;
  try {
    const { tracks } = await getPlaylist();
    if (!tracks || tracks.length === 0) {
      toggle.disabled = true;
      toggle.title = 'Añade pistas a backend/static/music para activar el reproductor';
      toggle.style.opacity = '0.4';
      return;
    }
    player = new AudioPlayer();
    player.load(tracks[0]);
  } catch (err) {
    console.warn('No se pudo cargar la playlist:', err);
    toggle.disabled = true;
    return;
  }

  toggle.addEventListener('click', () => {
    if (player.isPlaying) {
      player.pause();
      toggle.setAttribute('aria-pressed', 'false');
    } else {
      player.play().catch(() => {});
      toggle.setAttribute('aria-pressed', 'true');
    }
  });
}
