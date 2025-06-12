import { openModal } from '@/shared/slice/modal.slice';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { apiCreateReserve } from '@features/api/serviceSpa.api';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

interface Params {
  serviceId: number | undefined;
  fechaSeleccionada: string;
  horaSeleccionada: string | undefined;
}

export const useApiCreateReserve = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({ mutationFn: apiCreateReserve });
  const dispatch = useAppDispatch();

  const { token, idUser } = useAppSelector((state) => state.auth);

  const createReserve = (params: Params) => {
    if (!token) return dispatch(openModal({ type: 'AUTH' }));

    const { serviceId, fechaSeleccionada, horaSeleccionada } = params;

    const data = {
      userId: idUser,
      serviceId: serviceId,
      selectedTime: `${fechaSeleccionada}T${horaSeleccionada}`,
      professionalId: 6, //hardcode
    };

    mutate(data, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Reserva exitosa',
          })
        );
        setTimeout(() => {
          navigate(`/mis-reservas/${idUser}`);
        }, 3000);
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al reservar',
          })
        );
      },
    });
  };

  return { createReserve, isPending };
};
