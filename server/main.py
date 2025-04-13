from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origin = '*')

@app.route("/api/users", methods = ['GET'])
def users():
    return jsonify(
        {
            "testUser": {
                'ticket': 'true',
                'defaultLocation': {'lat': '53.8680752133924', 'lng': '10.686651454571164'},
            }
        }
    )

if __name__ == "__main__":
    app.run(debug = True, port = 8080)