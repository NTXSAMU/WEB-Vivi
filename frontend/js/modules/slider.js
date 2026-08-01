/*
 * modules/slider.js — carrusel reutilizable, listo para cuando la sección
 * de proyectos crezca y una grid estática ya no sea suficiente.
 *
 * Uso previsto:
 *   import { Slider } from './modules/slider.js';
 *   new Slider(document.querySelector('.cards')).init();
 */

export class Slider {
  constructor(container, { loop = true } = {}) {
    this.container = container;
    this.loop = loop;
    this.index = 0;
    this.items = [];
  }

  init() {
    this.items = Array.from(this.container.children);
    this._update();
    return this;
  }

  next() {
    this.index = this.loop
      ? (this.index + 1) % this.items.length
      : Math.min(this.index + 1, this.items.length - 1);
    this._update();
  }

  prev() {
    this.index = this.loop
      ? (this.index - 1 + this.items.length) % this.items.length
      : Math.max(this.index - 1, 0);
    this._update();
  }

  _update() {
    this.items.forEach((item, i) => item.classList.toggle('is-active', i === this.index));
  }
}
