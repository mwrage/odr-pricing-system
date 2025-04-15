# price components
ticket_price = {'p1': 2.4, 'p2': 3.4, 'p3': 4.2}
min_surcharge = 1
dynamic_surcharge = 5
factor_shares = {'alternative': 0.46, 'safety': 0.33, 'comfort': 0.21}

# rules system: determine discount or surcharge for each factor
def determine_factor_impact(has_ticket, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature):
    # TODO
    dist_threshold = 100
    temp_threshold = 5
    wait_threshold = 10
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
    if (walking_distance > dist_threshold):
        safety = 0
    else:
        safety = 1
    # comfort: weather / temperature / radius for detecting out- vs. inside waiting
    if sum([weather == "bad", temperature < temp_threshold , waiting_time > wait_threshold]) == 2:
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
    discount = ((total_price - individual_price) / total_price)
    return {'total_price': total_price, 'individual_price': individual_price, 'discount': discount}



# example: determine_factor_impact(True, 10, 12, 124, 8, "bad", 12)
# Ticket = boolean
# lumo / bus = time in minutes
# walking = distance in meters to + from stop
# waiting = time in minutes
# weather = good / bad --> rainy, etc
# temperature = celcius value