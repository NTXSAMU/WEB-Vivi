"""Rutas de página (HTML renderizado con Jinja2)."""
from flask import Blueprint, render_template

from services.content_service import get_content
from services.image_service import get_gallery_images
from services.music_service import get_playlist

home_bp = Blueprint("home", __name__)


@home_bp.route("/")
def index():
    """Página principal: ensambla el layout con todo el contenido."""
    content = get_content()

    playlist = get_playlist()
    song_notes = content.get("song_notes", {})
    for track in playlist:
        note = song_notes.get(track["slug"])
        if note:
            track["note"] = note

    return render_template(
        "index.html",
        content=content,
        playlist=playlist,
        photos=get_gallery_images(),
    )
