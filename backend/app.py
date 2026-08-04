"""
Punto de entrada de la aplicación Flask.

Uso:
    python app.py
    # o bien, con el CLI de Flask:
    flask --app app run --debug
"""
import os
from flask import Flask

from config import config_by_name


def create_app(env: str | None = None) -> Flask:
    """Application factory: crea y configura la instancia de Flask."""
    env = env or os.environ.get("FLASK_ENV", "development")

    app = Flask(__name__)
    app.config.from_object(config_by_name.get(env, config_by_name["development"]))

    # Blueprints
    from routes.home import home_bp
    from routes.api import api_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(api_bp, url_prefix="/api")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"], port=5000)
