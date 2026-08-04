# Roadmap

## Hecho
- [x] Backend Flask con todo el contenido en `backend/data/content.json`.
- [x] Secciones: hero, carta, playlist (45 canciones), notas/sentimientos/cartas,
      cosas que le gustan (por categorías), planes por hacer, recuerdos, fotos,
      juego de preguntas.
- [x] Diseño romántico propio: paleta rosa/dorado sobre fondo íntimo, tipografía
      Playfair Display + Inter + Caveat, tema claro/oscuro, cursor personalizado,
      partículas suaves, scroll reveal.
- [x] Candado de entrada opcional (pregunta/respuesta).
- [x] `noindex` para que no salga en buscadores.
- [x] Publicación automática en GitHub Pages vía `scripts/freeze.py`.
- [x] 45 canciones recomprimidas a 128kbps (240MB -> 134MB) con título/artista
      reales leídos de las etiquetas ID3.

## Por hacer (contenido, no código)
- [ ] Rellenar `content.json` con cosas reales: notas, planes, recuerdos, cosas
      que le gustan, preguntas del juego. Ahora mismo todo son placeholders
      marcados con paréntesis, ej. `(su postre favorito va aquí)`.
- [ ] Cambiar `gate.answer` en `content.json` por la respuesta real.
- [ ] Añadir fotos a `backend/static/images/` (aparecen solas en "Fotos sueltas").
- [ ] Opcional: notas por canción en `song_notes`.

## Ideas para más adelante
- [ ] Que las canciones tengan letra/momento destacado además del título.
- [ ] Una sección de "cuenta atrás" para una fecha especial.
- [ ] Modo "sorpresa": una nota nueva que se desbloquea cada semana.
