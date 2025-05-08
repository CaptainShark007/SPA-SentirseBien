import { ApiReponse } from '@/shared/types/api';

export interface UserLogin {
  username: string;
  password: string;
}
export interface UserRegister extends UserLogin {
  firstName: string;
  lastName: string;
}

export interface ApiAuthResponse extends ApiReponse {
  token: string;
  username: string;
  idUser: number;
}
