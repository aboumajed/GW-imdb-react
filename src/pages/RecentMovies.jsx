import { useSelector, useDispatch } from 'react-redux';
import { clearMovies } from '../redux/recentMoviesSlice';
import MovieCard from '../components/MovieCard';
import styles from './RecentMovies.module.css';

function RecentMovies() {
  const dispatch = useDispatch();
  const recentMovies = useSelector((state) => state.recentMovies.movies);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your viewing history?')) {
      dispatch(clearMovies());
    }
  };

  return (
    <div className="page-container">
      <div className={styles.header}>
        <h1 className="page-title">Recent Movies</h1>
        {recentMovies.length > 0 && (
          <button className={styles.clearButton} onClick={handleClear}>
            Clear History
          </button>
        )}
      </div>

      {recentMovies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🕐</div>
          <h2 className="empty-state-title">No Recent Movies</h2>
          <p className="empty-state-text">
            Movies you view will appear here. Start by searching for a movie!
          </p>
        </div>
      ) : (
        <>
          <p className={styles.subtitle}>
            Your last {recentMovies.length} viewed movie{recentMovies.length !== 1 ? 's' : ''}
          </p>
          <div className={styles.moviesGrid}>
            {recentMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RecentMovies;
