import { actionTypes } from './actionTypes';

// Проверяем наличие данных в локальном хранилище
const storedFavorites = localStorage.getItem('favorites');
const initialState = {
  list: storedFavorites ? JSON.parse(storedFavorites) : [], // Извлекаем данные из локального хранилища, если они есть
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_FAVORITES:
      const newListAdd = [...state.list, action.payload.car];
      localStorage.setItem('favorites', JSON.stringify(newListAdd)); // Сохраняем обновленный список в локальное хранилище
      return {
        ...state,
        list: newListAdd,
      };
    case actionTypes.REMOVE_FROM_FAVORITES:
      const newListRemove = state.list.filter(
        car => car.id !== action.payload.car.id // Сравниваем по id машины
      );
      localStorage.setItem('favorites', JSON.stringify(newListRemove)); // Сохраняем обновленный список в локальное хранилище
      return {
        ...state,
        list: newListRemove,
      };
    case actionTypes.SET_FAVORITES:
      localStorage.setItem(
        'favorites',
        JSON.stringify(action.payload.favorites)
      ); // Сохраняем список в локальное хранилище
      return {
        ...state,
        list: action.payload.favorites,
      };
    default:
      return state;
  }
};

export const addToFavorites = car => ({
  type: actionTypes.ADD_TO_FAVORITES,
  payload: { car },
});

export const removeFromFavorites = car => ({
  type: actionTypes.REMOVE_FROM_FAVORITES,
  payload: { car },
});

export default favoritesReducer;
