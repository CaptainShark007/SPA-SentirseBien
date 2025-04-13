import axios, { InternalAxiosRequestConfig } from 'axios';

export const AxiosRequest = () => {
  axios.interceptors.request.use((request) => {
    // validateToken()

    return updateHeaders(request);
  });
};

const updateHeaders = (request: InternalAxiosRequestConfig<any>) => {
  // const user = getLocalStorage(UserKey)

  // const Authorization = user?.accessToken ? `Bearer ${user?.accessToken}` : ''

  request.baseURL = 'http://localhost:8080/';
  request.headers.Authorization = '';
  request.headers['Content-Type'] = 'application/json';

  return request;
};
