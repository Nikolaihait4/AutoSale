import axios from 'axios';

const carService = axios.create({
  baseURL: 'https://65cbccfaefec34d9ed881c95.mockapi.io',
});

export const getAllCars = async () => {
  const response = await carService.get('/advert');
  return response.data;
};
