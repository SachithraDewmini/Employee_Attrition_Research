
from flask import Flask, jsonify
from flask_cors import CORS

from routes.dashboard_routes import dashboard_bp

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": ["http://localhost:5173"]
        }
    },
)

app.register_blueprint(dashboard_bp, url_prefix="/api")


@app.route("/")
def home():
    return "HR Retention Intelligence API is running!"


@app.route("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "message": "Employee research dashboard API is running"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
    )
