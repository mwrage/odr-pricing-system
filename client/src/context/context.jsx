import React, { createContext, useState } from 'react';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [tripRequested, setTripRequested] = useState(false);
  const [passengersNum, setPassengersNum] = useState(1);

  return (
    <AppContext.Provider value={{ tripRequested, setTripRequested, passengersNum, setPassengersNum }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };