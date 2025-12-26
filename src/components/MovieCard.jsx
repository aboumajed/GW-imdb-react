import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };
  
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Poster';

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.posterWrapper}>
        <img 
          src={posterUrl} 
          alt={`${movie.Title} poster`}
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <span className={styles.viewDetails}>View Details</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year}</p>
      </div>
    </article>
  );
}

export default MovieCard;
