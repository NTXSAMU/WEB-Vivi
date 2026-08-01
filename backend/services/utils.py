"""Funciones auxiliares compartidas entre servicios y rutas."""
import re

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

ALLOWED_IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
ALLOWED_AUDIO_EXT = {".mp3", ".ogg", ".wav"}


def is_valid_email(email: str) -> bool:
    """Validación simple de formato de email (no verifica que exista)."""
    return bool(_EMAIL_RE.match(email))


def allowed_file(filename: str, allowed_ext: set[str]) -> bool:
    """Comprueba si la extensión de un archivo está en el set permitido."""
    return "." + filename.rsplit(".", 1)[-1].lower() in allowed_ext if "." in filename else False
