import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.navIcon}>🔍</span>
          <span className={styles.navText}>Search Movie</span>
        </NavLink>
        
        <NavLink 
          to="/recent" 
          className={({ isActive }) => 
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.navIcon}>🕐</span>
          <span className={styles.navText}>Recent Movies</span>
        </NavLink>
      </nav>
      
      <div className={styles.footer}>
        <p className={styles.footerText}>Powered by OMDb API</p>
      </div>
    </aside>
  );
}

export default Sidebar;
