import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'components/Modal/Modal';
import CarFilter from 'components/CarFilter/CarFilter';
import { getAllCars } from 'services/api';
import { toast } from 'react-toastify'; // импорт уведомлений из React-Toastify

import 'react-toastify/dist/ReactToastify.css'; // импорт стилей React-Toastify

import styles from './Catalog.module.css';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../reduser/favoritesReducer';

const Catalog = () => {
  const [allCars, setAllCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const carsData = await getAllCars();
        setAllCars(carsData);
        setCars(carsData.slice(0, perPage));
        const uniqueBrands = [...new Set(carsData.map(car => car.make))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [perPage]);

  const handleFilterChange = async selectedBrand => {
    try {
      setLoading(true);
      const filteredCars = allCars.filter(
        car => !selectedBrand || car.make === selectedBrand
      );
      setCars(filteredCars.slice(0, perPage));
      setSelectedBrand(selectedBrand);
      setPage(1);
    } catch (error) {
      console.error('Error filtering cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  const toggleFavorite = car => {
    const isFavorite = favorites.some(favCar => favCar.id === car.id);

    if (isFavorite) {
      setFavorites(favorites.filter(favCar => favCar.id !== car.id));
      dispatch(removeFromFavorites(car));
      toast.error('Car removed from favorites'); // Уведомление об удалении машины из избранного
    } else {
      setFavorites([...favorites, car]);
      dispatch(addToFavorites(car));
      toast.success('Car added to favorites'); // Уведомление о добавлении машины в избранное
    }
  };

  const openModalFromButton = (event, car) => {
    event.stopPropagation();
    setSelectedCar(car);
  };

  const loadMore = () => {
    const startIdx = page * perPage;
    const endIdx = (page + 1) * perPage;
    const nextCars = allCars.slice(startIdx, endIdx);

    if (nextCars.length > 0) {
      setCars(prevCars => [...prevCars, ...nextCars]);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      <CarFilter brands={brands} onFilterChange={handleFilterChange} />
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
              <button
                className={`${styles.favoriteButton} ${
                  favorites.some(favCar => favCar.id === car.id)
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
      </div>
      {selectedCar && <Modal car={selectedCar} closeModal={closeModal} />}
      {!loading && !selectedBrand && (
        <button onClick={loadMore} className={styles.butLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Catalog;
