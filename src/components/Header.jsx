import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          <h1 className={styles.title}>IMDB Movie Browser</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
