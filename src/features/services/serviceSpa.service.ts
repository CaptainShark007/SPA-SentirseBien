import { HttpClient } from '@/shared/types/httpClient';
import {
  Available,
  Reserve,
  ReserveStatus,
  SpaInfoData,
} from '@features/types/serviceSpa.types';
import { ApiDataResponse } from '@/shared/types/api';
import { MetodoPagoData } from '@/shared/validations/metodoPagoSchema';

export class ServiceSpaService {
  constructor(private readonly http: HttpClient) {}

  listSpa() {
    return this.http.get<ApiDataResponse<SpaInfoData[]>>(
      `/api/service-spa/list`
    );
  }

  getService(id: number) {
    return this.http.get<ApiDataResponse<SpaInfoData>>(
      `/api/service-spa/${id}`
    );
  }

  availability(id: number, date: string, days: number) {
    return this.http.get<ApiDataResponse<Available[]>>(
      `/api/availability?serviceId=${id}&date=${date}&days=${days}`
    );
  }

  createReserve(dataSend: Reserve) {
    return this.http.post<ApiDataResponse<ReserveStatus>>(
      `/api/reserve/new`,
      dataSend
    );
  }

  methodPayment(dataSend: MetodoPagoData) {
    return this.http.post<ApiDataResponse<string>>(`/api/invoice`, dataSend);
  }
}
