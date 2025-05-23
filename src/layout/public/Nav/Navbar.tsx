import './navbar.css';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import imagePath from '@/constants/imagePath';
import { openModal } from '@/shared/slice/modal.slice';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { username, idUser } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  return (
    <nav>
      <div className='container'>
        <img src={imagePath.icon} alt='Logo Sentirse Bien' />

        <div className='container-links'>
          <a onClick={() => navigate('/')}>Inicio</a>
          <a onClick={() => navigate('/servicios')}>Servicios</a>

          {username ? (
            <>
              <a onClick={() => navigate(`/mis-reservas/${idUser}`)}>
                Mis Reservas
              </a>
              <p className='bienvenido'>Bienvenido {username}!</p>
            </>
          ) : (
            <a onClick={() => dispatch(openModal({ type: 'AUTH' }))}>
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
