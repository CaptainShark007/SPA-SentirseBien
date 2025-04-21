import { ApiParameters } from '@/types/api';
import { SpaData } from './spa.types';
import SpaService from './spa.service';

export const apiUpdateSpa = async ({
  id,
  dataSend,
}: ApiParameters<SpaData>) => {
  return await SpaService.updateSpa(id, dataSend);
};

export const apiCreateSpa = async (dataSend: SpaData) => {
  return await SpaService.createSpa(dataSend);
};

export const apiGetSpa = async (id: number) => {
  return await SpaService.getSpa(id);
};

export const apiListSpa = async () => {
  return await SpaService.listSpa();
};

export const apiDeleteSpa = async (id: number) => {
  return await SpaService.deleteSpa(id);
};
