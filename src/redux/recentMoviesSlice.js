import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'recentMovies';
const MAX_RECENT_MOVIES = 10;

// Load initial state from localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading recent movies:', error);
    return [];
  }
};

// Save to localStorage
const saveToStorage = (movies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving recent movies:', error);
  }
};

const recentMoviesSlice = createSlice({
  name: 'recentMovies',
  initialState: {
    movies: loadFromStorage(),
  },
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload;
      const filtered = state.movies.filter((m) => m.imdbID !== movie.imdbID);
      // Add new movie at beginning, limit to 10
      state.movies = [movie, ...filtered].slice(0, MAX_RECENT_MOVIES);
      // Save to localStorage
      saveToStorage(state.movies);
    },
    clearMovies: (state) => {
      state.movies = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { addMovie, clearMovies } = recentMoviesSlice.actions;
export default recentMoviesSlice.reducer;
