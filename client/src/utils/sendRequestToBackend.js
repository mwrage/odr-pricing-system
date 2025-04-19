export async function sendRequestToBackend ({setTripRequested, setRequestResponse, setWaitingForResponse, isPreebooked, hasTicket, originCoords, destinationCoords, isDeparture, tripTime, scenarioParam}) {

    if (scenarioParam !== null) {
      const scenarioID = parseInt(scenarioParam);
      const response = await fetch('/study-scenarios.json');
      const json = await response.json();
      const scenario = json.find(s => s.scenarioID === scenarioID);

      if (scenario) {
        setRequestResponse([scenario.options])
        setWaitingForResponse(false)
        setTripRequested(true)
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
      }
    
      console.log(data.dest[0])
      const devURL = "http://localhost:8080/api/process-request"
      const productionURL = "https://odr-pricing-system.onrender.com/api/process-request"
      const response = await fetch(devURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      const result = await response.json();
      setRequestResponse([result])
      setWaitingForResponse(false)
      setTripRequested(true)
    }
  };