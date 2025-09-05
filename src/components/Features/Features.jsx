import React, { useState, useEffect, useRef } from 'react';
import styles from './Features.module.scss';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={`${styles.featureColumn} ${isVisible ? styles.animate : ''}`}>
          <div className={styles.featureIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Достъпна локация в България</h3>
          <p className={styles.featureText}>
            На разположение са нашите офиси, където ще получите компетентна информация за всичко, свързано с отпускането на ипотечен кредит в евро.
          </p>
        </div>
        
        <div className={`${styles.featureColumn} ${isVisible ? styles.animate : ''}`}>
          <div className={styles.featureIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Одобрение кредит - 2 работни дни</h3>
          <p className={styles.featureText}>
            Нашите служители ще обработят всичките документи, които са свързани с отпускането на ипотечен кредит в евро в рамките на 2 работни дни.
          </p>
        </div>
        
        <div className={`${styles.featureColumn} ${isVisible ? styles.animate : ''}`}>
          <div className={styles.featureIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Бърза и лесна процедура</h3>
          <p className={styles.featureText}>
            Ние предлагаме само ипотечен кредит в евро с лесна и бърза процедура без скрити условя и допълнителни такси през целия период.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
