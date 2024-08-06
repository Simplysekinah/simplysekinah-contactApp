import React, { useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <AppContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
