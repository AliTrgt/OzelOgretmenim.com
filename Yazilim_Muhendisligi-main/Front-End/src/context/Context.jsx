// src/MyContext.js
import React, { createContext, useState } from 'react';

// İlk olarak context oluşturun
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <Context.Provider value={{ step, setStep, priceRange, setPriceRange }}>
      {children}
    </Context.Provider>
  );
};
