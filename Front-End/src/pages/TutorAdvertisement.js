import React, { useState, useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer/Footer';
import styled from './TutorAdvertisement.module.css';
import MaxMinSlider from '../components/common/MaxMinSlider/MaxMinSlider';
import TutorCard from '../components/TutorCard';
import { Context } from '../context/Context';
import NoticeForm from '../components/NoticeForm';
export const DUMMY_DATA = [
    {
        id: 1,
        name: 'Ayşe Yılmaz',
        gender: 'kadın',
        city: 'İstanbul',
        subject: 'Matematik',
        title: 'Deneyimli Matematik Öğretmeni',
        price: 1000,
        description:
            '15 yıllık tecrübemle her seviyede matematik dersi veriyorum. Öğrencilerimin sınav başarıları garantidir.',
    },
    {
        id: 2,
        name: 'Mehmet Kaya',
        gender: 'erkek',
        city: 'Ankara',
        subject: 'Fizik',
        title: 'Fizik Dalında Uzman Öğretmen',
        price: 200,
        description:
            'Lise ve üniversiteye hazırlık için fizik dersleri veriyorum. Öğrencilerime fiziksel olayları anlama ve problem çözme becerisi kazandırıyorum.',
    },
    {
        id: 3,
        name: 'Elif Demir',
        gender: 'kadın',
        city: 'İzmir',
        subject: 'İngilizce',
        title: 'Anadili İngilizce Öğretmen',
        price: 150,
        description:
            "Yurtdışında uzun yıllar yaşadım ve İngilizce'yi anadil seviyesinde konuşuyorum. Tüm seviyelerde ders veriyorum.",
    },
    {
        id: 4,
        name: 'Ahmet Çelik',
        gender: 'erkek',
        city: 'Bursa',
        subject: 'Kimya',
        title: 'Kimya Öğretmeni',
        price: 120,
        description:
            'Kimya dersinde 10 yıllık tecrübem var. Öğrencilerimin kimya derslerinde yüksek notlar almasını sağlıyorum.',
    },
    {
        id: 5,
        name: 'Zeynep Aydın',
        gender: 'kadın',
        city: 'Antalya',
        subject: 'Tarih',
        title: 'Deneyimli Tarih Öğretmeni',
        price: 500,
        description:
            'Öğrencilerime tarih dersini sevdirerek öğretmeyi hedefliyorum. Tarihi olayları eğlenceli ve anlaşılır bir şekilde anlatıyorum.',
    },
    {
        id: 6,
        name: 'Ali Yıldız',
        gender: 'erkek',
        city: 'Adana',
        subject: 'Biyoloji',
        title: 'Biyoloji Alanında Uzman Öğretmen',
        price: 2000,
        description:
            'Lise ve üniversite hazırlık biyoloji dersleri veriyorum. Biyoloji konularını derinlemesine anlayarak başarılı olmanızı sağlıyorum.',
    },
    {
        id: 7,
        name: 'Fatma Kurt',
        gender: 'kadın',
        city: 'Konya',
        subject: 'Türkçe',
        title: 'Türkçe Öğretmeni',
        price: 700,
        description:
            'Türkçe derslerinde öğrencilerime dil bilgisi ve edebiyat konularında destek oluyorum. Sınavlara hazırlık için özel programlar sunuyorum.',
    },
    {
        id: 8,
        name: 'Murat Şahin',
        gender: 'erkek',
        city: 'Gaziantep',
        subject: 'Coğrafya',
        title: 'Coğrafya Öğretmeni',
        price: 1500,
        description:
            'Coğrafya dersini sevdirmek ve öğrencilerimin coğrafi bilgi seviyesini artırmak için burada bulunuyorum. Derslerimde görsel materyaller kullanıyorum.',
    },
    {
        id: 9,
        name: 'Seda Yüksel',
        gender: 'kadın',
        city: 'Mersin',
        subject: 'Fransızca',
        title: 'Fransızca Öğretmeni',
        price: 300,
        description:
            'Fransızca dilinde her seviyede ders veriyorum. Dil öğrenmeyi eğlenceli hale getirerek öğrencilerimin dili akıcı şekilde konuşmasını sağlıyorum.',
    },
    {
        id: 10,
        name: 'Hasan Koç',
        gender: 'erkek',
        city: 'Samsun',
        subject: 'Bilgisayar Bilimleri',
        title: 'Bilgisayar Bilimleri Öğretmeni',
        price: 1000,
        description:
            'Programlama ve bilgisayar bilimleri konusunda uzmanım. Öğrencilerime yazılım geliştirme, algoritma ve veri yapıları konularında eğitim veriyorum.',
    },
];




const TutorAdvertisement = () => {
    const [city, setCity] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const { priceRange, appointment,setAppointment,lessons,setLessons  } = useContext(Context);

    const handleCheckboxChange = (event) => {
        const gender = event.target.nextSibling.textContent;
        setSelectedGender(gender.toLowerCase());
        if (event.target.checked) {
            setSelectedGender(gender.toLowerCase());
        } else {
            setSelectedGender('');
        }
    };


    const filteredTutors = DUMMY_DATA.filter((tutor) => {
        return (
            (city === '' || tutor.city.toLowerCase().includes(city.toLowerCase())) &&
            (selectedGender === '' || tutor.gender === selectedGender) &&
            (tutor.price >= priceRange[0] && tutor.price <= priceRange[1]) &&
            (lessons === '' || tutor.subject.toLowerCase().includes(lessons.toLowerCase()))
        );
    });

    const toggleAppointment = () => {
        setAppointment(!appointment);
    }

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
                    350'den fazla konuda özel dersler için özel öğretmenler
                    bulun. Öğretmenlerinizi, konumlarına, öğrettikleri konuya,
                    verdikleri ders seviyesine <br /> ve dersleri yüz yüze mi
                    yoksa online mı verdiklerine göre seçin.
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
                        <label
                          htmlFor='erkek'
                          className={styled['radio-label']}
                        >
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
                        <label
                          htmlFor='kadın'
                          className={styled['radio-label']}
                        >
                          Kadın
                        </label>
                      </div>
                    </div>

                    <MaxMinSlider />
                    <div className={styled['create-appointment']}>
                      <button onClick={toggleAppointment} className={styled['create-appointment-btn']}>
                        İlan oluştur
                      </button>
                    </div>
                  </div>
                  <div>
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
