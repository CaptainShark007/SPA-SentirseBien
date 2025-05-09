import { closeModal } from '@/shared/slice/modal.slice';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiRegister } from '@features/api/auth.api';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

export const useApiRegister = () => {
  const { mutate, isPending } = useMutation({ mutationFn: apiRegister });
  const dispatch = useAppDispatch();

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const username = formData.get('user') as string;
    const password = formData.get('password') as string;

    mutate(
      {
        firstName,
        lastName,
        email,
        username,
        password,
      },
      {
        onSuccess: () => {
          dispatch(
            showSnackbar({
              type: 'success',
              duration: 3000,
              message: 'Registro exitoso',
            })
          );
          dispatch(closeModal());
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: 'error',
              duration: 3000,
              message: 'Error al registrarse, revise los datos ingresados',
            })
          );
        },
      }
    );
  };

  return { register, isPending };
};
