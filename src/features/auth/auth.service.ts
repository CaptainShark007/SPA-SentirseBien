import { ApiAuthResponse, UserLogin, UserRegister } from './auth.types';
import axiosInstance from '@/config/axios.config';

class AuthService {
  register(data: UserRegister): Promise<ApiAuthResponse> {
    return axiosInstance.post(`/auth/register`, data).then((res) => res.data);
  }

  login(data: UserLogin): Promise<ApiAuthResponse> {
    return axiosInstance.post(`/auth/login`, data).then((res) => res.data);
  }
}

export default new AuthService();
