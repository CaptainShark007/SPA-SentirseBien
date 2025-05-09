import { store } from '@/app/store';
import { delay } from '@/shared/utils/delay';
import { HttpClient } from '@/shared/types/httpClient';
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

const AxiosClient: HttpClient = {
  get: (url) => axiosInstance.get(url).then((res) => res.data),
  post: (url, data) => axiosInstance.post(url, data).then((res) => res.data),
  put: (url, data) => axiosInstance.put(url, data).then((res) => res.data),
  delete: (url) => axiosInstance.delete(url).then((res) => res.data),
};

export default AxiosClient;
