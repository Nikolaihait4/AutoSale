import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal/Modal';
import styles from './Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../reduser/favoritesReducer';
import { getAllCars } from 'services/api';
import CarFilter from '../../components/CarFilter/CarFilter';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const favorites = useSelector(state => state.favorites.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const carsData = await getAllCars();
        const start = (page - 1) * 12;
        const end = start + 12;
        const slicedCars = carsData.slice(start, end);
        setCars(prevCars => [...prevCars, ...slicedCars]);

        const uniqueBrands = [...new Set(carsData.map(car => car.make))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const closeModal = () => {
    setSelectedCar(null);
  };

  const toggleFavorite = car => {
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

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFilterChange = async selectedBrand => {
    try {
      setLoading(true);
      const carsData = await getAllCars();

      const filteredCars = selectedBrand
        ? carsData.filter(car => car.make === selectedBrand)
        : carsData;

      setCars(filteredCars);
      setSelectedBrand(selectedBrand);
    } catch (error) {
      console.error('Error filtering cars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h1>Cars List</h1> */}
      <CarFilter brands={brands} onFilterChange={handleFilterChange} />
      <div className={styles.autoContainer}>
        <ul className={styles.autoCard}>
          {cars.map(car => (
            <li key={`${car.make}-${car.model}`} className={styles.autoList}>
              <img
                className={styles.autoImg}
                src={car.img}
                alt={`${car.make} ${car.model}`}
                width="274px"
                height="268px"
              />
              <div className={styles.autoInfo}>
                <p className={styles.autoModelYear}>
                  {car.make}{' '}
                  <span className={styles.autoModel}>{car.model}</span>,{' '}
                  {car.year}{' '}
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
                    className={styles.heartPath} // Добавляем класс к path элементу
                    d="M15.6301 2.45753C15.247 2.07428 14.7922 1.77026 14.2916 1.56284C13.791 1.35542 13.2545 1.24866 12.7126 1.24866C12.1707 1.24866 11.6342 1.35542 11.1336 1.56284C10.633 1.77026 10.1782 2.07428 9.79509 2.45753L9.00009 3.25253L8.20509 2.45753C7.43132 1.68376 6.38186 1.24906 5.28759 1.24906C4.19331 1.24906 3.14386 1.68376 2.37009 2.45753C1.59632 3.2313 1.16162 4.28075 1.16162 5.37503C1.16162 6.4693 1.59632 7.51876 2.37009 8.29253L3.16509 9.08753L9.00009 14.9225L14.8351 9.08753L15.6301 8.29253C16.0133 7.90946 16.3174 7.45464 16.5248 6.95404C16.7322 6.45345 16.839 5.91689 16.839 5.37503C16.839 4.83316 16.7322 4.2966 16.5248 3.79601C16.3174 3.29542 16.0133 2.84059 15.6301 2.45753Z"
                    stroke="white"
                    strokeOpacity="0.8" // Исправляем свойство stroke-opacity на strokeOpacity
                    strokeWidth="1.5" // Исправляем свойство stroke-width на strokeWidth
                    strokeLinecap="round" // Исправляем свойство stroke-linecap на strokeLinecap
                    strokeLinejoin="round" // Исправляем свойство stroke-linejoin на strokeLinejoin
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
