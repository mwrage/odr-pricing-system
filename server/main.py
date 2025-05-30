import random
import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from pricing import get_ticket_price
from routing import get_routing_information, get_weather_data

app = Flask(__name__)
CORS(app)

client_folder = os.path.join(os.getcwd(), "..", "client")
dist_folder = os.path.join(client_folder, "dist")

# Server static files from the "dist" folder unter the "client" dir
@app.route("/", defaults = {"filename": ""})
@app.route("/<path:filename>")
def index(filename): 
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

# api routes
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

@app.route("/api/process-request", methods = ['GET', 'POST'])
def process_trip_request():
    data = request.get_json()

    if (data['debug']):
        req_data_arr = []
        routing_data = {'status': 200, 'ticket_level': "p2", 'next_stop_org_name': "Hauptbahnhof Lübeck", 'bus_time': 5, 'odr_trip_time': 12, 'odr_wait_time': 12, 
                        'walking_time_org_stop': 4, 'walking_time_dest_stop': 3, 'walking_dist_org_stop': 34, 'walking_dist_dest_stop': 20, 'total_walking_distance': 54, 
                        'weather': "bad", 'temperature': 3, 'condition': "10n"}
        pricing_data = {'total_price': 9.4, 'individual_price': 2.05, 'discount': 78,
                        'distance_threshold': 100, 'temp_threshold': 5,  'wait_threshold': 10,
                        'ticket_share': round(-3.4, 2), 'alternative_share': round(-2.3, 2), 'safety_share': round(1.65, 2), 'comfort_share': round(-1.05, 2)}
        option_data = {'id': 0, 'request': data, 'route': routing_data, 'pricing': pricing_data}
        req_data_arr.append(option_data)
        return jsonify(req_data_arr)
    else:
        options_num = random.randint(1, 3)
        req_data_arr = []
        seen_prices = set()
        for i in range(options_num):
            routing_data = get_routing_information(data['start'][0], data['start'][1], data['dest'][0], data['dest'][1], data['prebooking'], data['time'])

            if (routing_data['status'] == 200):
                pricing_data = get_ticket_price(data['ticket'], routing_data['ticket_level'], routing_data['odr_trip_time'], routing_data['bus_time'], routing_data['total_walking_distance'], routing_data['odr_wait_time'], routing_data['weather'], routing_data['temperature'], data['passengers'])
            else: 
                pricing_data = {'total_price': 0, 'individual_price': 0, 'discount': 0, 'distance_threshold': 0, 'temp_threshold': 0,  'wait_threshold': 0, 'ticket_share': 0, 'alternative_share': 0, 'safety_share': 0, 'comfort_share': 0}
            option_data = {'id': i, 'request': data, 'route': routing_data, 'pricing': pricing_data}
            if pricing_data['individual_price'] not in seen_prices:
                seen_prices.add(pricing_data['individual_price'])
                req_data_arr.append(option_data)

        return jsonify(req_data_arr)




if __name__ == "__main__":
    app.run(debug = False, port = 8080)