/*
 * playlist.js — controla la barra de música (player-bar.html, estilo
 * Spotify: fija abajo, todo el ancho, siempre visible en cualquier punto
 * de la página): play/pausa, anterior, siguiente, aleatorio, progreso de
 * la canción (con salto al arrastrar), volumen, y arranque automático al
 * entrar a la web (enganchado al gesto de "Entrar" -- ver gate.js).
 *
 * Al terminar una canción pasa sola a la siguiente (nunca bucle: ver
 * modules/player.js, audio.loop = false).
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

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function initPlaylist() {
  const trackEls = qsa('.playlist__track');
  const bar = document.getElementById('playerBar');
  if (!trackEls.length || !bar) return;

  const tracks = trackEls.map((el) => ({
    index: Number(el.dataset.index),
    src: el.dataset.src,
    title: el.dataset.title,
    artist: el.dataset.artist,
    el,
  }));

  const player = new AudioPlayer();
  player.audio.loop = false; // nunca en bucle: al acabar, pasa sola a la siguiente

  const playBtn = document.getElementById('barPlayBtn');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  const nowTitle = document.getElementById('barNowTitle');
  const nowArtist = document.getElementById('barNowArtist');
  const prevBtn = document.getElementById('barPrev');
  const nextBtn = document.getElementById('barNext');
  const shuffleBtn = document.getElementById('barShuffle');
  const seekInput = document.getElementById('barSeek');
  const currentTimeEl = document.getElementById('barCurrentTime');
  const durationEl = document.getElementById('barDuration');
  const muteBtn = document.getElementById('playerBarMute');
  const iconVolOn = muteBtn.querySelector('.icon-vol-on');
  const iconVolOff = muteBtn.querySelector('.icon-vol-off');
  const volumeInput = document.getElementById('barVolume');

  let currentIndex = -1;
  let order = tracks.map((t) => t.index);
  let lastVolume = DEFAULT_VOLUME;
  let isSeeking = false;

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
    seekInput.value = '0';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';

    player
      .play()
      .then(() => setPlayingIcon(true))
      .catch(() => setPlayingIcon(false));
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

  prevBtn.addEventListener('click', () => playAdjacent(-1));
  nextBtn.addEventListener('click', () => playAdjacent(1));

  shuffleBtn.addEventListener('click', () => {
    const isShuffled = shuffleBtn.classList.toggle('is-active');
    shuffleBtn.setAttribute('aria-pressed', String(isShuffled));
    order = isShuffled ? shuffleArray(tracks.map((t) => t.index)) : tracks.map((t) => t.index);
  });

  // Al terminar, pasa sola a la siguiente (nunca vuelve a empezar la misma)
  player.audio.addEventListener('ended', () => playAdjacent(1));

  // --- Progreso / buscar dentro de la canción ---
  player.audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(player.audio.duration);
  });

  player.audio.addEventListener('timeupdate', () => {
    if (isSeeking) return;
    const pct = player.audio.duration ? (player.audio.currentTime / player.audio.duration) * 100 : 0;
    seekInput.value = String(pct);
    currentTimeEl.textContent = formatTime(player.audio.currentTime);
  });

  seekInput.addEventListener('input', () => {
    isSeeking = true;
    if (player.audio.duration) {
      currentTimeEl.textContent = formatTime((Number(seekInput.value) / 100) * player.audio.duration);
    }
  });

  seekInput.addEventListener('change', () => {
    if (player.audio.duration) {
      player.audio.currentTime = (Number(seekInput.value) / 100) * player.audio.duration;
    }
    isSeeking = false;
  });

  // --- Volumen (regulable en cualquier momento, en cualquier parte de la web) ---
  function setVolumeIcon(v) {
    iconVolOn.hidden = v === 0;
    iconVolOff.hidden = v !== 0;
  }

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

  muteBtn.addEventListener('click', () => {
    const current = Number(volumeInput.value);
    volumeInput.value = current > 0 ? '0' : String(lastVolume || DEFAULT_VOLUME);
    volumeInput.dispatchEvent(new Event('input'));
  });

  // --- Autoplay: arranca en cuanto se "entra" a la web ---
  window.addEventListener(UNLOCK_EVENT, () => playTrack(order[0]), { once: true });
}
