import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import './eliminarUsuario.css';
import { closeModal } from '@/shared/slice/modal.slice';
import Button from '@components/Button/Button';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

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
    <div className='confirm-dialog-overlay' onClick={onClose}>
      <div className='confirm-dialog' onClick={(e) => e.stopPropagation()}>
        <InfoOutlineIcon className='confirm-dialog-icon' />

        <p className='confirm-dialog-description'>
          ¿Está seguro de que quiere eliminar al usuario {modalProps?.apellido},{' '}
          {modalProps?.nombre}?
        </p>

        <div className='confirm-dialog-buttons'>
          <Button variant='outlined' onClick={onClose}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={onSubmit}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EliminarUsuario;
