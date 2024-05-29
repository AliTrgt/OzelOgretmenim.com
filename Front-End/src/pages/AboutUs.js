import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer/footer';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.header}>HAKKIMIZDA</h2>
      <section className={styles.section}>
        <div className={styles['aboutus-container']}>
          <div className={styles.title}>
            <h2>
              <span>H</span>AKKIMIZDA
            </h2>
          </div>
          <div className={styles.description}>
            <p>
              Türkiye geneli tüm branşlarda özel ders almak isteyen kişiler ile
              alanında uzmanlaşmış özel ders veren eğitimcileri doğrudan bir
              araya getirme amacıyla kurulan bir pazar yeri projesidir. <br />{' '}
              <br />
              Türkiye’nin bütün illerinde hizmet veren projemizde dilediğiniz
              gibi profil oluşturabilir ve özel ders verebilirsiniz. <br />{' '}
              <br />
              Ders vermek isteyen insanlar, illaki öğretmen veya eğitmen olmak
              zorunda değildir. Özel ders verebileceğine inanan öğrenci ve diğer
              branşlardaki insanlarda özel ders verebilirler. Aynı zamanda
              dileyen herkes özel ders alabilir. Ayrıca özel ders almak
              istediğiniz öğretmeni seçip doğrudan kendisiyle iletişime
              geçebilirsiniz.Vizyonumuz, Türkiye’nin her ilinde, her ilçesinde
              öğretmen ihtiyacı olan, özel ders almak isteyen bütün
              öğrencilerimize yardımcı olmak. <br /> <br />
              Öğretmen ve eğitimcilerin kendilerini geliştirmesine hizmet etmek.
              Özel dersin yani birebir derslerin günümüzde ihtiyaç haline
              geldiği tartışılmaz bir gerçektir. <br /> <br /> Öğrenciler okul
              derslerinde anlamadığı konuları veya eksik olduğu derslerde
              kendini geliştirip, eğitim hayatına sağlam adımlarla devam etmek
              için alanında uzman eğitimciden özel ders almak istemektedirler.
              <br />
              <br />
              Veliler ise bu alanda genel araştırma yapıp çocuğuna yardımcı
              olarak uzman öğretmen arayışına girmektedirler. Özel Ders kalitesi
              ve dinamik ekibi ile özel ders üzerinden bir yer edinmiş
              durumdadır. Sizde uzman olduğunuz alanda ücretsiz eğitimci profili
              oluşturup, bize gelen tüm ziyaretçilerden ders talebi
              alabilirsiniz.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
