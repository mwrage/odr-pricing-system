from flask import Flask, jsonify, request
from flask_cors import CORS
from pricing import get_ticket_price
from routing import get_routing_information

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
    routing_data = get_routing_information(data['start']['lat'], data['start']['lng'], data['dest']['lat'], data['dest']['lng'], data['prebooking'], data['time'])
    pricing_data = get_ticket_price(data['ticket'], routing_data['ticket_level'], 10, routing_data['bus_time'], routing_data['total_walking_distance'], 10, routing_data['weather'], routing_data['temperature'])
    req_data = {'id': 0, 'request': data, 'route': routing_data, 'pricing': pricing_data}
    return jsonify(req_data)




if __name__ == "__main__":
    app.run(debug = True, port = 8080)