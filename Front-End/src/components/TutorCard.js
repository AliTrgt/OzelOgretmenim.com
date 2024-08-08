import React from 'react';
import styled from './TutorCard.module.css';
import { Link } from 'react-router-dom';

const TutorCard = ({tutors}) => {
    console.log("tutorcard",tutors);
    const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return tutors.map((tutor) => (
    <Link key={tutor.id} to={`/tutor-advertisements/${tutor.id}`} className={styled['tutor-card-link']}>
      <div key={tutor.id} className={styled['tutor-card']}>
        {/* <div className={styled['tutor-img']}>
          <img
            src={require('../assests/images/tutor/tutor1.jpg')}
            alt='tutor'
          />
        </div> */}
        <div className={styled.description}>
          <h3 className={styled.title}>{tutor.tutor.firstName} {tutor.tutor.lastName}</h3>
          <p>
            <i className='fa-solid fa-location-dot'></i>
            {tutor.tutor.city}
          </p>
          <p>
            <i className='fa-solid fa-graduation-cap'></i>
            {tutor.tutor.subject}
          </p>
          <h4 className={styled.title}>{tutor.title}</h4>
          <p>{truncateText(tutor.description, 150)}</p>
          <div className={styled['price-container']}>
            {tutor.price}₺<span>/saat</span>
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default TutorCard;
