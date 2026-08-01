"""Rutas de páginas (HTML renderizado con Jinja2)."""
from flask import Blueprint, render_template

from services.image_service import get_gallery_images
from services.music_service import get_playlist

home_bp = Blueprint("home", __name__)


@home_bp.route("/")
def index():
    """Página principal: ensambla el layout con todos los componentes."""
    return render_template(
        "index.html",
        gallery_images=get_gallery_images(),
        playlist=get_playlist(),
    )
