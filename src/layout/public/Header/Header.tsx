import { useEffect } from 'react';
import './header.css';
import imagePath from '@constants/imagePath';

const Header = () => {
  // Función para asegurar que no haya scroll horizontal
  useEffect(() => {
    // Asegura que el body y html tengan el comportamiento correcto
    document.documentElement.style.overflow = 'hidden auto';
    document.body.style.overflow = 'hidden auto';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';
    
    return () => {
      // Limpieza cuando el componente se desmonte
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.width = '';
      document.body.style.width = '';
    };
  }, []);

  // Función para desplazarse hacia abajo al hacer clic en el indicador
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <header className="hero-header">
      <div className="overlay"></div>
      <div className="header-content">
        <img src={imagePath.logoFooter} alt="Sentirse Bien Spa Logo" className="header-logo" />
        <h2 className="header-subtitle">Bienvenidos a</h2>
        <h1 className="header-title">Sentirse Bien</h1>
      </div>
      <div className="scroll-indicator" onClick={handleScrollDown}>
        <span>&#x25BC;</span>
      </div>
    </header>
  );
};

export default Header;

/* import './header.css';

const Header = () => {
  return (
    <header>
      <h2>Bienvenidos a</h2>
      <h1>Sentirse Bien</h1>

      <div>
        <span>&#x25BC;</span>
      </div>
    </header>
  );
};

export default Header; */