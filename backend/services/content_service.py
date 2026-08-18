"""Servicio de contenido: carga backend/data/content.json."""
import json
from pathlib import Path

from config import Config


def get_content() -> dict:
    path: Path = Config.CONTENT_PATH
    if not path.exists():
        return {}

    with open(path, encoding="utf-8") as f:
        return json.load(f)
