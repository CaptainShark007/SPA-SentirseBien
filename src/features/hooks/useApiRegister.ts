import { closeModal } from '@/shared/slice/modal.slice';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { RegisterData } from '@/shared/validations/registerSchema';
import { apiRegister } from '@features/api/auth.api';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation } from '@tanstack/react-query';

export const useApiRegister = () => {
  const { mutate, isPending } = useMutation({ mutationFn: apiRegister });
  const dispatch = useAppDispatch();

  const register = (dataSend: RegisterData) => {
    mutate(dataSend, {
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
    });
  };

  return { register, isPending };
};
