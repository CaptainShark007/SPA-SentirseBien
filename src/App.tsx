import miLogo from './assets/logo.png';
import './App.css';
import NavBar from '@components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import { useApiLogin } from '@features/auth/auth.query';
import { setToken } from './features/auth/auth.slice';
import { useApiGetUser, useApiUpdateUser } from '@features/user/user.query';

function App() {
  const dispatch = useDispatch();
  const { mutate: login } = useApiLogin();
  const { data: response, refetch, isRefetching, isLoading } = useApiGetUser(1);
  const { mutate: updateUser } = useApiUpdateUser();

  if (response) console.log('Response', response);

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
          login(
            {
              username: 'Hugopro',
              password: 'Hugo123',
            },
            {
              onSuccess: (data) => {
                dispatch(setToken(data.token));
                console.log('Login successful', data);
              },
            }
          )
        }
      >
        Login
      </button>
      {(isRefetching || isLoading) && <p>Loading...</p>}
      <button
        onClick={() => {
          refetch();
        }}
      >
        Get user
      </button>
      <button
        onClick={() =>
          updateUser(
            {
              dataSend: {
                firstName: 'Hugo',
                lastName: 'Brocal',
                username: 'Hugopro',
                password: 'Hugo123',
              },
              id: 1,
            },
            {
              onSuccess: (data) => {
                console.log('Update successful', data);
              },
            }
          )
        }
      >
        Update user
      </button>
    </>
  );
}

export default App;
