# Changelog

## [0.3.0] — De portfolio a web para Viktoria
- Pivote completo de contenido: de "portfolio de desarrollador" a web romántica personal.
- Nuevo sistema de contenido en `backend/data/content.json` (notas, planes, likes, recuerdos, preguntas).
- Nuevas secciones: carta (sobre interactivo), playlist completa con 45 canciones, notas filtrables, cosas que le gustan por categorías, checklist de planes con progreso, timeline de recuerdos, fotos, juego de preguntas.
- Rediseño visual completo: paleta rosa/dorado, tipografía Playfair Display + Inter + Caveat.
- Candado de entrada opcional + `noindex` (la página es privada).
- `scripts/freeze.py`: nueva forma de publicar en GitHub Pages, renderizando Flask directamente (reemplaza el mirror manual en `frontend/`, ahora sin usar).
- Eliminado: formulario de contacto genérico, SQLite, secciones de portfolio (about/proyectos/galería de trabajo).
- 45 canciones recomprimidas a 128kbps con metadatos ID3 reales (mutagen).

## [0.2.0] — Despliegue en GitHub Pages
- Workflow inicial `.github/workflows/deploy-pages.yml`.
- Fallback a `mailto:` en el formulario de contacto (ya eliminado en 0.3.0).

## [0.1.0] — Andamiaje inicial
- Estructura completa del proyecto (backend, frontend, assets, cpp, database, docs, tests, scripts).
- Backend Flask con blueprints y plantillas Jinja2 componetizadas.
- Sistema de diseño inicial (portfolio de desarrollador).
