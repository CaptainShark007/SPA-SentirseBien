import Button from '@components/Button/Button';
import './authModal.css';
import { closeModal } from '@/shared/slice/modal.slice';
import { useAppDispatch } from '@hooks/useRedux';
import { useRef, useState } from 'react';
import { useApiRegister } from '@features/hooks/useApiRegister';
import { useApiLogin } from '@features/hooks/useApiLogin';

const AuthModal = () => {
  // states
  const [formLogin, setFormLogin] = useState(true);
  const dispatch = useAppDispatch();

  // refs
  const loginFormRef = useRef<HTMLFormElement>(null);
  const registerFormRef = useRef<HTMLFormElement>(null);

  // apis
  const { login, isPending: loadingLogin } = useApiLogin();
  const { register, isPending: loadingRegister } = useApiRegister();

  // arrow functions
  const handleToggleForm = (isLogin: boolean) => {
    if (isLogin) {
      registerFormRef.current?.reset();
    } else {
      loginFormRef.current?.reset();
    }
    setFormLogin(isLogin);
  };

  return (
    <div className='modal-overlay' onClick={() => dispatch(closeModal())}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        <h2>{formLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {formLogin ? (
          <>
            <form className='modal-form' onSubmit={login} ref={loginFormRef}>
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

              <Button variant='outlined' onClick={() => dispatch(closeModal())}>
                Volver
              </Button>
              <div className='register-link'>
                <span>¿No tienes cuenta?</span>
                <a className='a-auth' onClick={() => handleToggleForm(false)}>
                  Regístrate
                </a>
              </div>
            </form>
          </>
        ) : (
          <>
            <form
              className='modal-form'
              onSubmit={register}
              ref={registerFormRef}
            >
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

              <Button variant='outlined' onClick={() => dispatch(closeModal())}>
                Volver
              </Button>
              <div className='register-link'>
                <span>¿Ya tienes una cuenta?</span>
                <a className='a-auth' onClick={() => handleToggleForm(true)}>
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
