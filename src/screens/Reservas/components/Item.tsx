import Button from '@components/Button/Button';
import { useApiDeleteUserReserve } from '@features/hooks/useApiDeleteUserReserve';
import { Reservation } from '@features/types/user.types';
import { formatearFecha, formatearHora } from '@utils/format';
interface ItemProps {
  reserve: Reservation;
}

const Item = ({ reserve }: ItemProps) => {
  const { deleteUserReserve, isPending } = useApiDeleteUserReserve();
  const isCancelled = reserve.reserveStatusName === 'CANCELLED';

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
            onClick={() => deleteUserReserve(reserve.reserveId)}
          >
            Cancelar reserva
          </Button>
        )}
      </div>
    </div>
  );
};

export default Item;
