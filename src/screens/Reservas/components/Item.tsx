import Button from '@components/Button/Button';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal';
import { useConfirmModal } from '@components/ConfirmModal/useConfirmModal';
import { useApiDeleteUserReserve } from '@features/hooks/useApiDeleteUserReserve';
import { useApiSendInvoice } from '@features/hooks/useApiSendInvoice';
import { Reservation } from '@features/types/user.types';
import MetodoPago from '@screens/Reservas/components/MetodoPago/MetodoPago';
import { useMetodoPago } from '@screens/Reservas/components/MetodoPago/useMetodoPago';
import styles from '@screens/Tratamientos/components/Servicio/Servicio.module.css';
import { formatearFecha, formatearHora, formatearPrecio } from '@utils/format';
interface ItemProps {
  reserve: Reservation;
}

const Item = ({ reserve }: ItemProps) => {
  const { deleteUserReserve, isPending } = useApiDeleteUserReserve();
  const { sendInvoice, isPending: isPendingSendInvoice } = useApiSendInvoice();

  const isCancelled = reserve.reserveStatusName === 'CANCELLED';
  const isConfirmed = reserve.reserveStatusName === 'CONFIRMED';

  const { isOpen, openModal, handleCancel, handleConfirm } = useConfirmModal({
    onConfirm: () => {
      deleteUserReserve(reserve.reserveId);
    },
  });

  const {
    isOpen: isOpenMetodoPago,
    openModal: openModalMetodoPago,
    closeModal,
  } = useMetodoPago();

  return (
    <>
      <div className={styles['servicio-item']}>
        <div className={styles['servicio-info']}>
          <h4>{reserve.serviceName}</h4>
          <span>{`Fecha: ${formatearFecha(reserve.serviceStartDate)} Hora: ${formatearHora(reserve.serviceStartTime)}`}</span>
          <span
            className={styles['precio']}
          >{`Precio: ${formatearPrecio(reserve.servicePrice)}`}</span>
        </div>

        <div className={styles['servicio-accion']}>
          {!isCancelled && !isConfirmed && (
            <Button variant='contained' onClick={openModalMetodoPago}>
              Medios de pago
            </Button>
          )}

          {isConfirmed && (
            <Button
              variant='contained'
              loading={isPendingSendInvoice}
              disabled={isPendingSendInvoice}
              onClick={() => sendInvoice(reserve.reserveId)}
            >
              Enviar comprobante
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

      <MetodoPago
        open={isOpenMetodoPago}
        onClose={closeModal}
        reserveId={reserve.reserveId}
      />
    </>
  );
};

export default Item;
