import React, { useState, useEffect } from 'react';
import { getAllCars } from 'services/api';
import Modal from 'components/Modal/Modal';
import styles from './Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../reduser/favoritesReducer';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const favorites = useSelector(state => state.favorites.list);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setSelectedCar(null);
  };

  const toggleFavorite = car => {
    console.log('Car object:', car);
    const isFavorite = favorites.some(favCar => favCar.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const openModalFromButton = (event, car) => {
    event.stopPropagation();
    setSelectedCar(car);
  };

  return (
    <div>
      <h1>Cars List</h1>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <img
              src={car.img}
              alt={`${car.make} ${car.model}`}
              width="300"
              height="auto"
            />
            <p>
              {car.make} {car.model} {car.year}
            </p>
            <p>
              {car.address} {car.rentalCompany} {car.accessories.join(' ')}
            </p>
            <p>
              {car.type} {car.model} {car.id} {car.functionalities.join(' ')}
            </p>
            <button
              className={`${styles.favoriteButton} ${
                favorites.some(favCar => favCar.id === car.id)
                  ? styles.favorite
                  : ''
              }`}
              onClick={() => toggleFavorite(car)}
            >
              &#x2764;
            </button>

            <button onClick={event => openModalFromButton(event, car)}>
              Learn More
            </button>
          </li>
        ))}
      </ul>
      {selectedCar && <Modal car={selectedCar} closeModal={closeModal} />}
    </div>
  );
};

export default Catalog;
