import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer/footer';
import styled from './TutorDetail.module.css';
import { Context } from '../context/Context';
const TutorDetail = () => {
  const { notices, setNotices } = useContext(Context);
  const { id } = useParams();
  const handleEmailClick = () => {
    const email = `${notice.tutor.email}`;
    window.location.href = `mailto:${email}`;
  }

  const notice = notices.find((tutor) => tutor.id === parseInt(id));
  if (!notice) {
    return <h2>Öğretmen Bulunumadı!!!</h2>;
  }
  return (
    <>
      <Header />
      <div className={styled['main-container']}>
        <div className={styled['content']}>
          <div className={styled['left-side']}>
            <div className={styled['tutor-description']}>
              <h3>
                {notice.tutor.firstName} {notice.tutor.lastName} İle İlgili
                bilgiler
              </h3>
              <p>{notice.tutor.description}</p>
            </div>
            <div className={styled['tutor-description']}>
              <h3>{notice.tutor.subject}</h3>
              <p>{notice.description}</p>
            </div>
          </div>
          <div className={styled['right-side']}>
            {/* <div className={styled['img-container']}>
              <img
                src={require('../assests/images/tutor/tutor1.jpg')}
                alt={notice.tutor.firstName}
              />
            </div> */}
            <h3>
              {notice.tutor.firstName} {notice.tutor.lastName}
            </h3>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Ders</span>
              <span className={styled['subject']}>{notice.tutor.subject}</span>
            </div>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Email</span>
              <span className={styled['price']}>{notice.tutor.email}</span>
            </div>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Cinsiyet</span>
              <span className={styled['gender']}>{notice.tutor.gender}</span>
            </div>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Şehir</span>
              <span className={styled['price']}>{notice.tutor.city}</span>
            </div>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Telefon</span>
              <span className={styled['price']}>
                {notice.tutor.telephoneNumber}
              </span>
            </div>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Saatlik Ücret</span>
              <span className={styled['price']}>{notice.price}₺</span>
            </div>

            <button
              onClick={handleEmailClick}
              className={styled['send-message-btn']}
            >
              <i className='fa-solid fa-envelope'></i>
              İletişime Geç
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorDetail;
