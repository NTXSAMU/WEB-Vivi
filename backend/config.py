"""
Configuración central de la aplicación.
Los valores sensibles se leen de variables de entorno (ver .env, no versionado).
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


class Config:
    """Configuración base compartida por todos los entornos."""
    SECRET_KEY = os.environ.get("SECRET_KEY", "clave-de-desarrollo-cambiar-en-produccion")
    DEBUG = False
    TESTING = False

    # Rutas usadas por los servicios (galería, música, etc.)
    STATIC_DIR = BASE_DIR / "static"
    IMAGES_DIR = STATIC_DIR / "images"
    MUSIC_DIR = STATIC_DIR / "music"

    # Base de datos SQLite (usada por routes/contact.py)
    DATABASE_PATH = BASE_DIR.parent / "database" / "sqlite.db"


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


class TestingConfig(Config):
    TESTING = True
    DATABASE_PATH = ":memory:"


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}
