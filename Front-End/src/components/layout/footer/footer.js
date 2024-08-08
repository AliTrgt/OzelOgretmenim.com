import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import { useContext } from 'react';

const Footer = () => {
  const { setStep } = useContext(Context);
  return (
    <footer className='footer'>
      <div className='footer-links'>
        <div className='footer-section'>
          <h3>ŞİRKET PROFİLİ</h3>
          <ul>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <Link to='/about-us'>Hakkımızda</Link>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>ÖZEL DERS İŞLEMLERİ</h3>
          <ul>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <a href='#'>Özel Ders Talepleri</a>
            </li>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <a href='#'>Özel Ders Vermek</a>
            </li>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <a href='#'>Özel Ders Almak İsteyenler</a>
            </li>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <a href='#'>Özel Ders Vermeye Başla</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>HESAP İŞLEMLERİ</h3>
          <ul>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <Link to='/login'>Giriş Yap</Link>
            </li>
            <li>
              <i className='fa-solid fa-angle-right'></i>
              <Link
                to='/signup'
                onClick={() => {
                  setStep(0);
                }}
              >
                Ücretsiz Kayıt Ol
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className='divider' />

      <div className='social-icons'>
        <a href='#'>
          <img src={require('./img/icons8-facebook-48.png')} alt='facebook' />
        </a>
        <a href='#'>
          <img src={require('./img/icons8-twitter-48.png')} alt='twitter' />
        </a>
        <a href='#'>
          <img src={require('./img/icons8-instagram-48.png')} alt='instagram' />
        </a>
        <a href='#'>
          <img src={require('./img/icons8-youtube-48.png')} alt='youtube' />
        </a>
        <a href='#'>
          <img src={require('./img/icons8-linkedin-48.png')} alt='linkedin' />
        </a>
        <a href='#'>
          <img src={require('./img/icons8-gmail-48.png')} alt='gmail' />
        </a>
      </div>

      <p className='copyright'>Copyright © 2024 Tüm hakları saklıdır.</p>
    </footer>
  );
};

export default Footer;
