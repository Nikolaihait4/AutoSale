import { combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer.js';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
