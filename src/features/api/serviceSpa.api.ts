import AxiosClient from '@app/axios';
import { ServiceSpaService } from '@features/services/serviceSpa.service';
import { MethodPaymentData, Reserve } from '@features/types/serviceSpa.types';

const serviceSpaService = new ServiceSpaService(AxiosClient);

export const apiCreateReserve = async (dataSend: Reserve) =>
  serviceSpaService.createReserve(dataSend);

export const apiListSpa = async () => serviceSpaService.listSpa();

export const apiListProfessional = async () =>
  serviceSpaService.listProfessional();

export const apiGetService = async (id: number) =>
  serviceSpaService.getService(id);

export type ParamsAvailability = { id: number; date: string; days: number };
export const apiAvailability = async ({ id, date, days }: ParamsAvailability) =>
  serviceSpaService.availability(id, date, days);

export const apiMethodPayment = async (dataSend: MethodPaymentData) =>
  serviceSpaService.methodPayment(dataSend);

export const apiSendInvoice = async (id: number) =>
  serviceSpaService.sendInvoice(id);
