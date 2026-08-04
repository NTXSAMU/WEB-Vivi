"""
Servicio de contenido: carga backend/data/content.json.

Todo el contenido "editable a mano" (carta, notas, bucket list, cosas que le
gustan, recuerdos, preguntas...) vive en ese único archivo JSON para que se
pueda ampliar sin tocar código Python ni plantillas.
"""
import json
from pathlib import Path

from config import Config


def get_content() -> dict:
    """Carga y devuelve el contenido editable desde data/content.json."""
    path: Path = Config.CONTENT_PATH
    if not path.exists():
        return {}

    with open(path, encoding="utf-8") as f:
        return json.load(f)
