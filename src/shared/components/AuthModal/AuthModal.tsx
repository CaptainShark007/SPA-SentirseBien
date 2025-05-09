import Button from '@components/Button/Button';
import './authModal.css';
import { closeModal } from '@/shared/slice/modal.slice';
import { useAppDispatch } from '@hooks/useRedux';
import { useState } from 'react';
import { useApiRegister } from '@features/hooks/useApiRegister';
import { useApiLogin } from '@features/hooks/useApiLogin';

const AuthModal = () => {
  // states
  const [formLogin, setFormLogin] = useState(true);
  const dispatch = useAppDispatch();

  // apis
  const { login, isPending: loadingLogin } = useApiLogin();
  const { register, isPending: loadingRegister } = useApiRegister();

  return (
    <div className='modal-overlay' onClick={() => dispatch(closeModal())}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        {formLogin ? (
          <>
            <h2>Iniciar Sesión</h2>
            <form className='modal-form' onSubmit={login}>
              <div className='input-group'>
                <input type='text' id='user' name='user' required />
                <label htmlFor='user'>Usuario</label>
              </div>

              <div className='input-group'>
                <input type='password' id='password' name='password' required />
                <label htmlFor='password'>Contraseña</label>
              </div>

              <Button
                variant='contained'
                type='submit'
                loading={loadingLogin}
                disabled={loadingLogin}
              >
                Ingresar
              </Button>
              <div className='register-link'>
                <span>¿No tienes cuenta?</span>
                <a className='a-auth' onClick={() => setFormLogin(false)}>
                  Regístrate
                </a>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Registrarse</h2>
            <form className='modal-form' onSubmit={register}>
              <div className='input-group'>
                <input type='text' id='first-name' name='first-name' required />
                <label htmlFor='first-name'>Nombre/s</label>
              </div>
              <div className='input-group'>
                <input type='text' id='last-name' name='last-name' required />
                <label htmlFor='last-name'>Apellido/s</label>
              </div>
              <div className='input-group'>
                <input type='email' id='email' name='email' required />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-group'>
                <input type='text' id='user' name='user' required />
                <label htmlFor='user'>Usuario</label>
              </div>

              <div className='input-group'>
                <input type='password' id='password' name='password' required />
                <label htmlFor='password'>Contraseña</label>
              </div>

              <Button
                variant='contained'
                type='submit'
                loading={loadingRegister}
                disabled={loadingRegister}
              >
                Registrar
              </Button>

              <div className='register-link'>
                <span>¿Ya tienes una cuenta?</span>
                <a className='a-auth' onClick={() => setFormLogin(true)}>
                  Inicia Sesión
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
