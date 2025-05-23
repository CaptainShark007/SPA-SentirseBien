import { Route, Routes } from 'react-router';
import './App.css';
import PublicLayout from '@layout/public/PublicLayout';
import Home from '@screens/Home/Home';
import Reservas from '@screens/Reservas/Reservas';
import PublicGuard from '@layout/public/PublicGuard';
import { useAppDispatch } from '@hooks/useRedux';
import { useEffect } from 'react';
import { showSnackbar } from '@/shared/slice/snackBar.slice';
import { getLocalStorage, removeLocalStorage } from '@utils/localStorage';
import { storageKeys } from '@constants/localStorage';
import Servicios from '@screens/Servicios/Servicios';
import Tratamientos from '@screens/Tratamientos/Tratamientos';
import Reservar from '@screens/Reservar/Reservar';

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
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />

        <Route path='servicios' element={<Servicios />} />
        <Route path='servicios/:categoria' element={<Tratamientos />} />
        <Route path='servicios/:categoria/:servicioId' element={<Reservar />} />

        <Route element={<PublicGuard />}>
          <Route path='mis-reservas/:idUser' element={<Reservas />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
