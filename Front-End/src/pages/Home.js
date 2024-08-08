import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/layout/Header';
import './Home.css';
import Button from '../components/common/Button';
import LessonItems from '../components/common/LessonItems/LessonItems';
import Footer from '../components/layout/Footer/footer';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';




const Home = () => {
    const {tutorDetail, setTutorDetail, studentDetail, setStudentDetail} = useContext(UserContext);

    const navigate = useNavigate();
    const { lessons, setLessons,setAppointment } = useContext(Context);
    const handleLesson = (e) => {
        setLessons(e.target.value);
    }
    const filterLesson = () => {
        navigate("/tutor-advertisements");
        setAppointment(false);
    }

    const tutorAdvertisementPage = () => {
        navigate("/tutor-advertisements");
    }

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
                                <input type='text' placeholder='Hangi dersi almak istersin?' value={lessons} onChange={handleLesson} />
                                <Button
                                    onClick={filterLesson}
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
                            <img src={require('../assests/images/ozelders.png')} alt="" />
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
                    <Button onClick={tutorAdvertisementPage}>Hemen Özel Ders Al</Button>
                </div>
            </section>
            < Footer />
        </>
    );
};

export default Home;
