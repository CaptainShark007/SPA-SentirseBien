import AxiosClient from '@app/axios';
import { AuthService } from '@features/services/auth.service';
import { UserLogin, UserRegister } from '@features/types/auth.types';

const authService = new AuthService(AxiosClient);

export const apiRegister = async (dataSend: UserRegister) =>
  authService.register(dataSend);

export const apiLogin = async (dataSend: UserLogin) =>
  authService.login(dataSend);
