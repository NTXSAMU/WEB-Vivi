"""Endpoints JSON de propósito general (galería, música, salud del servicio)."""
from flask import Blueprint, jsonify

from services.image_service import get_gallery_images
from services.music_service import get_playlist

api_bp = Blueprint("api", __name__)


@api_bp.route("/health")
def health():
    """Comprobación simple de que el backend está vivo."""
    return jsonify({"status": "ok"})


@api_bp.route("/gallery")
def gallery():
    """Devuelve las imágenes disponibles para la galería."""
    return jsonify({"images": get_gallery_images()})


@api_bp.route("/playlist")
def playlist():
    """Devuelve la lista de pistas disponibles para el reproductor."""
    return jsonify({"tracks": get_playlist()})
