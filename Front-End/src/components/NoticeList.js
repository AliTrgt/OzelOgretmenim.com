import React, { useEffect, useContext, useState } from 'react';
import styled from './NoticeList.module.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Context } from '../context/Context';

const NoticeList = () => {
  const { getBasicAuthHeader, user, refresh, setRefresh } = useContext(Context);
  const { tutorDetail } = useContext(UserContext);
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const headers = {
        Authorization: getBasicAuthHeader(user.username, user.password),
        'Content-Type': 'application/json',
      };
      const response = await axios.get(
        `http://localhost:8080/notice/myNotices/${tutorDetail.id}`,
        {
          headers: headers,
        }
      );
      console.log('Notices:', response.data);
      setNotices(response.data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [refresh]);

  const handleDelete = async (noticeId) => {
    try {
      const headers = {
        Authorization: getBasicAuthHeader(user.username, user.password),
        'Content-Type': 'application/json',
      };
      await axios.delete(`http://localhost:8080/notice/delete/${noticeId}`, {
        headers: headers,
      });
      // Update notices state by filtering out the deleted notice
      setNotices(notices.filter((notice) => notice.id !== noticeId));
      console.log('Notice deleted successfully');
    } catch (error) {
      console.error('Failed to delete notice:', error);
    }
  };

  return notices.map((notice) => (
    <div key={notice.id} className={styled['notice-container']}>
      <h3>{notice.title}</h3>
      <p className={styled.price}>
        <span>{notice.price}</span>₺
      </p>
      <p>
        <i className='fa-solid fa-graduation-cap'></i>
        {notice.tutor.subject}
      </p>
      <p>
        <i className='fa-solid fa-location-dot'></i>
        {notice.tutor.city}
      </p>
      <p className={styled['description']}>{notice.description}</p>
      <button
        onClick={() => handleDelete(notice.id)}
        className={styled['remove-btn']}
      >
        Kaldir
      </button>
    </div>
  ));
};

export default NoticeList;
