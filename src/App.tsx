import { useAppDispatch } from '@hooks/useRedux';
import { useEffect } from 'react';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { getLocalStorage, removeLocalStorage } from '@utils/localStorage';
import { storageKeys } from '@constants/localStorage';
import Routing from '@/routing/Routing';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sessionExpired = getLocalStorage(storageKeys.isSessionExpired);
    if (sessionExpired) {
      dispatch(
        showSnackbar({
          message: 'Su sesión ha expirado',
          type: 'info',
          duration: 3000,
        })
      );
      removeLocalStorage(storageKeys.isSessionExpired);
    }
  }, [dispatch]);
  return <Routing />;
};

export default App;
