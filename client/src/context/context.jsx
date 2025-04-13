import React, { createContext, useState } from 'react';

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [tripRequested, setTripRequested] = useState(false);

  return (
    <AppContext.Provider value={{ tripRequested, setTripRequested }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };