import { closeModal } from '@/shared/slice/modal.slice';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiLogin } from '@features/api/auth.api';
import { setToken } from '@/shared/slice/auth.slice';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation } from '@tanstack/react-query';
import { LoginData } from '@/shared/validations/loginSchema';

export const useApiLogin = () => {
  const { mutate, isPending } = useMutation({ mutationFn: apiLogin });
  const dispatch = useAppDispatch();

  const login = (dataSend: LoginData) => {
    mutate(dataSend, {
      onSuccess: (data) => {
        dispatch(
          setToken({
            token: data?.token,
            username: data?.username,
            idUser: data?.idUser,
            rol: data?.rol,
          })
        );

        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Inicio de sesión exitoso',
          })
        );

        dispatch(closeModal());
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al iniciar sesión, revise los datos ingresados',
          })
        );
      },
    });
  };

  return { login, isPending };
};
