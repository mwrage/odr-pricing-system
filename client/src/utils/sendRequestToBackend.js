export async function sendRequestToBackend ({setTripRequested, setRequestResponse, setWaitingForResponse, isPreebooked, hasTicket, originCoords, destinationCoords, isDeparture, tripTime, scenarioParam, passengersNum, setHasTicket, setPassengersNum}) {

    if (scenarioParam !== null) {
      const scenarioID = parseInt(scenarioParam);
      const response = await fetch('/study-scenarios.json');
      const json = await response.json();
      const scenario = json.find(s => s.scenarioID === scenarioID);

      if (scenario) {
        setRequestResponse([scenario.options])
        setTimeout(() => {
          setWaitingForResponse(false)
          setTripRequested(true)
        }, 3000);
      } else {
        console.warn('Szenario nicht gefunden');
      }

    } else {

      const data = {
        debug: false,
        prebooking: isPreebooked,
        ticket: hasTicket,
        start: originCoords,
        dest: destinationCoords,
        departure: isDeparture,
        time: tripTime,
        passengers: passengersNum
      }

      const devURL = "http://localhost:8080/api/process-request"
      const productionURL = "https://odr-pricing-system.onrender.com/api/process-request"
      try {
        const response = await fetch(productionURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      
        // http status
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} ${response.statusText} - ${errorText}`);
        }
      
        let result = "";
        try {
          result = await response.json();
        } catch (parseError) {
          throw new Error("Antwort konnte nicht als JSON gelesen werden: " + parseError.message);
        }
      
        if (result.error) {
          throw new Error(`API-Fehler: ${result.error}`);
        }
        setRequestResponse([result])
      } catch (error) {
        const routing_data = {'status': 600, 'ticket_level': "p1", 'next_stop_org_name': "Nicht gefunden", 'bus_time': "Nicht gefunden", 'odr_trip_time': 0, 'odr_wait_time': 0, 'walking_time_org_stop': 0, 'walking_time_dest_stop': 0, 'walking_dist_org_stop': 0, 'walking_dist_dest_stop': 0, 'total_walking_distance': 0, 'weather': "Nicht gefunden", 'temperature': 0}
        const pricing_data = {'total_price': 0, 'individual_price': 0, 'discount': 0, 'distance_threshold': 0, 'temp_threshold': 0,  'wait_threshold': 0, 'ticket_share': 0, 'alternative_share': 0, 'safety_share': 0, 'comfort_share': 0}
        const res = [{'id': 0, 'request': data, 'route': routing_data, 'pricing': pricing_data}]
        setRequestResponse([res])
        console.error("Ein Fehler ist aufgetreten:", error.message);
      }
      setWaitingForResponse(false)
      setTripRequested(true)
    }
  };