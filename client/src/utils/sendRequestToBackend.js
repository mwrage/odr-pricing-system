export async function sendRequestToBackend ({setTripRequested, setRequestResponse, setWaitingForResponse, isPreebooked, hasTicket, originCoords, destinationCoords, isDeparture, tripTime}) {
    const data = {
      debug: false,
      prebooking: isPreebooked,
      ticket: hasTicket,
      start: originCoords,
      dest: destinationCoords,
      departure: isDeparture,
      time: tripTime,
    }
  
    const response = await fetch("http://localhost:8080/api/process-request", {
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
  };