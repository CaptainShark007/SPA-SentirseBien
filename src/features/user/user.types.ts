import { UserRegister } from '@features/auth/auth.types';

export interface UserData extends UserRegister {
  id: number;
  createAt: string;
  updateAt: string;
  roleName: string;
}
