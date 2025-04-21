import axiosInstance from '@/config/axios.config';
import { SpaData, SpaInfoData } from './spa.types';
import { ApiDataResponse } from '@/types/api';

class SpaService {
  updateSpa(id: number, data: SpaData): Promise<ApiDataResponse<SpaInfoData>> {
    return axiosInstance
      .put(`/api/service-spa/update/${id}`, data)
      .then((res) => res.data);
  }

  createSpa(data: SpaData): Promise<ApiDataResponse<SpaInfoData>> {
    return axiosInstance
      .post(`/api/service-spa/new`, data)
      .then((res) => res.data);
  }

  getSpa(id: number): Promise<ApiDataResponse<SpaInfoData>> {
    return axiosInstance.get(`/api/service-spa/${id}`).then((res) => res.data);
  }

  listSpa(): Promise<ApiDataResponse<SpaInfoData[]>> {
    return axiosInstance.get(`/api/service-spa/list`).then((res) => res.data);
  }

  deleteSpa(id: number): Promise<ApiDataResponse<string>> {
    return axiosInstance
      .delete(`/api/service-spa/delete/${id}`)
      .then((res) => res.data);
  }
}

export default new SpaService();
