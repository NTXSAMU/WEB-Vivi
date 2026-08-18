"""
Endpoints JSON de propósito general.

El contenido (notas, playlist, fotos, etc.) se renderiza directamente en el
HTML con Jinja2 -- ver routes/home.py. Este blueprint se queda solo con un
health-check, útil para comprobar que el backend está vivo.
"""
from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__)


@api_bp.route("/health")
def health():
    """Comprobación simple de que el backend está vivo."""
    return jsonify({"status": "ok"})
