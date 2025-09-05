import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyrightText}>
          <p>
            Copyright © 2009 - 2025 AGB Finance. Съдържанието на този уеб сайт и технологиите, използвани в него, са под закрила на Закона за авторското право и сродните му права. Всички статии, и други текстови, графични и видео материали, публикувани в сайта, са собственост на ЕйДжиБи Файнанс АД www.agbfinance.bg, освен ако изрично е посочено друго. Използването на каквито и да е материали, публикувани в сайта, е строго забранено. Нарушителите ще бъдат санкционирани с цялата строгост на закона.
          </p>
          <p className={styles.euroNotice}>
            *Обръщаме внимание, че от 01.08.2025 г. съгласно изискванията на чл. 15, ал. 2, чл. 16 и чл. 21, ал. 2 от Закона за въвеждане на еврото ЕйДжиБи Файнанс АД изписва кредите в евро и в левове на всички договори и оферти за ипотечен кредити отпуснати в евро!
          </p>
        </div>
        
        <div className={styles.links}>
          <a href="#" className={styles.link}>Лични Данни</a>
          <a href="#" className={styles.link}>Бисквитки</a>
          <a href="#" className={styles.link}>Евро/Лева</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;