import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ car, closeModal }) => {
  const handleBackdropClick = event => {
    if (event.target.classList.contains(styles.modalBackdrop)) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
        <div className={styles.modalContent}>
          <img
            src={car.img}
            alt={`${car.make} ${car.model}`}
            className={styles.carImage}
            width="461px"
            height="248px"
          />
          <h2 className={styles.carInfo}>
            {car.make} <span className={styles.carModel}>{car.model}</span>{' '}
            {car.year}
          </h2>
          <div className={styles.autoInform2}>
            <p className={styles.autoAdrComp}>
              <span className={styles.autoSpan}>
                {car.address.split(',')[1]}
              </span>
              <span className={styles.autoSpan}>
                {car.address.split(',')[2]}
              </span>
              <span className={styles.autoSpan}>{car.rentalCompany}</span>
              <span className={styles.autoSpan}>{car.type}</span>
              <span className={styles.autoSpan}>{car.model}</span>
              <span className={styles.autoSpan}>{car.id}</span>
              <span className={styles.autoSpanLast}>
                {car.functionalities[0].split(' ').slice(0, 1).join(' ')}
              </span>
            </p>
          </div>
          <p className={styles.deskrip}>{car.description}</p>
          <p className={styles.accessories}>Accessories and functionalities:</p>
          <p className={styles.functionalitie}>
            {car.accessories.join(' | ')}
            {car.functionalities.join(' | ')}
          </p>
          <p className={styles.accessories}>Rental Conditions:</p>
          <div className={styles.conditionsContainer}>
            {car.rentalConditions.split('\n').map((condition, index) => (
              <p key={index} className={styles.rentalCondition}>
                {condition}
              </p>
            ))}
            <p className={styles.mileage}>
              Mileage:{' '}
              <span className={styles.mileageNumber}>{car.mileage}</span>
            </p>
            <p className={styles.rentalPrice}>
              Price:{' '}
              <span className={styles.rentalNumber}>{car.rentalPrice}</span>
            </p>
          </div>
          <a href="tel:+380730000000" className={styles.rentalButton}>
            Rental car
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
