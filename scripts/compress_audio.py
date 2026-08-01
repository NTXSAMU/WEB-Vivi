#!/usr/bin/env python3
"""
compress_audio.py — comprime pistas de assets/music (a MP3 128kbps)
antes de copiarlas a backend/static/music.

Requiere: pip install -r requirements.txt (pydub, ver requirements.txt raíz)
y ffmpeg instalado en el sistema.

Uso:
    python scripts/compress_audio.py
"""
from pathlib import Path

try:
    from pydub import AudioSegment
except ImportError:
    AudioSegment = None

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets" / "music"
TARGET_DIR = ROOT / "backend" / "static" / "music"
BITRATE = "128k"


def main() -> None:
    if AudioSegment is None:
        print("pydub no está instalado. Ejecuta: pip install -r requirements.txt --break-system-packages")
        return

    if not SOURCE_DIR.exists():
        print(f"No existe {SOURCE_DIR}, nada que comprimir todavía.")
        return

    tracks = [p for p in SOURCE_DIR.rglob("*") if p.suffix.lower() in {".wav", ".flac", ".mp3", ".ogg"}]
    if not tracks:
        print("No hay pistas en assets/music/ todavía.")
        return

    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    for src in tracks:
        dest = TARGET_DIR / (src.stem + ".mp3")
        audio = AudioSegment.from_file(src)
        audio.export(dest, format="mp3", bitrate=BITRATE)
        print(f"✓ {src.relative_to(ROOT)} -> {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
