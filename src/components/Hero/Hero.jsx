import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Кредит с ипотека за вас от AGB Finance с гаранция за прозрачност в ипотечното кредитиране
          </h1>
          
          <div className={styles.description}>
            <p>
              Ние от AGB Finance предлагаме лесна процедура за заявяване на <strong>ипотечен кредит</strong>.
            </p>
            <p>
              Може да кандидатствате за ипотечен кредит от AGB Finance през уеб сайта ни за <strong>кредити с ипотека</strong>.
            </p>
            <p>
              Нашия <strong>кредит с ипотека</strong> е с атрактивна лихва, като отпускането на ипотечния кредит е с лесна процедура и без скрити такси за всеки ипотечен кредит отпуснат от нас.
            </p>
            <p>
              Сумите които отпускаме свързвани с ипотечен кредит са до <strong>500 000 Евро</strong>.
            </p>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🏠</div>
              <h3>Достъпна локация в България</h3>
              <p>На разположение са нашите офиси, където ще получите компетентна информация за всичко, свързано с отпускането на ипотечен кредит в евро.</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Одобрение кредит - 2 работни дни</h3>
              <p>Нашите служители ще обработят всичките документи, които са свързани с отпускането на ипотечен кредит в евро в рамките на 2 работни дни.</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Бърза и лесна процедура</h3>
              <p>Ние предлагаме само ипотечен кредит в евро с лесна и бърза процедура без скрити условя и допълнителни такси през целия период.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

