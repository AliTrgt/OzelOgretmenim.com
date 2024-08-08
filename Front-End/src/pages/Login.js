import React, { useState, useContext } from 'react';
import styled from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';

const Login = () => {
  const { setStep, setUser, setIsLoggedIn} =
    useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Burada login işlemleri yapılabilir
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        username,
        password,
      });
      setUser({
        username: username,
        password: password,
      });

      console.log('samet', response.data);

      setIsLoggedIn(true);
      console.log('Login response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleStep = (step) => {
    setStep(step);
  };

  return (
    <div className={styled.container}>
      <div className={styled['form-container']}>
        <form onSubmit={handleSubmit}>
          <h2>Giriş Yap</h2>
          <p>Eğer bir hesabın yoksa aşşağıdaki linkten kayıt ol</p>
          <Link
            to='/signup'
            className={styled.register}
            onClick={() => {
              handleStep(0);
            }}
          >
            Buradan Kayıt Ol!
          </Link>
          <label htmlFor='username' className={styled['email-label']}>
            Kullanıcı adını gir
          </label>
          <input
            id={styled.email}
            type='username'
            placeholder='Kullanıcı adını gir'
            value={username}
            onChange={handleUsernameChange}
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
