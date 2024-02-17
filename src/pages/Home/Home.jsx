import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getAllCars } from 'services/api'; // Импортируем функцию getAllCars для получения всех машин

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const carsData = await getAllCars(); // Получаем все машины
        const randomCars = carsData
          .sort(() => Math.random() - 0.5)
          .slice(0, 12); // Выбираем случайные 12 машин
        setCars(randomCars); // Устанавливаем полученные машины в состояние
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={styles.autoBest}>Best of the Week</h1>

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
                    {car.address.split(',')[1]} | {car.address.split(',')[2]} |
                    {car.rentalCompany} |
                  </p>
                  <p className={styles.autoModelFunc}>
                    {car.type} {car.model} {car.id}{' '}
                    {car.functionalities[0].split(' ').slice(0, 2).join(' ')}
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
