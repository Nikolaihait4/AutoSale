import axios from 'axios';

const carService = axios.create({
  baseURL: 'https://65cbccfaefec34d9ed881c95.mockapi.io',
});

export const getAllCars = async () => {
  const response = await carService.get('/advert');
  return response.data;
};

export const getCarsWithLimit = async (page, limit) => {
  const response = await carService.get(`/advert?page=${page}&limit=${limit}`);
  return response.data;
};

export const getRandomCar = async () => {
  const cars = await getAllCars();
  const randomIndex = Math.floor(Math.random() * cars.length);
  return cars[randomIndex];
};

export const getCarById = async carId => {
  const response = await carService.get(`/advert/${carId}`);
  return response.data;
};
