import requests
from utils import calculate_time_difference
from geopy.geocoders import Nominatim

api_key = 'Qg_RbMu24ib7wN9oPsZRvww6ikkzpvvZHLJ4wpoPp-w'
hl = "lübeck"
bs = "bad schwartau"
sd = "stockelsdorf"

# get coordinates for the next stop to a specified location
def get_next_stops(lat_org, long_org):
    url = f"https://transit.hereapi.com/v8/stations?apiKey={api_key}&in={lat_org},{long_org}" # r = 500 m default
    response = requests.get(url)
    json = response.json()
    coords_next_station = json['stations'][0]['location']
    return coords_next_station


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

# get next stop within XX m radius as alternative to reduce price if necessary