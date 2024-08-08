import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer/footer';
import styled from './TutorAdvertisement.module.css';
import MaxMinSlider from '../components/common/MaxMinSlider/MaxMinSlider';
import TutorCard from '../components/TutorCard';
import { Context } from '../context/Context';
import NoticeForm from '../components/NoticeForm';
import axios from 'axios';

const TutorAdvertisement = () => {
  const [city, setCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const {
    priceRange,
    appointment,
    setAppointment,
    lessons,
    setLessons,
    user,
    notices,
    setNotices,
    userDetail,
  } = useContext(Context);

  const handleCheckboxChange = (event) => {
    const gender = event.target.nextSibling.textContent;
    setSelectedGender(gender.toLowerCase());
    if (event.target.checked) {
      setSelectedGender(gender.toLowerCase());
    } else {
      setSelectedGender('');
    }
  };

  const filteredTutors = notices.filter((tutor) => {
    return (
      (city === '' ||
        tutor.tutor.city.toLowerCase().includes(city.toLowerCase())) &&
      (selectedGender === '' || tutor.tutor.gender === selectedGender) &&
      tutor.price >= priceRange[0] &&
      tutor.price <= priceRange[1] &&
      (lessons === '' ||
        tutor.tutor.subject.toLowerCase().includes(lessons.toLowerCase()))
    );
  });
   if (!userDetail || !userDetail.authorities) {
    return <div>Loading...</div>; // Veya herhangi bir yükleme göstergesi
  }

  const toggleAppointment = () => {
    setAppointment(!appointment);
  };
  return (
    <div>
      {!appointment ? (
        <>
          <Header />
          <div className={styled['main-container']}>
            <div className={styled['main-content']}>
              <div className={styled.description}>
                <h2>Özel ders için öğretmen bul.</h2>
                <p>
                  350'den fazla konuda özel dersler için özel öğretmenler bulun.
                  Öğretmenlerinizi, konumlarına, öğrettikleri konuya, verdikleri
                  ders seviyesine <br /> ve dersleri yüz yüze mi yoksa online mı
                  verdiklerine göre seçin.
                </p>
              </div>
              <div className={styled['item-container']}>
                <div className={styled['order-item']}>
                  <label htmlFor='subject'>
                    Hangi dersi öğrenmek istersin ?
                  </label>
                  <input
                    className={styled.dropdown}
                    type='dropdown'
                    id='subject'
                    value={lessons}
                    onChange={(e) => setLessons(e.target.value)}
                    required
                    placeholder='Ders adı giriniz'
                  />
                  <label htmlFor='city'>Hangi şehir ?</label>
                  <input
                    className={styled.dropdown}
                    type='dropdown'
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder='Şehir adı giriniz'
                  />

                  <label>Cinsiyet</label>
                  <div className={styled['radio-container']}>
                    <div className={styled.checkbox}>
                      <input
                        type='checkbox'
                        id='gender'
                        name='gender'
                        value={'erkek'}
                        checked={selectedGender === 'erkek'}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor='erkek' className={styled['radio-label']}>
                        Erkek
                      </label>
                    </div>
                    <div className={styled.checkbox}>
                      <input
                        type='checkbox'
                        id='gender'
                        name='gender'
                        value={'kadın'}
                        checked={selectedGender === 'kadın'}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor='kadın' className={styled['radio-label']}>
                        Kadın
                      </label>
                    </div>
                  </div>

                  <MaxMinSlider />
                  <div className={styled['create-appointment']}>
                    {userDetail.authorities[0] === 'ROLE_TUTOR' && (
                        <button
                          onClick={toggleAppointment}
                          className={styled['create-appointment-btn']}
                        >
                          İlan oluştur
                        </button>
                      )}
                  </div>
                </div>
                <div className={styled.width}>
                  <TutorCard tutors={filteredTutors} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <NoticeForm />
      )}
    </div>
  );
};

export default TutorAdvertisement;
