import { useAppDispatch } from '@hooks/useRedux';
import './header.css';
import imagePath from '@/constants/imagePath';
import { openModal } from '@components/ModalRenderer/modal.slice';

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header style={{ alignItems: 'flex-start' }}>
      <nav className='compact-nav'>
        <div className='nav-wrapper'>
          <img
            src={imagePath.icon}
            alt='Logo Sentirse Bien'
            className='compact-logo'
          />
          <div className='nav-menu-links'>
            <a
              className='nav-menu-item'
              onClick={() => dispatch(openModal({ type: 'AUTH' }))}
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </nav>
      <div className='scroll-indicator'>
        <span className='arrow'>&#x25BC;</span>
      </div>
    </header>
  );
};

export default Header;
