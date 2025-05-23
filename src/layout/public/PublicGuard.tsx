import { clearToken } from '@/shared/slice/auth.slice';
import { storageKeys } from '@constants/localStorage';
import { useJwtDecode } from '@hooks/useJwtDecode';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { setLocalStorage } from '@utils/localStorage';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const PublicGuard = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store) => store.auth);
  const { isTokenExpired } = useJwtDecode();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (token) {
      if (isTokenExpired) {
        dispatch(clearToken());
        setLocalStorage(storageKeys.isSessionExpired, true);
        setShouldRender(false);
      } else {
        setShouldRender(true);
      }
    }
  }, [token, isTokenExpired, dispatch]);

  if (!token) return <Navigate replace to='/' />;
  if (!shouldRender) return null;

  return <Outlet />;
};

export default PublicGuard;
