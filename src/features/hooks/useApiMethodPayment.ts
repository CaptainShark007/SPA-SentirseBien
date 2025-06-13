import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { MetodoPagoData } from '@/shared/validations/metodoPagoSchema';
import { apiMethodPayment } from '@features/api/serviceSpa.api';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiMethodPayment = (onClose: () => void) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: apiMethodPayment,
  });

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const methodPayment = (dataSend: MetodoPagoData) => {
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

  return { methodPayment, isPending, isSuccess };
};
