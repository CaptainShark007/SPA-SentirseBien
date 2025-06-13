import { HttpClient } from '@/shared/types/httpClient';
import { ApiDataResponse } from '@/shared/types/api';
import { User, UserCreate } from '@features/types/admin.types';

export class AdminService {
  constructor(private readonly http: HttpClient) {}

  createUser(data: UserCreate) {
    return this.http.post<ApiDataResponse<string>>(`/api/admin/new-user`, data);
  }

  listUser() {
    return this.http.get<ApiDataResponse<User[]>>(`/api/user/list`);
  }
}
