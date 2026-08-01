# API

Endpoints expuestos por el backend Flask (prefijo `/api`).

## `GET /api/health`
Comprobación de vida del servicio.

**Respuesta 200**
```json
{ "status": "ok" }
```

## `GET /api/gallery`
Lista las imágenes disponibles en `backend/static/images`.

**Respuesta 200**
```json
{ "images": [ { "filename": "foto1.jpg", "url": "/static/images/foto1.jpg" } ] }
```

## `GET /api/playlist`
Lista las pistas disponibles en `backend/static/music`.

**Respuesta 200**
```json
{ "tracks": [ { "filename": "ambient1.mp3", "title": "Ambient1", "url": "/static/music/ambient1.mp3" } ] }
```

## `POST /api/contact`
Guarda un mensaje de contacto en SQLite (`database/sqlite.db`, tabla `contact_messages`).

**Body**
```json
{ "name": "Ada", "email": "ada@example.com", "message": "Hola!" }
```

**Respuesta 200**
```json
{ "ok": true, "message": "Mensaje recibido, ¡gracias!" }
```

**Respuesta 400** (campos faltantes o email inválido)
```json
{ "ok": false, "error": "Faltan campos obligatorios." }
```
