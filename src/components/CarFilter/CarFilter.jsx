import React from 'react';
import styles from './CarFilter.module.css';

const CarFilter = ({ brands, onFilterChange }) => {
  const handleBrandChange = event => {
    onFilterChange(event.target.value);
  };

  return (
    <div className={styles.carFilter}>
      {' '}
      <label htmlFor="brandFilter" className={styles.carBrand}>
        Car brand
      </label>
      <select id="brandFilter" defaultValue="" onChange={handleBrandChange}>
        <option value="">Enter the text</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CarFilter;
