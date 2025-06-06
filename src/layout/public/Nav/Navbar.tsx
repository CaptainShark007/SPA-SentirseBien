import './navbar.css';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import imagePath from '@/constants/imagePath';
import { openModal } from '@/shared/slice/modal.slice';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { clearToken } from '@/shared/slice/auth.slice';

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
      <div className={`container ${isMenuOpen ? 'open' : ''}`}>
        <div className='logo-container'>
          <img
            src={imagePath.icon2}
            className='logo'
            alt='Logo Sentirse Bien'
          />
          <span className='logo-title'>Spa Sentirse Bien</span>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`container-links ${isMenuOpen ? 'show' : ''}`}>
          <a className='nav-link' onClick={() => handleClick('/')}>
            Inicio
          </a>
          <a className='nav-link' onClick={() => handleClick('/servicios')}>
            Servicios
          </a>

          {username ? (
            <>
              <a
                className='nav-link'
                onClick={() => handleClick(`/mis-reservas/${idUser}`)}
              >
                Mis reservas
              </a>

              {rol === 'ADMIN' && (
                <a className='nav-link' onClick={() => handleClick(`/admin`)}>
                  Administrador
                </a>
              )}

              <a
                className='nav-link'
                onClick={() => {
                  dispatch(clearToken());
                  handleClick('/');
                }}
              >
                Cerrar sesión
              </a>
              <p className={`bienvenido ${isMenuOpen ? 'open' : ''}`}>
                Bienvenido {rol === 'ADMIN' ? 'Dra. Ana' : username}!
              </p>
            </>
          ) : (
            <a
              className='nav-link'
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
