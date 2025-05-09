import { HttpClient } from '@/shared/types/httpClient';
import { ApiDataResponse } from '@/shared/types/api';
import { ReservationHistory } from '@features/types/user.types';

export class UserService {
  constructor(private readonly http: HttpClient) {}

  listUserReserve(id: number) {
    return this.http.get<ApiDataResponse<ReservationHistory>>(
      `/api/user/customer/reservation-history/${id}`
    );
  }

  deleteUserReserve(userId: number, reserveId: number) {
    return this.http.put<ApiDataResponse<string>>(
      `/api/user/customer/${userId}/cancel-reservation/${reserveId}`
    );
  }
}
