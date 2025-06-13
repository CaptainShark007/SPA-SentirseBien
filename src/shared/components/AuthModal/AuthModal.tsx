import Button from '@components/Button/Button';
import { closeModal } from '@/shared/slice/modal.slice';
import { useAppDispatch } from '@hooks/useRedux';
import { useState } from 'react';
import { useApiRegister } from '@features/hooks/useApiRegister';
import { useApiLogin } from '@features/hooks/useApiLogin';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData, LoginSchema } from '@/shared/validations/loginSchema';
import styles from '@components/AuthModal/AuthModal.module.css';
import {
  RegisterData,
  RegisterSchema,
} from '@/shared/validations/registerSchema';
import ControlledInput from '@components/Controlled/ControlledInput/ControlledInput';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();

  const { login, isPending: loadingLogin } = useApiLogin();
  const { register, isPending: loadingRegister } = useApiRegister();

  const formLogin = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const formRegister = useForm<RegisterData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
    },
  });

  const { handleSubmit: submitLogin } = formLogin;
  const { handleSubmit: submitRegister } = formRegister;

  const onSubmitLogin: SubmitHandler<LoginData> = (data) => {
    login(data);
  };
  const onSubmitRegister: SubmitHandler<RegisterData> = (data) => {
    register(data);
  };

  const handleToggleForm = (isLogin: boolean) => {
    if (isLogin) {
      formRegister.reset();
    } else {
      formLogin.reset();
    }
    setIsLogin(isLogin);
  };

  return (
    <ContainerModal onCloseModal={() => dispatch(closeModal())}>
      <div className={styles['login-body']}>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {isLogin ? (
          <FormProvider {...formLogin}>
            <form
              key='login'
              className={styles['login-form']}
              onSubmit={submitLogin(onSubmitLogin)}
            >
              <ControlledInput
                name='username'
                label='Usuario'
                nextInputName='password'
              />

              <ControlledInput
                name='password'
                label='Contraseña'
                type='password'
              />

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

              <div className={styles['register-link']}>
                <span>¿No tienes cuenta?</span>
                <a
                  className={styles['a-auth']}
                  onClick={() => handleToggleForm(false)}
                >
                  Regístrate
                </a>
              </div>
            </form>
          </FormProvider>
        ) : (
          <FormProvider {...formRegister}>
            <form
              key='register'
              className={styles['login-form']}
              onSubmit={submitRegister(onSubmitRegister)}
            >
              <ControlledInput
                name='firstName'
                label='Nombre/s'
                nextInputName='lastName'
              />
              <ControlledInput
                name='lastName'
                label='Apellido/s'
                nextInputName='email'
              />
              <ControlledInput
                name='email'
                label='Email'
                nextInputName='phone'
              />
              <ControlledInput
                name='phone'
                label='Teléfono'
                nextInputName='password'
              />
              <ControlledInput
                name='username'
                label='Usuario'
                nextInputName='password'
              />

              <ControlledInput
                name='password'
                label='Contraseña'
                type='password'
              />

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
              <div className={styles['register-link']}>
                <span>¿Ya tienes una cuenta?</span>
                <a
                  className={styles['a-auth']}
                  onClick={() => handleToggleForm(true)}
                >
                  Inicia Sesión
                </a>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </ContainerModal>
  );
};

export default AuthModal;
