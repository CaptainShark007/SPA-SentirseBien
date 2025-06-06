import { RootState } from '@app/store';
import AuthModal from '@components/AuthModal/AuthModal';
import CrearUsuario from '@components/CrearUsuario/CrearUsuario';
import { useAppSelector } from '@hooks/useRedux';
import EliminarUsuario from '@components/EliminarUsuario/EliminarUsuario';

const ModalRenderer = () => {
  const { activeModal } = useAppSelector((state: RootState) => state.modal);

  switch (activeModal) {
    case 'AUTH':
      return <AuthModal />;
    case 'CREATE-USER':
      return <CrearUsuario />;
    case 'DELETE-USER':
      return <EliminarUsuario />;
    default:
      return null;
  }
};

export default ModalRenderer;
