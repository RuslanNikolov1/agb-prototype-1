import React, { useState, useEffect, useRef } from 'react';
import styles from './ContactInfo.module.scss';

const ContactInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState({});
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate magnetic effect for each card
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const rect = cardRef.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
          );
          
          const maxDistance = 150; // Magnetic field radius
          const strength = 0.3; // Magnetic strength
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = (e.clientX - cardCenterX) * force * strength;
            const moveY = (e.clientY - cardCenterY) * force * strength;
            
            setCardPositions(prev => ({
              ...prev,
              [index]: { x: moveX, y: moveY }
            }));
          } else {
            setCardPositions(prev => ({
              ...prev,
              [index]: { x: 0, y: 0 }
            }));
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createRipple = (event, cardIndex) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      cardIndex
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const toggleCardFlip = (cardIndex) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  const contactItems = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
        </svg>
      ),
      title: "Информация",
      content: "0885 507 507",
      backTitle: "Безплатна консултация",
      backContent: "Нашият екип е на разположение за безплатна консултация по всички въпроси, свързани с ипотечните кредити.",
      type: "phone",
      link: "tel:+359885507507"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
        </svg>
      ),
      title: "И-мейл",
      content: "office@agbfinance.com",
      backTitle: "Бърз отговор",
      backContent: "Получавате отговор в рамките на 24 часа. Изпратете ни вашите документи за бърза оценка.",
      type: "email",
      link: "mailto:office@agbfinance.com"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" fill="currentColor"/>
        </svg>
      ),
      title: "Работно Време",
      content: "Пон. - Пет. (10:00 - 18:30)",
      backTitle: "Гъвкаво време",
      backContent: "Възможност за срещи извън работно време по предварителна уговорка за ваше удобство.",
      type: "time",
      link: null
    }
  ];

  return (
    <section ref={sectionRef} className={styles.contactInfoSection}>
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          {contactItems.map((item, index) => (
            <div 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`${styles.contactCard} ${isVisible ? styles.animate : ''} ${flippedCards.has(index) ? styles.flipped : ''}`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: `translate(${cardPositions[index]?.x || 0}px, ${cardPositions[index]?.y || 0}px)`
              }}
              onClick={(e) => {
                createRipple(e, index);
                toggleCardFlip(index);
              }}
            >
              <div className={styles.cardInner}>
                {/* Front of card */}
                <div className={styles.cardFront}>
                  <div className={styles.cardBackground}></div>
                  <div className={styles.cardContent}>
                    <div className={`${styles.iconContainer} ${styles[item.type]}`}>
                      {item.icon}
                    </div>
                    <h3 className={styles.contactTitle}>{item.title}</h3>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className={styles.contactLink}
                        target={item.type === 'email' ? '_self' : '_self'}
                        rel={item.type === 'email' ? '' : 'noopener noreferrer'}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className={styles.contactText}>{item.content}</p>
                    )}
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>

                {/* Back of card */}
                <div className={styles.cardBack}>
                  <div className={styles.cardBackground}></div>
                  <div className={styles.cardContent}>
                    <div className={`${styles.iconContainer} ${styles[item.type]}`}>
                      {item.icon}
                    </div>
                    <h3 className={styles.contactTitle}>{item.backTitle}</h3>
                    <p className={styles.contactText}>{item.backContent}</p>
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>
              </div>
              
              {/* Ripple effects */}
              {ripples
                .filter(ripple => ripple.cardIndex === index)
                .map(ripple => (
                  <div
                    key={ripple.id}
                    className={styles.ripple}
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: ripple.size,
                      height: ripple.size
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
