import './navbar.css';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import imagePath from '@/constants/imagePath';
import { openModal } from '@/shared/slice/modal.slice';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { username, idUser } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Estado para el menú desplegable
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Manejadores para el menú desplegable
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNavigation = (path: string) => {
    handleClose();
    navigate(path);
  };

  // Manejador mejorado para cerrar el menú con transición suave
  const handleToggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      // Esperar a que termine la animación antes de cerrar completamente
      // Aumentado a 500ms para coincidir con la transición CSS más lenta
      setTimeout(() => {
        setIsOpen(false);
        // Pequeño retraso adicional antes de quitar la clase de cierre
        setTimeout(() => {
          setIsClosing(false);
        }, 50);
      }, 500);
    } else {
      setIsOpen(true);
    }
  };

  // Cerrar el menú al navegar
  const handleNavigation = ({path} : any) => {
    if (isOpen) {
      handleToggleMenu();
      // Navegar después de que se complete la animación
      setTimeout(() => {
        navigate(path);
      }, 550);
    } else {
      navigate(path);
    }
  };

  // Cerrar el menú cuando se redimensiona la ventana a un tamaño de escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        setIsClosing(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav>
      <div className='container'>
        <img src={imagePath.logo} alt='Logo Sentirse Bien' />
        
        {/* Botón Hamburguesa (solo en móviles) */}
        <button 
          className={`hamburger ${isOpen ? 'is-active' : ''}`} 
          onClick={handleToggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación con estado mejorado */}
        <div 
          className={`container-links ${isOpen ? 'is-active' : ''} ${isClosing ? 'is-closing' : ''}`}
        >
          <a onClick={() => handleNavigation('/')}>Inicio</a>
          <a onClick={() => handleNavigation('/')}>Citas</a>
          {/* <a onClick={() => handleNavigation('/')}>Sobre Nosotros</a> */}
          <a onClick={() => handleNavigation('/')}>Contacto</a>
          {/* <a onClick={() => handleNavigation('/')}>Ubicacion</a> */}

          {/* Menú desplegable de Gestión */}
          {username && (
            <>
              <Button
                id="gestion-button"
                aria-controls={open ? 'gestion-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: 'var(--text-color)',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  '&:hover': {
                    color: 'var(--accent-color)',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Gestión
              </Button>
              <Menu
                id="gestion-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'gestion-button',
                }}
                PaperProps={{
                  style: {
                    marginTop: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <MenuItem onClick={() => handleMenuNavigation('/')}>Clientes</MenuItem>
                <MenuItem onClick={() => handleMenuNavigation('/')}>Reservas</MenuItem>
                <MenuItem onClick={() => handleMenuNavigation('/')}>Servicios</MenuItem>
                <MenuItem onClick={() => handleMenuNavigation('/')}>Empleados</MenuItem>
              </Menu>
            </>
          )}

          {username ? (
            <>
              <a onClick={() => navigate(`/mis-reservas/${idUser}`)}>
                Mis reservas
              </a>
              <a onClick={() => handleNavigation('/')}>Mi perfil</a>
              <a onClick={() => handleNavigation('/')}>Cerrar Sesión</a>
              <p className='bienvenido'>| Bienvenido {username}!</p>
            </>
          ) : (
            <a onClick={() => {
              if (isOpen) {
                handleToggleMenu();
                setTimeout(() => {
                  dispatch(openModal({ type: 'AUTH' }));
                }, 550);
              } else {
                dispatch(openModal({ type: 'AUTH' }));
              }
            }}>
              Iniciar Sesión
            </a>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

/* 
        <div 
          className={`container-links ${isOpen ? 'is-active' : ''} ${isClosing ? 'is-closing' : ''}`}
        >
          <a onClick={() => handleNavigation('/')}>Servicios</a>
          <a onClick={() => handleNavigation('/')}>Sobre Nosotros</a>
          <a onClick={() => handleNavigation('/')}>Contacto</a>
          <a onClick={() => handleNavigation('/')}>Ubicacion</a>

          {username ? (
            <>
              <a onClick={() => handleNavigation('/')}>Inicio</a>
              <a onClick={() => handleNavigation(`/mis-reservas/${idUser}`)}>
                Mis reservas
              </a>
              <a onClick={() => handleNavigation('/')}>Mi perfil</a>
              <a onClick={() => handleNavigation('/')}>Cerrar Sesión</a>
              <p className='bienvenido'>| Bienvenido {username}!</p>
            </>
          ) : (
            <a onClick={() => {
              if (isOpen) {
                handleToggleMenu();
                setTimeout(() => {
                  dispatch(openModal({ type: 'AUTH' }));
                }, 550);
              } else {
                dispatch(openModal({ type: 'AUTH' }));
              }
            }}>
              Iniciar Sesión
            </a>
          )}
*/