"""Tests del endpoint de contacto (backend/routes/contact.py)."""
import sqlite3
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "backend"))

import pytest
from app import create_app


@pytest.fixture
def client(tmp_path):
    app = create_app("testing")
    app.config["TESTING"] = True
    app.config["DATABASE_PATH"] = tmp_path / "test.db"
    with app.test_client() as client:
        yield client


def test_contact_missing_fields_returns_400(client):
    response = client.post("/api/contact", json={"name": "Ada"})
    assert response.status_code == 400


def test_contact_invalid_email_returns_400(client):
    response = client.post(
        "/api/contact",
        json={"name": "Ada", "email": "no-es-un-email", "message": "Hola"},
    )
    assert response.status_code == 400


def test_contact_valid_submission_returns_200(client):
    response = client.post(
        "/api/contact",
        json={"name": "Ada", "email": "ada@example.com", "message": "Hola!"},
    )
    assert response.status_code == 200
    assert response.get_json()["ok"] is True
