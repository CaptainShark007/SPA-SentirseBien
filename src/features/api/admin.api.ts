import AxiosClient from '@app/axios';
import { AdminService } from '@features/services/admin.service';
import { UserCreate } from '@features/types/admin.types';

const adminService = new AdminService(AxiosClient);

export const apiCreateUser = async (dataSend: UserCreate) =>
  adminService.createUser(dataSend);

export const apiListUser = async () => adminService.listUser();
