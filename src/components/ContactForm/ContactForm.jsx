import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    branch: '',
    name: '',
    phone: '',
    email: '',
    loanAmount: '',
    collateralType: '',
    location: '',
    additionalInfo: '',
    privacyPolicy: false
  });

  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  // Validation functions
  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          errors.name = 'Името трябва да бъде поне 2 символа';
        }
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!value || !phoneRegex.test(value)) {
          errors.phone = 'Въведете валиден телефонен номер';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          errors.email = 'Въведете валиден имейл адрес';
        }
        break;
      case 'loanAmount':
        const amount = parseInt(value);
        if (!value || amount < 5000 || amount > 500000) {
          errors.loanAmount = 'Сумата трябва да бъде между 5000 и 500000 евро';
        }
        break;
      case 'branch':
        if (!value) {
          errors.branch = 'Моля изберете клон';
        }
        break;
      case 'collateralType':
        if (!value) {
          errors.collateralType = 'Моля изберете тип обезпечение';
        }
        break;
      case 'location':
        if (!value || value.trim().length < 2) {
          errors.location = 'Местонахождението трябва да бъде поне 2 символа';
        }
        break;
      case 'privacyPolicy':
        if (!value) {
          errors.privacyPolicy = 'Трябва да приемете условията за лични данни';
        }
        break;
    }
    
    return errors;
  };

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = ['branch', 'name', 'phone', 'email', 'loanAmount', 'collateralType', 'location', 'privacyPolicy'];
    const completedFields = requiredFields.filter(field => {
      if (field === 'privacyPolicy') {
        return formData[field] === true;
      }
      return formData[field] && formData[field].trim() !== '';
    });
    
    const progressPercentage = (completedFields.length / requiredFields.length) * 100;
    setProgress(progressPercentage);
  }, [formData]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Update character count for textarea
    if (name === 'additionalInfo') {
      setCharCount(value.length);
    }

    // Real-time validation
    const fieldErrors = validateField(name, fieldValue);
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name] || null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Заявката е изпратена успешно!');
  };

  return (
    <section 
      className={styles.contactForm}
              style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/contact-form-background.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>КАНДИДАТСТВАЙ ЗА КРЕДИТ</h2>
        </div>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>
            {Math.round(progress)}% завършено
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form} role="form" aria-label="Кандидатстване за кредит">
          <div className={styles.formGroup}>
            <label htmlFor="branch">Избор на Клон: *</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
              className={styles.select}
              aria-label="Избор на клон"
              aria-required="true"
              aria-describedby="branch-description"
            >
              <option value="">-- изберете --</option>
              <option value="sofia">Клон София - Томас Гошев</option>
              <option value="sunny-beach">Клон Слънчев бряг - Антон Тончев</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${validationErrors.name ? styles.inputError : formData.name ? styles.inputValid : ''}`}
                placeholder=" "
                aria-label="Име"
                aria-required="true"
                aria-invalid={validationErrors.name ? "true" : "false"}
                aria-describedby={validationErrors.name ? "name-error" : "name-description"}
              />
              <label htmlFor="name" className={styles.floatingLabel}>Име: *</label>
              {validationErrors.name && (
                <span id="name-error" className={styles.errorMessage} role="alert" aria-live="polite">
                  {validationErrors.name}
                </span>
              )}
              <div id="name-description" className="sr-only">
                Въведете вашето пълно име. Полето е задължително.
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${validationErrors.phone ? styles.inputError : formData.phone ? styles.inputValid : ''}`}
                placeholder=" "
                aria-label="Телефонен номер"
                aria-required="true"
                aria-invalid={validationErrors.phone ? "true" : "false"}
                aria-describedby={validationErrors.phone ? "phone-error" : "phone-description"}
              />
              <label htmlFor="phone" className={styles.floatingLabel}>Телефон: *</label>
              {validationErrors.phone && (
                <span id="phone-error" className={styles.errorMessage} role="alert" aria-live="polite">
                  {validationErrors.phone}
                </span>
              )}
              <div id="phone-description" className="sr-only">
                Въведете вашия телефонен номер. Полето е задължително.
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${validationErrors.email ? styles.inputError : formData.email ? styles.inputValid : ''}`}
                placeholder=" "
                aria-label="Имейл адрес"
                aria-required="true"
                aria-invalid={validationErrors.email ? "true" : "false"}
                aria-describedby={validationErrors.email ? "email-error" : "email-description"}
              />
              <label htmlFor="email" className={styles.floatingLabel}>E-мейл: *</label>
              {validationErrors.email && (
                <span id="email-error" className={styles.errorMessage} role="alert" aria-live="polite">
                  {validationErrors.email}
                </span>
              )}
              <div id="email-description" className="sr-only">
                Въведете вашия имейл адрес. Полето е задължително.
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                required
                min="5000"
                max="500000"
                className={`${styles.input} ${validationErrors.loanAmount ? styles.inputError : formData.loanAmount ? styles.inputValid : ''}`}
                placeholder=" "
                aria-label="Размер на кредита в евро"
                aria-required="true"
                aria-invalid={validationErrors.loanAmount ? "true" : "false"}
                aria-describedby={validationErrors.loanAmount ? "loanAmount-error" : "loanAmount-description"}
              />
              <label htmlFor="loanAmount" className={styles.floatingLabel}>Размер на Кредита... *</label>
              {validationErrors.loanAmount && (
                <span id="loanAmount-error" className={styles.errorMessage} role="alert" aria-live="polite">
                  {validationErrors.loanAmount}
                </span>
              )}
              <div id="loanAmount-description" className="sr-only">
                Въведете размера на кредита в евро. Минималната сума е 5000 евро, максималната е 500000 евро. Полето е задължително.
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="collateralType">Тип Обезпечение: *</label>
            <select
              id="collateralType"
              name="collateralType"
              value={formData.collateralType}
              onChange={handleInputChange}
              required
              className={styles.select}
              aria-label="Тип обезпечение"
              aria-required="true"
              aria-describedby="collateralType-description"
            >
              <option value="">-- изберете --</option>
              <option value="residential">Жилищен имот</option>
              <option value="commercial">Търговски имот</option>
              <option value="land">Парцел</option>
              <option value="agricultural">Земеделски имот</option>
              <option value="other">Друго обезпечение</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${validationErrors.location ? styles.inputError : formData.location ? styles.inputValid : ''}`}
                placeholder=" "
              />
              <label htmlFor="location" className={styles.floatingLabel}>Местонахождение: *</label>
              {validationErrors.location && (
                <span className={styles.errorMessage}>{validationErrors.location}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                maxLength="1000"
                rows="4"
                className={styles.textarea}
                placeholder=" "
              />
              <label htmlFor="additionalInfo" className={styles.floatingLabel}>Допълнителна...</label>
              <div className={styles.charCounter}>
                <span className={`${styles.charCount} ${charCount > 800 ? styles.charCountWarning : ''} ${charCount >= 950 ? styles.charCountDanger : ''}`}>
                  {charCount}
                </span>
                <span className={styles.charLimit}>/ 1000</span>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                  required
                  className={styles.checkbox}
                />
                <span>Условия за лични данни! *</span>
              </label>
            </div>
            
            <div className={styles.buttonsContainer}>
              <button type="submit" className={styles.submitBtn}>
                Изпрати
              </button>
              <button type="button" className={styles.clearBtn} onClick={() => {
                setFormData({
                  branch: '',
                  name: '',
                  phone: '',
                  email: '',
                  loanAmount: '',
                  collateralType: '',
                  location: '',
                  additionalInfo: '',
                  privacyPolicy: false
                });
                setCharCount(0);
                setValidationErrors({});
                // Clear all form inputs
                const form = document.querySelector('form');
                if (form) {
                  form.reset();
                }
              }}>
                Изчисти
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

