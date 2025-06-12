import { useAppSelector } from '@hooks/useRedux';
import { useLocation, Navigate, Outlet } from 'react-router';

const RoleGuard = () => {
  const { rol } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (rol === 'ADMIN' && !location.pathname.startsWith('/admin')) {
    return <Navigate to='/admin' replace />;
  }

  if (
    rol === 'PROFESSIONAL' &&
    !location.pathname.startsWith('/professional')
  ) {
    return <Navigate to='/professional' replace />;
  }

  if (
    rol === 'CUSTOMER' &&
    (location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/professional'))
  ) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
