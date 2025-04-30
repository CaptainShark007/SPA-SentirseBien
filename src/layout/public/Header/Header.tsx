import './header.css';
import imagePath from '@/constants/imagePath';
import React from 'react';

interface HeaderProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setOpenModal }: HeaderProps) => {
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
            <a className='nav-menu-item' onClick={() => setOpenModal(true)}>
              Iniciar Sesión
            </a>
          </div>
        </div>
      </nav>
      {/* <div className='logo-container'>
          <img className='logo' src={imagePath.logo} alt='Logo Sentirse Bien' />
        </div> */}

      <div className='scroll-indicator'>
        <span className='arrow'>&#x25BC;</span>
      </div>
    </header>
  );
};

export default Header;
