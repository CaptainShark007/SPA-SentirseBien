import axiosInstance from '@/config/axios.config';
import { ReserveData, ReserveStatus } from './reserve.types';
import { ApiDataResponse } from '@/types/api';

class ReserveService {
  updateReserve(
    id: number,
    dataSend: ReserveStatus
  ): Promise<ApiDataResponse<ReserveData>> {
    return axiosInstance
      .put(`/api/reserve/update/${id}`, dataSend)
      .then((res) => res.data);
  }

  createReserve(
    dataSend: ReserveStatus
  ): Promise<ApiDataResponse<ReserveData>> {
    return axiosInstance
      .post(`/api/reserve/new`, dataSend)
      .then((res) => res.data);
  }

  getReserve(id: number): Promise<ApiDataResponse<ReserveData>> {
    return axiosInstance.get(`/api/reserve/info/${id}`).then((res) => res.data);
  }

  listReserve(): Promise<ApiDataResponse<ReserveData[]>> {
    return axiosInstance.get(`/api/reserve/list-info`).then((res) => res.data);
  }

  deleteReserve(id: number): Promise<ApiDataResponse<string>> {
    return axiosInstance
      .delete(`/api/reserve/delete/${id}`)
      .then((res) => res.data);
  }
}

export default new ReserveService();
