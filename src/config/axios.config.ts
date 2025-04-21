import { store } from '@/app/store';
import { delay } from '@utils/delay';
import axios, { AxiosError } from 'axios';

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

    return response;
  },
  async (error: AxiosError) => {
    await delay(1000);

    return Promise.reject(error);
  }
);

export default axiosInstance;
