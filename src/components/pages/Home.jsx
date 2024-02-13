import { getAllCars } from 'components/services/api';
import { useState, useEffect } from 'react';

const Home = () => {
  const [cars, setCars] = useState([]);

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
              {car.make} {car.model}, {car.year}
            </p>
            <p>
              {car.address} {car.rentalCompany} {car.accessories.join(' ')}
            </p>
            <p>
              {car.type} {car.model} {car.id} {car.functionalities.join(' ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
