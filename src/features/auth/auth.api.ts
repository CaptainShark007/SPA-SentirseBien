import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/auth.types';
import authService from '@/features/auth/auth.service';

export const apiRegister = async (
  dataSend: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await authService.register(dataSend);

  return data;
};

export const apiLogin = async (
  dataSend: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await authService.login(dataSend);

  return data;
};
