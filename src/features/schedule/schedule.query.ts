import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiDeleteSchedule,
  apiGetReserveInfo,
  apiGetSchedule,
  apiGetScheduleInfo,
  apiGetScheduleService,
  apiListSchedule,
  apiListScheduleInfo,
} from './schedule.api';

export const useApiGetSchedule = (id: number) =>
  useQuery({
    queryKey: ['schedule'],
    queryFn: () => apiGetSchedule(id),
    enabled: false,
    retry: false,
  });

export const useApiGetScheduleService = (id: number, date: string) =>
  useQuery({
    queryKey: ['scheduleService'],
    queryFn: () => apiGetScheduleService(id, date),
    enabled: false,
    retry: false,
  });

export const useApiListSchedule = () =>
  useQuery({
    queryKey: ['listSchedule'],
    queryFn: apiListSchedule,
  });

export const useApiListScheduleService = () =>
  useQuery({
    queryKey: ['listScheduleService'],
    queryFn: apiListSchedule,
  });

export const useApiGetScheduleInfo = (id: number) =>
  useQuery({
    queryKey: ['scheduleInfo'],
    queryFn: () => apiGetScheduleInfo(id),
    enabled: false,
    retry: false,
  });

export const useApiListScheduleInfo = (date: string) =>
  useQuery({
    queryKey: ['listScheduleInfo'],
    queryFn: () => apiListScheduleInfo(date),
  });

export const useApiGetReserveInfo = (id: number) =>
  useQuery({
    queryKey: ['reserveInfo'],
    queryFn: () => apiGetReserveInfo(id),
    enabled: false,
    retry: false,
  });

export const useApiDeleteSchedule = () =>
  useMutation({
    mutationKey: ['deleteSchedule'],
    mutationFn: apiDeleteSchedule,
  });
