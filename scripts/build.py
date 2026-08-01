#!/usr/bin/env python3
"""
build.py — pipeline de build simple para producción.

De momento es un placeholder que documenta los pasos previstos.
Cuando el proyecto lo necesite de verdad, aquí se orquestarían:
  1. optimize_images.py  -> comprime assets/images antes de servirlas
  2. compress_audio.py   -> comprime assets/music antes de servirla
  3. Minificación de CSS/JS de backend/static (o frontend/)
  4. Copia de los artefactos finales a una carpeta dist/ (ignorada por git)
"""
import subprocess
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent


def run_step(script_name: str) -> None:
    print(f"→ Ejecutando {script_name}...")
    subprocess.run([sys.executable, str(SCRIPTS_DIR / script_name)], check=True)


def main() -> None:
    print("Build de mi-landing (placeholder, aún sin minificación real).")
    run_step("optimize_images.py")
    run_step("compress_audio.py")
    print("Build terminado.")


if __name__ == "__main__":
    main()
