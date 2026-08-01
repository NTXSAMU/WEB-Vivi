# Roadmap

Notas de qué falta y en qué orden tiene sentido abordarlo.

## Fase 0 — Andamiaje (hecho en esta entrega)
- [x] Estructura completa de carpetas del proyecto.
- [x] Backend Flask funcional (rutas, servicios, plantillas Jinja2).
- [x] Landing de una página: navbar, hero, sobre-mí, galería, proyectos, contacto, footer.
- [x] Sistema de diseño propio (variables.css) con tema claro/oscuro.
- [x] Formulario de contacto guardando en SQLite.
- [x] Cursor personalizado, partículas ambiente, reveal on scroll, lightbox de galería.

## Fase 1 — Contenido real
- [ ] Sustituir textos placeholder (about, proyectos) por contenido real.
- [ ] Subir fotos/artwork a `backend/static/images` (la galería las detecta sola).
- [ ] Subir pistas a `backend/static/music` (el reproductor las detecta solo).
- [ ] Actualizar enlaces de redes en el footer.

## Fase 2 — Funcionalidad
- [ ] Enviar notificación por email al recibir un mensaje de contacto.
- [ ] Panel simple para ver los mensajes guardados en `contact_messages`.
- [ ] Paginación/filtros en la galería si crece mucho.

## Fase 3 — Extras
- [ ] Evaluar si el módulo C++ (`cpp/`) aporta algo real (p. ej. física de partículas
      compilada a WebAssembly) o si se puede eliminar para simplificar.
- [ ] Tests automáticos (`tests/`) para las rutas del backend.
- [ ] Pipeline de build/optimización (`scripts/optimize_images.py`, `compress_audio.py`).
