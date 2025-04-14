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

import { apiDeleteUserById, apiFindUserById, apiNewUser, apiUpdateUserById, apiUserList } from './features/user/user.api';
import {
  UserData,
  UserResponse
} from '@/features/user/user.types';

import { AxiosRequest } from '@config/axios.config';

function App() {

  AxiosRequest();

  /* const login: Promise<LoginResponse> = (async () => {
    const data = await apiLogin({
      username: 'diego',
      password: '2004',
    } as LoginPayload);
    return data;
  })();

  console.log(login); */

  /* const register: Promise<RegisterResponse> = (async () => {
    const data = await apiRegister({
      username: 'Hugazon',
      firstName: 'Hugo',
      lastName: 'Hugo',
      password: 'Hugo123',
    } as RegisterPayload);
    return data;
  })();

  console.log(register); */

  // ***************************************DIEGO***************************************************

  // funciona -> nuevo usuario /api/user/new
 /*  const newUserTest: Promise<UserResponse> = (async () => {

    const response = await apiNewUser({
      username: 'juan',
      password: '2010',
      firstName: 'Juan',
      lastName: 'Gomez',
    } as UserData);

    return response;

  })();

  console.log(newUserTest); */

  // funciona -> /api/user/list
  /* const userListTest: Promise<UserResponse> = (async () => {
    const response = await apiUserList();
    return response;
  })();

  console.log(userListTest); */

  // funciona -> /api/user/{id}
  /* const findUserByIdTest: Promise<UserResponse> = (async () => {
    let id: number = 3;
    const response = await apiFindUserById(id);
    return response;
  })();
  console.log(findUserByIdTest); */

  // funciona -> /api/user/update/{id}
  /* const updateUserByIdTest: Promise<UserResponse> = (async () => {
    let id: number = 4;
    const response = await apiUpdateUserById(
      id, {
        username: 'messi',
        password: '2014',
        firstName: 'Lio',
        lastName: 'Messi',
      } as UserData);
      return response;
  })();
  console.log(updateUserByIdTest); */

  // -> /api/user/delete/{id}
  const deleteByIdTest: Promise<UserResponse> = (async () => {
    let id: number = 9;
    const response = await apiDeleteUserById(id);
    return response;
  })();
  console.log('Usuario eliminado con exito', deleteByIdTest);

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
