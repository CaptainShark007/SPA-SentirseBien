import Button from '@components/Button/Button';
import { showSnackbar } from '@components/SnackBar/snackBar.slice';
import { useApiDeleteUserReserve } from '@features/user/user.query';
import { useAppDispatch } from '@hooks/useRedux';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Item = ({ reserve }) => {
  const { mutate, isPending } = useApiDeleteUserReserve();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const params = useParams<{ idUser: string }>();
  const isCancelled = reserve.reserveStatusName === 'CANCELLED';

  const formatearFecha = (fecha: string) => {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  };
  const formatearHora = (hora: string) => {
    return hora.slice(0, 5);
  };

  const handleCancelar = () => {
    const data = {
      userId: Number(params.idUser),
      reserveId: reserve.reserveId,
    };
    mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ['listUserReserve'] });
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Cancelación de reserva exitosa',
          })
        );
      },
      onError: () =>
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al cancelar la reserva',
          })
        ),
    });
  };

  return (
    <div className='servicio-item'>
      <div className='servicio-info'>
        <h4>{reserve.serviceName}</h4>

        <span className='detail'>
          {`Fecha: ${formatearFecha(reserve.serviceStartDate)} Hora: ${formatearHora(reserve.serviceStartTime)}`}
        </span>
      </div>
      <div className='servicio-accion'>
        {isCancelled ? (
          <span className='detail-status'>
            {isCancelled && 'Reserva Cancelada'}
          </span>
        ) : (
          <Button
            variant='outlined'
            loading={isPending}
            disabled={isPending || isCancelled}
            onClick={handleCancelar}
          >
            Cancelar reserva
          </Button>
        )}
      </div>
    </div>
  );
};

export default Item;
