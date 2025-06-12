import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { closeModal } from '@/shared/slice/modal.slice';
import Button from '@components/Button/Button';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import styles from '@components/EliminarUsuario/EliminarUsuario.module.css';

const EliminarUsuario = () => {
  const dispatch = useAppDispatch();
  const { modalProps } = useAppSelector((state) => state.modal);

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = () => {
    onClose();
  };

  return (
    <ContainerModal onCloseModal={onClose}>
      <div className={styles['confirm-dialog-container-icon']}>
        <InfoOutlineIcon className={styles['confirm-dialog-icon']} />
      </div>

      <p className={styles['confirm-dialog-description']}>
        ¿Está seguro de que quiere eliminar al usuario {modalProps?.apellido},{' '}
        {modalProps?.nombre}?
      </p>

      <div className={styles['confirm-dialog-buttons']}>
        <Button variant='outlined' onClick={onClose}>
          Cancelar
        </Button>
        <Button variant='contained' onClick={onSubmit}>
          Confirmar
        </Button>
      </div>
    </ContainerModal>
  );
};

export default EliminarUsuario;
