import { combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  filters: filtersReducer,
});

export default rootReducer;
