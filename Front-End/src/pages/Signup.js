import React, { useContext, useState } from 'react';
import styled from './SignUp.module.css';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const { step, setStep } = useContext(Context);

  return (
    <div className={styled['main-container']}>
      {step === 0 && (
        <>
          <div className={styled.box}>
            <h2>Özel Ders Vermek İstiyorum</h2>
            <p>Uzman olduğum alanda ders vermek istiyorum.</p>
            <button className={styled.button} onClick={() => setStep(1)}>
              Özel Ders Vermeye Başla
            </button>
          </div>
          <div className={styled.box}>
            <h2>Özel Ders Almak İstiyorum</h2>
            <p>İhtiyaçlarına en uygun öğretmenlerle tanışın.</p>
            <button className={styled.button} onClick={() => setStep(2)}>
              Özel Ders Almaya Başla
            </button>
          </div>
        </>
      )}
      {step === 1 && <TeacherForm />}
      {step === 2 && <StudentForm />}
    </div>
  );
};

const TeacherForm = () => {
  const { setStep, setIsLoggedIn, setUser } = useContext(Context);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();
  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro totam maiores ullam omnis assumenda eos odit, autem deserunt veniam dolore nihil aut a reprehenderit minima voluptate vitae facilis repellendus.';
  const image = '';
  const handleCheckboxChange = (event) => {
    const gender = event.target.nextSibling.textContent;
    setSelectedGender(gender.toLowerCase());
    if (event.target.checked) {
      setSelectedGender(gender.toLowerCase());
    } else {
      setSelectedGender('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }

    const Tutorİnfo = {
      firstName: name,
      lastName: surname,
      subject: subject,
      telephoneNumber: phone,
      email: email,
      image: image,
      description: description,
      gender: selectedGender,
      city: city,
      user: {
        username: userName,
        password: password,
        authorities: ['ROLE_TUTOR'],
      },
    };

    try {
      const userResponse = await axios.post(
        'http://localhost:8080/tutor/register',
        Tutorİnfo
      );
      console.log('Register response:', userResponse.data);
      setIsLoggedIn(true);
      setUser({
        username: userName,
        password: password,
      });
      navigate('/');
    } catch (error) {
      console.error('Register failed:', error);
    }
    // Backend'e veri gönder
  };
  const handleStep = (step) => {
    setStep(step);
  };

  return (
    <form className={styled.formContainer} onSubmit={handleSubmit}>
      <label htmlFor='name'>Adınız</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor='surname'>Soyadınız</label>
      <input
        type='text'
        id='surname'
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />

      <label htmlFor='email'>Email Adresiniz</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor='phone'>Telefon Numaranız</label>
      <input
        type='tel'
        id='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <label htmlFor='city'>İl</label>
      <input
        type='text'
        id='city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <label htmlFor='subject'>Ders</label>
      <input
        type='text'
        id='subject'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <label htmlFor='username'>Kullanıcı Adı</label>
      <input
        type='text'
        id='username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <label>Cinsiyet</label>
      <div className={styled['radio-container']}>
        <div className={styled.checkbox}>
          <input
            type='checkbox'
            id='erkek'
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
            id='kadın'
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

      <label htmlFor='password'>Şifre</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor='confirmPassword'>Şifre (Tekrar)</label>
      <input
        type='password'
        id='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type='submit' className={styled.button}>
        Profili Oluştur
      </button>
      <button
        type='button'
        className={styled.button}
        onClick={() => {
          handleStep(0);
        }}
      >
        Geri Dön
      </button>
    </form>
  );
};

const StudentForm = () => {
  const { setStep, setIsLoggedIn, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCheckboxChange = (event) => {
    const gender = event.target.nextSibling.textContent;
    setSelectedGender(gender.toLowerCase());
    if (event.target.checked) {
      setSelectedGender(gender.toLowerCase());
    } else {
      setSelectedGender('');
    }
  };
  const Studentİnfo = {
    firstName: name,
    lastName: surname,
    email: email,
    gender: selectedGender,
    city: city,
    user: {
      username: userName,
      password: password,
      authorities: ['ROLE_STUDENT'],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }
    // Backend'e veri gönder
    try {
      const userResponse = await axios.post(
        'http://localhost:8080/student/create',
        Studentİnfo
      );
      console.log('Register response:', userResponse.data);
      setIsLoggedIn(true);
      setUser({
        username: userName,
        password: password,
      });
      navigate('/');
    } catch (error) {
      console.error('Register failed:', error);
    }
  };
  const handleStep = (step) => {
    setStep(step);
  };

  return (
    <form className={styled.formContainer} onSubmit={handleSubmit}>
      <label htmlFor='name'>Adınız</label>
      <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor='surname'>Soyadınız</label>
      <input
        type='text'
        id='surname'
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />

      <label htmlFor='email'>Email Adresiniz</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor='phone'>Telefon Numaranız</label>
      <input
        type='tel'
        id='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <label htmlFor='username'>Kullanıcı Adını Gir</label>
      <input
        type='username'
        id='username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <label>Cinsiyet</label>
      <div className={styled['radio-container']}>
        <div className={styled.checkbox}>
          <input
            type='checkbox'
            id='erkek'
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
            id='kadın'
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

      <label htmlFor='city'>İl</label>
      <input
        type='text'
        id='city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <label htmlFor='password'>Şifre</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor='confirmPassword'>Şifre (Tekrar)</label>
      <input
        type='password'
        id='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type='submit' className={styled.button}>
        Profili Oluştur
      </button>
      <button
        type='button'
        className={styled.button}
        onClick={() => {
          handleStep(0);
        }}
      >
        Geri Dön
      </button>
    </form>
  );
};

export default SignUp;
