import axiosInstance from '@/app/axios';
import { UserData } from './user.types';
import { UserRegister } from '@features/auth/auth.types';
import { ApiDataResponse } from '@/shared/types/api';

class UserService {
  updateUser(
    id: number,
    data: UserRegister
  ): Promise<ApiDataResponse<UserData>> {
    return axiosInstance
      .put(`/api/user/update/${id}`, data)
      .then((res) => res.data);
  }

  createUser(data: UserRegister): Promise<ApiDataResponse<UserData>> {
    return axiosInstance.post(`/api/user/new`, data).then((res) => res.data);
  }

  getUser(id: number): Promise<ApiDataResponse<UserData>> {
    return axiosInstance.get(`/api/user/${id}`).then((res) => res.data);
  }

  listUser(): Promise<ApiDataResponse<UserData[]>> {
    return axiosInstance.get(`/api/user/list`).then((res) => res.data);
  }

  deleteUser(id: number): Promise<ApiDataResponse<string>> {
    return axiosInstance
      .delete(`/api/user/delete/${id}`)
      .then((res) => res.data);
  }
}

export default new UserService();
