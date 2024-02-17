import { combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer.js';
import filtersReducer from './filtersReduser.js';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  filters: filtersReducer,
});

export default rootReducer;
