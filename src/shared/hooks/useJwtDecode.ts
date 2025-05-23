import { JwtPayload } from '@/shared/slice/auth.slice';
import { useAppSelector } from '@hooks/useRedux';
import { jwtDecode } from 'jwt-decode';

export const useJwtDecode = () => {
  const { token } = useAppSelector((s) => s.auth);

  if (!token) {
    return { decodedToken: null, isTokenExpired: true };
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);

    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

    return { decodedToken, isTokenExpired };
  } catch (error) {
    console.error('Error decodificando token:', error);

    return { decodedToken: null, isTokenExpired: true };
  }
};
