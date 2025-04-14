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
    return axios.post(`/auth/login`, data).then(response => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    });
  }
}

export default new AuthService();
