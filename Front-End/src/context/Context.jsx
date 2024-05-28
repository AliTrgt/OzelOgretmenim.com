// src/MyContext.js
import React, { createContext, useState, useEffect } from 'react';

// İlk olarak context oluşturun
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [appointment, setAppointment] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lessons, setLessons] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: '',
  });




useEffect(() => {

}, [user]);


  // useEffect ile localStorage'dan kullanıcı bilgisini yükleyin
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Kullanıcı bilgisini güncellerken aynı zamanda localStorage'a kaydedin
  const handleSetUser = (user) => {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    }
  };

  return (
    <Context.Provider value={{ step, setStep,  priceRange, setPriceRange, appointment, setAppointment, isLoggedIn, setIsLoggedIn, user, setUser: handleSetUser,lessons,setLessons }}>
      {children}
    </Context.Provider>
  );
};
