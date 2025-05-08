import {
  apiCreateUser,
  apiDeleteUser,
  apiDeleteUserReserve,
  apiGetUser,
  apiListUser,
  apiListUserReserve,
  apiUpdateUser,
} from './user.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserData } from './user.types';
import { ApiDataResponse } from '@/shared/types/api';

export const useApiUpdateUser = () =>
  useMutation({
    mutationFn: apiUpdateUser,
  });

export const useApiCreateUser = () =>
  useMutation({
    mutationFn: apiCreateUser,
  });

export const useApiGetUser = (id: number) =>
  useQuery<ApiDataResponse<UserData>>({
    queryKey: ['user', id],
    queryFn: () => apiGetUser(id),
    enabled: false,
    retry: false,
  });

export const useApiListUser = () =>
  useQuery<ApiDataResponse<UserData[]>>({
    queryKey: ['listUser'],
    queryFn: apiListUser,
  });

export const useApiListUserReserve = (id: number) =>
  useQuery({
    queryKey: ['listUserReserve'],
    queryFn: () => apiListUserReserve(id),
  });

export const useApiDeleteUserReserve = () =>
  useMutation({
    mutationFn: ({
      userId,
      reserveId,
    }: {
      userId: number;
      reserveId: number;
    }) => apiDeleteUserReserve(userId, reserveId),
  });

export const useApiDeleteUser = () =>
  useMutation({
    mutationFn: apiDeleteUser,
  });
