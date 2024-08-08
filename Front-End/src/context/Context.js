import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [appointment, setAppointment] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lessons, setLessons] = useState('');
  const [userDetail, setUserDetail] = useState({
    username: '',
    password: '',
    id: 0,
    authorities: [],
  });
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [notices, setNotices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function getBasicAuthHeader(username, password) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // btoa() encodes to base64
    return `Basic ${encodedCredentials}`;
  }

  // Load user from localStorage on component mount
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedLoggedIn = localStorage.getItem('isLoggedIn');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedLoggedIn) {
        setIsLoggedIn(JSON.parse(storedLoggedIn));
      }
    }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const headers = {
          Authorization: getBasicAuthHeader(user.username, user.password),
          'Content-Type': 'application/json',
        };

        const response = await axios.get('http://localhost:8080/user/getInfo', {
          headers: headers,
        });
        console.log('benim logum', response.data);
        setUserDetail({
          username: response.data.username,
          password: response.data.password,
          id: response.data.id,
          authorities: response.data.authorities,
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (isLoggedIn && user) {
      fetchUserInfo();
    }
    console.log('user', user);
  }, [user,isLoggedIn]);

  // Update user state and localStorage
  const handleSetUser = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      setUser({});
      setIsLoggedIn(false);
    }
    setUser(userData);
  };

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notice');
      setNotices(response.data);
    } catch (error) {
      console.error('Notices fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [refresh]);

  return (
    <Context.Provider
      value={{
        refresh,
        setRefresh,
        userDetail,
        setUserDetail,
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
