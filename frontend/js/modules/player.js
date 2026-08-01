/* modules/player.js — envoltorio mínimo sobre <audio> para el reproductor ambiente */

export class AudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.currentTrack = null;
  }

  load(track) {
    this.currentTrack = track;
    this.audio.src = track.url;
  }

  play() {
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  get isPlaying() {
    return !this.audio.paused;
  }
}
