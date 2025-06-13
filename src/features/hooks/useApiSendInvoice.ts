import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiSendInvoice } from '@features/api/serviceSpa.api';
import { useAppDispatch } from '@hooks/useRedux';
import { useMutation } from '@tanstack/react-query';

export const useApiSendInvoice = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: apiSendInvoice,
  });

  const dispatch = useAppDispatch();

  const sendInvoice = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'La factura fue enviada exitosamente',
          })
        );
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al enviar la factura',
          })
        );
      },
    });
  };

  return { sendInvoice, isPending };
};
