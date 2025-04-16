import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/auth.types';
import axiosInstance from '@/config/axios.config';

class AuthService {
  register(data: RegisterPayload): Promise<{ data: RegisterResponse }> {
    return axiosInstance.post(`/auth/register`, data);
  }

  login(data: LoginPayload): Promise<{ data: LoginResponse }> {
    return axiosInstance.post(`/auth/login`, data);
  }
}

export default new AuthService();
