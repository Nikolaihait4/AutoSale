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
          <h2>
            {car.make} {car.model}
          </h2>
          <img
            src={car.img}
            alt={`${car.make} ${car.model}`}
            className={styles.carImage}
          />
          <p>Description: {car.description}</p>
          <p>Fuel Consumption: {car.fuelConsumption}</p>
          <p>Engine Size: {car.engineSize}</p>
          <p>Accessories: {car.accessories.join(', ')}</p>
          <p>Functionalities: {car.functionalities.join(', ')}</p>
          <p>Rental Price: {car.rentalPrice}</p>
          <p>Rental Company: {car.rentalCompany}</p>
          <p>Address: {car.address}</p>
          <p>Rental Conditions: {car.rentalConditions}</p>
          <p>Mileage: {car.mileage}</p>
          <a href="tel:+380730000000" className={styles.rentalButton}>
            Rental car
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
