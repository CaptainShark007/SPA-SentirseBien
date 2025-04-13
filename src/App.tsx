import { useState } from 'react';
import miLogo from './assets/logo.png';
import './App.css';
import NavBar from './components/navbar/NavBar';
import { apiLogin, apiRegister } from './features/auth/auth.api';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/auth.types';
import { AxiosRequest } from '@config/axios.config';

function App() {
  AxiosRequest();
  const login: Promise<LoginResponse> = (async () => {
    const data = await apiLogin({
      username: 'Hugazon',
      password: 'Hugo123',
    } as LoginPayload);
    return data;
  })();

  console.log(login);

  const register: Promise<RegisterResponse> = (async () => {
    const data = await apiRegister({
      username: 'Hugazon',
      firstName: 'Hugo',
      lastName: 'Hugo',
      password: 'Hugo123',
    } as RegisterPayload);
    return data;
  })();

  console.log(register);

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
    </>
  );
}

export default App;
