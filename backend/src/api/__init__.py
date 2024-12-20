# api/__init__.py

from flask import Flask
from .routes import api  # Import the blueprint from routes.py


def create_app():
    app = Flask(__name__)

    # Optionally, load configuration settings
    # Example: load config from a config.py file
    app.config.from_object('config.Config')

    # Register the API blueprint with the '/api' prefix
    app.register_blueprint(api, url_prefix='/api')

    return app
