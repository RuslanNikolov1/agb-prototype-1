import React from 'react';
import styles from './BranchInfo.module.scss';

const BranchInfo = () => {
  const branches = [
    {
      id: 'sofia',
      name: 'Клон София',
      consultant: 'Томас Гошев - кредитен консултант',
      phone: '0884 507 507',
      email: 'sofia@agbfinance.bg',
      workingHours: 'Пон. - Пет. 10:00 - 18:30',
      location: 'София, бул. "Черни връх" 31А - партер'
    },
    {
      id: 'sunny-beach',
      name: 'Клон Слънчев бряг',
      consultant: 'Антон Тончев - изпълнителен член на съвета на директорите',
      phone: '0885 507 507',
      email: 'sunnybeach@agbfinance.bg',
      workingHours: 'Пон. - Пет. 10:00 - 18:30',
      location: 'гр.Несебър, к.к Слънчев бряг, к-с Съни Дей 3'
    }
  ];

  return (
    <section className={styles.branchInfo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Ипотечен Кредит Контакти</h2>
        </div>

        <div className={styles.branches}>
          {branches.map((branch) => (
            <div key={branch.id} className={styles.branchCard}>
              <div className={styles.branchHeader}>
                <h3>{branch.name}</h3>
              </div>
              
              <div className={styles.branchDetails}>
                <div className={styles.detailItem}>
                  <h4>{branch.consultant}</h4>
                  <a href={`tel:${branch.phone}`} className={styles.phone}>
                    {branch.phone}
                  </a>
                </div>

                <div className={styles.detailItem}>
                  <h4>Е-мейл</h4>
                  <a href={`mailto:${branch.email}`} className={styles.email}>
                    {branch.email}
                  </a>
                </div>

                <div className={styles.detailItem}>
                  <h4>Работно Време</h4>
                  <p className={styles.workingHours}>{branch.workingHours}</p>
                </div>

                <div className={styles.detailItem}>
                  <h4>Местоположение</h4>
                  <p className={styles.location}>{branch.location}</p>
                </div>
              </div>

              <div className={styles.branchActions}>
                <button className={styles.selectBranchBtn}>
                  Избери Клона
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.generalInfo}>
          <div className={styles.infoCard}>
            <h3>Информация</h3>
            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Телефон:</span>
                <a href="tel:0885507507" className={styles.infoValue}>0885 507 507</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Е-мейл:</span>
                <a href="mailto:info@agbfinance.bg" className={styles.infoValue}>info@agbfinance.bg</a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Работно Време:</span>
                <span className={styles.infoValue}>Пон. - Пет. (10:00 - 18:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchInfo;

