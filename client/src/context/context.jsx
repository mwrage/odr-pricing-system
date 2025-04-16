import React, { createContext, useState } from 'react';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [tripRequested, setTripRequested] = useState(false);
  const [passengersNum, setPassengersNum] = useState(1);
  const [tripTime, setTripTime] = useState("Heute");
  const [requestResponse, setRequestResponse] = useState([]);

  return (
    <AppContext.Provider value={{ tripRequested, setTripRequested, passengersNum, setPassengersNum, tripTime, setTripTime, requestResponse, setRequestResponse }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };