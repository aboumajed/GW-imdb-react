import { useState, useEffect, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import styles from './Search.module.css';

// Replace with your own API key from https://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_KEY;
const API_URL = 'https://www.omdbapi.com/';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const searchMovies = useCallback(async (term) => {
    if (!term.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${term}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        // top 10 results
        setMovies(data.Search.slice(0, 10));
      } else {
        setMovies([]);
        if (data.Error !== 'Movie not found!') {
          setError(data.Error || 'Something went wrong');
        }
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovies(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchMovies]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Search Movies</h1>
      
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleInputChange}
            autoFocus
          />
          {searchTerm && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Searching movies...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎭</div>
          <h2 className="empty-state-title">No Results Found</h2>
          <p className="empty-state-text">
            We couldn't find any movies matching "{searchTerm}". 
            Try a different search term.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <p className={styles.resultsCount}>
            Showing {movies.length} result{movies.length !== 1 ? 's' : ''}
          </p>
          <div className={styles.moviesGrid}>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}

      {!hasSearched && !loading && (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <h2 className="empty-state-title">Discover Movies</h2>
          <p className="empty-state-text">
            Start typing to search for your favorite movies from the IMDB database.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
