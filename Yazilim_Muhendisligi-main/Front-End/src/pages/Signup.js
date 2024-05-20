import React, { useContext, useState } from 'react';
import styled from './SignUp.module.css';
import { Context } from '../context/Context';

const SignUp = () => {
  const { step, setStep } = useContext(Context);

  const handleNextStep = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <div className={styled.container}>
      {step === 0 && (
        <>
          <div className={styled.box}>
            <h2>Özel Ders Vermek İstiyorum</h2>
            <p>Uzman olduğum alanda ders vermek istiyorum.</p>
            <button className={styled.button} onClick={() => handleNextStep(1)}>
              Özel Ders Vermeye Başla
            </button>
          </div>
          <div className={styled.box}>
            <h2>Özel Ders Almak İstiyorum</h2>
            <p>İhtiyaçlarına en uygun öğretmenlerle tanışın.</p>
            <button className={styled.button} onClick={() => handleNextStep(2)}>
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
  const { setStep } = useContext(Context);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }
    // Backend'e veri gönder
    console.log('Submitted:', {
      name,
      surname,
      email,
      phone,
      city,
      district,
      password,
    });
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

      <label htmlFor='district'>İlçe</label>
      <input
        type='text'
        id='district'
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
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

const StudentForm = () => {
  const { setStep } = useContext(Context);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Şifreler uyuşmuyor!');
      return;
    }
    // Backend'e veri gönder
    console.log('Submitted:', {
      name,
      surname,
      email,
      phone,
      city,
      district,
      password,
    });
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

      <label htmlFor='district'>İlçe</label>
      <input
        type='text'
        id='district'
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
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
