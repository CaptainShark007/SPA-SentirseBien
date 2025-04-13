import axios from 'axios';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/auth.types';

class AuthService {
  register(data: RegisterPayload): Promise<{ data: RegisterResponse }> {
    return axios.post(`/auth/register`, data);
  }

  login(data: LoginPayload): Promise<{ data: LoginResponse }> {
    return axios.post(`/auth/login`, data);
  }
}

export default new AuthService();
