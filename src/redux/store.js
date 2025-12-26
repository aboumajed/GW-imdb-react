import { configureStore } from '@reduxjs/toolkit';
import recentMoviesReducer from './recentMoviesSlice';

export const store = configureStore({
  reducer: {
    recentMovies: recentMoviesReducer,
  },
});

export default store;
