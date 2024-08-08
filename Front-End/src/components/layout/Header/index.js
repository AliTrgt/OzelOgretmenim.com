import React from 'react';
import Button from '../../common/Button';
import styled from './header.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import { useContext } from 'react';
import axios from 'axios';

const Header = () => {
  const {
    refresh,
    setRefresh,
    setStep,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUserDetail,
    setUser,
    setAppointment,
    getBasicAuthHeader,
  } = useContext(Context);
  const handleAppointment = () => {
    setRefresh(!refresh);
    setAppointment(false);
  };
  const handleLoggedIn = async () => {
    const headers = {
      Authorization: getBasicAuthHeader(user.username, user.password),
      'Content-Type': 'application/json',
    };

    await axios
      .post('http://localhost:8080/user/logout', {
        headers: headers,
      })
      .then((response) => {
        console.log('Notice response:', response.data);
      })
      .catch((error) => {
        console.error('Notice failed:', error);
      });
      setUserDetail({
        username: '',
        password: '',
        id: '',
        authorities: [],
      });
      setUser({
        username: '',
        password: '',
      })
    setIsLoggedIn(false);
  };

  return (
    <nav className={styled.navbar}>
      <div className={styled['left-side']}>
        <Link to='/' className={styled['logo-title']}>
            Özel Öğretmen<span>.com</span>
        </Link>
        <ul>
          <li>
            <Link className={styled.link} to='/'>
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link
              onClick={handleAppointment}
              className={styled.link}
              to='/tutor-advertisements'
            >
              İlanlar
            </Link>
          </li>
          <li>
            <Link className={styled.link} to='/about-us'>
              Hakkımızda
            </Link>
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className={styled['right-side']}>
          <Link className={styled['user-profile-btn']} to='/edit-profile'>{user.username}</Link>
          <button onClick={handleLoggedIn} className={styled['logout-button']}>
            Çıkış Yap
          </button>
        </div>
      ) : (
        <div className={styled['right-side']}>
          <Button
            styled={{
              backgroundColor: 'white',
              color: '#3898F1',
              border: '1px solid #3898F1',
              marginRight: '5px',
            }}
          >
            <Link className={styled.border} to='/login'>
              Giriş Yap
            </Link>
          </Button>
          <Button styled={{ border: '1px solid #3898F1' }}>
            <Link
              className={styled.fill}
              to='/signup'
              onClick={() => {
                setStep(0);
              }}
            >
              Kayıt Ol
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
