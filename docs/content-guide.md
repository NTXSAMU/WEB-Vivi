# Cómo añadir contenido nuevo

Todo el contenido editable vive en **`backend/data/content.json`**. Es un
único archivo de texto — lo puedes editar directamente en GitHub (pencil ✏️
en la esquina de ese archivo) sin tocar nada de código.

Las claves que empiezan por `_` (como `_comentario` o `_ejemplo`) son notas
para ti, no aparecen en la web. Puedes dejarlas o borrarlas, da igual.

Después de editar y hacer commit a `main`, el workflow de GitHub Actions
reconstruye la web sola en 1-2 minutos.

---

## Añadir una nota / sentimiento / carta

Busca la lista `"notes"` y añade un bloque como este (con coma antes si no
es el primero de la lista):

```json
{
  "type": "sentimiento",
  "mood": "ilusión",
  "text": "Aquí el texto que quieras."
}
```

`"type"` puede ser `"sentimiento"`, `"nota"` o `"carta"` (cambia el color del
borde de la tarjeta y en qué filtro aparece). `"mood"` es opcional, solo
aplica a `"sentimiento"`.

## Marcar algo de la lista de planes como cumplido

Busca `"bucket_list"` y cambia `"done": false` por `"done": true` en el
ítem correspondiente. Para añadir uno nuevo:

```json
{ "text": "Lo que sea que queráis hacer", "done": false, "when": "algún día" }
```

## Añadir algo que le gusta (o una categoría nueva)

Busca `"likes"`. Para añadir un ítem a una categoría que ya existe, añade
una línea dentro de su `"items"`. Para crear una categoría nueva:

```json
{
  "category": "Música",
  "icon": "🎧",
  "items": ["Su artista favorito", "Esa canción que pone siempre"]
}
```

## Añadir un recuerdo

Busca `"memories"`:

```json
{
  "date": "verano de 2024",
  "title": "Título corto",
  "text": "Cuenta aquí qué pasó.",
  "image": null
}
```

Si quieres poner una foto: sube la imagen a `backend/static/images/`
(cualquier nombre, ej. `recuerdo1.jpg`) y pon
`"image": "/static/images/recuerdo1.jpg"` en vez de `null`.

## Añadir una pregunta al juego

Busca `"questions"` y añade una línea más a la lista:

```json
"¿Otra pregunta que se te ocurra?"
```

## Poner una nota a una canción (por qué esa canción importa)

Busca `"song_notes"`. La clave es el nombre del archivo sin `.mp3` (el
"slug"). Para ver los slugs disponibles, mira los nombres de archivo en
`backend/static/music/`. Ejemplo:

```json
"a-mi": "Esta fue la primera que me enseñaste"
```

## Añadir una canción nueva

Copia el mp3 a `backend/static/music/`. Aparece sola en la playlist, usando
el título/artista que tenga en sus etiquetas ID3 (si el mp3 no tiene
etiquetas, usa el nombre del archivo). Si el archivo pesa mucho (más de
6-7 MB), considera pasarlo por `scripts/compress_audio.py` antes.

## Cambiar la pregunta/respuesta de entrada

Busca `"gate"` al principio del archivo y cambia `"question"` y `"answer"`.
Recuerda: esto no es seguridad real, solo evita que entre cualquiera con el
link por casualidad — ver la nota de privacidad en el README principal.

---

### Si algo se rompe

Un JSON mal formado (falta una coma, una comilla sin cerrar...) hace que
la web entera falle. Si no estás seguro, pega el archivo completo en el
chat y te digo qué está mal — o simplemente pídeme el cambio que quieres
y te devuelvo el archivo listo para pegar.
