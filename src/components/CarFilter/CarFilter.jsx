import React from 'react';
import styles from './CarFilter.module.css';

const CarFilter = ({ brands, onFilterChange }) => {
  const handleBrandChange = event => {
    onFilterChange(event.target.value);
  };

  return (
    <div className={styles.carFilter}>
      <label htmlFor="brandFilter" className={styles.carBrand}>
        Car brand
      </label>
      <div>
        <select
          id="brandFilter"
          defaultValue=""
          onChange={handleBrandChange}
          className={styles.select}
        >
          <option value="">All Auto</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CarFilter;
