import requests
import random
from geopy.geocoders import Nominatim
from utils import calculate_time_difference
from odr_simulation import get_odr_position, calculate_odr_trip_time

# variables
api_key = 'Qg_RbMu24ib7wN9oPsZRvww6ikkzpvvZHLJ4wpoPp-w'
hl = "lübeck"
bs = "bad schwartau"
sd = "stockelsdorf"
odr_coords = get_odr_position()

# get coordinates for the next stop to a specified location
def get_next_stops(lat_org, long_org):
    url = f"https://transit.hereapi.com/v8/stations?apiKey={api_key}&in={lat_org},{long_org}" # r = 500 m default
    response = requests.get(url)
    json = response.json()
    name_next_station = json['stations'][0]['place']['name']
    coords_next_station = json['stations'][0]['place']['location']
    return {'name_next_station': name_next_station, 'coords_next_station': coords_next_station}


# claculate walk time and distance for an origin-destination pair
def get_walking_time_distance(lat_org, long_org, lat_dest, long_dest):
    url = f"https://router.hereapi.com/v8/routes?apiKey={api_key}&origin={lat_org},{long_org}&destination={lat_dest},{long_dest}&transportMode=pedestrian&return=summary"
    response = requests.get(url)
    json = response.json()
    seconds = json['routes'][0]['sections'][0]['summary']['duration']
    minutes = seconds / 60
    meters = json['routes'][0]['sections'][0]['summary']['length']
    return {'time': minutes, 'distance': meters}

 
# BUS ALTERNATIVE: calculate total trip time (walk time till entry + trip time + walk time from exit)
# TODO: tolerance range for difference
def get_toatal_bus_time_in_min(lat_org, long_org, lat_dest, long_dest, time, plan_pref):
    # query based on planning preference
    url = ""
    if plan_pref == "arriveby":
        url = f"https://transit.router.hereapi.com/v8/routes?apiKey={api_key}&origin={lat_org},{long_org}&destination={lat_dest},{long_dest}&modes=bus&arrivalTime={time}"
    else:
        url = f"https://transit.router.hereapi.com/v8/routes?apiKey={api_key}&origin={lat_org},{long_org}&destination={lat_dest},{long_dest}&modes=bus&departureTime={time}"
    response = requests.get(url)
    json = response.json()
    # claculate time for each section of the trip
    total_diff = 0
    for section in json['routes'][0]['sections']:
        departure_time = section['departure']['time']
        arrival_time = section['arrival']['time']
        time_diff = calculate_time_difference(departure_time, arrival_time)
        total_diff += time_diff
    total_time_minutes = total_diff / 60
    return total_time_minutes


# get location of origin and destionation to detremine ticket level
def get_location(lat, long):
    # get address
    geolocator = Nominatim(user_agent="prototyp-on-demand-ridepooling-bachelorarbeit")
    location = geolocator.reverse(f"{lat}, {long}")
    # extract place
    if "city" in location.raw["address"]:
        return hl
    else: 
        if bs in location.raw["address"]["town"].lower():
            return bs
        else:
            return sd

# determine ticket price depending on places of origin-destination-pair
def determine_ticket_level(place_org, place_dest):
    if (place_org == bs and place_dest == bs) or (place_org == sd and place_dest == sd):
        return "p1"
    elif (place_org == hl and place_dest == hl) or (place_org == bs and place_dest == sd) or (place_org == sd and place_dest == bs):
        return "p2"
    else:
        return "p3"


# get weather
def get_weather_data():
    # TODO: use real data
    return {'weather': random.choice(['good', 'bad']), 'temperature': random.randint(-10, 35)}


# use input to generate routing information for requested trip
def get_routing_information(lat_org, long_org, lat_dest, long_dest, plan_pref, plan_time):
    # 1. Determine ticket level
    place_org = get_location(lat_org, long_org)
    place_dest = get_location(lat_dest, long_dest)
    ticket_level = determine_ticket_level(place_org, place_dest)
    # 2. Determine alternative option (bus)
    # a) odr
    odr_trip_time = calculate_odr_trip_time(lat_org, long_org, lat_dest, long_dest)
    # b) bus
    bus_time = get_toatal_bus_time_in_min(lat_org, long_org, lat_dest, long_dest, plan_time, plan_pref)
    # 3. Determine walking distance (safety)
    next_stop_org = get_next_stops(lat_org, long_org)
    next_stop_dist = get_next_stops(lat_dest, long_dest)
    dist_org_stop = get_walking_time_distance(lat_org, long_org, next_stop_org['coords_next_station']['lat'], next_stop_org['coords_next_station']['lng'])
    dist_dest_stop = get_walking_time_distance(lat_org, long_org, next_stop_dist['coords_next_station']['lat'], next_stop_dist['coords_next_station']['lng'])
    total_walking_distance = dist_org_stop['distance'] + dist_dest_stop['distance']
    # 4. waiting time
    odr_wait_time = calculate_odr_trip_time(lat_org, long_org, next_stop_org['coords_next_station']['lat'], next_stop_org['coords_next_station']['lng'])
    # 5. TODO: weather + temperature --> radius (out-/inside)
    weather_temperature = get_weather_data()
    return {'ticket_level': ticket_level, 'next_stop_org_name': next_stop_org['name_next_station'], 'bus_time': bus_time, 'odr_trip_time': odr_trip_time['time'], 'odr_wait_time': odr_wait_time['time'], 'walking_time_org_stop': dist_org_stop['time'], 'walking_time_dest_stop': dist_dest_stop['time'], 'walking_dist_org_stop': dist_org_stop['distance'], 'walking_dist_dest_stop': dist_dest_stop['distance'], 'total_walking_distance': total_walking_distance, 'weather': weather_temperature['weather'], 'temperature': weather_temperature['temperature']}

# TODO
# get next stop within XX m radius as alternative to reduce price if necessary