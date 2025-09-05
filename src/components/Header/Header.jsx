import React, { useState } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="AGB Finance" className={styles.logoImage} />
        </div>
        
        {/* Mobile menu button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.navigationOpen : ''}`}>
          <ul className={styles.navList}>
            <li><a href="#home" onClick={closeMobileMenu}>Начало</a></li>
            <li><a href="#mortgage" onClick={closeMobileMenu}>Ипотечен<br />кредит</a></li>
            <li><a href="#personal" onClick={closeMobileMenu}>Ипотечен кредит<br />за физически лица</a></li>
            <li><a href="#business" onClick={closeMobileMenu}>Ипотечен кредит<br />за бизнес</a></li>
            <li><a href="#calculator" onClick={closeMobileMenu}>Калкулатор<br />ипотечен кредит</a></li>
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

