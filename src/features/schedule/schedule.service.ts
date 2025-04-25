import axiosInstance from '@/config/axios.config';
import { ScheduleData, ScheduleServiceData } from './schedule.types';
import { ReserveData } from '../reserve/reserve.types';

class ScheduleService {
  getSchedule(id: number): Promise<ScheduleData> {
    return axiosInstance.get(`api/schedule/${id}`).then((res) => res.data);
  }

  getScheduleService(id: number, date: string): Promise<ScheduleServiceData> {
    return axiosInstance
      .get(`api/schedule/service/${id}/date/${date}`)
      .then((res) => res.data);
  }

  listSchedule(): Promise<ScheduleData> {
    return axiosInstance.get('api/schedule/list').then((res) => res.data);
  }

  listScheduleService(): Promise<ScheduleServiceData> {
    return axiosInstance.get(`api/schedule/list-info`).then((res) => res.data);
  }

  getScheduleInfo(id: number): Promise<ScheduleServiceData> {
    return axiosInstance.get(`api/schedule/info/${id}`).then((res) => res.data);
  }

  listScheduleInfo(date: string): Promise<ScheduleServiceData> {
    return axiosInstance
      .get(`api/schedule/info-date/${date}`)
      .then((res) => res.data);
  }

  getReserveInfo(id: number): Promise<ReserveData> {
    return axiosInstance.get(`api/reserve/info/${id}`).then((res) => res.data);
  }

  deleteSchedule(id: number): Promise<ScheduleData> {
    return axiosInstance
      .delete(`api/schedule/delete/${id}`)
      .then((res) => res.data);
  }

  getScheduleFilter(
    id: number | undefined,
    date: string,
    days: number
  ): Promise<ScheduleServiceData[]> {
    return axiosInstance
      .get(`/api/availability?serviceId=${id}&date=${date}&days=${days}`)
      .then((res) => res.data);
  }
}

export default new ScheduleService();
