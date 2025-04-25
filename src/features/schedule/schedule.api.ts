import scheduleService from './schedule.service';

export const apiGetSchedule = async (id: number) => {
  return await scheduleService.getSchedule(id);
};

export const apiGetScheduleService = async (id: number, date: string) => {
  return await scheduleService.getScheduleService(id, date);
};

export const apiListSchedule = async () => {
  return await scheduleService.listSchedule();
};

export const apiListScheduleService = async () => {
  return await scheduleService.listScheduleService();
};

export const apiGetScheduleInfo = async (id: number) => {
  return await scheduleService.getScheduleInfo(id);
};

export const apiListScheduleInfo = async (date: string) => {
  return await scheduleService.listScheduleInfo(date);
};

export const apiGetReserveInfo = async (id: number) => {
  return await scheduleService.getReserveInfo(id);
};

export const apiDeleteSchedule = async (id: number) => {
  return await scheduleService.deleteSchedule(id);
};

export const apiGetScheduleFilter = async (
  id: number | undefined,
  date: string,
  days: number
) => {
  return await scheduleService.getScheduleFilter(id, date, days);
};
