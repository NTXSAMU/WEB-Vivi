"""Tests básicos de la página principal (backend/routes/home.py)."""
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


def test_index_contains_all_sections(client):
    body = client.get("/").get_data(as_text=True)
    for section_id in [
        "hero", "carta", "razones", "playlist", "notas",
        "para-ti", "planes", "recuerdos", "fotos", "juego",
    ]:
        assert f'id="{section_id}"' in body


def test_index_contains_noindex(client):
    """La página es privada: no debe indexarse en buscadores."""
    body = client.get("/").get_data(as_text=True)
    assert "noindex" in body


def test_playlist_tracks_are_rendered(client):
    body = client.get("/").get_data(as_text=True)
    assert body.count('data-index="') > 0


def test_health_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json()["status"] == "ok"
