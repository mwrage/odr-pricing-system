from flask import Flask, jsonify, request
from flask_cors import CORS
from pricing import determine_factor_impact, calculate_price
from routing import get_location, determine_ticket_level

app = Flask(__name__)
CORS(app)

@app.route("/api/test", methods = ['GET'])
def users():
    return jsonify(
        {
            "testUser": {
                'ticket': 'true',
                'defaultLocation': {'lat': '53.8680752133924', 'lng': '10.686651454571164'},
            }
        }
    )

@app.route("/api/process-request", methods = ['POST'])
def process_trip_request():
    data = request.get_json()
    print(data)
    return jsonify({"test": "test"})





if __name__ == "__main__":
    app.run(debug = True, port = 8080)