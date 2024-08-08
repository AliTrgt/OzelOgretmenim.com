import React from "react";
import { Link } from "react-router-dom";
import "./LessonItems.css";

const LessonItems = () => {
  return (
    <div className='lessons-container'>
      <div className='items'>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/matematik.png")}
                  alt='Math'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Matematik</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/ingilizce.png")}
                  alt='İngilizce'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>İngilizce</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/ilk-ogretim-takviye.png")}
                  alt='ilköğretim takviye'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>İlköğretim Takviye</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/turkce.png")}
                  alt='Türkçe'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Türkçe</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/fizik.png")}
                  alt='fizik'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Fizik</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/fen-bilimleri.png")}
                  alt='fen bilimleri'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Fen Bilgisi</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/almanca.png")}
                  alt='almanca'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Almanca</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div
              className='private-lesson-box'
              style={{
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/istatistik.png")}
                  alt='istatistik'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>İstatistik</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='item'>
          <Link className='subject'>
            <div className='private-lesson-box'>
              <div className='subject-icon'>
                <img
                  src={require("../../../assests/images/subject/piano.png")}
                  alt='piayno'
                />
              </div>
              <div className='subject-container'>
                <div className='subject-name'>Piyano</div>
                <div className='subject-description'>21.532 Öğretmen</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonItems;
