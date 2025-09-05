import React, { useState } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log('Toggle clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log('Closing mobile menu');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="AGB Finance" className={styles.logoImage} />
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li><a href="#home">Начало</a></li>
            <li><a href="#mortgage">Ипотечен<br />кредит</a></li>
            <li><a href="#personal">Ипотечен кредит<br />за физически лица</a></li>
            <li><a href="#business">Ипотечен кредит<br />за бизнес</a></li>
            <li><a href="#calculator">Калкулатор<br />ипотечен кредит</a></li>
            <li><a href="#blog">Блог</a></li>
            <li><a href="#about">За Нас</a></li>
            <li><a href="#contact">Контакт</a></li>
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button 
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={closeMobileMenu}
      >
        {/* Close button inside menu */}
        <button 
          className={styles.mobileCloseButton}
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          ✕
        </button>
        
        <nav className={styles.mobileNavigation} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.mobileNavList}>
            <li><a href="#home" onClick={closeMobileMenu}>Начало</a></li>
            <li><a href="#mortgage" onClick={closeMobileMenu}>Ипотечен кредит</a></li>
            <li><a href="#personal" onClick={closeMobileMenu}>Ипотечен кредит за физически лица</a></li>
            <li><a href="#business" onClick={closeMobileMenu}>Ипотечен кредит за бизнес</a></li>
            <li><a href="#calculator" onClick={closeMobileMenu}>Калкулатор ипотечен кредит</a></li>
            <li><a href="#blog" onClick={closeMobileMenu}>Блог</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>За Нас</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Контакт</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

