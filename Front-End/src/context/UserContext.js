import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from './Context';

// Yeni context oluşturun
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const {user,getBasicAuthHeader}= useContext(Context);
    const [tutorDetail, setTutorDetail] = useState({});//[1]
    const [studentDetail, setStudentDetail] = useState({});//[1]
useEffect(() => {
    const fetchUserDetailInfo = async () => {
      try {
        const headers = {
          'Authorization': getBasicAuthHeader(user.username, user.password),
          'Content-Type': 'application/json',
        };

        const response = await axios.get('http://localhost:8080/user/userinfo', {
          headers: headers,
        });
        console.log("benim logummmmmmm",response.data);
        if(response.data.user.authorities[0] == 'ROLE_TUTOR'){
            setTutorDetail({
                id: response.data.id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                phone: response.data.phone,
                city: response.data.city,
            });
            console.log("tutor",tutorDetail);
        }else {
            setStudentDetail({
                id: response.data.id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                phone: response.data.phone,
                city: response.data.city,
            });
        }

      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }


    };
fetchUserDetailInfo();
}, [user]);

  return (
    <UserContext.Provider
      value={{
        tutorDetail,
        setTutorDetail,
        studentDetail,
        setStudentDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
