# price components
ticket_price_adult = {'p1': 2.4, 'p2': 3.4, 'p3': 4.2}
ticket_price_child = {'p1': 1.5, 'p2': 2, 'p3': 2.5}
min_surcharge = 1
dynamic_surcharge = 5
factor_shares = {'alternative': 0.45, 'safety': 0.34, 'comfort': 0.21}
distance_threshold = 100
temp_threshold = 5
wait_threshold = 10

# rules system: determine discount or surcharge for each factor
def determine_factor_impact(has_ticket, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature, passengers_data):

    passengers = [
        {'group': 'adult', 'num': passengers_data[0], 'has_ticket': True,  'ticket_required': True},
        {'group': 'adult', 'num': passengers_data[1], 'has_ticket': False, 'ticket_required': True},
        {'group': 'child', 'num': passengers_data[2], 'has_ticket': True,  'ticket_required': True},
        {'group': 'child', 'num': passengers_data[3], 'has_ticket': False, 'ticket_required': True},
        {'group': 'child', 'num': passengers_data[4], 'has_ticket': True,  'ticket_required': False},
    ]

    # ticket
    passengers_tickets = []
    for passenger in passengers:
        if (passenger['has_ticket']):
            for i in range(passenger['num']):
                passengers_tickets.append({'category': passenger['group'], 'ticket_factor': 0})
        else:
            for i in range(passenger['num']):
                passengers_tickets.append({'category': passenger['group'], 'ticket_factor': 1})
    # ticket
    #if (has_ticket): 
    #    ticket = 0
    #else:
    #    ticket = 1

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
    if((waiting_time > wait_threshold) and ((weather == "bad") or (temperature < temp_threshold))):
        comfort = 0
    else:
        comfort = 1
    return {'ticket': passengers_tickets, 'alternative': alternative, 'safety': safety, 'comfort': comfort}

# calculate ticket price for trip
def calculate_price(factor_classifications, ticket_level):

    # regular total price for trip
    total_ticket_prices = 0
    for passenger in factor_classifications['ticket']:
        if (passenger['category'] == "adult"):
            total_ticket_prices = total_ticket_prices + ticket_price_adult[ticket_level]
        else: 
            total_ticket_prices = total_ticket_prices + ticket_price_child[ticket_level]
    total_price = total_ticket_prices + min_surcharge + dynamic_surcharge * len(factor_classifications['ticket'])


    # needs oriented price
    total_needs_ticket_prices = 0
    for passenger in factor_classifications['ticket']:
        if (passenger['category'] == "adult"):
            total_needs_ticket_prices = total_needs_ticket_prices + ticket_price_adult[ticket_level] * passenger['ticket_factor']
        else: 
            total_needs_ticket_prices = total_needs_ticket_prices + ticket_price_child[ticket_level] * passenger['ticket_factor']

    individual_price = total_needs_ticket_prices + min_surcharge + ((dynamic_surcharge * factor_classifications['safety'] * factor_shares['safety']) + (dynamic_surcharge * factor_classifications['comfort'] * factor_shares['comfort']) * len(factor_classifications['ticket']))    
    
    
    # discount due to situational factors
    discount = round(((total_price - individual_price) / total_price), 2) * 100
    
    #temp_ticket_share = ticket_price_adult[ticket_level] # TODO
    #ticket_share = temp_ticket_share if factor_classifications['ticket'] == 1 else temp_ticket_share * (-1)
    ticket_share = total_needs_ticket_prices

    temp_alternative_share = (dynamic_surcharge * factor_shares['alternative'])  * len(factor_classifications['ticket'])
    alternative_share = temp_alternative_share if factor_classifications['alternative'] else temp_alternative_share * (-1)

    temp_safety_share = (dynamic_surcharge * factor_shares['safety'] * len(factor_classifications['ticket'])) 
    safety_share = temp_safety_share if factor_classifications['safety'] else temp_safety_share * (-1)

    temp_comfort_share = (dynamic_surcharge * factor_shares['comfort']) * len(factor_classifications['ticket'])
    comfort_share = temp_comfort_share if factor_classifications['comfort'] else temp_comfort_share * (-1)

    return {'total_price': total_price, 'individual_price': individual_price, 'discount': discount, 
            'distance_threshold': distance_threshold, 'temp_threshold': temp_threshold,  'wait_threshold': wait_threshold,
            'ticket_share': round(ticket_share, 2), 'alternative_share': round(alternative_share, 2), 'safety_share': round(safety_share, 2), 'comfort_share': round(comfort_share, 2)}

# calculate ticket price and price components based on request
def get_ticket_price(has_ticket, ticket_level, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature, passengers_data):
    factor_impacts = determine_factor_impact(has_ticket, lumo_time, bus_time, walking_distance, waiting_time, weather, temperature, passengers_data)
    pricing = calculate_price(factor_impacts, ticket_level)
    return pricing


# example: determine_factor_impact(True, 10, 12, 124, 8, "bad", 12)
# Ticket = boolean
# lumo / bus = time in minutes
# walking = distance in meters to + from stop
# waiting = time in minutes
# weather = good / bad --> rainy, etc
# temperature = celcius value