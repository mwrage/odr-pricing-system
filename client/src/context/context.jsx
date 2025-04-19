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
  const [passengersNum, setPassengersNum] = useState([1,0,0,0,0]);
  // date / time input
  const dates = getTimePeriod()
  const [tripTimeLabels, setTripTimeLabels] = useState([dates[0].label, '20:00']);
  const [tripTime, setTripTime] = useState(formatRequestedTime(tripTimeLabels));
  // starting coordinates
  const [originName, setOriginName] = useState("")
  const [originCoords, setOriginCoords] = useState({
    lat: 53.86793879579819,
    lng: 10.688151930113486,
  });
  // destination coordinates
  const [destinationName, setDestinationName] = useState("")
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
  // map interaction
  const [chooseOnMap, setChooseOnMap] = useState(false)
  const [chooseStart, setChooseStart] = useState(false)
  // results
  const [results, setResults] = useState([]);
  //
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isValidRequest, setIsValidRequest] = useState(true);

  useEffect(() => {
    console.log(requestResponse)
  }, [requestResponse]);

  return (
    <AppContext.Provider value={{ tripRequested, setTripRequested, passengersNum, setPassengersNum, tripTime, setTripTime, isDeparture, setIsDeparture, 
      chooseStart, setChooseStart,requestResponse, setRequestResponse, waitingForResponse, setWaitingForResponse, originCoords, setOriginCoords, 
      destinationCoords, setDestinationCoords, isPreebooked, setIsPreebooked, tripTimeLabels, setTripTimeLabels, hasTicket, setHasTicket, chooseOnMap, setChooseOnMap, 
      originName, setOriginName, destinationName, setDestinationName, results, setResults, isButtonDisabled, setIsButtonDisabled, isValidRequest, setIsValidRequest }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };