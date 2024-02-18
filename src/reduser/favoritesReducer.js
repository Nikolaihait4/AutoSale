export const actionTypes = {
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
};

const storedFavorites = localStorage.getItem('favorites');
const initialState = {
  list: storedFavorites ? JSON.parse(storedFavorites) : [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_FAVORITES:
      const newListAdd = [...state.list, action.payload.car];
      localStorage.setItem('favorites', JSON.stringify(newListAdd));
      return {
        ...state,
        list: newListAdd,
      };
    case actionTypes.REMOVE_FROM_FAVORITES:
      const newListRemove = state.list.filter(
        car => car.id !== action.payload.car.id
      );
      localStorage.setItem('favorites', JSON.stringify(newListRemove));
      return {
        ...state,
        list: newListRemove,
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
