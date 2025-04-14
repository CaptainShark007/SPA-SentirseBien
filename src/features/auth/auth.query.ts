import { useMutation } from '@tanstack/react-query';
import { apiLogin } from '@features/auth/auth.api';
import { setToken } from '@features/auth/auth.slice';
import { Dispatch } from '@reduxjs/toolkit';

export const useApiLogin = (dispatch: Dispatch<any>) =>
  useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      dispatch(setToken(data.token));

      console.log('Login successful:', data);
    },
  });
