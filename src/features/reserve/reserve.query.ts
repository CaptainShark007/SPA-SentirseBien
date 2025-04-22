import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiCreateReserve,
  apiDeleteReserve,
  apiGetReserve,
  apiListReserve,
  apiUpdateReserve,
} from './reserve.api';

export const useApiUpdateReserve = () =>
  useMutation({
    mutationFn: apiUpdateReserve,
  });

export const useApiCreateReserve = () =>
  useMutation({
    mutationFn: apiCreateReserve,
  });

export const useApiGetReserve = (id: number) =>
  useQuery({
    queryKey: ['reserve'],
    queryFn: () => apiGetReserve(id),
    enabled: false,
    retry: false,
  });

export const useApiListReserve = () =>
  useQuery({
    queryKey: ['listReserve'],
    queryFn: apiListReserve,
  });

export const useApiDeleteReserve = () =>
  useMutation({
    mutationFn: apiDeleteReserve,
  });
