# mi-landing

Landing page personal (portfolio) con backend Flask, diseño propio (tema
claro/oscuro, cursor personalizado, partículas ambiente, galería con
lightbox y reproductor de música) y un mirror estático en `frontend/`.

Este es el **andamiaje inicial**: estructura completa, funcional pero con
contenido placeholder. Ver `docs/roadmap.md` para los próximos pasos.

## Estructura

```
backend/     Flask: rutas, servicios, plantillas Jinja2, estáticos servidos
frontend/    Mirror HTML/CSS/JS estático, sin dependencia de Flask
assets/      Fuente "en bruto" de imágenes, música, vídeos, fuentes, modelos
cpp/         Módulo nativo opcional (placeholder, pensado para WebAssembly)
database/    SQLite + migraciones
docs/        roadmap, documentación de la API, changelog
tests/       Tests de backend (pytest), frontend y performance (pendientes)
scripts/     build, optimización de imágenes/audio, deploy
```

La versión que de verdad sirve la web es `backend/` (Flask + Jinja2).
`frontend/pages/index.html` es una versión estática equivalente, útil para
previsualizar sin levantar el servidor o para un despliegue puramente
estático; `frontend/components/` son fragmentos de referencia, no se
incluyen automáticamente en ningún build.

## Cómo arrancarlo

```bash
cd backend
python -m venv ../.venv && source ../.venv/bin/activate   # opcional pero recomendado
pip install -r requirements.txt
python app.py
```

Abre http://127.0.0.1:5000 — deberías ver la landing completa: navbar,
hero con partículas, sobre-mí, galería (vacía hasta que añadas imágenes),
proyectos y un formulario de contacto que guarda en SQLite.

Para previsualizar solo el HTML/CSS/JS sin backend:

```bash
cd frontend/pages
python -m http.server 8080
# abre http://127.0.0.1:8080/index.html
```

(Los módulos ES requieren servirse por HTTP, no funcionan con `file://`.)

## Añadir contenido

- **Imágenes de galería**: pon los archivos en `backend/static/images/`
  (o en `assets/images/gallery/` y cópialos con `scripts/optimize_images.py`).
  Aparecen solas en la sección de galería.
- **Música ambiente**: pon pistas en `backend/static/music/`. El botón de
  música de la navbar se activa solo en cuanto detecta al menos una pista.
- **Textos**: edita `backend/templates/components/*.html` (about, proyectos,
  contacto). Los placeholders están marcados con texto genérico tipo
  "Tu Nombre" / "Nombre del proyecto".

## Tests

```bash
pip install pytest
pytest tests/backend -v
```

## Stack

- **Backend**: Flask 3, Jinja2, SQLite (sin ORM, sqlite3 estándar).
- **Frontend**: HTML/CSS/JS vanilla, ES modules (sin bundler ni framework).
- **Tipografía**: Space Grotesk (display), Inter (texto), JetBrains Mono (UI/código).
- **Opcional**: módulo C++ en `cpp/` (placeholder, no se usa todavía).

## Licencia

MIT — ver `LICENSE`.
