#Ali_ElZein

# IMDB Movie Explorer

A React application for searching and exploring movies using the OMDb API.

## Features

- Search movies by title
- View movie details (poster, plot, actors, rating, etc.)
- Track recent movies (last 10 viewed)
- State management with Redux

## Tech Stack

- React
- React Router
- React Router DOM
- Redux Toolkit
- React Redux
- CSS Modules

### 1. Get an OMDb API Key

1. Go to https://www.omdbapi.com/apikey.aspx
2. Sign up for a free key
3. Activate via email

### 2. Add Your API Key

Replace `YOUR_API_KEY` in:
- `src/pages/Search.jsx`
- `src/pages/MovieDetails.jsx`

### 3. Install & Run

```bash
npm install
npm start
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── MovieCard.jsx
├── pages/
│   ├── Search.jsx
│   ├── MovieDetails.jsx
│   └── RecentMovies.jsx
├── redux/
│   ├── store.js
│   └── recentMoviesSlice.js
├── App.jsx
├── index.css
└── main.jsx
```

## Redux Usage

Redux is used for the **Recent Movies** feature:

- `recentMoviesSlice.js` - Contains actions: `addMovie`, `clearMovies`
- State is persisted to localStorage
- Components use `useSelector` to read state and `useDispatch` to update

Example:
```javascript
// Reading state
const recentMovies = useSelector((state) => state.recentMovies.movies);

// Dispatching actions
dispatch(addMovie({ imdbID, Title, Year, Poster }));
dispatch(clearMovies());
```