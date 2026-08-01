"""
Servicio de música: expone las pistas de static/music para el reproductor (player.js).

De momento la carpeta backend/static/music está vacía (placeholder).
Cuando añadas pistas, este servicio las listará automáticamente.
"""
from pathlib import Path

from config import Config

from .utils import ALLOWED_AUDIO_EXT


def get_playlist() -> list[dict]:
    """
    Devuelve la lista de pistas disponibles en static/music.
    Cada item: {"filename": str, "title": str, "url": str}
    """
    music_dir: Path = Config.MUSIC_DIR
    if not music_dir.exists():
        return []

    tracks = []
    for path in sorted(music_dir.iterdir()):
        if path.is_file() and path.suffix.lower() in ALLOWED_AUDIO_EXT:
            tracks.append({
                "filename": path.name,
                "title": path.stem.replace("_", " ").replace("-", " ").title(),
                "url": f"/static/music/{path.name}",
            })
    return tracks
