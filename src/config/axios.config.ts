import axios, { InternalAxiosRequestConfig } from 'axios';

export const AxiosRequest = () => {
  axios.interceptors.request.use((request) => {
    // validateToken()

    return updateHeaders(request);
  });
};

const updateHeaders = (request: InternalAxiosRequestConfig<any>) => {
  
  //const user = getLocalStorage(UserKey);

  //const Authorization = user?.accessToken ? `Bearer ${user?.accessToken}` : '';

  const Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWVnbyIsImlhdCI6MTc0NDU5OTI5NCwiZXhwIjoxNzQ0Njg1Njk0fQ.1xJFVYwwz-R7Q5tCPKAVfhKBbRmDTvGBtWVD6ax2x6E`;

  request.baseURL = 'http://localhost:8080/';
  request.headers.Authorization = Authorization;
  request.headers['Content-Type'] = 'application/json';

  return request;

};


/* import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const AxiosRequest = () => {

  // Interceptor de solicitudes
  axios.interceptors.request.use(
    (request) => {
      return updateHeaders(request);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuestas
  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Manejar token expirado o no valido
        localStorage.removeItem('token');
        console.log("Login expirado");
      }
      return Promise.reject(error);
    }
  );

};

const updateHeaders = (request: InternalAxiosRequestConfig) => {

  const token = localStorage.getItem('token');

  request.baseURL = "http://localhost:8080/";
  request.headers['Content-Type'] = 'application/json';

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  } else {
    delete request.headers.Authorization;
  }

  return request;

}; */
