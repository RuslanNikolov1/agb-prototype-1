import React, { useState, useEffect } from 'react';
import styles from './Slider.module.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/slide-2.png',
      title: 'Ипотечен кредит в евро за бизнес',
      description: 'Бързи и лесни процедури с размер на ипотечен кредит в евро от 5000 € до 500000 €, обезпечен с ипотека.'
    },
    {
      id: 2,
      image: '/slide-3.png',
      title: 'Ипотечен кредит в евро за физически лица',
      description: 'Обезпечение с ипотека. Размер на ипотечен кредит в евро от 5 000 € до 500 000 €.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.sliderContainer}>
        <div className={styles.slideContent}>
          <div className={styles.backgroundLayer2}></div>
          <div className={styles.borderGlow}></div>
          <div className={styles.verticalDivider}></div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{slides[currentSlide].title}</h2>
            <p className={styles.description}>{slides[currentSlide].description}</p>
          </div>
          <div className={styles.imageContainer}>
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className={styles.slideImage}
            />
          </div>
        </div>
        
        <div className={styles.sliderControls}>
          <button className={styles.prevBtn} onClick={prevSlide}>
            ‹
          </button>
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button className={styles.nextBtn} onClick={nextSlide}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
