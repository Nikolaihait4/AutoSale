import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromFavorites,
  addToFavorites,
} from '../../reduser/favoritesReducer';
import styles from './Favorites.module.css';
import CarFilter from '../../components/CarFilter/CarFilter';

const Favorites = () => {
  const favoriteCars = useSelector(state => state.favorites.list);
  const [selectedCar, setSelectedCar] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const uniqueBrands = [...new Set(favoriteCars.map(car => car.make))];
    setBrands(uniqueBrands);
  }, [favoriteCars]);

  const closeModal = () => {
    setSelectedCar(null);
  };

  const openModalFromButton = (event, car) => {
    event.stopPropagation();
    setSelectedCar(car);
  };

  const toggleFavorite = car => {
    const isFavorite = favoriteCars.some(favCar => favCar.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const handleFilterChange = selectedBrand => {
    setSelectedBrand(selectedBrand);
  };

  return (
    <div>
      <h1>Favorite Cars List</h1>
      <CarFilter brands={brands} onFilterChange={handleFilterChange} />
      <ul>
        {favoriteCars
          .filter(car => !selectedBrand || car.make === selectedBrand)
          .map(car => (
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
                  favoriteCars.some(favCar => favCar.id === car.id)
                    ? styles.favorite
                    : ''
                }`}
                onClick={() => toggleFavorite(car)}
              >
                &#x2764;
              </button>

              <button
                className={`favoriteButton ${
                  favoriteCars.some(favCar => favCar.id === car.id)
                    ? 'favorite'
                    : ''
                }`}
                onClick={event => openModalFromButton(event, car)}
              >
                Learn More
              </button>
            </li>
          ))}
      </ul>
      {selectedCar && <Modal car={selectedCar} closeModal={closeModal} />}
    </div>
  );
};

export default Favorites;
