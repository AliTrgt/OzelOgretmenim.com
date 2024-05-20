import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import './Home.css';
import Button from '../components/common/Button';
import LessonItems from '../components/common/LessonItems/LessonItems';
import Footer from '../components/layout/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
        const response = await axios.get('http://localhost:8080/tutor'); // Correct URL
        console.log(response.data); // Gelen veriyi konsola yazdırın
      setTutors(response.data); // Gelen veriyi state'e kaydedin
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  return (
    <>
      <Header />
      <section className='home-banner'>
        <div className='container'>
          <div className='items-container'>
            <div className='content'>
              <h2>
                <span>En İyi Öğretmenlerden</span> Online Veya Yüz Yüze Dersler
                Alın
              </h2>
              <ul>
                <li>
                  <i className='fa-solid fa-circle-check'></i> Kendiniz veya
                  çocuğunuz için en ideal öğretmeni hemen bul.
                </li>
                <li>
                  <i className='fa-solid fa-circle-check'></i> Alanında uzman
                  eğitmenlerden en iyi dersleri al.
                </li>
              </ul>
              <div className='searchbar-container'>
                <input type='text' placeholder='Hangi dersi almak istersin?' />
                <Button
                  styled={{
                    width: '300px',
                    height: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Öğretmen Bul
                </Button>
              </div>
            </div>
            <div className='image'>
              <img src={require('../assests/images/ozelders.png')} alt='' />
            </div>
          </div>
        </div>
      </section>
      <section className='lessons'>
        <LessonItems />
      </section>
      <section className='quick-tutor-section'>
        <div className='quick-tutor-container'>
          <h2>Alanında Uzman Öğretmenleri Keşfet!</h2>
          <p>
            Özel ders alanında her yıl onbinlerce öğrenci aradığı öğretmeni
            buluyor
          </p>
          <Link to={'/tutor-advertisements'}>
            <Button>Hemen Özel Ders Al</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
