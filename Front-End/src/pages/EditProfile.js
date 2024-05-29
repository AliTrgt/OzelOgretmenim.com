import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import styled from './EditProfile.module.css';

const EditProfile = () => {
  const { user, setUser } = useContext(Context);
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
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam porro totam maiores ullam omnis assumenda eos odit, autem deserunt veniam dolore nihil aut a reprehenderit minima voluptate vitae facilis repellendus.';
  const image = '';

  useEffect(() => {
    // Kullanıcı bilgilerini back-end'den al ve state'e ata
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tutor/8`);
        const data = response.data;
        setName(data.firstName);
        setSurname(data.lastName);
        setEmail(data.email);
        setPhone(data.telephoneNumber);
        setCity(data.city);
        setSubject(data.subject);
        setUserName(data.user.username);
        setSelectedGender(data.gender);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [user.username]);

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
    if (isEditing) {
      if (password !== confirmPassword) {
        alert('Şifreler uyuşmuyor!');
        return;
      }

      const updatedUserInfo = {
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
        const response = await axios.put(`http://localhost:8080/tutor/update/8`, updatedUserInfo);
        console.log('Update response:', response.data);
        setUser({
          ...user,
          username: userName,
        });
        setIsEditing(false); // Düzenleme modunu kapat
        navigate('/');
      } catch (error) {
        console.error('Update failed:', error);
      }
    } else {
      setIsEditing(true); // Düzenleme moduna geç
    }
  };

  return (
    <div className={styled.profileContainer}>
      <h1>Profilinizi Düzenleyin</h1>
      <form className={styled.formContainer} onSubmit={handleSubmit}>
        <label htmlFor='name'>Adınız</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
        <div>{}</div>

        <label htmlFor='surname'>Soyadınız</label>
        <input
          type='text'
          id='surname'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          disabled={!isEditing}
        />

        <label htmlFor='email'>Email Adresiniz</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />

        <label htmlFor='phone'>Telefon Numaranız</label>
        <input
          type='tel'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isEditing}
        />

        <label htmlFor='city'>İl</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!isEditing}
        />

        {/* {user.authorities[0] === 'ROLE_TUTOR' && (
        <div> */}
        <label htmlFor='subject'>Ders</label>
        <input
          type='text'
          id='subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!isEditing}
        />

        {/* </div>)} */}

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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
            <label htmlFor='kadın' className={styled['radio-label']}>
              Kadın
            </label>
          </div>
        </div>
        <button type='submit' className={styled.button}>
          {isEditing ? 'Güncelle' : 'Düzenle'}
        </button>
        <button className={styled.backButton} onClick={() => navigate('/')} disabled={isEditing}>
          Geri Dön
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
