import { store } from '@/app/store';
import { delay } from '@/shared/utils/delay';
import { HttpClient } from '@/shared/types/httpClient';
import axios from 'axios';
import { clearToken, JwtPayload } from '@/shared/slice/auth.slice';
import { jwtDecode } from 'jwt-decode';
import { showSnackbar } from '@/shared/slice/snackBar.slice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.token;
    const dispatch = store.dispatch;

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const isTokenExpired = Date.now() >= decoded.exp * 1000;

        if (isTokenExpired) {
          dispatch(
            showSnackbar({
              message: 'Su sesión ha expirado',
              type: 'info',
              duration: 3000,
            })
          );
          dispatch(clearToken());
        } else {
          request.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Token inválido', e);
        dispatch(clearToken());
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    await delay(1000);

    return response;
  },
  async (error) => {
    await delay(1000);

    return Promise.reject(error);
  }
);

const AxiosClient: HttpClient = {
  get: (url) => axiosInstance.get(url).then((res) => res.data),
  post: (url, data) => axiosInstance.post(url, data).then((res) => res.data),
  put: (url, data) => axiosInstance.put(url, data).then((res) => res.data),
  delete: (url) => axiosInstance.delete(url).then((res) => res.data),
};

export default AxiosClient;
