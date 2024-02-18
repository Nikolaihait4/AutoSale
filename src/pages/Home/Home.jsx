import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getAllCars } from 'services/api'; // Импортируем функцию getAllCars для получения всех машин

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await getAllCars();
        const randomCars = carsData
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);
        setCars(randomCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={styles.autoBest}>Best of the Week</h1>

      <h2 className={styles.autoBest2}>Найкраще за тиждень</h2>

      <p className={styles.homeDescription}>
        Ласкаво просимо до нашого веб-сайту, де ви можете знайти найкращі
        автомобілі для оренди в Україні. Наші автомобілі відомі своєю якістю та
        надійністю. Приєднуйтесь до нас сьогодні та знайдіть ідеальний
        автомобіль для вашої подорожі.
      </p>

      <div className={styles.autoContainer}>
        <ul className={styles.autoCard}>
          {cars.map(car => (
            <li key={car.id} className={styles.autoList}>
              <img
                className={styles.autoImg}
                src={car.img}
                alt={`${car.make} ${car.model}`}
                width="274px"
                height="268px"
              />
              <div className={styles.autoInfo}>
                <p className={styles.autoModelYear}>
                  {car.make.split(' ')[0]}{' '}
                  <span className={styles.autoModel}>
                    {car.model.split(' ')[0]}
                  </span>
                  , {car.year}{' '}
                  <span className={styles.rentalPrice}>{car.rentalPrice}</span>
                </p>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
