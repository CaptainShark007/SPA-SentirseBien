import Button from '@components/Button/Button';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal';
import { useConfirmModal } from '@components/ConfirmModal/useConfirmModal';
import { useApiDeleteUserReserve } from '@features/hooks/useApiDeleteUserReserve';
import { Reservation } from '@features/types/user.types';
import styles from '@screens/Tratamientos/components/Servicio/Servicio.module.css';
import { formatearFecha, formatearHora } from '@utils/format';
interface ItemProps {
  reserve: Reservation;
}

const Item = ({ reserve }: ItemProps) => {
  const { deleteUserReserve, isPending } = useApiDeleteUserReserve();
  const isCancelled = reserve.reserveStatusName === 'CANCELLED';

  const { isOpen, openModal, handleCancel, handleConfirm } = useConfirmModal({
    onConfirm: () => {
      deleteUserReserve(reserve.reserveId);
    },
  });

  return (
    <>
      <div className={styles['servicio-item']}>
        <div className={styles['servicio-info']}>
          <h4>{reserve.serviceName}</h4>
          <span>{`Fecha: ${formatearFecha(reserve.serviceStartDate)} Hora: ${formatearHora(reserve.serviceStartTime)}`}</span>
          <span
            className={styles['precio']}
          >{`Precio: $${reserve.servicePrice}`}</span>
        </div>

        <div className={styles['servicio-accion']}>
          {!isCancelled && (
            <Button
              variant='contained'
              onClick={() => console.log('Ir a medios de pago')}
            >
              Medios de pago
            </Button>
          )}

          {isCancelled ? (
            <span className={styles['detail-status']}>Reserva Cancelada</span>
          ) : (
            <Button variant='outlined' onClick={openModal}>
              Cancelar reserva
            </Button>
          )}
        </div>
      </div>

      <ConfirmModal
        open={isOpen}
        loading={isPending}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        description={`¿Está seguro de que quiere cancelar la reserva de ${reserve.serviceName}?`}
      />
    </>
  );
};

export default Item;
