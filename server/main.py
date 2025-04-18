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
    print(data)
    if (data['debug']):
        routing_data = {'ticket_level': "p2", 'next_stop_org_name': "Hauptbahnhof Lübeck", 'bus_time': 5, 'walking_time_org_stop': 4, 'walking_time_dest_stop': 3, 'walking_dist_org_stop': 34, 'walking_dist_dest_stop': 20, 'total_walking_distance': 54, 'weather': "bad", 'temperature': 3}
        pricing_data = {'total_price': 9.4, 'individual_price': 2.05, 'discount': 78,
                        'ticket_share': round(-3.4, 2), 'alternative_share': round(-2.3, 2), 'safety_share': round(-1.65, 2), 'comfort_share': round(1.05, 2)}
        return {'id': 0, 'request': data, 'route': routing_data, 'pricing': pricing_data}
    else:
        routing_data = get_routing_information(data['start'][0], data['start'][1], data['dest'][0], data['dest'][1], data['prebooking'], data['time'])
        pricing_data = get_ticket_price(data['ticket'], routing_data['ticket_level'], routing_data['odr_trip_time'], routing_data['bus_time'], routing_data['total_walking_distance'], routing_data['odr_wait_time'], routing_data['weather'], routing_data['temperature'])
        req_data = {'id': 0, 'request': data, 'route': routing_data, 'pricing': pricing_data}
    print(req_data)
    return jsonify(req_data)




if __name__ == "__main__":
    app.run(debug = True, port = 8080)