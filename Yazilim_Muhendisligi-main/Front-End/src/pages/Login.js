import React, { useState, useContext } from 'react';
import styled from './Login.module.css';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Login = () => {
const { setStep } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada login işlemleri yapılabilir

    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/');
  };
  const handleStep = (step) => {
    setStep(step);
  }

  return (
    <div className={styled.container}>
      <div className={styled['form-container']}>
        <form onSubmit={handleSubmit}>
          <h2>Giriş Yap</h2>
          <p>Eğer bir hesabın yoksa aşşağıdaki linkten kayıt ol</p>
          <Link to='/signup' className={styled.register} onClick={() => {handleStep(0)}}>
            Buradan Kayıt Ol!
          </Link>
          <label htmlFor='email' className={styled['email-label']}>
            E posta
          </label>
          <input
            id={styled.email}
            type='email'
            placeholder='E posta adresini gir'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor='password' className={styled['password-label']}>
            Şifre
          </label>
          <input
            id={styled.password}
            type='password'
            placeholder='Şifreni gir'
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type='submit' className={styled.button}>
              Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
