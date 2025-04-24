import { store } from '@/app/store';
import { showSnackbar } from '@/components/SnackBar/snackBar.slice';
import { delay } from '@utils/delay';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.token;

    request.headers.Authorization = token ? `Bearer ${token}` : '';

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    await delay(1000);
    store.dispatch(
      showSnackbar({
        message: response?.data.message || 'Request successful',
        type: 'success',
        duration: 2500,
      })
    );
    return response;
  },
  async (error) => {
    await delay(1000);
    store.dispatch(
      showSnackbar({
        message: error?.response?.data?.message || 'Request failed',
        type: 'error',
        duration: 2500,
      })
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
