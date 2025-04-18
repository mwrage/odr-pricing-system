# price components
ticket_price = {'p1': 2.4, 'p2': 3.4, 'p3': 4.2}
min_surcharge = 1
dynamic_surcharge = 5
factor_shares = {'alternative': 0.46, 'safety': 0.33, 'comfort': 0.21}
distance_threshold = 100
temp_threshold = 5
wait_threshold = 10

# rules system: determine discount or surcharge for each factor
def determine_factor_impact(has_ticket, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature):
    # ticket
    if (has_ticket): 
        ticket = 0
    else:
        ticket = 1
    # quality of alternative
    if (bus_time > lumo_time):
        alternative = 0
    else:
        alternative = 1
    # safety: wlaking distance
    if (walking_distance > distance_threshold):
        safety = 0
    else:
        safety = 1
    # comfort: weather / temperature / radius for detecting out- vs. inside waiting
    #if sum([weather == "bad", temperature < temp_threshold , waiting_time > wait_threshold]) == 2:
    if((waiting_time > wait_threshold) and ((weather == "bad") or (temperature < temp_threshold))):
        comfort = 0
    else:
        comfort = 1
    return {'ticket': ticket, 'alternative': alternative, 'safety': safety, 'comfort': comfort}

# calculate ticket price for trip
def calculate_price(factor_classifications, ticket_level):
    # regular price value for trip
    total_price = ticket_price[ticket_level] + min_surcharge + dynamic_surcharge
    # needs oriented price
    individual_price = (ticket_price[ticket_level] * factor_classifications['ticket']) + min_surcharge + (dynamic_surcharge * factor_classifications['alternative'] * factor_shares['alternative']) + (dynamic_surcharge * factor_classifications['safety'] * factor_shares['safety']) + (dynamic_surcharge * factor_classifications['comfort'] * factor_shares['comfort'])
    # discount due to situational factors
    discount = round(((total_price - individual_price) / total_price), 2) * 100
    temp_ticket_share = ticket_price[ticket_level]
    ticket_share = temp_ticket_share if factor_classifications['ticket'] == 1 else temp_ticket_share * (-1)
    temp_alternative_share = dynamic_surcharge * factor_shares['alternative'] 
    alternative_share = temp_alternative_share if factor_classifications['alternative'] else temp_alternative_share * (-1)
    temp_safety_share = dynamic_surcharge * factor_shares['safety'] 
    safety_share = temp_safety_share if factor_classifications['safety'] else temp_safety_share * (-1)
    temp_comfort_share = dynamic_surcharge * factor_shares['comfort'] 
    comfort_share = temp_comfort_share if factor_classifications['comfort'] else temp_comfort_share * (-1)
    print("TEST")
    return {'total_price': total_price, 'individual_price': individual_price, 'discount': discount, 
            'distance_threshold': distance_threshold, 'temp_threshold': temp_threshold,  'wait_threshold': wait_threshold,
            'ticket_share': round(ticket_share, 2), 'alternative_share': round(alternative_share, 2), 'safety_share': round(safety_share, 2), 'comfort_share': round(comfort_share, 2)}

# calculate ticket price and price components based on request
def get_ticket_price(has_ticket, ticket_level, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature):
    factor_impacts = determine_factor_impact(has_ticket, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature)
    pricing = calculate_price(factor_impacts, ticket_level)
    return pricing


# example: determine_factor_impact(True, 10, 12, 124, 8, "bad", 12)
# Ticket = boolean
# lumo / bus = time in minutes
# walking = distance in meters to + from stop
# waiting = time in minutes
# weather = good / bad --> rainy, etc
# temperature = celcius value