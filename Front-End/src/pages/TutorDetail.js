import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DUMMY_DATA } from './TutorAdvertisement';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer/Footer';
import styled from './TutorDetail.module.css';

const TutorDetail = () => {
  const { id } = useParams();
  const tutor = DUMMY_DATA.find((tutor) => tutor.id === parseInt(id));
  if (!tutor) {
    return <h2>Öğretmen Bulunumadı!!!</h2>;
  }
  return (
    <>
      <Header />
      <div className={styled['main-container']}>
        <div className={styled['content']}>
          <div className={styled['left-side']}>
            <div className={styled['tutor-description']}>
              <h3>{tutor.name} ile ilgili bilgiler</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                porro totam maiores ullam omnis assumenda eos odit, autem
                deserunt veniam dolore nihil aut a reprehenderit minima
                voluptate vitae facilis repellendus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. <br /> <br /> Numquam, quis.
                Mollitia quasi rerum veniam laudantium quo culpa dolorum rem
                voluptate consequatur est dolor ea molestiae doloremque quae,
                nihil aliquid error. <br /> <br /> Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Magni, sequi quam. Libero dolorem
                quibusdam doloribus enim dolorum, culpa ipsam quae repellat et
                sequi perspiciatis veniam dolor tempora dolores quidem
                inventore?
              </p>
            </div>
            <div className={styled['tutor-description']}>
              <h3>{tutor.subject}</h3>
              <p>{tutor.description}</p>
            </div>
            <div className={styled['subject-description']}>
              <h3>Dersle ilgili Bilgiler</h3>
              <p>
                Sevgili öğrenciler, <br /> <br /> İçinde bulunduğunuz eğitim
                dönemi hayatınız için kritik bir öneme sahip!İhtiyaçlarınızı ve
                eksiklerinizi tespit edip, bir yol haritası belirleyebilir
                böylelikle aktif bir eğitim hayatı geçirmenizi sağlayabiliriz.{' '}
                <br />
                <br /> Tüm derslerde başarınızın düşmesine sebep olan akıcı
                okumayama, okuduğunu anlayamama, dikkat ve odaklanma eksikliği
                gibi önemli problemlerinizi, en iyi arkadaşlarımız olan
                kitaplardan yararlanarak çözebiliriz ;) <br /> <br /> Ayrıca
                okula destek çalışmaları ile derslerimizde öğrendiğimiz
                bilgileri özümseyecek ve akademik başarıyı da yakalayacaksınız.
              </p>
            </div>
          </div>
          <div className={styled['right-side']}>
            <div className={styled['img-container']}>
              <img
                src={require('../assests/images/tutor/tutor1.jpg')}
                alt={tutor.name}
              />
            </div>
            <h3>{tutor.name}</h3>
            <div className={styled['tutor-price']}>
              <span className={styled['price-title']}>Saatlik Ücret</span>
              <span className={styled['price']}>{tutor.price}₺</span>
            </div>
            <Link
              to='/tutor-advertisements/1/message'
              className={styled['send-message-btn']}
            >
              <i className='fa-solid fa-comments'></i>
              Mesaj gönder
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorDetail;
