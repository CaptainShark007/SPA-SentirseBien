import miLogo from './assets/logo.png';
import './App.css';
import NavBar from './components/navbar/NavBar';
import { LoginPayload } from '@/features/auth/auth.types';
import { useDispatch } from 'react-redux';
import { useApiLogin } from '@features/auth/auth.query';

function App() {
  const dispatch = useDispatch();
  const { mutate } = useApiLogin(dispatch);
  return (
    <>
      <NavBar>
        <div className='navbar-logo' style={{ minWidth: '50px' }}>
          <img
            src={miLogo}
            style={{ height: '60px', width: '80px' }}
            alt='Mi logo'
          />
        </div>
        <div className='navbar-links'>
          <a href='#'>Hotel y Servicio</a>
          <a href='#'>Habitaciones</a>
          <a href='#'>Promociones</a>
          <a href='#'>Restaurantes</a>
          <a href='#'>Spa y Gym</a>
        </div>
      </NavBar>
      <button
        onClick={() =>
          mutate({
            username: 'Hugazon',
            password: 'Hugo123',
          } as LoginPayload)
        }
      >
        Click me
      </button>
    </>
  );
}

export default App;
