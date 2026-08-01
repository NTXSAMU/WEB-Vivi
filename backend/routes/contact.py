"""Endpoint del formulario de contacto."""
import sqlite3
from datetime import datetime, timezone

from flask import Blueprint, current_app, jsonify, request

from services.utils import is_valid_email

contact_bp = Blueprint("contact", __name__)


def _get_db_connection():
    db_path = current_app.config["DATABASE_PATH"]
    conn = sqlite3.connect(db_path)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    return conn


@contact_bp.route("/contact", methods=["POST"])
def submit_contact():
    """Valida y guarda un mensaje de contacto en SQLite."""
    data = request.get_json(silent=True) or request.form

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"ok": False, "error": "Faltan campos obligatorios."}), 400

    if not is_valid_email(email):
        return jsonify({"ok": False, "error": "El email no parece válido."}), 400

    conn = _get_db_connection()
    conn.execute(
        "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
        (name, email, message, datetime.now(timezone.utc).isoformat()),
    )
    conn.commit()
    conn.close()

    return jsonify({"ok": True, "message": "Mensaje recibido, ¡gracias!"})
