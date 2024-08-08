import React, { useState, useContext } from 'react';
import styled from './NoticeForm.module.css';
import { Context } from '../context/Context';
import axios from 'axios';


const NoticeForm = () => {
  const {  setAppointment, user,getBasicAuthHeader,setRefresh,refresh } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const notice = {
    title: title,
    description: description,
    price: price,
  };

  const handleAppointment = () => {
    setAppointment(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Burada ilan oluşturma işlemleri yapılabilir
    const headers = {
        'Authorization': getBasicAuthHeader(user.username, user.password),
        'Content-Type': 'application/json',
    };


    await axios.post('http://localhost:8080/notice/create',
        notice,
        {
          headers: headers
        }
      ).then(response => {
        console.log('Notice response:', response.data);
      }).catch(error => {
        console.error('Notice failed:', error);
      })

    setAppointment(false);
    setRefresh(!refresh);
  };

  return (
    <div className={styled['main-container']} onSubmit={handleSubmit}>
      <form className={styled['form-container']}>
        <div className={styled['title']}>
          <label htmlFor='title'>Başlık</label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Lütfen dersiniz için bir başlık girin.'
            required
          />
        </div>
        <div className={styled.description}>
          <label htmlFor='description'>Açıklama</label>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='İlanınızda gözükecek bilgileri yazın...'
            required
          />
        </div>
        <div className={styled.price}>
          <label htmlFor='price'>Saatlik Ücret</label>
          <input
            type='number'
            id='price'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="1"
            placeholder='Lütfen saatlik ücretinizi girin.'
            required
          />
        </div>
        <div className={styled['btn-container']}>
          <button type='submit' className={styled['submit-btn']}>
            Gönder
          </button>
          <button onClick={handleAppointment} className={styled['submit-btn']}>
            Geri Dön
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
