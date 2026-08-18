"""
Servicio de música: expone las pistas de static/music para el reproductor.

Lee el título y artista reales desde las etiquetas ID3 de cada mp3 (con
mutagen). Si un archivo no tiene etiquetas legibles, usa el nombre de
archivo como título de reserva.
"""
from pathlib import Path

from config import Config

from .utils import ALLOWED_AUDIO_EXT

try:
    from mutagen import File as MutagenFile
except ImportError:
    MutagenFile = None


def _read_tags(path: Path) -> tuple[str, str]:
    fallback_title = path.stem.replace("_", " ").replace("-", " ").title()

    if MutagenFile is None:
        return fallback_title, ""

    try:
        audio = MutagenFile(path, easy=True)
        if not audio or not audio.tags:
            return fallback_title, ""
        title = (audio.tags.get("title") or [None])[0] or fallback_title
        artist = (audio.tags.get("artist") or [None])[0] or ""
        return title, artist
    except Exception:
        return fallback_title, ""


def get_playlist() -> list[dict]:
    music_dir: Path = Config.MUSIC_DIR
    if not music_dir.exists():
        return []

    tracks = []
    for path in music_dir.iterdir():
        if path.is_file() and path.suffix.lower() in ALLOWED_AUDIO_EXT:
            title, artist = _read_tags(path)
            tracks.append({
                "slug": path.stem,
                "title": title,
                "artist": artist,
                "url": f"/static/music/{path.name}",
            })

    tracks.sort(key=lambda t: t["title"].lower())
    return tracks
