#!/usr/bin/env python3
"""
freeze.py — renderiza la app Flask a HTML estático para publicarla en GitHub Pages.

GitHub Pages solo sirve archivos estáticos: este script usa el test client de
Flask para renderizar '/' exactamente como lo haría el servidor, reescribe las
rutas de /static/ para que funcionen bajo un subpath (p. ej. GitHub Pages de
proyecto: usuario.github.io/repo/), y copia backend/static/ tal cual.

Es la ÚNICA fuente de verdad para lo que se publica -- no hay que mantener
un mirror HTML aparte. Edita backend/data/content.json y backend/templates/,
y este script se encarga de generar la versión estática.

Uso:
    python scripts/freeze.py [carpeta_salida]   # por defecto: ./site
"""
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from app import create_app  # noqa: E402


def fix_static_paths(html: str) -> str:
    """url_for('static', ...) genera rutas absolutas (/static/...).
    Las hacemos relativas para que funcionen bajo cualquier subpath."""
    return re.sub(r'(href|src)="/static/', r'\1="./static/', html)


def main() -> None:
    output_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "site"

    app = create_app("production")
    client = app.test_client()

    response = client.get("/")
    if response.status_code != 200:
        print(f"Error renderizando '/': status {response.status_code}")
        print(response.get_data(as_text=True)[:2000])
        raise SystemExit(1)

    html = fix_static_paths(response.get_data(as_text=True))

    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    (output_dir / "index.html").write_text(html, encoding="utf-8")
    shutil.copytree(BACKEND_DIR / "static", output_dir / "static")
    (output_dir / ".nojekyll").touch()

    size_mb = sum(f.stat().st_size for f in output_dir.rglob("*") if f.is_file()) / 1024 / 1024
    print(f"Sitio estático generado en {output_dir} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
