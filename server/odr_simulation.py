import json
import random
import requests

# variables
api_key = 'Qg_RbMu24ib7wN9oPsZRvww6ikkzpvvZHLJ4wpoPp-w'

# randomly set locoation of vehicle within operating area
def get_odr_position():
    with open('odr-data.json', 'r', encoding='utf-8') as json_file:
        positions = json.load(json_file)
    odr_position = random.choice(positions)
    return {'lat': odr_position['lat'], 'lng': odr_position['lng']}

def calculate_odr_trip_time(lat_org, long_org, lat_dest, long_dest):
    url = f"https://router.hereapi.com/v8/routes?apiKey={api_key}&origin={lat_org},{long_org}&destination={lat_dest},{long_dest}&transportMode=car&return=summary"
    response = requests.get(url)
    json = response.json()
    seconds = json['routes'][0]['sections'][0]['summary']['duration']
    delay = random.randint(2, 4)
    minutes = (seconds / 60) + delay
    return {'time': minutes}
