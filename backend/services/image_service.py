"""
Servicio de imágenes: expone las imágenes de static/images para la galería.

De momento la carpeta backend/static/images está vacía (placeholder).
Cuando añadas fotos/artwork, este servicio las listará automáticamente.
"""
from pathlib import Path

from config import Config

from .utils import ALLOWED_IMAGE_EXT


def get_gallery_images() -> list[dict]:
    """
    Devuelve una lista de imágenes disponibles en static/images para la galería.
    Cada item: {"filename": str, "url": str}
    """
    images_dir: Path = Config.IMAGES_DIR
    if not images_dir.exists():
        return []

    images = []
    for path in sorted(images_dir.iterdir()):
        if path.is_file() and path.suffix.lower() in ALLOWED_IMAGE_EXT:
            images.append({
                "filename": path.name,
                "url": f"/static/images/{path.name}",
            })
    return images
