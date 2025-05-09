import { useAppSelector } from '@hooks/useRedux';
import { Navigate, Outlet } from 'react-router';

const PublicGuard = () => {
  const { token } = useAppSelector((store) => store.auth);

  if (token) return <Outlet />;

  return <Navigate replace to={'/'} />;
};

export default PublicGuard;
