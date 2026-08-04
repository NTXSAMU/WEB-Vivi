# Para Viktoria 💗

Una web personal y privada — cartas, la playlist de canciones que le
recuerdan a él, notas, cosas que le gustan, planes por hacer, recuerdos y un
juego para seguir conociéndose. Hecha con Flask + HTML/CSS/JS a mano (sin
frameworks pesados) para poder ir ampliándola con el tiempo.

## Antes de compartir el link — privacidad

Esta web se publica en GitHub Pages, que es **público por defecto**:
cualquiera con el link puede verla, y si el repositorio de GitHub es
público, en teoría cualquiera podría encontrar el repositorio también
(aunque no aparecerá en buscadores gracias a la etiqueta `noindex`).

Para reducir que alguien random tropiece con ella, la web incluye un
**candado de entrada** (una pregunta antes de poder ver nada) — pero ojo,
**no es seguridad real**: alguien con conocimientos técnicos podría ver el
contenido igualmente mirando el código fuente. Es más bien un "solo para ti"
simbólico, no una caja fuerte. Cambia la pregunta/respuesta en
`backend/data/content.json` → `"gate"` antes de compartir el link.

Si más adelante quieres privacidad de verdad, la opción es un hosting con
autenticación real (login con contraseña en el servidor) en vez de GitHub
Pages — es más complejo de montar; dímelo si llegas a ese punto.

## Estructura

```
backend/
  app.py                  Flask
  data/content.json       ← TODO el contenido editable vive aquí
  templates/               Jinja2 (layout + componentes por sección)
  static/
    css/, js/               estilos y JS (vanilla, ES modules)
    music/                  las 45 canciones (128kbps)
    images/                 fotos (vacío hasta que añadas)
scripts/freeze.py         Genera la versión estática para GitHub Pages
docs/content-guide.md     Cómo añadir notas, planes, recuerdos, etc.
frontend/                 Sin usar actualmente (ver frontend/README.md)
```

## Cómo arrancarlo en local

```bash
cd backend
python -m venv ../.venv && source ../.venv/bin/activate
pip install -r requirements.txt
python app.py
```

Abre http://127.0.0.1:5000

## Cómo editar el contenido

Todo vive en **`backend/data/content.json`** — un único archivo, sin tocar
código. Guía paso a paso con ejemplos copia-pega: **`docs/content-guide.md`**.

Resumen rápido:
- **Notas / sentimientos / cartas** → `content.notes`
- **Planes por hacer** → `content.bucket_list`
- **Cosas que le gustan** (por categorías) → `content.likes`
- **Recuerdos** → `content.memories`
- **Preguntas del juego** → `content.questions`
- **Fotos** → sube el archivo a `backend/static/images/`, aparece sola
- **Canciones** → sube el mp3 a `backend/static/music/`, aparece sola
  (título/artista se leen de las etiquetas ID3 del archivo)

## Publicar en GitHub Pages

`.github/workflows/deploy-pages.yml` ya está listo: en cada push a `main`
ejecuta `scripts/freeze.py` (renderiza Flask a HTML estático) y lo publica.

**Una sola vez:** en el repo → **Settings → Pages → Build and deployment →
Source → "GitHub Actions"**.

Con eso, cada vez que edites `content.json` y hagas push, la web se
actualiza sola en 1-2 minutos.

### Nota de tamaño del repo

El repo pesa **~134 MB** (las 45 canciones, ya recomprimidas a 128kbps desde
los ~240MB originales). Es más de lo habitual para un repo, pero sigue muy
por debajo de los límites de GitHub (100MB por archivo, ~1GB recomendado
para Pages) — no debería dar problemas, solo que el primer `git push` puede
tardar un poco más de lo normal según tu conexión.

## Tests

```bash
pip install pytest
pytest tests/backend -v
```

## Stack

- **Backend**: Flask 3, Jinja2, mutagen (etiquetas ID3 de las canciones).
- **Frontend**: HTML/CSS/JS vanilla, ES modules, sin build step.
- **Tipografía**: Playfair Display (titulares), Inter (texto), Caveat (detalles manuscritos).
- **Publicación**: GitHub Pages vía `scripts/freeze.py` (Flask → HTML estático).

## Licencia

MIT — ver `LICENSE`.
