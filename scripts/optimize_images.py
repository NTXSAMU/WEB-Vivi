#!/usr/bin/env python3
"""
optimize_images.py — comprime/redimensiona imágenes de assets/images
antes de copiarlas a backend/static/images.

Requiere: pip install -r requirements.txt (Pillow, ver requirements.txt raíz).

Uso:
    python scripts/optimize_images.py
"""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets" / "images"
TARGET_DIR = ROOT / "backend" / "static" / "images"
MAX_WIDTH = 1920
JPEG_QUALITY = 85


def optimize_image(src: Path, dest: Path) -> None:
    with Image.open(src) as img:
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            img = img.resize((MAX_WIDTH, int(img.height * ratio)))
        dest.parent.mkdir(parents=True, exist_ok=True)
        save_kwargs = {"quality": JPEG_QUALITY, "optimize": True} if img.format == "JPEG" else {"optimize": True}
        img.save(dest, **save_kwargs)


def main() -> None:
    if Image is None:
        print("Pillow no está instalado. Ejecuta: pip install -r requirements.txt --break-system-packages")
        return

    if not SOURCE_DIR.exists():
        print(f"No existe {SOURCE_DIR}, nada que optimizar todavía.")
        return

    images = [p for p in SOURCE_DIR.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
    if not images:
        print("No hay imágenes en assets/images/ todavía.")
        return

    for src in images:
        dest = TARGET_DIR / src.name
        optimize_image(src, dest)
        print(f"✓ {src.relative_to(ROOT)} -> {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
