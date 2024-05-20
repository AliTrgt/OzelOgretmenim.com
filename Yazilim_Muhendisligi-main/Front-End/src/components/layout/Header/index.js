import React from 'react';
import Button from '../../common/Button';
import styled from './header.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import { useContext } from 'react';


const Header = () => {
    const { setStep } = useContext(Context);
    const handleStep = (step) => {
        setStep(step);
    };

  return (
    <nav className={styled.navbar}>
      <div className={styled['left-side']}>
        <Link to='/' className={styled['logo-title']}>
          Özel Ders
        </Link>
        <ul>
          <li>
            <Link className={styled.link} to='/'>
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link className={styled.link} to='/tutor-advertisements'>
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
    </nav>
  );
};

export default Header;
