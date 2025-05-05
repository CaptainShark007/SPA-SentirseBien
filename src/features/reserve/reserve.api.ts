import { ApiParameters } from '@/shared/types/api';
import reserveService from './reserve.service';
import { ReserveStatus } from './reserve.types';

export const apiUpdateReserve = async ({
  id,
  dataSend,
}: ApiParameters<ReserveStatus>) => {
  return await reserveService.updateReserve(id, dataSend);
};

export const apiCreateReserve = async (dataSend: ReserveStatus) => {
  return await reserveService.createReserve(dataSend);
};

export const apiGetReserve = async (id: number) => {
  return await reserveService.getReserve(id);
};

export const apiListReserve = async () => {
  return await reserveService.listReserve();
};

export const apiDeleteReserve = async (id: number) => {
  return await reserveService.deleteReserve(id);
};
