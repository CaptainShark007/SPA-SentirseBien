import Button from '@components/Button/Button';
import './authModal.css';
import { closeModal } from '@components/ModalRenderer/modal.slice';
import { showSnackbar } from '@components/SnackBar/snackBar.slice';
import { useApiLogin, useApiRegister } from '@features/auth/auth.query';
import { setToken } from '@features/auth/auth.slice';
import { useAppDispatch } from '@hooks/useRedux';
import React, { useState } from 'react';

const AuthModal = () => {
  // states
  const [formLogin, setFormLogin] = useState(true);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // apis
  const { mutate: login } = useApiLogin();
  const { mutate: register } = useApiRegister();

  // handles
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('user') as string;
    const password = formData.get('password') as string;

    login(
      {
        username,
        password,
      },
      {
        onSuccess: (data) => {
          dispatch(
            setToken({
              token: data?.token,
              username: data?.username,
              idUser: data?.idUser,
            })
          );

          setLoading(false);

          dispatch(
            showSnackbar({
              type: 'success',
              duration: 3000,
              message: 'Inicio de sesión exitoso',
            })
          );

          dispatch(closeModal());
        },
        onError: () => {
          setLoading(false);

          dispatch(
            showSnackbar({
              type: 'error',
              duration: 3000,
              message: 'Error al iniciar sesión, revise los datos ingresados',
            })
          );
        },
      }
    );
  };

  const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const username = formData.get('user') as string;
    const password = formData.get('password') as string;

    register(
      {
        firstName,
        lastName,
        username,
        password,
      },
      {
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: 'success',
              duration: 3000,
              message: 'Registro exitoso',
            })
          );
          setFormLogin(true);
          dispatch(closeModal());
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: 'error',
              duration: 3000,
              message: 'Error al registrarse, revise los datos ingresados',
            })
          );
        },
      }
    );
  };

  return (
    <div className='modal-overlay' onClick={() => dispatch(closeModal())}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        {formLogin ? (
          <>
            <h2>Iniciar Sesión</h2>
            <form className='modal-form' onSubmit={handleSubmitLogin}>
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
                loading={loading}
                disabled={loading}
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
            <form className='modal-form' onSubmit={handleSubmitRegister}>
              <div className='input-group'>
                <input type='text' id='first-name' name='first-name' required />
                <label htmlFor='first-name'>Nombre/s</label>
              </div>
              <div className='input-group'>
                <input type='text' id='last-name' name='last-name' required />
                <label htmlFor='last-name'>Apellido/s</label>
              </div>
              <div className='input-group'>
                <input type='text' id='user' name='user' required />
                <label htmlFor='user'>Usuario</label>
              </div>

              <div className='input-group'>
                <input type='password' id='password' name='password' required />
                <label htmlFor='password'>Contraseña</label>
              </div>

              <button type='submit'>Registrar</button>

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
