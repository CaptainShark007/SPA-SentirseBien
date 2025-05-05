import { UserRegister } from '@features/auth/auth.types';
import userService from './user.service';
import { ApiParameters } from '@/shared/types/api';

export const apiUpdateUser = async ({
  id,
  dataSend,
}: ApiParameters<UserRegister>) => {
  return await userService.updateUser(id, dataSend);
};

export const apiCreateUser = async (dataSend: UserRegister) => {
  return await userService.createUser(dataSend);
};

export const apiGetUser = async (id: number) => {
  return await userService.getUser(id);
};

export const apiListUser = async () => {
  return await userService.listUser();
};

export const apiDeleteUser = async (id: number) => {
  return await userService.deleteUser(id);
};
