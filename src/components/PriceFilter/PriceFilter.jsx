import React, { useState } from 'react';
import styles from './PriceFilter.module.css';

const PriceFilter = ({ onPriceChange }) => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handlePriceChange = event => {
    const price = event.target.value;
    setSelectedPrice(price);
    onPriceChange(price); // Передаем выбранную цену в родительский компонент
  };

  return (
    <div className={styles.priceFilter}>
      <label htmlFor="priceFilter">Price</label>
      <select
        id="priceFilter"
        value={selectedPrice}
        onChange={handlePriceChange}
      >
        <option value="">All Prices</option>
        {[...Array(100).keys()].map(price => (
          <option key={price} value={price * 10}>
            ${price * 10} per hour
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
