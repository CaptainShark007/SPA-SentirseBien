import { UserLogin, UserRegister } from './auth.types';
import authService from '@/features/auth/auth.service';

export const apiRegister = async (dataSend: UserRegister) => {
  return await authService.register(dataSend);
};

export const apiLogin = async (dataSend: UserLogin) => {
  return await authService.login(dataSend);
};
