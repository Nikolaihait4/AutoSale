import React, { useState } from 'react';

const CarFilter = ({ brands, onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleBrandChange = event => {
    setSelectedBrand(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="brandFilter">Car brand</label>
      <select
        id="brandFilter"
        value={selectedBrand}
        onChange={handleBrandChange}
      >
        <option value="">All Brands</option>
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
