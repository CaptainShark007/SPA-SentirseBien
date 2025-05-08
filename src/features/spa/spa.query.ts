import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiCreateSpa,
  apiDeleteSpa,
  apiGetSpa,
  apiListSpa,
  apiUpdateSpa,
} from './spa.api';

export const useApiUpdateSpa = () =>
  useMutation({
    mutationFn: apiUpdateSpa,
  });

export const useApiCreateSpa = () =>
  useMutation({
    mutationFn: apiCreateSpa,
  });

export const useApiGetSpa = (id: number) =>
  useQuery({
    queryKey: ['spa'],
    queryFn: () => apiGetSpa(id),
    enabled: false,
    retry: false,
  });

export const useApiListSpa = () =>
  useQuery({
    queryKey: ['listSpa'],
    queryFn: apiListSpa,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

export const useApiDeleteSpa = () =>
  useMutation({
    mutationFn: apiDeleteSpa,
  });
