import { store } from '@/app/store';
import { delay } from '@/shared/utils/delay';
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

    return response;
  },
  async (error) => {
    await delay(1000);

    return Promise.reject(error);
  }
);

export default axiosInstance;
