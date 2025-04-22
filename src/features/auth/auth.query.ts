import { useMutation } from '@tanstack/react-query';
import { apiLogin, apiRegister } from '@features/auth/auth.api';

export const useApiRegister = () =>
  useMutation({
    mutationFn: apiRegister,
  });

export const useApiLogin = () =>
  useMutation({
    mutationFn: apiLogin,
  });
