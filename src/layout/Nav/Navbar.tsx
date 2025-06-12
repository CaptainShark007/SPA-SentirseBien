import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import imagePath from '@/constants/imagePath';
import { openModal } from '@/shared/slice/modal.slice';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { clearToken } from '@/shared/slice/auth.slice';
import styles from '@layout/Nav/Navbar.module.css';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { username, idUser, rol } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (route: string) => {
    setIsMenuOpen(false);
    navigate(route);
  };

  return (
    <nav>
      <div className={`${styles.container} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles['logo-container']}>
          <img
            src={imagePath.icon2}
            className={styles['logo']}
            alt='Logo Sentirse Bien'
          />
          <span className={styles['logo-title']}>Spa Sentirse Bien</span>
        </div>

        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${styles['container-links']} ${isMenuOpen ? styles.show : ''}`}
        >
          {(!username || (username && rol === 'CUSTOMER')) && (
            <>
              <a
                className={styles['nav-link']}
                onClick={() => handleClick('/')}
              >
                Inicio
              </a>
              <a
                className={styles['nav-link']}
                onClick={() => handleClick('/servicios')}
              >
                Servicios
              </a>
            </>
          )}

          {username ? (
            <>
              {rol === 'ADMIN' && (
                <a
                  className={styles['nav-link']}
                  onClick={() => handleClick('/admin')}
                >
                  Administrador
                </a>
              )}

              {rol === 'CUSTOMER' && (
                <a
                  className={styles['nav-link']}
                  onClick={() => handleClick(`/mis-reservas/${idUser}`)}
                >
                  Mis reservas
                </a>
              )}

              <a
                className={styles['nav-link']}
                onClick={() => {
                  dispatch(clearToken());
                  handleClick('/');
                }}
              >
                Cerrar sesión
              </a>

              <p
                className={`${styles.bienvenido} ${isMenuOpen ? styles.open : ''}`}
              >
                Bienvenido {rol === 'ADMIN' ? 'Dra. Ana' : username}!
              </p>
            </>
          ) : (
            <a
              className={styles['nav-link']}
              onClick={() => dispatch(openModal({ type: 'AUTH' }))}
            >
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
