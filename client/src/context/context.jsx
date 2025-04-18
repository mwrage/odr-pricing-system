import { createContext, useEffect, useState } from 'react';
import { getTimePeriod } from '../utils/getTimePeriod';
import { formatRequestedTime } from '../utils/formatRequestTime';


const AppContext = createContext();

const ContextProvider = ({ children }) => {
  // true after inputs were made, validated and request was sent
  const [tripRequested, setTripRequested] = useState(false);
  // while backend calculates the options
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  // passengers input
  const [passengersNum, setPassengersNum] = useState(1);
  // date / time input
  const dates = getTimePeriod()
  const [tripTimeLabels, setTripTimeLabels] = useState([dates[0].label, '20:00']);
  const [tripTime, setTripTime] = useState(formatRequestedTime(tripTimeLabels));
  // starting coordinates
  const [originCoords, setOriginCoords] = useState({
    lat: 53.86793879579819,
    lng: 10.688151930113486,
  });
  // destination coordinates
  const [destinationCoords, setDestinationCoords] = useState({
    lat: 53.86793879579819,
    lng: 10.688151930113486,
  });
  // prebooking
  const [isPreebooked, setIsPreebooked] = useState(false);
  // ticket
  const [hasTicket, setHasTicket] = useState(false);
  // departure
  const [isDeparture, setIsDeparture] = useState(true);
  // options calculated by the backend
  const [requestResponse, setRequestResponse] = useState([]);

  return (
    <AppContext.Provider value={{ tripRequested, setTripRequested, passengersNum, setPassengersNum, tripTime, setTripTime, isDeparture, setIsDeparture,
    requestResponse, setRequestResponse, waitingForResponse, setWaitingForResponse, originCoords, setOriginCoords, destinationCoords, setDestinationCoords,
    isPreebooked, setIsPreebooked, tripTimeLabels, setTripTimeLabels, hasTicket, setHasTicket }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };