# API

El contenido ya no se sirve por API — se renderiza directamente en el HTML
con Jinja2 (ver `backend/routes/home.py`), tanto en local como en la versión
publicada en GitHub Pages (que se genera con `scripts/freeze.py`).

El único endpoint JSON que queda es un health-check:

## `GET /api/health`
Comprobación de que el backend está vivo.

**Respuesta 200**
```json
{ "status": "ok" }
```

Para editar lo que se muestra en la web, ver `docs/content-guide.md`.
