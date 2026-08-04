/*
 * playlist.js — reproductor de la sección "playlist": play/pausa, anterior,
 * siguiente, aleatorio, y click directo en cualquier pista de la lista.
 * Usa modules/player.js (envoltorio sobre <audio>).
 */
import { qsa } from './utils.js';
import { AudioPlayer } from './modules/player.js';

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

  let currentIndex = -1;
  let order = tracks.map((t) => t.index);

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
    player.play().catch(() => {});
    nowTitle.textContent = track.title;
    nowArtist.textContent = track.artist;
    highlightTrack(index);
    setPlayingIcon(true);
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
      player.play().catch(() => {});
      setPlayingIcon(true);
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
}
