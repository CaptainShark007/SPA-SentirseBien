import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiCreateUser } from '@features/api/admin.api';
import { UserCreate } from '@features/types/admin.types';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiCreateUser = (onClose: () => void) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: apiCreateUser,
  });

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createUser = (dataSend: UserCreate) => {
    mutate(dataSend, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['listUser'],
        });
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Creación de usuario exitosa',
          })
        );
        onClose();
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al crear el usuario',
          })
        );
      },
    });
  };

  return { createUser, isPending, isSuccess };
};
