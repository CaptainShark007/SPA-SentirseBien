import { RootState } from '@app/store';
import AuthModal from '@components/AuthModal/AuthModal';
import { useAppSelector } from '@hooks/useRedux';

const ModalRenderer = () => {
  const { activeModal } = useAppSelector((state: RootState) => state.modal);

  switch (activeModal) {
    case 'AUTH':
      return <AuthModal />;
    default:
      return null;
  }
};

export default ModalRenderer;
