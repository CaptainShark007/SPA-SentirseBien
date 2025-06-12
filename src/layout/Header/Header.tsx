import { useLocation } from 'react-router';
import styles from '@layout/Header/Header.module.css';

const Header = () => {
  const location = useLocation();

  if (location.pathname !== '/')
    return <div className={styles['not-header']} />;
  return (
    <header className={styles['header']}>
      <h2>Bienvenidos a</h2>
      <h1>Sentirse Bien</h1>

      <div>
        <span>Deslice hacía abajo</span>
        <br />
        <span>&#x25BC;</span>
      </div>
    </header>
  );
};

export default Header;
