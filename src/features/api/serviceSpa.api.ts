import { MetodoPagoData } from '@/shared/validations/metodoPagoSchema';
import AxiosClient from '@app/axios';
import { ServiceSpaService } from '@features/services/serviceSpa.service';
import { Reserve } from '@features/types/serviceSpa.types';

const serviceSpaService = new ServiceSpaService(AxiosClient);

export const apiCreateReserve = async (dataSend: Reserve) =>
  serviceSpaService.createReserve(dataSend);

export const apiListSpa = async () => serviceSpaService.listSpa();

export const apiGetService = async (id: number) =>
  serviceSpaService.getService(id);

export type ParamsAvailability = { id: number; date: string; days: number };
export const apiAvailability = async ({ id, date, days }: ParamsAvailability) =>
  serviceSpaService.availability(id, date, days);

export const apiMethodPayment = async (dataSend: MetodoPagoData) =>
  serviceSpaService.methodPayment(dataSend);
