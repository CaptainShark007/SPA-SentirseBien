import { ReserveData } from '../reserve/reserve.types';

export interface ScheduleData
  extends Omit<
    ReserveData,
    'dateReserve' | 'userFullName' | 'serviceName' | 'status'
  > {
  endDate: string;
  maxCapacity: number;
  currentCapacity: number;
  isActive: boolean;
}

export interface ScheduleServiceData extends ScheduleData {
  service: string;
}
