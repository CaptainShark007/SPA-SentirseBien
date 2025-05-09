import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiDeleteUserReserve } from '@features/api/user.api';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const useApiDeleteUserReserve = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: apiDeleteUserReserve,
  });
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const params = useParams<{ idUser: string }>();

  const deleteUserReserve = (reserveId: number) => {
    const userId = Number(params.idUser);
    mutate(
      { userId, reserveId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['listUserReserve'],
          });
          dispatch(
            showSnackbar({
              type: 'success',
              duration: 3000,
              message: 'Cancelación de reserva exitosa',
            })
          );
        },
        onError: () => {
          dispatch(
            showSnackbar({
              type: 'error',
              duration: 3000,
              message: 'Error al cancelar la reserva',
            })
          );
        },
      }
    );
  };

  return { deleteUserReserve, isPending };
};
