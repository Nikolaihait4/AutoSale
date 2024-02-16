// store.js
import { combineReducers, createStore } from 'redux';
import { favoritesReducer } from './favoritesReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export const store = createStore(rootReducer);
