"""Tests básicos de las rutas de página (backend/routes/home.py)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "backend"))

import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app("testing")
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_index_status_ok(client):
    response = client.get("/")
    assert response.status_code == 200


def test_index_contains_hero(client):
    response = client.get("/")
    assert b"hero" in response.data
