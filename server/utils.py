from datetime import datetime

# calculate time difference
def calculate_time_difference(departure_time, arrival_time):
    departure = datetime.fromisoformat(departure_time)
    arrival = datetime.fromisoformat(arrival_time)
    return (arrival - departure).total_seconds()

# calculate time difference
def calculate_time_difference(departure_time, arrival_time):
    departure = datetime.fromisoformat(departure_time)
    arrival = datetime.fromisoformat(arrival_time)
    return (arrival - departure).total_seconds()
