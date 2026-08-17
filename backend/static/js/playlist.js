/*
 * playlist.js — reproductor de la sección "playlist": play/pausa, anterior,
 * siguiente, aleatorio, volumen, y arranque automático en cuanto se entra
 * a la web (enganchado al gesto de "Entrar" del candado -- ver gate.js).
 * Usa modules/player.js (envoltorio sobre <audio>).
 */
import { qsa } from './utils.js';
import { AudioPlayer } from './modules/player.js';
import { UNLOCK_EVENT } from './gate.js';

const VOLUME_KEY = 'playlist-volume';
const DEFAULT_VOLUME = 70;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function initPlaylist() {
  const app = document.getElementById('playlistApp');
  if (!app) return;

  const trackEls = qsa('.playlist__track', app);
  if (!trackEls.length) return;

  const tracks = trackEls.map((el) => ({
    index: Number(el.dataset.index),
    src: el.dataset.src,
    title: el.dataset.title,
    artist: el.dataset.artist,
    el,
  }));

  const player = new AudioPlayer();
  const playBtn = document.getElementById('playlistPlayBtn');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  const nowTitle = document.getElementById('nowPlayingTitle');
  const nowArtist = document.getElementById('nowPlayingArtist');
  const prevBtn = document.getElementById('playlistPrev');
  const nextBtn = document.getElementById('playlistNext');
  const shuffleBtn = document.getElementById('playlistShuffle');
  const volumeInput = document.getElementById('playlistVolume');
  const muteBtn = document.getElementById('playlistMuteBtn');
  const iconVolOn = muteBtn?.querySelector('.icon-vol-on');
  const iconVolOff = muteBtn?.querySelector('.icon-vol-off');

  let currentIndex = -1;
  let order = tracks.map((t) => t.index);
  let lastVolume = DEFAULT_VOLUME;

  function setPlayingIcon(isPlaying) {
    iconPlay.hidden = isPlaying;
    iconPause.hidden = !isPlaying;
    playBtn.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproducir');
  }

  function highlightTrack(index) {
    tracks.forEach((t) => t.el.classList.toggle('is-active', t.index === index));
  }

  function playTrack(index) {
    const track = tracks.find((t) => t.index === index);
    if (!track) return;
    currentIndex = index;
    player.load({ url: track.src });
    nowTitle.textContent = track.title;
    nowArtist.textContent = track.artist;
    highlightTrack(index);

    player
      .play()
      .then(() => setPlayingIcon(true))
      .catch(() => {
        // El navegador bloqueó la reproducción (normal si no hubo gesto del
        // usuario, p.ej. en un autoplay fallido). Queda listo para que el
        // click manual en el botón de play lo arranque.
        setPlayingIcon(false);
      });
  }

  function playAdjacent(offset) {
    if (currentIndex === -1) {
      playTrack(order[0]);
      return;
    }
    const pos = order.indexOf(currentIndex);
    const nextPos = (pos + offset + order.length) % order.length;
    playTrack(order[nextPos]);
  }

  trackEls.forEach((el) => {
    el.addEventListener('click', () => playTrack(Number(el.dataset.index)));
  });

  playBtn.addEventListener('click', () => {
    if (currentIndex === -1) {
      playTrack(order[0]);
      return;
    }
    if (player.isPlaying) {
      player.pause();
      setPlayingIcon(false);
    } else {
      player.play().then(() => setPlayingIcon(true)).catch(() => {});
    }
  });

  prevBtn?.addEventListener('click', () => playAdjacent(-1));
  nextBtn?.addEventListener('click', () => playAdjacent(1));

  shuffleBtn?.addEventListener('click', () => {
    const isShuffled = shuffleBtn.classList.toggle('is-active');
    shuffleBtn.setAttribute('aria-pressed', String(isShuffled));
    order = isShuffled ? shuffleArray(tracks.map((t) => t.index)) : tracks.map((t) => t.index);
  });

  player.audio.addEventListener('ended', () => playAdjacent(1));

  // --- Volumen (regulable en cualquier momento, se recuerda entre visitas) ---
  function setVolumeIcon(v) {
    if (!iconVolOn || !iconVolOff) return;
    iconVolOn.hidden = v === 0;
    iconVolOff.hidden = v !== 0;
  }

  if (volumeInput) {
    const stored = Number(localStorage.getItem(VOLUME_KEY));
    const initialVolume = Number.isFinite(stored) && stored > 0 ? stored : DEFAULT_VOLUME;
    volumeInput.value = String(initialVolume);
    player.audio.volume = initialVolume / 100;
    lastVolume = initialVolume || DEFAULT_VOLUME;
    setVolumeIcon(initialVolume);

    volumeInput.addEventListener('input', () => {
      const v = Number(volumeInput.value);
      player.audio.volume = v / 100;
      localStorage.setItem(VOLUME_KEY, String(v));
      setVolumeIcon(v);
      if (v > 0) lastVolume = v;
    });
  }

  muteBtn?.addEventListener('click', () => {
    if (!volumeInput) return;
    const current = Number(volumeInput.value);
    volumeInput.value = current > 0 ? '0' : String(lastVolume || DEFAULT_VOLUME);
    volumeInput.dispatchEvent(new Event('input'));
  });

  // --- Autoplay: arranca en cuanto se "entra" a la web ---
  // gate.js dispara este evento justo en el click de "Entrar" (o de
  // inmediato si no hay candado / ya estaba desbloqueado). Si el navegador
  // bloquea el audio por no considerarlo un gesto válido, playTrack() ya
  // deja la interfaz lista para arrancar con un solo click manual.
  window.addEventListener(UNLOCK_EVENT, () => playTrack(order[0]), { once: true });
}
