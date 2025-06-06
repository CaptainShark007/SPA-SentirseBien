import { useLocation } from 'react-router';
import './header.css';

const Header = () => {
  const location = useLocation();

  if (location.pathname !== '/') return <div className='not-header' />;
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

export default Header;
