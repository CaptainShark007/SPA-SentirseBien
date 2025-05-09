import { HttpClient } from '@/shared/types/httpClient';
import {
  ApiAuthResponse,
  UserLogin,
  UserRegister,
} from '@features/types/auth.types';

export class AuthService {
  constructor(private readonly http: HttpClient) {}

  register(data: UserRegister) {
    return this.http.post<ApiAuthResponse>(`/auth/register`, data);
  }

  login(data: UserLogin) {
    return this.http.post<ApiAuthResponse>(`/auth/login`, data);
  }
}
