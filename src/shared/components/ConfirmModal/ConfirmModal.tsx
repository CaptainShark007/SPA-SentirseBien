import Button from '@components/Button/Button';
import styles from '@components/ConfirmModal/ConfirmModal.module.css';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

interface ConfirmModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  open,
  loading,
  onClose,
  onConfirm,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <ContainerModal onCloseModal={onClose}>
      <div className={styles['confirm-dialog-container-icon']}>
        <InfoOutlineIcon className={styles['confirm-dialog-icon']} />
      </div>

      <p className={styles['confirm-dialog-description']}>{description}</p>

      <div className={styles['confirm-dialog-buttons']}>
        <Button variant='outlined' onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant='contained' loading={loading} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </ContainerModal>
  );
};

export default ConfirmModal;
