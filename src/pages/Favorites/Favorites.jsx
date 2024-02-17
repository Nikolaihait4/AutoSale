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
    <div className={styles.mainContainer}>
      {/* <h1>Favorite Cars List</h1> */}
      <CarFilter brands={brands} onFilterChange={handleFilterChange} />
      <ul className={styles.autoCard}>
        {favoriteCars
          .filter(car => !selectedBrand || car.make === selectedBrand)
          .map(car => (
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

              <button
                className={`${styles.favoriteButton} ${
                  favoriteCars.some(favCar => favCar.id === car.id)
                    ? styles.favorite
                    : ''
                }`}
                onClick={() => toggleFavorite(car)}
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={styles.heartPath}
                    d="M15.6301 2.45753C15.247 2.07428 14.7922 1.77026 14.2916 1.56284C13.791 1.35542 13.2545 1.24866 12.7126 1.24866C12.1707 1.24866 11.6342 1.35542 11.1336 1.56284C10.633 1.77026 10.1782 2.07428 9.79509 2.45753L9.00009 3.25253L8.20509 2.45753C7.43132 1.68376 6.38186 1.24906 5.28759 1.24906C4.19331 1.24906 3.14386 1.68376 2.37009 2.45753C1.59632 3.2313 1.16162 4.28075 1.16162 5.37503C1.16162 6.4693 1.59632 7.51876 2.37009 8.29253L3.16509 9.08753L9.00009 14.9225L14.8351 9.08753L15.6301 8.29253C16.0133 7.90946 16.3174 7.45464 16.5248 6.95404C16.7322 6.45345 16.839 5.91689 16.839 5.37503C16.839 4.83316 16.7322 4.2966 16.5248 3.79601C16.3174 3.29542 16.0133 2.84059 15.6301 2.45753Z"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={event => openModalFromButton(event, car)}
                className={styles.learnmoreButt}
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
