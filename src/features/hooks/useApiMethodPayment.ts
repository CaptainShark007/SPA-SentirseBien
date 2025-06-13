import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiMethodPayment } from '@features/api/serviceSpa.api';
import { MethodPaymentData } from '@features/types/serviceSpa.types';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiMethodPayment = (onClose: () => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: apiMethodPayment,
  });

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const methodPayment = (dataSend: MethodPaymentData) => {
    mutate(dataSend, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['listUserReserve'],
        });
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Metodo de pago cargado exitosamente',
          })
        );
        onClose();
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al cargar el metodo de pago',
          })
        );
      },
    });
  };

  return { methodPayment, isPending };
};
