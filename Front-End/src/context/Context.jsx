// src/MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
    authoroties: ['ROLE_USER'],
  });
  const [notices, setNotices] = useState([]);

  function getBasicAuthHeader(username, password) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // btoa() encodes to base64
    return `Basic ${encodedCredentials}`;
  }

  // useEffect ile localStorage'dan kullanıcı bilgisini yükleyin
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const headers = {
          'Authorization': getBasicAuthHeader(user.username, user.password),
          'Content-Type': 'application/json',
        };

        const response = await axios.get('http://localhost:8080/user/getInfo', {
          headers: headers,
        });

        setUser({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          authorities: response.data.authorities,
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
    console.log('user', user);
  }, [isLoggedIn, user]);

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
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/notice');
        setNotices(response.data);
      } catch (error) {
        console.error('Notices fetch failed:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <Context.Provider
      value={{
        step,
        setStep,
        priceRange,
        setPriceRange,
        appointment,
        setAppointment,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser: handleSetUser,
        lessons,
        setLessons,
        getBasicAuthHeader,
        notices,
        setNotices,
      }}
    >
      {children}
    </Context.Provider>
  );
};
