import { useMutation } from '@tanstack/react-query';
import { apiLogin } from '@features/auth/auth.api';

export const useApiRegister = () =>
  useMutation({
    mutationFn: apiLogin,
  });

export const useApiLogin = () =>
  useMutation({
    mutationFn: apiLogin,
  });
