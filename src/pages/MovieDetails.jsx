import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/recentMoviesSlice';
import styles from './MovieDetails.module.css';


// Replace with your own API key from https://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_KEY;
const API_URL = 'https://www.omdbapi.com/';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const addedToRecent = useRef(false);

  useEffect(() => {
    addedToRecent.current = false;
    
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
          // Add to recent movies using Redux
          if (!addedToRecent.current) {
            addedToRecent.current = true;
            dispatch(addMovie({
              imdbID: data.imdbID,
              Title: data.Title,
              Year: data.Year,
              Poster: data.Poster,
            }));
          }
        } else {
          setError(data.Error || 'Movie not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch movie details. Please check your API key and try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/ccc/999?text=No+Poster';

  return (
    <div className="page-container">
      <button className={styles.backButton} onClick={handleBack}>
        ← Back
      </button>

      <div className={styles.movieContainer}>
        <div className={styles.posterSection}>
          <img 
            src={posterUrl} 
            alt={`${movie.Title} poster`}
            className={styles.poster}
          />
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{movie.Title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.year}>{movie.Year}</span>
            {movie.Rated && movie.Rated !== 'N/A' && (
              <span className={styles.rated}>{movie.Rated}</span>
            )}
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <span className={styles.runtime}>{movie.Runtime}</span>
            )}
          </div>

          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className={styles.genres}>
              {movie.Genre.split(', ').map((genre) => (
                <span key={genre} className={styles.genreTag}>
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className={styles.rating}>
              <span className={styles.ratingValue}>{movie.imdbRating}</span>
              <span className={styles.ratingMax}>/10</span>
              {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                <span className={styles.votes}>({movie.imdbVotes} votes)</span>
              )}
            </div>
          )}

          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Plot</h2>
              <p className={styles.plot}>{movie.Plot}</p>
            </div>
          )}

          {movie.Actors && movie.Actors !== 'N/A' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Actors</h2>
              <p className={styles.text}>{movie.Actors}</p>
            </div>
          )}

          {movie.Director && movie.Director !== 'N/A' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Director</h2>
              <p className={styles.text}>{movie.Director}</p>
            </div>
          )}

          {movie.Writer && movie.Writer !== 'N/A' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Writer</h2>
              <p className={styles.text}>{movie.Writer}</p>
            </div>
          )}

          {movie.Awards && movie.Awards !== 'N/A' && (
            <div className={styles.awards}>
              <span>{movie.Awards}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
